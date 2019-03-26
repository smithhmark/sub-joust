import React from 'react';
import { storiesOf } from '@storybook/react';
import {action } from '@storybook/addon-actions';

import Hostility from './Hostility';
import {threat_levels} from './Hostility';


export const hostile = {
  threat: threat_levels.hostile,
}

export const neutral = {
  threat: threat_levels.neutral,
}

export const friendly = {
  threat: threat_levels.friendly,
}

export const unknown = {
  threat: threat_levels.unknown,
}

export const actions = {
  onHostilityChanged: action('onHostilityChange'),
};

storiesOf('Hostility', module)
  .add('friendly', () => <Hostility {...friendly} {...actions} />)
  .add('neutral', () => <Hostility {...neutral} {...actions} />)
  .add('hostile', () => <Hostility {...hostile} {...actions} />)
  .add('unknown', () => <Hostility {...unknown} {...actions} />)
  .add('friendly, fixed', () => <Hostility {...friendly} fixed={true} {...actions} />)
  .add('neutral, fixed', () => <Hostility {...neutral} fixed={true} {...actions} />)
  .add('hostile, fixed', () => <Hostility {...hostile} fixed={true} {...actions} />)
  .add('unknown, fixed', () => <Hostility {...unknown} fixed={true} {...actions} />)
