import { Component, OnInit, Input } from '@angular/core';
import { Duration } from '../countdown/countdown';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss']
})
export class CounterComponent implements OnInit {
  @Input()
  duration: Duration;

  constructor() { }

  ngOnInit(): void {
  }

}
