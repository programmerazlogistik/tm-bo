import { cn } from "@muatmuat/lib/utils";

const TabSection = ({ currentTab, setCurrentTab }) => {
  // 26. 03 - TM - LB - 0033
  return (
    <div className="my-4 ml-auto flex w-fit cursor-pointer overflow-hidden rounded-[6px] border border-[#A8A8A8] text-sm font-semibold">
      <div
        className={cn(
          "flex h-8 w-full items-center justify-center px-8 transition-colors",
          currentTab === "main"
            ? "bg-neutral-400 text-gray-900"
            : "bg-white text-[#868686] hover:bg-neutral-50"
        )}
        onClick={() => setCurrentTab("main")}
      >
        <p>Utama</p>
      </div>
      <div
        className={cn(
          "flex h-8 w-full items-center justify-center px-8 transition-colors",
          currentTab === "history"
            ? "bg-neutral-400 text-gray-900"
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
