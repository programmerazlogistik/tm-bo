import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

import { toast } from "@muatmuat/ui/Toaster";

import { useUpdatePackageSubscription } from "@/services/package-subscription/useUpdatePackageSubscription";

import { sweetAlert } from "@/lib/sweetAlert";

import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "../../Add/constants";
import { mapFormDataToPayload } from "../../Add/helpers";
import { useFormValidation } from "../../Add/hooks/useFormValidation";

/**
 * Custom hook for edit form submission logic
 */
export const useEditFormSubmission = (packageId, formData, showWarning) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { updatePackageSubscription } = useUpdatePackageSubscription();
  const { validateFields } = useFormValidation(formData, showWarning);

  const submitForm = useCallback(async () => {
    setIsLoading(true);

    try {
      const payload = mapFormDataToPayload(formData);
      await updatePackageSubscription(packageId, payload);

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
  }, [packageId, formData, updatePackageSubscription, router]);

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
