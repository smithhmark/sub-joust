import {
  ISSUE_MANUVER_ORDER
} from '../actions/navigation';

const dueSouthFromNullIsland = {
  heading: 180,
  depth: 500,
  spd: 10,
  lat: 0.0,
  lon: 0.0,
}

const startingState = {
  ownShip: dueSouthFromNullIsland,
  currentManuver: null,
}

export default function navStatus(state = startingState, action){
  switch (action.type) {
    case ISSUE_MANUVER_ORDER:
      return ({
        ownShip: state.ownShip,
        currentManuver: action.currentManuver,
      });
  }
  return state;
}

