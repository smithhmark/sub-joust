import {
  ISSUE_MANUVER_ORDER
} from '../actions/navigation';

function currentManuver(state = null, action){
  switch (action.type) {
    case ISSUE_MANUVER_ORDER:
      return (action.currentManuver);
  }
  return state;
}

