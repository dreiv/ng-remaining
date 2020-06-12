import { Injectable } from '@angular/core';
import { timer, Observable } from 'rxjs';
import { scan, takeWhile, map, tap, count } from 'rxjs/operators';

import { CountDown } from './countdown';
import { diffToCountdown } from './diffToCountdown';

const getSecondsDifference = (date: number, subtractor: number) =>
  Math.floor((date - subtractor) / 1000)

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
    const now = new Date().getTime();
    const duration: CountDifference = {
      startDiff: getSecondsDifference(start.getTime(), now),
      endDiff: getSecondsDifference(end.getTime(), now)
    }

    return timer(0, 1000).pipe(
      scan(acc => ({
        startDiff: --acc.startDiff,
        endDiff: --acc.endDiff
      }), duration),
      map(diffToCountdown),
      tap(console.log),
      takeWhile(countdown => countdown.status != 'done', true)
    )
  }
}
