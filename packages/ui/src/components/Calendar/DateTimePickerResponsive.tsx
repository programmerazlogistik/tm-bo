"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { cn } from "@muatmuat/lib/utils";
import { format } from "date-fns";

import { Button } from "../Button";
import { Modal, ModalContent, ModalTrigger } from "../Modal";
import { Calendar } from "./Calendar";
import {
  DateSelection,
  DateTimePickerResponsiveProps,
  TimeColumnProps,
} from "./types";

// Constants moved outside to prevent recreation
const TIME_SLOT_HEIGHT = 32;
const GAP = 0;
const EFFECTIVE_SLOT_HEIGHT = TIME_SLOT_HEIGHT + GAP;
const HOURS = Array.from({ length: 24 }, (_, i) => i);
const MINUTES = Array.from({ length: 60 }, (_, i) => i);

/**
 * A scrollable time picker column component for selecting hours or minutes
 */
const TimeColumn = ({
  values,
  selectedValue,
  onChange,
  visibleItemCount = 9,
}: TimeColumnProps) => {
  // Memoize expensive calculations
  const { containerHeight, paddingY } = useMemo(() => {
    if (visibleItemCount % 2 === 0) {
      console.warn("TimeColumn: `visibleItemCount` should be an odd number.");
    }
    const height =
      visibleItemCount * TIME_SLOT_HEIGHT + (visibleItemCount - 1) * GAP;
    const padding = height / 2 - TIME_SLOT_HEIGHT / 2;
    return { containerHeight: height, paddingY: padding };
  }, [visibleItemCount]);

  // Memoize looped values to prevent recreation
  const loopedValues = useMemo(
    () => [...values, ...values, ...values],
    [values]
  );

  // Memoize mask gradient calculation
  const maskGradient = useMemo(() => {
    const startPercent = (paddingY / containerHeight) * 100;
    const endPercent = ((paddingY + TIME_SLOT_HEIGHT) / containerHeight) * 100;
    return `linear-gradient(to bottom, transparent, transparent ${startPercent - 5}%, black ${startPercent}%, black ${endPercent}%, transparent ${endPercent + 5}%, transparent)`;
  }, [paddingY, containerHeight]);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const dummyScrollerRef = useRef<HTMLDivElement>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isUserScrolling = useRef(false);
  const userScrollTimeout = useRef<NodeJS.Timeout | null>(null);

  // Memoize scroll to selected value function
  const scrollToSelectedValue = useCallback(
    (value: number, behavior: ScrollBehavior = "auto") => {
      const container = scrollContainerRef.current;
      if (!container) return;

      const targetBaseIndex = values.indexOf(value);
      if (targetBaseIndex !== -1) {
        const targetLoopedIndex = values.length + targetBaseIndex;
        const targetScrollTop = targetLoopedIndex * EFFECTIVE_SLOT_HEIGHT;
        container.scrollTo({ top: targetScrollTop, behavior });
      }
    },
    [values]
  );

  // Initial scroll setup - only run once
  useEffect(() => {
    scrollToSelectedValue(selectedValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array - only run on mount

  // Update scroll position when selectedValue changes (but not during user interaction)
  useEffect(() => {
    if (isUserScrolling.current) return;
    scrollToSelectedValue(selectedValue);
  }, [selectedValue, scrollToSelectedValue]);

  // Memoize scroll handler to prevent recreation
  const handleScroll = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    // Sync dummy scroller
    if (dummyScrollerRef.current) {
      dummyScrollerRef.current.scrollTop = container.scrollTop;
    }

    // Mark as user scrolling
    isUserScrolling.current = true;
    if (userScrollTimeout.current) {
      clearTimeout(userScrollTimeout.current);
    }
    userScrollTimeout.current = setTimeout(() => {
      isUserScrolling.current = false;
    }, 150);

    // Debounced selection update
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    debounceTimerRef.current = setTimeout(() => {
      const blockHeight = values.length * EFFECTIVE_SLOT_HEIGHT;

      // Handle infinite scroll wrapping
      if (container.scrollTop < blockHeight) {
        container.scrollTop += blockHeight;
      } else if (container.scrollTop >= blockHeight * 2) {
        container.scrollTop -= blockHeight;
      }

      // Calculate and update selected value
      const newIndex = Math.round(container.scrollTop / EFFECTIVE_SLOT_HEIGHT);
      const newValue = loopedValues[newIndex];
      if (newValue !== undefined && newValue !== selectedValue) {
        onChange(newValue);
      }
    }, 50);
  }, [values, loopedValues, selectedValue, onChange]);

  // Memoize click handler
  const handleClick = useCallback(
    (index: number) => {
      const container = scrollContainerRef.current;
      if (!container) return;

      const baseIndex = index % values.length;
      const targetLoopedIndex = values.length + baseIndex;
      const targetScrollTop = targetLoopedIndex * EFFECTIVE_SLOT_HEIGHT;
      container.scrollTo({ top: targetScrollTop, behavior: "smooth" });
    },
    [values]
  );

  // Memoize time slots renderer
  const renderTimeSlots = useCallback(
    (textColorClass: string) => (
      <div
        className="flex flex-col items-center"
        style={{ paddingTop: `${paddingY}px`, paddingBottom: `${paddingY}px` }}
      >
        {loopedValues.map((value, index) => {
          const isSelected = value === selectedValue;
          return (
            <button
              type="button"
              key={`${value}-${index}`} // More specific key
              onClick={() => (isSelected ? undefined : handleClick(index))}
              className={cn(
                "flex h-8 w-full snap-center items-center justify-center text-sm font-medium",
                textColorClass,
                isSelected ? "cursor-default" : "cursor-pointer"
              )}
            >
              {String(value).padStart(2, "0")}
            </button>
          );
        })}
      </div>
    ),
    [loopedValues, selectedValue, paddingY, handleClick]
  );

  return (
    <div className="relative w-12" style={{ height: `${containerHeight}px` }}>
      <div className="pointer-events-none absolute left-0 top-1/2 z-0 h-8 w-full -translate-y-1/2 rounded-md bg-primary-700"></div>
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="scrollbar-hide relative z-10 h-full snap-y snap-mandatory overflow-y-auto"
      >
        {renderTimeSlots("text-neutral-700")}
      </div>
      <div
        ref={dummyScrollerRef}
        className="pointer-events-none absolute inset-0 z-20 h-full overflow-y-hidden"
        style={{ WebkitMaskImage: maskGradient, maskImage: maskGradient }}
      >
        {renderTimeSlots("text-white")}
      </div>
    </div>
  );
};

interface TimePickerModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  value: Date;
  onApply: (date: Date) => void;
}

