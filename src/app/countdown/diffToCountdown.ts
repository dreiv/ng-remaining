import { CountDown, Duration } from './countdown';

const dayMins = 1440;
const hourMins = 60;

const toDaysHoursMinutes = (time: number): Duration => ({
  days: Math.floor(time / dayMins),
  hours: Math.floor((time % dayMins) / hourMins),
  minutes: Math.floor(time % hourMins)
})

export const diffToCountdown = ({ startDiff, endDiff }): CountDown => {
  if (endDiff < 0) {
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
