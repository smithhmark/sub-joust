import React, { Component } from 'react';
import PropTypes from 'prop-types';

import HeadingChangeOrder from './HeadingChangeOrder';

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
    };
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