/**
 * A modal component for selecting time (hours and minutes)
 */
const TimePickerModal = ({
  isOpen,
  onOpenChange,
  value,
  onApply,
}: TimePickerModalProps) => {
  const [tempTime, setTempTime] = useState(value);

  // Only update tempTime when modal opens
  useEffect(() => {
    if (isOpen) {
      setTempTime(value);
    }
  }, [isOpen, value]);

  // Memoize hour selection handler
  const handleHourSelect = useCallback((hour: number) => {
    setTempTime((prevTime) => {
      const newDate = new Date(prevTime);
      newDate.setHours(hour);
      return newDate;
    });
  }, []);

  // Memoize minute selection handler
  const handleMinuteSelect = useCallback((minute: number) => {
    setTempTime((prevTime) => {
      const newDate = new Date(prevTime);
      newDate.setMinutes(minute);
      return newDate;
    });
  }, []);

  // Memoize apply handler
  const handleApplyClick = useCallback(() => {
    onApply(tempTime);
    onOpenChange(false);
  }, [tempTime, onApply, onOpenChange]);

  return (
    <Modal
      withCloseButton={false}
      closeOnOutsideClick
      open={isOpen}
      onOpenChange={onOpenChange}
    >
      <ModalContent className="w-full max-w-xs p-4">
        <div className="flex items-center justify-center gap-2">
          <TimeColumn
            values={HOURS}
            selectedValue={tempTime.getHours()}
            onChange={handleHourSelect}
          />
          <span className="relative z-30 text-2xl font-bold text-neutral-400">
            :
          </span>
          <TimeColumn
            values={MINUTES}
            selectedValue={tempTime.getMinutes()}
            onChange={handleMinuteSelect}
          />
        </div>
        <Button
          variant="muattrans-primary"
          className="mt-4 w-full rounded-full"
          onClick={handleApplyClick}
        >
          Terapkan
        </Button>
      </ModalContent>
    </Modal>
  );
};

