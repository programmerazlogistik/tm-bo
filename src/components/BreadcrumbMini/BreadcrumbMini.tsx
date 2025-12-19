import { Fragment } from "react";

import { cn } from "@muatmuat/lib/utils";
import { IconComponent } from "@muatmuat/ui/IconComponent";

// TypeScript interfaces
interface BreadcrumbItem {
  text: string;
  active: boolean;
}

interface BreadcrumbMiniProps {
  data?: BreadcrumbItem[];
  setStep: (step: number) => void;
  left?: React.ReactNode;
  right?: React.ReactNode;
}

export const BreadcrumbMini = ({
  data = [],
  setStep,
  left,
  right,
}: BreadcrumbMiniProps) => {
  return (
    <div className="relative flex min-h-8 w-full items-center justify-between px-[25px]">
      <div className="">{left}</div>
      <div className="absolute left-1/2 flex -translate-x-1/2 items-center gap-[5px]">
        {data?.map((item, index) => (
          <Fragment key={item?.text}>
            <span
              onClick={() => setStep(index + 1)}
              className={cn(
                "cursor-pointer text-[12px] font-semibold text-[#868686]",
                item?.active && "text-[#176CF7]"
              )}
            >
              {item?.text}
            </span>

            {index < data?.length - 1 && (
              <IconComponent
                src="/icons/chevron-right.svg"
                className="h-4 w-4 text-[#868686]"
                alt="chevron icon"
              />
            )}
          </Fragment>
        ))}
      </div>
      <div className="">{right}</div>
    </div>
  );
};
