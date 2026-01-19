"use client";

import { ChevronUp } from "@muatmuat/icons";
import { Button } from "@muatmuat/ui/Button";
import { DatePickerWeb } from "@muatmuat/ui/Calendar";
import { Input } from "@muatmuat/ui/Form";
import { Controller } from "react-hook-form";

import { MultiSelect } from "@/components/Select/MultiSelect";

const FilterSection = ({
  isFilterOpen,
  setIsFilterOpen,
  control,
  register,
  onApplyFilter,
  handleResetFilter,
  handleSubmit,
  _activeTab,
  filterOptions = {},
}) => {
  // LB - 0176
  // Transform filterOptions from API to dropdown format
  const paketOptions =
    filterOptions?.package?.map((pkg) => ({
      value: pkg.value,
      label: pkg.name,
    })) || [];

  const statusOptions =
    filterOptions?.status?.map((status) => ({
      value: status.value,
      label: status.name,
    })) || [];

  const userOptions =
    filterOptions?.userType?.map((user) => ({
      value: user.value,
      label: user.name,
    })) || [];

  const tipePromoOptions =
    filterOptions?.promoType?.map((promo) => ({
      value: promo.value,
      label: promo.name,
    })) || [];

  if (!isFilterOpen) return null;

  return (
    <div className="mb-3 flex w-full flex-col gap-5">
      {/* Filter Header */}
      <div className="flex h-8 w-full items-center justify-between">
        <h3 className="text-sm font-semibold text-[#1B1B1B]">Filter</h3>
        <button
          type="button"
          onClick={() => setIsFilterOpen(false)}
          className="flex items-center gap-2"
        >
          <span className="text-xs font-medium text-[#176CF7]">
            Sembunyikan
          </span>
          <ChevronUp className="h-6 w-6 text-[#176CF7]" />
        </button>
      </div>

      {/* Filter Form */}
      <form
        onSubmit={handleSubmit(onApplyFilter)}
        className="flex w-full flex-col gap-5"
      >
        <div className="grid grid-cols-1 gap-x-[50px] gap-y-[15px] md:grid-cols-2">
          {/* Left Column */}
          <div className="flex flex-col gap-[15px]">
            {/* ID */}
            <div className="flex flex-row items-center gap-3">
              <label
                htmlFor="filter-id"
                className="w-[110px] flex-shrink-0 text-xs font-normal text-[#1B1B1B]"
              >
                ID
              </label>
              <Input
                id="filter-id"
                placeholder="Masukkan ID"
                className="flex-1"
                appearance={{
                  containerClassName:
                    "h-8 rounded-[6px] border-[#A8A8A8] bg-white",
                  inputClassName:
                    "text-xs font-medium placeholder:text-[#868686]",
                }}
                {...register("id")}
              />
            </div>

            {/* Paket */}
            <div className="flex flex-row items-center gap-3">
              <label
                htmlFor="filter-paket"
                className="w-[110px] flex-shrink-0 text-xs font-normal text-[#1B1B1B]"
              >
                Paket
              </label>
              <div className="min-w-0 flex-1">
                <Controller
                  name="paketSubscription"
                  control={control}
                  render={({ field }) => (
                    <MultiSelect.Root
                      value={Array.isArray(field.value) ? field.value : []}
                      onValueChange={field.onChange}
                      options={paketOptions}
                      placeholder="Pilih Paket Subscription"
                      selectAllText="Semua Paket"
                    >
                      <MultiSelect.Trigger className="w-full" />
                      <MultiSelect.Content>
                        <MultiSelect.Search placeholder="Cari Disini Paket Subscription" />
                        <MultiSelect.List />
                      </MultiSelect.Content>
                    </MultiSelect.Root>
                  )}
                />
              </div>
            </div>

            {/* Masa Berlaku */}
            <div className="flex flex-row items-center gap-3">
              <label className="w-[110px] flex-shrink-0 text-xs font-normal text-[#1B1B1B]">
                Masa Berlaku
              </label>
              <Controller
                name="startDate"
                control={control}
                render={({ field }) => (
                  <DatePickerWeb
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Pilih Tanggal"
                  />
                )}
              />
              <span className="text-xs font-normal text-[#1B1B1B]">s/d</span>
              <Controller
                name="endDate"
                control={control}
                render={({ field }) => (
                  <DatePickerWeb
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Pilih Tanggal"
                  />
                )}
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-[15px]">
            {/* Status Subscription */}
            <div className="flex flex-row items-center gap-3">
              <label
                htmlFor="filter-status"
                className="w-[110px] flex-shrink-0 text-xs font-normal text-[#1B1B1B]"
              >
                Status
              </label>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <MultiSelect.Root
                    value={Array.isArray(field.value) ? field.value : []}
                    onValueChange={field.onChange}
                    options={statusOptions}
                    placeholder="Pilih Status"
                    selectAllText="Semua Paket"
                    enableSelectAll={false}
                  >
                    <MultiSelect.Trigger className="flex-1" />
                    <MultiSelect.Content>
                      <MultiSelect.List className="h-max" />
                    </MultiSelect.Content>
                  </MultiSelect.Root>
                )}
              />
            </div>

            {/* User */}
            <div className="flex flex-row items-center gap-3">
              <label
                htmlFor="filter-user"
                className="w-[110px] flex-shrink-0 text-xs font-normal text-[#1B1B1B]"
              >
                User
              </label>
              <Controller
                name="user"
                control={control}
                render={({ field }) => (
                  <MultiSelect.Root
                    value={Array.isArray(field.value) ? field.value : []}
                    onValueChange={field.onChange}
                    options={userOptions}
                    placeholder="Pilih user"
                    enableSelectAll={false}
                  >
                    <MultiSelect.Trigger className="flex-1" />
                    <MultiSelect.Content>
                      <MultiSelect.List className="h-max" />
                    </MultiSelect.Content>
                  </MultiSelect.Root>
                )}
              />
            </div>

            {/* Tipe Promo */}
            <div className="flex flex-row items-center gap-3">
              <label
                htmlFor="filter-tipe-promo"
                className="w-[110px] flex-shrink-0 text-xs font-normal text-[#1B1B1B]"
              >
                Tipe Promo
              </label>
              <Controller
                name="tipePromo"
                control={control}
                render={({ field }) => (
                  <MultiSelect.Root
                    value={Array.isArray(field.value) ? field.value : []}
                    onValueChange={field.onChange}
                    options={tipePromoOptions}
                    placeholder="Pilih Tipe Promo"
                    enableSelectAll={false}
                  >
                    <MultiSelect.Trigger className="flex-1" />
                    <MultiSelect.Content>
                      <MultiSelect.List className="h-max" />
                    </MultiSelect.Content>
                  </MultiSelect.Root>
                )}
              />
            </div>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex h-[55px] flex-row items-end justify-end gap-[5px] pb-[10px]">
          <Button
            type="button"
            variant="muatparts-error-secondary"
            className="h-8 w-[84px] rounded-[20px] px-6 py-[7px] text-sm font-semibold"
            onClick={handleResetFilter}
          >
            Reset
          </Button>
          <Button
            type="submit"
            variant="muatparts-primary"
            className="h-8 w-[110px] flex-shrink-0 rounded-[20px] px-6 py-[7px] text-sm font-semibold"
          >
            Terapkan
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FilterSection;
