import { cn } from "@muatmuat/lib/utils";

import { NotificationDot } from "../NotificationDot";
import { DisplayOptionsBarProps, StatusOption } from "./types";

export const DisplayOptionsBar = ({
  totalCount = 0,
  statusOptions = [],
  currentStatus = null,
  onStatusChange,
  className,
  showAllOption = true,
}: DisplayOptionsBarProps) => {
  const hasStatus = Array.isArray(statusOptions) && statusOptions.length > 0;

  const options: StatusOption[] = hasStatus
    ? showAllOption
      ? [{ value: null, label: `Semua (${totalCount})` }, ...statusOptions]
      : statusOptions
    : showAllOption
      ? [{ value: null, label: `Semua (${totalCount})` }]
      : [];

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <span className="text-xs font-bold">Tampilkan:</span>
      <div className="flex items-center gap-2 text-xxs">
        {options.map((status) => (
          <button
            key={status.value ?? "all"}
            onClick={() => {
              onStatusChange?.(status.value);
            }}
            className={cn(
              "flex h-7 items-center gap-1 rounded-full px-4 font-semibold transition-colors",
              currentStatus === status.value
                ? "border border-primary-700 bg-primary-50 text-primary-700"
                : "border border-neutral-200 bg-neutral-200 hover:bg-neutral-100"
            )}
          >
            {status.label}
            {status.count !== undefined && (
              <span className="relative flex items-center">
                {" "}
                ({status.count})
                {status.hasNotification && (
                  <NotificationDot
                    position="absolute"
                    positionClasses="-right-2.5 top-0"
                    animated={false}
                    size="sm"
                    color="red"
                  />
                )}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};
