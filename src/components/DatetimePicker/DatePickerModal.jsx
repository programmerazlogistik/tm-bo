// src/components/Modal/DatePickerModal.jsx
import { forwardRef, useEffect, useRef, useState } from "react";

import { cn } from "@muatmuat/lib/utils";
import { Input } from "@muatmuat/ui/Form";
import { IconComponent } from "@muatmuat/ui/IconComponent";
import { format } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import DatePicker from "react-datepicker";
// We need to import the default styles for react-datepicker
import "react-datepicker/dist/react-datepicker.css";
import { createPortal } from "react-dom";

import "./datepicker-modal.scss";

const safeNewDate = (date) => {
  if (!date) return null;
  const d = new Date(date);
  if (d instanceof Date && !isNaN(d)) {
    return d;
  }
  return null;
};

const CustomModal = ({ open, onClose, children, className }) => {
  const modalRootRef = useRef(null);

  // Set up the portal root element on mount
  useEffect(() => {
    // This check prevents creating multiple roots in development with React StrictMode
    if (!document.getElementById("modal-root")) {
      const modalRoot = document.createElement("div");
      modalRoot.setAttribute("id", "modal-root");
      document.body.appendChild(modalRoot);
      modalRootRef.current = modalRoot;
    } else {
      modalRootRef.current = document.getElementById("modal-root");
    }

    // Cleanup function to run only when the component unmounts
    return () => {
      if (
        modalRootRef.current &&
        modalRootRef.current.parentNode === document.body &&
        document.querySelectorAll("#modal-root").length === 1
      ) {
        // Optional: only remove if it's the last modal user
      }
    };
  }, []);

  // Effect to handle Escape key press
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    if (open) {
      window.addEventListener("keydown", handleEsc);
    }
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [open, onClose]);

  // Prevent body scrolling when modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  if (!open || !modalRootRef.current) {
    return null;
  }

  // Use React Portal to render the modal
  return createPortal(
    // Overlay backdrop with higher z-index AND pointer-events-auto
    <div
      onClick={onClose}
      className="pointer-events-auto fixed inset-0 z-[60] flex items-center justify-center bg-black bg-opacity-50 transition-opacity"
    >
      {/* Modal content container */}
      <div
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside content
        className={cn(
          "transform rounded-lg bg-white shadow-xl transition-all",
          className
        )}
      >
        {children}
      </div>
    </div>,
    modalRootRef.current
  );
};

// The input that will be displayed and trigger the modal
const CustomInput = forwardRef(({ value: inputValue, onClick }, ref) => (
  <div className="relative" onClick={onClick} ref={ref}>
    <Input
      value={inputValue}
      readOnly
      placeholder="Pilih Tanggal & Waktu"
      className="cursor-pointer"
    />
    <IconComponent
      src="/icons/calendar16.svg"
      alt="Calendar Icon"
      className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500"
    />
  </div>
));
CustomInput.displayName = "CustomInput";
// Main component
const DatePickerModal = ({
  value,
  onChange,
  minDate,
  maxDate,
  disabled = false,
  isError = false,
}) => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    if (!disabled) {
      setModalOpen(true);
    }
  };

  const dateValue = safeNewDate(value);

  return (
    <>
      <CustomInput
        value={dateValue ? format(dateValue, "dd MMM yyyy, HH:mm") : ""}
        onClick={handleOpenModal}
        disabled={disabled}
        isError={isError}
      />
      <CustomModal open={modalOpen} onClose={() => setModalOpen(false)}>
        <DatePickerContent
          selectedDate={dateValue}
          onDateChange={onChange}
          closeModal={() => setModalOpen(false)}
          minDate={minDate}
          maxDate={maxDate}
        />
      </CustomModal>
    </>
  );
};

// The content for the modal
const DatePickerContent = ({ selectedDate, onDateChange, closeModal }) => {
  const [time, setTime] = useState({
    hour: selectedDate ? format(selectedDate, "HH") : "00",
    minute: selectedDate ? format(selectedDate, "mm") : "00",
  });

  const handleDateSelect = (date) => {
    const newDate = new Date(date);
    newDate.setHours(parseInt(time.hour, 10));
    newDate.setMinutes(parseInt(time.minute, 10));
    onDateChange(newDate);
    closeModal();
  };

  const handleTimeChange = (part, value) => {
    const numericValue = value.replace(/[^0-9]/g, "");
    let newTime;

    if (part === "hour") {
      if (parseInt(numericValue, 10) > 23) return;
      newTime = { ...time, hour: numericValue };
    } else {
      if (parseInt(numericValue, 10) > 59) return;
      newTime = { ...time, minute: numericValue };
    }

    setTime(newTime);

    if (selectedDate) {
      const newDate = new Date(selectedDate);
      newDate.setHours(parseInt(newTime.hour || 0, 10));
      newDate.setMinutes(parseInt(newTime.minute || 0, 10));
      onDateChange(newDate);
    }
  };

  return (
    <div className="w-[328px] bg-white p-4 font-sans">
      <DatePicker
        selected={selectedDate}
        onChange={handleDateSelect}
        inline
        calendarClassName="muat-datepicker"
        dayClassName={(date) => {
          const today = new Date();
          // Reset time part for accurate date comparison
          today.setHours(0, 0, 0, 0);
          const isToday = date.getTime() === today.getTime();
          const isSelected =
            selectedDate && date.toDateString() === selectedDate.toDateString();
          return cn(
            "flex items-center justify-center", // Center the number
            isToday && !isSelected && "font-bold text-neutral-900",
            isSelected && "rounded-full bg-primary-700 text-white"
          );
        }}
        renderCustomHeader={({
          date,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
        }) => (
          <div className="flex items-center justify-between px-1 pb-4">
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-neutral-900">
                {format(date, "MMMM yyyy")}
              </h2>
              <ChevronRight
                className="-mt-[3px] text-[#0A7AFF]"
                height={20}
                width={17}
              />
            </div>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={decreaseMonth}
                disabled={prevMonthButtonDisabled}
                className="disabled:text-neutral-400"
                aria-label="Previous month"
              >
                <ChevronLeft className="h-6 w-6 text-[#0A7AFF]" />
              </button>
              <button
                type="button"
                onClick={increaseMonth}
                disabled={nextMonthButtonDisabled}
                className="disabled:text-neutral-400"
                aria-label="Next month"
              >
                <ChevronRight className="h-6 w-6 text-[#0A7AFF]" />
              </button>
            </div>
          </div>
        )}
      />
      <div className="mt-4 flex items-center justify-between border-t border-neutral-200 pt-4">
        <p className="text-base font-bold text-neutral-900">Time</p>
        <div className="flex items-center gap-2 rounded-md border border-neutral-400 px-3 py-2">
          <input
            type="text"
            value={time.hour}
            onChange={(e) => handleTimeChange("hour", e.target.value)}
            className="w-6 bg-transparent text-center text-sm font-medium text-neutral-900 outline-none"
            maxLength={2}
          />
          <span className="text-sm font-medium text-neutral-500">:</span>
          <input
            type="text"
            value={time.minute}
            onChange={(e) => handleTimeChange("minute", e.target.value)}
            className="w-6 bg-transparent text-center text-sm font-medium text-neutral-900 outline-none"
            maxLength={2}
          />
        </div>
      </div>
    </div>
  );
};

export default DatePickerModal;
