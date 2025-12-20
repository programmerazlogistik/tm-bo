import { useState } from "react";

// Mock function to simulate API call
const createPromoSubscription = async (data) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // In a real app, this would be an API call
  // For now, we'll just return a success response
  return {
    success: true,
    data: {
      id: `SUB-${Math.floor(Math.random() * 10000)}`,
      ...data,
      createdAt: new Date().toISOString(),
    },
  };
};

export const useCreatePromoSubscription = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const createSubscription = async (data) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await createPromoSubscription(data);
      setIsLoading(false);
      return response;
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
