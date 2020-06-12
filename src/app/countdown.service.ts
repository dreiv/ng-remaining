import { Injectable } from '@angular/core';

import { timer } from 'rxjs';
import { scan, takeWhile } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CountdownService {

  constructor() { }

  countdown$(date) {
    return timer(0, 1000).pipe(
      scan(acc => --acc, 120),
      takeWhile(x => x >=0)
    )
  }
}
