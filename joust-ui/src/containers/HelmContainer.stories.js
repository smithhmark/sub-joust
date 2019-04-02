import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import {store, ProviderWrapper} from '../store';

import HelmC from './HelmContainer';

const withProvider = (story) => {
  return (<ProviderWrapper store={store}>
    {story()}
  </ProviderWrapper>);
}

storiesOf('HelmContainer', module)
  .addDecorator(withProvider)
  .add('default', 
    () => {return (<HelmC />)})
