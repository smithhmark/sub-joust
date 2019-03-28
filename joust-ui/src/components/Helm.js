import React, { Component } from 'react';
import PropTypes from 'prop-types';

import HeadingChangeOrder from './HeadingChangeOrder';
import DepthChangeOrder from './DepthChangeOrder';
import ThrottleOrder from './ThrottleOrder';

export default class Helm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cur: props.navStatus,
      next: Object.assign({}, props.navStatus),
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
    console.log("Helm getting new course", newOrder);
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
        {JSON.stringify(navStatus)}
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
      </div>
    );
  };
}

Helm.propTypes = {
  navStatus: PropTypes.shape({
    heading: PropTypes.number.isRequired, 
    depth: PropTypes.number.isRequired, 
    spd: PropTypes.number.isRequired, 
    lat: PropTypes.number.isRequired, 
    lon: PropTypes.number.isRequired,
  }),
  onManuverOrder: PropTypes.func,
};

