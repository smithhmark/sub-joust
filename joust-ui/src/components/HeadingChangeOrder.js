import React from 'react';
import PropTypes from 'prop-types';
import { HeadingChangeOrderType } from '../types/index';

const rudderPositions = [
  "RUDDER_LEFT_FULL",
  "RUDDER_LEFT_STANDARD",
  "RUDDER_AMIDSHIPS",
  "RUDDER_RIGHT_STANDARD",
  "RUDDER_RIGHT_FULL",
];


export default class HeadingChangeOrder extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      newHeading: props.newOrder.newHeading,
      rudderOrder: props.newOrder.rudderOrder,
    }
    this.updateOrder = this.onChange.bind(this);
    this.submit = props.onNewCourse;
  }

  onChange(ev) {
    let { name, value } = ev.target;
    let newState = {...this.state};

    if ( name === "new-heading") {
      //newState.newHeading = value.trim();
      newState.newHeading = value;
      //this.setState({...this.state, newHeading: value});
    } else {
      newState.rudderOrder = name;
      //this.setState({...this.state, rudderOrder: value});
    }
    console.log("HeadingChangeOrder newState:", newState);
    this.setState(newState);
    this.submit(newState);
  }

  render () {
    return (
      <div className="rudder-control">
        <div className="new-heading">
          <label>Come to:
            <input type="text" name="new-heading"  
              onChange={this.updateOrder.bind(this)}
              value={this.props.newOrder.newHeading}/>
          </label>
        </div>
        <div className="rudder-setting">
          <label>Using rudder:
            <div className="rudder-order">
             {this.renderCheckbox("RUDDER_LEFT_FULL", "Left full")}
             {this.renderCheckbox("RUDDER_LEFT_STANDARD", "Left standard")}
             {this.renderCheckbox("RUDDER_AMIDSHIPS", "Rudder amidships")}
             {this.renderCheckbox("RUDDER_RIGHT_FULL", "Right standard")}
             {this.renderCheckbox("RUDDER_RIGHT_STANDARD", "Right full")}
            </div>
          </label>
        </div>
      </div>
    );
  }

  renderCheckbox (name, label) {
      //{/*checked={this.state.rudderOrder === name} */}
    return (<span className="form-check">
      <label>
        <input
          type="checkbox"
          name={name}
          checked={this.props.newOrder.rudderOrder === name}
          onChange={this.updateOrder}
          className="form-check-input"
        />
        {label}
      </label>
    </span>);
  };
}

HeadingChangeOrder.propTypes = {
  newOrder: HeadingChangeOrderType,
  onNewCourse: PropTypes.func,
}
