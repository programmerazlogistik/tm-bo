import { useState } from "react";

import { fetcherMuatparts } from "@/lib/axios";

const useMock = false;

export const useUpdatePromoSubscription = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateSubscription = async (id, data) => {
    setIsLoading(true);
    setError(null);

    try {
      if (useMock) {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Mock success response
        const response = {
          Message: { Code: 200, Text: "Promo updated successfully" },
          Data: { id, ...data, updatedAt: new Date().toISOString() },
          Type: "UPDATE_PROMO_SUCCESS",
        };
        setIsLoading(false);
        return response;
      } else {
        const response = await fetcherMuatparts.put(
          `/v1/bo/subscription-tm/promos/${id}`,
          data
        );
        setIsLoading(false);
        return response.data;
      }
    } catch (err) {
      setError(err.message || "Failed to update promo subscription");
      setIsLoading(false);
      throw err;
    }
  };

  return {
    updateSubscription,
    isLoading,
    error,
  };
};
