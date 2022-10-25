export const isFalsy = (value) => (value === 0 ? false : !value);

//在一个函数中，改变传入的对象本身是不好的，因为js里的对象是引用类型；会造成传入的对象受到污染

export const cleanObject = (obj) => {
  const result = { ...obj };

  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (isFalsy(value)) {
      delete result[key];
    }
  });
  return result;
};
