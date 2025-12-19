import { useFakePageStore } from "./store";
import type { FakePageHookReturn } from "./types";

/* -------------------------------------------------------------------------- */
/*                               Main Hook                                    */
/* -------------------------------------------------------------------------- */

export function useFakePage(): FakePageHookReturn {
  const store = useFakePageStore();
  const { currentStep, pushStep, goBack, closePage } = store;

  return {
    currentStep,
    next: pushStep,
    back: goBack,
    close: closePage,
    isOpen: currentStep !== null,
  };
}
