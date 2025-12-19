import { useEffect, useRef } from "react";

/**
 * A custom hook that stores the previous value of a variable.
 * @template T
 * @param value The current value.
 * @returns The value from the previous render.
 */
export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>(undefined);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}
