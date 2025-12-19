"use client";

import { useState } from "react";

import { Checkbox } from "@muatmuat/ui/Form";

export function CheckboxPreview() {
  const [terms, setTerms] = useState(false);
  const [newsletter, setNewsletter] = useState(true);
  const [marketing, setMarketing] = useState(false);

  return (
    <div className="space-y-4">
      <div>
        <Checkbox
          label="I agree to the terms and conditions"
          checked={terms}
          onCheckedChange={setTerms}
          variant="blue"
        />
        {!terms && (
          <p className="mt-1 text-xs text-neutral-500">
            You must agree to the terms to continue
          </p>
        )}
      </div>

      <div>
        <Checkbox
          label="Subscribe to our newsletter"
          checked={newsletter}
          onCheckedChange={setNewsletter}
          variant="blue"
        />
        <p className="mt-1 text-xs text-neutral-500">
          Get updates about new features and releases
        </p>
      </div>

      <div>
        <Checkbox
          label="Enable marketing emails"
          checked={marketing}
          onCheckedChange={setMarketing}
          variant="yellow"
        />
        <p className="mt-1 text-xs text-neutral-500">
          Receive special offers and promotions
        </p>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium">Disabled Examples:</p>
        <Checkbox
          label="Disabled checked option"
          checked={true}
          disabled={true}
          variant="blue"
        />
        <Checkbox
          label="Disabled unchecked option"
          checked={false}
          disabled={true}
          variant="yellow"
        />
      </div>
    </div>
  );
}
