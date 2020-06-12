import { Injectable } from '@angular/core';

import { timer, Observable } from 'rxjs';
import { scan, takeWhile, map, tap } from 'rxjs/operators';
import { toDaysHoursMinutes } from './toDaysHoursMinutes';

@Injectable({
  providedIn: 'root'
})
export class CountdownService {

  constructor() { }

  countdown$(date): Observable<any> {
    const now = new Date().getTime();
    var duration = Math.floor((date - now) / 1000);

    return timer(0, 1000).pipe(
      scan(acc => --acc, duration),
      tap(console.log),
      takeWhile(x => x >=0),
      map(time => toDaysHoursMinutes(time)),
      tap(console.log)
    )
  }
}
