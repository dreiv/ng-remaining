import { CountDown, Duration } from './countdown';

const dayS = 86400;
const hourS = 3600;
const minS = 60;

const toDaysHoursMinutes = (time: number): Duration => ({
  days: Math.floor(time / dayS),
  hours: Math.floor((time % dayS) / hourS),
  minutes: Math.floor((time % hourS) / minS)
})

export const diffToCountdown = ({ startDiff, endDiff }): CountDown => {
  if (endDiff <= 0) {
    return { status: 'done' };
  } else if (startDiff <= 0) {
    return {
      status: 'started',
      duration: toDaysHoursMinutes(endDiff)
    }
  }

  return {
    status: 'remaining',
    duration: toDaysHoursMinutes(startDiff)
  }
}
