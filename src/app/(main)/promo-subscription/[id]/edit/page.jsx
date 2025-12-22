"use client";

import { useParams } from "next/navigation";

import FormEditPromoSubscription from "@/container/PromoSubscription/edit/FormEditPromoSubscription";

export default function EditPromoSubscriptionPage() {
  const params = useParams();
  const { id } = params;

  return <FormEditPromoSubscription promoId={id} />;
}
