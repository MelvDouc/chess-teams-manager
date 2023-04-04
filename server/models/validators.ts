export function isNonEmptyString(value: unknown) {
  return typeof value === "string" && value !== "";
}

export function isValidFfeId(value: string) {
  return /^[A-Z]\d+$/.test(value);
}

export function isValidEmail(value: string) {
  return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value);
}