"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

import { Button } from "@muatmuat/ui/Button";
import { LoadingStatic } from "@muatmuat/ui/Loading";
import { DataTableBO, TableBO } from "@muatmuat/ui/Table";

import { useGetPackageHistory } from "@/services/package-subscription/useGetPackageHistory";
import { useGetPackageSubscriptionDetail } from "@/services/package-subscription/useGetPackageSubscriptionDetail";

import BackButton from "../Add/components/BackButton";
import { WarningModal } from "../Add/components/Modals";
import ConfirmationModal from "../List/components/ConfirmationModal";
import { PackageFormDisplay } from "../shared/DisplayComponents";
import { TabNavigation } from "./components/TabNavigation";
import { createHistoryColumns } from "./components/historyColumns";
import { usePackageData } from "./hooks/usePackageData";
import { usePackageDelete } from "./hooks/usePackageDelete";

const DetailPackageSubscription = ({ id }) => {
  // LB - 0120
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const activeTab = searchParams.get("tab") || "home";

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
      handleTabChange("home");
    }
  }, [handleTabChange, searchParams]);

  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });

  const { data: packageData, isLoading: isFetching } =
    useGetPackageSubscriptionDetail(id);
  const { data: historyData, isLoading: isLoadingHistory } =
    useGetPackageHistory(id, {
      page: pagination.pageIndex + 1,
      limit: pagination.pageSize,
    });

  const { formData } = usePackageData(packageData);
  const {
    isDeleteModalOpen,
    setDeleteModalOpen,
    errorModalState,
    setErrorModalState,
    handleDeletePackage,
    isDeleting,
  } = usePackageDelete(id);

  const historyColumns = useMemo(
    () => createHistoryColumns(id, router),
    [id, router]
  );

  const historyTableData = useMemo(
    () => historyData?.history || [],
    [historyData]
  );

  const historyPaginationData = useMemo(() => {
    if (!historyData?.pagination) return undefined;
    return {
      currentPage: historyData.pagination.currentPage,
      itemsPerPage: historyData.pagination.limit,
      totalItems: historyData.pagination.totalRecords,
      totalPages: historyData.pagination.totalPages,
    };
  }, [historyData]);

  if (isFetching) {
    return (
      <div className="flex h-96 items-center justify-center">
        <LoadingStatic />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <BackButton
          title={
            activeTab === "home"
              ? "Detail Paket Subscription"
              : "Log Paket Subscription"
          }
        />
        <TabNavigation activeTab={activeTab} onTabChange={handleTabChange} />
      </div>

      {activeTab === "home" && (
        <div className="mt-[10px] rounded-lg bg-white px-6 py-6">
          <PackageFormDisplay formData={formData} />
          <Button
            variant="muatparts-error-secondary"
            className="ml-[224px] w-[112px]"
            onClick={() => setDeleteModalOpen(true)}
          >
            Hapus
          </Button>
        </div>
      )}

      {activeTab === "riwayat" && (
        <div className="mt-[10px] rounded-lg bg-white px-6 py-6">
          <DataTableBO.Root
            data={historyTableData}
            columns={historyColumns}
            pagination={pagination}
            onPaginationChange={setPagination}
            paginationData={historyPaginationData}
            pageCount={historyPaginationData?.totalPages ?? -1}
          >
            <DataTableBO.Content Table={TableBO} />
            {historyPaginationData && historyPaginationData.totalItems > 0 && (
              <DataTableBO.Pagination />
            )}
          </DataTableBO.Root>

          {isLoadingHistory && (
            <div className="flex h-64 items-center justify-center">
              <LoadingStatic />
            </div>
          )}
        </div>
      )}

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        setIsOpen={setDeleteModalOpen}
        title={{ text: "Pemberitahuan" }}
        description={{
          text: `Apakah Anda yakin ingin menghapus<br/>paket <strong>${formData.namaPaket}</strong> ?`,
        }}
        cancel={{ text: "Batal" }}
        confirm={{
          text: isDeleting ? "Menghapus..." : "Simpan",
          onClick: handleDeletePackage,
        }}
        disabled={isDeleting}
      />

      <WarningModal
        isOpen={errorModalState.isOpen}
        setOpen={() => setErrorModalState({ isOpen: false, message: "" })}
        message={errorModalState.message}
      />
    </div>
  );
};

export default DetailPackageSubscription;
