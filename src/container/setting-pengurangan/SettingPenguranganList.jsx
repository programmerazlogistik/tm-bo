import { useRouter } from "next/navigation";

import { Modal, ModalContent } from "@muatmuat/ui/Modal";
import { DataTableBO, TableBO } from "@muatmuat/ui/Table";

import ConfirmationModal from "@/components/Modal/ConfirmationModal";
import PageTitle from "@/components/PageTitle/PageTitle";
import Toggle from "@/components/Toggle/Toggle";

export const SettingPenguranganList = ({
  selectedData,
  isDetailLoading,
  formData,
  originalDurasiFitur,
  errorMessage,
  open,
  openConfirmation,
  handleSubmit,
  handleSave,
  handleStatusActiveToggle,
  handleDurasiFiturToggle,
  handlePenguranganKoinChange,
  handleDurasiFiturChange,
  handleModalClose,
  handleConfirmationClose,
  handleConfirmationCancel,
  isUpdating,
  filteredData,
  columns,
  pagination,
  setPagination,
  paginationData,
  inputValue,
  handleSearchChange,
  sorting,
  setSorting,
  isLoading,
}) => {
  const router = useRouter();
  return (
    <>
      <PageTitle
        className="mb-2.5 text-[24px] font-bold text-[#176CF7]"
        appearance={{
          iconClassName: "size-6",
        }}
        onBackClick={() => router.push("/")}
      >
        Setting Pengurangan Koin
      </PageTitle>
      <div className="mt-12">
        <DataTableBO.Root
          data={filteredData}
          columns={columns}
          pagination={pagination}
          onPaginationChange={setPagination}
          paginationData={paginationData}
          inputValue={inputValue}
          onSearchChange={handleSearchChange}
          pageCount={paginationData.totalPages}
          searchTerm={inputValue}
          sorting={sorting}
          onSortingChange={setSorting}
          isLoading={isLoading}
        >
          <DataTableBO.Content Table={TableBO} />
        </DataTableBO.Root>
      </div>
      <Modal open={open} onOpenChange={handleModalClose}>
        <ModalContent className="w-[800px] px-8 py-8">
          <div className="space-y-6">
            {selectedData && (
              <>
                {/* Two-column grid layout */}
                {isDetailLoading ? (
                  <div className="flex h-40 items-center justify-center">
                    <div className="text-center">
                      <div className="inline-block h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-indigo-600"></div>
                      <p className="mt-2 text-gray-600">Memuat data...</p>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-x-12 gap-y-6">
                    {/* Left Column */}
                    <div className="space-y-6">
                      {/* Modul */}
                      <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700/70">
                          Modul
                        </label>
                        <input
                          type="text"
                          value={selectedData?.modul || ""}
                          readOnly
                          className="w-full border-b border-gray-300 bg-transparent pb-2 text-base text-gray-700/70 outline-none"
                        />
                      </div>

                      {/* Status Active with Toggle */}
                      <div>
                        <label className="mb-2 block text-sm font-medium text-gray-500">
                          Status Active
                        </label>
                        <Toggle
                          value={formData.statusActive}
                          onClick={handleStatusActiveToggle}
                        />
                      </div>

                      {/* Durasi Fitur with Toggle */}
                      <div>
                        <label className="mb-2 block text-sm font-medium text-gray-500">
                          Durasi Fitur
                        </label>
                        <Toggle
                          value={formData.durasiFiturActive}
                          onClick={handleDurasiFiturToggle}
                        />
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                      {/* Keterangan */}
                      <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700/70">
                          Keterangan
                        </label>
                        <input
                          type="text"
                          value={selectedData?.keterangan || ""}
                          readOnly
                          className="w-full border-b border-gray-300 bg-transparent pb-2 text-base text-gray-700/70 outline-none"
                        />
                      </div>

                      {/* Pengurangan Poin */}
                      <div>
                        <label className="mb-2 block text-sm font-medium text-gray-500">
                          Pengurangan Poin
                        </label>
                        <input
                          type="number"
                          value={formData.penguranganKoin}
                          onChange={handlePenguranganKoinChange}
                          readOnly={!formData.statusActive}
                          className={`w-full border-b border-gray-300 bg-transparent pb-2 text-base outline-none focus:border-indigo-500 ${
                            formData.statusActive
                              ? "text-gray-700"
                              : "text-gray-400"
                          }`}
                        />
                      </div>

                      {/* Durasi Fitur (menit) */}
                      <div>
                        <label className="mb-2 block text-sm font-medium text-gray-500">
                          Durasi Fitur (menit)
                        </label>
                        <input
                          type="number"
                          value={
                            formData.durasiFiturActive
                              ? formData.durasiFitur
                              : originalDurasiFitur
                          }
                          onChange={handleDurasiFiturChange}
                          placeholder="10"
                          readOnly={!formData.durasiFiturActive}
                          className={`w-full border-b border-gray-300 bg-transparent pb-2 text-base outline-none focus:border-indigo-500 ${
                            formData.durasiFiturActive
                              ? "text-gray-700"
                              : "text-gray-400"
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Error Message Section */}
                {errorMessage && (
                  <div className="flex items-center gap-3 rounded-lg bg-red-50 px-4 py-3">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-red-100">
                      <svg
                        className="h-4 w-4 text-red-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <span className="text-sm text-red-600">{errorMessage}</span>
                  </div>
                )}

                {/* Save Button */}
                <div className="flex justify-end">
                  <button
                    className="rounded-lg bg-indigo-600 px-8 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
                    onClick={handleSubmit}
                    disabled={isUpdating}
                  >
                    {isUpdating ? "Menyimpan..." : "Simpan"}
                  </button>
                </div>
              </>
            )}
          </div>
        </ModalContent>
      </Modal>
      <ConfirmationModal
        isOpen={openConfirmation}
        setIsOpen={handleConfirmationClose}
        title={{ text: "Konfirmasi" }}
        description={{
          text: "Apakah Anda yakin ingin menyesuaikan aturan ini?",
        }}
        cancel={{
          text: "Batal",
          onClick: handleConfirmationCancel,
        }}
        confirm={{ text: "Simpan", onClick: handleSave }}
      />
    </>
  );
};
