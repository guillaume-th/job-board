export const formDataToObject = (
  data: FormData
): Record<string, FormDataEntryValue> => Object.fromEntries(data);
