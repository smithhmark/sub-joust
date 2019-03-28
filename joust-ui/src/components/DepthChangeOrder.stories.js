import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import DepthChangeOrder from './DepthChangeOrder';

export const dueSouthFromNullIsland = {
  heading: 180,
  depth: 500,
  spd: 10,
  lat: 0.0,
  lon: 0.0,
}

const maintainDepth = {
  newDepth: 500,
  diveOrder: "MAINTAIN_DEPTH",
}

export const actions = {
  onNewDepth: action('onNewDepth'),
};

storiesOf('DepthChangeOrder', module)
  .add('default', 
    () => <DepthChangeOrder newOrder={maintainDepth} {...actions} />)
