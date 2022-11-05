import { useState, useEffect } from "react";

export const isFalsy = (value: unknown) => (value === 0 ? false : !value);

//在一个函数中，改变传入的对象本身是不好的，因为js里的对象是引用类型；会造成传入的对象受到污染

export const cleanObject = (obj: object) => {
  const result = { ...obj };

  Object.keys(result).forEach((key) => {
    //@ts-ignore
    const value = result[key];
    if (isFalsy(value)) {
      //@ts-ignore
      delete result[key];
    }
  });
  return result;
};

//处理只在组件第一次加载时调用useEffect
export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
  }, []);
};

export const useDebounce = <T>(value: T, delay?: number): T => {
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

// interface Test { arrState: T[]; clear: () => void; remove: (index: number) => void;add (obj: T) => void};
export const useArray = <T>(arr: T[]) => {
  const [arrState, setArrState] = useState(arr);

  function add(obj: T) {
    setArrState((prev) => [...prev, obj]);
  }
  function remove(index: number) {
    setArrState((prev) => prev.slice(1));
  }
  function clear() {
    setArrState([]);
  }
  return { value: arrState, clear, removeIndex: remove, add };
};
