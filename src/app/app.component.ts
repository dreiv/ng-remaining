import { Component, OnInit } from '@angular/core';
import { CountdownService } from './countdown/countdown.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  countdown$: Observable<any>;

  constructor(private countdownService: CountdownService) { }

  ngOnInit() {
    const when = new Date();
    when.setHours(when.getHours() + 3);

    this.countdown$ = this.countdownService.countdown$(when);
  }
}
