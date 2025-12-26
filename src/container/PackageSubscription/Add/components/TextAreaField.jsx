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
      />
    </FormField>
  );
};
