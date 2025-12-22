import useSWRMutation from "swr/mutation";

import { fetcherMuatparts } from "@/lib/axios";

const deletePackageSubscriptionFn = async (url, { arg }) => {
  return await fetcherMuatparts(`/v1/bo/subscription-tm/packages/${arg}`, {
    method: "DELETE",
  });
};

export const useDeletePackageSubscription = () => {
  const { trigger, isMutating, error } = useSWRMutation(
    "/v1/bo/subscription-tm/packages",
    deletePackageSubscriptionFn,
    {
      throwOnError: false,
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
