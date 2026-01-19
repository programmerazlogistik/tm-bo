import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { Button } from "@muatmuat/ui/Button";
import { Input } from "@muatmuat/ui/Form";
import { ConfirmationModal } from "@muatmuat/ui/Modal";
import { toast } from "@muatmuat/ui/Toaster";
import { Controller, useForm } from "react-hook-form";
import { mutate } from "swr";

import { useGetPackageSubscriptionList } from "@/services/package-subscription/useGetPackageSubscriptionList";
import { useCreatePromoSubscription } from "@/services/promo-subscription/useCreatePromoSubscription";

import PageTitle from "@/components/PageTitle/PageTitle";
import { MultiSelect } from "@/components/Select/MultiSelect";

import { DateTimePickerWeb } from "@/container/PackageSubscription/Add/components/DateTimePickerWeb";

import { UserType, UserTypeLabel } from "../utils/enum";

const FormPromoSubscription = () => {
  // 26. 03 - TM - LB - 0027
  // 26. 03 - TM - LB - 0028
  // 26. 03 - TM - LB - 0032
  // 26. 03 - TM - LB - 0117
  // 26. 03 - TM - LB - 0124
  // 26. 03 - TM - LB - 0030
  const router = useRouter();
  const { createSubscription, isLoading } = useCreatePromoSubscription();

  // State Modals (Disamakan dengan flow Edit)
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [isEmptyFieldModalOpen, setIsEmptyFieldModalOpen] = useState(false);
  const [isDiscountAboveNormalModalOpen, setIsDiscountAboveNormalModalOpen] =
    useState(false);
  const [
    isNavigationConfirmationModalOpen,
    setIsNavigationConfirmationModalOpen,
  ] = useState(false);
  const [isConflictModalOpen, setIsConflictModalOpen] = useState(false);

  const {
    control,
    watch,
    setValue,
    reset,
    formState: { isDirty },
  } = useForm({
    defaultValues: {
      packageId: "",
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

  // Watch form values
  const promoTypes = watch("promoTypes");
  const discountAmount = watch("discountAmount");
  const discountPercentage = watch("discountPercentage");
  const normalPrice = watch("normalPrice");
  const freeCoinsEarned = watch("freeCoinsEarned");
  const normalCoinsEarned = watch("normalCoinsEarned");
  const startDate = watch("startDate");
  // 26. 03 - TM - LB - 0174
  const endDate = watch("endDate");

  // Validate that end date is at least 1 minute after start date
  const isDateTimeValid = useMemo(() => {
    if (!startDate || !endDate) return true; // Allow empty dates

    const startTime = new Date(startDate).getTime();
    const endTime = new Date(endDate).getTime();
    const oneMinuteInMs = 60 * 1000; // 1 minute in milliseconds

    // End date must be at least 1 minute after start date
    return endTime >= startTime + oneMinuteInMs;
  }, [startDate, endDate]);

  // Reset discount fields when discount is deselected
  useEffect(() => {
    if (!isDirty) return;
    if (!promoTypes.includes("DISCOUNT")) {
      setValue("discountAmount", 0);
      setValue("discountPercentage", 0);
      setValue("finalPrice", normalPrice);
    }
  }, [promoTypes, normalPrice, setValue, isDirty]);

  // Reset discounted price when both discount fields are cleared
  useEffect(() => {
    if (
      promoTypes.includes("DISCOUNT") &&
      (discountAmount === 0 || discountAmount === undefined) &&
      (discountPercentage === 0 || discountPercentage === undefined)
    ) {
      setValue("finalPrice", normalPrice);
    }
  }, [discountAmount, discountPercentage, normalPrice, promoTypes, setValue]);

  // Reset free coin fields when free coin is deselected
  useEffect(() => {
    if (!isDirty) return;
    if (!promoTypes.includes("FREE_COIN")) {
      setValue("freeCoinsEarned", 0);
      setValue("finalCoinsEarned", normalCoinsEarned);
    }
  }, [promoTypes, normalCoinsEarned, setValue, isDirty]);

  // Reset total coin when bonus coin is cleared
  useEffect(() => {
    if (promoTypes.includes("FREE_COIN")) {
      if (freeCoinsEarned === 0 || freeCoinsEarned === undefined) {
        setValue("finalCoinsEarned", normalCoinsEarned || 0);
      }
    }
  }, [freeCoinsEarned, normalCoinsEarned, promoTypes, setValue]);

  // Format number with thousand separators
  const formatNumber = (num) => {
    if (num === undefined || num === null) return "";
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  // Parse formatted number string back to number
  const parseFormattedNumber = (str) => {
    if (!str) return 0;
    return parseInt(str.replace(/\./g, "")) || 0;
  };

  // Sync discount from Amount (Rp)
  const syncDiscountFromAmount = (amount) => {
    if (normalPrice && normalPrice > 0) {
      const percentage = (amount / normalPrice) * 100;
      setValue("discountPercentage", parseFloat(percentage.toFixed(2)), {
        shouldValidate: true,
        shouldDirty: true,
      });
      const final = Math.max(0, normalPrice - amount);
      setValue("finalPrice", final, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  };

  // Sync discount from Percentage (%)
  const syncDiscountFromPercentage = (percentage) => {
    if (normalPrice && normalPrice > 0) {
      const amount = (percentage / 100) * normalPrice;
      setValue("discountAmount", Math.round(amount), {
        shouldValidate: true,
        shouldDirty: true,
      });
      const final = Math.max(0, normalPrice - amount);
      setValue("finalPrice", final, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  };

  // Calculate total coin
  useEffect(() => {
    if (normalCoinsEarned !== undefined && freeCoinsEarned !== undefined) {
      const normal = normalCoinsEarned || 0;
      const bonus = freeCoinsEarned || 0;
      setValue("finalCoinsEarned", normal + bonus);
    }
  }, [freeCoinsEarned, normalCoinsEarned, setValue]);

  // Fetch package list for options
  const { data: packageData, isLoading: isLoadingPackages } =
    useGetPackageSubscriptionList({
      limit: 50,
      sort_by: "packageName",
      sort_order: "asc",
      is_active: true,
    });

  const packageOptions = useMemo(
    () =>
      packageData?.packages?.map((pkg) => ({
        value: pkg.id,
        label: pkg.packageName,
        price: pkg.price,
        coinEarned: pkg.coinEarned,
        isUnlimitedCoin: pkg.isUnlimitedCoin,
      })) || [],
    [packageData]
  );

  const selectedPackageId = watch("packageId");
  const isUnlimitedCoin = useMemo(() => {
    const pkg = packageOptions.find((p) => p.value === selectedPackageId);
    return pkg?.isUnlimitedCoin || false;
  }, [packageOptions, selectedPackageId]);

  // Remove FREE_COIN if isUnlimitedCoin is true
  useEffect(() => {
    if (isUnlimitedCoin && promoTypes.includes("FREE_COIN")) {
      const newTypes = promoTypes.filter((t) => t !== "FREE_COIN");
      setValue("promoTypes", newTypes, { shouldValidate: true });
    }
  }, [isUnlimitedCoin, promoTypes, setValue]);

  // Handle package selection
  const handlePackageChange = (selectedId) => {
    // MultiSelect returns array for valid selections, handle single select behavior
    const id = Array.isArray(selectedId)
      ? selectedId[selectedId.length - 1]
      : selectedId;

    setValue("packageId", id);

    const selectedPackage = packageOptions.find((pkg) => pkg.value === id);
    if (selectedPackage) {
      setValue("packageName", selectedPackage.label);
      // Determine normalized price (handle string or number)
      const price =
        typeof selectedPackage.price === "string"
          ? parseFloat(selectedPackage.price)
          : selectedPackage.price;
      setValue("normalPrice", price);
      setValue("normalCoinsEarned", selectedPackage.coinEarned);
      // Reset dependent fields
      setValue("discountAmount", 0);
      setValue("discountPercentage", 0);
      setValue("finalPrice", price);
      setValue("finalCoinsEarned", selectedPackage.coinEarned);
    }
  };
  // 26. 03 - TM - LB - 0173
  const userTypeOptions = useMemo(
    () => [
      {
        value: UserType.NEW_USER,
        label: "User Baru (User yang belum pernah membeli paket)",
        shortLabel: UserTypeLabel[UserType.NEW_USER],
      },
      {
        value: UserType.EXISTING_USER,
        label: UserTypeLabel[UserType.EXISTING_USER],
      },
    ],
    []
  );
  // 26. 03 - TM - LB - 0175
  const promoTypeOptions = useMemo(() => {
    let options = [
      { value: "DISCOUNT", label: "Discount" },
      { value: "FREE_COIN", label: "Free Coin" },
    ];

    // Remove FREE_COIN if package has unlimited coins
    if (isUnlimitedCoin) {
      options = options.filter((o) => o.value !== "FREE_COIN");
    }

    // Remove DISCOUNT if package price is 0
    if (normalPrice === 0 || normalPrice === "0" || normalPrice === "0.00") {
      options = options.filter((o) => o.value !== "DISCOUNT");
    }

    return options;
  }, [isUnlimitedCoin, normalPrice]);

  // Handle form submission
  const onSubmit = (data) => {
    // Validate required fields
    const isPackageNameEmpty =
      !data.packageName || data.packageName.trim() === "";
    const isUserTypeEmpty = !data.userTypes || data.userTypes.length === 0;
    const isStartDateEmpty = !data.startDate;
    const isEndDateEmpty = !data.endDate;
    const isPromoTypeEmpty = !data.promoTypes || data.promoTypes.length === 0;

    // Check if any required field is empty
    const isAnyRequiredFieldEmpty =
      isPackageNameEmpty ||
      isUserTypeEmpty ||
      isStartDateEmpty ||
      isEndDateEmpty ||
      isPromoTypeEmpty;

    if (isAnyRequiredFieldEmpty) {
      setIsEmptyFieldModalOpen(true);
      return;
    }

    // Check if discount is selected but no discount values provided
    const isDiscountSelected = data.promoTypes.includes("DISCOUNT");
    const isFreeCoinSelected = data.promoTypes.includes("FREE_COIN");

    const isDiscountInvalid =
      isDiscountSelected &&
      data.discountAmount === 0 &&
      data.discountPercentage === 0;

    const isFreeCoinInvalid = isFreeCoinSelected && data.freeCoinsEarned === 0;

    if (isDiscountInvalid || isFreeCoinInvalid) {
      setIsEmptyFieldModalOpen(true);
      return;
    }

    // Check if discount amount is above normal price
    if (isDiscountSelected && data.discountAmount > data.normalPrice) {
      setIsDiscountAboveNormalModalOpen(true);
      return;
    }

    // Open confirmation modal
    console.log("All validations passed, opening confirmation modal");
    setIsConfirmationModalOpen(true);
  };

  // Handle save confirmation
  const handleSaveConfirmation = async () => {
    setIsConfirmationModalOpen(false);
    const formData = watch();

    // Map form data back to API format
    const submitData = {
      packageId: formData.packageId,
      userTypes: formData.userTypes,
      startDate: formData.startDate ? formData.startDate.toISOString() : null,
      endDate: formData.endDate ? formData.endDate.toISOString() : null,
      promoTypes: formData.promoTypes,
    };

    if (formData.promoTypes.includes("DISCOUNT")) {
      submitData.discount = {
        discountAmount: formData.discountAmount,
        discountPercentage: formData.discountPercentage,
      };
    }

    if (formData.promoTypes.includes("FREE_COIN")) {
      submitData.freeCoin = {
        bonusCoins: formData.freeCoinsEarned,
      };
    }

    try {
      await createSubscription(submitData);

      toast.success("Data berhasil disimpan");
      setIsConfirmationModalOpen(false);

      // Mutate list to refresh data
      mutate(
        (key) =>
          typeof key === "string" && key.startsWith("promo-subscriptions-")
      );

      // Redirect to list
      router.push("/promo-subscription");

      // Reset form after successful submission
      reset({
        packageId: "",
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
      });
    } catch (error) {
      // Check if the error is a 409 conflict response
      if (error?.response?.data?.Message?.Code === 409) {
        setIsConflictModalOpen(true);
      } else {
        toast.error(
          `Gagal menyimpan data: ${error.message || "Terjadi kesalahan tidak dikenal"}`
        );
      }
    }
  };

  // Handle navigation confirmation
  const handleNavigationConfirmation = (shouldNavigate) => {
    setIsNavigationConfirmationModalOpen(false);
    if (shouldNavigate) {
      // Navigate to promo subscription list
      window.location.href = "/promo-subscription";
    }
  };

  return (
    <section>
      <PageTitle
        withBack={true}
        onBackClick={() => {
          if (isDirty) {
            setIsNavigationConfirmationModalOpen(true);
          } else {
            router.back();
          }
        }}
        className="mb-2.5 text-[24px] font-bold text-[#176CF7]"
        appearance={{
          iconClassName: "size-6",
        }}
      >
        Tambah Promo Subscription
      </PageTitle>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          const data = watch();
          onSubmit(data);
        }}
        className="space-y-2"
      >
        {/* Nama Paket (Package Selection - Matches Edit Flow) */}
        <div className="grid grid-cols-[280px_1fr] items-center">
          <label className="text-sm font-semibold text-neutral-600">
            Nama Paket *
          </label>
          <Controller
            name="packageId"
            control={control}
            render={({ field }) => (
              <MultiSelect.Root
                value={field.value ? [field.value] : []}
                onValueChange={handlePackageChange}
                options={packageOptions}
                placeholder={isLoadingPackages ? "Loading..." : "Pilih Paket"}
                enableSelectAll={false}
              >
                <MultiSelect.Trigger className="w-full" />
                <MultiSelect.Content>
                  <MultiSelect.Search placeholder="Cari Nama Paket" />
                  <MultiSelect.List className="h-full max-h-[130px] overflow-y-auto" />
                </MultiSelect.Content>
              </MultiSelect.Root>
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
                onValueChange={field.onChange}
                options={userTypeOptions}
                placeholder="Pilih Tipe User"
                enableSelectAll={false}
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
                  minDate={new Date(new Date().setHours(0, 0, 0, 0))}
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
                  minDate={
                    startDate
                      ? startDate
                      : new Date(new Date().setHours(0, 0, 0, 0))
                  }
                />
              )}
            />
          </div>
        </div>
        {!isDateTimeValid && startDate && endDate && (
          <div className="grid grid-cols-[280px_1fr] items-center">
            <div></div>
            <p className="text-xs text-red-500">
              Tanggal selesai harus minimal 1 menit setelah tanggal mulai
            </p>
          </div>
        )}

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
                onValueChange={field.onChange}
                options={promoTypeOptions}
                placeholder="Pilih Tipe Promo"
                enableSelectAll={false}
              >
                <MultiSelect.Trigger className="w-full" />
                <MultiSelect.Content>
                  <MultiSelect.List className="h-max" />
                </MultiSelect.Content>
              </MultiSelect.Root>
            )}
          />
        </div>

        {/* Discount Fields */}
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
                        onChange={(e) =>
                          field.onChange(parseFormattedNumber(e.target.value))
                        }
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
                        onChange={(e) => {
                          const val = parseFormattedNumber(e.target.value);
                          field.onChange(val);
                          syncDiscountFromAmount(val);
                        }}
                        placeholder="1.000.000"
                        aria-label="Jumlah discount"
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
                          onChange={(e) => {
                            const val = parseFormattedNumber(e.target.value);
                            field.onChange(val);
                            syncDiscountFromPercentage(val);
                          }}
                          text={{
                            right: (
                              <span className="font-medium text-neutral-600">
                                %
                              </span>
                            ),
                          }}
                          placeholder="10"
                          aria-label="Persentase discount"
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
                        onChange={(e) =>
                          field.onChange(parseFormattedNumber(e.target.value))
                        }
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
                        onChange={(e) =>
                          field.onChange(parseFormattedNumber(e.target.value))
                        }
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
                        onChange={(e) =>
                          field.onChange(parseFormattedNumber(e.target.value))
                        }
                        placeholder="Masukkan jumlah bonus coin"
                        aria-label="Jumlah bonus coin"
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
                        onChange={(e) =>
                          field.onChange(parseFormattedNumber(e.target.value))
                        }
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

        {/* Submit Button */}
        <div className="flex justify-center pt-4">
          <Button
            type="submit"
            variant="muatparts-primary"
            className="flex items-center gap-2 rounded-[20px] px-6 py-2 text-sm font-semibold"
            disabled={isLoading || !isDateTimeValid}
          >
            {isLoading ? <>Menyimpan...</> : <>Simpan</>}
          </Button>
        </div>
      </form>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={isConfirmationModalOpen}
        setIsOpen={setIsConfirmationModalOpen}
        variant="bo"
        title={{
          text: "Pemberitahuan",
        }}
        description={{
          text: "Apakah Anda yakin akan menyimpan data?",
        }}
        cancel={{
          text: "Batal",
        }}
        confirm={{
          text: "Simpan",
          onClick: handleSaveConfirmation,
        }}
        disabled={isLoading}
      />

      {/* Empty Field Warning Modal */}
      <ConfirmationModal
        isOpen={isEmptyFieldModalOpen}
        setIsOpen={setIsEmptyFieldModalOpen}
        variant="bo"
        title={{
          text: "Warning",
        }}
        description={{
          text: "Terdapat field yang kosong",
        }}
        cancel={{
          text: "Tutup",
          showOnlyCancel: true,
          classname: "hidden",
        }}
        confirm={{
          classname: "hidden",
        }}
        withCloseIcon={true}
      />

      {/* Discount Above Normal Warning Modal */}
      <ConfirmationModal
        isOpen={isDiscountAboveNormalModalOpen}
        setIsOpen={setIsDiscountAboveNormalModalOpen}
        variant="bo"
        title={{
          text: "Warning",
        }}
        description={{
          text: "Harga diskon harus di bawah harga normal",
        }}
        cancel={{
          text: "Tutup",
          showOnlyCancel: true,
          classname: "hidden",
        }}
        confirm={{
          classname: "hidden",
        }}
      />

      {/* Navigation Confirmation Modal */}
      <ConfirmationModal
        isOpen={isNavigationConfirmationModalOpen}
        setIsOpen={setIsNavigationConfirmationModalOpen}
        variant="bo"
        title={{
          text: "Warning",
        }}
        description={{
          text: "Apakah kamu yakin ingin berpindah halaman?\nData yang telah diisi tidak akan disimpan.",
        }}
        cancel={{
          text: "Lanjutkan",
          onClick: () => handleNavigationConfirmation(true),
        }}
        confirm={{
          text: "Simpan",
          onClick: () => handleNavigationConfirmation(false),
        }}
        reverseButtonPosition={true}
      />

      {/* Conflict Modal - No buttons */}
      <ConfirmationModal
        isOpen={isConflictModalOpen}
        setIsOpen={setIsConflictModalOpen}
        variant="bo"
        title={{
          text: "Warning",
        }}
        description={{
          text: "Promo dengan paket yang sama masih aktif pada periode ini.",
        }}
        cancel={{
          text: "Tutup",
          showOnlyCancel: true,
          classname: "hidden",
        }}
        confirm={{
          classname: "hidden",
        }}
        withCloseIcon={true}
      />
    </section>
  );
};

export default FormPromoSubscription;
