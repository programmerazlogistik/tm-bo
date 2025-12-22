import { cn } from "@muatmuat/lib/utils";

const TabSection = ({ currentTab, setCurrentTab }) => {
  return (
    <div className="my-4 grid w-max cursor-pointer grid-cols-[124_124] overflow-hidden rounded-md border-2 text-xs font-semibold">
      <div
        className={cn(
          "flex w-full items-center justify-center border-r-2 py-2",
          currentTab === "main"
            ? "bg-primary-700 text-white"
            : "border-gray-300 text-gray-500"
        )}
        onClick={() => setCurrentTab("main")}
      >
        <p>Utama</p>
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
