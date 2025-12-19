import React from "react";

import { cn } from "@muatmuat/lib/utils";
import { X } from "lucide-react";

interface TagBubbleRemoveConfig {
  onRemove?: () => void;
}

interface TagBubbleProps {
  disabled?: boolean;
  className?: string;
  withRemove?: TagBubbleRemoveConfig | null;
  children: React.ReactNode;
}

export const TagBubble: React.FC<TagBubbleProps> = ({
  disabled = false,
  className = "",
  withRemove = null,
  children,
}) => {
  return (
    <div
      className={cn(
        // 25. 18 - Web - LB - 0316
        "group box-border flex h-[30px] max-w-[204px] flex-row items-center gap-1 rounded-2xl border border-primary-700 bg-white px-3 py-1.5 text-primary-700 transition-colors duration-150 hover:bg-blue-50 md:h-7",
        className
      )}
    >
      {/* 25. 18 - Web - LB - 0316 */}
      <span className="leading-[1.1 ] flex-1 truncate text-sm font-medium md:text-xxs md:font-semibold md:leading-[13px]">
        {children}
      </span>
      {withRemove && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            withRemove?.onRemove?.();
          }}
          disabled={disabled}
          className={cn(
            "flex h-3.5 w-3.5 items-center justify-center rounded-full text-primary-700 transition-colors duration-150 hover:bg-primary-700 hover:text-white focus:outline-none focus:ring-1 focus:ring-primary-700 disabled:cursor-not-allowed"
          )}
        >
          <X size={14} strokeWidth={2.5} />
        </button>
      )}
    </div>
  );
};
