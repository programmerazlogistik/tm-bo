"use client";

import { use } from "react";

import EditPackageSubscription from "@/container/PackageSubscription/Edit/EditPackageSubscription";

export default function EditPackageSubscriptionPage({ params }) {
  const { id } = use(params);
  return <EditPackageSubscription id={id} />;
}
