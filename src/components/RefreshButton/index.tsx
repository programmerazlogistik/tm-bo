import React from "react";

interface RefreshButtonProps {
  onClick?: () => void;
  className?: string;
}

const RefreshButton: React.FC<RefreshButtonProps> = ({
  onClick,
  className,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`text-primary-700 hover:text-primary-800 ${className || ""}`}
    >
      <svg
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
        />
      </svg>
    </button>
  );
};

export default RefreshButton;
