"use client";

import { useParams } from "next/navigation";

import DetailPackageSubscription from "@/container/PackageSubscription/Detail/DetailPackageSubscription";

export default function DetailPackageSubscriptionPage() {
  const params = useParams();
  const id = params.id;

  return <DetailPackageSubscription id={id} />;
}
