import useSWR from "swr";

import { fetcherMuatparts } from "@/lib/axios";

const USE_MOCK = false;

export const mockAPIResult = {
  data: {
    Message: {
      Code: 200,
      Text: "Detail setting rule berhasil diambil",
    },
    Data: {
      id: "4d495e89-6cea-4c13-8adb-69893fef5c35",
      module: "shipper",
      actionCode: "melihat_contact_transporter_price_list",
      description: "Melihat Contact Transporter (Price List)",
      reductionAmount: 100,
      isUsingDuration: false,
      featureDuration: 0,
      isActive: false,
      isDefault: true,
      affectedPages: ["Detail Transporter", "Peserta Lelang"],
      updatedBy: null,
      version: 1,
    },
    Type: "GET_SETTING_RULE_DETAIL",
  },
};

export const getDetailRules = async (id) => {
  let response;
  if (USE_MOCK) {
    response = mockAPIResult;
  } else {
    response = await fetcherMuatparts.get(
      `/v1/bo/subscription-tm/settings/rules/${id}`
    );
  }
  return response.data?.Data;
};

export const useGetDetailRules = (id) => {
  // Only fetch if ID is provided
  const key = id ? `detail-rules-${id}` : null;

  const { data, error, isLoading, mutate } = useSWR(
    key,
    () => getDetailRules(id),
    {
      revalidateOnFocus: false,
    }
  );

  return { data, error, isLoading, mutate };
};
