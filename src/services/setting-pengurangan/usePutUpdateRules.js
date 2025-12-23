import useSWRMutation from "swr/mutation";

import { fetcherMuatparts } from "@/lib/axios";

const USE_MOCK = false;

export const mockAPIResult = {
  data: {
    Message: {
      Code: 200,
      Text: "Setting berhasil diperbarui",
    },
    Data: {
      id: "4d495e89-6cea-4c13-8adb-69893fef5c35",
      module: "shipper",
      actionCode: "melihat_contact_transporter_price_list",
      description: "Melihat Contact Transporter (Price List)",
      reductionAmount: 5,
      isUsingDuration: true,
      featureDuration: 5,
      isActive: false,
      isDefault: true,
      updatedBy: null,
      version: 2,
    },
    Type: "UPDATE_SETTING_RULE",
  },
};

/**
 * Service function to update the rule
 * @param {string} id - The ID of the rule to update
 * @param {Object} body - The payload containing updates (isActive, reductionAmount, etc.)
 */
export const putUpdateRules = async (id, body) => {
  let response;
  if (USE_MOCK) {
    response = mockAPIResult;
  } else {
    response = await fetcherMuatparts.put(
      `/v1/bo/subscription-tm/settings/rules/${id}`,
      body
    );
  }
  return response.data?.Data;
};

/**
 * SWR Mutation Hook for updating rules
 * Usage: const { trigger, isMutating } = usePutUpdateRules();
 * Trigger: trigger({ id: "...", body: { ... } })
 */
export const usePutUpdateRules = () => {
  const key = "/v1/bo/subscription-tm/settings/rules/update"; // Static key for mutation identification

  const { trigger, isMutating, error, data } = useSWRMutation(
    key,
    async (_, { arg }) => {
      const { id, ...body } = arg;
      if (!id) throw new Error("Rule ID is required for update");
      return putUpdateRules(id, body);
    }
  );

  return { trigger, isMutating, error, data };
};
