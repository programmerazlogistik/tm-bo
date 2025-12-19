"use client";

import { InfoBottomsheet } from "@muatmuat/ui/BottomSheet";

export function InfoBottomsheetPreview() {
  return (
    <div className="space-y-6 p-8">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Info Bottomsheet Examples</h3>

        {/* Text content example */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Account Type</label>
          <div className="flex items-center gap-2">
            <select className="rounded border border-neutral-300 px-3 py-2">
              <option>Personal</option>
              <option>Business</option>
            </select>
            <InfoBottomsheet title="Account Types">
              Choose between Personal and Business accounts. Personal accounts
              are for individual use, while Business accounts provide additional
              features for organizations.
            </InfoBottomsheet>
          </div>
        </div>

        {/* HTML content example */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Security Settings</label>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="2fa"
              className="rounded border-neutral-300"
            />
            <label htmlFor="2fa" className="text-sm">
              Enable Two-Factor Authentication
            </label>
            <InfoBottomsheet
              title="Security Information"
              render={`
<div>
  <h4>Two-Factor Authentication</h4>
  <p>Enable 2FA to add an extra layer of security to your account.</p>
  <ul>
    <li><strong>SMS:</strong> Receive codes via text message</li>
    <li><strong>App:</strong> Use authenticator apps like Google Authenticator</li>
    <li><strong>Hardware:</strong> Use security keys for maximum protection</li>
  </ul>
</div>
              `}
            />
          </div>
        </div>

        {/* Simple text example */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Help</label>
          <InfoBottomsheet title="Quick Help">
            This is a brief informational message that provides help and
            guidance for using this feature effectively.
          </InfoBottomsheet>
        </div>
      </div>
    </div>
  );
}
