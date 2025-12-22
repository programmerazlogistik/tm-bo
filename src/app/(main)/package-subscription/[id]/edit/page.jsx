"use client";

import EditPackageSubscription from "@/container/PackageSubscription/Edit/EditPackageSubscription";

export default function EditPackageSubscriptionPage({ params }) {
  return <EditPackageSubscription id={params.id} />;
}
