import React from 'react';
import PropTypes from 'prop-types';

import Hostility from './Hostility';

export default function SonarContact(
  {contact: {id, sname, threat, selection, status, dlu, dfe},
    onContactSelected,
    onContactArchived}) {
  let styl = `${threat.toLowerCase()}-contact`;
  return (
    <tr className="sonar-contact contact">
      <td>
      <label className="checkbox">
        <input
          type="checkbox"
          defaultChecked={selection === 'CONTACT_SELECTED'}
          name="selected"
          onChange={() => {console.log("Change"); onContactSelected(id)}} />
        <span className="checkbox-custom"
          onClick={() => {console.log("click"); onContactSelected(id)}}
        />
      </label>
      </td>
      <td>
      <div className="Title">
        <span className={"contact-name " +styl}>{sname}</span>
      </div>
      </td>
      <td>
        <div className="Title">
          <Hostility threat={threat} />
        </div>
      </td>
      <td>
        <div className="Title {styl}">
          <span className="contact-dlu">{dlu.toLocaleDateString()}</span>
        </div>
      </td>
      <td>
        <div className="Title {styl}">
          <span className="contact-dfe">{dfe.toLocaleDateString()}</span>
        </div>
      </td>
      <td>
        <label className="checkbox">
          <input
            type="checkbox"
            defaultChecked={status === 'CONTACT_ARCHIVED'}
            //disabled={true}
            name="archived"
            onChange={() => {console.log("Change"); onContactArchived(id)}} />
          <span className="checkbox-custom"
            onClick={() => {console.log("click"); onContactArchived(id)}} />
        </label>
        <div>
          <span>{}</span>
        </div>
      </td>
    </tr>);
}

SonarContact.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.string.isRequired,
    sname: PropTypes.string.isRequired,
    threat: PropTypes.string.isRequired,
    selection: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    //dfe: PropTypes.date.isRequired,
    //dlu: PropTypes.date.isRequired,
  }),
  onContactSelected: PropTypes.func,
  onContactArchived: PropTypes.func,
};

//export default SonarContact;
