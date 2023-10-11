export const formDataToObject = (
  data: FormData
): Record<string, FormDataEntryValue> => {
  const object: Record<string, FormDataEntryValue> = {};

  for (const [key, value] of Array.from(data.entries())) {
    object[key] = value;
  }

  return object;
};
