import { Injectable } from '@angular/core';
import { timer, Observable, merge, of } from 'rxjs';
import { scan, takeWhile, map, tap, count } from 'rxjs/operators';

import { CountDown } from './countdown';
import { diffToCountdown } from './diffToCountdown';

const secondsMs = 60000;

const getSecondsDifference = (date: Date, subtractor: Date) =>
  Math.floor((date.getTime() - subtractor.getTime()) / secondsMs)

interface CountDifference {
  startDiff: number;
  endDiff: number;
}

@Injectable({
  providedIn: 'root'
})
export class CountdownService {

  constructor() { }

  countdown$(start: Date, end: Date): Observable<CountDown> {
    const now = new Date();
    const duration: CountDifference = {
      startDiff: getSecondsDifference(start, now),
      endDiff: getSecondsDifference(end, now)
    }

    return merge(
      of(duration),
      timer((60 - now.getSeconds()) * 1000, secondsMs).pipe(
        scan(acc => ({
          startDiff: --acc.startDiff,
          endDiff: --acc.endDiff
        }), duration)
      )
    ).pipe(
      map(diffToCountdown),
      takeWhile(countdown => countdown.status != 'done', true)
    )
  }
}
