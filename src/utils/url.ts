import { useMemo } from "react";
import { URLSearchParamsInit, useSearchParams } from "react-router-dom";
import { cleanObject } from "utils";

//返回页面url中，指定键的参数值
export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  //这也是state值，更新会触发re-render
  const [searchParams] = useSearchParams();
  const setSearchParams = useSetUrlSearchParam();
  //const [stateKeys] = useState(keys);
  console.log("useUrlquery");
  return [
    useMemo(
      () =>
        keys.reduce((prev, key) => {
          return {
            ...prev,
            [key]: searchParams.get(key) || "",
          };
        }, {} as { [key in K]: string }),
      //这里如果加进来keys时仍会出现无限循环的情况；
      //解决办法1. 把传进来的keys定义为state。这样只要我们不使用setState更新state的值，则keys就不会重新创建，两次effect比较就想等
      // [searchParams,stateKeys]
      //2.
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [searchParams]
    ),
    async (params: Partial<{ [key in K]: unknown }>) => {
      return setSearchParams(params);
    },
  ] as const;
};

export const useSetUrlSearchParam = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  return (params: { [key in string]: unknown }) => {
    const o = cleanObject({
      ...Object.fromEntries(searchParams),
      ...params,
    }) as URLSearchParamsInit;
    console.log(o);
    return setSearchParams(o);
  };
};

//as const
/**
 * let a = ["12",16,{gender:"male"}]
   let a = ["12",16,{gender:"male"}] as const
 *
 * key in string
 * 
 * 
 * 
 * 
 * if variant type defined as K[] and we pass into argument as ["name","personId"]  then K = "name" | "personId"
 */
