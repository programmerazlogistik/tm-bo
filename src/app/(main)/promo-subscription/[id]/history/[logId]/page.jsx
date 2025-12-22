"use client";

import { useParams } from "next/navigation";

import DetailHistoryPromoSubscription from "@/container/PromoSubscription/detail-history/DetailHistoryPromoSubscription";

export default function DetailHistoryPromoSubscriptionPage() {
  const params = useParams();
  const { id: promoId, logId } = params;

  return <DetailHistoryPromoSubscription promoId={promoId} logId={logId} />;
}
