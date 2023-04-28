const dateFormatter = new Intl.DateTimeFormat("fr-FR", {
  dateStyle: "full",
  timeStyle: "short"
});

export function formatDate(date: Date) {
  return dateFormatter.format(date);
}