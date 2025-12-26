import { useCallback, useState } from "react";

import { INITIAL_FORM_STATE } from "../constants";

/**
 * Custom hook for managing form state
 */
export const useFormState = () => {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);

  const handleInputChange = useCallback((field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  const hasChanges = useCallback(() => {
    return Object.keys(formData).some((key) => {
      const value = formData[key];
      const initialValue = INITIAL_FORM_STATE[key];

      if (typeof value === "string") {
        return value.trim() !== "";
      }
      return value !== initialValue;
    });
  }, [formData]);

  return {
    formData,
    handleInputChange,
    hasChanges,
  };
};
