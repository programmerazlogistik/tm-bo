import useSWRMutation from "swr/mutation";

import { fetcherMuatparts } from "@/lib/axios";

const createPackageSubscriptionFn = async (url, { arg }) => {
  const response = await fetcherMuatparts.post(
    "/v1/bo/subscription-tm/packages",
    arg
  );
  return response.data;
};

export const useCreatePackageSubscription = () => {
  const { trigger, isMutating, error } = useSWRMutation(
    "/v1/bo/subscription-tm/packages/create",
    createPackageSubscriptionFn,
    {
      throwOnError: false,
    }
  );

  const createPackageSubscription = async (data) => {
    return await trigger(data);
  };

  return {
    createPackageSubscription,
    isMutating,
    error,
  };
};
