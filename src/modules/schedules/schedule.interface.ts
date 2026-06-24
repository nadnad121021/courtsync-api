export interface ISchedule {
  id: string;
  courtId: string;
  dayOfWeek: DayOfWeek;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type DayOfWeek =
  | 'MONDAY'
  | 'TUESDAY'
  | 'WEDNESDAY'
  | 'THURSDAY'
  | 'FRIDAY'
  | 'SATURDAY'
  | 'SUNDAY';

export interface IScheduleException {
  id: string;
  courtId: string;
  date: string;
  startTime?: string;
  endTime?: string;
  reason?: string;
  isAvailable: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateSchedule {
  courtId: string;
  dayOfWeek: DayOfWeek;
  startTime: string;
  endTime: string;
  isAvailable?: boolean;
}

export interface ICreateScheduleException {
  courtId: string;
  date: string;
  startTime?: string;
  endTime?: string;
  reason?: string;
  isAvailable: boolean;
}