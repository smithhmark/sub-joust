import React from 'react';
import PropTypes from 'prop-types';

const dive_rates = [
  "DIVE_FULL",
  "DIVE_STANDARD",
  "MAINTAIN_DEPTH",
  "RISE_STANDARD",
  "RISE_FULL",
];

export default class DepthChangeOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newDepth: props.newOrder.newDepth,
      diveOrder: props.newOrder.diveOrder,
    }
    this.updateOrder = this.onChange.bind(this);
    this.submit = props.onNewDepth;
  }

  onChange(ev) {
    let { name, value } = ev.target;
    let newState = {...this.state};

    if ( name === "new-depth") {
      newState.newDepth = value;
    } else {
      newState.diveOrder = name;
    }
    console.log("depthChangeOrder newState:", newState);
    this.setState(newState);
    this.submit(newState);
  }

  render () {
    return (
      <div className="depth-control">
        <div className="new-depth">
          <label>Come to:
            <input type="text" name="new-depth"  
              onChange={this.updateOrder.bind(this)}
              value={this.props.newOrder.newDepth}/>
          </label>
        </div>
        <div className="dive-setting">
          <label>Dive Rate:
            <div className="dive-order">
             {this.renderCheckbox("DIVE_FULL", "Full Dive")}
             {this.renderCheckbox("DIVE_STANDARD", "Standard Dive")}
             {this.renderCheckbox("MAINTAIN_DEPTH", "Maintain depth")}
             {this.renderCheckbox("RISE_STANDARD", "Standard Rise")}
             {this.renderCheckbox("RISE_FULL", "Full Rise")}
            </div>
          </label>
        </div>
      </div>
    );
  }

  renderCheckbox (name, label) {
    return (<span className="form-check">
      <label>
        <input
          type="checkbox"
          name={name}
          checked={this.props.newOrder.diveOrder === name}
          onChange={this.updateOrder}
          className="form-check-input"
        />
        {label}
      </label>
    </span>);
  }
}
