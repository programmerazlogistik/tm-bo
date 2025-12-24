"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { Button } from "@muatmuat/ui/Button";
import { DateTimePickerWeb } from "@muatmuat/ui/Calendar";
import { Input, TextArea } from "@muatmuat/ui/Form";
import { LoadingStatic } from "@muatmuat/ui/Loading";
import { DataTableBO, TableBO } from "@muatmuat/ui/Table";
import { InfoTooltip } from "@muatmuat/ui/Tooltip";
import { format } from "date-fns";
import { id as localeId } from "date-fns/locale";

import { useDeletePackageSubscription } from "@/services/package-subscription/useDeletePackageSubscription";
import { useGetPackageHistory } from "@/services/package-subscription/useGetPackageHistory";
import { useGetPackageSubscriptionDetail } from "@/services/package-subscription/useGetPackageSubscriptionDetail";

import Toggle from "@/components/Toggle/Toggle";

import { sweetAlert } from "@/lib/sweetAlert";

import BackButton from "../Add/components/BackButton";
import { INITIAL_FORM_STATE, PERIODE_OPTIONS } from "../Add/constants";
import { formatCurrency, formatNumber } from "../Add/helpers";
import ConfirmationModal from "../List/components/ConfirmationModal";

const TAB_OPTIONS = [
  { value: "home", label: "Utama" },
  { value: "riwayat", label: "Riwayat" },
];

