
import { shape, number, string, oneOf } from 'prop-types';

export const NavStatusType = shape({
  heading: number.isRequired, 
  depth: number.isRequired, 
  spd: number.isRequired, 
  lat: number.isRequired, 
  lon: number.isRequired,
});

export const SensorContactType = shape({
  id: string.isRequired,
  sname: string.isRequired,
  threat: string.isRequired,
  selection: string.isRequired,
  status: string.isRequired,
  //dfe: date.isRequired,
  //dlu: date.isRequired,
});

export const ThrottleOrderType = shape({
  newSpeed: number.isRequired,
  throttleOrder: string.isRequired,
});

export const HeadingChangeOrderType = shape({
  newHeading: number.isRequired,
  rudderOrder: string.isRequired,
});

export const DepthChangeOrderType = shape({
  newDepth: number.isRequired,
  diveOrder: string.isRequired,
});

