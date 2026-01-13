import useSWRMutation from "swr/mutation";

import { fetcherMuatparts } from "@/lib/axios";

const updatePackageSubscriptionStatusFn = async (url, { arg }) => {
  const { id, data } = arg;
  const response = await fetcherMuatparts.patch(
    `/v1/bo/subscription-tm/packages/${id}/status`,
    data
  );
  return response.data;
};

export const useUpdatePackageSubscriptionStatus = () => {
  const { trigger, isMutating, error } = useSWRMutation(
    "/v1/bo/subscription-tm/packages/status",
    updatePackageSubscriptionStatusFn,
    {
      throwOnError: true,
    }
  );

  const updatePackageSubscriptionStatus = async (id, isActive) => {
    return await trigger({ id, data: { isActive } });
  };

  return {
    updatePackageSubscriptionStatus,
    isMutating,
    error,
  };
};
