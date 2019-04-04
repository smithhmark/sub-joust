import React from 'react';
import PropTypes from 'prop-types';
import { ThrottleOrderType } from '../types/index';

const throttle_positions = [
  "THROTTLE_REVERSE_ONE_THIRD",
  "THROTTLE_REVERSE_TWO_THIRD",
  "THROTTLE_REVERSE_FULL",
  "THROTTLE_ALL_STOP",
  "THROTTLE_AHEAD_ONE_THIRD",
  "THROTTLE_AHEAD_TWO_THIRD",
  "THROTTLE_AHEAD_FULL",
  "THROTTLE_AHEAD_FLANK",
  "THROTTLE_AHEAD_ONE_HALF",
  "THROTTLE_SET_SPEED",
];

export default class ThrottleOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newSpeed: props.newOrder.newSpeed,
      throttleOrder: props.newOrder.throttleOrder,
    };
    this.updateOrder = this.onChange.bind(this);
    this.submit = props.onNewSpeed;
    if (props.maxSpd) {
      this.maxSpd = props.maxSpd;
    } else {
      this.maxSpd = 20;
    }
  }

  onChange(ev) {
    let { name, value } = ev.target;
    let newState = {...this.state};

    if ( name === "new-speed") {
      if (parseFloat(value) > this.maxSpd) {
        newState.newSpeed = this.maxSpd; 
      } else {
        newState.newSpeed = value;
        newState.throttleOrder = "THROTTLE_SET_SPEED";
      }
    } else {
      newState.throttleOrder = name;
      switch (name) {
        case "THROTTLE_ALL_STOP":
          newState.newSpeed = 0;
          break;
        case "THROTTLE_AHEAD_ONE_THIRD":
          newState.newSpeed = this.maxSpd * 0.33;
          break;
        case "THROTTLE_AHEAD_TWO_THIRD":
          newState.newSpeed = this.maxSpd * 0.66;
          break;
        case "THROTTLE_AHEAD_FULL":
          newState.newSpeed = this.maxSpd;
          break;
        case "THROTTLE_REVERSE_ONE_THIRD":
          newState.newSpeed = this.maxSpd * -0.33;
          break;
      }
    }
    console.log("ThrottleOrder newState:", newState);
    this.setState(newState);
    this.submit(newState);
  }

  render () {
    return (
      <div className="throttle-control">
        <div className="new-speed">
          <label>Speed:
            <input type="text" name="new-speed"  
              onChange={this.updateOrder.bind(this)}
              value={this.props.newOrder.newSpeed}/>
          </label>
        </div>
        <div className="throttle-setting">
          <label>Throttle Position:
            <div className="throttle-order">
             {this.renderCheckbox("THROTTLE_REVERSE_ONE_THIRD", "Reverse 1/3")}
             {this.renderCheckbox("THROTTLE_ALL_STOP", "Full Stop ")}
             {this.renderCheckbox("THROTTLE_AHEAD_ONE_THIRD", "Ahead 1/3")}
             {this.renderCheckbox("THROTTLE_AHEAD_TWO_THIRD", "Ahead 2/3")}
             {this.renderCheckbox("THROTTLE_AHEAD_FULL", "Ahead Full")}
             {this.renderCheckbox("THROTTLE_SET_SPEED", "Make Revolutions for Speed")}
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
          checked={this.props.newOrder.throttleOrder === name}
          onChange={this.updateOrder}
          className="form-check-input"
        />
        {label}
      </label>
    </span>);
  }
}

ThrottleOrder.propTypes = {
  newOrder: ThrottleOrderType,
  onManuverOrder: PropTypes.func,
};
