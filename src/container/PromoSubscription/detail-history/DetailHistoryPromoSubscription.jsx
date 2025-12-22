import { useState } from "react";

import { useGetPromoSubscriptionHistoryLogById } from "@/services/promo-subscription/useGetPromoSubscriptionHistoryLogById";

import PageTitle from "@/components/PageTitle/PageTitle";

import TabMainSection from "../detail/section/TabMainSection";

const DetailHistoryPromoSubscription = ({ promoId, logId }) => {
  const { data: logData, isLoading: isDataLoading } =
    useGetPromoSubscriptionHistoryLogById(logId);

  const [currentTab, setCurrentTab] = useState("main");

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
          Detail History Promo Subscription
        </PageTitle>
      </div>
      <TabMainSection promoData={logData} />
    </section>
  );
};

export default DetailHistoryPromoSubscription;
