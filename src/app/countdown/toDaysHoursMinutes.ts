import { Duration } from './countdown';

const dayS = 86400;
const hourS = 3600;
const minS = 60;

export const toDaysHoursMinutes = (time: number): Duration => ({
  days: Math.floor(time / dayS),
  hours: Math.floor((time % dayS) / hourS),
  minutes: Math.floor((time % hourS) / minS),
  seconds: Math.floor(time % minS)
})
