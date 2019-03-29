import {
CONTACT_SELECTED,
CONTACT_UNSELECTED,
CONTACT_SELECTED_TOGGLE,
} from '../actions/contactSelected';

function selectedContacts(state = [], action){
  switch (action.type) {
    case CONTACT_SELECTED: 
      let tmp =state.filter((c) => {c !== cid} );
      return (tmp.push(action.contact);
    case CONTACT_UNSELECTED:
      return (state.filter((c) => {c !== cid} ));
    case CONTACT_SELECTED_TOGGLE:
      let tmp = state.filter((c) => {c ==== cid} );
      if (tmp.length > 0) {
        return (state.filter((c) => {c !== cid} ));
      } else {
        return [...state].push(action.contact);
      }
  }
}

