import { Injectable } from '@angular/core';
import { timer, Observable, merge, of, fromEvent } from 'rxjs';
import { scan, takeWhile, map, filter, tap, switchMap, distinctUntilChanged, } from 'rxjs/operators';

import { CountDown } from './countdown';
import { diffToCountdown } from './diffToCountdown';

const minutesAsMS = 60000;

const getDifferenceInMinutes = (date: Date, subtractor: Date) =>
  Math.ceil((date.getTime() - subtractor.getTime()) / minutesAsMS);

const getRemainingMSInMinute = (date: Date) =>
  (59 - date.getSeconds()) * 1000 + 1000 - date.getMilliseconds();

const compareCountDown = (a: CountDown, b: CountDown) =>
  a.status === b.status &&
  a.duration.days === b.duration.days &&
  a.duration.hours === b.duration.hours &&
  a.duration.minutes === b.duration.minutes

interface CountDifference {
  startDiff: number;
  endDiff: number;
}

@Injectable({
  providedIn: 'root'
})
export class CountdownService {
  countdown$(start: Date, end: Date): Observable<CountDown> {
    const getDiffFromNow = () => {
      const now = new Date();
      const duration: CountDifference = {
        startDiff: getDifferenceInMinutes(start, now),
        endDiff: getDifferenceInMinutes(end, now)
      }

      return { duration, delay: getRemainingMSInMinute(now) }
    }

    const getTime$ = ({ duration, delay }) => merge(
      of(duration),
      timer(delay, minutesAsMS).pipe(
        scan(acc => ({
          startDiff: --acc.startDiff,
          endDiff: --acc.endDiff
        }), duration)
      )
    ).pipe(
      map(diffToCountdown),
      takeWhile(countdown => countdown.status != 'done', true)
    )

    return merge(
      of(1),
      fromEvent(document, 'visibilitychange').pipe(
        filter(() => document.visibilityState === 'visible')
      )
    ).pipe(
      map(getDiffFromNow),
      switchMap(getTime$),
      distinctUntilChanged(compareCountDown)
    )
  }
}
