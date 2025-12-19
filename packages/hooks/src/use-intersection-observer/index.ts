import { useEffect, useRef, useState } from "react";

/**
 * Result interface for useIntersectionObserver hook.
 */
export interface IntersectionObserverResult {
  ref: React.RefObject<HTMLElement | null>;
  isIntersecting: boolean;
  entry: IntersectionObserverEntry | null;
}

/**
 * A robust, reusable hook for the Intersection Observer API.
 *
 * @param options - The observer options (root, rootMargin, threshold).
 * @returns An object containing the ref to attach, a boolean for intersection status, and the full observer entry.
 *
 * @example
 * const { ref, isIntersecting, entry } = useIntersectionObserver({
 *   threshold: 0.1
 * });
 *
 * return (
 *   <div ref={ref}>
 *     {isIntersecting ? 'Visible' : 'Not visible'}
 *   </div>
 * );
 */
export const useIntersectionObserver = (
  options?: IntersectionObserverInit
): IntersectionObserverResult => {
  // State to store the observer entry.
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);

  // A ref to hold the DOM element we want to observe.
  const ref = useRef<HTMLElement | null>(null);

  // Memoize the options to prevent the effect from re-running on every render
  // if the options object is defined inline.
  const frozenOptions = JSON.stringify(options);

  useEffect(() => {
    const node = ref?.current; // The element to observe

    // Ensure the node exists and the observer is supported.
    const hasIOSupport = !!window.IntersectionObserver;
    if (!hasIOSupport || !node) return;

    const observerOptions: IntersectionObserverInit = JSON.parse(frozenOptions);

    // Create the observer with a callback that updates our state.
    const observer = new IntersectionObserver(([entry]) => {
      setEntry(entry || null);
    }, observerOptions);

    // Start observing the element.
    observer.observe(node);

    // --- Best Practice: Cleanup ---
    // This cleanup function is called when the component unmounts or
    // when the dependencies (the node or options) change.
    return () => {
      observer.disconnect();
    };
  }, [ref, frozenOptions]);

  return {
    ref,
    isIntersecting: entry?.isIntersecting ?? false,
    entry,
  };
};
