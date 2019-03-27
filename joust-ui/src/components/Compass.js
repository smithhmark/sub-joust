import React from 'react';

const headingToRad = function(deg) {
  let rad = Math.PI * deg / 180;
  rad -= Math.PI /2; // want 0 deg to be up
  return rad;
}

const TickMark = function({frame, circ, howMany, whichisThis, leng}) {
  let innerRad = circ.radius - leng/2;
  let outerRad = circ.radius + leng/2;
  let angle = whichisThis * 2 * Math.PI / howMany;

  //console.log("howMany:", howMany);
  //console.log("whichisThis:", whichisThis);
  //console.log("circ:", circ);
  //console.log(`angle=${angle}`);
  //console.log("cos(angle)", Math.cos(angle));
  //console.log(`innerR=${innerRad}`);
  let ix = Math.round(innerRad * Math.cos(angle) + circ.centX);
  let iy = Math.round(innerRad * Math.sin(angle) + circ.centY);
  let ox = Math.round(outerRad * Math.cos(angle) + circ.centX);
  let oy = Math.round(outerRad * Math.sin(angle) + circ.centY);

  //console.log(`<line x1=${ix} y1=${iy} x2=${ox} y2=${oy}`)
  return (
    <line x1={ix} y1={iy} x2={ox} y2={oy} stroke="green" strokeWidth="2" />
  );
}

const Indicator = function({frame, circ, angle, baseWidth}) {
  let frontLength = circ.radius * .85;
  let backLength = frontLength * 0.5;

  let frontX = Math.round(frontLength * Math.cos(angle) + circ.centX);
  let frontY = Math.round(frontLength * Math.sin(angle) + circ.centY);
  console.log("front point, x:", frontX, "y:", frontY);

  let revAngle = angle + Math.PI;
  let backPtX = Math.round(backLength * Math.cos(revAngle) + circ.centX);
  let backPtY = Math.round(backLength * Math.sin(revAngle) + circ.centY);
  //let backPtX = Math.round(backLength * Math.cos(angle) + circ.centX);
  //let backPtY = Math.round(backLength * Math.sin(angle) + circ.centY);
  console.log("back point, x:", backPtX, "y:", backPtY);
  console.log(Math.PI);

  let halfBack = baseWidth / 2;
  let wingDist = Math.sqrt(backLength * backLength + halfBack * halfBack);
  let wingAngle = Math.asin(halfBack/wingDist)
  
  let lWingX = Math.round(wingDist * Math.cos(revAngle - wingAngle) + circ.centX);
  let lWingY = Math.round(wingDist * Math.sin(revAngle - wingAngle) + circ.centY);
  console.log("left wing point, x:", lWingX, "y:", lWingY);

  let rWingX = Math.round(wingDist * Math.cos(revAngle + wingAngle) + circ.centX);
  let rWingY = Math.round(wingDist * Math.sin(revAngle + wingAngle) + circ.centY);
  console.log("right wing point, x:", rWingX, "y:", rWingY);

  let ptStr = `${frontX},${frontY} ${rWingX},${rWingY} ${lWingX},${lWingY}`;
  return ( <polygon points={ptStr} stroke="green" strokeWidth="2" />);
}

const drawRose = function(width, height, heading) {
  let frame = {
    width,
    height,
  };
  let centX = width/2, centY=height/2;
  let radius = Math.min(width, height) * 0.4;
  let circ = {
    centX,
    centY,
    radius,
  };
  let headingAngle = headingToRad(heading);;
  //let headingAngle = Math.PI/2 + Math.PI * 2 * heading / 360
  let wid = 30;
  let tickCount = 16;
  let tickLengths = [];
  let baseTickLen = 10;
  for (let ii = 0; ii < tickCount; ii++) {
    if (ii % 4 == 0) {
      tickLengths.push(2*baseTickLen);
    } else {
      tickLengths.push(baseTickLen);
    }
  }
  return (
    <svg style={{background: "black"}} width={width} height={height}>
        <circle cx={centX} cy={centY} r={radius} 
           stroke="green" strokeWidth="2" />
        {
          tickLengths.map((l,i) => {return <TickMark key={i} frame={frame} circ={circ} howMany={tickCount} whichisThis={i} leng={l} />})
        }
        {<Indicator frame={frame} circ={circ} angle={headingAngle} baseWidth={wid}/>}
    </svg>
  );

};

export default function Compass(
  {navStatus:{heading, depth, spd, lat, lon}}) {
  return (
    <div className="ships-compass">
      <div>
        <span style={{paddingRight: "25%"}} className="course">Heading: {heading}</span>
        <span style={{paddingLeft: "10%", paddingRight: "10%"}} className="speed">Speed: {spd}</span>
        <span style={{paddingLeft: "25%"}} className="depth">Depth: {depth}</span>
      </div>
      <div id="compassRose" >
        {drawRose(200,200,heading)}
      </div>
      <div>
        <span style={{paddingLeft: "15%", paddingRight: "15%"}} className="lat">Latitude: {lat}</span>
        <span style={{paddingLeft: "15%", paddingRight: "15%"}} className="lon">Longitude: {lon}</span>
      </div>
    </div>);
}
