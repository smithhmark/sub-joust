import React from 'react';
import {createStore } from 'redux';
import appReducer from './reducers/reducer';
import { Provider } from 'react-redux';

export const store = createStore(appReducer);

export const ProviderWrapper = ({children, store}) => {
  return (<Provider store={store}>
    {children}
  </Provider>);
}
