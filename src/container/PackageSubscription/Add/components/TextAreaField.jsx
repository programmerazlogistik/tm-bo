import { TextArea } from "@muatmuat/ui/Form";

import { FormField } from "./FormField";

/**
 * Text area field with form field wrapper
 */
export const TextAreaField = ({
  label,
  required = false,
  value,
  onChange,
  placeholder,
  rows = 4,
  maxLength,
}) => {
  return (
    <FormField label={label} required={required}>
      <TextArea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full"
        rows={rows}
        appearance={{
          textareaClassName: "text-sm",
        }}
        maxLength={maxLength}
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
