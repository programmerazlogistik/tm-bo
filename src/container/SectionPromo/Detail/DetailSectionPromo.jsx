"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import { Button } from "@muatmuat/ui/Button";
import { DateTimePickerWeb } from "@muatmuat/ui/Calendar";
import { Checkbox, Input } from "@muatmuat/ui/Form";
import { LoadingStatic } from "@muatmuat/ui/Loading";
import { toast } from "@muatmuat/ui/Toaster";

import { useGetActiveUserTypes } from "@/services/cms-homepage/common/useGetActiveUserTypes";
import { useDeleteSectionPromo } from "@/services/cms-homepage/section-promo/useDeleteSectionPromo";

import RichTextEditor from "@/components/RichTextEditor/RichTextEditor";
import Toggle from "@/components/Toggle/Toggle";

import MultiSelectUser from "../Add/components/MultiSelectUser";
import ConfirmationModal from "../List/components/ConfirmationModal";
import BackButton from "./components/BackButton";
import HistoryTable from "./components/HistoryTable";

const ConfirmDeleteModal = ({ isOpen, setOpen, onConfirm, isLoading }) => {
  return (
    <ConfirmationModal
      isOpen={isOpen}
      setIsOpen={setOpen}
      title={{
        text: "Pemberitahuan",
      }}
      description={{
        className: "w-[337px]",
        text: "Apakah Anda yakin ingin menghapus promo subscribe ini?",
      }}
      cancel={{
        className: "min-w-[112px] md:px-3",
        text: "Batal",
      }}
      confirm={{
        className: "min-w-[112px] px-3",
        text: isLoading ? "Menghapus..." : "Simpan",
        onClick: onConfirm,
        disabled: isLoading,
      }}
    />
  );
};

