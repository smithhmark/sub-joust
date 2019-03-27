import React from 'react';
import { storiesOf } from '@storybook/react';
import {action } from '@storybook/addon-actions';

import Compass from './Compass';

export const actions = {
};

export const dueSouthFromNullIsland = {
  heading: 180,
  depth: 500,
  spd: 10,
  lat: 0.0,
  lon: 0.0,
}


storiesOf('Compass', module)
  .add('south', () => <Compass navStatus={dueSouthFromNullIsland} {...actions} />)
  .add('northwest', () => <Compass navStatus={{...dueSouthFromNullIsland, heading:315}} {...actions} />)


