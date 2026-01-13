import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

import { useUpdatePackageSubscription } from "@/services/package-subscription/useUpdatePackageSubscription";

import { sweetAlert } from "@/lib/sweetAlert";

import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "../../Add/constants";
import { mapFormDataToPayload } from "../../Add/helpers";
import { useFormValidation } from "../../Add/hooks/useFormValidation";

/**
 * Custom hook for edit form submission logic
 */
export const useEditFormSubmission = (packageId, formData, showWarning) => {
  // 26. 03 - TM - LB - 0013
  // 26. 03 - TM - LB - 0015
  // 26. 03 - TM - LB - 0017
  const router = useRouter();
  const [errorModalState, setErrorModalState] = useState({
    isOpen: false,
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const { updatePackageSubscription } = useUpdatePackageSubscription();
  const { validateFields, validateUniqueness } = useFormValidation(
    formData,
    showWarning,
    packageId
  );

  const submitForm = useCallback(async () => {
    setIsLoading(true);

    try {
      const isUnique = await validateUniqueness();
      if (!isUnique) {
        setIsLoading(false);
        return false;
      }

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
        error?.response?.data?.Data ||
        error?.response?.data?.Message?.Text ||
        ERROR_MESSAGES.SAVE_ERROR;
      setErrorModalState({ isOpen: true, message: errorMessage });
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [
    packageId,
    formData,
    updatePackageSubscription,
    router,
    validateUniqueness,
  ]);

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
    errorModalState,
    setErrorModalState,
  };
};
