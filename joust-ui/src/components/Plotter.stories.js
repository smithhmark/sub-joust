import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Plotter from './Plotter';

export const dueSouthFromNullIsland = {
  heading: 180,
  depth: 500,
  spd: 10,
  lat: 0.0,
  lon: 0.0,
}

export const NNEFromNullIsland = {
  heading: 22.5,
  depth: 500,
  spd: 10,
  lat: 0.0,
  lon: 0.0,
}

const upperLeft = {lat: 10.0, lon: -10.0}
const lowerRight = {lat: -10.0, lon: 10.0}

export const actions = {
  onSelectContact: action('SelectContact'),
  onSelectLeg: action('selectLeg'),
};


storiesOf('Plotter', module)
  .add('default', 
    () => <Plotter 
            ownShip={dueSouthFromNullIsland}
            upperLeft={upperLeft}
            lowerRight={lowerRight}
          {...actions} />) 
  .add('North East', 
    () => <Plotter 
            ownShip={NNEFromNullIsland}
            upperLeft={upperLeft}
            lowerRight={lowerRight}
          {...actions} />)
