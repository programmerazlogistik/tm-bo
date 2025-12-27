"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import { Button } from "@muatmuat/ui/Button";
import { LoadingStatic } from "@muatmuat/ui/Loading";
import { DataTableBO, TableBO } from "@muatmuat/ui/Table";

import { useGetPackageHistory } from "@/services/package-subscription/useGetPackageHistory";
import { useGetPackageSubscriptionDetail } from "@/services/package-subscription/useGetPackageSubscriptionDetail";

import BackButton from "../Add/components/BackButton";
import ConfirmationModal from "../List/components/ConfirmationModal";
import { PackageFormDisplay } from "../shared/DisplayComponents";
import { TabNavigation } from "./components/TabNavigation";
import { createHistoryColumns } from "./components/historyColumns";
import { usePackageData } from "./hooks/usePackageData";
import { usePackageDelete } from "./hooks/usePackageDelete";

const DetailPackageSubscription = ({ id }) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("home");
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
        <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
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

      <ConfirmationModal
        isOpen={errorModalState.isOpen}
        setIsOpen={() => setErrorModalState({ isOpen: false, message: "" })}
        title={{ text: "Warning" }}
        description={{
          className: "w-[337px]",
          text: errorModalState.message,
        }}
        withCancel={false}
        withConfirm={false}
      />
    </div>
  );
};

export default DetailPackageSubscription;
