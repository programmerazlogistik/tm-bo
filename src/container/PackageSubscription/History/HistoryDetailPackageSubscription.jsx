"use client";

import { LoadingStatic } from "@muatmuat/ui/Loading";

import { useGetPackageHistoryDetail } from "@/services/package-subscription/useGetPackageHistoryDetail";

import BackButton from "../Add/components/BackButton";
import { useHistoryData } from "../Detail/hooks/usePackageData";
import { PackageFormDisplay } from "../shared/DisplayComponents";

const HistoryDetailPackageSubscription = ({ packageId, historyId }) => {
  const { data: historyData, isLoading: isFetching } =
    useGetPackageHistoryDetail(packageId, historyId);

  const { formData } = useHistoryData(historyData);

  if (isFetching) {
    return (
      <div className="flex h-96 items-center justify-center">
        <LoadingStatic />
      </div>
    );
  }

  return (
    <div>
      <BackButton title="Detail History Paket Subscription" />

      <div className="mt-[10px] rounded-lg bg-white px-6 py-6">
        <PackageFormDisplay formData={formData} />
      </div>
    </div>
  );
};
export default HistoryDetailPackageSubscription;
