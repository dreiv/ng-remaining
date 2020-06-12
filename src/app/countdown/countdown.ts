export type Status = 'remaining' | 'started' | 'done';

export interface Duration {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export interface CountDown {
  status: Status;
  remaining: Duration;
}
