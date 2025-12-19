import useSWR from "swr";

import { fetcherMPPInter } from "@/lib/axios";
import { DeepPartial } from "@/lib/typescript-utils";

const USE_MOCK = false;

// Development mode flag - check if we're in development environment

export type Role = "superadmin" | "admin" | "approver";
// Role priority order from highest to lowest
const ROLE_PRIORITY = ["superadmin", "approver", "admin"] as const;

export const mockAPIResult = {
  Message: {
    Code: 200,
    Text: "User profile retrieved successfully",
  },
  Data: {
    adminId: "100",
    name: "Berliana (Approver)",
    email: "berliana_approver@az.com",
    isActive: false,
    hasApprovalPermission: false,
    permissions: {
      canCreatePromo: true,
      canEditPromo: true,
      canApprovePromo: false,
      canViewAllSubmissions: false,
      role: ["admin"],
      levelHakAkses: [
        {
          module: "vendor international",
          Title: "View",
          Value: "VIVI",
        },
        {
          module: "vendor international",
          Title: "Create",
          Value: "VICR",
        },
        {
          module: "vendor international",
          Title: "Edit",
          Value: "VIED",
        },
        // {
        //   module: "vendor international",
        //   Title: "Approve",
        //   Value: "VIAPR",
        // },
        {
          module: "vendor international",
          Title: "View Data Sensitive",
          Value: "VIVDS",
        },
        {
          module: "vendor domestik",
          Title: "View",
          Value: "VDVI",
        },
        {
          module: "vendor domestik",
          Title: "Create",
          Value: "VDCR",
        },
        {
          module: "vendor domestik",
          Title: "Edit",
          Value: "VDED",
        },
        {
          module: "vendor domestik",
          Title: "Approve",
          Value: "VDAPR",
        },
        {
          module: "vendor domestik",
          Title: "View Data Sensitive",
          Value: "VDVDS",
        },
      ],
    },
  },
  Type: "GET_USER_PROFILE",
};

type Data = (typeof mockAPIResult)["Data"];

// Define the raw permissions type with role as string array
type RawPermissions = Data["permissions"];

// Define the processed permissions type with role as single Role
type ProcessedPermissions = Omit<RawPermissions, "role"> & {
  role: Role;
};

// Define boolean permissions interface
interface BooleanPermissions {
  VENDOR_INTERNASIONAL: {
    VIEW: boolean;
    CREATE: boolean;
    EDIT: boolean;
    APPROVE: boolean;
    VIEW_DATA_SENSITIVE: boolean;
  };
  VENDOR_DOMESTIK: {
    VIEW: boolean;
    CREATE: boolean;
    EDIT: boolean;
    APPROVE: boolean;
    VIEW_DATA_SENSITIVE: boolean;
  };
}

// Define the full profile data type with processed permissions
type ProfileDataWithRole = Omit<Data, "permissions"> & {
  permissions: ProcessedPermissions & {
    booleanPermissions: BooleanPermissions;
  };
};

export type ProfileDataType = DeepPartial<ProfileDataWithRole>;

const getHighestPriorityRole = (roles: string[]): Role => {
  for (const role of ROLE_PRIORITY) {
    if (roles.includes(role)) {
      return role;
    }
  }
  // Fallback to admin if no recognized roles found
  return ROLE_PRIORITY[ROLE_PRIORITY.length - 1];
};

// Permission parser function to convert levelHakAkses codes to boolean permissions
const parsePermissions = (
  levelHakAkses: Array<{ module: string; Title: string; Value: string }>
): BooleanPermissions => {
  const permissions: BooleanPermissions = {
    VENDOR_INTERNASIONAL: {
      VIEW: false,
      CREATE: false,
      EDIT: false,
      APPROVE: false,
      VIEW_DATA_SENSITIVE: false,
    },
    VENDOR_DOMESTIK: {
      VIEW: false,
      CREATE: false,
      EDIT: false,
      APPROVE: false,
      VIEW_DATA_SENSITIVE: false,
    },
  };

  levelHakAkses.forEach(({ module, Value }) => {
    const key =
      module === "vendor international"
        ? "VENDOR_INTERNASIONAL"
        : "VENDOR_DOMESTIK";

    switch (Value) {
      case "VIVI":
      case "VDVI":
        permissions[key].VIEW = true;
        break;
      case "VICR":
      case "VDCR":
        permissions[key].CREATE = true;
        break;
      case "VIED":
      case "VDED":
        permissions[key].EDIT = true;
        break;
      case "VIAPR":
      case "VDAPR":
        permissions[key].APPROVE = true;
        break;
      case "VIVDS":
      case "VDVDS":
        permissions[key].VIEW_DATA_SENSITIVE = true;
        break;
    }
  });

  return permissions;
};

export const getProfile = async (): Promise<ProfileDataType> => {
  let profileData: any;

  if (USE_MOCK) {
    profileData = mockAPIResult?.Data;
  } else {
    const response = await fetcherMPPInter.get("/v1/bo/auth/profile");
    profileData = response.data?.Data;
  }

  // Process roles to return only the highest priority role and parse permissions
  if (
    profileData?.permissions?.role &&
    Array.isArray(profileData.permissions.role)
  ) {
    const processedProfile: ProfileDataWithRole = {
      ...profileData,
      permissions: {
        ...profileData.permissions,
        role: getHighestPriorityRole(profileData.permissions.role),
        booleanPermissions: parsePermissions(
          profileData.permissions.levelHakAkses || []
        ),
      },
    };
    return processedProfile as ProfileDataType;
  }

  return profileData as ProfileDataType;
};

/**
 * SWR hook for fetching the seller profile.
 * In development mode, this will automatically use the temporary role if set.
 */
export const useGetProfile = () => {
  const { data, error, isLoading, mutate } = useSWR("profile", getProfile);

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};
