export const getLSItem = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

export const setLSItem = (key, value) => {
  return localStorage.setItem(key, JSON.stringify(value));
};

export const checkLSItem = (key, propName, value) => {
  const LS_cartBooks = getLSItem(key);
  return LS_cartBooks.find((b) => b[propName] === value);
};

export const removeLSItem = (key, propName, value) => {
  if (checkLSItem(key, propName, value)) {
    const LS_cartBooks = getLSItem(key);
    const filteredCartBooks = LS_cartBooks.filter((b) => b[propName] !== value);
    setLSItem("cartBooks", filteredCartBooks);
  }
};
