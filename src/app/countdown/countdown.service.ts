import { Injectable } from '@angular/core';
import { timer, Observable } from 'rxjs';
import { scan, takeWhile, map, tap, count } from 'rxjs/operators';

import { toDaysHoursMinutes } from './toDaysHoursMinutes';
import { CountDown } from './countdown';

const toDurationSec = (date: number, subtractor: number) =>
  Math.floor((date - subtractor) / 1000)
@Injectable({
  providedIn: 'root'
})
export class CountdownService {

  constructor() { }

  countdown$(start: Date, end: Date): Observable<CountDown> {
    const now = new Date().getTime();
    const duration = {
      startDiff: toDurationSec(start.getTime(), now),
      endDiff: toDurationSec(end.getTime(), now)
    }

    return timer(0, 10).pipe(
      scan(acc => ({
        startDiff: --acc.startDiff,
        endDiff: --acc.endDiff
      }), duration),
      map(diff => {
        if (diff.endDiff <= 0) {
          return { status: 'done' }
        } else if (diff.startDiff <= 0) {
          return {
            status: 'started',
            remaining: toDaysHoursMinutes(diff.endDiff)
          }
        } else {
          return {
            status: 'remaining',
            remaining: toDaysHoursMinutes(diff.startDiff)
          }
        }
      }),
      tap(console.log),
      takeWhile(countdown => countdown.status != 'done', true)
    )
  }
}
