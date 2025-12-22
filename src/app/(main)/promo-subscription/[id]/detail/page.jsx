"use client";

import { useParams } from "next/navigation";

import DetailPromoSubscription from "@/container/PromoSubscription/detail/DetailPromoSubscription";

export default function DetailPromoSubscriptionPage() {
  const params = useParams();
  const { id } = params;

  return <DetailPromoSubscription promoId={id} />;
}
