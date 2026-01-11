import { DateTimePickerWeb } from "./DateTimePickerWeb";
import { FormField } from "./FormField";

/**
 * Date time picker field with form field wrapper
 */
export const DateTimeField = ({
  label,
  required = false,
  value,
  onChange,
  placeholder,
}) => {
  // 26. 03 - TM - LB - 0010
  return (
    <FormField label={label} required={required}>
      <div className="[&_span.text-neutral-400]:!text-[#7B7B7B] [&_span]:!text-xs [&_span]:!font-medium [&_span]:!text-black">
        <DateTimePickerWeb
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full"
          dateFormat="dd/MM/yyyy HH:mm"
          minDate={new Date(new Date().setHours(0, 0, 0, 0))}
        />
      </div>
    </FormField>
  );
};
