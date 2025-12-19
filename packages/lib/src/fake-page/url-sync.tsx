"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef } from "react";

import { useFakePageStore } from "./store";

/* -------------------------------------------------------------------------- */
/*                    URL Synchronization Component                           */
/* -------------------------------------------------------------------------- */

type Props = {
  basePath: string;
};

const FakePageSyncContent = ({ basePath }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { currentStep, actions } = useFakePageStore();
  const hasInitialized = useRef(false);

  // --- Sync Zustand state <-> URL param
  useEffect(() => {
    const step = searchParams.get("step");
    if (step && step !== currentStep) {
      // Update Zustand when URL changes (e.g. browser back)
      actions.next(step);
    } else if (!step && currentStep) {
      // Remove fake page if URL cleared
      actions.close();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  // --- Enhanced functions that keep URL synced
  useEffect(() => {
    // Only run once to prevent infinite loops and frozen object issues
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    const pushStep = (step: string) => {
      try {
        const params = new URLSearchParams(window.location.search);
        params.set("step", step);

        const cleanPathname = window.location.pathname.replace(basePath, "");
        router.push(`${cleanPathname}?${params.toString()}`);
        actions.next(step);
      } catch (error) {
        console.error("[FakePage] Push step error:", error);
      }
    };

    const goBack = () => {
      try {
        router.back(); // Browser-native back, syncs automatically
      } catch (error) {
        console.error("[FakePage] Go back error:", error);
      }
    };

    const closePage = () => {
      try {
        const cleanPathname = window.location.pathname.replace(basePath, "");
        router.replace(cleanPathname);
        actions.close();
      } catch (error) {
        console.error("[FakePage] Close page error:", error);
      }
    };

    // Update store using safe action method instead of direct setState
    try {
      actions.updateRouterFunctions({
        pushStep,
        goBack,
        closePage,
      });
      actions.setInitialized();
    } catch (error) {
      console.error("[FakePage] Store update error:", error);
    }
  }, [router, actions, basePath]);

  return null;
};

export const FakePageSearchParamsSync = ({ basePath }: Props) => {
  return (
    <Suspense>
      <FakePageSyncContent basePath={basePath} />
    </Suspense>
  );
};
