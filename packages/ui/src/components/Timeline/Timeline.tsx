"use client";

import * as React from "react";

import { cn } from "@muatmuat/lib/utils";
import { Slot } from "@radix-ui/react-slot";

// Types
type TimelineContextValue = {
  activeStep: number;
  setActiveStep: (step: number) => void;
  orientation: "horizontal" | "vertical";
};

// Context
const TimelineContext = React.createContext<TimelineContextValue | undefined>(
  undefined
);

const useTimeline = () => {
  const context = React.useContext(TimelineContext);
  if (!context) {
    throw new Error("useTimeline must be used within a Timeline");
  }
  return context;
};

// Timeline Root Component
export interface TimelineProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue?: number;
  value?: number;
  onValueChange?: (value: number) => void;
  orientation?: "horizontal" | "vertical";
}

export const Timeline = React.forwardRef<HTMLDivElement, TimelineProps>(
  (
    {
      defaultValue = 1,
      value,
      onValueChange,
      orientation = "vertical",
      className,
      children,
      ...props
    },
    ref
  ) => {
    const [activeStep, setInternalStep] = React.useState(defaultValue);

    const setActiveStep = React.useCallback(
      (step: number) => {
        if (value === undefined) {
          setInternalStep(step);
        }
        onValueChange?.(step);
      },
      [value, onValueChange]
    );

    const currentStep = value ?? activeStep;

    return (
      <TimelineContext.Provider
        value={{ activeStep: currentStep, setActiveStep, orientation }}
      >
        <div
          ref={ref}
          data-slot="timeline"
          className={cn(
            "group/timeline flex",
            orientation === "horizontal" &&
              "w-full flex-row data-[orientation=horizontal]:w-full data-[orientation=horizontal]:flex-row",
            orientation === "vertical" &&
              "flex-col data-[orientation=vertical]:flex-col",
            className
          )}
          data-orientation={orientation}
          {...props}
        >
          {children}
        </div>
      </TimelineContext.Provider>
    );
  }
);
Timeline.displayName = "Timeline";

// TimelineItem Component
export interface TimelineItemProps
  extends React.HTMLAttributes<HTMLDivElement> {
  step: number;
}

export const TimelineItem = React.forwardRef<HTMLDivElement, TimelineItemProps>(
  ({ step, className, children, ...props }, ref) => {
    const { activeStep, orientation } = useTimeline();
    const isCompleted = step <= activeStep;

    return (
      <div
        ref={ref}
        data-slot="timeline-item"
        className={cn(
          "group/timeline-item relative flex flex-1 flex-col gap-0.5",
          orientation === "horizontal" && ["mt-8", "not-last:pe-8"],
          orientation === "vertical" && ["ms-8", "not-last:pb-12"],
          "has-[+[data-completed]]:[&_[data-slot=timeline-separator]]:bg-primary",
          className
        )}
        data-completed={isCompleted || undefined}
        {...props}
      >
        {children}
      </div>
    );
  }
);
TimelineItem.displayName = "TimelineItem";

// TimelineHeader Component
export interface TimelineHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export const TimelineHeader = React.forwardRef<
  HTMLDivElement,
  TimelineHeaderProps
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-slot="timeline-header"
      className={cn(className)}
      {...props}
    >
      {children}
    </div>
  );
});
TimelineHeader.displayName = "TimelineHeader";

// TimelineSeparator Component
export interface TimelineSeparatorProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export const TimelineSeparator = React.forwardRef<
  HTMLDivElement,
  TimelineSeparatorProps
>(({ className, ...props }, ref) => {
  const { orientation } = useTimeline();

  return (
    <div
      ref={ref}
      data-slot="timeline-separator"
      className={cn(
        "bg-primary/10 absolute self-start group-last/timeline-item:hidden",
        orientation === "horizontal" && [
          "-top-6",
          "h-0.5",
          "w-full border-t-[3px] border-dashed",
          "translate-x-4.5",
          "-translate-y-1/2",
        ],
        orientation === "vertical" && [
          "-left-6",
          "h-full",
          "w-[0px] border-l-[3px] border-dashed",
          "-translate-x-1/2",
          "translate-y-4.5",
        ],
        className
      )}
      aria-hidden="true"
      {...props}
    />
  );
});
TimelineSeparator.displayName = "TimelineSeparator";

// TimelineIndicator Component
export interface TimelineIndicatorProps
  extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
}

export const TimelineIndicator = React.forwardRef<
  HTMLDivElement,
  TimelineIndicatorProps
>(({ asChild = false, className, children, ...props }, ref) => {
  const { orientation } = useTimeline();
  const Comp = asChild ? Slot : "div";

  return (
    <Comp
      ref={ref}
      data-slot="timeline-indicator"
      className={cn(
        "border-primary/20 group-data-completed/timeline-item:border-primary absolute flex size-4 items-center justify-center rounded-full border-[5px]",
        orientation === "horizontal" && [
          "-top-6",
          "left-0",
          "-translate-y-1/2",
        ],
        orientation === "vertical" && ["top-0", "-left-6", "-translate-x-1/2"],
        className
      )}
      aria-hidden="true"
      {...props}
    >
      {children}
    </Comp>
  );
});
TimelineIndicator.displayName = "TimelineIndicator";

// TimelineDate Component
export interface TimelineDateProps
  extends React.HTMLAttributes<HTMLTimeElement> {
  asChild?: boolean;
}

export const TimelineDate = React.forwardRef<
  HTMLTimeElement,
  TimelineDateProps
>(({ asChild = false, className, children, ...props }, ref) => {
  const Comp = asChild ? Slot : "time";

  return (
    <Comp
      ref={ref as any}
      data-slot="timeline-date"
      className={cn(
        "text-muted-foreground mb-1 block text-xs font-medium group-data-[orientation=vertical]/timeline:max-sm:h-4",
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  );
});
TimelineDate.displayName = "TimelineDate";

// TimelineTitle Component
export interface TimelineTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement> {}

export const TimelineTitle = React.forwardRef<
  HTMLHeadingElement,
  TimelineTitleProps
>(({ className, children, ...props }, ref) => {
  return (
    <h3
      ref={ref}
      data-slot="timeline-title"
      className={cn("text-sm font-medium", className)}
      {...props}
    >
      {children}
    </h3>
  );
});
TimelineTitle.displayName = "TimelineTitle";

// TimelineContent Component
export interface TimelineContentProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export const TimelineContent = React.forwardRef<
  HTMLDivElement,
  TimelineContentProps
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-slot="timeline-content"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    >
      {children}
    </div>
  );
});
TimelineContent.displayName = "TimelineContent";
