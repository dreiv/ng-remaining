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
    const start = new Date("Jun 10, 2023 11:00:00");
    const end = new Date("Jun 10, 2023 11:30:00");

    // const start = new Date("Jun 10, 2020 11:00:00");
    // const end = new Date("Jun 10, 2020 11:30:00");

    // const start = new Date("Jun 12, 2020 19:00:00");
    // const end = new Date("Jun 12, 2020 21:30:00");

    this.countdown$ = this.countdownService.countdown$(start, end);
  }
}
