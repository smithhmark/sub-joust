

const CONTACT_SELECTED = "CONTACT_SELECTED";
const CONTACT_UNSELECTED = "CONTACT_UNSELECTED";
const CONTACT_SELECTED_TOGGLE = "CONTACT_SELECTED_TOGGLE";

function selectContact(cid) {
  return {
    type: CONTACT_SELECTED,
    contact: cid,
  };
}

function unselectContact(cid) {
  return {
    type: CONTACT_SELECTED,
    contact: cid,
  };
}

function toggleContactSelected(cid) {
  return {
    type: CONTACT_SELECTED_TOGGLE,
    contact: cid,
  };
}

