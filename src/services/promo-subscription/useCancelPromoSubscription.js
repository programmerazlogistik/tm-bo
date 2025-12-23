import { useState } from "react";

import { fetcherMuatparts } from "@/lib/axios";

const useMock = false;

export const useCancelPromoSubscription = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const cancelSubscription = async (id) => {
    setIsLoading(true);
    setError(null);

    try {
      if (useMock) {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Mock success response
        const response = {
          Message: { Code: 200, Text: "Promo cancelled successfully" },
          Data: {
            id,
            packageName: "Test Package",
            cancelledAt: new Date().toISOString(),
          },
          Type: "CANCEL_PROMO_SUCCESS",
        };
        setIsLoading(false);
        return response;
      } else {
        const response = await fetcherMuatparts.delete(
          `/v1/bo/subscription-tm/promos/${id}`
        );
        setIsLoading(false);
        return response.data;
      }
    } catch (err) {
      setError(err.message || "Failed to cancel promo subscription");
      setIsLoading(false);
      throw err;
    }
  };

  return {
    cancelSubscription,
    isLoading,
    error,
  };
};
