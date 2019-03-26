import React from 'react';

export const threat_levels = {
  friendly: "FRIENDLY",
  hostile: "HOSTILE",
  neutral: "NEUTRAL",
  unknown: "UNKNOWN",
}
const optionHelper = function(threat, level) {
  let val = level[0] + level.slice(1).toLowerCase();

  if (threat === level) {
    return <option value={level} selected>{val}</option>;
  } else {
    return <option value={level}>{val}</option>;
  }
}
export default function Hostility( {threat, fixed, onHostilityChanged}) {
  if (fixed) {
    return (
      <div className="contact-hostility">
        <select label="Hostility">
          {optionHelper(threat, threat)}
        </select>
      </div>);
  } else {
    return (
      <div className="contact-hostility" onChange={onHostilityChanged}>
        <select>
          {optionHelper(threat, "FRIENDLY")}
          {optionHelper(threat, "NEUTRAL")}
          {optionHelper(threat, "HOSTILE")}
          {optionHelper(threat, "UNKNOWN")}
        </select>
      </div>);
  }
}
