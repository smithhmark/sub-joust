import React from 'react';
import { storiesOf } from '@storybook/react';
import {action } from '@storybook/addon-actions';

import ContactList from './ContactList';
import { sierraOne, actions } from './SonarContact.stories';

const sierraTwo = {...sierraOne, id:'2', sname:'Sierra 2', threat:"UNKNOWN"};
const sierraThree = {...sierraOne, id:'3', sname:'Sierra 3', threat:"FRIENDLY"};

const simpleContacts = [
  sierraOne, sierraTwo, sierraThree
];

storiesOf('ContactList', module)
  .add('single active contact',
          () => <ContactList contacts={[sierraOne]} {...actions} />)
  .add('three active contact',
          () => <ContactList contacts={simpleContacts} {...actions} />)
  .add('activeSelected', () => (
    <ContactList
      contacts={[
        sierraTwo,
        { ...sierraOne, selection: 'CONTACT_SELECTED' },
        sierraThree]}
      {...actions} />))

