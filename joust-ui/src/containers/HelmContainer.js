import React from 'react';
import { connect } from 'react-redux';

import Helm from '../components/Helm';
import { issueManuverOrder } from '../actions/navigation';

const mapStateToProps = function(state, ownProps) {
  let ret = Object.assign({}, ownProps);
  ret.navStatus = state.navStatus.ownShip;
  ret.currentManuver = state.navStatus.currentManuver;
  return ret;
};

const mapDispatchToProps = dispatch => ({
  issueOrder: order => dispatch(issueManuverOrder(order))
});

const HelmC = connect(mapStateToProps, mapDispatchToProps)(Helm);

export default HelmC;
