import { devtools } from "zustand/middleware";

/**
 * Store configuration function type for Zustand.
 */
export type ZustandStoreConfig<T> = (set: any, get: any, api?: any) => T;

/**
 * Zustand devtools middleware that only applies in development environment.
 * In production, returns the store configuration function unchanged.
 * In development, wraps the store with devtools for debugging capabilities.
 *
 * @template T
 * @param fn - Store configuration function
 * @returns Store configuration with or without devtools
 *
 * @example
 * const useStore = create(
 *   zustandDevtools((set, get) => ({
 *     count: 0,
 *     increment: () => set((state) => ({ count: state.count + 1 })),
 *   }))
 * );
 */
export const zustandDevtools = <T>(
  fn: ZustandStoreConfig<T>,
  options?: { name?: string }
): ZustandStoreConfig<T> =>
  process.env.NODE_ENV === "development" ? devtools(fn, options) : fn;
