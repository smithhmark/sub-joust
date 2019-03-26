import React from 'react';
import { storiesOf } from '@storybook/react';
import {action } from '@storybook/addon-actions';

import SonarContact from './SonarContact';


export const sierraOne = {
  id: '1',
  sname: 'Sierra 1',
  state: 'CONTACT_DEFAULT',
  cls: 'contact class',
  dlu: new Date(2018, 0, 1, 9, 0),
};

export const actions = {
  onContactSelected: action('onContactSelected'),
};

storiesOf('SonarContact', module)
  .add('default', () => <SonarContact contact={sierraOne} {...actions} />)
  .add('selected', () => (
    <SonarContact contact={{ ...sierraOne, state: 'CONTACT_SELECTED`' }} {...actions} />))
