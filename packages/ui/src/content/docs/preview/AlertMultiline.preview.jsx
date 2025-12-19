"use client";

import { AlertMultiline } from "@muatmuat/ui/Alert";

export function AlertMultilinePreview() {
  const items = [
    {
      label: "Your account requires email verification.",
      link: {
        label: "Verify now",
        link: "/account/verify",
      },
    },
    {
      label: "Complete your profile to access premium features.",
      button: {
        label: "Complete profile",
        onClick: () => console.log("Navigate to profile"),
      },
    },
    {
      label: "Enable two-factor authentication for security.",
      info: "Two-factor authentication adds an extra layer of security to your account.",
    },
  ];

  return <AlertMultiline items={items} />;
}
