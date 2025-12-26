import { Select } from "@muatmuat/ui/Form";

import { FormField } from "./FormField";

/**
 * Select field with form field wrapper
 */
export const SelectField = ({
  label,
  required = false,
  value,
  onChange,
  placeholder,
  options,
}) => {
  return (
    <FormField label={label} required={required}>
      <Select
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        options={options}
        className="w-full"
      />
    </FormField>
  );
};
