"use client";

import { useState } from "react";

import { Button } from "@muatmuat/ui/Button";

export function ButtonPreview() {
  const [isDisabled, setIsDisabled] = useState(false);
  const [keepStyle, setKeepStyle] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-4">
        <label className="text-sm font-medium">
          <input
            type="checkbox"
            checked={isDisabled}
            onChange={(e) => setIsDisabled(e.target.checked)}
            className="mr-2"
          />
          Disable All
        </label>

        <label className="text-sm font-medium">
          <input
            type="checkbox"
            checked={keepStyle}
            onChange={(e) => setKeepStyle(e.target.checked)}
            className="mr-2"
            disabled={!isDisabled}
          />
          Keep Disabled Style
        </label>
      </div>

      <div className="space-y-4">
        <div>
          <h4 className="mb-3 text-sm font-semibold text-gray-700">
            MuatTrans Variants
          </h4>
          <div className="flex flex-wrap gap-3">
            <Button
              variant="muattrans-primary"
              disabled={isDisabled}
              keepDisabledStyle={isDisabled && keepStyle}
            >
              Primary
            </Button>
            <Button
              variant="muattrans-outline-primary"
              disabled={isDisabled}
              keepDisabledStyle={isDisabled && keepStyle}
            >
              Outline Primary
            </Button>
            <Button
              variant="muattrans-primary-secondary"
              disabled={isDisabled}
              keepDisabledStyle={isDisabled && keepStyle}
            >
              Secondary
            </Button>
            <Button
              variant="muattrans-error"
              disabled={isDisabled}
              keepDisabledStyle={isDisabled && keepStyle}
            >
              Error
            </Button>
            <Button
              variant="muattrans-error-secondary"
              disabled={isDisabled}
              keepDisabledStyle={isDisabled && keepStyle}
            >
              Error Secondary
            </Button>
            <Button
              variant="muattrans-warning"
              disabled={isDisabled}
              keepDisabledStyle={isDisabled && keepStyle}
            >
              Warning
            </Button>
          </div>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold text-gray-700">
            MuatParts Variants
          </h4>
          <div className="flex flex-wrap gap-3">
            <Button
              variant="muatparts-primary"
              disabled={isDisabled}
              keepDisabledStyle={isDisabled && keepStyle}
            >
              Primary
            </Button>
            <Button
              variant="muatparts-primary-secondary"
              disabled={isDisabled}
              keepDisabledStyle={isDisabled && keepStyle}
            >
              Secondary
            </Button>
            <Button
              variant="muatparts-error"
              disabled={isDisabled}
              keepDisabledStyle={isDisabled && keepStyle}
            >
              Error
            </Button>
            <Button
              variant="muatparts-error-secondary"
              disabled={isDisabled}
              keepDisabledStyle={isDisabled && keepStyle}
            >
              Error Secondary
            </Button>
            <Button
              variant="muatparts-warning"
              disabled={isDisabled}
              keepDisabledStyle={isDisabled && keepStyle}
            >
              Warning
            </Button>
          </div>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold text-gray-700">
            Buttons with Icons
          </h4>
          <div className="flex flex-wrap gap-3">
            <Button
              iconLeft="/icons/add.svg"
              disabled={isDisabled}
              keepDisabledStyle={isDisabled && keepStyle}
            >
              Add Item
            </Button>
            <Button
              variant="muattrans-error"
              iconLeft="/icons/trash.svg"
              disabled={isDisabled}
              keepDisabledStyle={isDisabled && keepStyle}
            >
              Delete
            </Button>
            <Button
              variant="muatparts-primary"
              iconRight="/icons/arrow-right.svg"
              disabled={isDisabled}
              keepDisabledStyle={isDisabled && keepStyle}
            >
              Continue
            </Button>
            <Button
              variant="link"
              iconLeft="/icons/arrow-left.svg"
              disabled={isDisabled}
              keepDisabledStyle={isDisabled && keepStyle}
            >
              Go Back
            </Button>
          </div>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold text-gray-700">
            Interactive Actions
          </h4>
          <div className="flex flex-wrap gap-3">
            <Button
              onClick={() => alert("Form submitted!")}
              disabled={isDisabled}
              keepDisabledStyle={isDisabled && keepStyle}
            >
              Submit Form
            </Button>
            <Button
              variant="muattrans-error"
              onClick={() => alert("Item deleted!")}
              disabled={isDisabled}
              keepDisabledStyle={isDisabled && keepStyle}
            >
              Delete Item
            </Button>
            <Button
              variant="muattrans-warning"
              onClick={() => alert("Proceeding with caution!")}
              disabled={isDisabled}
              keepDisabledStyle={isDisabled && keepStyle}
            >
              Proceed Anyway
            </Button>
          </div>
        </div>
      </div>

      <p className="text-sm text-gray-600">
        Toggle the disable checkbox to see disabled states. Enable "Keep
        Disabled Style" to maintain visual variants while keeping disabled
        behavior.
      </p>
    </div>
  );
}
