import {
CONTACT_SELECTED,
CONTACT_UNSELECTED,
CONTACT_SELECTED_TOGGLE,
} from '../actions/contactSelection';

export default function selectedContacts(state = [], action){
  let tmp;
  switch (action.type) {
    case CONTACT_SELECTED: 
      tmp = state.filter((c) => {c !== cid} );
      return (tmp.push(action.contact));
    case CONTACT_UNSELECTED:
      return (state.filter((c) => {c !== cid} ));
    case CONTACT_SELECTED_TOGGLE:
      tmp = state.filter((c) => {c === cid} );
      if (tmp.length > 0) {
        return (state.filter((c) => {c !== cid} ));
      } else {
        return [...state].push(action.contact);
      }
  }
  return state;
}

