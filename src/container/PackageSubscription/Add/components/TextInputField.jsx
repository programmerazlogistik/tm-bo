import { Input } from "@muatmuat/ui/Form";

import { FormField } from "./FormField";

/**
 * Text input field with form field wrapper
 */
export const TextInputField = ({
  label,
  required = false,
  value,
  onChange,
  placeholder,
  disabled = false,
  maxLength,
  errorMessage,
}) => {
  // 26. 03 - TM - LB - 0009
  // 26. 03 - TM - LB - 0012
  return (
    <FormField label={label} required={required}>
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full"
        disabled={disabled}
        appearance={{
          inputClassName: "text-sm",
        }}
        maxLength={maxLength}
        errorMessage={errorMessage}
      />
      {maxLength && (
        <div className="mt-1 flex justify-end">
          <p className="text-xs">
            {value.length}/{maxLength}
          </p>
        </div>
      )}
    </FormField>
  );
};
