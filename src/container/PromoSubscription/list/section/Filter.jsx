import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { valibotResolver } from "@hookform/resolvers/valibot";
import { useDebounce } from "@muatmuat/hooks/use-debounce";
import { Plus } from "@muatmuat/icons";
import { Button } from "@muatmuat/ui/Button";
import { Input } from "@muatmuat/ui/Form";
import { useForm } from "react-hook-form";
import * as v from "valibot";

import { usePromoSubscriptionStore } from "@/store/promo-subscription/usePromoSubscriptionStore";

import FilterSection from "./FilterSection";

const filterSchema = v.object({
  id: v.optional(v.string()),
  status: v.optional(v.array(v.string())),
  startDate: v.optional(v.date()),
  endDate: v.optional(v.date()),
  paketSubscription: v.optional(v.array(v.string())),
  user: v.optional(v.array(v.string())),
  tipePromo: v.optional(v.array(v.string())),
});

const defaultFilterValues = {
  id: "",
  paketSubscription: [],
  startDate: undefined,
  endDate: undefined,
  status: [],
  user: [],
  tipePromo: [],
};

const Filter = ({ onFilterSubmit, onResetFilters }) => {
  const router = useRouter();

  const { search, setSearch, currentTab } = usePromoSubscriptionStore();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [inputValue, setInputValue] = useState(search);

  // Debounce search input with 300ms delay
  const debouncedSearch = useDebounce(inputValue, 300);

  // Update store search when debounced value changes
  useEffect(() => {
    if (debouncedSearch.length === 0 || debouncedSearch.length >= 3) {
      setSearch(debouncedSearch);
    } else {
      setSearch("");
    }
  }, [debouncedSearch, setSearch]);

  const { control, register, handleSubmit, reset } = useForm({
    resolver: valibotResolver(filterSchema),
    defaultValues: defaultFilterValues,
  });

  const onSubmit = (data) => {
    console.log("Filter submitted:", data);
    if (onFilterSubmit) onFilterSubmit(data);
  };

  const handleResetFilter = () => {
    reset(defaultFilterValues);
    console.log("Filter reset");
    if (onResetFilters) onResetFilters();
  };

  return (
    <main>
      <section className="my-4 flex items-center justify-between">
        {!isFilterOpen && (
          <div className="flex items-center gap-2.5">
            <label
              htmlFor="search"
              className="shrink-0 whitespace-nowrap text-sm font-medium text-neutral-900"
            >
              Pencarian :
            </label>
            {/* 26. 03 - TM - LB - 0024 */}
            <div className="w-[240px]">
              <Input
                id="search"
                name="search"
                placeholder="Cari Promo"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                withReset
              />
            </div>
          </div>
        )}

        <div className="ml-auto flex items-center gap-2.5">
          <Button
            variant="muatparts-primary"
            onClick={() => {
              router.push("/promo-subscription/add");
            }}
          >
            <div className="flex items-center gap-1">
              <Plus className="size-4 stroke-2" />
              <span>Buat Promo</span>
            </div>
          </Button>
          <Button
            variant="muatparts-warning"
            onClick={() => setIsFilterOpen((prev) => !prev)}
          >
            Filter
          </Button>
        </div>
      </section>

      <FilterSection
        isFilterOpen={isFilterOpen}
        setIsFilterOpen={setIsFilterOpen}
        control={control}
        register={register}
        handleSubmit={handleSubmit}
        onApplyFilter={onSubmit}
        handleResetFilter={handleResetFilter}
        activeTab={currentTab === "active" ? "active" : "history"}
      />
    </main>
  );
};

export default Filter;
