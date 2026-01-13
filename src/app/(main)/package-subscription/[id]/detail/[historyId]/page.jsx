import HistoryDetailPackageSubscription from "@/container/PackageSubscription/History/HistoryDetailPackageSubscription";

export default function HistoryDetailPage({ params }) {
  return (
    <HistoryDetailPackageSubscription
      packageId={params.id}
      historyId={params.historyId}
    />
  );
}
