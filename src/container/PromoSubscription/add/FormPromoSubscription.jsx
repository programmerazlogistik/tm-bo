import { useEffect, useState } from "react";

import { Button } from "@muatmuat/ui/Button";
import { DateTimePickerWeb } from "@muatmuat/ui/Calendar";
import { Input } from "@muatmuat/ui/Form";
import { ConfirmationModal } from "@muatmuat/ui/Modal";
import { toast } from "@muatmuat/ui/Toaster";
import { Controller, useForm } from "react-hook-form";

import { useCreatePromoSubscription } from "@/services/promo-subscription/useCreatePromoSubscription";

import PageTitle from "@/components/PageTitle/PageTitle";
import { MultiSelect } from "@/components/Select/MultiSelect";

// Validation schema removed - using manual validation with modals instead

const FormPromoSubscription = () => {
  const { createSubscription, isLoading } = useCreatePromoSubscription();
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [isEmptyFieldModalOpen, setIsEmptyFieldModalOpen] = useState(false);
  const [isDuplicatePromoModalOpen, setIsDuplicatePromoModalOpen] =
    useState(false);
  const [isDiscountAboveNormalModalOpen, setIsDiscountAboveNormalModalOpen] =
    useState(false);
  const [
    isNavigationConfirmationModalOpen,
    setIsNavigationConfirmationModalOpen,
  ] = useState(false);

  const { control, watch, setValue, reset } = useForm({
    defaultValues: {
      packageName: "",
      userType: [],
      startDate: null,
      endDate: null,
      promoType: [],
      normalPrice: 1000000,
      discountAmount: 0,
      discountPercentage: 0,
      discountedPrice: 1000000,
      normalCoin: 500,
      bonusCoin: 0,
      totalCoin: 500,
    },
  });

  // Watch form values
  const promoType = watch("promoType");
  const discountAmount = watch("discountAmount");
  const discountPercentage = watch("discountPercentage");
  const normalPrice = watch("normalPrice");
  const bonusCoin = watch("bonusCoin");
  const normalCoin = watch("normalCoin");

  // Reset discount fields when discount is deselected
  useEffect(() => {
    if (!promoType.includes("Discount")) {
      setValue("discountAmount", 0);
      setValue("discountPercentage", 0);
      setValue("discountedPrice", normalPrice);
    }
  }, [promoType, normalPrice, setValue]);

  // Reset discounted price when both discount fields are cleared
  useEffect(() => {
    if (
      promoType.includes("Discount") &&
      (discountAmount === 0 || discountAmount === undefined) &&
      (discountPercentage === 0 || discountPercentage === undefined)
    ) {
      setValue("discountedPrice", normalPrice);
    }
  }, [discountAmount, discountPercentage, normalPrice, promoType, setValue]);

  // Reset free coin fields when free coin is deselected
  useEffect(() => {
    if (!promoType.includes("Free Coin")) {
      setValue("bonusCoin", 0);
      setValue("totalCoin", normalCoin);
    }
  }, [promoType, normalCoin, setValue]);

  // Reset total coin when bonus coin is cleared
  useEffect(() => {
    if (promoType.includes("Free Coin")) {
      if (bonusCoin === 0 || bonusCoin === undefined) {
        setValue("totalCoin", normalCoin || 0);
      }
    }
  }, [bonusCoin, normalCoin, promoType, setValue]);

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

  // Calculate discounted price
  useEffect(() => {
    if (normalPrice !== undefined) {
      // Check if either discount field has a value greater than 0
      const hasDiscount =
        (discountAmount !== undefined && discountAmount > 0) ||
        (discountPercentage !== undefined && discountPercentage > 0);

      if (hasDiscount) {
        const amountDiscount = discountAmount || 0;
        const percentageDiscount =
          (normalPrice * (discountPercentage || 0)) / 100;
        const totalDiscount = amountDiscount + percentageDiscount;
        const calculatedDiscountedPrice = Math.max(
          0,
          normalPrice - totalDiscount
        );
        setValue("discountedPrice", calculatedDiscountedPrice);
      } else {
        setValue("discountedPrice", normalPrice);
      }
    }
  }, [discountAmount, discountPercentage, normalPrice, setValue]);

  // Calculate total coin
  useEffect(() => {
    if (normalCoin !== undefined && bonusCoin !== undefined) {
      const normal = normalCoin || 0;
      const bonus = bonusCoin || 0;
      setValue("totalCoin", normal + bonus);
    }
  }, [bonusCoin, normalCoin, setValue]);

  // Options for selects
  const userTypeOptions = [
    { value: "User Baru", label: "User Baru" },
    { value: "User Lama", label: "User Lama" },
  ];

  const promoTypeOptions = [
    { value: "Discount", label: "Discount" },
    { value: "Free Coin", label: "Free Coin" },
  ];

  // Handle form submission
  const onSubmit = (data) => {
    console.log("Form submitted with data:", data);
    // Validate all required fields
    const isPackageNameEmpty =
      !data.packageName || data.packageName.trim() === "";
    const isUserTypeEmpty = !data.userType || data.userType.length === 0;
    const isStartDateEmpty = !data.startDate;
    const isEndDateEmpty = !data.endDate;
    const isPromoTypeEmpty = !data.promoType || data.promoType.length === 0;

    // Check if any required field is empty
    const isAnyRequiredFieldEmpty =
      isPackageNameEmpty ||
      isUserTypeEmpty ||
      isStartDateEmpty ||
      isEndDateEmpty ||
      isPromoTypeEmpty;

    if (isAnyRequiredFieldEmpty) {
      console.log("Required fields are empty");
      setIsEmptyFieldModalOpen(true);
      return;
    }

    // Check if discount is selected but no discount values provided
    const isDiscountSelected = data.promoType.includes("Discount");
    const isFreeCoinSelected = data.promoType.includes("Free Coin");

    const isDiscountInvalid =
      isDiscountSelected &&
      data.discountAmount === 0 &&
      data.discountPercentage === 0;

    const isFreeCoinInvalid = isFreeCoinSelected && data.bonusCoin === 0;

    if (isDiscountInvalid || isFreeCoinInvalid) {
      console.log("Discount or Free Coin fields are invalid");
      setIsEmptyFieldModalOpen(true);
      return;
    }

    // Check if discount amount is above normal price
    if (isDiscountSelected && data.discountAmount > data.normalPrice) {
      console.log("Discount amount is above normal price");
      setIsDiscountAboveNormalModalOpen(true);
      return;
    }

    // Check for duplicate promo (mock implementation)
    // In a real app, this would be an API call
    const isDuplicate = false; // Mock value
    if (isDuplicate) {
      setIsDuplicatePromoModalOpen(true);
      return;
    }

    // Open confirmation modal
    console.log("All validations passed, opening confirmation modal");
    setIsConfirmationModalOpen(true);
  };

  // Handle save confirmation
  const handleSaveConfirmation = async () => {
    const formData = watch();

    try {
      const response = await createSubscription(formData);
      if (response.success) {
        toast.success("Data berhasil disimpan");
        setIsConfirmationModalOpen(false);
        // Reset form after successful submission
        reset({
          packageName: "",
          userType: [],
          startDate: null,
          endDate: null,
          promoType: [],
          normalPrice: 1000000,
          discountAmount: 0,
          discountPercentage: 0,
          discountedPrice: 1000000,
          normalCoin: 500,
          bonusCoin: 0,
          totalCoin: 500,
        });
      } else {
        toast.error("Gagal menyimpan data");
      }
    } catch (error) {
      toast.error(
        `Gagal menyimpan data: ${error.message || "Terjadi kesalahan tidak dikenal"}`
      );
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
        onBack={() => setIsNavigationConfirmationModalOpen(true)}
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
                appearance={{
                  containerClassName: "h-8 rounded-[6px] border-[#A8A8A8]",
                  inputClassName: "text-sm",
                }}
                // status={errors.packageName ? "error" : undefined} - using modals instead
              />
            )}
          />
          {/* Error messages removed - using modals instead */}
        </div>

        {/* Tipe User */}
        <div className="grid grid-cols-[280px_1fr] items-center">
          <label className="text-sm font-semibold text-neutral-600">
            Tipe User *
          </label>
          <Controller
            name="userType"
            control={control}
            render={({ field }) => (
              <MultiSelect.Root
                value={field.value}
                onValueChange={field.onChange}
                options={userTypeOptions}
                placeholder="Pilih tipe user"
                enableSelectAll={false}
              >
                <MultiSelect.Trigger className="w-full" />
                <MultiSelect.Content>
                  <MultiSelect.List className="h-max" />
                </MultiSelect.Content>
              </MultiSelect.Root>
            )}
          />
          {/* Error messages removed - using modals instead */}
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
            name="promoType"
            control={control}
            render={({ field }) => (
              <MultiSelect.Root
                value={field.value}
                onValueChange={field.onChange}
                options={promoTypeOptions}
                placeholder="Pilih tipe promo"
                enableSelectAll={false}
              >
                <MultiSelect.Trigger className="w-full" />
                <MultiSelect.Content>
                  <MultiSelect.List className="h-max" />
                </MultiSelect.Content>
              </MultiSelect.Root>
            )}
          />
          {/* Error messages removed - using modals instead */}
        </div>

        {/* Discount Fields */}
        {(promoType.includes("Discount") ||
          promoType.includes("Free Coin")) && (
          <>
            {/* Discount Section */}
            {promoType.includes("Discount") && (
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
                        onChange={(e) =>
                          field.onChange(parseFormattedNumber(e.target.value))
                        }
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
                  {/* Error messages removed - using modals instead */}
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
                          onChange={(e) =>
                            field.onChange(parseFormattedNumber(e.target.value))
                          }
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
                  {/* Error messages removed - using modals instead */}
                </div>

                {/* Harga Setelah Diskon */}
                <div className="grid grid-cols-[280px_1fr] items-center">
                  <label className="text-sm font-semibold text-neutral-600">
                    Harga Setelah Diskon (Rp)*
                  </label>
                  <Controller
                    name="discountedPrice"
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
            {promoType.includes("Free Coin") && (
              <>
                {/* Koin Normal */}
                <div className="grid grid-cols-[280px_1fr] items-center">
                  <label className="text-sm font-semibold text-neutral-600">
                    Coin Normal *
                  </label>
                  <Controller
                    name="normalCoin"
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
                    name="bonusCoin"
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
                  {/* Error messages removed - using modals instead */}
                </div>

                {/* Total Koin */}
                <div className="grid grid-cols-[280px_1fr] items-center">
                  <label className="text-sm font-semibold text-neutral-600">
                    Total Koin*
                  </label>
                  <Controller
                    name="totalCoin"
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
            disabled={isLoading}
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

      {/* Duplicate Promo Warning Modal */}
      <ConfirmationModal
        isOpen={isDuplicatePromoModalOpen}
        setIsOpen={setIsDuplicatePromoModalOpen}
        variant="bo"
        title={{
          text: "Warning",
        }}
        description={{
          text: "Promo dengan paket yang sama masih aktif pada periode ini",
        }}
        cancel={{
          text: "Tutup",
          showOnlyCancel: true,
        }}
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
    </section>
  );
};

export default FormPromoSubscription;
