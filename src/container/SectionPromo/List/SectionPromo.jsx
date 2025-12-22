"use client";

import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";

import { Button } from "@muatmuat/ui/Button";
import { Input } from "@muatmuat/ui/Form";
import { LoadingStatic } from "@muatmuat/ui/Loading";
import { ConfirmationModal } from "@muatmuat/ui/Modal";
import { NotificationDot } from "@muatmuat/ui/NotificationDot";
import { DataTableBO, TableBO, useDataTable } from "@muatmuat/ui/Table";
import { toast } from "@muatmuat/ui/Toaster";

import { useGetActiveLanguage } from "@/services/cms-homepage/common/useGetActiveLanguage";
import { useGetActiveUserTypes } from "@/services/cms-homepage/common/useGetActiveUserTypes";
import { useDeleteSectionPromo } from "@/services/cms-homepage/section-promo/useDeleteSectionPromo";

import { ActionDropdown } from "@/components/Dropdown/ActionDropdown";
import PageTitle from "@/components/PageTitle/PageTitle";

import ToggleStatus from "./components/ToggleStatus";

// Helper function to strip HTML tags
const stripHtmlTags = (html) => {
  if (!html) return "";
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || div.innerText || "";
};

const SectionPromo = ({
  data,
  isLoading,
  onRefresh,
  onPaginationChange,
  onSearchChange: onSearchChangeProp,
  onSearchSubmit: _onSearchSubmit,
  onKeyPress: onKeyPressProp,
  inputValue: externalInputValue,
  onSortingChange: onSortingChangeProp,
  sorting: externalSorting,
}) => {
  const router = useRouter();
  const { deletePromoSection, isMutating: isDeleting } =
    useDeleteSectionPromo();

  const { data: languagesData } = useGetActiveLanguage();
  const { data: userTypesData } = useGetActiveUserTypes();

  const activeLanguages = useMemo(
    () => languagesData?.Data || [],
    [languagesData]
  );

  const userTypesMap = useMemo(() => {
    if (!userTypesData?.Data) return {};
    return userTypesData.Data.reduce((acc, item) => {
      acc[item.code] = item.description;
      return acc;
    }, {});
  }, [userTypesData]);

  const activeUserTypeCodes = useMemo(() => {
    if (!userTypesData?.Data) return [];
    return userTypesData.Data.filter((item) => item.isActive).map(
      (item) => item.code
    );
  }, [userTypesData]);

  const {
    sorting,
    setSorting,
    pagination,
    setPagination,
    inputValue,
    onSearchChange,
  } = useDataTable();

  const [modalState, setModalState] = useState({
    isOpen: false,
    type: null,
    promo: null,
  });

  const tableData = useMemo(() => {
    return data?.promos || [];
  }, [data]);

  const paginationData = useMemo(() => data?.pagination, [data]);
  const pageCount = useMemo(() => data?.pagination?.totalPages ?? -1, [data]);

  const openConfirmationModal = useCallback((type, promo) => {
    setModalState({ isOpen: true, type, promo });
  }, []);

  const closeConfirmationModal = useCallback(() => {
    setModalState({ isOpen: false, type: null, promo: null });
  }, []);

  const handleEdit = useCallback(
    (promo) => {
      router.push(`/cms-homepage/section-promo/edit/${promo.id}`);
    },
    [router]
  );

  const handleDetail = useCallback(
    (promo) => {
      router.push(`/cms-homepage/section-promo/detail/${promo.id}`);
    },
    [router]
  );

  const handleAdd = useCallback(() => {
    router.push("/cms-homepage/section-promo/add");
  }, [router]);

  const handleDeletePromo = useCallback(async () => {
    if (modalState.promo && modalState.type === "delete") {
      try {
        await deletePromoSection(modalState.promo.id);

        toast.success("Berhasil menghapus promo");

        // Refresh the data
        if (onRefresh) onRefresh();
      } catch (error) {
        toast.error(
          error?.response?.data?.Message?.Text || `Gagal menghapus promo`
        );
      }
    }
    closeConfirmationModal();
  }, [modalState, closeConfirmationModal, onRefresh, deletePromoSection]);

  const columns = useMemo(() => {
    const baseColumns = [
      {
        id: "actions",
        header: "Action",
        enableSorting: false,
        size: 85,
        cell: ({ row }) => {
          const promo = row.original;

          const actions = [
            {
              title: "Detail",
              onClick: () => handleDetail(promo),
            },
            {
              title: "Ubah",
              onClick: () => handleEdit(promo),
            },
            {
              title: "Hapus",
              onClick: () => openConfirmationModal("delete", promo),
              className: "text-[#F71717]",
            },
          ];

          // Check if there are any missing translations for active languages
          const hasMissingTranslation = activeLanguages.some((language) => {
            const wording = promo[`wording_${language.url}`];
            const buttonName = promo[`buttonName_${language.url}`];
            return !wording || !buttonName;
          });

          return (
            <div className="relative">
              <ActionDropdown.Root>
                <ActionDropdown.Trigger />
                <ActionDropdown.Content>
                  {actions.map((item) => (
                    <ActionDropdown.Item
                      key={item.title}
                      onClick={item.onClick}
                      className={item.className}
                    >
                      {item.title}
                    </ActionDropdown.Item>
                  ))}
                </ActionDropdown.Content>
              </ActionDropdown.Root>
              {hasMissingTranslation && (
                <NotificationDot
                  size="lg"
                  color="red"
                  animated={true}
                  position="absolute"
                  positionClasses="top-0 right-1"
                />
              )}
            </div>
          );
        },
      },
      {
        id: "status",
        header: "Status",
        enableSorting: false,
        size: 85,
        cell: ({ row }) => {
          const promo = row.original;
          return <ToggleStatus promo={promo} onSuccess={onRefresh} />;
        },
      },
    ];

    // Dynamically generate wording columns for each language
    const wordingColumns = activeLanguages.map((language) => ({
      accessorKey: `wording_${language.url}`,
      header: `Wording(${language.url})`,
      size: 280,
      enableSorting: true,
      cell: ({ row }) => {
        const promo = row.original;
        const value = promo[`wording_${language.url}`];
        const cleanValue = value ? stripHtmlTags(value) : "";
        return (
          <div className="max-w-[280px] truncate text-xs font-normal leading-[18px] text-[#1B1B1B]">
            {cleanValue ? cleanValue : <span className="italic">Kosong</span>}
          </div>
        );
      },
    }));

    // Dynamically generate button name columns for each language
    const buttonColumns = activeLanguages.map((language) => ({
      accessorKey: `buttonName_${language.url}`,
      header: `Nama Tombol(${language.url})`,
      size: 150,
      enableSorting: true,
      cell: ({ row }) => {
        const value = row.original[`buttonName_${language.url}`];
        return (
          <div className="text-xs font-normal leading-[18px] text-[#1B1B1B]">
            {value ? value : <span className="italic">Kosong</span>}
          </div>
        );
      },
    }));

    const endColumns = [
      {
        accessorKey: "urlRedirect",
        header: "Url Redirect",
        size: 150,
        enableSorting: false,
        cell: ({ row }) => {
          const promo = row.original;
          return promo.urlRedirect ? (
            <a
              href={promo.urlRedirect}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-normal leading-[18px] text-[#176CF7] underline hover:text-[#1557c7]"
            >
              {promo.urlRedirect}
            </a>
          ) : (
            <span className="text-xs font-normal leading-none text-[#868686]">
              -
            </span>
          );
        },
      },
      {
        accessorKey: "tipe",
        header: "Tipe",
        size: 250,
        enableSorting: true,
      },
      {
        accessorKey: "pengguna",
        header: "Pengguna",
        size: 150,
        enableSorting: false,
        cell: ({ row }) => {
          const promo = row.original;

          // Get user type codes from translations
          const userTypeCodes = new Set();
          if (promo._translations && Array.isArray(promo._translations)) {
            promo._translations.forEach((trans) => {
              if (trans.userTypeCodes && Array.isArray(trans.userTypeCodes)) {
                trans.userTypeCodes.forEach((code) => userTypeCodes.add(code));
              }
            });
          }

          const userTypeCodesArray = Array.from(userTypeCodes);

          // Check if all active user types are selected
          const allActiveSelected =
            activeUserTypeCodes.length > 0 &&
            userTypeCodesArray.length === activeUserTypeCodes.length &&
            activeUserTypeCodes.every((code) =>
              userTypeCodesArray.includes(code)
            );

          if (allActiveSelected) {
            return (
              <div className="text-xs font-normal leading-[18px] text-[#1B1B1B]">
                Semua Pengguna
              </div>
            );
          }

          // Map codes to descriptions
          const descriptions = userTypeCodesArray
            .map((code) => userTypesMap[code] || code)
            .join(", ");

          return (
            <div className="text-xs font-normal leading-[18px] text-[#1B1B1B]">
              {descriptions || <span className="text-[#868686]">-</span>}
            </div>
          );
        },
      },
      {
        accessorKey: "masaBerlaku",
        header: "Masa Berlaku",
        size: 200,
        enableSorting: true,
      },
    ];

    // Combine all columns
    return [...baseColumns, ...wordingColumns, ...buttonColumns, ...endColumns];
  }, [
    handleDetail,
    handleEdit,
    openConfirmationModal,
    onRefresh,
    activeLanguages,
    userTypesMap,
    activeUserTypeCodes,
  ]);

  return (
    <div>
      <PageTitle
        className="mb-2.5 text-[24px] font-bold text-[#176CF7]"
        appearance={{
          iconClassName: "size-6",
        }}
      >
        Promo Subscribe
      </PageTitle>

      <DataTableBO.Root
        columns={columns}
        data={tableData}
        pageCount={pageCount}
        paginationData={paginationData}
        pagination={pagination}
        onPaginationChange={onPaginationChange || setPagination}
        sorting={externalSorting !== undefined ? externalSorting : sorting}
        onSortingChange={(updater) => {
          if (onSortingChangeProp) {
            onSortingChangeProp(updater);
          } else {
            setSorting(updater);
          }
        }}
        inputValue={inputValue}
        onSearchChange={(value) => {
          onSearchChange(value);
          if (onSearchChangeProp) {
            onSearchChangeProp(value);
          }
        }}
      >
        <DataTableBO.Header>
          <div className="flex w-full justify-between">
            <Input
              value={
                externalInputValue !== undefined
                  ? externalInputValue
                  : inputValue
              }
              onChange={(e) => {
                const value = e.target.value;
                if (onSearchChangeProp) {
                  onSearchChangeProp(value);
                } else {
                  onSearchChange(value);
                }
              }}
              onKeyPress={(e) => {
                if (onKeyPressProp) {
                  onKeyPressProp(e);
                }
              }}
              placeholder="Cari Promo Subscribe"
              className="h-8 w-[350px]"
              appearance={{
                containerClassName: "h-8 rounded-[6px] border-[#A8A8A8]",
                inputClassName: "text-xs",
              }}
              withReset
            />
            <Button
              variant="muatparts-primary"
              className="h-8 rounded-[20px] bg-[#176CF7] text-sm font-semibold text-white"
              onClick={handleAdd}
            >
              + Tambah Promo Subscribe
            </Button>
          </div>
        </DataTableBO.Header>

        {isLoading ? (
          <div className="flex h-64 items-center justify-center">
            <LoadingStatic />
          </div>
        ) : (
          <DataTableBO.Content Table={TableBO} />
        )}
        {!isLoading && <DataTableBO.Pagination />}
      </DataTableBO.Root>

      {/* Konfirmasi Hapus */}
      <ConfirmationModal
        isOpen={modalState.isOpen && modalState.type === "delete"}
        setIsOpen={closeConfirmationModal}
        variant="bo"
        title={{
          text: "Pemberitahuan",
        }}
        description={{
          text: modalState.promo
            ? `Apakah Anda yakin ingin menghapus promo ini?`
            : "Apakah Anda yakin ingin menghapus Promo?",
        }}
        cancel={{
          text: "Batal",
        }}
        confirm={{
          text: isDeleting ? "Menghapus..." : "Simpan",
          onClick: handleDeletePromo,
        }}
        disabled={isDeleting}
      />
    </div>
  );
};

export default SectionPromo;
