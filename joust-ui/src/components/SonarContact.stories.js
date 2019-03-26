import React from 'react';
import { storiesOf } from '@storybook/react';
import {action } from '@storybook/addon-actions';

import SonarContact from './SonarContact';


export const sierraOne = {
  id: '1',
  sname: 'Sierra 1',
  selection: 'CONTACT_DEFAULT',
  status: 'CONTACT_ACTIVE',
  threat: 'HOSTILE',
  dfe: new Date(2018, 0, 1, 8, 0),
  dlu: new Date(2018, 0, 1, 9, 0),
};

export const actions = {
  onContactSelected: action('onContactSelected'),
  onContactArchived: action('onContactArchived'),
};

storiesOf('SonarContact', module)
  .add('default', () => <SonarContact contact={sierraOne} {...actions} />)
  .add('activeSelected', () => (
    <SonarContact contact={{ ...sierraOne, selection: 'CONTACT_SELECTED' }} {...actions} />))
  .add('archivedNotSelected', () => (
    <SonarContact contact={{ ...sierraOne, status: 'CONTACT_ARCHIVED' }} {...actions} />))
  .add('archivedSelected', () => (
    <SonarContact contact={{ ...sierraOne, status: 'CONTACT_ARCHIVED', selection: 'CONTACT_SELECTED' }} {...actions} />))
  .add('activeNeutral', () => (
    <SonarContact contact={{ ...sierraOne, threat: 'NEUTRAL' }} {...actions} />))
  .add('activeFriendly', () => (
    <SonarContact contact={{ ...sierraOne, threat: 'FRIENDLY' }} {...actions} />))

