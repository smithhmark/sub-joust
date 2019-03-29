import React, { Component } from 'react';

export default class Plotter extends Component {
  constructor(props) {
    super(props);
    this.plotter_ref = React.createRef();
    this.scale = {x:1, y:1};
    this.basis = {x:0, y:0};
    this.extent = {x:0, y:0};
    this.central = {lat: 0, lon: 0};
    this.skew = 1;
  }

  onPlot(pt){
    console.log("is",pt, "inside window?");
    console.log("have extent?",this.extent);
    if (pt.x >= this.basis.x && pt.x <= this.extent.x) {
      if (pt.y >= this.basis.y && pt.y <= this.extent.y) {
        return true;
      }
    }
    return false;
  }

  inside(geoCoord){
    console.log("is", geoCoord, "inside window?");
    if (geoCoord.lon > this.props.upperLeft.lon 
      && geoCoord.lon < this.props.lowerRight.lon) {
      console.log("lon bounded by window");
    }
    if (geoCoord.lat > this.props.upperLeft.lat 
      && geoCoord.lat < this.props.lowerRight.lat) {
      console.log("lat bounded by window");
    } else {
      console.log("lat outside window");
    }
    if (geoCoord.lon < this.props.upperLeft.lon
        || geoCoord.lon > this.props.lowerRight.lon) {
      return false;
    } else if (geoCoord.lat < this.props.upperLeft.lat
        || geoCoord.lat > this.props.lowerRight.lat) {
      return false;
    }
    return true;
  }
  
  scaledLocalPos(geoCoord) {
    let x, y;
    const metersPerDeg = 111111;
    y = metersPerDeg * geoCoord.lat;
    x = metersPerDeg * Math.cos(geoCoord.lat) * geoCoord.lon;
    return {x, y};
  }

  toLocalPos(geoCoord) {
    let ret = {};
    const pos = this.toLocal(geoCoord);
    ret.cy = pos.y;
    ret.cx = pos.x;
    return ret;
  }

  toLocal(geoCoord) {
    let ret = {};
    ret.y = this.props.upperLeft.lat - geoCoord.lat;
    ret.x = geoCoord.lon - this.props.upperLeft.lon;
    return ret;
  }

  render() {
    const bs = this.props.bearings;
    const ls = this.props.legs;
    console.log("legs", ls);
    const dims = {};
    if (this.plotter_ref.current) {
      dims.width= this.plotter_ref.current.clientWidth;
      dims.height= this.plotter_ref.current.clientHeight;
    } else {
      dims.width= 0;
      dims.height= 0;
    }

    return (
      <div style={{height: "240px", width:"320px"}} ref={this.plotter_ref} className="plotter">
        {JSON.stringify(this.props)}
        <div className="plot">
          <svg {...dims}>
           <line x1={0} y1={0}
                 x2={dims.width} y2={dims.height}
                 stroke="green" strokeWidth="2" />
           <line 
                x1={dims.width}
                y1={0}
                x2={0}
                y2={dims.height}
                stroke="green" strokeWidth="2" />
          {bs ? bs.map(this.drawBearing.bind(this)): null}
          {ls ? ls.map(this.drawLeg.bind(this)): null}
          {this.ownShip()}
          </svg>
        </div>
      </div>);
  }

  drawLeg(leg) {
    const { start, end} = leg;
    const origin = this.pixelPos(start);
    let dest;
    if (end){
      dest = this.pixelPos(end);
    } else {
      dest = this.pixelPos(this.props.ownShip);
    }
    return (
      <line x1={origin.x} y1={origin.y}
        x2={dest.x} y2={dest.y}
        stroke="grey"
        strokeWidth="2"
      />);
  }

  drawBearing(br) {
    const { loc, bearing} = br;
    const origin = this.pixelPos(loc);
    const angle = Math.PI * bearing/180 - Math.PI /2;
    const end = {
      x: origin.x + Math.cos(angle)*this.extent.x,
      y: origin.x + Math.sin(angle)*this.extent.y,
    };
    return (
      <line x1={origin.x} y1={origin.y}
        x2={end.x} y2={end.y}
        stroke="blue"
      />);
  }

  ownShip() {
    const pos = this.pixelPos(this.props.ownShip)
    const ownShip = this.props.ownShip;
    console.log("ownShip local:", pos);
    console.log("ownShip:", ownShip);

    if (this.onPlot(pos)){
      //const pos = this.toLocalPos(this.props.ownShip)
      return (
        <g transform={`rotate(${ownShip.heading}, ${pos.x} ${pos.y})`}>
          <ellipse cx={pos.x} cy={pos.y} rx={5} ry={20} stroke="green"
             fill="lime" />
        </g>);
    } else {
      console.log("ownShip out of window");
    }
  }

  pixelPos(geoCoord) {
    let temp= this.projectedXY(geoCoord);
    console.log("pixelPos projecting to:", temp);
    temp.x = temp.x - this.basis.x;
    //temp.y = temp.y + this.basis.y;
    //temp.x = this.basis.x - temp.x;
    temp.y = this.basis.y - temp.y;
    console.log("pixelPos translated to:", temp);
    temp.x = temp.x * this.scale.x;
    temp.y = temp.y * this.scale.y;
    console.log("pixelPos scaled to:", temp);

    return temp
  }

  projectedXY(geoCoord){
    let x, y;
    x = (geoCoord.lon - this.central.lon) * this.skew;
    y = (geoCoord.lat - this.central.lat);
    return {x,y};
  }

  setProjection() {
    this.central.lat = 
      (this.props.upperLeft.lat + this.props.lowerRight.lat) / 2;
    this.central.lon = 
      (this.props.upperLeft.lon + this.props.lowerRight.lon) / 2;
    this.skew = Math.cos(this.central.lat * Math.PI * 2);
    console.log("skew is:", this.skew);

    this.basis = this.projectedXY(this.props.upperLeft);
    console.log("set basis:", this.basis);
    this.extent = this.pixelPos(this.props.lowerRight);
    console.log("set extent:", this.extent);
  }

  setScale(){
    const lr = this.projectedXY(this.props.lowerRight)
    const ul = this.projectedXY(this.props.upperLeft)
    console.log("lr:",lr);
    console.log("ul:",ul);
    this.scale.x = this.plotter_ref.current.clientWidth / Math.abs(lr.x-ul.x) ;
    //this.scale.x = Math.abs(lr.x-ul.x) / this.plotter_ref.current.clientWidth;
    console.log("xscale:", this.scale.x);
    this.scale.y =this.plotter_ref.current.clientHeight / Math.abs(ul.y-lr.y);
    //this.scale.y = Math.abs(ul.y-lr.y)/ this.plotter_ref.current.clientHeight;
    console.log("yscale:", this.scale.y);

  }

  componentDidMount() {
    console.log("ref value after mount:", this.plotter_ref);
    this.setScale();
    console.log("scale is:", this.scale);
    this.setProjection();
    this.forceUpdate();
  }
}


