import React from 'react';
//import Hostility from './Hostility';

import SonarContact from './SonarContact';

export default function ContactList(
  {contacts, onContactArchived, onContactSelected}) {
  return (
    <div className="contact-list">
      <table>
        <tbody>
          {contacts.map((c) => {
              return (
                <SonarContact
                  contact={c}
                  onContactArchived={onContactArchived}
                  onContactSelected={onContactSelected}/>)})
          }
        </tbody>
      </table>
    </div>
  );
};

