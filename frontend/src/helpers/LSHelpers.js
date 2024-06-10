export const getLSItem = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

export const setLSItem = (key, value) => {
  return localStorage.setItem(key, JSON.stringify(value));
};

export const checkLSItem = (key, propName, value) => {
  return getLSItem(key).find((b) => b[propName] === value);
};

export const pushUniqLSItem = (key, propName, obj) => {
  const list = getLSItem(key);
  if (!checkLSItem(key, propName, obj[propName])) {
    list.push(obj);
    setLSItem(key, list);
    return list;
  }
  return false;
};

export const removeLSItem = (key, propName, value) => {
  if (checkLSItem(key, propName, value)) {
    const filteredCartBooks = getLSItem(key).filter(
      (b) => b[propName] !== value
    );
    setLSItem("cartBooks", filteredCartBooks);
  }
};
