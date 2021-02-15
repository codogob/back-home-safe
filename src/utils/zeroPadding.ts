export const zeroPadding = (input: string | number) =>
  ("00" + String(input)).slice(-2);
