import { useState, useEffect, useRef } from "react";
import { Navigate } from "react-router";

export const isVoid = (value: unknown) =>
  value === "" || value === undefined || value === null;

//在一个函数中，改变传入的对象本身是不好的，因为js里的对象是引用类型；会造成传入的对象受到污染
// object的覆盖类型很广，这里我们想要键值对类型的对象，所以可以使用 {[key:string]:unknown}
// let c = {...()=>{}} 因为解构函数是没有意义的，所以会返回一个空对象c
export const cleanObject = (obj: { [key: string]: unknown }) => {
  const result = { ...obj };

  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (isVoid(value)) {
      delete result[key];
    }
  });
  return result;
};

//处理只在组件第一次加载时调用useEffect
export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
    //eslint-disable-next-line react-hooks/exhaustive-deps
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

export const useDocumentTitle = (
  title: string,
  keepOnUnmount: boolean = true
) => {
  const oldTitle = useRef(document.title).current;
  useEffect(() => {
    document.title = title;
    return () => {
      if (!keepOnUnmount) {
        document.title = oldTitle;
      }
    };
  }, [title, oldTitle, keepOnUnmount]);
};

export const resetRoute = () => {
  //重置路由到主页面并且刷新整个页面
  window.location.href = window.location.origin;
  //window.location.origin 是什么？
};
