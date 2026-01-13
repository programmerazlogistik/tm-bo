import { InfoTooltip } from "@muatmuat/ui/Tooltip";

import Toggle from "@/components/Toggle/Toggle";

import { FormField } from "./FormField";

/**
 * Toggle field with form field wrapper and optional tooltip
 */
export const ToggleField = ({
  label,
  value,
  onChange,
  disabled = false,
  tooltip,
  additionalInfo,
  textActive,
  textInactive,
}) => {
  return (
    <FormField
      label={
        <div className="flex items-center gap-2">
          {label}
          {tooltip && (
            <InfoTooltip
              side="top"
              icon="/icons/info.svg"
              className="max-w-[336px]"
            >
              <p className="text-center text-xs font-medium text-[#1B1B1B]">
                {tooltip}
              </p>
            </InfoTooltip>
          )}
        </div>
      }
    >
      <div className="flex flex-row items-center justify-start gap-2">
        <Toggle
          value={value}
          onClick={onChange}
          disabled={disabled}
          textActive={textActive}
          textInactive={textInactive}
        />
        {additionalInfo}
      </div>
    </FormField>
  );
};
