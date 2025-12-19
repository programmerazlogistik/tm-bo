"use client";

import { Select } from "@muatmuat/ui/Form";

import { tempRoleStore } from "@/store/Shared/tempLogin";

const roleOptions = [
  { value: "admin", label: "Admin" },
  { value: "approver", label: "Approver" },
  { value: "superadmin", label: "Super Admin" },
];

export default function Page() {
  const { role, setRole } = tempRoleStore();

  return (
    <div className="mt-10 flex w-full justify-center">
      <div className="w-full max-w-md space-y-4 rounded-lg border p-6 shadow-sm">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Development Login
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Select a role for development purposes
          </p>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="role-select"
            className="text-sm font-medium text-gray-700"
          >
            User Role
          </label>
          <Select
            id="role-select"
            options={roleOptions}
            value={role}
            onChange={setRole}
            placeholder="Select a role..."
            className="w-full"
          />
        </div>

        <div className="rounded-md bg-blue-50 p-4">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">
                Current Role: {role.toUpperCase()}
              </h3>
              <div className="mt-2 text-sm text-blue-700">
                <p>
                  This role selection is for development only and will not
                  affect production authentication.
                </p>
                <p className="mt-1 text-xs font-medium text-blue-600">
                  🔒 Role is automatically saved and will persist across browser
                  sessions
                </p>
                <div className="mt-2">
                  <p className="font-medium">Permissions:</p>
                  <ul className="mt-1 space-y-1 text-xs">
                    {role === "admin" && (
                      <>
                        <li>✅ Create Promo</li>
                        <li>✅ Edit Promo</li>
                        <li>❌ Approve Promo</li>
                      </>
                    )}
                    {role === "approver" && (
                      <>
                        <li>❌ Create Promo</li>
                        <li>✅ Edit Promo</li>
                        <li>✅ Approve Promo</li>
                      </>
                    )}
                    {role === "superadmin" && (
                      <>
                        <li>✅ Create Promo</li>
                        <li>✅ Edit Promo</li>
                        <li>✅ Approve Promo</li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
