import useSWRMutation from "swr/mutation";

import { fetcherMuatparts } from "@/lib/axios";

const deletePackageSubscriptionFn = async (url, { arg }) => {
  const response = await fetcherMuatparts.delete(
    `/v1/bo/subscription-tm/packages/${arg}`
  );
  return response.data;
};

export const useDeletePackageSubscription = () => {
  const { trigger, isMutating, error } = useSWRMutation(
    "/v1/bo/subscription-tm/packages",
    deletePackageSubscriptionFn,
    {
      throwOnError: true,
    }
  );

  const deletePackageSubscription = async (id) => {
    return await trigger(id);
  };

  return {
    deletePackageSubscription,
    isMutating,
    error,
  };
};
