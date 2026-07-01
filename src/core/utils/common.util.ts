import crypto from 'crypto';

export function toMinutes(time: string) {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
}

export function toTime(minutes: number) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;

  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:00`;
}


export function generateBookingCode() {
  return `BK-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${crypto
    .randomBytes(3)
    .toString('hex')
    .toUpperCase()}`;
}

export function formatDuration(startTime: string, endTime: string): string {
  const minutes = toMinutes(endTime) - toMinutes(startTime);

  const hours = minutes / 60;

  if (Number.isInteger(hours)) {
    return `${hours} hr${hours > 1 ? 's' : ''}`;
  }

  return `${hours.toFixed(1)} hrs`;
}