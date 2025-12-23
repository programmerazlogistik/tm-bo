import useSWR from "swr";

import { fetcherMuatparts } from "@/lib/axios";

const USE_MOCK = false;

export const mockAPIResult = {
  data: {
    Message: {
      Code: 200,
      Text: "Setting rules berhasil diambil",
    },
    Data: {
      rules: [
        {
          id: "4d495e89-6cea-4c13-8adb-69893fef5c35",
          module: "shipper",
          actionCode: "melihat_contact_transporter_price_list",
          description: "Melihat Contact Transporter (Price List)",
          reductionAmount: 100,
          isUsingDuration: false,
          featureDuration: 0,
          isActive: false,
          isDefault: true,
          updatedBy: null,
        },
        {
          id: "facf1fc8-2dcb-44ec-8f11-be4909ccd1a8",
          module: "shipper",
          actionCode: "melihat_daftar_peserta_lelang",
          description: "Melihat daftar peserta lelang",
          reductionAmount: 50,
          isUsingDuration: true,
          featureDuration: 15,
          isActive: false,
          isDefault: true,
          updatedBy: null,
        },
        {
          id: "50fd9dd5-48e2-4f10-9fce-a084b9af52c2",
          module: "transporter",
          actionCode: "melihat_detail_lelang_dan_kirim_penawaran",
          description: "Melihat detail lelang dan kirim penawaran",
          reductionAmount: 100,
          isUsingDuration: true,
          featureDuration: 10,
          isActive: false,
          isDefault: true,
          updatedBy: null,
        },
        {
          id: "87f3c048-3a91-4a7a-ab0c-e69ae93182b3",
          module: "shipper",
          actionCode: "melihat_profile_transporter_peserta_lelang",
          description: "Melihat Profile Transporter (Peserta Lelang)",
          reductionAmount: 20,
          isUsingDuration: true,
          featureDuration: 5,
          isActive: false,
          isDefault: true,
          updatedBy: null,
        },
        {
          id: "a3f0624d-aa10-4266-badb-95fd12f802c8",
          module: "shipper",
          actionCode: "melihat_contact_transporter_peserta_lelang",
          description: "Melihat Contact Transporter (Peserta Lelang)",
          reductionAmount: 100,
          isUsingDuration: true,
          featureDuration: 5,
          isActive: false,
          isDefault: true,
          updatedBy: null,
        },
        {
          id: "4fc3c985-419e-4091-8c3b-1156eb2d2a15",
          module: "shipper",
          actionCode: "melihat_profile_transporter_price_list",
          description: "Melihat Profile Transporter (Price List)",
          reductionAmount: 30,
          isUsingDuration: true,
          featureDuration: 30,
          isActive: false,
          isDefault: true,
          updatedBy: null,
        },
      ],
      pagination: {
        currentPage: 1,
        totalPages: 1,
        totalCount: 6,
        perPage: 10,
        hasNext: false,
        hasPrev: false,
      },
    },
    Type: "GET_SETTING_RULES_LIST",
  },
};

export const getListRules = async (params) => {
  let response;
  if (USE_MOCK) {
    response = mockAPIResult;
  } else {
    response = await fetcherMuatparts.get(
      "/v1/bo/subscription-tm/settings/rules",
      {
        params,
      }
    );
  }
  return response.data?.Data;
};

export const useGetListRules = (params = {}) => {
  const key = params ? `list-rules-${JSON.stringify(params)}` : "list-rules";

  const { data, error, isLoading, mutate } = useSWR(
    key,
    () => getListRules(params),
    {
      revalidateOnFocus: false,
    }
  );

  return { data, error, isLoading, mutate };
};
