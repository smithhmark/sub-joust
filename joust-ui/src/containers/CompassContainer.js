import React from 'react';
import { connect } from 'react-redux';

import Compass from '../components/Compass';

const mapStateToProps = function(state, ownProps) {
  let ret = Object.assign({}, ownProps);
  ret.navStatus = state.navStatus.ownShip;
  return ret;
};

const CompassC = connect(mapStateToProps)(Compass);

export default CompassC;