/**
 * A comprehensive date and time picker component with modal interface.
 * Opens a modal for date selection with an integrated time picker.
 */
const DateTimePickerResponsiveImplementation = (
  {
    value: initialValue,
    onChange,
    onApply,
    children,
    useModal = false,
    title,
    showClear = true,
    ...calendarProps
  }: DateTimePickerResponsiveProps,
  ref: React.ForwardedRef<HTMLDivElement>
) => {
  const [isMainModalOpen, setMainModalOpen] = useState(false);
  const [isTimePickerModalOpen, setIsTimePickerModalOpen] = useState(false);

  // Use a single state for both current and temp values
  const [dateTime, setDateTime] = useState(() => initialValue || new Date());

  // Update internal state when prop changes
  useEffect(() => {
    if (initialValue) {
      setDateTime(initialValue);
    }
  }, [initialValue]);

  // Memoize date selection handler - this was a major performance bottleneck
  const handleDateSelect = useCallback(
    (date: DateSelection | undefined) => {
      const selectedDate = Array.isArray(date)
        ? date[0]
        : date instanceof Date
          ? date
          : undefined;
      if (!selectedDate) return;

      setDateTime((prevDateTime) => {
        // Create new date preserving time
        const newDate = new Date(prevDateTime);
        newDate.setFullYear(
          selectedDate.getFullYear(),
          selectedDate.getMonth(),
          selectedDate.getDate()
        );

        // Immediately call onChange to update parent
        if (onChange) {
          onChange(newDate);
        }

        return newDate;
      });
    },
    [onChange]
  );

  // Memoize time apply handler
  const handleTimeApplyFromModal = useCallback(
    (newTime: Date) => {
      const newDateTime = new Date(dateTime);
      newDateTime.setHours(newTime.getHours(), newTime.getMinutes());

      setDateTime(newDateTime);

      // Call callbacks
      if (onChange) onChange(newDateTime);
      if (onApply) onApply(newDateTime);

      // Close modals
      setMainModalOpen(false);
    },
    [dateTime, onChange, onApply]
  );

  // Memoize time picker button click handler
  const handleTimePickerOpen = useCallback(() => {
    setIsTimePickerModalOpen(true);
  }, []);

  // Memoize formatted time display
  const formattedTime = useMemo(
    () => ({
      hours: format(dateTime, "HH"),
      minutes: format(dateTime, "mm"),
    }),
    [dateTime]
  );

  return (
    <>
      <Modal
        ref={ref}
        withCloseButton={false}
        open={isMainModalOpen}
        onOpenChange={setMainModalOpen}
        closeOnOutsideClick={true}
      >
        <ModalTrigger asChild>{children}</ModalTrigger>
        <ModalContent className="w-full max-w-xs px-4 pb-5 pt-3.5 sm:max-w-sm">
          <Calendar
            mode="single"
            className="w-full bg-transparent p-0"
            selected={dateTime}
            onChange={handleDateSelect}
            {...calendarProps}
          />
          <div className="mt-4 flex w-full items-center justify-between">
            <h3 className="mb-2 text-base font-semibold text-neutral-800">
              Time
            </h3>
            <button
              type="button"
              onClick={handleTimePickerOpen}
              className="flex h-8 items-center justify-center gap-2 rounded-lg bg-neutral-100 px-4 text-lg tracking-widest text-neutral-900"
            >
              <span>{formattedTime.hours}</span>
              <span className="mb-1">:</span>
              <span>{formattedTime.minutes}</span>
            </button>
          </div>
        </ModalContent>
      </Modal>

      <TimePickerModal
        isOpen={isTimePickerModalOpen}
        onOpenChange={setIsTimePickerModalOpen}
        value={dateTime}
        onApply={handleTimeApplyFromModal}
      />
    </>
  );
};

export const DateTimePickerResponsive = React.memo(
  React.forwardRef(DateTimePickerResponsiveImplementation)
);
DateTimePickerResponsive.displayName = "DateTimePickerResponsive";
