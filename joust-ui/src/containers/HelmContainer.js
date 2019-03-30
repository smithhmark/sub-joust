import React from 'react';
import { connect } from 'react-redux';

import { Helm } from '../components/Helm';


const mapStateToProps = function(state, ownProps) {
  let ret = Object.assign({}, ownProps);
  ret.navStatus = state.navStatus;
  ret.currentManuver = state.currentManuver;
  return ret;
};

const mapDispatchToProps = {
  issueOrder: null; // placeholder
};

export default connect(mapStateToProps, mapDispatchToProps)(Helm);
