"use client";

import * as React from "react";

import { cn } from "@muatmuat/lib/utils";
import { id } from "date-fns/locale";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";
import {
  type ChevronProps,
  DayPicker,
  DayPickerProps,
  type DayProps,
  type WeekNumberProps,
  getDefaultClassNames,
} from "react-day-picker";

import { CalendarProps } from "./types";

const CalendarImplementation = ({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  _buttonVariant = "ghost",
  formatters,
  components,
  minDate,
  maxDate,
  onChange,
  onSelect,
  ...props
}: CalendarProps) => {
  const defaultClassNames = getDefaultClassNames();

  return (
    <DayPicker
      locale={id}
      showOutsideDays={showOutsideDays}
      className={cn(
        // Layout and sizing
        "group/calendar w-full max-w-[280px] overflow-x-auto",
        // Background and spacing
        "bg-neutral-50 p-3",
        // CSS custom properties
        "[--cell-size:2rem]",
        // Context-specific styling
        "[[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent",
        // RTL support
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        // Custom classes
        className
      )}
      captionLayout={captionLayout}
      formatters={{
        formatMonthDropdown: (date: Date) =>
          date.toLocaleString("default", { month: "short" }),
        ...formatters,
      }}
      classNames={{
        root: cn("w-fit", defaultClassNames.root),
        months: cn(
          "relative flex flex-col gap-4 md:flex-row",
          defaultClassNames.months
        ),
        month: cn("flex w-full flex-col gap-4", defaultClassNames.month),
        nav: cn(
          "absolute inset-x-0 top-0 flex w-full items-center justify-between gap-1",
          defaultClassNames.nav
        ),
        button_previous: cn(
          "flex h-[--cell-size] w-[--cell-size] select-none items-center justify-center p-0 aria-disabled:opacity-50",
          defaultClassNames.button_previous
        ),
        button_next: cn(
          "flex h-[--cell-size] w-[--cell-size] select-none items-center justify-center p-0 aria-disabled:opacity-50",
          defaultClassNames.button_next
        ),
        month_caption: cn(
          "flex h-[--cell-size] w-full items-center justify-center px-[--cell-size]",
          defaultClassNames.month_caption
        ),
        dropdowns: cn(
          "flex h-[--cell-size] w-full items-center justify-center gap-1.5 text-sm font-medium",
          defaultClassNames.dropdowns
        ),
        dropdown_root: cn(
          "has-focus:border-ring border-input shadow-xs has-focus:ring-ring/50 has-focus:ring-[3px] relative rounded-md border",
          defaultClassNames.dropdown_root
        ),
        dropdown: cn(
          "absolute inset-0 border-transparent bg-white opacity-0",
          defaultClassNames.dropdown
        ),
        caption_label: cn(
          "select-none font-medium",
          captionLayout === "label"
            ? "text-sm"
            : "[&>svg]:text-muted-foreground flex h-8 items-center gap-1 rounded-md pl-2 pr-1 text-sm [&>svg]:size-3.5",
          defaultClassNames.caption_label
        ),
        table: "w-full border-collapse",
        weekdays: cn("flex", defaultClassNames.weekdays),
        weekday: cn(
          "text-muted-foreground flex-1 select-none rounded-md text-[0.8rem] font-normal",
          defaultClassNames.weekday
        ),
        week: cn("mt-2 flex w-full", defaultClassNames.week),
        week_number_header: cn(
          "w-[--cell-size] select-none",
          defaultClassNames.week_number_header
        ),
        week_number: cn(
          "text-muted-foreground select-none text-[0.8rem]",
          defaultClassNames.week_number
        ),
        day: cn(
          "group/day relative aspect-square size-10 select-none p-0 text-center [&:first-child[data-selected=true]_button]:rounded-l-md [&:last-child[data-selected=true]_button]:rounded-r-md",
          defaultClassNames.day
        ),
        range_start: cn(
          "rounded-l-md bg-neutral-50",
          defaultClassNames.range_start
        ),
        range_middle: cn("rounded-none", defaultClassNames.range_middle),
        range_end: cn(
          "rounded-r-md bg-neutral-50",
          defaultClassNames.range_end
        ),
        today: cn(
          "text-accent-foreground rounded-md bg-neutral-50 data-[selected=true]:rounded-none",
          defaultClassNames.today
        ),
        outside: cn(
          "text-muted-foreground aria-selected:text-muted-foreground",
          defaultClassNames.outside
        ),
        disabled: cn(
          "text-muted-foreground opacity-50",
          defaultClassNames.disabled
        ),
        hidden: cn("invisible", defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Root: ({
          className,
          rootRef,
          ...props
        }: React.ComponentProps<"div"> & {
          rootRef?: React.Ref<HTMLDivElement>;
        }) => {
          return (
            <div
              data-slot="calendar"
              ref={rootRef}
              className={cn(className)}
              {...props}
            />
          );
        },
        Chevron: ({ className, orientation, ...props }: ChevronProps) => {
          if (orientation === "left") {
            return (
              <ChevronLeftIcon className={cn("size-4", className)} {...props} />
            );
          }

          if (orientation === "right") {
            return (
              <ChevronRightIcon
                className={cn("size-4", className)}
                {...props}
              />
            );
          }

          return (
            <ChevronDownIcon className={cn("size-4", className)} {...props} />
          );
        },
        DayButton: (props: any) =>
          React.createElement(CalendarDayButton, props),
        WeekNumber: ({ week, ...props }: WeekNumberProps) => {
          return (
            <td {...props}>
              <div className="flex size-[--cell-size] items-center justify-center text-center">
                {week.weekNumber}
              </div>
            </td>
          );
        },
        ...components,
      }}
      {...(props as DayPickerProps)}
      fromDate={minDate}
      toDate={maxDate}
      onSelect={onSelect || onChange}
      mode={(props.mode as any) || "single"}
    />
  );
};

function CalendarDayButtonImplementation(
  {
    className,
    day,
    modifiers,
    ...props
  }: DayProps & React.ButtonHTMLAttributes<HTMLButtonElement>,
  ref: React.ForwardedRef<HTMLButtonElement>
) {
  const defaultClassNames = getDefaultClassNames();

  const internalRef = React.useRef<HTMLButtonElement>(null);
  React.useEffect(() => {
    if (modifiers.focused) internalRef.current?.focus();
  }, [modifiers.focused]);

  React.useImperativeHandle(
    ref,
    () => internalRef.current as HTMLButtonElement
  );

  return (
    <button
      ref={internalRef}
      data-day={day.date.toLocaleDateString()}
      data-selected-single={
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_end &&
        !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn(
        // Base layout and sizing
        "flex size-10 min-w-[--cell-size] items-center justify-center gap-1 rounded-md font-normal leading-none",
        // Selected state styles
        "data-[selected-single=true]:bg-primary-700 data-[selected-single=true]:text-white",
        "data-[range-start=true]:bg-primary-500 data-[range-start=true]:text-white",
        "data-[range-end=true]:bg-primary-500 data-[range-end=true]:text-white",
        "data-[range-middle=true]:w-12 data-[range-middle=true]:bg-primary-100 data-[range-middle=true]:text-primary-900",
        // Border radius for different selection states
        "data-[range-end=true]:rounded-md data-[range-middle=true]:rounded-none data-[range-start=true]:rounded-md",
        // Focus state styles
        "group-data-[focused=true]/day:border-primary-500 group-data-[focused=true]/day:ring-primary-500/20",
        "group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:ring-[3px]",
        // Child element styles
        "[&>span]:text-xs [&>span]:opacity-70",
        defaultClassNames.day,
        className
      )}
      {...props}
    />
  );
}

const Calendar = React.memo(CalendarImplementation);
Calendar.displayName = "Calendar";

const CalendarDayButton = React.memo(
  React.forwardRef(CalendarDayButtonImplementation)
);
CalendarDayButton.displayName = "CalendarDayButton";

export { Calendar, CalendarDayButton };
