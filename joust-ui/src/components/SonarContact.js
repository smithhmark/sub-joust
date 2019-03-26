import React from 'react';

export default function SonarContact({contact: {id, sname, cls, state}, onSelectContact}) {
  return (<div className="sonar-contact contact">
    <span className="contact-name">{sname}</span>
    <span className="contact-state">{state}</span>
    <span className="contact-class">{cls}</span>
    </div>);
}
