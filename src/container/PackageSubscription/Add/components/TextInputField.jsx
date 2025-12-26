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
}) => {
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
      />
    </FormField>
  );
};