const DetailPackageSubscription = ({ id }) => {
  const router = useRouter();
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [activeTab, setActiveTab] = useState("home");
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [errorModalState, setErrorModalState] = useState({
    isOpen: false,
    message: "",
  });

  const { data: packageData, isLoading: isFetching } =
    useGetPackageSubscriptionDetail(id);
  const { deletePackageSubscription, isMutating: isDeleting } =
    useDeletePackageSubscription();

  const { data: historyData, isLoading: isLoadingHistory } =
    useGetPackageHistory(id, {
      page: pagination.pageIndex + 1,
      limit: pagination.pageSize,
    });

  // Load data when packageData is available
  useEffect(() => {
    if (packageData) {
      const loadedData = {
        namaPaket: packageData.packageName || "",
        mulaiBerlaku: packageData.startDate
          ? new Date(packageData.startDate)
          : null,
        deskripsiPaket: packageData.description || "",
        periode: String(packageData.period || ""),
        subUserYangDiperoleh: String(packageData.subUsersEarned || ""),
        batasPembelianPaket: packageData.isLimitedPurchase || false,
        kuotaPembelianPerUser: String(packageData.maxPurchasePerUser || ""),
        harga: String(packageData.price || ""),
        koin: packageData.isUnlimitedCoin
          ? "0"
          : String(packageData.coinEarned || ""),
        posisiPaketPembelian: String(packageData.position || ""),
        isPaketPopuler: packageData.isPopular || false,
        isActive: packageData.status || false,
      };
      setFormData(loadedData);
    }
  }, [packageData]);

  // Memoize history table columns
  const historyColumns = useMemo(
    () => [
      {
        accessorKey: "createdAt",
        header: "Last Update",
        enableSorting: false,
        size: 140,
        cell: ({ row }) => {
          const date = row.original.createdAt;
          if (!date) return "-";
          try {
            return (
              <div className="text-xs font-normal leading-[18px] text-[#1B1B1B]">
                {format(new Date(date), "dd/MM/yyyy HH:mm", {
                  locale: localeId,
                })}
              </div>
            );
          } catch {
            return "-";
          }
        },
      },
      {
        accessorKey: "activity",
        header: "Activity",
        enableSorting: false,
        size: 90,
        cell: ({ row }) => {
          const value = row.original.activity;
          return (
            <div className="text-xs font-normal leading-[18px] text-[#1B1B1B]">
              {value || "-"}
            </div>
          );
        },
      },
      {
        accessorKey: "actorType",
        header: "By",
        enableSorting: false,
        size: 80,
        cell: ({ row }) => {
          const value = row.original.actorType;
          return (
            <div className="text-xs font-normal leading-[18px] text-[#1B1B1B]">
              {value || "-"}
            </div>
          );
        },
      },
      {
        accessorKey: "username",
        header: "Username",
        enableSorting: false,
        size: 120,
        cell: ({ row }) => {
          const value = row.original.username;
          return (
            <div className="text-xs font-normal leading-[18px] text-[#1B1B1B]">
              {value || "-"}
            </div>
          );
        },
      },
      {
        accessorKey: "email",
        header: "Email",
        enableSorting: false,
        size: 180,
        cell: ({ row }) => {
          const value = row.original.email;
          return (
            <div className="text-xs font-normal leading-[18px] text-[#1B1B1B]">
              {value || "-"}
            </div>
          );
        },
      },
      {
        accessorKey: "statusAfter",
        header: "Status",
        enableSorting: false,
        size: 100,
        cell: ({ row }) => {
          const status = row.original.statusAfter;
          const isActive = status === true || status === "active";
          return (
            <div
              className={`text-xs font-bold leading-[18px] ${
                isActive ? "text-[#3ECD00]" : "text-[#F71717]"
              }`}
            >
              {isActive ? "Active" : "Nonactive"}
            </div>
          );
        },
      },
      {
        id: "detail",
        header: "Detail",
        enableSorting: false,
        size: 80,
        cell: ({ row }) => {
          const historyId = row.original.id;
          const handleDetailClick = () => {
            router.push(`/package-subscription/${id}/detail/${historyId}`);
          };

          return (
            <button
              className="text-xs font-medium leading-[18px] text-[#176CF7] underline"
              onClick={handleDetailClick}
            >
              Detail
            </button>
          );
        },
      },
    ],
    []
  );

  // Memoize history table data
  const historyTableData = useMemo(() => {
    return historyData?.history || [];
  }, [historyData]);

  // Memoize pagination data for history table
  const historyPaginationData = useMemo(() => {
    if (!historyData?.pagination) return undefined;
    return {
      currentPage: historyData.pagination.currentPage,
      itemsPerPage: historyData.pagination.limit,
      totalItems: historyData.pagination.totalRecords,
      totalPages: historyData.pagination.totalPages,
    };
  }, [historyData]);

  const handleDeletePackage = async () => {
    try {
      await deletePackageSubscription(id);

      setDeleteModalOpen(false);

      // Tunggu modal konfirmasi tertutup, baru tampilkan sweetAlert
      setTimeout(() => {
        sweetAlert(
          <p className="text-[26.25px] font-bold leading-[31.5px] text-[#595959]">
            Data berhasil dihapus
          </p>,
          "OK",
          () => {
            router.push("/package-subscription");
          }
        );
      }, 300);
    } catch (error) {
      const errorMessage =
        error?.response?.data?.Data ||
        error?.response?.data?.Message?.Text ||
        "Gagal menghapus paket";

      setDeleteModalOpen(false);

      // Tunggu modal konfirmasi tertutup, baru buka error modal
      setTimeout(() => {
        setErrorModalState({ isOpen: true, message: errorMessage });
      }, 300);
    }
  };

  if (isFetching) {
    return (
      <div className="flex h-96 items-center justify-center">
        <LoadingStatic />
      </div>
    );
  }

  return (
    <div>
      {/* Header with Back Button and Tabs */}
      <div className="flex items-center justify-between">
        <BackButton
          title={
            activeTab === "home"
              ? "Detail Paket Subscription"
              : "Log Paket Subscription"
          }
        />

        <div
          className="flex"
          style={{ filter: "drop-shadow(1px 2px 4px rgba(0, 0, 0, 0.11))" }}
        >
          {TAB_OPTIONS.map((tab, index) => (
            <button
              key={tab.value}
              className={`flex h-7 w-[100px] items-center justify-center border border-[#A8A8A8] px-3 py-2 text-center text-xs font-semibold leading-[14px] text-[#1B1B1B] ${
                activeTab === tab.value ? "bg-[#A8A8A8]" : "bg-white"
              } ${
                index === 0 ? "rounded-l-[4px] border-r-0" : "rounded-r-[4px]"
              }`}
              onClick={() => setActiveTab(tab.value)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {activeTab === "home" && (
        <div className="mt-[10px] rounded-lg bg-white px-6 py-6">
          {/* Nama Paket */}
          <div className="mb-6 flex items-start gap-6">
            <label className="w-[200px] pt-2 text-sm font-semibold text-[#868686]">
              Nama Paket*
            </label>
            <div className="flex-1">
              <Input
                value={formData.namaPaket}
                placeholder="Masukkan Nama Paket"
                className="w-full"
                appearance={{
                  inputClassName: "text-sm",
                }}
                disabled
              />
            </div>
          </div>

          {/* Mulai Berlaku */}
          <div className="mb-6 flex items-start gap-6">
            <label className="w-[200px] pt-2 text-sm font-semibold text-[#868686]">
              Mulai Berlaku*
            </label>
            <div className="flex-1">
              <div className="[&_span.text-neutral-400]:!text-[#7B7B7B] [&_span]:!text-xs [&_span]:!font-medium [&_span]:!text-black">
                <DateTimePickerWeb
                  value={formData.mulaiBerlaku}
                  placeholder="Pilih Tanggal & Jam"
                  className="w-full"
                  dateFormat="dd/MM/yyyy HH:mm"
                  disabled
                />
              </div>
            </div>
          </div>

          {/* Deskripsi Paket */}
          <div className="mb-6 flex items-start gap-6">
            <label className="w-[200px] pt-2 text-sm font-semibold text-[#868686]">
              Deskripsi Paket*
            </label>
            <div className="flex-1">
              <TextArea
                value={formData.deskripsiPaket}
                placeholder="Masukkan Deskripsi Paket"
                className="w-full"
                rows={4}
                appearance={{
                  textareaClassName: "text-sm",
                }}
                disabled
              />
            </div>
          </div>

          {/* Periode */}
          <div className="mb-6 flex items-start gap-6">
            <label className="w-[200px] pt-2 text-sm font-semibold text-[#868686]">
              Periode*
            </label>
            <div className="flex-1">
              <Input
                value={
                  formData.periode
                    ? PERIODE_OPTIONS.find(
                        (opt) => opt.value === formData.periode
                      )?.label || formData.periode
                    : ""
                }
                placeholder="Pilih Periode"
                className="w-full"
                appearance={{
                  inputClassName: "text-sm",
                }}
                icon={{
                  right: (
                    <svg
                      width="9"
                      height="5"
                      viewBox="0 0 9 5"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0.160633 0.132759C0.350798 -0.0429105 0.64065 -0.0429465 0.830555 0.124946L0.867013 0.160754L4.31949 3.89513L4.37287 3.942C4.42796 3.9816 4.48853 3.99995 4.54605 3.99995C4.6228 3.99995 4.70534 3.96746 4.77261 3.89513L8.13264 0.260363L8.1691 0.224556C8.35905 0.056785 8.64892 0.0572786 8.83902 0.233019C9.04178 0.42048 9.05447 0.736637 8.86701 0.9394L5.50569 4.57482L5.50438 4.57612C5.25677 4.84231 4.91326 4.99995 4.54605 4.99995C4.17884 4.99995 3.83533 4.84231 3.58772 4.57612L3.58641 4.57482L0.132638 0.839139L0.100086 0.800077C-0.0523482 0.59756 -0.0294857 0.308531 0.160633 0.132759Z"
                        fill="#555555"
                      />
                    </svg>
                  ),
                }}
                disabled
              />
            </div>
          </div>

          {/* Sub User yang Diperoleh */}
          <div className="mb-6 flex items-start gap-6">
            <label className="w-[200px] pt-2 text-sm font-semibold text-[#868686]">
              Sub User yang Diperoleh*
            </label>
            <div className="flex-1">
              <Input
                value={
                  formData.subUserYangDiperoleh
                    ? formatNumber(formData.subUserYangDiperoleh)
                    : ""
                }
                placeholder="Masukkan Jumlah Sub User yang diperoleh"
                className="w-full"
                appearance={{
                  inputClassName: "text-sm",
                }}
                disabled
              />
            </div>
          </div>

          {/* Batas Pembelian Paket */}
          <div className="mb-6 flex items-start gap-6">
            <label className="flex w-[200px] items-center gap-2 pt-2 text-sm font-semibold text-[#868686]">
              Batas Pembelian Paket
              <InfoTooltip
                side="top"
                icon="/icons/info.svg"
                className="max-w-[336px]"
              >
                <p className="text-center text-xs font-medium text-[#1B1B1B]">
                  Membatasi jumlah pembelian paket oleh masing-masing pengguna.
                </p>
              </InfoTooltip>
            </label>
            <div className="flex flex-1 items-center gap-3">
              <Toggle value={formData.batasPembelianPaket} disabled />
            </div>
          </div>

          {/* Kuota Pembelian per User */}
          {formData.batasPembelianPaket && (
            <div className="mb-6 flex items-start gap-6">
              <label className="w-[200px] pt-2 text-sm font-semibold text-[#868686]">
                Kuota Pembelian per User
              </label>
              <div className="flex-1">
                <Input
                  value={
                    formData.kuotaPembelianPerUser
                      ? formatNumber(formData.kuotaPembelianPerUser)
                      : ""
                  }
                  placeholder="Masukkan Jumlah Kuota Pembelian"
                  className="w-full"
                  appearance={{
                    inputClassName: "text-sm",
                  }}
                  disabled
                />
              </div>
            </div>
          )}

          {/* Harga */}
          <div className="mb-6 flex items-start gap-6">
            <label className="w-[200px] pt-2 text-sm font-semibold text-[#868686]">
              Harga (Rp.)*
            </label>
            <div className="flex-1">
              <Input
                value={formData.harga ? formatCurrency(formData.harga) : ""}
                placeholder="Masukkan Harga Paket"
                className="w-full"
                appearance={{
                  inputClassName: "text-sm",
                }}
                disabled
              />
            </div>
          </div>

          {/* Koin yang didapatkan */}
          <div className="mb-6 flex items-start gap-6">
            <label className="w-[200px] pt-2 text-sm font-semibold text-[#868686]">
              Koin yang didapatkan*
            </label>
            <div className="flex-1">
              <Input
                value={formData.koin ? formatNumber(formData.koin) : ""}
                placeholder="Masukkan Jumlah Koin"
                className="w-full"
                appearance={{
                  inputClassName: "text-sm",
                }}
                disabled
              />
            </div>
          </div>

          {/* Posisi Paket Pembelian */}
          <div className="mb-6 flex items-start gap-6">
            <label className="w-[200px] pt-2 text-sm font-semibold text-[#868686]">
              Posisi Paket Pembelian*
            </label>
            <div className="flex-1">
              <Input
                value={
                  formData.posisiPaketPembelian
                    ? formatNumber(formData.posisiPaketPembelian)
                    : ""
                }
                placeholder="Masukkan Urutan Tampil"
                className="w-full"
                appearance={{
                  inputClassName: "text-sm",
                }}
                disabled
              />
            </div>
          </div>

          {/* Jadikan sebagai Paket Populer */}
          <div className="mb-6 flex items-start gap-6">
            <label className="w-[200px] pt-2 text-sm font-semibold text-[#868686]">
              Jadikan sebagai Paket Populer
            </label>
            <div className="flex-1">
              <Toggle value={formData.isPaketPopuler} disabled />
            </div>
          </div>

          {/* Status */}
          <div className="mb-8 flex items-start gap-6">
            <label className="w-[200px] pt-2 text-sm font-semibold text-[#868686]">
              Status
            </label>
            <div className="flex-1">
              <Toggle
                value={formData.isActive}
                textActive="Aktif"
                textInactive="Tidak Aktif"
                disabled
              />
            </div>
          </div>
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

      {/* Konfirmasi Hapus */}
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        setIsOpen={setDeleteModalOpen}
        title={{
          text: "Pemberitahuan",
        }}
        description={{
          text: `Apakah Anda yakin ingin menghapus<br/>paket <strong>${formData.namaPaket}</strong> ?`,
        }}
        cancel={{
          text: "Batal",
        }}
        confirm={{
          text: isDeleting ? "Menghapus..." : "Simpan",
          onClick: handleDeletePackage,
        }}
        disabled={isDeleting}
      />

      {/* Error Modal */}
      <ConfirmationModal
        isOpen={errorModalState.isOpen}
        setIsOpen={() => setErrorModalState({ isOpen: false, message: "" })}
        title={{
          text: "Warning",
        }}
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
