export const save = (key: string, value: string) => {
  localStorage.setItem(key, value);
};

export const get = <T>(key: string): T | undefined => {
  return JSON.parse(localStorage.getItem(key) ?? "{}");
};

export const clear = () => {
  localStorage.clear();
};
