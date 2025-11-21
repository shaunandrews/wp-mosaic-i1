/**
 * Formats a date as a "time since" string (e.g., "1s", "1m", "12h", "1d", "30d", "1mo", "1y")
 * @param date - The date to format (can be a Date object, date string, or null)
 * @returns A formatted string representing the time since the date, or empty string if null
 */
export const formatTimeSince = (date: Date | string | null): string => {
  if (!date) {
    return '';
  }
  
  const now = new Date();
  const then = typeof date === 'string' ? new Date(date) : date;
  const diffInSeconds = Math.floor((now.getTime() - then.getTime()) / 1000);

  // Less than 1 minute
  if (diffInSeconds < 60) {
    return `${diffInSeconds}s`;
  }

  // Less than 1 hour
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes}m`;
  }

  // Less than 1 day
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours}h`;
  }

  // Less than 1 month (approximate, using 30 days)
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return `${diffInDays}d`;
  }

  // Less than 1 year (approximate, using 12 months)
  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths}mo`;
  }

  // 1 year or more
  const diffInYears = Math.floor(diffInMonths / 12);
  return `${diffInYears}y`;
};

