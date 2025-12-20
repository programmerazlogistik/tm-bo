import { cn } from "@muatmuat/lib/utils";

import { usePromoSubscriptionStore } from "@/store/promo-subscription/usePromoSubscriptionStore";

const TabSection = () => {
  const { currentTab, setCurrentTab } = usePromoSubscriptionStore();

  return (
    <div className="mx-auto my-4 grid w-max cursor-pointer grid-cols-[124_124] overflow-hidden rounded-md border-2 text-xs font-semibold">
      <div
        className={cn(
          "flex w-full items-center justify-center border-r-2 py-2",
          currentTab === "active"
            ? "bg-primary-700 text-white"
            : "border-gray-300 text-gray-500"
        )}
        onClick={() => setCurrentTab("active")}
      >
        <p>Aktif</p>
      </div>
      <div
        className={cn(
          "flex w-full items-center justify-center py-2",
          currentTab === "history"
            ? "bg-primary-700 text-white"
            : "border-gray-300 text-gray-500"
        )}
        onClick={() => setCurrentTab("history")}
      >
        <p>Riwayat</p>
      </div>
    </div>
  );
};

export default TabSection;
