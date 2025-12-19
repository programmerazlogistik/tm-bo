import { useState } from "react";

import { useDevice } from "@muatmuat/hooks/use-device";
import { cn } from "@muatmuat/lib/utils";

import { type TranslationFunction, tMockFn } from "../../lib/mock-t";
import { IconComponent } from "../IconComponent";

export type RatingValue = 0 | 1 | 2 | 3 | 4 | 5;

export interface RatingInputProps
  extends Omit<
    React.ButtonHTMLAttributes<HTMLDivElement>,
    "onChange" | "value"
  > {
  t?: TranslationFunction;
  value?: RatingValue;
  onChange?: (rating: RatingValue) => void;
  disabled?: boolean;
  withLabel?: boolean;
}

const LENGTH = [1, 2, 3, 4, 5];

const RatingInput = ({
  t = tMockFn,
  value = 0,
  onChange,
  disabled = false,
  withLabel = true,
}: RatingInputProps) => {
  const { isMobile } = useDevice();
  const [hover, setHover] = useState<RatingValue>(0);

  const getRatingLabel = (score: RatingValue): string => {
    switch (score) {
      case 1:
        return t("labelSangatBuruk");
      case 2:
        return t("labelBuruk");
      case 3:
        return t("labelCukup");
      case 4:
        return t("labelBaik");
      case 5:
        return t("labelSangatBaik");
      default:
        return "";
    }
  };

  const handleStarClick = (rating: RatingValue) => {
    if (!disabled && onChange) {
      onChange(rating);
    }
  };

  const handleMouseEnter = (rating: RatingValue) => {
    if (!disabled) {
      setHover(rating as RatingValue);
    }
  };

  const handleMouseLeave = () => {
    if (!disabled) {
      setHover(0);
    }
  };

  return (
    <div className="flex items-center gap-4 md:gap-1">
      <div className="flex items-center [&>*+*]:pl-1">
        {LENGTH.map((starValue) => (
          <button
            type="button"
            key={starValue}
            disabled={disabled}
            onClick={() => handleStarClick(starValue as RatingValue)}
            onMouseEnter={() => handleMouseEnter(starValue as RatingValue)}
            onMouseLeave={handleMouseLeave}
            className="disabled:cursor-not-allowed"
            aria-label={`Rate ${starValue} out of 5 stars`}
          >
            <IconComponent
              className={cn(
                "transition-colors duration-200",
                (hover || value) >= starValue
                  ? "text-secondary-700"
                  : isMobile
                    ? "text-neutral-700"
                    : "text-neutral-400"
              )}
              src={
                isMobile && (hover || value) < starValue
                  ? "/icons/bintang-outline24.svg"
                  : "/icons/bintang-solid24.svg"
              }
              size="medium"
            />
          </button>
        ))}
      </div>
      {withLabel && value > 0 && (
        <span className="text-xs font-semibold leading-[14.4px] text-neutral-900">
          {getRatingLabel(value as RatingValue)}
        </span>
      )}
    </div>
  );
};

export { RatingInput };
