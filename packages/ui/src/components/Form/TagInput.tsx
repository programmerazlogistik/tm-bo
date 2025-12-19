import {
  type ChangeEvent,
  type KeyboardEvent,
  useCallback,
  useRef,
  useState,
} from "react";

import { cn } from "@muatmuat/lib/utils";

import { type TranslationFunction, tMockFn } from "../../lib/mock-t";
import { TagBubble } from "../Badge/TagBubble";

/**
 * Defines class names for customizing the appearance of the TagInput component.
 */
export interface TagInputAppearance {
  tagClassName?: string;
  inputClassName?: string;
}

export interface TagInputProps {
  /**
   * An optional translation function.
   */
  t?: TranslationFunction;
  /**
   * An array of tags. When provided, the component operates in controlled mode.
   */
  tags?: string[];
  /**
   * Callback fired when the tags array changes. Required for controlled mode.
   */
  onTagsChange?: (tags: string[]) => void;
  /**
   * Callback fired when a duplicate tag is entered and `allowDuplicates` is false.
   */
  onTagsDuplicate?: (tag: string) => void;
  /**
   * Placeholder text for the input field when no tags are present.
   * @default "Type and press Enter to add tags..."
   */
  placeholder?: string;
  /**
   * The maximum number of tags allowed.
   * @default Infinity
   */
  maxTags?: number;
  /**
   * The maximum character length for a single tag.
   * @default 50
   */
  maxLength?: number;
  /**
   * If `false`, duplicate tags will be prevented.
   * @default false
   */
  allowDuplicates?: boolean;
  /**
   * If `true`, the component will be disabled.
   * @default false
   */
  disabled?: boolean;
  /**
   * An error message to display below the component.
   */
  errorMessage?: string;
  hideErrorMessage?: boolean;
  /**
   * If `true`, a help text showing the tag count will be displayed.
   * @default false
   */
  withTagInputHelp?: boolean;
  /**
   * Optional class name for the root container element.
   */
  className?: string;
  /**
   * Object to customize the class names of the component's parts.
   */
  appearance?: TagInputAppearance;
}

/**
 * A reusable tag input component that allows users to add and remove tags dynamically.
 * Supports both controlled and uncontrolled modes, with customizable validation and styling.
 */
const TagInput = ({
  t = tMockFn,
  tags = [],
  onTagsChange,
  onTagsDuplicate,
  placeholder = "Type and press Enter to add tags...",
  maxTags = Infinity,
  maxLength = 50,
  allowDuplicates = false,
  disabled = false,
  errorMessage,
  hideErrorMessage = false,
  withTagInputHelp = false,
  className = "",
  appearance = {},
}: TagInputProps) => {
  // Determine if the component is controlled
  const isControlled = !!onTagsChange;
  const [internalTags, setInternalTags] = useState<string[]>(tags);
  const [inputValue, setInputValue] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

  // Use the provided `tags` prop in controlled mode, otherwise use internal state
  const currentTags = isControlled ? tags : internalTags;

  const updateTags = useCallback(
    (newTags: string[]) => {
      if (isControlled) {
        onTagsChange(newTags);
      } else {
        setInternalTags(newTags);
      }
    },
    [isControlled, onTagsChange]
  );

  const addTag = useCallback(
    (tag: string) => {
      const trimmedTag = tag.trim();

      if (
        !trimmedTag ||
        currentTags.length >= maxTags ||
        trimmedTag.length > maxLength
      ) {
        return;
      }

      if (!allowDuplicates && currentTags.includes(trimmedTag)) {
        onTagsDuplicate?.(trimmedTag);
        return;
      }

      updateTags([...currentTags, trimmedTag]);
      setInputValue("");
    },
    [
      currentTags,
      maxTags,
      allowDuplicates,
      maxLength,
      updateTags,
      onTagsDuplicate,
    ]
  );

  const removeTag = useCallback(
    (indexToRemove: number) => {
      updateTags(currentTags.filter((_, index) => index !== indexToRemove));
    },
    [currentTags, updateTags]
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
        addTag(inputValue);
      } else if (
        e.key === "Backspace" &&
        inputValue === "" &&
        currentTags.length > 0
      ) {
        removeTag(currentTags.length - 1);
      }
    },
    [inputValue, addTag, removeTag, currentTags.length]
  );

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }, []);

  const focusInput = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="w-full">
      <div
        className={cn(
          "flex w-full max-w-[576px] flex-col items-start gap-2",
          disabled ? "cursor-not-allowed" : "cursor-text",
          className
        )}
        onClick={disabled ? undefined : focusInput}
      >
        <div
          className={cn(
            "box-border flex min-h-[32px] w-full flex-row items-center gap-2 rounded-md border border-gray-500 bg-white px-3 transition-colors duration-200 focus-within:border-blue-600",
            currentTags.length > 0 && "min-h-[52px] p-3"
          )}
        >
          <div className="flex min-h-[28px] flex-1 flex-row flex-wrap content-start items-center gap-2">
            {currentTags.map((tag, index) => (
              <TagBubble
                key={`${tag}-${index}`}
                disabled={disabled}
                className={appearance.tagClassName}
                withRemove={
                  !disabled ? { onRemove: () => removeTag(index) } : undefined
                }
              >
                {tag}
              </TagBubble>
            ))}
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder={currentTags.length === 0 ? placeholder : ""}
              disabled={disabled || currentTags.length >= maxTags}
              maxLength={maxLength}
              className={cn(
                "h-8 min-w-[120px] flex-1 border-none bg-transparent text-xs font-medium leading-[14.4px] text-neutral-900 placeholder-neutral-600 outline-none hover:cursor-pointer disabled:cursor-not-allowed",
                appearance.inputClassName
              )}
              aria-label="Add new tag"
              aria-describedby={withTagInputHelp ? "tag-input-help" : undefined}
            />
          </div>
        </div>
        {withTagInputHelp && (
          <div id="tag-input-help" className="px-1 text-xs text-gray-500">
            {currentTags.length > 0 && (
              <span>
                {currentTags.length} tag{currentTags.length !== 1 ? "s" : ""}
                {maxTags !== Infinity && ` (max ${maxTags})`}
              </span>
            )}
            {currentTags.length >= maxTags && (
              <span className="ml-2 text-amber-600">Maximum tags reached</span>
            )}
          </div>
        )}
      </div>
      {errorMessage && !hideErrorMessage && (
        <span className="mt-2 text-sm text-red-500">{t(errorMessage)}</span>
      )}
    </div>
  );
};

export { TagInput };
