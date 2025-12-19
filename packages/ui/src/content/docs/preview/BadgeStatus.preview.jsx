"use client";

import { BadgeStatus } from "@muatmuat/ui/Badge";

export function BadgeStatusPreview() {
  return (
    <div className="flex flex-wrap gap-3">
      <BadgeStatus variant="primary">Primary</BadgeStatus>
      <BadgeStatus variant="success">Success</BadgeStatus>
      <BadgeStatus variant="warning">Warning</BadgeStatus>
      <BadgeStatus variant="error">Error</BadgeStatus>
      <BadgeStatus variant="neutral">Neutral</BadgeStatus>
      <BadgeStatus variant="outlineSecondary">Outline</BadgeStatus>
      <BadgeStatus variant="outlineWarning">Outline Warning</BadgeStatus>
    </div>
  );
}
