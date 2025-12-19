import { useEffect, useState } from "react";

import { usePrevious } from "@muatmuat/hooks/use-previous";
import { cn } from "@muatmuat/lib/utils";

import { Button } from "../Button";
import { IconComponent } from "../IconComponent";
import { RadioButton } from "../Radio";
import {
  BottomSheet,
  BottomSheetClose,
  BottomSheetContent,
  BottomSheetFooter,
  BottomSheetHeader,
  BottomSheetTitle,
} from "./BottomSheet";

export interface RadioOption {
  label: string;
  value: string;
}

export interface RadioBottomsheetProps {
  className?: string;
  title?: string;
  options?: RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  saveLabel?: string;
  placeHolder?: string;
  disabled?: boolean;
}

export const RadioBottomsheet: React.FC<RadioBottomsheetProps> = ({
  className,
  title,
  options = [],
  value,
  onChange = () => {},
  saveLabel,
  placeHolder,
  disabled,
}) => {
  const [tempValue, setTempValue] = useState("");
  const [isBottomsheetOpen, setIsBottomsheetOpen] = useState(false);
  const previousIsBottomsheetOpen = usePrevious(isBottomsheetOpen);

  useEffect(() => {
    if (isBottomsheetOpen && !previousIsBottomsheetOpen) {
      setTempValue(value || "");
    }
  }, [isBottomsheetOpen, previousIsBottomsheetOpen, value]);

  const handleSelectOption = () => {
    onChange(tempValue);
    setIsBottomsheetOpen(false);
  };

  const selectedItem = options.find((item) => item.value === value);

  return (
    <BottomSheet open={isBottomsheetOpen} onOpenChange={setIsBottomsheetOpen}>
      <button
        className={cn(
          "flex h-8 min-w-[65px] items-center justify-between rounded-md border border-neutral-600 bg-neutral-50 px-2",
          disabled
            ? "cursor-not-allowed border-neutral-600 bg-neutral-200 hover:border-neutral-600"
            : "cursor-pointer",
          className
        )}
        onClick={() => {
          setIsBottomsheetOpen(true);
        }}
        disabled={disabled}
      >
        <span
          className={cn(
            "text-sm font-semibold leading-[15.4px]",
            disabled ? "text-neutral-600" : "text-neutral-900"
          )}
        >
          {selectedItem?.label ?? placeHolder ?? ""}
        </span>
        <IconComponent
          src="/icons/chevron-down.svg"
          className="text-neutral-700"
        />
      </button>
      <BottomSheetContent>
        <BottomSheetHeader>
          <BottomSheetClose />
          <BottomSheetTitle>{title}</BottomSheetTitle>
        </BottomSheetHeader>
        <div className="flex flex-col gap-y-4 px-4">
          {options.map((option, key) => {
            const isLastItem = options.length - 1 === key;
            return (
              <div
                className={`${isLastItem ? "" : "border-b border-b-neutral-400 pb-4"} flex justify-between`}
                key={key}
              >
                <span className="text-sm font-semibold leading-[15.4px] text-neutral-900">
                  {option.label}
                </span>
                <RadioButton
                  name={title}
                  value={option.value}
                  checked={tempValue === option.value}
                  onClick={(data) => setTempValue(data.value)}
                />
              </div>
            );
          })}
        </div>
        <BottomSheetFooter>
          <Button
            className="h-10 w-full"
            variant="muatparts-primary"
            onClick={handleSelectOption}
          >
            {saveLabel}
          </Button>
        </BottomSheetFooter>
      </BottomSheetContent>
    </BottomSheet>
  );
};
