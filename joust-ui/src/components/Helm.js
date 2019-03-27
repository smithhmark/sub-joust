import React from 'react';
import PropTypes from 'prop-types';

export default function Helm({navStatus, onManuverOrder}) {

  return (
  <div className="helm-component">
    {JSON.stringify(navStatus)}
  </div>);

};

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

