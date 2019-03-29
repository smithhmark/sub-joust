import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Plotter from './Plotter';

import {simpleContacts} from './ContactList.stories';

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
};

const upperLeft = {lat: 10.0, lon: -10.0}
const lowerRight = {lat: -10.0, lon: 10.0}

const bigWindow = {
  upperLeft,
  lowerRight,
}

const littleWindow = {
  upperLeft:{lat: 3.0, lon: -3.0},
  lowerRight:{lat: -3.0, lon: 3.0},
}

export const actions = {
  onSelectContact: action('SelectContact'),
  onSelectLeg: action('selectLeg'),
};

export const legs = [
  { start: {lat:-1, lon:-1, time:"hmmm"},
    end: null,
  },
  { start: {lat:0, lon:-2, time:"hmmm"},
    end: {lat:-1, lon:-1, time:"hmmm"},
  },
];

export const bearings = [
  { loc: {lat: 0, lon:0},
    time: "hmmm",
    assigned: "Sierra1",
    bearing: 45,
  },
  { loc: {lat: 0, lon:0},
    time: "hmmm",
    assigned: "Sierra1",
    bearing: 0,
  },
  { loc: {lat: 0, lon:0},
    time: "hmmm",
    assigned: "Sierra1",
    bearing: 180,
  },
];


storiesOf('Plotter', module)
  .add('default, big window', 
    () => <Plotter 
            ownShip={dueSouthFromNullIsland}
            {...bigWindow}
          {...actions} />) 
  .add('default, little window', 
    () => <Plotter 
            ownShip={dueSouthFromNullIsland}
            {...littleWindow}
          {...actions} />) 
  .add('North East', 
    () => <Plotter 
            ownShip={NNEFromNullIsland}
            upperLeft={upperLeft}
            lowerRight={lowerRight}
          {...actions} />)
  .add('North East, with legs', 
    () => <Plotter 
            ownShip={NNEFromNullIsland}
            {...littleWindow}
            legs={legs}
          {...actions} />)
  .add('North East, with single bearing', 
    () => <Plotter 
            ownShip={NNEFromNullIsland}
            upperLeft={upperLeft}
            lowerRight={lowerRight}
            bearings={[bearings[0]]}
          {...actions} />)
  .add('North East, with multiple bearings', 
    () => <Plotter 
            ownShip={NNEFromNullIsland}
            upperLeft={upperLeft}
            lowerRight={lowerRight}
            bearings={bearings}
          {...actions} />)
