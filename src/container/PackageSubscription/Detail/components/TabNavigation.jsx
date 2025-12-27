const TAB_OPTIONS = [
  { value: "home", label: "Utama" },
  { value: "riwayat", label: "Riwayat" },
];

/**
 * Tab navigation component for Detail page
 */
export const TabNavigation = ({ activeTab, onTabChange }) => {
  return (
    <div
      className="flex"
      style={{ filter: "drop-shadow(1px 2px 4px rgba(0, 0, 0, 0.11))" }}
    >
      {TAB_OPTIONS.map((tab, index) => (
        <button
          key={tab.value}
          className={`flex h-7 w-[100px] items-center justify-center border border-[#A8A8A8] px-3 py-2 text-center text-xs font-semibold leading-[14px] text-[#1B1B1B] ${
            activeTab === tab.value ? "bg-[#A8A8A8]" : "bg-white"
          } ${index === 0 ? "rounded-l-[4px] border-r-0" : "rounded-r-[4px]"}`}
          onClick={() => onTabChange(tab.value)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};
