"use client";

import * as React from "react";

import debounce from "lodash.debounce";

export function useUnmount(func: () => void): void {
  const funcRef = React.useRef(func);

  funcRef.current = func;

  React.useEffect(
    () => () => {
      funcRef.current();
    },
    []
  );
}

export interface DebouncedFunction<T extends (...args: any[]) => any> {
  (...args: Parameters<T>): ReturnType<T>;
  cancel: () => void;
  isPending: () => boolean;
  flush: () => ReturnType<T> | undefined;
}

export function useDebounceCallback<T extends (...args: any[]) => any>(
  func: T,
  delay: number = 500,
  options?: Parameters<typeof debounce>[2]
): DebouncedFunction<T> {
  const debouncedFunc = React.useRef<ReturnType<typeof debounce> | null>(null);

  useUnmount(() => {
    if (debouncedFunc.current) {
      debouncedFunc.current.cancel();
    }
  });

  const debounced = React.useMemo(() => {
    const debouncedFuncInstance = debounce(func, delay, options);

    const wrappedFunc = ((...args: Parameters<T>) => {
      return debouncedFuncInstance(...args);
    }) as DebouncedFunction<T>;

    wrappedFunc.cancel = () => {
      debouncedFuncInstance.cancel();
    };

    wrappedFunc.isPending = () => {
      return !!debouncedFunc.current;
    };

    wrappedFunc.flush = () => {
      return debouncedFuncInstance.flush();
    };

    return wrappedFunc;
  }, [func, delay, options]);

  React.useEffect(() => {
    debouncedFunc.current = debounce(func, delay, options);
  }, [func, delay, options]);

  return debounced;
}