const DetailSectionPromo = ({ promoId, data, isLoading }) => {
  const router = useRouter();
  const { deletePromo, isMutating: isDeleting } = useDeleteSectionPromo();
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const { data: userTypesData } = useGetActiveUserTypes();

  // Transform user types to options format
  const userTypeOptions = useMemo(() => {
    if (!userTypesData?.Data) return [];
    return userTypesData.Data.map((userType) => ({
      value: userType.code,
      label: userType.description,
    }));
  }, [userTypesData]);

  const handleDelete = () => {
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deletePromo(promoId);
      toast.success("Promo subscribe berhasil dihapus");
      setDeleteModalOpen(false);
      router.push("/cms-homepage/section-promo");
    } catch (error) {
      toast.error(
        error?.response?.data?.Message?.Text ||
          "Gagal menghapus promo subscribe"
      );
      setDeleteModalOpen(false);
    }
  };

  if (isLoading) {
    return (
      <div>
        <BackButton title="Detail Promo Subscribe" />
        <div className="mt-[10px] flex h-64 items-center justify-center rounded-lg bg-white">
          <LoadingStatic />
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div>
        <BackButton title="Detail Promo Subscribe" />
        <div className="mt-[10px] rounded-lg bg-white p-6">
          <p className="text-center text-sm text-neutral-500">
            Data tidak ditemukan
          </p>
        </div>
      </div>
    );
  }

  // Transform type to array
  const typeArray = [];
  if (data.type === "DOMESTIC") {
    typeArray.push("Muatparts Domestik");
  } else if (data.type === "INTERNATIONAL") {
    typeArray.push("Muatparts Internasional");
  } else if (data.type === "BOTH") {
    typeArray.push("Muatparts Domestik", "Muatparts Internasional");
  }

  // Get user type codes from first translation
  const userTypeCodes = data.translations?.[0]?.userTypeCodes || [];

  return (
    <div>
      <BackButton title="Detail Promo Subscribe" />

      <div className="mt-[10px] rounded-lg bg-white px-6 py-6">
        {/* Masa Berlaku */}
        <div className="mb-6 flex items-start gap-6">
          <label className="w-[200px] pt-2 text-sm font-semibold text-[#868686]">
            Masa Berlaku*
          </label>
          <div className="flex flex-1 items-center gap-4">
            <div className="pointer-events-none [&_span]:!text-xs [&_span]:!font-medium [&_span]:!text-[#1B1B1B]">
              <DateTimePickerWeb
                value={data.startDate ? new Date(data.startDate) : null}
                disabled
                placeholder="Pilih Tanggal"
                className="w-[200px]"
                dateFormat="dd/MM/yyyy HH:mm"
              />
            </div>
            <span className="text-sm text-[#868686]">s/d</span>
            <div className="pointer-events-none [&_span]:!text-xs [&_span]:!font-medium [&_span]:!text-[#1B1B1B]">
              <DateTimePickerWeb
                value={data.endDate ? new Date(data.endDate) : null}
                disabled
                placeholder="Pilih Tanggal"
                className="w-[200px]"
                dateFormat="dd/MM/yyyy HH:mm"
              />
            </div>
          </div>
        </div>

        {/* Tipe */}
        <div className="mb-6 flex items-start gap-6">
          <label className="w-[200px] pt-2 text-sm font-semibold text-[#868686]">
            Tipe*
          </label>
          <div className="flex flex-1 gap-6">
            <Checkbox
              label="Muatparts Domestik"
              checked={typeArray.includes("Muatparts Domestik")}
              disabled
            />
            <Checkbox
              label="Muatparts Internasional"
              checked={typeArray.includes("Muatparts Internasional")}
              disabled
            />
          </div>
        </div>

        {/* Tipe Pengguna */}
        <div className="mb-6 flex items-start gap-6">
          <label className="w-[200px] pt-2 text-sm font-semibold text-[#868686]">
            Tipe Pengguna*
          </label>
          <div className="flex-1">
            <MultiSelectUser
              value={userTypeCodes}
              onChange={() => {}}
              options={userTypeOptions}
              placeholder="Pilih Tipe Pengguna"
              className="pointer-events-none w-full opacity-60"
            />
          </div>
        </div>

        {/* All Wording fields */}
        {data.translations?.map((translation) => (
          <div
            key={`wording-${translation.languageCode}`}
            className="mb-6 flex items-start gap-6"
          >
            <label className="w-[200px] pt-2 text-sm font-semibold text-[#868686]">
              Wording({translation.languageCode})*
            </label>
            <div className="pointer-events-none flex-1">
              <RichTextEditor
                value={translation.wording || ""}
                onChange={() => {}}
                placeholder="Masukkan Wording"
                maxLength={5000}
                showCounter={false}
                className="w-full opacity-60"
              />
            </div>
          </div>
        ))}

        {/* All Button Name fields */}
        {data.translations?.map((translation) => (
          <div
            key={`button-${translation.languageCode}`}
            className="mb-6 flex items-start gap-6"
          >
            <label className="w-[200px] pt-2 text-sm font-semibold text-[#868686]">
              Nama Tombol({translation.languageCode})*
            </label>
            <div className="flex-1">
              <Input
                value={translation.buttonName || ""}
                disabled
                placeholder="Masukkan Nama Tombol"
                className="w-full"
                appearance={{
                  inputClassName: "text-xs font-medium",
                }}
              />
            </div>
          </div>
        ))}

        {/* Url Redirect */}
        <div className="mb-6 flex items-start gap-6">
          <label className="w-[200px] pt-2 text-sm font-semibold text-[#868686]">
            Url Redirect*
          </label>
          <div className="flex-1">
            <Input
              value={data.url || ""}
              disabled
              placeholder="Masukkan Url Redirect"
              className="w-full"
              appearance={{
                inputClassName: "text-xs font-medium text-[#176CF7]",
              }}
            />
          </div>
        </div>

        {/* Status */}
        <div className="mb-8 flex items-start gap-6">
          <label className="w-[200px] pt-2 text-sm font-semibold text-[#868686]">
            Status
          </label>
          <div className="flex-1">
            <Toggle
              value={data.status}
              onClick={() => {}}
              textActive="Aktif"
              textInactive="Tidak Aktif"
              disabled
            />
          </div>
        </div>

        {/* Delete Button */}
        <div className="flex pl-[224px]">
          <Button
            variant="muatparts-error-secondary"
            className="h-8 rounded-[20px] px-8 text-sm font-semibold"
            onClick={handleDelete}
          >
            Hapus
          </Button>
        </div>

        {/* History Table */}
        <HistoryTable
          history={data.history}
          pagination={data.pagination}
          promoId={promoId}
        />
      </div>

      {/* Modals */}
      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        setOpen={setDeleteModalOpen}
        onConfirm={handleConfirmDelete}
        isLoading={isDeleting}
      />
    </div>
  );
};

export default DetailSectionPromo;
