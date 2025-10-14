export const getStorage = (key: string) => {
  const data = localStorage.getItem(key);
  if (data == undefined || data == null) {
    return null;
  }
  return JSON.parse(data);
};

export const setStorage = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const deleteStorage = (key: string) => {
  localStorage.removeItem(key);
};
