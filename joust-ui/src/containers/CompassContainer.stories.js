import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import {store, ProviderWrapper} from '../store';

import CompassC from './CompassContainer';

const withProvider = (story) => {
  return (<ProviderWrapper store={store}>
    {story()}
  </ProviderWrapper>);
}

storiesOf('CompassContainer', module)
  .addDecorator(withProvider)
  .add('default', 
    () => {return (<CompassC />)})
