"use client";

import { useRouter } from "next/navigation";
import { useMemo } from "react";

import { DateTimePickerWeb } from "@muatmuat/ui/Calendar";
import { Checkbox, Input } from "@muatmuat/ui/Form";
import { LoadingStatic } from "@muatmuat/ui/Loading";

import { useGetActiveUserTypes } from "@/services/cms-homepage/common/useGetActiveUserTypes";

import RichTextEditor from "@/components/RichTextEditor/RichTextEditor";
import Toggle from "@/components/Toggle/Toggle";

import MultiSelectUser from "../Add/components/MultiSelectUser";
import BackButton from "../Detail/components/BackButton";

const SectionPromoHistory = ({ promoId, historyId, data, isLoading }) => {
  const router = useRouter();

  const { data: userTypesData } = useGetActiveUserTypes();

  // Transform user types to options format
  const userTypeOptions = useMemo(() => {
    if (!userTypesData?.Data) return [];
    return userTypesData.Data.map((userType) => ({
      value: userType.code,
      label: userType.description,
    }));
  }, [userTypesData]);

  // Find the specific history item based on historyId
  const historyData = useMemo(() => {
    if (!data || !historyId) return null;

    // Check if historyId matches the main record
    if (data.id === historyId) {
      return {
        startDate: data.startDate,
        endDate: data.endDate,
        type: data.type,
        url: data.url,
        translations: data.translations,
        status: data.status,
      };
    }

    // Otherwise, search in the history array
    const historyItem = data.history?.find((item) => item.id === historyId);
    if (historyItem) {
      return {
        startDate: historyItem.startDate,
        endDate: historyItem.endDate,
        type: historyItem.type,
        url: historyItem.url,
        translations: [], // History items don't have translations in the nested array
        status: data.status, // Use main status
      };
    }

    return null;
  }, [data, historyId]);

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

  if (!data || !historyData) {
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
  if (historyData.type === "DOMESTIC") {
    typeArray.push("Muatparts Domestik");
  } else if (historyData.type === "INTERNATIONAL") {
    typeArray.push("Muatparts Internasional");
  } else if (historyData.type === "BOTH") {
    typeArray.push("Muatparts Domestik", "Muatparts Internasional");
  }

  // Get user type codes from translations (use main data translations if available)
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
                value={
                  historyData.startDate ? new Date(historyData.startDate) : null
                }
                disabled
                placeholder="Pilih Tanggal"
                className="w-[200px]"
                dateFormat="dd/MM/yyyy HH:mm"
              />
            </div>
            <span className="text-sm text-[#868686]">s/d</span>
            <div className="pointer-events-none [&_span]:!text-xs [&_span]:!font-medium [&_span]:!text-[#1B1B1B]">
              <DateTimePickerWeb
                value={
                  historyData.endDate ? new Date(historyData.endDate) : null
                }
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
              value={historyData.url || ""}
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
              value={historyData.status}
              onClick={() => {}}
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

export default SectionPromoHistory;
