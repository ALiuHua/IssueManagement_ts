import { useCallback, useState } from "react";
import { useMountedRef } from "utils";

interface State<D> {
  error: Error | null;
  data: D | null;
  stat: "idle" | "loading" | "error" | "success";
}
const defaultInitialState: State<null> = {
  stat: "idle",
  data: null,
  error: null,
};

const defaultConfig = { throwOnError: false };

export const useAsync = <D>(
  initialState?: State<D>,
  initialConfig?: typeof defaultConfig
) => {
  const [state, setState] = useState<State<D>>({
    ...defaultInitialState,
    ...initialState,
  });
  const config = { ...defaultConfig, ...initialConfig };
  const mountedRef = useMountedRef();
  const [retry, setRetry] = useState(() => () => {});
  const setData = useCallback((data: D) => {
    setState({
      data,
      stat: "success",
      error: null,
    });
  }, []);

  const setError = useCallback((error: Error) => {
    setState({ data: null, error, stat: "error" });
  }, []);

  const run = useCallback(
    async (promise: Promise<D>, retryConfig?: () => Promise<D>) => {
      //这里的promise其实是对请求结果的消化，传进来的是请求的结果
      if (!promise || !promise.then()) {
        throw new Error("请传入 Promise 类型数据");
      }
      setRetry(() => () => {
        if (retryConfig) {
          run(retryConfig(), retryConfig);
        }
      });
      setState((state) => {
        return { ...state, stat: "loading" };
      });
      return promise
        .then((data) => {
          if (mountedRef) setData(data);
          return data;
        })
        .catch((error) => {
          setError(error);
          if (config.throwOnError) {
            return Promise.reject(error);
          }
          return error;
        });
    },
    [setData, setError, config.throwOnError, mountedRef]
  );

  return {
    isIdle: state.stat === "idle",
    isLoading: state.stat === "loading",
    isError: state.stat === "error",
    isSuccess: state.stat === "success",
    run,
    setData,
    setError,
    //retry 被调用时，重新跑一遍run 让state刷新一遍
    retry,
    ...state,
  };
};
