import { Injectable } from '@angular/core';
import { timer, Observable, merge, of } from 'rxjs';
import { scan, takeWhile, map } from 'rxjs/operators';

import { CountDown } from './countdown';
import { diffToCountdown } from './diffToCountdown';

const minutesMs = 60000;

const getMinutesDifference = (date: Date, subtractor: Date) =>
  Math.floor((date.getTime() - subtractor.getTime()) / minutesMs)

interface CountDifference {
  startDiff: number;
  endDiff: number;
}

@Injectable({
  providedIn: 'root'
})
export class CountdownService {
  countdown$(start: Date, end: Date): Observable<CountDown> {
    const now = new Date();
    const duration: CountDifference = {
      startDiff: getMinutesDifference(start, now),
      endDiff: getMinutesDifference(end, now)
    }

    return merge(
      of(duration),
      timer((60 - now.getSeconds()) * 1000, minutesMs).pipe(
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
