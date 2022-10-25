import { useState, useEffect } from "react";

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

//处理只在组件第一次加载时调用useEffect
export const useMount = (callback) => {
  useEffect(() => {
    callback();
  }, []);
};

//useEffect是个天然闭包
//状态 state是干什么的呢？ 状态通常是响应式的，也就是它的改变我们应该能检测到它改变，页面可以跟着改变，或者useEffect跟着触发
export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    console.log("debounce", debouncedValue);
    //每次在value变化以后设置一个定时器
    const timeOut = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    //component re-evaluated的时候会清理上次的数据
    return () => {
      clearTimeout(timeOut);
    };
  }, [value, delay, debouncedValue]);
  return debouncedValue;
};

/**
 function test() {
  let a = 1;
  setTimeout(() => {
    a = a + 50;
  }, 2000);
  return a;
}
const b = test();
console.log(b);     //1
 */
