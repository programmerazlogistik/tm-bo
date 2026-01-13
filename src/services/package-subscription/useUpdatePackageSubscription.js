import useSWRMutation from "swr/mutation";

import { fetcherMuatparts } from "@/lib/axios";

// 26. 03 - TM - LB - 0017
const updatePackageSubscriptionFn = async (url, { arg }) => {
  const { id, data } = arg;
  const response = await fetcherMuatparts.put(
    `/v1/bo/subscription-tm/packages/${id}`,
    data
  );
  return response.data;
};

export const useUpdatePackageSubscription = () => {
  const { trigger, isMutating, error } = useSWRMutation(
    "/v1/bo/subscription-tm/packages/update",
    updatePackageSubscriptionFn,
    {
      throwOnError: true,
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
