import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import ThrottleOrder from './ThrottleOrder';

export const dueSouthFromNullIsland = {
  heading: 180,
  depth: 500,
  spd: 10,
  lat: 0.0,
  lon: 0.0,
}

const maintainSpd = {
  newSpeed: 10,
  throttleOrder: "THROTTLE_SET_SPEED",
}

export const actions = {
  onNewSpeed: action('onNewThrottle'),
};

storiesOf('ThrottleOrder', module)
  .add('default', 
    () => <ThrottleOrder maxSpd={30} newOrder={maintainSpd} {...actions} />)
