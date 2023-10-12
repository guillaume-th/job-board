export const capitalize = (str: string): string =>
  str?.length ? str[0].toUpperCase() + str.slice(1) : "";
