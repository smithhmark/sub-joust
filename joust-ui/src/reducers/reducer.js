import {combineReducers } from 'redux';
import {selectedContacts} from './contactSelected';

const appReducer = combineReducers({
  selectedContacts,
});

export default appReducer;
