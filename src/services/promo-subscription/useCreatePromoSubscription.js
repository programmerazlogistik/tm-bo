import { useState } from "react";

import { fetcherMuatparts } from "@/lib/axios";

const useMock = false;

export const useCreatePromoSubscription = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const createSubscription = async (data) => {
    setIsLoading(true);
    setError(null);

    try {
      if (useMock) {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Mock success response
        const response = {
          Message: { Code: 200, Text: "Success" },
          Data: {
            id: `SUB-${Math.floor(Math.random() * 10000)}`,
            ...data,
            createdAt: new Date().toISOString(),
          },
          Type: "CREATE_PROMO_SUCCESS",
        };
        setIsLoading(false);
        return response;
      } else {
        const response = await fetcherMuatparts.post(
          "/v1/bo/subscription-tm/promos",
          data
        );
        setIsLoading(false);
        return response.data;
      }
    } catch (err) {
      setError(err.message || "Failed to create promo subscription");
      setIsLoading(false);
      throw err;
    }
  };

  return {
    createSubscription,
    isLoading,
    error,
  };
};
