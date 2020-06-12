import { CountDown, Duration } from './countdown';

const dayS = 1440;
const hourS = 60;

const toDaysHoursMinutes = (time: number): Duration => ({
  days: Math.floor(time / dayS),
  hours: Math.floor((time % dayS) / hourS),
  minutes: Math.floor(time % hourS)
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
