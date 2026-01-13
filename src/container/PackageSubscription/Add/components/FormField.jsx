/**
 * Reusable form field wrapper component
 */
export const FormField = ({ label, required = false, children }) => {
  return (
    <div className="mb-6 flex items-start gap-6">
      <label className="w-[200px] pt-2 text-sm font-semibold text-[#868686]">
        {label}
        {required && "*"}
      </label>
      <div className="flex-1">{children}</div>
    </div>
  );
};
