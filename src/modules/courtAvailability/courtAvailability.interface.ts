export type AvailabilitySource = 'CUSTOM' | 'DEFAULT_24H';

export type EffectiveAvailability = {
  source: AvailabilitySource;
  availability: {
    dayOfWeek: number;
    startTime: string;
    endTime: string;
    isAvailable: boolean;
  };
};

export type TimeSlot = {
  startTime: string;
  endTime: string;
};