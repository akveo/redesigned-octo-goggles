import { DateTime } from 'luxon';

export const isCurrentWeek = (dateString: string): boolean => {
  const date = DateTime.fromISO(dateString);
  const now = DateTime.now();
  
  const startOfWeek = now.startOf('week');
  const endOfWeek = now.endOf('week');
  
  return date >= startOfWeek && date <= endOfWeek;
};
