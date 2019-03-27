import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import RudderControl from './RudderControl';

export const dueSouthFromNullIsland = {
  heading: 180,
  depth: 500,
  spd: 10,
  lat: 0.0,
  lon: 0.0,
}
export const actions = {
  onManuverOrder: action('onManuverOrder'),
};

storiesOf('RudderControl', module)
  .add('default', 
    () => <RudderControl navStatus={dueSouthFromNullIsland} {...actions} />)
