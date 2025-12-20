import useSWRMutation from "swr/mutation";

import { fetcherMuatparts } from "@/lib/axios";

const deletePackageSubscriptionFn = async (url, { arg }) => {
  return await fetcherMuatparts(`/api/package-subscription/${arg}`, {
    method: "DELETE",
  });
};

export const useDeletePackageSubscription = () => {
  const { trigger, isMutating, error } = useSWRMutation(
    "/api/package-subscription",
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
