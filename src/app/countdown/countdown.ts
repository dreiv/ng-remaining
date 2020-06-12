export type Status = 'remaining' | 'started' | 'done';

export interface Duration {
  days: number;
  hours: number;
  minutes: number;
}

export interface CountDown {
  status: Status;
  duration?: Duration;
}
