import { Component, Input } from '@angular/core';
import { Duration } from '../countdown/countdown';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss']
})
export class CounterComponent {
  @Input()
  duration: Duration;

}
