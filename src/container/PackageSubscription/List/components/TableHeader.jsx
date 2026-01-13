import { Button } from "@muatmuat/ui/Button";
import { Input } from "@muatmuat/ui/Form";

/**
 * Table header with search and add button
 */
const TableHeader = ({ inputValue, onSearchChange, onKeyPress, onAdd }) => {
  return (
    <div className="flex w-full justify-between">
      <div className="flex items-center gap-3">
        <span className="text-xs font-normal text-[#1B1B1B]">Pencarian :</span>
        <Input
          value={inputValue}
          onChange={(e) => onSearchChange(e.target.value)}
          onKeyPress={onKeyPress}
          placeholder="Cari Paket"
          className="h-8 w-[232px]"
          appearance={{
            containerClassName: "h-8 rounded-[6px] border-[#A8A8A8]",
            inputClassName: "text-xs",
          }}
          withReset
        />
      </div>
      <Button
        variant="muatparts-primary"
        className="h-8 rounded-[20px] bg-[#176CF7] text-sm font-semibold text-white"
        onClick={onAdd}
      >
        + Buat Paket
      </Button>
    </div>
  );
};

export default TableHeader;
