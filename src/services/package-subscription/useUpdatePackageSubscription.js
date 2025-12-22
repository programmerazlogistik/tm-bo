import useSWRMutation from "swr/mutation";

import { fetcherMuatparts } from "@/lib/axios";

const updatePackageSubscriptionFn = async (url, { arg }) => {
  const { id, data } = arg;
  return await fetcherMuatparts(`/v1/bo/subscription-tm/packages/${id}`, {
    method: "PUT",
    data,
  });
};

export const useUpdatePackageSubscription = () => {
  const { trigger, isMutating, error } = useSWRMutation(
    "/v1/bo/subscription-tm/packages/update",
    updatePackageSubscriptionFn,
    {
      throwOnError: false,
    }
  );

  const updatePackageSubscription = async (id, data) => {
    return await trigger({ id, data });
  };

  return {
    updatePackageSubscription,
    isMutating,
    error,
  };
};
