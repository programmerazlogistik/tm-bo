"use client";

import { useRouter } from "next/navigation";

import { ArrowLeft } from "@muatmuat/icons";
import { cn } from "@muatmuat/lib/utils";

const PageTitle = ({
  className,
  href = null,
  children,
  withBack = true,
  onClick = null,
  appearance = {
    iconClassName: "",
  },
  onBackClick = null,
}) => {
  const router = useRouter();

  const handleBackClick = () => {
    if (onClick) {
      onClick();
    } else if (href) {
      router.push(href);
    } else {
      router.back();
    }
  };

  return (
    <div
      className={cn(
        "mb-[10px] flex items-center gap-3 text-xl font-semibold",
        className
      )}
    >
      {withBack && (
        <button
          className={appearance.iconClassName}
          onClick={onBackClick || handleBackClick}
        >
          <ArrowLeft
            className={cn(
              "stroke-[#176CF7] stroke-2 font-bold text-[#176CF7]",
              appearance.iconClassName
            )}
          />
        </button>
      )}
      <h1>{children}</h1>
    </div>
  );
};

export default PageTitle;
