export function isObject(data: unknown) {
  return typeof data === "object" && data !== null;
}

export function isStringOrNull(data: unknown) {
  return typeof data === "string" || data === null;
}

export function isNonEmptyString(data: unknown): data is string {
  return typeof data === "string" && data.length > 0;
}

export function isValidFfeId(data: unknown) {
  return isNonEmptyString(data) && /^[A-Z]\d+$/.test(data);
}

export function isValidISODateString(data: unknown) {
  return isNonEmptyString(data) && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(data);
  // 2023-05-03T20:40:58.411Z
}

export function isValidNumber(data: unknown): data is number {
  return typeof data === "number" && !isNaN(data);
}

export function isValidNumberOrNull(data: unknown) {
  return data === null || isValidNumber(data);
}
