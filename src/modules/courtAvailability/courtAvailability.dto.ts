export interface UpdateCourtAvailabilityDto {
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

export interface GetAvailableSlotsQuery {
  date: string; // YYYY-MM-DD
}