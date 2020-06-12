import { Component, OnInit } from '@angular/core';
import { CountdownService } from './countdown.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  countdown$: Observable<number>;

  constructor(private countdownService: CountdownService) { }

  ngOnInit() {
    this.countdown$ = this.countdownService.countdown$(new Date());
  }
}
