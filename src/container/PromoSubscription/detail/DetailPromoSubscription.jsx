import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { useGetPromoSubscriptionById } from "@/services/promo-subscription/useGetPromoSubscriptionById";

import PageTitle from "@/components/PageTitle/PageTitle";

import TabHistorySection from "./section/TabHistorySection";
import TabMainSection from "./section/TabMainSection";
import TabSection from "./section/TabSection";

const DetailPromoSubscription = ({ promoId }) => {
  // 26. 03 - TM - LB - 0119
  const { data: promoData, isLoading: isDataLoading } =
    useGetPromoSubscriptionById(promoId);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentTab = searchParams.get("tab") || "main";

  const handleTabChange = useCallback(
    (tab) => {
      const params = new URLSearchParams(searchParams);
      params.set("tab", tab);
      router.replace(`${pathname}?${params.toString()}`);
    },
    [pathname, router, searchParams]
  );

  useEffect(() => {
    if (!searchParams.get("tab")) {
      handleTabChange("main");
    }
  }, [handleTabChange, searchParams]);

  // State for History tab
  const [historyPagination, setHistoryPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });

  const [historySorting, setHistorySorting] = useState([]);

  if (isDataLoading) {
    return <div>Loading...</div>;
  }

  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <PageTitle
          withBack={true}
          onBack={() => window.history.back()}
          className="mb-2.5 text-[24px] font-bold text-[#176CF7]"
          appearance={{
            iconClassName: "size-6",
          }}
        >
          {currentTab === "main"
            ? "Detail Promo Subscription"
            : "Log Promo Subscription"}
        </PageTitle>
        <TabSection currentTab={currentTab} setCurrentTab={handleTabChange} />
      </div>
      {currentTab === "main" ? (
        <TabMainSection promoData={promoData} />
      ) : (
        <TabHistorySection
          promoId={promoId}
          pagination={historyPagination}
          setPagination={setHistoryPagination}
          sorting={historySorting}
          setSorting={setHistorySorting}
        />
      )}
    </section>
  );
};

export default DetailPromoSubscription;
