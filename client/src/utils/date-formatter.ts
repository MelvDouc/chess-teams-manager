export function formatMatchDate(date: Date): string {
  const month = addLeadingZero(date.getMonth()),
    monthDay = addLeadingZero(date.getDate()),
    hours = addLeadingZero(date.getHours()),
    minutes = addLeadingZero(date.getMinutes());

  return `${date.getFullYear()}-${month}-${monthDay} ${hours}:${minutes}`;
}

function addLeadingZero(input: string | number) {
  return String(input).padStart(2, "0");
}