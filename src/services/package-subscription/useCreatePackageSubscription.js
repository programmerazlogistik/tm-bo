import useSWRMutation from "swr/mutation";

import { fetcherMuatparts } from "@/lib/axios";

const createPackageSubscriptionFn = async (url, { arg }) => {
  return await fetcherMuatparts("/v1/bo/subscription-tm/packages", {
    method: "POST",
    data: arg,
  });
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
