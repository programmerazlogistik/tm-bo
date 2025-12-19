"use client";

import { Alert } from "@muatmuat/ui/Alert";

export function AlertPreview() {
  return (
    <div className="space-y-4">
      <Alert variant="warning">
        Please review your information before proceeding.
      </Alert>

      <Alert variant="secondary">
        Your changes have been saved successfully.
      </Alert>

      <Alert variant="error">Failed to save changes. Please try again.</Alert>
    </div>
  );
}
