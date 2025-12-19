import useSWR from "swr";
import useSWRMutation from "swr/mutation";

// Define all types used in this module (self-contained)
export type SWRHookResult<T> = import("swr").SWRResponse<T, any>;

export interface SWRMutationResult<T> {
  trigger: (data: any) => Promise<T>;
  isMutating: boolean;
  data: T | undefined;
  error: any;
  reset: () => void;
}

export interface SWRAdapterResult {
  useSWRHook: <T>(
    key: string | null,
    axiosOptions?: object,
    swrOptions?: import("swr").SWRConfiguration
  ) => SWRHookResult<T>;
  useSWRMutateHook: <T>(
    key: string,
    method?: HTTPMethod,
    axiosOptions?: object,
    swrOptions?: any
  ) => SWRMutationResult<T>;
}

type HTTPMethod = "POST" | "PUT" | "PATCH" | "DELETE";

/**
 * Create SWR hooks with a custom fetcher
 * @param fetcher - The axios instance to use for requests
 * @returns {SWRAdapterResult}
 */
export function createSWRAdapter(fetcher: any): SWRAdapterResult {
  /**
   * Reusable SWR data fetching hook using axios.
   * @template T
   * @param key - The SWR key (usually the API endpoint).
   * @param axiosOptions - Axios options.
   * @param swrOptions - SWR options.
   * @returns {import("swr").SWRResponse<T, any>}
   */
  function useSWRHook<T>(
    key: string | null,
    axiosOptions: object = {},
    swrOptions: import("swr").SWRConfiguration = {}
  ): SWRHookResult<T> {
    const fetcherFn = async (url: string) => {
      const res = await fetcher.get(url, axiosOptions);
      return res.data;
    };
    return useSWR<T, any>(key, fetcherFn, swrOptions) as SWRHookResult<T>;
  }

  /**
   * Reusable SWR mutation hook using axios.
   * @template T
   * @param key - The SWR key (usually the API endpoint).
   * @param method - HTTP method.
   * @param axiosOptions - Axios options.
   * @param swrOptions - SWR mutation options.
   * @returns {SWRMutationResult<T>}
   */
  function useSWRMutateHook<T>(
    key: string,
    method: HTTPMethod = "POST",
    axiosOptions: object = {},
    swrOptions: any = {}
  ): SWRMutationResult<T> {
    const fetcherFn = async (url: string, { arg }: { arg: any }) => {
      const res = await fetcher[method.toLowerCase() as Lowercase<HTTPMethod>](
        url,
        arg,
        axiosOptions
      );
      return res.data;
    };
    const { trigger, isMutating, data, error, reset } = useSWRMutation<T, any>(
      key,
      fetcherFn,
      swrOptions
    );
    return { trigger, isMutating, data, error, reset };
  }

  return { useSWRHook, useSWRMutateHook };
}

export default createSWRAdapter;
