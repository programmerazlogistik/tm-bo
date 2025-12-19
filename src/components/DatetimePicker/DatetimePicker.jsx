import { useEffect, useRef, useState } from "react";

import { cn } from "@muatmuat/lib/utils";
import { IconComponent } from "@muatmuat/ui/IconComponent";
import { format, setHours, setMinutes } from "date-fns";
import { id } from "date-fns/locale/id";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import style from "./DatetimePicker.module.scss";

// Helper function to ensure we're working with a proper Date object
const ensureDate = (dateValue) => {
  if (!dateValue) return null;

  // If it's already a Date object
  if (dateValue instanceof Date && !isNaN(dateValue)) {
    return dateValue;
  }

  // If it's an ISO string or other date string
  try {
    const newDate = new Date(dateValue);
    if (!isNaN(newDate.getTime())) {
      return newDate;
    }
  } catch (e) {
    console.error("Error parsing date:", e);
  }

  return null;
};

const TimePicker = ({ selectedDate, onChange, minDate, maxDate }) => {
  const hoursRef = useRef(null);
  const minutesRef = useRef(null);
  const initialRender = useRef(true);

  const [scrollTimeout, setScrollTimeout] = useState(null);

  // Ensure selectedDate is a valid Date object
  const dateObj = ensureDate(selectedDate) || new Date();

  const currentHour = dateObj.getHours();
  const currentMinute = dateObj.getMinutes();

  // Constants
  const ITEM_HEIGHT = 32;
  const TOTAL_ITEMS = 9; // Fixed set length
  const MIDDLE_INDEX = (TOTAL_ITEMS - 1) / 2; // Active value index (5th position)
  const VISIBLE_ITEMS = 7;

  // Normalize value to 0-23 for hours or 0-59 for minutes
  const normalizeValue = (value, max) => ((value % max) + max) % max;

  // Generate set of 9 numbers centered around a value
  const generateTimeSet = (centerValue, isHours) => {
    const max = isHours ? 24 : 60;
    const result = [];
    const generatedNumbersCount = (TOTAL_ITEMS - 1) / 2;

    // Generate 4 numbers before
    for (let i = generatedNumbersCount; i > 0; i--) {
      result.push(normalizeValue(centerValue - i, max));
    }

    // Add center value
    result.push(centerValue);

    // Generate 4 numbers after
    for (let i = 1; i <= generatedNumbersCount; i++) {
      result.push(normalizeValue(centerValue + i, max));
    }

    return result;
  };

  // Initialize state with sets centered on current values
  const [hourItems, setHourItems] = useState(() =>
    generateTimeSet(currentHour, true)
  );
  const [minuteItems, setMinuteItems] = useState(() =>
    generateTimeSet(currentMinute, false)
  );

  // Update time sets when selectedDate changes
  useEffect(() => {
    setHourItems(generateTimeSet(dateObj.getHours(), true));
    setMinuteItems(generateTimeSet(dateObj.getMinutes(), false));
  }, [selectedDate]);

  const handleTimeScroll = (container, isHours) => {
    const scrollTop = container.scrollTop;
    const baseScrollTop = MIDDLE_INDEX * ITEM_HEIGHT;
    const scrollDiff = scrollTop - baseScrollTop;
    const scrollTollerance = ITEM_HEIGHT / 4;

    // Clear any existing timeout
    if (scrollTimeout) {
      clearTimeout(scrollTimeout);
    }

    // Only process if scroll difference is significant
    if (
      scrollTop > ITEM_HEIGHT * 2 - scrollTollerance ||
      scrollTop < scrollTollerance
    ) {
      const moveCount = 1;
      const direction = scrollTop > 32 ? 1 : -1;
      const items = isHours ? hourItems : minuteItems;
      const max = isHours ? 24 : 60;

      // Get current center value and calculate new center value
      const currentValue = items[MIDDLE_INDEX];
      const newCenterValue = normalizeValue(
        currentValue + direction * moveCount,
        max
      );

      // Check if new time would be within bounds
      const testDate = new Date(dateObj);
      if (isHours) {
        testDate.setHours(newCenterValue, dateObj.getMinutes());
      } else {
        testDate.setHours(dateObj.getHours(), newCenterValue);
      }

      // Generate new set centered around new value
      const newItems = generateTimeSet(newCenterValue, isHours);

      // Update state only if within bounds or no bounds set
      const minDateObj = ensureDate(minDate);
      const maxDateObj = ensureDate(maxDate);

      const isWithinBounds =
        (!minDateObj || testDate >= minDateObj) &&
        (!maxDateObj || testDate <= maxDateObj);

      if (isWithinBounds || true) {
        // Update state
        if (isHours) {
          setHourItems(newItems);
          if (newCenterValue !== currentHour) {
            onChange(testDate);
          }
        } else {
          setMinuteItems(newItems);
          if (newCenterValue !== currentMinute) {
            onChange(testDate);
          }
        }
      }

      // Immediate scroll centering
      requestAnimationFrame(() => {
        if (container) {
          container.scrollTop =
            ((TOTAL_ITEMS - VISIBLE_ITEMS) / 2) * ITEM_HEIGHT;
        }
      });
    }

    // Set new timeout for auto-centering after scroll inactivity
    const newTimeout = setTimeout(() => {
      if (container) {
        container.scrollTop = ((TOTAL_ITEMS - VISIBLE_ITEMS) / 2) * ITEM_HEIGHT;
      }
    }, 100);

    setScrollTimeout(newTimeout);
  };

  useEffect(() => {
    if (hoursRef.current && minutesRef.current && initialRender.current) {
      // Set initial scroll position to middle
      const scrollToMiddle = (ref) => {
        ref.scrollTop = ((TOTAL_ITEMS - VISIBLE_ITEMS) / 2) * ITEM_HEIGHT;
      };

      scrollToMiddle(hoursRef.current);
      scrollToMiddle(minutesRef.current);
      initialRender.current = false;
    }
  }, []);

  const renderTimeColumn = (items, currentValue, ref, isHours) => {
    const isTimeDisabled = (value) => {
      if (!minDate && !maxDate) return false;

      const testDate = new Date(dateObj);
      if (isHours) {
        testDate.setHours(value, dateObj.getMinutes());
      } else {
        testDate.setHours(dateObj.getHours(), value);
      }

      const minDateObj = ensureDate(minDate);
      const maxDateObj = ensureDate(maxDate);

      return (
        (minDateObj && testDate < minDateObj) ||
        (maxDateObj && testDate > maxDateObj)
      );
    };

    const handleTimeClick = (value, disabled) => {
      if (!disabled) {
        const newDate = isHours
          ? setHours(dateObj, value)
          : setMinutes(dateObj, value);
        onChange(newDate);

        // Update the scroll position to center the clicked value
        if (ref.current) {
          ref.current.scrollTop =
            ((TOTAL_ITEMS - VISIBLE_ITEMS) / 2) * ITEM_HEIGHT;
        }

        // Update the items to center around clicked value
        const newItems = generateTimeSet(value, isHours);
        if (isHours) {
          setHourItems(newItems);
        } else {
          setMinuteItems(newItems);
        }
      }
    };

    return (
      <div className="relative h-[224px]">
        <div
          ref={ref}
          className="scrollbar-none h-full w-[50px] overflow-y-auto"
          onScroll={(e) => handleTimeScroll(e.target, isHours)}
        >
          {items.map((value, index) => {
            const disabled = isTimeDisabled(value);
            return (
              <div
                key={`${value}-${index}`}
                className={`flex h-8 items-center justify-center rounded-md ${
                  index === MIDDLE_INDEX
                    ? disabled
                      ? "bg-gray-200 text-gray-400"
                      : "bg-[var(--primary-700)] text-white hover:bg-[var(--primary-800)]"
                    : disabled
                      ? "text-gray-400"
                      : "hover:bg-gray-100"
                } ${disabled ? "cursor-not-allowed" : "cursor-pointer"}`}
                onClick={() => handleTimeClick(value, disabled)}
              >
                {value.toString().padStart(2, "0")}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="timepicker-custom ml-2 flex items-center justify-center border-l border-gray-200 px-2">
      {renderTimeColumn(hourItems, currentHour, hoursRef, true)}
      <div className="mx-1 text-xl font-bold">:</div>
      {renderTimeColumn(minuteItems, currentMinute, minutesRef, false)}
    </div>
  );
};

const DatetimePicker = ({
  datetimeValue = new Date(),
  minDate = new Date(),
  maxDate,
  onApply = () => {},
  onCancel = () => {},
  className = "",
  dateFormat = "dd MMM yyyy HH:mm",
  placeholder = "Tanggal",
  disabled = false,
  status = null,
  disableDateOnly,
  ...props
}) => {
  // Ensure we always have a valid Date object
  const initialDate = ensureDate(datetimeValue) || new Date();
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [selectedDateStr, setSelectedDateStr] = useState(
    format(initialDate, dateFormat)
  );
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [appliedDateStr, setAppliedDateStr] = useState(
    format(initialDate, dateFormat)
  );
  const [dropdownPosition, setDropdownPosition] = useState({});
  const pickerRef = useRef(null);

  registerLocale("id", id);

  // Click outside detection
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setIsPickerOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Update positioning when picker opens
  useEffect(() => {
    setSelectedDateStr(appliedDateStr);
    if (isPickerOpen && pickerRef.current) {
      const pickerRect = pickerRef.current.getBoundingClientRect();
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      const dropdownWidth = 360;
      const dropdownHeight = 380;

      const position = {};
      const isRightField = pickerRect.left > screenWidth / 2;

      if (isRightField) {
        position.right = 0;
      } else {
        position.left = 0;
      }

      if (pickerRect.bottom + dropdownHeight > screenHeight && false) {
        // never used. dropdown always open to bottom
      } else {
        position.top = "100%";
        position.marginTop = "8px";
      }

      setDropdownPosition(position);
    }
  }, [isPickerOpen, appliedDateStr]);

  // Keep datetimeValue in sync with props
  useEffect(() => {
    if (datetimeValue) {
      const dateObj = ensureDate(datetimeValue);
      if (dateObj) {
        setSelectedDate(dateObj);
        setSelectedDateStr(format(dateObj, dateFormat));
        setAppliedDateStr(format(dateObj, dateFormat));
      }
    }
  }, [datetimeValue, dateFormat]);

  // Custom calendar header component
  const CustomHeader = ({
    date,
    decreaseMonth,
    increaseMonth,
    prevMonthButtonDisabled,
    nextMonthButtonDisabled,
  }) => (
    <div className="flex items-center justify-between px-2 py-2">
      <button
        onClick={decreaseMonth}
        disabled={prevMonthButtonDisabled}
        className="rounded-full p-1 hover:bg-gray-100 disabled:opacity-50"
        type="button"
      >
        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <div className="text-base font-medium">
        {format(date, "MMMM yyyy", { locale: id })}
      </div>
      <button
        onClick={increaseMonth}
        disabled={nextMonthButtonDisabled}
        className="rounded-full p-1 hover:bg-gray-100 disabled:opacity-50"
        type="button"
      >
        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );

  const handleDateChange = (date) => {
    if (date) {
      setSelectedDate(date);
      setSelectedDateStr(format(date, dateFormat));
    }
  };

  const handleApply = (dateValue) => {
    if (dateValue) {
      setAppliedDateStr(format(dateValue, dateFormat));
      setIsPickerOpen(false);
      onApply(dateValue);
    }
  };

  const handleCancel = (dateValue) => {
    setSelectedDateStr(appliedDateStr);
    setIsPickerOpen(false);
    onCancel(dateValue);
  };

  const isTimeDisabled = (date) => {
    if (!minDate && !maxDate) return false;
    const minDateObj = ensureDate(minDate);
    const maxDateObj = ensureDate(maxDate);
    return (
      (minDateObj && date < minDateObj) || (maxDateObj && date > maxDateObj)
    );
  };

  return (
    <div
      className={`${style.DateTimePickerContainer} relative ${className}`}
      ref={pickerRef}
    >
      <div
        onClick={() => {
          if (!disabled) {
            setIsPickerOpen(!isPickerOpen);
          }
        }}
      >
        <div
          className={cn(
            "flex h-8 w-full items-center gap-x-2 rounded-md border border-neutral-600 px-3",
            status === "error" ? "border-error-400" : "",
            "hover:border-primary-700",
            disabled
              ? "cursor-not-allowed bg-neutral-200 hover:border-neutral-600"
              : "cursor-pointer"
          )}
        >
          <IconComponent src="/icons/calendar16.svg" />
          <span
            className={cn(
              "text-sm font-semibold leading-[1.1] sm:text-xs sm:font-medium sm:leading-[1.2]",
              datetimeValue ? "text-neutral-900" : "text-neutral-600"
            )}
          >
            {datetimeValue ? `${appliedDateStr} WIB` : placeholder}
          </span>
        </div>
      </div>
      {isPickerOpen && (
        <div
          className="absolute z-10 w-fit max-w-[calc(100dvw-32px)] rounded-lg border border-[#E5E7F0] bg-white shadow-lg"
          style={dropdownPosition}
        >
          {/* MP 22: LB - 0166 */}
          <div className="flex max-w-[100%] overflow-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <DatePicker
              readOnly={disableDateOnly}
              selected={selectedDate}
              onChange={handleDateChange}
              inline
              dateFormat={dateFormat}
              minDate={ensureDate(minDate)}
              maxDate={ensureDate(maxDate)}
              renderCustomHeader={CustomHeader}
              calendarClassName="!border-0"
              dayClassName={() => "rounded-lg"}
              weekDayClassName={() => "!w-[40px] !h-8 !leading-8"}
              monthClassName={() => "!mt-0"}
              renderDayContents={(day, date) => (
                <div className="pickerDayContent rounded">{day}</div>
              )}
              locale="id"
            />
            <TimePicker
              selectedDate={selectedDate}
              onChange={handleDateChange}
              minDate={ensureDate(minDate)}
              maxDate={ensureDate(maxDate)}
            />
          </div>
          <div className="flex justify-end gap-2 border-t p-4">
            <button
              onClick={() => handleCancel(selectedDate)}
              className="rounded-lg px-4 py-2 text-gray-600 transition-colors hover:bg-gray-100"
            >
              Batal
            </button>
            <button
              onClick={() => handleApply(selectedDate)}
              disabled={isTimeDisabled(selectedDate)}
              className={`rounded-lg px-4 py-2 transition-colors ${
                isTimeDisabled(selectedDate)
                  ? "cursor-not-allowed bg-gray-300 text-gray-500"
                  : "bg-[var(--primary-700)] text-white hover:bg-[var(--primary-800)]"
              }`}
            >
              Terapkan
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DatetimePicker;
