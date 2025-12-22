import { useState } from "react";

// Mock function to simulate API call
const updatePromoSubscription = async (id, data) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // In a real app, this would be an API call
  // For now, we'll just return a success response
  return {
    success: true,
    data: {
      id,
      ...data,
      updatedAt: new Date().toISOString(),
    },
  };
};

export const useUpdatePromoSubscription = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateSubscription = async (id, data) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await updatePromoSubscription(id, data);
      setIsLoading(false);
      return response;
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
