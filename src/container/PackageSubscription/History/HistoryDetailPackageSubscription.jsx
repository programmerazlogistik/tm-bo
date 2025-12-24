"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { DateTimePickerWeb } from "@muatmuat/ui/Calendar";
import { Input, TextArea } from "@muatmuat/ui/Form";
import { LoadingStatic } from "@muatmuat/ui/Loading";
import { InfoTooltip } from "@muatmuat/ui/Tooltip";

import { useGetPackageHistoryDetail } from "@/services/package-subscription/useGetPackageHistoryDetail";

import Toggle from "@/components/Toggle/Toggle";

import BackButton from "../Add/components/BackButton";
import { INITIAL_FORM_STATE, PERIODE_OPTIONS } from "../Add/constants";
import { formatCurrency, formatNumber } from "../Add/helpers";

const HistoryDetailPackageSubscription = ({ packageId, historyId }) => {
  const router = useRouter();
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);

  const { data: historyData, isLoading: isFetching } =
    useGetPackageHistoryDetail(packageId, historyId);

  // Load data when historyData is available
  useEffect(() => {
    if (historyData?.snapshotAfter) {
      const snapshot = historyData.snapshotAfter;
      const loadedData = {
        namaPaket: snapshot.packageName || "",
        mulaiBerlaku: snapshot.startDate ? new Date(snapshot.startDate) : null,
        deskripsiPaket: snapshot.description || "",
        periode: String(snapshot.period || ""),
        subUserYangDiperoleh: String(snapshot.subUsersEarned || ""),
        batasPembelianPaket: snapshot.isLimitedPurchase || false,
        kuotaPembelianPerUser: String(snapshot.maxPurchasePerUser || ""),
        harga: String(snapshot.price || ""),
        koin: snapshot.isUnlimitedCoin
          ? "0"
          : String(snapshot.coinEarned || ""),
        posisiPaketPembelian: String(snapshot.position || ""),
        isPaketPopuler: snapshot.isPopular || false,
        isActive: snapshot.status || false,
      };
      setFormData(loadedData);
    }
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
      {/* Header with Back Button */}
      <div className="flex items-center justify-between">
        <BackButton title="Detail History Paket Subscription" />
      </div>

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
        <div className="mb-6 flex items-start gap-6">
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
      </div>
    </div>
  );
};

export default HistoryDetailPackageSubscription;
