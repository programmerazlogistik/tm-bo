"use client";

import PropTypes from "prop-types";

const Toggle = ({
  textActive,
  textInactive,
  onClick,
  type = "primary",
  value = false,
  disabled = false,
  ...props
}) => {
  const handleValue = () => {
    if (!disabled) {
      onClick?.(!value);
    }
  };

  const buttonClasses = [
    "relative w-[40px] h-[24px] shadow-muat rounded-full transition-colors",
    value
      ? type === "primary"
        ? "bg-primary-700"
        : "bg-secondary-500"
      : "bg-[#868686]",
    // disabled && (value ? "disabled:bg-primary-200" : "disabled:bg-neutral-400"),
    "disabled:cursor-not-allowed",
  ]
    .filter(Boolean)
    .join(" ");

  const dotClasses = [
    "absolute inset-[2px] w-[20px] h-[20px] rounded-full bg-white transition-transform",
    value ? "translate-x-[16.5px]" : "translate-x-0",
  ].join(" ");

  const textClasses = [
    "text-xs font-medium select-none capitalize",
    disabled ? "text-neutral-600" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="flex w-fit items-center gap-2" {...props}>
      <button
        type="button"
        className={buttonClasses}
        onClick={handleValue}
        disabled={disabled}
      >
        <span className={dotClasses}></span>
      </button>
      {!!(textActive || textInactive) && (
        <span className={textClasses}>{value ? textActive : textInactive}</span>
      )}
    </div>
  );
};

export default Toggle;

Toggle.propTypes = {
  textActive: PropTypes.string,
  textInactive: PropTypes.string,
  type: PropTypes.oneOf(["primary", "secondary"]),
  onClick: PropTypes.func,
  value: PropTypes.bool,
  disabled: PropTypes.bool,
};
