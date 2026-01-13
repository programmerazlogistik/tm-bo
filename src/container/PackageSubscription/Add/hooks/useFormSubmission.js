import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

import { toast } from "@muatmuat/ui/Toaster";

import { useCreatePackageSubscription } from "@/services/package-subscription/useCreatePackageSubscription";

import { sweetAlert } from "@/lib/sweetAlert";

import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "../constants";
import { mapFormDataToPayload } from "../helpers";
import { useFormValidation } from "./useFormValidation";

/**
 * Custom hook for form submission logic
 */
export const useFormSubmission = (formData, showWarning) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { createPackageSubscription } = useCreatePackageSubscription();
  const { validateFields, validateUniqueness } = useFormValidation(
    formData,
    showWarning
  );

  /**
   * Submit form data
   */
  const submitForm = useCallback(async () => {
    setIsLoading(true);

    try {
      // Validate uniqueness before saving
      const isUnique = await validateUniqueness();
      if (!isUnique) {
        setIsLoading(false);
        return false;
      }

      const payload = mapFormDataToPayload(formData);
      await createPackageSubscription(payload);

      sweetAlert(
        <p className="text-[26.25px] font-bold leading-[31.5px] text-[#595959]">
          {SUCCESS_MESSAGES.SAVE_SUCCESS}
        </p>,
        "OK",
        () => {
          router.push("/package-subscription");
        }
      );

      return true;
    } catch (error) {
      const errorMessage =
        error?.response?.data?.Message?.Text || ERROR_MESSAGES.SAVE_ERROR;
      toast.error(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [formData, validateUniqueness, createPackageSubscription, router]);

  /**
   * Handle form submission with validation
   */
  const handleSubmit = useCallback(() => {
    if (validateFields()) {
      return true;
    }
    return false;
  }, [validateFields]);

  return {
    isLoading,
    submitForm,
    handleSubmit,
  };
};
