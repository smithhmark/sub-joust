import React from 'react';
import Hostility from './Hostility';

export default function SonarContact(
  {contact: {id, sname, threat, selection, status, dlu, dfe}, onSelectContact, onContactArchived}) {
  let styl = `${threat.toLowerCase()}-contact`;
  return (
    <tr className="sonar-contact contact">
      <td>
      <label className="checkbox">
        <input
          type="checkbox"
          defaultChecked={selection === 'CONTACT_SELECTED'}
          disabled={true}
          name="selected"
        />
        <span className="checkbox-custom" onClick={() => onSelectContact(id)} />
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
          />
          <span className="checkbox-custom" onClick={() => onSelectContact(id)} />
        </label>
        <div>
          <span>{}</span>
        </div>
      </td>
    </tr>);
}
