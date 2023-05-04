const dateFormatter = new Intl.DateTimeFormat("fr-FR", {
  weekday: "long",
  month: "2-digit",
  day: "2-digit",
  year: "2-digit",
  timeZone: "Europe/Paris",
});

export function formatDate(date: Date) {
  return dateFormatter.format(date);
}

export function getDatePortion(date: Date) {
  return date.toISOString().slice(0, 10);
}
