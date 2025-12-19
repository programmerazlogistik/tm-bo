import { useLayoutEffect, useRef, useState } from "react";

/**
 * Result interface for useClientHeight hook.
 */
export interface ClientDimensions {
  ref: React.MutableRefObject<HTMLElement | null>;
  height: number;
}

/**
 * A robust custom hook to get the real-time clientHeight of an element.
 * It uses a ResizeObserver to efficiently update the height whenever the element's size changes.
 *
 * @returns An object containing the ref to attach to the element and its current height.
 *
 * @example
 * const { ref, height } = useClientHeight();
 *
 * return (
 *   <div ref={ref}>
 *     Element height: {height}px
 *   </div>
 * );
 */
export const useClientHeight = (): ClientDimensions => {
  const ref = useRef<HTMLElement | null>(null);
  const [height, setHeight] = useState<number>(0);

  useLayoutEffect(() => {
    // The target element is the current value of the ref.
    const element = ref.current;

    // Exit early if the element is not yet available.
    if (!element) {
      return;
    }

    // The ResizeObserver will fire the callback whenever the element's size changes.
    const observer = new ResizeObserver(() => {
      // When a change is detected, update the state with the new clientHeight.
      setHeight(element.clientHeight);
    });

    // Start observing the element.
    observer.observe(element);

    // Define a cleanup function to disconnect the observer when the component unmounts.
    // This is crucial for preventing memory leaks.
    return () => {
      observer.disconnect();
    };
  }, []); // The empty dependency array ensures this effect runs only once on mount.

  // Return the ref and the reactive height value.
  return { ref, height };
};
