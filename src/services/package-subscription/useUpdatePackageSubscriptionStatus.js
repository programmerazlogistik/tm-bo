import useSWRMutation from "swr/mutation";

import { fetcherMuatparts } from "@/lib/axios";

const updatePackageSubscriptionStatusFn = async (url, { arg }) => {
  const { id, data } = arg;
  return await fetcherMuatparts(`/api/package-subscription/${id}/status`, {
    method: "PATCH",
    data,
  });
};

export const useUpdatePackageSubscriptionStatus = () => {
  const { trigger, isMutating, error } = useSWRMutation(
    "/api/package-subscription/status",
    updatePackageSubscriptionStatusFn,
    {
      throwOnError: false,
    }
  );

  const updatePackageSubscriptionStatus = async (id, data) => {
    return await trigger({ id, data });
  };

  return {
    updatePackageSubscriptionStatus,
    isMutating,
    error,
  };
};
