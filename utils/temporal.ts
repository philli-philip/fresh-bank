export function sinceDate(
  date: string,
  formatter?: Intl.DateTimeFormat,
): string {
  // Create a Temporal.ZonedDateTime for a past event
  const pastEvent = new Date(date);

  // Get the current Temporal.ZonedDateTime
  const now = new Date();

  // Calculate the duration between the current time and the past event
  const duration = now.getTime() - pastEvent.getTime();

  // Get the number of days, hours, and minutes that have passed
  const daysPassed = Math.floor(duration / (1000 * 60 * 60 * 24));
  const hoursPassed = Math.floor(
    duration % (1000 * 60 * 60 * 24) / (1000 * 60 * 60),
  );
  const minutesPassed = Math.floor(duration % (1000 * 60 * 60) / (1000 * 60));

  if (daysPassed > 5) {
    return formatter?.format(pastEvent) ?? date.slice(0, 10);
  }

  if (daysPassed > 0) {
    return `${daysPassed} days ago`;
  }
  if (daysPassed === 1) {
    return "yesterday";
  }
  if (hoursPassed > 0) {
    return `${hoursPassed} hours ago`;
  }
  if (minutesPassed > 0) {
    return `${minutesPassed} min ago`;
  }
  return "just now";
}
