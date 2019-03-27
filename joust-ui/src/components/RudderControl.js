import React from 'react';
import PropTypes from 'prop-types';

export default function RudderControl({navStatus, onRudderOrder}) {
  return (
    <div className="rudder-control">
      <div className="new-heading">
        <label>
        Come to heading:
        <input type="text" name="new-heading"/>
        </label>
      </div>
      <div className="rudder-setting">
        <label>Using rudder:
        <div className="rudder-amount">
        <label>
          <input type="radio" name="rudder-amount-setting" value="RUDDER_STANDARD"
            checked={true} />
          Standard
        </label>
        <label>
          <input type="radio" name="rudder-amount-seting" value="RUDDER_FULL"/>
           Full
        </label>
        </div>
        <div className="rudder-direction">
        <label>
          <input type="radio" name="rudder-direction-setting" value="RUDDER_LEFT" />
          Left
        </label>
        <label>
          <input type="radio" name="rudder-direction-seting" value="RUDDER_RIGHT"/>
           Right
        </label>
        </div>
        </label>
      </div>
    </div>
  );
};

