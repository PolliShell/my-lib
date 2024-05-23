export const getFromLS = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

export const addToLS = (key, value) => {
  return localStorage.setItem(key, JSON.stringify(value));
};

export const checkObjectByPropInLS = (key, propName, value) => {
  const data = getFromLS(key);
  if (data) {
    return data.find((i) => i[propName] === value) ? true : false;
  }
  return false;
};

export const checkItemFromLS = (key, propName, value) => {
  const LS_cartBooks = getFromLS(key);
  return LS_cartBooks.find((b) => b[propName] === value);
};

export const removeItemFromLS = (key, propName, value) => {
  if (checkItemFromLS(key, propName, value)) {
    const LS_cartBooks = getFromLS(key);
    const filteredCartBooks = LS_cartBooks.filter((b) => b[propName] !== value);
    addToLS("cartBooks", filteredCartBooks);
  }
};
