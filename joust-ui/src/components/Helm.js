import React, { Component } from 'react';
import PropTypes from 'prop-types';

import HeadingChangeOrder from './HeadingChangeOrder';
import DepthChangeOrder from './DepthChangeOrder';
import ThrottleOrder from './ThrottleOrder';

import {NavStatusType} from '../types/index';

export default class Helm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      changeHeadingOrder: {
        newHeading: props.navStatus.heading,
        rudderOrder: "RUDDER_AMIDSHIPS",
      },
      changeDepthOrder: {
        newDepth: props.navStatus.depth,
        diveOrder: "MAINTAIN_DEPTH",
      },
      changeThrottleOrder: {
        newSpeed: props.navStatus.spd,
        throttleOrder: "THROTTLE_SET_SPEED",
      },
    };
  }
  componentDidMount() {
    this.resetOrders();
  }

  submitOrders() {
    let order = {
      courseChange: this.state.changeHeadingOrder,
      speedChange: this.state.changeThrottleOrder,
      depthChange: this.state.changeDepthOrder,
    }
    console.log("Helm issuing manuver order", order)
    if (this.props.issueOrder){
      this.props.issueOrder(order);
    }
  }

  resetOrders() {
    let newState = {
      changeHeadingOrder: {
        newHeading: this.props.navStatus.heading,
        rudderOrder: "RUDDER_AMIDSHIPS",
      },
      changeDepthOrder: {
        newDepth: this.props.navStatus.depth,
        diveOrder: "MAINTAIN_DEPTH",
      },
      changeThrottleOrder: {
        newSpeed: this.props.navStatus.spd,
        throttleOrder: "THROTTLE_SET_SPEED",
      },
    };
    this.setState(newState);
  };

  onNewDepth(freshOrder) {
    console.log("Helm getting new depth", freshOrder);
    let newState = {...this.state};
    let newOrder = {...freshOrder};

    if (newOrder.dpethOrder === "MAINTAIN_DEPTH"
      && newOrder.dpethOrder !== this.state.changeHeadingOrder.dpethOrder) {
      newOrder.newDpeth = this.props.navStatus.depth;
    }
    newState.changeDepthOrder = newOrder;
    this.setState(newState);
  }

  onNewSpeed(freshOrder) {
    console.log("Helm getting new Speed", freshOrder);
    let newState = {...this.state};
    let newOrder = {...freshOrder};

    newState.changeThrottleOrder = newOrder;
    this.setState(newState);
  }

  onNewCourse(freshOrder) {
    console.log("Helm getting new course", freshOrder);
    let newState = {...this.state};
    let newOrder = {...freshOrder};

    if (newOrder.rudderOrder === "RUDDER_AMIDSHIPS"
      && newOrder.rudderOrder !== this.state.changeHeadingOrder.rudderOrder) {
      newOrder.newHeading = this.props.navStatus.heading;
    }
    newState.changeHeadingOrder = newOrder;
    this.setState(newState);
  }

  render() {
    let {navStatus, onManuverOrder} = this.props;
    return (
      <div className="helm-component">
        {JSON.stringify(this.props)}
        {this.props.currentManuver 
          ? JSON.stringify(this.props.currentManuver):null}
        <HeadingChangeOrder
          newOrder={this.state.changeHeadingOrder}
          onNewCourse={this.onNewCourse.bind(this)} />
        <DepthChangeOrder
          newOrder={this.state.changeDepthOrder}
          onNewDepth={this.onNewDepth.bind(this)} />
        <ThrottleOrder
          maxSpd={30}
          newOrder={this.state.changeThrottleOrder}
          onNewSpeed={this.onNewSpeed.bind(this)} />
        <button onClick={this.resetOrders.bind(this)}>Reset Orders</button>
        <button onClick={this.submitOrders.bind(this)}>Submit Orders</button>
      </div>

    );
  };
}

Helm.propTypes = {
  navStatus: NavStatusType,
  onManuverOrder: PropTypes.func,
};

