import {combineReducers } from 'redux';
import selectedContacts from './contactSelected';
import navStatus from './navigation';

const appReducer = combineReducers({
  selectedContacts,
  navStatus,
});

export default appReducer;
