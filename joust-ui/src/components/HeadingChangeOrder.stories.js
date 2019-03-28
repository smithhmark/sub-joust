import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import HeadingChangeOrder from './HeadingChangeOrder';

export const dueSouthFromNullIsland = {
  heading: 180,
  depth: 500,
  spd: 10,
  lat: 0.0,
  lon: 0.0,
}

const maintainCourse = {
  newHeading: 180,
  rudderOrder: "RUDDER_AMIDSHIPS",
};

export const actions = {
  onNewCourse: action('onNewCourse'),
};

storiesOf('HeadingChangeOrder', module)
  .add('default', 
    () => <HeadingChangeOrder newOrder={maintainCourse} {...actions} />)
