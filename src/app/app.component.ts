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
    const start = new Date();
    start.setMinutes(start.getMinutes() + 15);
    const end = new Date();
    end.setHours(end.getHours() + 1, end.getMinutes() + 5);

    this.countdown$ = this.countdownService.countdown$(start, end);
  }
}
