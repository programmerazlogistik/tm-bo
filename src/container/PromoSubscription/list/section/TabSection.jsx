import { cn } from "@muatmuat/lib/utils";

import { usePromoSubscriptionStore } from "@/store/promo-subscription/usePromoSubscriptionStore";

const TabSection = () => {
  // 26. 03 - TM - LB - 0031
  const { currentTab, setCurrentTab } = usePromoSubscriptionStore();

  return (
    <div className="mx-auto my-4 flex w-fit cursor-pointer justify-center overflow-hidden rounded-[6px] border border-[#A8A8A8] text-sm font-semibold">
      <div
        className={cn(
          "flex h-8 w-full items-center justify-center px-8 transition-colors",
          currentTab === "active"
            ? "bg-[#176CF7] text-white"
            : "bg-white text-[#868686] hover:bg-neutral-50"
        )}
        onClick={() => setCurrentTab("active")}
      >
        <p>Aktif</p>
      </div>
      <div
        className={cn(
          "flex h-8 w-full items-center justify-center px-8 transition-colors",
          currentTab === "history"
            ? "bg-[#176CF7] text-white"
            : "bg-white text-[#868686] hover:bg-neutral-50"
        )}
        onClick={() => setCurrentTab("history")}
      >
        <p>Riwayat</p>
      </div>
    </div>
  );
};

export default TabSection;
