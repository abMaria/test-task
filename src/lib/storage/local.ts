export const get = async <T>(key: string, fallback: T): Promise<T> => {
  const source = localStorage.getItem(key);

  if (!source) {
    return fallback;
  }

  return JSON.parse(source);
};

export const set = async <T>(key: string, val: T): Promise<void> => {
  localStorage.setItem(key, JSON.stringify(val));
};
