import { useLayoutEffect, useRef, useState } from "react";

/**
 * Result interface for useClientWidth hook.
 */
export interface ClientWidthResult {
  ref: React.MutableRefObject<HTMLElement | null>;
  width: number;
}

/**
 * A robust custom hook to get the real-time clientWidth of an element.
 * It uses a ResizeObserver to efficiently update the width whenever the element's size changes.
 *
 * @returns An object containing the ref to attach to the element and its current width.
 *
 * @example
 * const { ref, width } = useClientWidth();
 *
 * return (
 *   <div ref={ref}>
 *     Element width: {width}px
 *   </div>
 * );
 */
export const useClientWidth = (): ClientWidthResult => {
  const ref = useRef<HTMLElement | null>(null);
  const [width, setWidth] = useState<number>(0);

  useLayoutEffect(() => {
    // The target element is the current value of the ref.
    const element = ref.current;

    // Exit early if the element is not yet available.
    if (!element) {
      return;
    }

    // The ResizeObserver will fire the callback whenever the element's size changes.
    const observer = new ResizeObserver(() => {
      // When a change is detected, update the state with the new clientWidth.
      setWidth(element.clientWidth);
    });

    // Start observing the element.
    observer.observe(element);

    // Define a cleanup function to disconnect the observer when the component unmounts.
    // This is crucial for preventing memory leaks.
    return () => {
      observer.disconnect();
    };
  }, []); // The empty dependency array ensures this effect runs only once on mount.

  // Return the ref and the reactive width value.
  return { ref, width };
};
