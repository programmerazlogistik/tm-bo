import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { Button } from "@muatmuat/ui/Button";
import { DateTimePickerWeb } from "@muatmuat/ui/Calendar";
import { Input } from "@muatmuat/ui/Form";
import { ConfirmationModal } from "@muatmuat/ui/Modal";
import { toast } from "@muatmuat/ui/Toaster";
import { Controller, useForm } from "react-hook-form";

import { useCancelPromoSubscription } from "@/services/promo-subscription/useCancelPromoSubscription";

import { MultiSelect } from "@/components/Select/MultiSelect";

import {
  PromoStatus,
  UserType,
  UserTypeLabel,
} from "@/container/PromoSubscription/utils/enum";

const TabMainSection = ({ promoData, isHistoryView = false, mutate }) => {
  const router = useRouter();
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const { cancelSubscription, isLoading: isCancelLoading } =
    useCancelPromoSubscription();
  const [isProcessing, setIsProcessing] = useState(false);

  const { control, reset, watch } = useForm({
    defaultValues: {
      packageName: "",
      userTypes: [],
      startDate: null,
      endDate: null,
      promoTypes: [],
      normalPrice: 0,
      discountAmount: 0,
      discountPercentage: 0,
      finalPrice: 0,
      normalCoinsEarned: 0,
      freeCoinsEarned: 0,
      finalCoinsEarned: 0,
    },
  });

  // Set initial form values when data loads
  useEffect(() => {
    if (promoData) {
      reset({
        promoId: promoData.promoId || "",
        packageName: promoData.packageName || "",
        userTypes: promoData.userTypes || [],
        startDate: promoData.startDate ? new Date(promoData.startDate) : null,
        endDate: promoData.endDate ? new Date(promoData.endDate) : null,
        promoTypes: promoData.promoTypes || [],
        normalPrice: promoData.discount?.normalPrice || 0,
        discountAmount: promoData.discount?.discountAmount || 0,
        discountPercentage: promoData.discount?.discountPercentage || 0,
        finalPrice: promoData.discount?.finalPrice || 0,
        normalCoinsEarned: promoData.coin?.normalCoins || 0,
        freeCoinsEarned: promoData.coin?.bonusCoins || 0, // Maps to freeCoinsEarned/bonusCoins
        finalCoinsEarned: promoData.coin?.totalCoins || 0, // Maps to finalCoinsEarned/totalCoins
      });
    }
  }, [promoData, reset]);

  // Watch form values
  const promoTypes = watch("promoTypes");

  // Format number with thousand separators
  const formatNumber = (num) => {
    if (num === undefined || num === null) return "";
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  // Options for selects - use enum values with Indonesian labels
  const userTypeOptions = useMemo(
    () => [
      { value: UserType.NEW_USER, label: UserTypeLabel[UserType.NEW_USER] },
      {
        value: UserType.EXISTING_USER,
        label: UserTypeLabel[UserType.EXISTING_USER],
      },
    ],
    []
  );

  const promoTypeOptions = useMemo(
    () => [
      { value: "DISCOUNT", label: "Discount" },
      { value: "FREE_COIN", label: "Free Coin" },
    ],
    []
  );

  // Handle cancel confirmation
  const handleCancelConfirmation = async () => {
    setIsProcessing(true);
    try {
      // Call the cancel API
      const response = await cancelSubscription(promoData?.id);

      if (response?.Message?.Code === 200) {
        // Show success toast
        toast.success("Promo berhasil dibatalkan");
        // Use mutate to refresh the data
        if (mutate) {
          await mutate();
        }
        // Navigate back to the promo subscription list page
        router.replace("/promo-subscription");
      } else {
        toast.error("Gagal membatalkan promo");
      }
    } catch (error) {
      toast.error(error.message || "Gagal membatalkan promo");
    }
    setIsProcessing(false);
    setIsCancelModalOpen(false);
  };

  return (
    <>
      <div className="space-y-2">
        {/* Promo ID */}
        <div className="grid grid-cols-[280px_1fr] items-center">
          <label className="text-sm font-semibold text-neutral-600">
            ID Promo
          </label>
          <Controller
            name="promoId"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                className="w-full"
                aria-label="Promo ID"
                disabled
                appearance={{
                  containerClassName:
                    "h-8 rounded-[6px] bg-white border-none pl-0",
                  inputClassName: "text-sm",
                }}
              />
            )}
          />
        </div>

        {/* Nama Paket */}
        <div className="grid grid-cols-[280px_1fr] items-center">
          <label className="text-sm font-semibold text-neutral-600">
            Nama Paket *
          </label>
          <Controller
            name="packageName"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Masukkan nama paket"
                className="w-full"
                aria-label="Nama paket"
                disabled
                appearance={{
                  containerClassName: "h-8 rounded-[6px] border-[#A8A8A8]",
                  inputClassName: "text-sm",
                }}
              />
            )}
          />
        </div>

        {/* Tipe User */}
        <div className="grid grid-cols-[280px_1fr] items-center">
          <label className="text-sm font-semibold text-neutral-600">
            Tipe User *
          </label>
          <Controller
            name="userTypes"
            control={control}
            render={({ field }) => (
              <MultiSelect.Root
                value={field.value}
                onValueChange={() => {}}
                options={userTypeOptions}
                placeholder="Pilih tipe user"
                enableSelectAll={false}
                disabled
              >
                <MultiSelect.Trigger className="w-full" />
                <MultiSelect.Content>
                  <MultiSelect.List className="h-max" />
                </MultiSelect.Content>
              </MultiSelect.Root>
            )}
          />
        </div>

        {/* Masa Berlaku */}
        <div className="grid grid-cols-[280px_1fr] items-center">
          <label className="text-sm font-semibold text-neutral-600">
            Mulai Berlaku *
          </label>
          <div className="flex flex-row items-center gap-6">
            <Controller
              name="startDate"
              control={control}
              render={({ field }) => (
                <DateTimePickerWeb
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Pilih tanggal dan waktu"
                  dateFormat="dd MMM yyyy, HH:mm"
                  showTime={true}
                  disabled
                />
              )}
            />
            <span className="text-sm font-medium text-neutral-600">s/d</span>
            <Controller
              name="endDate"
              control={control}
              render={({ field }) => (
                <DateTimePickerWeb
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Pilih tanggal dan waktu"
                  dateFormat="dd MMM yyyy, HH:mm"
                  showTime={true}
                  disabled
                />
              )}
            />
          </div>
        </div>

        {/* Tipe Promo */}
        <div className="grid grid-cols-[280px_1fr] items-center">
          <label className="text-sm font-semibold text-neutral-600">
            Tipe Promo *
          </label>
          <Controller
            name="promoTypes"
            control={control}
            render={({ field }) => (
              <MultiSelect.Root
                value={field.value}
                onValueChange={() => {}}
                options={promoTypeOptions}
                placeholder="Pilih tipe promo"
                enableSelectAll={false}
                disabled
              >
                <MultiSelect.Trigger className="w-full" />
                <MultiSelect.Content>
                  <MultiSelect.List className="h-max" />
                </MultiSelect.Content>
              </MultiSelect.Root>
            )}
          />
        </div>

        {/* Discount and Free Coin Fields */}
        {(promoTypes.includes("DISCOUNT") ||
          promoTypes.includes("FREE_COIN")) && (
          <>
            {/* Discount Section */}
            {promoTypes.includes("DISCOUNT") && (
              <>
                {/* Harga Normal */}
                <div className="grid grid-cols-[280px_1fr] items-center">
                  <label className="text-sm font-semibold text-neutral-600">
                    Harga Normal (Rp) *
                  </label>
                  <Controller
                    name="normalPrice"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        value={formatNumber(field.value) || ""}
                        placeholder="Masukkan harga normal"
                        disabled
                        aria-label="Harga normal"
                        appearance={{
                          containerClassName:
                            "h-8 rounded-[6px] border-[#A8A8A8]",
                          inputClassName: "text-sm",
                        }}
                      />
                    )}
                  />
                </div>

                {/* Discount Amount */}
                <div className="grid grid-cols-[280px_1fr] items-center">
                  <label className="text-sm font-semibold text-neutral-600">
                    Discount (Rp)*
                  </label>
                  <Controller
                    name="discountAmount"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        value={formatNumber(field.value) || ""}
                        placeholder="1.000.000"
                        aria-label="Jumlah discount"
                        disabled
                        appearance={{
                          containerClassName:
                            "h-8 rounded-[6px] border-[#A8A8A8]",
                          inputClassName: "text-sm",
                        }}
                      />
                    )}
                  />
                </div>

                {/* Discount Percentage */}
                <div className="grid grid-cols-[280px_1fr] items-center">
                  <label className="text-sm font-semibold text-neutral-600">
                    Discount (%)*
                  </label>
                  <div className="relative">
                    <Controller
                      name="discountPercentage"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          value={formatNumber(field.value) || ""}
                          text={{
                            right: (
                              <span className="font-medium text-neutral-600">
                                %
                              </span>
                            ),
                          }}
                          placeholder="10"
                          aria-label="Persentase discount"
                          disabled
                          appearance={{
                            containerClassName:
                              "h-8 rounded-[6px] border-[#A8A8A8] pl-3 w-24",
                            inputClassName: "text-sm",
                          }}
                        />
                      )}
                    />
                  </div>
                </div>

                {/* Harga Setelah Diskon */}
                <div className="grid grid-cols-[280px_1fr] items-center">
                  <label className="text-sm font-semibold text-neutral-600">
                    Harga Setelah Diskon (Rp)*
                  </label>
                  <Controller
                    name="finalPrice"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        value={formatNumber(field.value) || ""}
                        placeholder="Harga setelah diskon"
                        disabled
                        aria-label="Harga setelah diskon"
                        appearance={{
                          containerClassName:
                            "h-8 rounded-[6px] border-[#A8A8A8]",
                          inputClassName: "text-sm",
                        }}
                      />
                    )}
                  />
                </div>
              </>
            )}

            {/* Free Coin Section */}
            {promoTypes.includes("FREE_COIN") && (
              <>
                {/* Koin Normal */}
                <div className="grid grid-cols-[280px_1fr] items-center">
                  <label className="text-sm font-semibold text-neutral-600">
                    Coin Normal *
                  </label>
                  <Controller
                    name="normalCoinsEarned"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        value={formatNumber(field.value) || ""}
                        placeholder="Masukkan jumlah coin normal"
                        disabled
                        aria-label="Jumlah coin normal"
                        appearance={{
                          containerClassName:
                            "h-8 rounded-[6px] border-[#A8A8A8]",
                          inputClassName: "text-sm",
                        }}
                      />
                    )}
                  />
                </div>

                {/* Bonus Koin */}
                <div className="grid grid-cols-[280px_1fr] items-center">
                  <label className="text-sm font-semibold text-neutral-600">
                    Bonus Koin*
                  </label>
                  <Controller
                    name="freeCoinsEarned"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        value={formatNumber(field.value) || ""}
                        placeholder="Masukkan jumlah bonus coin"
                        aria-label="Jumlah bonus coin"
                        disabled
                        appearance={{
                          containerClassName:
                            "h-8 rounded-[6px] border-[#A8A8A8]",
                          inputClassName: "text-sm",
                        }}
                      />
                    )}
                  />
                </div>

                {/* Total Koin */}
                <div className="grid grid-cols-[280px_1fr] items-center">
                  <label className="text-sm font-semibold text-neutral-600">
                    Total Koin*
                  </label>
                  <Controller
                    name="finalCoinsEarned"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        value={formatNumber(field.value) || ""}
                        placeholder="Total koin"
                        disabled
                        aria-label="Total koin"
                        appearance={{
                          containerClassName:
                            "h-8 rounded-[6px] border-[#A8A8A8]",
                          inputClassName: "text-sm",
                        }}
                      />
                    )}
                  />
                </div>
              </>
            )}
          </>
        )}

        {/* Cancel Button for "UPCOMING" status */}
        {!isHistoryView && promoData?.status === PromoStatus.UPCOMING && (
          <div className="ml-[280px] flex justify-start pt-4">
            <Button
              type="button"
              variant="muattrans-error-secondary"
              className="flex items-center gap-2 rounded-[20px] px-6 py-2 text-sm font-semibold"
              onClick={() => setIsCancelModalOpen(true)}
            >
              Batalkan
            </Button>
          </div>
        )}
      </div>

      {/* Cancel Confirmation Modal */}
      <ConfirmationModal
        isOpen={isCancelModalOpen}
        setIsOpen={setIsCancelModalOpen}
        variant="bo"
        title={{
          text: "Pemberitahuan",
        }}
        description={{
          text: (
            <span>
              Apakah Anda yakin ingin membatalkan promo{" "}
              <strong>{promoData?.promoId}</strong> ?
            </span>
          ),
        }}
        cancel={{
          text: "Batal",
          disabled: isProcessing || isCancelLoading,
        }}
        confirm={{
          text: isProcessing || isCancelLoading ? "Memproses..." : "Ya",
          onClick: handleCancelConfirmation,
          disabled: isProcessing || isCancelLoading,
        }}
      />
    </>
  );
};

export default TabMainSection;
