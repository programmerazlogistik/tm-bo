# Merged UI Component Documentation

_This document contains all component documentation from the UI library_

## Statistics

- **Total Components:** 67
- **Files Processed:** 67
- **Generated:** 2025-10-29T21:38:13.056Z

## Table of Contents

- [ActiveFiltersBar](#activefiltersbar)
- [Alert](#alert)
- [AlertMultiline](#alertmultiline)
- [Avatar](#avatar)
- [AvatarDriver](#avatardriver)
- [BadgeStatus](#badgestatus)
- [TagBubble](#tagbubble)
- [BannerCarousel](#bannercarousel)
- [BottomSheet](#bottomsheet)
- [InfoBottomsheet](#infobottomsheet)
- [RadioBottomsheet](#radiobottomsheet)
- [Breadcrumb](#breadcrumb)
- [Button](#button)
- [Calendar](#calendar)
- [DatePickerResponsive](#datepickerresponsive)
- [DatePickerWeb](#datepickerweb)
- [DateTimePickerResponsive](#datetimepickerresponsive)
- [DateTimePickerWeb](#datetimepickerweb)
- [Card](#card)
- [ConditionalDiv](#conditionaldiv)
- [BarChart](#barchart)
- [DonutChart](#donutchart)
- [LineChart](#linechart)
- [Collapsible](#collapsible)
- [CropperPreviewResponsive](#cropperpreviewresponsive)
- [CropperPreviewScreen](#cropperpreviewscreen)
- [CropperResponsive](#cropperresponsive)
- [CropperScreen](#cropperscreen)
- [CropperWeb](#cropperweb)
- [CropperWebNew](#cropperwebnew)
- [DisplayOptionsBar](#displayoptionsbar)
- [Dropdown](#dropdown)
- [DropdownMenu](#dropdownmenu)
- [SimpleDropdown](#simpledropdown)
- [SimpleDropdownMenu](#simpledropdownmenu)
- [Dropzone](#dropzone)
- [ButtonPlusMinus](#buttonplusminus)
- [Checkbox](#checkbox)
- [DimensionInput](#dimensioninput)
- [Form](#form)
- [Input](#input)
- [NumberInput](#numberinput)
- [OtpInput](#otpinput)
- [PhoneInput](#phoneinput)
- [RatingInput](#ratinginput)
- [Select](#select)
- [TagInput](#taginput)
- [TextArea](#textarea)
- [SimpleHoverMenu](#simplehovermenu)
- [Lightbox](#lightbox)
- [LoadingInteractive](#loadinginteractive)
- [LoadingStatic](#loadingstatic)
- [MapContainer](#mapcontainer)
- [MapWithPath](#mapwithpath)
- [ConfirmationModal](#confirmationmodal)
- [ConfirmationModalResponsive](#confirmationmodalresponsive)
- [Modal](#modal)
- [NotificationCount](#notificationcount)
- [NotificationDot](#notificationdot)
- [Popover](#popover)
- [RadioButton](#radiobutton)
- [ScrollArea](#scrollarea)
- [DataTableBO](#datatablebo)
- [TableBO](#tablebo)
- [Timeline](#timeline)
- [Toaster](#toaster)
- [InfoTooltip](#infotooltip)

# ActiveFiltersBar

_Source: packages/ui/src/content/docs/components/ActiveFiltersBar/ActiveFiltersBar.mdx_

## Component Information

**Name:** ActiveFiltersBar

**Description:** A horizontal bar displaying active filters as removable tags with optional scroll functionality for overflow management.

## Imports

```javascript
import { ActiveFiltersBarPreview } from "../../preview/ActiveFiltersBar.preview";

import { useState } from "react";

import { ActiveFiltersBar } from "@muatmuat/ui/ActiveFiltersBar";

import * as React from "react";
import { useEffect, useRef, useState } from "react";

import { cn } from "@muatmuat/lib/utils";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

import { IconComponent } from "../IconComponent";

```

## Overview

**Description:** A horizontal bar displaying active filters as removable tags with optional scroll functionality for overflow management.

**Component:** ActiveFiltersBar

## Usage

<ActiveFiltersBarPreview />

```jsx
function FilterExample() {
  const [filters, setFilters] = useState([
    { id: 1, label: "Jakarta", item: { icon: "/icons/location.svg" } },
    { id: 2, label: "Sedan", item: { icon: "/icons/truck.svg" } },
    { id: 3, label: "Under 5 Years", item: { icon: "/icons/calendar.svg" } },
    {
      id: 4,
      label: "Price: Low to High",
      item: { icon: "/icons/sorting16.svg" },
    },
  ]);

  const handleRemoveFilter = (filter) => {
    setFilters(filters.filter((f) => f.id !== filter.id));
  };

  const handleClearAll = () => {
    setFilters([]);
  };

  return (
    <div className="space-y-4">
      <ActiveFiltersBar
        filters={filters}
        onRemoveFilter={handleRemoveFilter}
        onClearAll={handleClearAll}
        showClearAll={true}
        clearAllText="Hapus Semua Filter"
      />

      {filters.length === 0 && (
        <p className="text-sm text-gray-500"> No active filters </p>
      )}
    </div>
  );
}
```

## API Reference

### Props

| Prop                  | Type           | Default                  | Description                                 |
| --------------------- | -------------- | ------------------------ | ------------------------------------------- |
| filters               | `FilterItem[]` | []                       | Array of filter objects to display          |
| onRemoveFilter        | `function`     | -                        | Callback function when a filter is removed  |
| onClearAll            | `function`     | -                        | Callback function when clear all is clicked |
| className             | `string`       | -                        | Additional CSS classes for the container    |
| showClearAll          | `boolean`      | true                     | Whether to show the clear all button        |
| clearAllText          | `string`       | "Hapus Semua Filter"     | Text for the clear all button               |
| emptyText             | `string`       | "Tidak ada filter aktif" | Text to show when no filters are active     |
| tagClassName          | `string`       | -                        | Additional CSS classes for filter tags      |
| scrollButtonClassName | `string`       | -                        | Additional CSS classes for scroll buttons   |

### FilterItem

| Property  | Type             | Description                      |
| --------- | ---------------- | -------------------------------- |
| id        | `string\|number` | Unique identifier for the filter |
| label     | `string`         | Display text for the filter      |
| item      | `object`         | Optional filter metadata         |
| item.icon | `string`         | Optional icon URL for the filter |

### Types

```typescript
interface FilterItem {
  id?: string | number;
  label: string;
  item?: {
    icon?: string;
  };
}

interface ActiveFiltersBarProps {
  filters?: FilterItem[];
  onRemoveFilter?: (filter: FilterItem) => void;
  onClearAll?: () => void;
  className?: string;
  showClearAll?: boolean;
  clearAllText?: string;
  emptyText?: string;
  tagClassName?: string;
  scrollButtonClassName?: string;
}
```

## Behavior

- Displays active filters as removable pill tags with optional icons
- Automatically handles overflow with smooth horizontal scrolling when filters exceed container width
- Shows/hides scroll navigation buttons based on overflow state
- Renders nothing when no filters are active (returns null)
- Supports individual filter removal and bulk clear all functionality
- Responsive design that adapts to different screen sizes and filter quantities
- Accessible button elements with proper ARIA labels for screen readers
- Smooth scroll animations and hover states for better user experience

**Variants**: with icons, without icons, with clear all, without clear all, overflow state, empty state
**Sizes**: Compact pill design with responsive overflow handling

**Key Guidelines**:

- Use for displaying currently active filters in search, data tables, or list views
- Provide meaningful filter labels that clearly describe the applied criteria
- Include icons when available to improve visual recognition of filter types
- Leverage scroll functionality for scenarios with many active filters
- Implement proper state management to synchronize filter state across components
- Consider user experience when deciding whether to show clear all functionality

## Component Code

```tsx
export interface FilterItem {
  id?: string | number;
  label: string;
  item?: {
    icon?: string;
  };
}

export interface ActiveFiltersBarProps {
  filters?: FilterItem[];
  onRemoveFilter?: (filter: FilterItem) => void;
  onClearAll?: () => void;
  className?: string;
  showClearAll?: boolean;
  clearAllText?: string;
  emptyText?: string;
  tagClassName?: string;
  scrollButtonClassName?: string;
}

export const ActiveFiltersBar: React.FC<ActiveFiltersBarProps> = ({
  filters = [],
  onRemoveFilter,
  onClearAll,
  className,
  showClearAll = true,
  clearAllText = "Hapus Semua Filter",
  emptyText = "Tidak ada filter aktif",
  tagClassName,
  scrollButtonClassName,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    setCanScrollLeft(container.scrollLeft > 0);
    setCanScrollRight(
      container.scrollLeft < container.scrollWidth - container.clientWidth - 1
    );
  };

  useEffect(() => {
    checkScroll();
    const container = scrollContainerRef.current;
    if (!container) return;

    container.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);

    return () => {
      container.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [filters]);

  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = 200;
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  if (filters.length === 0) {
    return null;
  }

  return (
    <div className={cn("flex items-center gap-3", className)}>
      {/* Clear All Button */}
      {showClearAll && (
        <button
          onClick={onClearAll}
          className="shrink-0 text-xs font-bold text-primary-700 hover:text-primary-800"
        >
          {clearAllText}
        </button>
      )}

      {/* Scroll Left Button */}
      {(canScrollLeft || canScrollRight) && (
        <button
          onClick={() => scroll("left")}
          className={cn(
            "shrink-0 rounded-full border p-1 transition-all",
            canScrollLeft
              ? "border-neutral-600 text-neutral-900 hover:bg-neutral-100"
              : "border-neutral-500 text-neutral-500 hover:cursor-not-allowed",
            scrollButtonClassName
          )}
          aria-label="Scroll left"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
      )}

      {/* Filter Tags Container */}
      <div className="relative flex-1 overflow-hidden">
        <div
          ref={scrollContainerRef}
          className="scrollbar-hide flex gap-2 overflow-x-auto"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {filters.map((filter, index) => (
            <div
              key={filter.id || index}
              className={cn(
                "flex h-7 shrink-0 items-center gap-2 rounded-full border border-primary-700 bg-neutral-50 px-3",
                tagClassName
              )}
            >
              {filter.item?.icon && (
                <IconComponent src={filter.item.icon} width={14} height={14} />
              )}
              <span className="text-xs font-medium text-primary-700">
                {filter.label}
              </span>
              <button
                onClick={() => onRemoveFilter(filter)}
                className="rounded-full p-0.5 text-primary-700 transition-colors hover:bg-primary-100"
                aria-label={`Remove ${filter.label} filter`}
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Right Button */}
      {(canScrollLeft || canScrollRight) && (
        <button
          onClick={() => scroll("right")}
          className={cn(
            "shrink-0 rounded-full border p-1 transition-all",
            canScrollRight
              ? "border-neutral-600 text-neutral-900 hover:bg-neutral-100"
              : "border-neutral-500 text-neutral-500 hover:cursor-not-allowed",
            scrollButtonClassName
          )}
          aria-label="Scroll right"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};
```

---

# Alert

_Source: packages/ui/src/content/docs/components/Alert/Alert.mdx_

## Component Information

**Name:** Alert

**Description:** A versatile alert component for displaying important messages, warnings, or notifications with consistent styling and optional icons.

## Imports

```javascript
import React from "react";

import { cn } from "@muatmuat/lib/utils";
import { Alert } from "@muatmuat/ui/Alert";

import { AlertPreview } from "../../preview/Alert.preview";
import { IconComponent } from "../IconComponent";
```

## Overview

**Description:** A versatile alert component for displaying important messages, warnings, or notifications with consistent styling and optional icons.

**Component:** Alert

## Usage

<AlertPreview />

```jsx
function AlertExample() {
  return (
    <div className="space-y-4">
      <Alert variant="warning">
        Please review your information before proceeding.
      </Alert>

      <Alert variant="secondary">
        Your changes have been saved successfully.
      </Alert>

      <Alert variant="error"> Failed to save changes. Please try again. </Alert>
    </div>
  );
}
```

## API Reference

### Props

| Prop       | Type              | Default                                  | Description                                    |
| ---------- | ----------------- | ---------------------------------------- | ---------------------------------------------- |
| variant    | `AlertVariant`    | `"warning"`                              | Defines the visual style and semantic meaning  |
| size       | `AlertSize`       | `"sm"`                                   | Controls the padding and icon size             |
| className  | `string`          | -                                        | Additional CSS classes for the alert container |
| appearance | `AlertAppearance` | `{ labelClassName: "text-neutral-900" }` | Customization for label styling                |
| children   | `React.ReactNode` | -                                        | Alert content (string or React node)           |

## Types

```typescript
export type AlertVariant = "warning" | "secondary" | "error";
export type AlertSize = "sm" | "big";

export interface AlertAppearance {
  labelClassName?: string;
}

export interface AlertProps {
  variant?: AlertVariant;
  size?: AlertSize;
  className?: string;
  appearance?: AlertAppearance;
  children: React.ReactNode;
}
```

## Behavior

- Displays contextual messages with semantic color variants and appropriate icons
- Supports both string and React children for flexible content
- Applies customizable label styling for string children
- Responsive design with proper text wrapping

**Variants**: warning (caution messages), secondary (information messages), error (critical messages)
**Sizes**: sm (compact inline alerts), big (prominent notifications)

## Component Code

```tsx
export type AlertVariant = "warning" | "secondary" | "error";
export type AlertSize = "sm" | "big";

export interface AlertAppearance {
  labelClassName?: string;
}

export interface AlertProps {
  variant?: AlertVariant;
  size?: AlertSize;
  className?: string;
  appearance?: AlertAppearance;
  children: React.ReactNode;
}

const bgVariants: Record<AlertVariant, string> = {
  warning: "bg-warning-100",
  secondary: "bg-secondary-100",
  error: "bg-error-50",
};

const iconVariants: Record<AlertVariant, string> = {
  warning: "text-secondary-400",
  secondary: "text-warning-900",
  error: "text-error-400",
};

const icon: Record<AlertVariant, string> = {
  warning: "/icons/warning24.svg",
  secondary: "/icons/warning24.svg",
  error: "/icons/warning24.svg",
};

const alertSizes: Record<AlertSize, string> = {
  sm: "p-2",
  big: "py-4 px-6",
};

export const Alert: React.FC<AlertProps> = ({
  variant = "warning",
  size = "sm",
  className,
  appearance = {
    labelClassName: "text-neutral-900",
  },
  children,
}) => {
  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-md text-xs font-medium leading-[1.2] text-neutral-900",
        bgVariants[variant],
        alertSizes[size],
        className
      )}
    >
      {typeof icon[variant] === "string" && (
        <div className={cn("size-5", size === "big" && "size-6")}>
          <IconComponent
            src={icon[variant]}
            className={cn(
              "size-5",
              size === "big" && "size-6",
              iconVariants[variant]
            )}
          />
        </div>
      )}

      {typeof children === "string" ? (
        <span className={cn("text-neutral-900", appearance.labelClassName)}>
          {children}
        </span>
      ) : (
        children
      )}
    </div>
  );
};
```

---

# AlertMultiline

_Source: packages/ui/src/content/docs/components/Alert/AlertMultiline.mdx_

## Component Information

**Name:** AlertMultiline

**Description:** A flexible multiline alert component for displaying structured notifications with optional links, buttons, and tooltips.

## Imports

```javascript
import Link from "next/link";
import React from "react";

import { cn } from "@muatmuat/lib/utils";
import { AlertMultiline } from "@muatmuat/ui/Alert";

import { tMockFn } from "../../lib/mock-t";
import { AlertMultilinePreview } from "../../preview/AlertMultiline.preview";
import { IconComponent } from "../IconComponent";
import { InfoTooltip } from "../Tooltip/InfoTooltip";
```

## Overview

**Description:** A flexible multiline alert component for displaying structured notifications with optional links, buttons, and tooltips.

**Component:** AlertMultiline

## Usage

<AlertMultilinePreview />

```jsx
function AlertMultilineExample() {
  const items = [
    {
      label: "Your account requires email verification.",
      link: {
        label: "Verify now",
        link: "/account/verify",
      },
    },
    {
      label: "Complete your profile to access premium features.",
      button: {
        label: "Complete profile",
        onClick: () => console.log("Navigate to profile"),
      },
    },
    {
      label: "Enable two-factor authentication for security.",
      info: "Two-factor authentication adds an extra layer of security to your account.",
    },
  ];

  return <AlertMultiline items={items} />;
}
```

## API Reference

### Props

| Prop      | Type                                                                                  | Default   | Description                                    |
| --------- | ------------------------------------------------------------------------------------- | --------- | ---------------------------------------------- |
| className | `string`                                                                              | -         | Additional CSS classes for the alert container |
| items     | `AlertItem[]`                                                                         | []        | Array of alert items to display                |
| t         | `(key: string, options?: Record&lt;string, any&gt;, defaultValue?: string) => string` | `tMockFn` | Translation function                           |

## Types

```typescript
export interface AlertItemLink {
  link: string;
  label: string;
}

export interface AlertItemButton {
  label: string;
  onClick: () => void;
}

export interface AlertItemInfo {
  render: React.ReactNode;
}

export interface AlertItem {
  label: string;
  link?: AlertItemLink;
  button?: AlertItemButton;
  info?: AlertItemInfo;
}

export interface AlertMultilineProps {
  className?: string;
  items?: AlertItem[];
  t?: (
    key: string,
    options?: Record<string, any>,
    defaultValue?: string
  ) => string;
}
```

## Behavior

- Displays multiple alert items with structured layout and consistent styling
- Single item renders in inline horizontal layout with icon
- Multiple items render as bulleted list with notification header
- Supports interactive elements: links (Next.js Link), buttons, and info tooltips
- Uses warning icon with secondary color scheme
- Supports internationalization through translation function
- Renders nothing when items array is empty
- Proper semantic HTML structure with list elements for accessibility

**Item Types**: text-only labels, labels with navigation links, labels with action buttons, labels with info tooltips
**Layout Modes**: single item (inline), multiple items (bulleted list with header)
**Interactive Elements**: clickable links, actionable buttons, informational tooltips
**Styling**: Secondary background with warning icon, responsive design, proper spacing and typography

## Component Code

```tsx
export interface AlertItemLink {
  link: string;
  label: string;
}

export interface AlertItemButton {
  label: string;
  onClick: () => void;
}

export interface AlertItemInfo {
  render: React.ReactNode;
}

export interface AlertItem {
  label: string;
  link?: AlertItemLink;
  button?: AlertItemButton;
  info?: AlertItemInfo;
}

export interface AlertMultilineProps {
  className?: string;
  items?: AlertItem[];
  t?: (
    key: string,
    options?: Record<string, any>,
    defaultValue?: string
  ) => string;
}

export const AlertMultiline: React.FC<AlertMultilineProps> = ({
  className,
  items = [],
  t = tMockFn,
}) => {
  if (items.length === 0) {
    return null;
  }

  return (
    <div
      className={cn(
        "flex flex-col gap-y-3 rounded-xl bg-secondary-100 px-6 py-4",
        "text-xs font-medium leading-[1.2] text-neutral-900",
        className
      )}
    >
      {items.length > 1 ? (
        <>
          <div className="flex items-center gap-x-2">
            <IconComponent
              className="icon-stroke-warning-900"
              src="/icons/warning24.svg"
              size="medium"
            />
            <span className="capsize font-semibold">
              {t("AlertMultiline.notificationLabel", {}, "Pemberitahuan:")}
            </span>
          </div>

          <ul className="flex w-full list-disc flex-col gap-y-1 pl-10">
            {items.map((item, index) => {
              return (
                <li key={index}>
                  <div className="flex items-center gap-x-1">
                    <Item item={item} t={t} />
                  </div>
                </li>
              );
            })}
          </ul>
        </>
      ) : items.length === 1 ? (
        <div className="flex items-center gap-x-3">
          <IconComponent
            className="icon-stroke-warning-900"
            src="/icons/warning24.svg"
            size="medium"
          />

          <div className="flex items-center gap-x-1">
            <Item item={items[0]} t={t} />
          </div>
        </div>
      ) : null}
    </div>
  );
};

interface ItemProps {
  item: AlertItem;
  t: (
    key: string,
    options?: Record<string, any>,
    defaultValue?: string
  ) => string;
}

const Item: React.FC<ItemProps> = ({ item, t }) => {
  return (
    <>
      <span
        className="info-alert-content"
        dangerouslySetInnerHTML={{ __html: t(item.label) }}
      />

      {item.link ? (
        <Link
          className="text-xs font-medium text-primary-700"
          href={item.link.link}
        >
          {t(item.link.label)}
        </Link>
      ) : item.button ? (
        <button
          className="text-xs font-medium text-primary-700"
          onClick={item.button.onClick}
        >
          {t(item.button.label)}
        </button>
      ) : item.info ? (
        <InfoTooltip
          side="right"
          className="w-[336px]"
          appearance={{ iconClassName: "text-neutral-700" }}
        >
          {item.info.render}
        </InfoTooltip>
      ) : null}
    </>
  );
};
```

---

# Avatar

_Source: packages/ui/src/content/docs/components/Avatar/Avatar.mdx_

## Component Information

**Name:** Avatar

**Description:** Flexible avatar component that displays user images with automatic fallback to initials

## Imports

```javascript
import { useEffect, useState } from "react";

import { cn } from "@muatmuat/lib/utils";
import { Avatar } from "@muatmuat/ui/Avatar";

import { AvatarPreview } from "../../preview/Avatar.preview";
import { ImageComponent } from "../ImageComponent";
```

## Overview

**Description:** Flexible avatar component that displays user images with automatic fallback to initials

**Component:** Avatar

## Usage

<AvatarPreview />

```jsx

// Basic avatar with initials fallback
<Avatar name="John Doe" size={36} />

// Avatar with image and fallback to initials
<Avatar
  src="https://example.com/user-avatar.jpg"
  name="Sarah Johnson"
  size={48}
  alt="Sarah Johnson's profile"
/>

// Different sizes
<Avatar name="Small" size={24} />
<Avatar name="Medium" size={32} />
<Avatar name="Large" size={36} />
<Avatar name="Extra Large" size={48} />
```

## API Reference

### Props

| Prop       | Type               | Default                  | Description                                    |
| ---------- | ------------------ | ------------------------ | ---------------------------------------------- |
| src        | `string`           | `undefined`              | URL of the avatar image                        |
| name       | `string`           | `""`                     | User's full name for generating initials       |
| nameLength | `number`           | `1`                      | Number of characters to use for initials (1-3) |
| size       | `number`           | `36`                     | Size of the avatar in pixels                   |
| className  | `string`           | `""`                     | Additional CSS classes                         |
| appearance | `AvatarAppearance` | `{ labelClassName: "" }` | Appearance configuration for styling           |
| alt        | `string`           | `"avatar"`               | Alt text for the avatar image                  |

### Types

```typescript
interface AvatarAppearance {
  labelClassName?: string;
}

interface AvatarProps {
  src?: string;
  name?: string;
  nameLength?: number;
  size?: number;
  className?: string;
  appearance?: AvatarAppearance;
  alt?: string;
}
```

## Behavior

- Displays user images with automatic fallback to initials when images fail to load
- Responsive text sizing adjusts based on avatar size ranges
- Supports 1-3 character initials with intelligent name parsing
- Handles image loading errors gracefully with seamless fallback
- Maintains square aspect ratio and consistent styling across all sizes
- Automatic color assignment based on name hash for consistent visual identity

## Component Code

```tsx
interface AvatarAppearance {
  labelClassName?: string;
}

interface AvatarProps {
  src?: string;
  name?: string;
  nameLength?: number;
  size?: number;
  className?: string;
  appearance?: AvatarAppearance;
  alt?: string;
}

function initialsFromName(name: string, length: number = 1): string {
  if (!name) return "?";
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 1) return parts[0].slice(0, length).toUpperCase();
  return (parts[0][0] + (parts[1][0] || "")).toUpperCase();
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  name = "",
  nameLength = 1,
  size = 36,
  className = "",
  appearance = {
    labelClassName: "",
  },
  alt = "avatar",
}) => {
  const [imgFailed, setImgFailed] = useState(false);

  // reset when src changes
  useEffect(() => setImgFailed(false), [src]);

  const initials = initialsFromName(name, nameLength);

  // Map sizes to text classes based on ranges
  const getSizeClass = (size: number): string => {
    if (appearance.labelClassName) return appearance.labelClassName;
    if (size <= 24) return "text-xs";
    if (size <= 32) return "text-sm";
    if (size <= 48) return "text-base";
    return "text-base";
  };

  const baseWrapper = cn(
    "inline-flex flex-shrink-0 select-none items-center justify-center overflow-hidden rounded-full bg-primary-700",
    className
  );

  const textClass = cn(
    "font-semibold leading-none text-white",
    getSizeClass(size)
  );

  if (src && !imgFailed) {
    return (
      <ImageComponent
        src={src}
        alt={alt}
        width={size}
        height={size}
        className={cn(baseWrapper, "object-cover")}
        onError={() => setImgFailed(true)}
        unoptimized
      />
    );
  }

  return (
    <div
      className={cn(baseWrapper)}
      title={name}
      style={{
        width: size,
        height: size,
        minWidth: size,
        minHeight: size,
      }}
    >
      <span className={textClass}> {initials} </span>
    </div>
  );
};
```

---

# AvatarDriver

_Source: packages/ui/src/content/docs/components/Avatar/AvatarDriver.mdx_

## Component Information

**Name:** AvatarDriver

**Description:** Specialized avatar component for displaying driver information with photo, name, and license plate

## Imports

```javascript
import { cn } from "@muatmuat/lib/utils";
import { AvatarDriver } from "@muatmuat/ui/Avatar";

import { AvatarDriverPreview } from "../../preview/AvatarDriver.preview";
import { IconComponent } from "../IconComponent";
import { ImageComponent } from "../ImageComponent";
```

## Overview

**Description:** Specialized avatar component for displaying driver information with photo, name, and license plate

**Component:** AvatarDriver

## Usage

<AvatarDriverPreview />

```jsx

// Basic driver avatar
<AvatarDriver
  name="Ahmad Surya"
  image="https://example.com/driver-photo.jpg"
  licensePlate="B 1234 ABC"
  withIcon={true}
/>

// Driver avatar without transporter icon
<AvatarDriver
  name="Budi Santoso"
  image="https://example.com/driver2.jpg"
  licensePlate="D 5678 DEF"
  withIcon={false}
/>

// Custom styling
<AvatarDriver
  name="Featured Driver"
  image="https://example.com/driver3.jpg"
  licensePlate="B 9999 FEA"
  className="bg-neutral-50 p-3 rounded-lg"
  appearance={{
    nameClassName: "text-primary-700 font-bold",
    licensePlateClassName: "text-primary-600"
  }}
  withIcon={true}
/>
```

## API Reference

### Props

| Prop         | Type                     | Default  | Description                                                |
| ------------ | ------------------------ | -------- | ---------------------------------------------------------- |
| name         | `string`                 | Required | Driver's full name                                         |
| image        | `string`                 | Required | URL of the driver's profile image                          |
| licensePlate | `string`                 | Required | Vehicle license plate number                               |
| className    | `string`                 | `""`     | Additional CSS classes for the container                   |
| appearance   | `AvatarDriverAppearance` | `{}`     | Customization object for styling different parts           |
| withIcon     | `boolean`                | `true`   | Whether to show the transporter icon next to license plate |

### Types

```typescript
interface AvatarDriverAppearance {
  containerClassName?: string;
  photoClassName?: string;
  nameClassName?: string;
  licensePlateClassName?: string;
}

interface AvatarDriverProps {
  name: string;
  image: string;
  licensePlate: string;
  className?: string;
  appearance?: AvatarDriverAppearance;
  withIcon?: boolean;
}
```

## Behavior

- Displays driver information in a structured horizontal layout
- Fixed photo size (40px) with responsive text sizing for name and license plate
- Optional transporter icon provides visual context for vehicle information
- Supports responsive design with different text sizes on mobile vs desktop
- Customizable appearance allows fine-grained styling control
- Optimized for transportation and delivery applications

## Component Code

```tsx
interface AvatarDriverAppearance {
  containerClassName?: string;
  photoClassName?: string;
  nameClassName?: string;
  licensePlateClassName?: string;
}

interface AvatarDriverProps {
  name: string;
  image: string;
  licensePlate: string;
  className?: string;
  appearance?: AvatarDriverAppearance;
  withIcon?: boolean;
}

export const AvatarDriver: React.FC<AvatarDriverProps> = ({
  name,
  image,
  licensePlate,
  className,
  appearance = {
    containerClassName: "",
    photoClassName: "",
    nameClassName: "",
    licensePlateClassName: "",
  },
  withIcon = true,
}) => {
  return (
    <div
      className={cn("flex h-10 items-center gap-2 text-neutral-900", className)}
    >
      <ImageComponent
        src={image}
        alt={name}
        width={40}
        height={40}
        className={cn("rounded-full object-cover", appearance.photoClassName)}
        unoptimized
      />

      <div
        className={cn(
          "flex h-full flex-1 flex-col justify-between",
          appearance.containerClassName
        )}
      >
        <p
          className={cn(
            "text-base font-semibold md:text-sm md:font-bold",
            appearance.nameClassName
          )}
        >
          {name}
        </p>

        <div className="flex items-center gap-[2.5px]">
          {withIcon && (
            <IconComponent
              src="/icons/transporter16.svg"
              className="mb-[2px] text-muat-trans-secondary-900"
              width={12}
              height={12}
            />
          )}

          <span
            className={cn(
              "text-xs font-medium md:text-xxs",
              appearance.licensePlateClassName
            )}
          >
            {licensePlate}
          </span>
        </div>
      </div>
    </div>
  );
};
```

---

# BadgeStatus

_Source: packages/ui/src/content/docs/components/Badge/BadgeStatus.mdx_

## Component Information

**Name:** BadgeStatus

**Description:** Simple status badges with color variants for displaying states and categories

## Imports

```javascript
import React from "react";

import { cn } from "@muatmuat/lib/utils";
import { BadgeStatus } from "@muatmuat/ui/Badge";

import { BadgeStatusPreview } from "../../preview/BadgeStatus.preview";
```

## Overview

**Description:** Simple status badges with color variants for displaying states and categories

**Component:** BadgeStatus

## Usage

<BadgeStatusPreview />

```jsx

// Different status variants
<BadgeStatus variant="primary"> Active </BadgeStatus>
<BadgeStatus variant="success"> Completed </BadgeStatus>
<BadgeStatus variant="warning"> Pending </BadgeStatus>
<BadgeStatus variant="error"> Failed </BadgeStatus>
<BadgeStatus variant="neutral"> Inactive </BadgeStatus>
```

## API Reference

### Props

| Prop      | Type                                                                                      | Default     | Description                         |
| --------- | ----------------------------------------------------------------------------------------- | ----------- | ----------------------------------- |
| variant   | `primary \| success \| warning \| error \| neutral \| outlineSecondary \| outlineWarning` | `"neutral"` | Visual style variant of the badge   |
| children  | `React.ReactNode`                                                                         | Required    | Content to display inside the badge |
| className | `string`                                                                                  | `""`        | Additional CSS classes              |

### Types

```typescript
type BadgeStatusVariant =
  | "primary"
  | "success"
  | "warning"
  | "error"
  | "neutral"
  | "outlineSecondary"
  | "outlineWarning";

interface BadgeStatusProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeStatusVariant;
  className?: string;
  children: React.ReactNode;
}
```

## Behavior

- Displays contextual status information with semantic color coding
- Supports 7 color variants for different states and use cases
- Fully accessible with proper semantic HTML structure
- Responsive text sizing maintains readability across devices
- Variants: primary (blue), success (green), warning (yellow), error (red), neutral (gray), outlineSecondary (bordered), outlineWarning (bordered warning)

## Component Code

```tsx
type BadgeStatusVariant =
  | "primary"
  | "success"
  | "warning"
  | "error"
  | "neutral"
  | "outlineSecondary"
  | "outlineWarning";

interface BadgeStatusProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeStatusVariant;
  className?: string;
  children: React.ReactNode;
}

export const BadgeStatus: React.FC<BadgeStatusProps> = ({
  variant = "neutral",
  className,
  children,
  ...props
}) => {
  const variants = {
    primary: "bg-primary-50 text-primary-700 ",
    success: "bg-success-50 text-success-400 ",
    warning: "bg-warning-100 text-warning-900 ",
    error: "bg-error-50 text-error-400 ",
    neutral: "bg-neutral-200 text-neutral-600 ",
    outlineSecondary:
      "border border-neutral-900 bg-transparent text-neutral-900",
    outlineWarning: "border border-error-400 bg-transparent text-error-400",
  };

  return (
    <span
      className={cn(
        "inline-flex w-full items-center justify-center rounded-md px-3 py-1.5 text-xs font-semibold",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
```

---

# TagBubble

_Source: packages/ui/src/content/docs/components/Badge/TagBubble.mdx_

## Component Information

**Name:** TagBubble

**Description:** Interactive, removable tag bubbles for filter tags and selected items

## Imports

```javascript
import { useState } from "react";
import React from "react";

import { cn } from "@muatmuat/lib/utils";
import { TagBubble } from "@muatmuat/ui/Badge";
import { X } from "lucide-react";

import { TagBubblePreview } from "../../preview/TagBubble.preview";
```

## Overview

**Description:** Interactive, removable tag bubbles for filter tags and selected items

**Component:** TagBubble

## Usage

<TagBubblePreview />

```jsx
function FilterTags() {
  const [tags, setTags] = useState([
    "Electronics",
    "Price: $100-$500",
    "Rating: 4+",
  ]);

  const removeTag = (indexToRemove) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag, index) => (
        <TagBubble
          key={index}
          withRemove={{ onRemove: () => removeTag(index) }}
        >
          {tag}
        </TagBubble>
      ))}
    </div>
  );
}
```

## API Reference

### Props

| Prop       | Type                            | Default  | Description                                     |
| ---------- | ------------------------------- | -------- | ----------------------------------------------- |
| children   | `React.ReactNode`               | Required | Tag content to display                          |
| disabled   | `boolean`                       | `false`  | Whether the tag is disabled and non-interactive |
| withRemove | `TagBubbleRemoveConfig \| null` | `null`   | Configuration for remove button                 |
| className  | `string`                        | `""`     | Additional CSS classes                          |

### Types

```typescript
interface TagBubbleRemoveConfig {
  onRemove?: () => void;
}

interface TagBubbleProps {
  disabled?: boolean;
  className?: string;
  withRemove?: TagBubbleRemoveConfig | null;
  children: React.ReactNode;
}
```

## Behavior

- Interactive tag components with optional remove functionality
- Hover effects provide visual feedback for interactive elements
- Remove button appears when withRemove configuration is provided
- Responsive sizing adjusts text between mobile and desktop
- Supports disabled state for non-interactive display tags
- Maximum width of 204px with text truncation for long content

## Component Code

```tsx
interface TagBubbleRemoveConfig {
  onRemove?: () => void;
}

interface TagBubbleProps {
  disabled?: boolean;
  className?: string;
  withRemove?: TagBubbleRemoveConfig | null;
  children: React.ReactNode;
}

export const TagBubble: React.FC<TagBubbleProps> = ({
  disabled = false,
  className = "",
  withRemove = null,
  children,
}) => {
  return (
    <div
      className={cn(
        // 25. 18 - Web - LB - 0316
        "group box-border flex h-[30px] max-w-[204px] flex-row items-center gap-1 rounded-2xl border border-primary-700 bg-white px-3 py-1.5 text-primary-700 transition-colors duration-150 hover:bg-blue-50 md:h-7",
        className
      )}
    >
      {/* 25. 18 - Web - LB - 0316 */}
      <span className="leading-[1.1 ] flex-1 truncate text-sm font-medium md:text-xxs md:font-semibold md:leading-[13px]">
        {children}
      </span>
      {withRemove && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            withRemove?.onRemove?.();
          }}
          disabled={disabled}
          className={cn(
            "flex h-3.5 w-3.5 items-center justify-center rounded-full text-primary-700 transition-colors duration-150 hover:bg-primary-700 hover:text-white focus:outline-none focus:ring-1 focus:ring-primary-700 disabled:cursor-not-allowed"
          )}
        >
          <X size={14} strokeWidth={2.5} />
        </button>
      )}
    </div>
  );
};
```

---

# BannerCarousel

_Source: packages/ui/src/content/docs/components/BannerCarousel/BannerCarousel.mdx_

## Component Information

**Name:** BannerCarousel

**Description:** A responsive banner carousel with autoplay functionality, navigation controls, and smooth fade transitions.

## Imports

```javascript
import * as React from "react";
import { useCallback, useEffect, useRef, useState } from "react";

import { cn } from "@muatmuat/lib/utils";
import { BannerCarousel } from "@muatmuat/ui/BannerCarousel";

import { BannerCarouselPreview } from "../../preview/BannerCarousel.preview";
import { ImageComponent } from "../ImageComponent";
```

## Overview

**Description:** A responsive banner carousel with autoplay functionality, navigation controls, and smooth fade transitions.

**Component:** BannerCarousel

## Usage

<BannerCarouselPreview />

```jsx
function MarketingBanners() {
  const banners = [
    {
      id: 1,
      imageUrl: "/images/promo-1.jpg",
      altText: "Special promotion - 20% off",
      linkUrl: "/promotions/special-offer",
    },
    {
      id: 2,
      imageUrl: "/images/promo-2.jpg",
      altText: "New product launch",
      linkUrl: "/products/new",
    },
    {
      id: 3,
      imageUrl: "/images/promo-3.jpg",
      altText: "Free shipping this weekend",
      linkUrl: "/shipping/free-weekend",
    },
  ];

  return (
    <BannerCarousel
      banners={banners}
      autoplaySpeed={5000}
      showControls={true}
      showIndicators={true}
    />
  );
}
```

## API Reference

### Props

| Prop           | Type                   | Default | Description                                       |
| -------------- | ---------------------- | ------- | ------------------------------------------------- |
| className      | `string`               | -       | Additional CSS classes for the carousel container |
| banners        | `BannerCarouselItem[]` | -       | Array of banner objects to display (required)     |
| autoplaySpeed  | `number`               | 5000    | Autoplay interval in milliseconds (0 to disable)  |
| showControls   | `boolean`              | true    | Whether to show navigation arrow controls         |
| showIndicators | `boolean`              | true    | Whether to show dot indicators                    |

### BannerCarouselItem

| Property | Type     | Description                               |
| -------- | -------- | ----------------------------------------- | -------------------------------- |
| id       | `string  | number`                                   | Unique identifier for the banner |
| imageUrl | `string` | URL of the banner image                   |
| altText  | `string` | Alt text for accessibility                |
| linkUrl  | `string` | URL to navigate to when banner is clicked |

### Types

```typescript
interface BannerCarouselItem {
  id: string | number;
  imageUrl: string;
  altText?: string;
  linkUrl?: string;
}

interface BannerCarouselProps {
  className?: string;
  banners: BannerCarouselItem[];
  autoplaySpeed?: number;
  showControls?: boolean;
  showIndicators?: boolean;
}
```

## Behavior

- Automatically cycles through banner images with configurable timing
- Pauses autoplay on hover and resumes when mouse leaves
- Responsive design with different heights for mobile (146px) and desktop (250px)
- Smooth fade transitions between slides
- Navigation arrow controls that appear on hover
- Dot indicators for direct slide navigation
- Clickable banners that open external links in new tabs
- Accessibility support with proper ARIA labels and semantic HTML
- Proper image aspect ratio maintenance and object cover handling

**Variants**: with controls, without controls, with indicators, without indicators, autoplay disabled
**Sizes**: Responsive (146px height on mobile, 250px height on desktop, 1000px max width)

**Key Guidelines**:

- Use for promotional banners, featured content, or marketing campaigns
- Ensure all banner images have consistent aspect ratios for best visual results
- Provide descriptive alt text for accessibility and SEO benefits
- Include meaningful links that enhance user experience
- Consider content relevance when setting autoplay speed
- Test with various image sizes and formats for optimal performance

## Component Code

```tsx
export interface BannerCarouselItem {
  id: string | number;
  imageUrl: string;
  altText?: string;
  linkUrl?: string;
}

export interface BannerCarouselProps {
  className?: string;
  banners: BannerCarouselItem[];
  autoplaySpeed?: number;
  showControls?: boolean;
  showIndicators?: boolean;
}

/**
 * BannerCarousel component for displaying a series of banner images with optional navigation controls and autoplay functionality.
 *
 * Features:
 * - Responsive design (146px mobile, 250px desktop height)
 * - Automatic slideshow with configurable timing
 * - Hover to pause autoplay functionality
 * - Navigation arrow controls (appear on hover)
 * - Dot indicators for direct slide navigation
 * - Smooth fade transitions between slides
 * - Accessibility support with ARIA labels
 * - Clickable banners with external link support
 */
export const BannerCarousel: React.FC<BannerCarouselProps> = ({
  className,
  banners,
  autoplaySpeed = 5000,
  showControls = true,
  showIndicators = true,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const autoplayTimerRef = useRef<any>(null);

  const totalBanners = banners.length;

  // Stable callback for goToNext
  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalBanners);
  }, [totalBanners]);

  const goToPrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + totalBanners) % totalBanners
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Setup autoplay (best practice)
  useEffect(() => {
    if (autoplaySpeed > 0) {
      autoplayTimerRef.current = setInterval(goToNext, autoplaySpeed);
    }
    return () => {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current);
        autoplayTimerRef.current = null;
      }
    };
  }, [autoplaySpeed, goToNext]);

  // Pause on hover
  const handleMouseEnter = () => {
    if (autoplayTimerRef.current) {
      clearInterval(autoplayTimerRef.current);
      autoplayTimerRef.current = null;
    }
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (autoplaySpeed > 0 && !autoplayTimerRef.current) {
      autoplayTimerRef.current = setInterval(goToNext, autoplaySpeed);
    }
    setIsHovered(false);
  };

  return (
    <div
      className={cn(
        "relative mx-auto h-[146px] bg-background md:h-[250px] md:w-[1054px]",
        className
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative mx-auto h-[146px] w-full overflow-hidden md:h-[250px] md:w-[1000px] md:rounded-xl">
        {banners.map((banner, index) => (
          <a
            key={banner.id}
            href={banner.linkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`absolute left-0 top-0 h-full w-full cursor-pointer transition-opacity duration-500 ${
              index === currentIndex ? "z-0 opacity-100" : "-z-10 opacity-0"
            }`}
          >
            <ImageComponent
              src={banner.imageUrl}
              alt={banner.altText || "Banner image"}
              className="h-full w-full object-cover"
              unoptimized
            />
          </a>
        ))}
      </div>

      {/* Navigation Controls */}
      {showControls && (
        <div
          className={cn(
            "pointer-events-none absolute bottom-[42%] left-0 right-0 top-[42%] flex justify-between transition-opacity duration-500",
            !isHovered && "opacity-0"
          )}
        >
          <button
            className="pointer-events-auto z-10 flex size-[40px] items-center justify-center rounded-full bg-white shadow-lg"
            onClick={goToPrev}
          >
            <ImageComponent
              src="/icons/chevron-left16-2.svg"
              width={9}
              height={16}
              alt="Previous banner"
              className=""
            />
          </button>
          <button
            onClick={goToNext}
            className="pointer-events-auto z-10 flex h-[40px] w-[40px] items-center justify-center rounded-full bg-white shadow-lg"
            aria-label="Next banner"
          >
            <ImageComponent
              src="/icons/chevron-right16-2.svg"
              width={9}
              height={16}
              alt="Next banner"
              className=""
            />
          </button>
        </div>
      )}

      {/* Indicator Dots */}
      {showIndicators && (
        <div className="absolute bottom-1 left-1/2 flex -translate-x-1/2 transform gap-[8px] p-3">
          {banners.map((banner, index) => (
            <button
              key={banner.id}
              onClick={() => goToSlide(index)}
              className={`h-[8px] ${
                index === currentIndex
                  ? "w-[32px] rounded-[14px] bg-white"
                  : "w-[8px] rounded-full bg-white"
              }`}
              aria-label={`Go to banner ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};
```

---

# BottomSheet

_Source: packages/ui/src/content/docs/components/BottomSheet/BottomSheet.mdx_

## Component Information

**Name:** BottomSheet

**Description:** A responsive, accessible bottom sheet component built on Vaul with smooth animations and gesture support

## Imports

```javascript
import * as React from "react";

import { cn } from "@muatmuat/lib/utils";
import { Drawer as BottomSheetPrimitive } from "vaul";

import { BottomSheetPreview } from "../../preview/BottomSheet.preview";
import { IconComponent } from "../IconComponent";
```

## Overview

**Description:** A responsive, accessible bottom sheet component built on Vaul with smooth animations and gesture support

**Component:** BottomSheet

## Usage

<BottomSheetPreview />

```jsx
import {
  BottomSheet,
  BottomSheetClose,
  BottomSheetContent,
  BottomSheetFooter,
  BottomSheetHeader,
  BottomSheetTitle,
  BottomSheetTrigger,
} from "@muatmuat/ui/BottomSheet";

function Example() {
  return (
    <BottomSheet>
      <BottomSheetTrigger asChild>
        <button> Open Bottom Sheet </button>
      </BottomSheetTrigger>
      <BottomSheetContent>
        <BottomSheetHeader>
          <BottomSheetTitle> Welcome to Bottom Sheet </BottomSheetTitle>
          <BottomSheetClose />
        </BottomSheetHeader>
        <div className="flex-1 p-4">
          <p className="text-neutral-600">
            This is a basic bottom sheet with a title, close button, and some
            content. You can swipe down or click the backdrop to dismiss it.
          </p>
        </div>
      </BottomSheetContent>
    </BottomSheet>
  );
}
```

## API Reference

### Props

#### BottomSheet

| Prop                         | Type                      | Default | Description                                                        |
| ---------------------------- | ------------------------- | ------- | ------------------------------------------------------------------ |
| children                     | `React.ReactNode`         | -       | Child elements                                                     |
| open                         | `boolean`                 | -       | Controlled open state                                              |
| onOpenChange                 | `(open: boolean) => void` | -       | Callback when open state changes                                   |
| shouldCloseOnInteractOutside | `(event: any) => boolean` | -       | Function to determine if sheet should close on outside interaction |

#### BottomSheetTrigger

| Prop     | Type              | Default | Description                        |
| -------- | ----------------- | ------- | ---------------------------------- |
| asChild  | `boolean`         | `false` | Whether to render as child element |
| children | `React.ReactNode` | -       | Trigger element content            |

#### BottomSheetContent

| Prop      | Type              | Default | Description            |
| --------- | ----------------- | ------- | ---------------------- |
| className | `string`          | -       | Additional CSS classes |
| children  | `React.ReactNode` | -       | Content elements       |

#### BottomSheetHeader

| Prop      | Type              | Default | Description            |
| --------- | ----------------- | ------- | ---------------------- |
| className | `string`          | -       | Additional CSS classes |
| children  | `React.ReactNode` | -       | Header content         |

#### BottomSheetTitle

| Prop      | Type              | Default | Description            |
| --------- | ----------------- | ------- | ---------------------- |
| className | `string`          | -       | Additional CSS classes |
| children  | `React.ReactNode` | -       | Title text             |

#### BottomSheetClose

| Prop       | Type     | Default   | Description            |
| ---------- | -------- | --------- | ---------------------- |
| className  | `string` | -         | Additional CSS classes |
| aria-label | `string` | `"Close"` | Accessibility label    |

#### BottomSheetFooter

| Prop      | Type              | Default | Description            |
| --------- | ----------------- | ------- | ---------------------- |
| className | `string`          | -       | Additional CSS classes |
| children  | `React.ReactNode` | -       | Footer content         |

### Types

```typescript
export interface BottomSheetProps
  extends Omit<
    React.ComponentProps<typeof BottomSheetPrimitive.Root>,
    "children" | "fadeFromIndex"
  > {
  children?: React.ReactNode;
}

export interface BottomSheetTriggerProps
  extends Omit<
    React.ComponentProps<typeof BottomSheetPrimitive.Trigger>,
    "children"
  > {
  children?: React.ReactNode;
}

export interface BottomSheetContentProps
  extends React.ComponentProps<typeof BottomSheetPrimitive.Content> {
  className?: string;
  children: React.ReactNode;
}

export interface BottomSheetHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
}

export interface BottomSheetTitleProps
  extends React.ComponentProps<typeof BottomSheetPrimitive.Title> {
  className?: string;
}

export interface BottomSheetCloseProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export interface BottomSheetFooterProps
  extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}
```

## Behavior

- Displays content that slides up from the bottom of the screen with smooth animations
- Supports gesture interactions including swipe-to-dismiss and drag handle
- Automatically manages focus and accessibility with proper ARIA support
- Renders content in a portal for proper layering above other elements
- Includes backdrop overlay with click-to-dismiss functionality
- Responsive design that adapts to different screen sizes
- Maximum height limited to 75% of viewport on mobile devices
- Proper keyboard navigation including Escape key to close

**Variants**: Standard bottom sheet with customizable header, content, and footer sections
**Sizes**: Responsive height based on content, max 75vh on mobile
**Key Guidelines**: Use for mobile-first interfaces, progressive disclosure, forms, settings, action sheets, and filtering controls

## Component Code

```tsx
export interface BottomSheetProps
  extends Omit<
    React.ComponentProps<typeof BottomSheetPrimitive.Root>,
    "children" | "fadeFromIndex"
  > {
  children?: React.ReactNode;
}

export interface BottomSheetTriggerProps
  extends Omit<
    React.ComponentProps<typeof BottomSheetPrimitive.Trigger>,
    "children"
  > {
  children?: React.ReactNode;
}

export interface BottomSheetContentProps
  extends React.ComponentProps<typeof BottomSheetPrimitive.Content> {
  className?: string;
  children: React.ReactNode;
}

export interface BottomSheetHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
}

export interface BottomSheetTitleProps
  extends React.ComponentProps<typeof BottomSheetPrimitive.Title> {
  className?: string;
}

export interface BottomSheetCloseProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export interface BottomSheetFooterProps
  extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const BottomSheet: React.FC<BottomSheetProps> = (props) => (
  <BottomSheetPrimitive.Root {...props} />
);

export const BottomSheetTrigger: React.FC<BottomSheetTriggerProps> = (
  props
) => <BottomSheetPrimitive.Trigger {...props} />;

const BottomSheetContentImplementation: React.ForwardRefRenderFunction<
  HTMLDivElement,
  BottomSheetContentProps
> = (props, ref) => {
  const { className, children, ...otherProps } = props;

  return (
    <BottomSheetPrimitive.Portal>
      <BottomSheetPrimitive.Overlay
        data-stack-item="true"
        className="fixed inset-0 z-50 bg-black/30"
      />
      <BottomSheetPrimitive.Content
        ref={ref}
        data-stack-content="true"
        className={cn(
          "fixed bottom-0 left-0 right-0 z-50 mt-24 flex h-auto max-h-[75dvh] flex-col rounded-t-[16px] bg-white",
          className
        )}
        {...otherProps}
      >
        <div className="mx-auto mt-1 h-1 w-12 flex-shrink-0 rounded-full bg-neutral-300" />
        {children}
      </BottomSheetPrimitive.Content>
    </BottomSheetPrimitive.Portal>
  );
};

export const BottomSheetContent = React.forwardRef(
  BottomSheetContentImplementation
);
BottomSheetContent.displayName = "BottomSheetContent";

export const BottomSheetHeader: React.FC<BottomSheetHeaderProps> = ({
  className,
  children,
  ...props
}) => (
  <div
    className={cn(
      "relative flex min-h-[72px] w-full items-center p-4 pb-6 text-center",
      className
    )}
    {...props}
  >
    {children}
  </div>
);
BottomSheetHeader.displayName = "BottomSheetHeader";

const BottomSheetTitleImplementation: React.ForwardRefRenderFunction<
  HTMLHeadingElement,
  BottomSheetTitleProps
> = (props, ref) => {
  const { className, ...otherProps } = props;

  return (
    <BottomSheetPrimitive.Title
      ref={ref}
      className={cn(
        "absolute left-1/2 -translate-x-1/2 text-sm font-bold leading-[1.1] text-neutral-900",
        className
      )}
      {...otherProps}
    />
  );
};

export const BottomSheetTitle = React.forwardRef(
  BottomSheetTitleImplementation
);
BottomSheetTitle.displayName = "BottomSheetTitle";

export const BottomSheetClose: React.FC<BottomSheetCloseProps> = ({
  className,
}) => (
  <BottomSheetPrimitive.Close asChild>
    <button type="button" className={cn("", className)} aria-label="Close">
      <IconComponent
        src="/icons/close24.svg"
        className="h-6 w-6 text-primary-600"
        title="Close"
      />
    </button>
  </BottomSheetPrimitive.Close>
);
BottomSheetClose.displayName = "BottomSheetClose";

export const BottomSheetFooter: React.FC<BottomSheetFooterProps> = ({
  className,
  ...props
}) => <div className={cn("mt-auto w-full p-4 pb-6", className)} {...props} />;
BottomSheetFooter.displayName = "BottomSheetFooter";
```

---

# InfoBottomsheet

_Source: packages/ui/src/content/docs/components/BottomSheet/InfoBottomsheet.mdx_

## Component Information

**Name:** InfoBottomsheet

**Description:** A specialized bottom sheet component for displaying informational content with clean, accessible interface

## Imports

```javascript
import React from "react";

import { cn } from "@muatmuat/lib/utils";
import { InfoBottomsheet } from "@muatmuat/ui/BottomSheet";

import { InfoBottomsheetPreview } from "../../preview/InfoBottomsheet.preview";
import { IconComponent } from "../IconComponent";
```

## Overview

**Description:** A specialized bottom sheet component for displaying informational content with clean, accessible interface

**Component:** InfoBottomsheet

## Usage

<InfoBottomsheetPreview />

```jsx
function Example() {
  return (
    <div className="space-y-4">
      {/* Text content */}
      <InfoBottomsheet title="Help Information">
        This is helpful information that explains how to use this feature.
      </InfoBottomsheet>

      {/* HTML content */}
      <InfoBottomsheet
        title="Rich Content"
        render=" <p> This supports <strong> HTML </strong> content! </p> "
      />

      {/* In form context */}
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium"> Account Type </label>
        <InfoBottomsheet title="Account Types">
          Choose between Personal and Business accounts. Personal accounts are
          for individual use, while Business accounts provide additional
          features for organizations.
        </InfoBottomsheet>
      </div>
    </div>
  );
}
```

## API Reference

### Props

| Prop      | Type              | Default | Description                                                                          |
| --------- | ----------------- | ------- | ------------------------------------------------------------------------------------ |
| className | `string`          | -       | Additional CSS classes for styling the trigger icon                                  |
| title     | `string`          | -       | Title displayed in the bottom sheet header                                           |
| children  | `React.ReactNode` | -       | Plain text content to display (used when render prop is not provided)                |
| render    | `string`          | -       | HTML string to render using dangerouslySetInnerHTML (takes precedence over children) |

### Types

```typescript
export interface InfoBottomsheetProps {
  className?: string;
  title: string;
  children?: React.ReactNode;
  render?: string;
}
```

## Behavior

- Displays informational content in a clean bottom sheet modal
- Uses minimal info icon trigger that doesn't disrupt design
- Supports both plain text and HTML content rendering
- Automatically manages accessibility with proper ARIA support
- Mobile optimized bottom sheet behavior with smooth animations
- Consistent styling with other components in the design system
- Flexible trigger icon styling through className prop
- Proper keyboard navigation and screen reader support

**Variants**: Standard info bottom sheet with text or HTML content modes
**Sizes**: Responsive bottom sheet with auto height based on content
**Key Guidelines**: Perfect for help documentation, contextual information, terms and conditions, feature explanations, FAQ content, and rich formatted content

## Component Code

```tsx
import {
  BottomSheet,
  BottomSheetClose,
  BottomSheetContent,
  BottomSheetHeader,
  BottomSheetTitle,
  BottomSheetTrigger,
} from "@muatmuat/ui/BottomSheet";

export interface InfoBottomsheetProps {
  className?: string;
  title: string;
  children?: React.ReactNode;
  render?: string;
}

export const InfoBottomsheet: React.FC<InfoBottomsheetProps> = ({
  className,
  title,
  children,
  render,
}) => {
  return (
    <BottomSheet>
      <BottomSheetTrigger
        className={cn("block size-4 text-neutral-700", className)}
      >
        <IconComponent src="/icons/info16.svg" width={16} height={16} />
      </BottomSheetTrigger>
      <BottomSheetContent>
        <BottomSheetHeader>
          <BottomSheetClose />
          <BottomSheetTitle> {title} </BottomSheetTitle>
        </BottomSheetHeader>
        {render ? (
          <div
            className="info-bottomsheet-content px-4 pb-6 text-sm font-medium leading-[1.1]"
            dangerouslySetInnerHTML={{ __html: render }}
          />
        ) : (
          <div className="info-bottomsheet-content px-4 py-6 text-sm font-medium leading-[1.1]">
            {children}
          </div>
        )}
      </BottomSheetContent>
    </BottomSheet>
  );
};
```

---

# RadioBottomsheet

_Source: packages/ui/src/content/docs/components/BottomSheet/RadioBottomsheet.mdx_

## Component Information

**Name:** RadioBottomsheet

**Description:** A bottom sheet component with radio button selection for choosing from predefined options

## Imports

```javascript
import { RadioBottomsheetPreview } from "../../preview/RadioBottomsheet.preview";

import { useState } from "react";

import RadioBottomsheet from "@muatmuat/ui/BottomSheet/RadioBottomsheet";

import { useEffect, useState } from "react";

import { usePrevious } from "@muatmuat/hooks/use-previous";
import { cn } from "@muatmuat/lib/utils";

import { Button } from "../Button";
import { IconComponent } from "../IconComponent";
import { RadioButton } from "../Radio";
```

## Overview

**Description:** A bottom sheet component with radio button selection for choosing from predefined options

**Component:** RadioBottomsheet

## Usage

<RadioBottomsheetPreview />

```jsx
function Example() {
  const [selectedValue, setSelectedValue] = useState("option1");

  const options = [
    { label: "Active Status", value: "active" },
    { label: "Inactive Status", value: "inactive" },
    { label: "Pending Status", value: "pending" },
    { label: "Completed Status", value: "completed" },
  ];

  return (
    <RadioBottomsheet
      title="Select Status"
      options={options}
      value={selectedValue}
      onChange={setSelectedValue}
      saveLabel="Apply Selection"
      placeHolder="Choose status..."
    />
  );
}
```

## API Reference

### Props

| Prop        | Type                      | Default    | Description                                           |
| ----------- | ------------------------- | ---------- | ----------------------------------------------------- |
| className   | `string`                  | -          | Additional CSS classes for styling the trigger button |
| title       | `string`                  | -          | Title displayed in the bottom sheet header            |
| options     | `RadioOption[]`           | `[]`       | Array of radio button options to display              |
| value       | `string`                  | -          | Currently selected option value                       |
| onChange    | `(value: string) => void` | `() => {}` | Callback fired when selection changes                 |
| saveLabel   | `string`                  | -          | Text for the save/apply button                        |
| placeHolder | `string`                  | -          | Placeholder text shown when no option is selected     |
| disabled    | `boolean`                 | `false`    | Whether the component is disabled                     |

### Types

```typescript
export interface RadioOption {
  label: string;
  value: string;
}

export interface RadioBottomsheetProps {
  className?: string;
  title?: string;
  options?: RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  saveLabel?: string;
  placeHolder?: string;
  disabled?: boolean;
}
```

## Behavior

- Displays a dropdown-style trigger that opens a bottom sheet with radio button options
- Manages selection state with temporary value that only applies when save button is clicked
- Shows selected option in trigger button with proper placeholder fallback
- Supports disabled state with visual styling changes
- Automatically handles bottom sheet open/close state management
- Provides save/confirm button to apply selection changes
- Each option displays with radio button and label in a clean list format
- Responsive design optimized for mobile bottom sheet interactions

**Variants**: Standard radio selection bottom sheet with customizable trigger styling
**Sizes**: Fixed trigger height (32px) with scrollable bottom sheet content
**Key Guidelines**: Use for single choice selection from 3-8 options, status selection, filtering choices, and settings configuration

## Component Code

```tsx
import {
  BottomSheet,
  BottomSheetClose,
  BottomSheetContent,
  BottomSheetFooter,
  BottomSheetHeader,
  BottomSheetTitle,
} from "@muatmuat/ui/BottomSheet";

export interface RadioOption {
  label: string;
  value: string;
}

export interface RadioBottomsheetProps {
  className?: string;
  title?: string;
  options?: RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  saveLabel?: string;
  placeHolder?: string;
  disabled?: boolean;
}

export const RadioBottomsheet: React.FC<RadioBottomsheetProps> = ({
  className,
  title,
  options = [],
  value,
  onChange = () => {},
  saveLabel,
  placeHolder,
  disabled,
}) => {
  const [tempValue, setTempValue] = useState("");
  const [isBottomsheetOpen, setIsBottomsheetOpen] = useState(false);
  const previousIsBottomsheetOpen = usePrevious(isBottomsheetOpen);

  useEffect(() => {
    if (isBottomsheetOpen && !previousIsBottomsheetOpen) {
      setTempValue(value);
    }
  }, [isBottomsheetOpen, previousIsBottomsheetOpen, value]);

  const handleSelectOption = () => {
    onChange(tempValue);
    setIsBottomsheetOpen(false);
  };

  const selectedItem = options.find((item) => item.value === value);

  return (
    <BottomSheet open={isBottomsheetOpen} onOpenChange={setIsBottomsheetOpen}>
      <button
        className={cn(
          "flex h-8 min-w-[65px] items-center justify-between rounded-md border border-neutral-600 bg-neutral-50 px-2",
          disabled
            ? "cursor-not-allowed border-neutral-600 bg-neutral-200 hover:border-neutral-600"
            : "cursor-pointer",
          className
        )}
        onClick={() => {
          setIsBottomsheetOpen(true);
        }}
        disabled={disabled}
      >
        <span
          className={cn(
            "text-sm font-semibold leading-[15.4px]",
            disabled ? "text-neutral-600" : "text-neutral-900"
          )}
        >
          {selectedItem?.label ?? placeHolder ?? ""}
        </span>
        <IconComponent
          src="/icons/chevron-down.svg"
          className="text-neutral-700"
        />
      </button>
      <BottomSheetContent>
        <BottomSheetHeader>
          <BottomSheetClose />
          <BottomSheetTitle> {title} </BottomSheetTitle>
        </BottomSheetHeader>
        <div className="flex flex-col gap-y-4 px-4">
          {options.map((option, key) => {
            const isLastItem = options.length - 1 === key;
            return (
              <div
                className={`${isLastItem ? "" : "border-b border-b-neutral-400 pb-4"} flex justify-between`}
                key={key}
              >
                <span className="text-sm font-semibold leading-[15.4px] text-neutral-900">
                  {option.label}
                </span>
                <RadioButton
                  name={title}
                  value={option.value}
                  checked={tempValue === option.value}
                  onClick={(data) => setTempValue(data.value)}
                />
              </div>
            );
          })}
        </div>
        <BottomSheetFooter>
          <Button
            className="h-10 w-full"
            variant="muatparts-primary"
            onClick={handleSelectOption}
          >
            {saveLabel}
          </Button>
        </BottomSheetFooter>
      </BottomSheetContent>
    </BottomSheet>
  );
};
```

---

# Breadcrumb

_Source: packages/ui/src/content/docs/components/Breadcrumb/Breadcrumb.mdx_

## Component Information

**Name:** Breadcrumb

**Description:** Navigation component that shows current page location within hierarchical structure

## Imports

```javascript
import Link from "next/link";
import React from "react";

import { cn } from "@muatmuat/lib/utils";
import { Breadcrumb } from "@muatmuat/ui/Breadcrumb";

import { BreadcrumbPreview } from "../../preview/Breadcrumb.preview";
import { IconComponent } from "../IconComponent";
```

## Overview

**Description:** Navigation component that shows current page location within hierarchical structure

**Component:** Breadcrumb

## Usage

<BreadcrumbPreview />

```jsx

// Basic breadcrumb navigation
const breadcrumbData = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/products" },
  { name: "Electronics", href: "/products/electronics" },
  { name: "Current Page" }
];

<Breadcrumb data={breadcrumbData} />

// With truncation for long paths
<Breadcrumb
  data={longBreadcrumbData}
  maxWidth={120}
  className="bg-neutral-50 p-2 rounded"
/>

// Disabled interactions
<Breadcrumb
  data={breadcrumbData}
  disableClick={true}
  disableActive={true}
/>
```

## API Reference

### Props

| Prop          | Type               | Default     | Description                                            |
| ------------- | ------------------ | ----------- | ------------------------------------------------------ |
| data          | `BreadcrumbItem[]` | `[]`        | Array of breadcrumb items to display                   |
| className     | `string`           | `""`        | Additional CSS classes for the breadcrumb container    |
| disableActive | `boolean`          | `false`     | Disable active state styling for current page          |
| disableClick  | `boolean`          | `false`     | Disable click interactions for all items               |
| maxWidth      | `number`           | `undefined` | Maximum width in pixels for items (enables truncation) |

### Types

```typescript
interface BreadcrumbItem {
  name: string;
  href?: string;
}

interface BreadcrumbProps {
  data?: BreadcrumbItem[];
  className?: string;
  disableActive?: boolean;
  disableClick?: boolean;
  maxWidth?: number;
}
```

## Behavior

- Displays hierarchical navigation path with automatic chevron separators
- Smart linking with Next.js Link component for internal navigation
- Responsive design with text truncation for long breadcrumb items
- Active state highlighting for the current page (last item)
- Accessibility-friendly semantic structure with proper ARIA labels
- Supports disabling of click interactions and active state styling
- Automatic overflow handling with text ellipsis when maxWidth is specified

## Component Code

```tsx
export interface BreadcrumbItem {
  name: string;
  href?: string;
}

export interface BreadcrumbProps {
  data?: BreadcrumbItem[];
  className?: string;
  disableActive?: boolean;
  disableClick?: boolean;
  maxWidth?: number;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  data = [],
  className,
  disableActive = false,
  disableClick = false,
  maxWidth,
}) => {
  const getItemClasses = (idx: number) =>
    cn(
      "text-xs font-medium capitalize text-neutral-600",
      "hover:text-primary-700",
      idx === data.length - 1
        ? "!max-w-none"
        : "overflow-hidden text-ellipsis whitespace-nowrap",
      !disableActive && idx === data.length - 1 && "text-primary-700",
      !disableClick && idx !== data.length - 1 && "cursor-pointer"
    );

  return (
    <div className={cn("flex items-center gap-[5px]", className)}>
      {data?.map((val, idx) => (
        <div className="flex items-center gap-[5px]" key={idx}>
          {val.href ? (
            <Link href={val.href} className={getItemClasses(idx)}>
              {val.name}
            </Link>
          ) : (
            <div
              style={{ maxWidth: maxWidth ? `${maxWidth}px` : "" }}
              className={getItemClasses(idx)}
            >
              {val.name}
            </div>
          )}
          {idx !== data.length - 1 && (
            <IconComponent
              src="/icons/chevron-right.svg"
              className="[&> path]:stroke-[2px]"
            />
          )}
        </div>
      ))}
    </div>
  );
};
```

---

# Button

_Source: packages/ui/src/content/docs/components/Button/Button.mdx_

## Component Information

**Name:** Button

**Description:** Versatile button component with comprehensive variant support for MuatTrans and MuatParts applications

## Imports

```javascript
import React from "react";

import { cn } from "@muatmuat/lib/utils";
import { Button } from "@muatmuat/ui/Button";
import { cva } from "class-variance-authority";

import { ButtonPreview } from "../../preview/Button.preview";
import { IconComponent } from "../IconComponent";
```

## Overview

**Description:** Versatile button component with comprehensive variant support for MuatTrans and MuatParts applications

**Component:** Button

## Usage

<ButtonPreview />

```jsx

// Basic buttons
<Button> Primary Action </Button>
<Button variant="muattrans-outline-primary"> Secondary </Button>
<Button variant="muattrans-error"> Delete </Button>

// Buttons with icons
<Button iconLeft="/icons/add.svg"> Add Item </Button>
<Button iconRight="/icons/arrow-right.svg"> Continue </Button>

// Disabled states
<Button disabled> Disabled Button </Button>
<Button disabled keepDisabledStyle> Styled but Disabled </Button>

// Link variant
<Button variant="link" iconLeft="/icons/back.svg"> Go Back </Button>
```

## API Reference

### Props

| Prop              | Type                         | Default                 | Description                                       |
| ----------------- | ---------------------------- | ----------------------- | ------------------------------------------------- |
| variant           | `ButtonVariant`              | `"muattrans-primary"`   | Visual style variant of the button                |
| children          | `React.ReactNode`            | `"Button"`              | Content to display inside the button              |
| className         | `string`                     | `""`                    | Additional CSS classes                            |
| iconLeft          | `string \| React.ReactNode`  | `null`                  | Icon to display on the left side                  |
| iconRight         | `string \| React.ReactNode`  | `null`                  | Icon to display on the right side                 |
| disabled          | `boolean`                    | `false`                 | Whether the button is disabled                    |
| keepDisabledStyle | `boolean`                    | `false`                 | Whether to maintain variant styling when disabled |
| appearance        | `{ iconClassName?: string }` | `{ iconClassName: "" }` | Icon appearance configuration                     |

### Types

```typescript
export type ButtonVariant =
  | "muattrans-primary"
  | "muattrans-outline-primary"
  | "muattrans-primary-secondary"
  | "muattrans-error"
  | "muattrans-error-secondary"
  | "muattrans-warning"
  | "muatparts-primary"
  | "muatparts-primary-secondary"
  | "muatparts-error"
  | "muatparts-error-secondary"
  | "muatparts-warning"
  | "link";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children?: React.ReactNode;
  className?: string;
  iconLeft?: string | React.ReactNode;
  iconRight?: string | React.ReactNode;
  disabled?: boolean;
  keepDisabledStyle?: boolean;
  appearance?: {
    iconClassName?: string;
  };
}
```

## Behavior

- Supports 12 variants across MuatTrans and MuatParts brand systems
- Responsive sizing: 40px height on mobile, 32px on desktop
- Automatic icon color management based on variant
- Disabled states with appropriate styling and accessibility
- Link variant for navigation-style buttons without background
- Icon support for both string paths and React nodes
- Semantic HTML button element with proper accessibility attributes

**MuatTrans Variants**: primary (yellow), outline-primary (neutral border), primary-secondary (blue border), error (red), error-secondary (red border), warning (orange)

**MuatParts Variants**: primary (blue), primary-secondary (blue border), error (red), error-secondary (red border), warning (orange)

## Component Code

```tsx
export type ButtonVariant =
  | "muattrans-primary"
  | "muattrans-outline-primary"
  | "muattrans-primary-secondary"
  | "muattrans-error"
  | "muattrans-error-secondary"
  | "muattrans-warning"
  | "muatparts-primary"
  | "muatparts-primary-secondary"
  | "muatparts-error"
  | "muatparts-error-secondary"
  | "muatparts-warning"
  | "link";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children?: React.ReactNode;
  className?: string;
  iconLeft?: string | React.ReactNode;
  iconRight?: string | React.ReactNode;
  disabled?: boolean;
  keepDisabledStyle?: boolean;
  appearance?: {
    iconClassName?: string;
  };
}

const buttonVariants = cva(
  "flex h-10 flex-shrink-0 items-center justify-center gap-1 rounded-[24px] py-3 text-sm font-semibold leading-[16.8px] transition-colors md:h-8 md:px-6",
  {
    variants: {
      variant: {
        "muattrans-primary":
          "bg-[--muat-trans-primary-400] text-neutral-900 hover:bg-[--muat-trans-primary-500]",
        "muattrans-outline-primary":
          "border border-neutral-900 bg-neutral-50 text-neutral-900",
        "muattrans-primary-secondary":
          "border border-[--muat-trans-secondary-900] bg-neutral-50 text-[--muat-trans-secondary-900] hover:bg-[--muat-trans-secondary-50]",
        "muattrans-error": "bg-error-400 text-neutral-50 hover:bg-error-600",
        "muattrans-error-secondary":
          "border border-error-400 bg-neutral-50 text-error-400 hover:bg-error-50",
        "muattrans-warning":
          "bg-secondary-500 text-primary-700 hover:bg-secondary-300",
        "muatparts-primary":
          "bg-primary-700 text-neutral-50 hover:bg-primary-800",
        "muatparts-primary-secondary":
          "border border-primary-700 bg-neutral-50 text-primary-700 hover:bg-primary-50",
        "muatparts-error": "bg-error-400 text-neutral-50 hover:bg-error-600",
        "muatparts-error-secondary":
          "border border-error-400 bg-neutral-50 text-error-400 hover:bg-error-50",
        "muatparts-warning":
          "bg-secondary-500 text-primary-700 hover:bg-secondary-300",
        link: "border-0 bg-transparent p-0 px-0 font-medium text-primary-700 no-underline hover:text-primary-800 md:h-[14px] md:px-0",
        unknown: "bg-neutral-200 text-neutral-900",
      },
      disabled: {
        true: "cursor-not-allowed bg-neutral-200 text-neutral-600 hover:bg-neutral-200",
        "true-secondary":
          "cursor-not-allowed border border-neutral-600 bg-neutral-200 text-neutral-600 hover:bg-neutral-200",
      },
    },
    defaultVariants: {
      variant: "muattrans-primary",
      disabled: false,
    },
  }
);

const iconColorVariants: Record<ButtonVariant, string> = {
  "muattrans-primary": "text-neutral-900",
  "muattrans-outline-primary": "text-neutral-900",
  "muattrans-primary-secondary": "text-muat-trans-secondary-900",
  "muattrans-error": "text-white",
  "muattrans-error-secondary": "text-error-400",
  "muattrans-warning": "text-primary-700",
  "muatparts-primary": "text-white",
  "muatparts-primary-secondary": "text-primary-700",
  "muatparts-error": "text-white",
  "muatparts-error-secondary": "text-error-400",
  "muatparts-warning": "text-primary-700",
  link: "text-primary-700",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "muattrans-primary",
      children = "Button",
      className,
      iconLeft = null,
      iconRight = null,
      disabled = false,
      keepDisabledStyle = false,
      appearance = {
        iconClassName: "",
      },
      ...buttonProps
    },
    ref
  ) => {
    const isSecondaryVariant = variant.includes("secondary");
    const disabledVariant = isSecondaryVariant ? "true-secondary" : true;
    const iconColorClass = disabled ? "icon-gray" : iconColorVariants[variant];

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(
          buttonVariants({
            variant: disabled && !keepDisabledStyle ? undefined : variant,
            disabled: disabled && !keepDisabledStyle ? disabledVariant : false,
            className,
          })
        )}
        {...buttonProps}
      >
        {typeof iconLeft === "string" ? (
          <IconComponent
            loader={false}
            src={iconLeft}
            height={16}
            width={16}
            className={cn(iconColorClass, appearance.iconClassName)}
          />
        ) : (
          iconLeft
        )}
        <span> {children} </span>
        {typeof iconRight === "string" ? (
          <IconComponent
            loader={false}
            src={iconRight}
            height={16}
            width={16}
            className={cn(iconColorClass, appearance.iconClassName)}
          />
        ) : (
          iconRight
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
```

---

# Calendar

_Source: packages/ui/src/content/docs/components/Calendar/Calendar.mdx_

## Component Information

**Name:** Calendar

**Description:** A customizable calendar component built on react-day-picker with Indonesian locale support and flexible styling.

## Imports

```javascript
import { useState } from "react";
import * as React from "react";

import { cn } from "@muatmuat/lib/utils";
import { Calendar } from "@muatmuat/ui/Calendar";
import { id } from "date-fns/locale";

import { CalendarPreview } from "../../preview/Calendar.preview";
import { CalendarProps } from "./types";
```

## Overview

**Description:** A customizable calendar component built on react-day-picker with Indonesian locale support and flexible styling.

**Component:** Calendar

## Usage

<CalendarPreview />

```jsx

function MyCalendar() {
  const [selected, setSelected] = useState <Date> ();

  return (
    <Calendar
      mode="single"
      selected={selected}
      onSelect={setSelected}
      className="rounded-md border"
      showOutsideDays={true}
    />
  );
}
```

## API Reference

### Props

| Prop            | Type                                                                      | Default   | Description                                       |
| --------------- | ------------------------------------------------------------------------- | --------- | ------------------------------------------------- |
| mode            | `"single" \| "multiple" \| "range"`                                       | -         | Selection mode for the calendar                   |
| selected        | `Date \| Date[] \| { from: Date; to: Date } \| undefined`                 | -         | Currently selected date(s)                        |
| onChange        | `(date: Date \| Date[] \| { from: Date; to: Date } \| undefined) => void` | -         | Callback when date selection changes              |
| className       | `string`                                                                  | -         | Additional CSS classes for the calendar container |
| classNames      | `Partial <Record <string, string> >`                                      | -         | Custom class names for specific calendar elements |
| showOutsideDays | `boolean`                                                                 | `true`    | Whether to show days from previous/next months    |
| captionLayout   | `"label" \| "dropdown"`                                                   | `"label"` | Layout style for month/year caption               |
| initialFocus    | `boolean`                                                                 | -         | Whether to focus the calendar on mount            |
| minDate         | `Date`                                                                    | -         | Earliest selectable date                          |
| maxDate         | `Date`                                                                    | -         | Latest selectable date                            |
| disabled        | `boolean`                                                                 | -         | Whether the calendar is disabled                  |
| required        | `boolean`                                                                 | -         | Whether date selection is required                |
| formatters      | `DayPickerProps["formatters"]`                                            | -         | Custom formatting functions                       |
| components      | `DayPickerProps["components"]`                                            | -         | Custom component overrides                        |
| \_buttonVariant | `"ghost"`                                                                 | `"ghost"` | Button variant for calendar controls              |

### Types

```typescript
interface CalendarProps {
  className?: string;
  classNames?: Partial<Record<string, string>>;
  showOutsideDays?: boolean;
  captionLayout?: "label" | "dropdown";
  mode?: "single" | "multiple" | "range";
  selected?: Date | Date[] | { from: Date; to: Date } | undefined;
  onSelect?: (
    date: Date | Date[] | { from: Date; to: Date } | undefined
  ) => void;
  initialFocus?: boolean;
  fromDate?: Date;
  toDate?: Date;
  disabled?: boolean;
  required?: boolean;
  formatters?: DayPickerProps["formatters"];
  components?: DayPickerProps["components"];
}
```

## Behavior

- Built on react-day-picker with comprehensive feature support
- Uses Indonesian locale (id) for month and day names
- Supports single, multiple, and range selection modes
- Provides customizable styling through Tailwind classes
- Includes focus management and keyboard navigation
- Shows outside days from previous/next months
- Supports date range restrictions with min/max dates
- Maintains consistent design system styling

**Variants**: single selection, multiple selection, range selection
**Sizes**: responsive max-width of 280px with customizable dimensions
**Interaction**: mouse and keyboard navigation, focus management

## Component Code

```tsx
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
        String.raw`rtl:**:[.rdp-button\_next> svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous> svg]:rotate-180`,
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
            : "[&> svg]:text-muted-foreground [&> svg]:size-3.5 flex h-8 items-center gap-1 rounded-md pl-2 pr-1 text-sm",
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
        DayButton: (
          props: DayProps & React.ButtonHTMLAttributes<HTMLButtonElement>
        ) => React.createElement(CalendarDayButton, props),
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
      onSelect={onChange as any}
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
        "[&> span]:text-xs [&> span]:opacity-70",
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
```

---

# DatePickerResponsive

_Source: packages/ui/src/content/docs/components/Calendar/DatePickerResponsive.mdx_

## Component Information

**Name:** DatePickerResponsive

**Description:** A responsive date picker component using native browser date input with optimized mobile experience.

## Imports

```javascript
import { useState } from "react";
import React, { useRef } from "react";

import { cn } from "@muatmuat/lib/utils";
import { DatePickerResponsive } from "@muatmuat/ui/Calendar";
import { format } from "date-fns";
import { id } from "date-fns/locale";

import { DatePickerResponsivePreview } from "../../preview/DatePickerResponsive.preview";
import { IconComponent } from "../IconComponent";
import { DatePickerResponsiveProps } from "./types";
```

## Overview

**Description:** A responsive date picker component using native browser date input with optimized mobile experience.

**Component:** DatePickerResponsive

## Usage

<DatePickerResponsivePreview />

```jsx
function MyDatePicker() {
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <DatePickerResponsive
      value={selectedDate}
      onChange={setSelectedDate}
      placeholder="Select Date"
      dateFormat="dd MMM yyyy"
      minDate={new Date()}
      maxDate={new Date(2024, 11, 31)}
    />
  );
}
```

## API Reference

### Props

| Prop             | Type                                                                                      | Default         | Description                                      |
| ---------------- | ----------------------------------------------------------------------------------------- | --------------- | ------------------------------------------------ |
| value            | `string \| null`                                                                          | -               | Currently selected date as string (ISO format)   |
| onChange         | `(date: string \| undefined) => void`                                                     | -               | Callback when date selection changes             |
| onApply          | `(date: string \| undefined) => void`                                                     | -               | Callback when date is applied (auto-applied)     |
| minDate          | `Date`                                                                                    | -               | Earliest selectable date                         |
| maxDate          | `Date`                                                                                    | -               | Latest selectable date                           |
| disabled         | `boolean`                                                                                 | `false`         | Whether the date picker is disabled              |
| dateFormat       | `string`                                                                                  | `"dd MMM yyyy"` | Date format for display (using date-fns)         |
| placeholder      | `string`                                                                                  | `"Select Date"` | Placeholder text for empty state                 |
| className        | `string`                                                                                  | -               | Additional CSS classes for container             |
| errorMessage     | `string`                                                                                  | -               | Error message to display below picker            |
| hideErrorMessage | `boolean`                                                                                 | `false`         | Hide error message display                       |
| status           | `"error" \| "success"`                                                                    | -               | Status for styling (use "error" for error state) |
| t                | `(key: string, values?: Record <string, any> , fallback?: string) => string`              | Mock function   | Translation function                             |
| appearance       | `{containerClassName?: string; inputClassName?: string; errorMessageClassName?: string;}` | `{}`            | Custom appearance overrides                      |
| isError          | `boolean`                                                                                 | -               | @deprecated Use status="error" instead           |

### Types

```typescript
interface DatePickerResponsiveProps {
  value?: string | null;
  onChange?: (date: string | undefined) => void;
  onApply?: (date: string | undefined) => void;
  minDate?: Date;
  maxDate?: Date;
  disabled?: boolean;
  dateFormat?: string;
  placeholder?: string;
  className?: string;
  errorMessage?: string;
  hideErrorMessage?: boolean;
  status?: "error" | "success";
  t?: (key: string, values?: Record<string, any>, fallback?: string) => string;
  appearance?: {
    containerClassName?: string;
    inputClassName?: string;
    errorMessageClassName?: string;
  };
  isError?: boolean; // @deprecated
}
```

## Behavior

- Uses native browser date input for optimal mobile experience
- Automatically applies date selection on change (no separate apply button needed)
- Shows date in formatted display while maintaining string value for form compatibility
- Supports date range constraints with min/max dates
- Provides responsive design with proper touch targets
- Uses Indonesian locale for date formatting
- Shows error state with visual feedback and error message
- Includes calendar icon for clear visual indication

**Variants**: enabled, disabled, error states
**Sizes**: fixed height (32px) with responsive width
**Interaction**: native browser date picker with touch optimization

## Component Code

```tsx
// Simplified type for translation function
type TranslationFunction = (
  key: string,
  values?: Record<string, any>,
  fallback?: string
) => string;

const tMockFn: TranslationFunction = (key, _, fallback) => fallback || key;

const DatePickerResponsiveImplementation = (
  {
    value,
    onChange,
    onApply,
    // onCancel is no longer needed with auto-apply
    minDate,
    maxDate,
    disabled = false,
    dateFormat = "dd MMM yyyy", // Default format without time
    placeholder = "Select Date",
    className,
    errorMessage,
    hideErrorMessage = false,
    status,
    t = tMockFn,
    // Additional native date input specific props
    appearance = {
      containerClassName: "",
      inputClassName: "",
      errorMessageClassName: "",
    },
    // @deprecated legacy prop
    isError,
  }: DatePickerResponsiveProps,
  ref: React.ForwardedRef<HTMLDivElement>
) => {
  const datePickerRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.value;
    if (onChange) onChange(newDate);
    if (onApply) onApply(newDate);
  };

  const handleClick = () => {
    if (!disabled && datePickerRef.current) {
      datePickerRef.current.showPicker();
    }
  };

  // Determine error state (prefer new status prop, fall back to legacy isError or errorMessage)
  const showErrorState = status === "error" || isError || !!errorMessage;

  // Convert Date objects to string format for native date input
  const minDateString = minDate
    ? minDate.toISOString().split("T")[0]
    : undefined;
  const maxDateString = maxDate
    ? maxDate.toISOString().split("T")[0]
    : undefined;

  // Format the display value using date-fns or show placeholder
  const displayValue = value
    ? format(new Date(value), dateFormat, { locale: id })
    : placeholder;

  return (
    <div
      ref={ref}
      className={cn(
        "flex w-full flex-col gap-y-2",
        appearance.containerClassName,
        className
      )}
    >
      <div
        className={cn(
          "flex h-8 w-full cursor-pointer items-center rounded-md border bg-neutral-50 px-3 transition-colors",
          // Default & Hover & Focus states
          "border-neutral-600 focus-within:border-primary-700 hover:border-primary-700",
          // Error state
          showErrorState && "border-error-400",
          // Disabled state
          disabled &&
            "cursor-not-allowed border-neutral-600 bg-neutral-200 hover:border-neutral-600"
        )}
        onClick={handleClick}
      >
        <IconComponent
          src="/icons/calendar16.svg"
          className={cn(
            "size-4 text-neutral-700",
            showErrorState && "text-error-400"
          )}
        />
        <span
          className={cn(
            "w-full min-w-0 border-none bg-transparent text-sm font-semibold text-neutral-900 outline-none placeholder:text-neutral-600",
            disabled ? "cursor-not-allowed" : "cursor-text",
            !value && "text-neutral-500"
          )}
        >
          {displayValue}
        </span>
        <input
          className={cn(
            "absolute -top-[314px] opacity-0",
            appearance.inputClassName
          )}
          type="date"
          onChange={handleChange}
          ref={datePickerRef}
          disabled={disabled}
          max={maxDateString}
          min={minDateString}
        />
      </div>

      {/* Error Message */}
      {showErrorState && errorMessage && !hideErrorMessage && (
        <span
          className={cn(
            "text-xs font-medium text-error-400",
            appearance.errorMessageClassName
          )}
        >
          {t(errorMessage)}
        </span>
      )}
    </div>
  );
};

export const DatePickerResponsive = React.memo(
  React.forwardRef(DatePickerResponsiveImplementation)
);
DatePickerResponsive.displayName = "DatePickerResponsive";
```

---

# DatePickerWeb

_Source: packages/ui/src/content/docs/components/Calendar/DatePickerWeb.mdx_

## Component Information

**Name:** DatePickerWeb

**Description:** A web date picker component with popover interface and calendar selection.

## Imports

```javascript
import { DatePickerWebPreview } from "../../preview/DatePickerWeb.preview";

import { useState } from "react";

import { DatePickerWeb } from "@muatmuat/ui/Calendar";

import React, { useEffect, useState } from "react";

import { cn } from "@muatmuat/lib/utils";
import { format } from "date-fns";
import { id } from "date-fns/locale";

import { IconComponent } from "../IconComponent";
import { Popover, PopoverContent, PopoverTrigger } from "../Popover";
import { Calendar } from "./Calendar";
import { DatePickerWebProps } from "./types";

```

## Overview

**Description:** A web date picker component with popover interface and calendar selection.

**Component:** DatePickerWeb

## Usage

<DatePickerWebPreview />

```jsx
function MyDatePickerWeb() {
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <DatePickerWeb
      value={selectedDate}
      onChange={setSelectedDate}
      onApply={setSelectedDate}
      placeholder="Choose Date"
      dateFormat="dd MMM yyyy"
      minDate={new Date()}
      maxDate={new Date(2024, 11, 31)}
    />
  );
}
```

## API Reference

### Props

| Prop             | Type                                                                         | Default         | Description                                  |
| ---------------- | ---------------------------------------------------------------------------- | --------------- | -------------------------------------------- |
| value            | `Date \| null`                                                               | -               | Currently selected date                      |
| onChange         | `(date: Date \| undefined) => void`                                          | -               | Callback when date selection changes         |
| onApply          | `(date: Date \| undefined) => void`                                          | -               | Callback when date is applied (auto-applied) |
| onCancel         | `(date: Date \| undefined) => void`                                          | -               | Callback when cancel button is clicked       |
| minDate          | `Date`                                                                       | -               | Earliest selectable date                     |
| maxDate          | `Date`                                                                       | -               | Latest selectable date                       |
| disabled         | `boolean`                                                                    | `false`         | Whether date picker is disabled              |
| dateFormat       | `string`                                                                     | `"dd MMM yyyy"` | Date format for display (using date-fns)     |
| placeholder      | `string`                                                                     | `"Placeholder"` | Placeholder text for empty state             |
| className        | `string`                                                                     | -               | Additional CSS classes for container         |
| errorMessage     | `string`                                                                     | -               | Error message to display below picker        |
| hideErrorMessage | `boolean`                                                                    | `false`         | Hide error message display                   |
| t                | `(key: string, values?: Record <string, any> , fallback?: string) => string` | Mock function   | Translation function                         |

### Types

```typescript
interface DatePickerWebProps {
  value?: Date | null;
  onChange?: (date: Date | undefined) => void;
  onApply?: (date: Date | undefined) => void;
  onCancel?: (date: Date | undefined) => void;
  minDate?: Date;
  maxDate?: Date;
  disabled?: boolean;
  dateFormat?: string;
  placeholder?: string;
  className?: string;
  errorMessage?: string;
  hideErrorMessage?: boolean;
  t?: (key: string, values?: Record<string, any>, fallback?: string) => string;
}
```

## Behavior

- Displays date in a formatted input field with calendar icon
- Opens calendar popover on click for visual date selection
- Automatically applies selected date and closes popover (no manual apply needed)
- Supports keyboard navigation and accessibility features
- Provides Indonesian locale support for month and day names
- Shows today's date by default when no date is selected
- Supports date range constraints with min/max dates
- Shows error state with visual feedback and error message
- Maintains consistent styling with design system

**Variants**: enabled, disabled, error states
**Sizes**: fixed height (32px) with responsive width
**Interaction**: click to open popover, calendar selection, keyboard navigation

## Component Code

```tsx
// Simplified type for translation function
type TranslationFunction = (
  key: string,
  values?: Record<string, any>,
  fallback?: string
) => string;

const tMockFn: TranslationFunction = (key, _, fallback) => fallback || key;

const DatePickerWebImplementation = (
  {
    value: initialValue,
    onChange,
    onApply,
    // onCancel is no longer needed with auto-apply
    minDate,
    maxDate,
    disabled = false,
    dateFormat = "dd MMM yyyy", // Default format without time
    placeholder = "Placeholder",
    className,
    errorMessage,
    hideErrorMessage = false,
    t = tMockFn,
  }: DatePickerWebProps,
  _ref: React.ForwardedRef<HTMLDivElement>
) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null | undefined>(
    initialValue
  );

  // Update internal state when controlled value changes
  useEffect(() => {
    setSelectedDate(initialValue);
  }, [initialValue]);

  // Auto-apply date selection handler
  const handleDateSelect = (date: Date | undefined) => {
    // Immediately apply the selected date
    setSelectedDate(date);
    if (onChange) onChange(date);
    if (onApply) onApply(date);

    // Close the popover after selection
    setIsOpen(false);
  };

  const showErrorState = !!errorMessage;

  // Format the display value or show placeholder
  const displayValue = selectedDate
    ? format(selectedDate, dateFormat, { locale: id })
    : placeholder;

  return (
    <div className={cn("flex w-full flex-col gap-y-2", className)}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <div
            className={cn(
              "flex h-8 w-full cursor-pointer items-center rounded-md border bg-neutral-50 px-3 transition-colors",
              // Default & Hover & Focus states
              "border-neutral-600 focus-within:border-primary-700 hover:border-primary-700",
              // Error state
              showErrorState && "border-error-400",
              // Disabled state
              disabled &&
                "cursor-not-allowed border-neutral-600 bg-neutral-200 hover:border-neutral-600"
            )}
          >
            <span
              className={cn(
                "w-full min-w-0 border-none bg-transparent text-sm font-semibold text-neutral-900 outline-none placeholder:text-neutral-600",
                !selectedDate && "text-neutral-500"
              )}
            >
              {displayValue}
            </span>
            <IconComponent
              src="/icons/calendar24.svg"
              className={cn(
                "size-4 text-neutral-700",
                showErrorState && "text-error-400"
              )}
            />
          </div>
        </PopoverTrigger>
        <PopoverContent className="p-3" align="start" side="bottom">
          <Calendar
            mode="single"
            className="w-full bg-transparent p-0"
            selected={selectedDate}
            onChange={handleDateSelect}
            initialFocus
            minDate={minDate}
            maxDate={maxDate}
            disabled={disabled}
          />
        </PopoverContent>
      </Popover>

      {/* Error Message */}
      {errorMessage && !hideErrorMessage && (
        <span className="text-xs font-medium text-error-400">
          {t(errorMessage)}
        </span>
      )}
    </div>
  );
};

// Renamed component
export const DatePickerWeb = React.memo(
  React.forwardRef(DatePickerWebImplementation)
);
DatePickerWeb.displayName = "DatePickerWeb";
```

---

# DateTimePickerResponsive

_Source: packages/ui/src/content/docs/components/Calendar/DateTimePickerResponsive.mdx_

## Component Information

**Name:** DateTimePickerResponsive

**Description:** A comprehensive date and time picker component with modal interface. Opens a modal for date selection with an integrated time picker.

## Imports

```javascript
import { useState } from "react";

import { cn } from "@muatmuat/lib/utils";
import { DateTimePickerResponsive } from "@muatmuat/ui/Calendar";
import { format } from "date-fns";

import { DateTimePickerResponsivePreview } from "../../preview/DateTimePickerResponsive.preview";
import { Button } from "../Button";
import { Modal, ModalContent, ModalTrigger } from "../Modal";
import { Calendar } from "./Calendar";
import { DateTimePickerResponsiveProps, TimeColumnProps } from "./types";
```

## Overview

**Description:** A comprehensive date and time picker component with modal interface. Opens a modal for date selection with an integrated time picker.

**Component:** DateTimePickerResponsive

## Usage

<DateTimePickerResponsivePreview />

```jsx
function MyDateTimePicker() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <DateTimePickerResponsive
      value={selectedDate}
      onChange={setSelectedDate}
      onApply={(date) => console.log("Applied:", date)}
    >
      <button className="rounded-md border px-4 py-2">
        Select Date & Time
      </button>
    </DateTimePickerResponsive>
  );
}
```

## API Reference

### Props

| Prop         | Type                   | Default | Description                                 |
| ------------ | ---------------------- | ------- | ------------------------------------------- | ----------------------------- | --------------------------- |
| value        | `Date`                 | -       | Currently selected date and time            |
| onChange     | `(date: Date) => void` | -       | Callback when date/time selection changes   |
| onApply      | `(date: Date) => void` | -       | Callback when user applies the selection    |
| children     | `React.ReactNode`      | -       | **Required**. Trigger element for the modal |
| useModal     | `boolean`              | `false` | Whether to use modal behavior               |
| title        | `string`               | -       | Optional title for the modal                |
| showClear    | `boolean`              | `true`  | Whether to show clear option                |
| mode         | `"single"              | "range" | "multiple"`                                 | -                             | Calendar selection mode     |
| selected     | `Date                  | Date[]` | -                                           | Selected date(s) for calendar |
| onSelect     | `(date: Date           | Date[]  | undefined) => void`                         | -                             | Calendar selection callback |
| initialFocus | `boolean`              | -       | Whether to focus calendar on mount          |
| fromDate     | `Date`                 | -       | Earliest selectable date                    |
| toDate       | `Date`                 | -       | Latest selectable date                      |
| disabled     | `boolean`              | -       | Whether the calendar is disabled            |

### Types

```typescript
interface DateTimePickerResponsiveProps {
  value?: Date;
  onChange?: (date: Date) => void;
  onApply?: (date: Date) => void;
  children: React.ReactNode;
  useModal?: boolean;
  title?: string;
  showClear?: boolean;
  mode?: "single" | "range" | "multiple";
  selected?: Date | Date[];
  onSelect?: (date: Date | Date[] | undefined) => void;
  initialFocus?: boolean;
  fromDate?: Date;
  toDate?: Date;
  disabled?: boolean;
}
```

## Behavior

- Opens a modal with calendar and time selection interface
- Features infinitely scrolling time picker wheels for hours and minutes
- Provides separate time picker modal for precise time selection
- Maintains selected date while allowing time modification
- Supports real-time updates during date selection
- Includes Indonesian locale support for date formatting
- Optimized for mobile and responsive interfaces
- Uses smooth animations and transitions

**Variants**: date + time picker (default), date-only picker
**Sizes**: responsive modal with max-width of 320px
**Interaction**: modal trigger, calendar selection, time wheel scrolling, apply/cancel actions

## Component Code

```tsx
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

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

  const scrollContainerRef = useRef <HTMLDivElement> (null);
  const dummyScrollerRef = useRef <HTMLDivElement> (null);
  const debounceTimerRef = useRef <NodeJS.Timeout | null> (null);
  const isUserScrolling = useRef(false);
  const userScrollTimeout = useRef <NodeJS.Timeout | null> (null);

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
      } else if (container.scrollTop > = blockHeight * 2) {
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
      <div className="bg-primary-700 pointer-events-none absolute left-0 top-1/2 z-0 h-8 w-full -translate-y-1/2 rounded-md"> </div>
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
  ref: React.ForwardedRef <HTMLDivElement>
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
    (date: Date | undefined) => {
      if (!date) return;

      setDateTime((prevDateTime) => {
        // Create new date preserving time
        const newDate = new Date(prevDateTime);
        newDate.setFullYear(
          date.getFullYear(),
          date.getMonth(),
          date.getDate()
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
        <ModalTrigger asChild> {children} </ModalTrigger>
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
              <span> {formattedTime.hours} </span>
              <span className="mb-1"> : </span>
              <span> {formattedTime.minutes} </span>
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

```

---

# DateTimePickerWeb

_Source: packages/ui/src/content/docs/components/Calendar/DateTimePickerWeb.mdx_

## Component Information

**Name:** DateTimePickerWeb

**Description:** A popover-based date and time picker with integrated time wheel selection. Optimized for desktop web interfaces.

## Imports

```javascript
import { DateTimePickerWebPreview } from "../../preview/DateTimePickerWeb.preview";

import { useState } from "react";

import { DateTimePickerWeb } from "@muatmuat/ui/Calendar";

import React, { useEffect, useMemo, useRef, useState } from "react";

import { cn } from "@muatmuat/lib/utils";
import { format } from "date-fns";
import { id } from "date-fns/locale";

import { Button } from "../Button";
import { IconComponent } from "../IconComponent";
import { Popover, PopoverContent, PopoverTrigger } from "../Popover";
import { Calendar } from "./Calendar";
import { DateTimePickerWebProps, TimeColumnProps } from "./types";

```

## Overview

**Description:** A popover-based date and time picker with integrated time wheel selection. Optimized for desktop web interfaces.

**Component:** DateTimePickerWeb

## Usage

<DateTimePickerWebPreview />

```jsx
function MyDateTimePicker() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <DateTimePickerWeb
      value={selectedDate}
      onChange={setSelectedDate}
      onApply={(date) => console.log("Applied:", date)}
      onCancel={(date) => console.log("Cancelled:", date)}
      dateFormat="dd MMM yyyy, HH:mm"
    />
  );
}
```

## API Reference

### Props

| Prop        | Type                   | Default                | Description                               |
| ----------- | ---------------------- | ---------------------- | ----------------------------------------- | ------------------------------------- |
| value       | `Date`                 | -                      | Currently selected date and time          |
| onChange    | `(date: Date) => void` | -                      | Callback when date/time selection changes |
| onApply     | `(date: Date) => void` | -                      | Callback when user applies the selection  |
| onCancel    | `(date: Date) => void` | -                      | Callback when user cancels the selection  |
| minDate     | `Date`                 | -                      | Earliest selectable date                  |
| maxDate     | `Date`                 | -                      | Latest selectable date                    |
| disabled    | `boolean`              | `false`                | Whether the picker is disabled            |
| status      | `"error"               | "success"`             | -                                         | Visual status for validation feedback |
| dateFormat  | `string`               | `"dd MMM yyyy, HH:mm"` | Date format for display                   |
| showTime    | `boolean`              | `true`                 | Whether to show time picker               |
| showSeconds | `boolean`              | `false`                | Whether to show seconds in time picker    |
| timeStep    | `number`               | `1`                    | Step increment for time selection         |

### Types

```typescript
interface DateTimePickerWebProps {
  value?: Date;
  onChange?: (date: Date) => void;
  onApply?: (date: Date) => void;
  onCancel?: (date: Date) => void;
  minDate?: Date;
  maxDate?: Date;
  disabled?: boolean;
  status?: "error" | "success";
  dateFormat?: string;
  showTime?: boolean;
  showSeconds?: boolean;
  timeStep?: number;
}
```

## Behavior

- Opens as popover with calendar and side-by-side time picker
- Features infinitely scrolling time wheels with snap-to-center behavior
- Provides temporary state management for cancel/apply workflow
- Supports Indonesian locale formatting for dates
- Includes visual status indicators for validation states
- Optimized for desktop interactions and keyboard navigation
- Maintains consistent design system styling
- Uses smooth scrolling and visual feedback

**Variants**: date + time picker (default), date-only picker
**Sizes**: responsive popover with calendar and time columns
**Interaction**: popover trigger, calendar selection, time wheel scrolling, keyboard navigation

## Component Code

```tsx

// --- DYNAMIC TIME WHEEL CONFIGURATION ---
const TIME_SLOT_HEIGHT = 32; // h-8 in Tailwind
const GAP = 0; // gap-0
const EFFECTIVE_SLOT_HEIGHT = TIME_SLOT_HEIGHT + GAP;
// --- END CONFIGURATION ---

const hours = Array.from({ length: 24 }, (_, i) => i);
const minutes = Array.from({ length: 60 }, (_, i) => i);

/**
 * An infinitely looping, snap-to-center scrollable wheel for time selection.
 */
const TimeColumn = ({
  values,
  selectedValue,
  onChange,
  visibleItemCount = 9,
}: TimeColumnProps) => {
  const { containerHeight, paddingY } = useMemo(() => {
    if (visibleItemCount % 2 === 0) {
      console.warn(
        "TimeColumn: `visibleItemCount` should be an odd number for perfect centering."
      );
    }
    const height =
      visibleItemCount * TIME_SLOT_HEIGHT + (visibleItemCount - 1) * GAP;
    const padding = height / 2 - TIME_SLOT_HEIGHT / 2;
    return { containerHeight: height, paddingY: padding };
  }, [visibleItemCount]);

  const scrollContainerRef = useRef <HTMLDivElement> (null);
  const dummyScrollerRef = useRef <HTMLDivElement> (null);
  const debounceTimerRef = useRef <NodeJS.Timeout | null> (null);
  const isUserScrolling = useRef(false);
  const userScrollTimeout = useRef <NodeJS.Timeout | null> (null);

  const loopedValues = useRef([...values, ...values, ...values]).current;

  const maskGradient = useMemo(() => {
    const startPercent = (paddingY / containerHeight) * 100;
    const endPercent = ((paddingY + TIME_SLOT_HEIGHT) / containerHeight) * 100;
    return `linear-gradient(to bottom, transparent, transparent ${startPercent - 5}%, black ${startPercent}%, black ${endPercent}%, transparent ${endPercent + 5}%, transparent)`;
  }, [paddingY, containerHeight]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      const initialIndex = values.indexOf(selectedValue);
      if (initialIndex !== -1) {
        const targetIndex = values.length + initialIndex;
        const initialScrollTop = targetIndex * EFFECTIVE_SLOT_HEIGHT;
        container.scrollTop = initialScrollTop;
        if (dummyScrollerRef.current)
          dummyScrollerRef.current.scrollTop = initialScrollTop;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isUserScrolling.current) return;
    const container = scrollContainerRef.current;
    if (container) {
      const currentIndex = Math.round(
        container.scrollTop / EFFECTIVE_SLOT_HEIGHT
      );
      const currentValue = loopedValues[currentIndex];
      if (currentValue !== selectedValue) {
        const targetBaseIndex = values.indexOf(selectedValue);
        if (targetBaseIndex !== -1) {
          const targetLoopedIndex = values.length + targetBaseIndex;
          const targetScrollTop = targetLoopedIndex * EFFECTIVE_SLOT_HEIGHT;
          container.scrollTo({ top: targetScrollTop, behavior: "auto" });
        }
      }
    }
  }, [selectedValue, values, loopedValues]);

  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    if (dummyScrollerRef.current)
      dummyScrollerRef.current.scrollTop = container.scrollTop;

    isUserScrolling.current = true;
    if (userScrollTimeout.current) {
      clearTimeout(userScrollTimeout.current);
    }
    userScrollTimeout.current = setTimeout(() => {
      isUserScrolling.current = false;
    }, 150);

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      const blockHeight = values.length * EFFECTIVE_SLOT_HEIGHT;
      if (container.scrollTop < blockHeight) container.scrollTop += blockHeight;
      else if (container.scrollTop > = blockHeight * 2)
        container.scrollTop -= blockHeight;
      const newIndex = Math.round(container.scrollTop / EFFECTIVE_SLOT_HEIGHT);
      const newValue = loopedValues[newIndex];
      if (newValue !== undefined && newValue !== selectedValue)
        onChange(newValue);
    }, 50);
  };

  const handleClick = (index: number) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const baseIndex = index % values.length;
    const targetLoopedIndex = values.length + baseIndex;
    const targetScrollTop = targetLoopedIndex * EFFECTIVE_SLOT_HEIGHT;
    container.scrollTo({ top: targetScrollTop, behavior: "smooth" });
  };

  const renderTimeSlots = (textColorClass: string) => (
    <div
      className="flex flex-col items-center"
      style={{ paddingTop: `${paddingY}px`, paddingBottom: `${paddingY}px` }}
    >
      {loopedValues.map((value, index) => {
        const isSelected = value === selectedValue;
        return (
          <button
            type="button"
            key={index}
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
  );

  return (
    <div className="relative w-12" style={{ height: `${containerHeight}px` }}>
      <div className="bg-primary-700 pointer-events-none absolute left-0 top-1/2 z-0 h-8 w-full -translate-y-1/2 rounded-md"> </div>

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

const DateTimePickerWebImplementation = (
  {
    value: initialValue,
    onChange,
    onApply,
    onCancel,
    minDate,
    maxDate,
    disabled = false,
    status,
    dateFormat = "dd MMM yyyy, HH:mm",
    showTime = true,
    showSeconds = false,
    timeStep = 1,
    ...props
  }: DateTimePickerWebProps,
  ref: React.ForwardedRef <HTMLDivElement>
) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDateTime, setSelectedDateTime] = useState(
    initialValue || new Date()
  );
  const [tempDateTime, setTempDateTime] = useState(selectedDateTime);

  useEffect(() => {
    setSelectedDateTime(initialValue || new Date());
  }, [initialValue]);

  useEffect(() => {
    if (isOpen) {
      setTempDateTime(selectedDateTime);
    }
  }, [isOpen, selectedDateTime]);

  const handleApply = () => {
    setSelectedDateTime(tempDateTime);
    if (onChange) onChange(tempDateTime);
    if (onApply) onApply(tempDateTime);
    setIsOpen(false);
  };

  const handleCancel = () => {
    if (onCancel) onCancel(tempDateTime);
    setIsOpen(false);
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;
    const newDate = new Date(tempDateTime);
    newDate.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());
    setTempDateTime(newDate);
  };

  const handleHourSelect = (hour: number) => {
    const newDate = new Date(tempDateTime);
    newDate.setHours(hour);
    setTempDateTime(newDate);
  };

  const handleMinuteSelect = (minute: number) => {
    const newDate = new Date(tempDateTime);
    newDate.setMinutes(minute);
    setTempDateTime(newDate);
  };

  const showErrorState = status === "error";

  return (
    <div className={cn("flex w-full flex-col gap-y-2", props.className)}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <div
            className={cn(
              "flex h-8 w-full items-center rounded-md border bg-neutral-50 px-3 transition-colors",
              // Default & Hover & Focus states
              "focus-within:border-primary-700 hover:border-primary-700 border-neutral-600",
              // Error state
              showErrorState && "border-error-400",
              // Disabled state
              disabled
                ? "cursor-not-allowed border-neutral-600 bg-neutral-200 hover:border-neutral-600"
                : "cursor-text"
            )}
          >
            <span
              className={cn(
                "w-full min-w-0 border-none bg-transparent text-sm font-semibold text-neutral-900 outline-none",
                disabled ? "cursor-not-allowed" : "cursor-text"
              )}
            >
              {format(selectedDateTime, dateFormat, { locale: id })}
            </span>
            <IconComponent
              src="/icons/calendar24.svg"
              className={cn(
                "size-4 text-neutral-700",
                showErrorState && "text-error-400"
              )}
            />
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="flex">
            <Calendar
              mode="single"
              selected={tempDateTime}
              onChange={handleDateSelect}
              initialFocus={true}
              minDate={minDate}
              maxDate={maxDate}
              disabled={disabled}
            />
            <div className="flex items-center justify-center gap-1 border-l border-neutral-200 bg-neutral-50/50 p-3">
              <TimeColumn
                values={hours}
                selectedValue={tempDateTime.getHours()}
                onChange={handleHourSelect}
                visibleItemCount={9}
              />
              <span className="relative z-30 mb-2 text-2xl font-bold text-neutral-400">
                :
              </span>
              <TimeColumn
                values={minutes}
                selectedValue={tempDateTime.getMinutes()}
                onChange={handleMinuteSelect}
                visibleItemCount={9}
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 border-t border-neutral-200 p-4">
            <Button
              variant="muatparts-primary-secondary"
              className="rounded-full"
              onClick={handleCancel}
            >
              Batal
            </Button>
            <Button
              variant="muatparts-primary"
              className="rounded-full"
              onClick={handleApply}
            >
              Terapkan
            </Button>
          </div>
        </PopoverContent>
      </Popover>

      {/* Error Message */}
      {showErrorState && props.errorMessage && (
        <span className="text-error-400 text-xs font-medium">
          {props.errorMessage}
        </span>
      )}
    </div>
  );
};

export const DateTimePickerWeb = React.memo(
  React.forwardRef(DateTimePickerWebImplementation)
);
DateTimePickerWeb.displayName = "DateTimePickerWeb";

```

---

# Card

_Source: packages/ui/src/content/docs/components/Card/Card.mdx_

## Component Information

**Name:** Card

**Description:** A versatile card component system for organizing content with optional header, content, and footer sections.

## Imports

```javascript
import React from "react";

import { cn } from "@muatmuat/lib/utils";

import { CardPreview } from "../../preview/Card.preview";
import { IconComponent } from "../IconComponent";
```

## Overview

**Description:** A versatile card component system for organizing content with optional header, content, and footer sections.

**Component:** Card

## Usage

<CardPreview />

```jsx
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  ListContent,
} from "@muatmuat/ui/Card";

function ShipmentCard() {
  return (
    <Card className="max-w-md">
      <CardHeader>
        <h2 className="text-lg font-semibold"> Order #12345 </h2>
        <p className="text-sm text-neutral-600"> Status: In Progress </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <ListContent
            icon="/icons/map-pin24.svg"
            title="Origin"
            value="Jakarta"
          />
          <ListContent
            icon="/icons/map-pin24.svg"
            title="Destination"
            value="Surabaya"
          />
          <ListContent
            icon="/icons/box16.svg"
            title="Weight"
            value="2.5 tons"
          />
          <ListContent
            icon="/icons/24-hours.svg"
            title="Duration"
            value="8 hours"
          />
        </div>
      </CardContent>
      <CardFooter>
        <button className="rounded bg-primary-500 px-4 py-2 text-white">
          Track Order
        </button>
        <button className="ml-2 rounded border px-4 py-2">
          Contact Support
        </button>
      </CardFooter>
    </Card>
  );
}
```

## API Reference

### Props

#### Card

| Prop      | Type        | Default | Description                                 |
| --------- | ----------- | ------- | ------------------------------------------- | ---------------------------------------------- |
| className | `string`    | -       | Additional CSS classes to apply to the card |
| keys      | `string     | number` | -                                           | React key prop for list rendering optimization |
| children  | `ReactNode` | -       | Content to be rendered inside the card      |

#### CardHeader

| Prop      | Type        | Default | Description                                   |
| --------- | ----------- | ------- | --------------------------------------------- |
| className | `string`    | -       | Additional CSS classes to apply to the header |
| children  | `ReactNode` | -       | Content to be rendered inside the header      |

#### CardContent

| Prop      | Type        | Default | Description                                         |
| --------- | ----------- | ------- | --------------------------------------------------- |
| className | `string`    | -       | Additional CSS classes to apply to the content area |
| children  | `ReactNode` | -       | Content to be rendered inside the content area      |

#### CardFooter

| Prop      | Type        | Default | Description                                   |
| --------- | ----------- | ------- | --------------------------------------------- |
| className | `string`    | -       | Additional CSS classes to apply to the footer |
| children  | `ReactNode` | -       | Content to be rendered inside the footer      |

#### ListContent

| Prop      | Type     | Default        | Description                                       |
| --------- | -------- | -------------- | ------------------------------------------------- | -------------------------------------------- |
| icon      | `string  | ComponentType` | -                                                 | Icon source URL or icon component (required) |
| title     | `string` | -              | Title text to display next to the icon (required) |
| value     | `string` | -              | Value text to display below the title (required)  |
| className | `string` | -              | Additional CSS classes to apply to the container  |

### Types

```typescript
interface CardProps {
  className?: string;
  keys?: string | number;
  children?: React.ReactNode;
}

interface CardHeaderProps {
  className?: string;
  children?: React.ReactNode;
}

interface CardContentProps {
  className?: string;
  children?: React.ReactNode;
}

interface CardFooterProps {
  className?: string;
  children?: React.ReactNode;
}

interface ListContentProps {
  icon: string | React.ComponentType<any>;
  title: string;
  value: string;
  className?: string;
}
```

## Behavior

- Displays contextual content in a clean, scannable format with consistent visual hierarchy
- Supports both standalone usage and composition with header, content, and footer components
- Provides specialized ListContent component for icon-title-value combinations commonly used in logistics cards
- Applies consistent border, background, and shadow styling following the design system
- Responsive design with proper text wrapping and flexible content layout
- Can be customized with additional CSS classes while maintaining base card styling

**Variants**: standalone card, complete card (header+content+footer), content-only card, header-only card, footer-only card
**Sizes**: Responsive width with customizable max-width classes

**Key Guidelines**:

- Use cards to group related information and actions together
- Leverage ListContent for displaying icon-based data points in logistics contexts
- Apply custom max-width classes for responsive design needs
- Combine header, content, and footer strategically based on content requirements

## Component Code

```tsx
import {
  CardContentProps,
  CardFooterProps,
  CardHeaderProps,
  CardProps,
  ListContentProps,
} from "@muatmuat/ui/types";

export const Card = ({ className, keys, children }: CardProps) => {
  return (
    <div
      key={keys}
      className={cn(
        "h-full w-full rounded-md border border-neutral-600 bg-white text-neutral-900 shadow-muat",
        className
      )}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ className, children }: CardHeaderProps) => {
  return (
    <header
      className={cn(`border-b border-neutral-600 px-8 py-5 ${className}`)}
    >
      {children}
    </header>
  );
};

export const CardContent = ({ className, children }: CardContentProps) => {
  return <div className={cn("px-8 py-5", className)}> {children} </div>;
};

export const CardFooter = ({ className, children }: CardFooterProps) => {
  return (
    <footer className={`border-t border-neutral-600 px-8 py-5 ${className}`}>
      {children}
    </footer>
  );
};

export const ListContent = ({
  icon,
  title,
  value,
  className,
}: ListContentProps) => {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <div className="sm flex gap-2">
        {typeof icon === "string" ? (
          <IconComponent src={icon} />
        ) : (
          React.createElement(icon)
        )}
        <span className="text-xs font-medium text-neutral-600"> {title} </span>
      </div>
      <span className="text-1b1b text-xs font-medium"> {value} </span>
    </div>
  );
};
```

---

# ConditionalDiv

_Source: packages/ui/src/content/docs/components/Card/ConditionalDiv.mdx_

## Component Information

**Name:** ConditionalDiv

**Description:** A utility component that conditionally renders a div wrapper only when it has valid children, automatically hiding itself when empty.

## Imports

```javascript
import { Children, useEffect, useState } from "react";

import { ConditionalDiv } from "@muatmuat/ui/Card";

import { ConditionalDivPreview } from "../../preview/ConditionalDiv.preview";
import { ConditionalDivProps } from "./types";
```

## Overview

**Description:** A utility component that conditionally renders a div wrapper only when it has valid children, automatically hiding itself when empty.

**Component:** ConditionalDiv

## Usage

<ConditionalDivPreview />

```jsx
function ConditionalFormSections() {
  const showAdvancedOptions = true;
  const showNotification = false;

  return (
    <div className="space-y-4">
      {/* This will render because there are valid children */}
      <ConditionalDiv className="rounded-lg border p-4">
        <p> This content is visible </p>
      </ConditionalDiv>

      {/* This will not render because children is null */}
      <ConditionalDiv className="rounded-lg border p-4">
        {" "}
        {null}{" "}
      </ConditionalDiv>

      {/* Conditional form section - only renders when showAdvancedOptions is true */}
      <ConditionalDiv className="form-section rounded-lg bg-gray-50 p-4">
        {showAdvancedOptions && (
          <div>
            <h3> Advanced Options </h3>
            <input
              placeholder="Advanced setting 1"
              className="block w-full rounded border p-2"
            />
            <input
              placeholder="Advanced setting 2"
              className="mt-2 block w-full rounded border p-2"
            />
          </div>
        )}
      </ConditionalDiv>

      {/* Conditional notification - only renders when showNotification is true */}
      <ConditionalDiv className="notification rounded bg-blue-100 p-3">
        {showNotification && (
          <div className="flex items-center gap-2">
            <span> ℹ️ </span>
            <span> This is a conditional notification </span>
          </div>
        )}
      </ConditionalDiv>
    </div>
  );
}
```

## API Reference

### Props

| Prop      | Type        | Default | Description                                         |
| --------- | ----------- | ------- | --------------------------------------------------- |
| className | `string`    | -       | CSS classes to apply to the div when rendered       |
| children  | `ReactNode` | -       | Child elements - div only renders if children exist |
| ...props  | `any`       | -       | Additional HTML div attributes                      |

### Types

```typescript
interface ConditionalDivProps {
  className?: string;
  children?: React.ReactNode;
  [key: string]: any;
}
```

## Behavior

- Automatically renders or hides the div wrapper based on the presence of valid children
- Filters out null, undefined, and empty array children to determine rendering
- Supports React hooks and state management for dynamic content conditions
- Maintains all standard div HTML attributes when rendered
- Provides clean, semantic way to conditionally wrap content without additional logic
- Handles edge cases with empty arrays and falsy values appropriately
- Responsive to state changes and updates rendering automatically
- Zero-impact on layout when no valid children are present

**Variants**: conditional wrapper, form sections, conditional panels, dynamic content containers
**Sizes**: Inherits standard div sizing behavior based on content and CSS classes

**Key Guidelines**:

- Use for layout components that should only appear when they contain actual content
- Ideal for conditional form sections, notifications, or dynamic panels
- Combine with React state for interactive content display
- Leverage for clean conditional rendering without manual null checks
- Apply appropriate CSS classes for styling when the div is rendered

## Component Code

```tsx
export const ConditionalDiv = ({
  className,
  children,
  ...props
}: ConditionalDivProps): React.ReactElement | null => {
  const [hasChildren, setHasChildren] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      const childElements = Children.toArray(children);
      const hasRenderedChildren = childElements.some(
        (child) => child !== null && child !== undefined
      );
      setHasChildren(hasRenderedChildren);
    }
  }, [children, mounted]);

  if (!hasChildren) return null;

  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
};
```

---

# BarChart

_Source: packages/ui/src/content/docs/components/Chart/BarChart.mdx_

## Component Information

**Name:** BarChart

**Description:** A customizable bar chart component with stacked bars, tooltips, and legends. Perfect for displaying comparative data with multiple categories.

## Imports

```javascript
import { BarChart } from "@muatmuat/ui/Chart";

import { tMockFn } from "../../lib/mock-t";
import { BarChartPreview } from "../../preview/BarChart.preview";
```

## Overview

**Description:** A customizable bar chart component with stacked bars, tooltips, and legends. Perfect for displaying comparative data with multiple categories.

**Component:** BarChart

## Usage

<BarChartPreview />

```jsx
const sampleData = [
  { month: "Jan", instantOrders: 45, scheduledOrders: 30 },
  { month: "Feb", instantOrders: 52, scheduledOrders: 35 },
  { month: "Mar", instantOrders: 48, scheduledOrders: 40 },
  { month: "Apr", instantOrders: 67, scheduledOrders: 38 },
  { month: "May", instantOrders: 72, scheduledOrders: 45 },
  { month: "Jun", instantOrders: 65, scheduledOrders: 42 },
];

const dataKeys = [
  { key: "instantOrders", name: "Pesanan Instan", shorthand: "Instan" },
  { key: "scheduledOrders", name: "Pesanan Terjadwal", shorthand: "Terjadwal" },
];

const colors = ["#FFC217", "#4F46E5"];

function MyBarChart() {
  return (
    <div className="h-[300px] w-full">
      <BarChart
        data={sampleData}
        xAxisKey="month"
        dataKeys={dataKeys}
        colors={colors}
        radiusValue={6}
        maxBarSize={60}
        barCategoryGap="35%"
      />
    </div>
  );
}
```

## API Reference

### Props

| Prop           | Type                                                                             | Default   | Description                                                 |
| -------------- | -------------------------------------------------------------------------------- | --------- | ----------------------------------------------------------- |
| data           | `Record&lt;string, any&gt;[]`                                                    | -         | **Required**. Array of data objects to display in the chart |
| xAxisKey       | `string`                                                                         | -         | **Required**. Key to use for the X-axis labels              |
| dataKeys       | `Array&lt;{key: string, name: string, shorthand?: string}&gt;`                   | -         | **Required**. Configuration for data series to display      |
| colors         | `string[]`                                                                       | -         | **Required**. Colors to use for the data series             |
| showXAxisLine  | `boolean`                                                                        | `true`    | Whether to show the X-axis line                             |
| radiusValue    | `number`                                                                         | `6`       | Border radius value for the top of bars                     |
| maxBarSize     | `number`                                                                         | `60`      | Maximum size of individual bars                             |
| barCategoryGap | `string`                                                                         | `"35%"`   | Gap between bar categories                                  |
| barSize        | `number`                                                                         | -         | Size of individual bars                                     |
| t              | `(key: string, values?: Record&lt;string, any&gt;, fallback?: string) => string` | `tMockFn` | Translation function for internationalization               |

### Types

```typescript
interface BarChartProps {
  data: Record<string, any>[];
  xAxisKey: string;
  dataKeys: Array<{
    key: string;
    name: string;
    shorthand?: string;
  }>;
  colors: string[];
  showXAxisLine?: boolean;
  radiusValue?: number;
  maxBarSize?: number;
  barCategoryGap?: string;
  barSize?: number;
  t?: (key: string, values?: Record<string, any>, fallback?: string) => string;
}
```

## Behavior

- Displays stacked bar charts with dynamic rounding on topmost visible segments
- Supports custom tooltips showing data breakdown with totals
- Includes responsive legends with color indicators
- Automatically adjusts tick font sizes based on data point count
- Uses internationalization for text labels and units
- Maintains consistent styling with the Muatmuat design system

**Variants**: stacked bars (default), single category
**Sizes**: responsive container with configurable dimensions
**Interaction**: hover tooltips with detailed data breakdown

## Component Code

```tsx
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
  dataKeys: Array <{ key: string; shorthand?: string }> ;
  t?: (key: string, values?: Record <string, any> , fallback?: string) => string;
}

// The CustomTooltip remains unchanged.
const CustomTooltip = ({
  active,
  payload,
  label,
  dataKeys,
  t = tMockFn,
}: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const total = payload.reduce((sum, entry) => sum + entry.value, 0);
    return (
      <div className="shadow-muat h-[84px] w-[136px] rounded-md bg-white p-2">
        <p className="text-xxs font-bold text-neutral-900"> {`${label}`} </p>
        <p className="text-xxs mb-1 font-bold text-neutral-900"> {`(${total} ${t("BarChart.unitOrders", {}, "Pesanan")})`} </p>
        <hr className="-ml-2 w-[136px]" />
        <div className="mt-1.5 flex flex-col gap-y-1.5">
          {payload.map((entry, index) => {
            const dataKeyInfo = dataKeys.find((dk) => dk.key === entry.dataKey);
            const shorthand = dataKeyInfo ? dataKeyInfo.shorthand : entry.name;

            return (
              <div
                key={`item-${index}`}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-x-2">
                  <div
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: entry.color }}
                  />
                  <p className="text-xxs font-medium text-neutral-600"> {`${shorthand} :`} </p>
                </div>
                <p className="text-xxs font-semibold text-neutral-900">
                  {entry.value}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
  return null;
};

interface DynamicRoundedBarProps {
  payload: Record <string, any> ;
  dataKeys: Array <{ key: string; shorthand?: string }> ;
  currentDataKey: string;
  radiusValue: number;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  fill?: string;
}

// ✅ ADDED: New shape component with dynamic rounding logic.
// This component checks which bar is visibly on top for each stack and applies the radius.
const DynamicRoundedBar = (props: DynamicRoundedBarProps) => {
  const {
    payload,
    dataKeys,
    currentDataKey,
    radiusValue,
    ...rest // Recharts props like x, y, width, height, fill
  } = props;

  // Find the key of the topmost bar that has a value > 0 for this data point
  let topVisibleKey = null;
  // Iterate from the top of the stack downwards
  for (let i = dataKeys.length - 1; i > = 0; i--) {
    const key = dataKeys[i].key;
    if (payload[key] > 0) {
      topVisibleKey = key;
      break; // Found the highest visible bar, stop searching
    }
  }

  // Apply rounding only if the current bar segment is the topmost visible one
  const shouldBeRounded = currentDataKey === topVisibleKey;

  if (shouldBeRounded) {
    return <Rectangle {...rest} radius={[radiusValue, radiusValue, 0, 0]} /> ;
  }

  // Otherwise, render a standard, non-rounded rectangle
  return <Rectangle {...rest} /> ;
};

interface CustomLegendProps {
  payload?: Array <{ value: string; color: string }> ;
}

// The CustomLegend remains unchanged.
const CustomLegend = (props: CustomLegendProps) => {
  const { payload } = props;
  return (
    <div className="ml-8 flex items-center justify-center pb-6">
      {payload.map((entry, index) => (
        <div key={`item-${index}`} className="mr-4 flex items-center last:mr-0">
          <div
            className="mr-2 h-3 w-3"
            style={{
              backgroundColor: entry.color,
              borderRadius: "3px",
            }}
          />
          <span className="text-xs font-medium text-neutral-600">
            {entry.value}
          </span>
        </div>
      ))}
    </div>
  );
};

interface BarChartProps {
  data: Record <string, any> [];
  xAxisKey: string;
  dataKeys: Array <{ key: string; name: string; shorthand?: string }> ;
  colors: string[];
  showXAxisLine?: boolean;
  radiusValue?: number;
  maxBarSize?: number;
  barCategoryGap?: string;
  barSize?: number;
  t?: (key: string, values?: Record <string, any> , fallback?: string) => string;
}

/**
 * BarChart component with stacked bars, tooltips, and legends.
 * Perfect for displaying comparative data with multiple categories.
 */
const CustomBarChart = ({
  data,
  xAxisKey,
  dataKeys,
  colors,
  showXAxisLine = true,
  radiusValue = 6,
  maxBarSize = 60,
  barCategoryGap = "35%",
  barSize,
  t = tMockFn,
}) => {
  const tickFontSize = data && data.length > 3 ? 10 : 12;

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{
          top: 20,
          right: 10,
          left: -20,
          bottom: 5,
        }}
        barCategoryGap={barCategoryGap}
        barSize={barSize}
      >
        <CartesianGrid vertical={false} stroke="#d9d9d9" />
        <XAxis
          dataKey={xAxisKey}
          axisLine={showXAxisLine ? { stroke: "#d9d9d9" } : false}
          tickLine={false}
          tick={{
            fontSize: tickFontSize.toString(),
            fill: "#7b7b7b",
            fontWeight: 500,
          }}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: "12", fill: "#7b7b7b", fontWeight: 500 }}
        />
        <Tooltip
          content={({
            active,
            payload,
            label,
          }: {
            active?: boolean;
            payload?: any[];
            label?: string | number;
          }) => (
            <CustomTooltip
              active={active}
              payload={payload}
              label={label?.toString()}
              dataKeys={dataKeys}
            />
          )}
          cursor={{ fill: "transparent" }}
        />
        <Legend verticalAlign="top" align="center" content={ <CustomLegend /> } />
        {dataKeys.map((item) => {
          const barColor =
            item.key ===
            t("BarChart.chartKeyInstantOrders", {}, "Pesanan Instan")
              ? colors[0]
              : colors[1];

          return (
            <Bar
              key={item.key}
              dataKey={item.key}
              name={item.name}
              stackId="a"
              fill={barColor}
              maxBarSize={maxBarSize}
              // ✅ UPDATED: Use the new dynamic shape component for every bar segment.
              shape={(props: any) => (
                <DynamicRoundedBar
                  payload={props.payload}
                  dataKeys={dataKeys}
                  currentDataKey={item.key}
                  radiusValue={radiusValue}
                  x={props.x}
                  y={props.y}
                  width={props.width}
                  height={props.height}
                  fill={props.fill}
                />
              )}
              activeBar={false}
            />
          );
        })}
      </BarChart>
    </ResponsiveContainer>
  );
};

export { CustomBarChart as BarChart };

```

---

# DonutChart

_Source: packages/ui/src/content/docs/components/Chart/DonutChart.mdx_

## Component Information

**Name:** DonutChart

**Description:** A responsive donut chart component with interactive tooltips and customizable legends. Ideal for displaying proportional data and percentages.

## Imports

```javascript
import React from "react";

import { cn, formatNumberShorthand } from "@muatmuat/lib/utils";
import { DonutChart } from "@muatmuat/ui/Chart";

import { DonutChartPreview } from "../../preview/DonutChart.preview";
```

## Overview

**Description:** A responsive donut chart component with interactive tooltips and customizable legends. Ideal for displaying proportional data and percentages.

**Component:** DonutChart

## Usage

<DonutChartPreview />

```jsx
const sampleData = [
  {
    name: "Category A",
    value: 350,
    color: "#FFC217",
    percentage: "35%",
    unit: "items",
  },
  {
    name: "Category B",
    value: 450,
    color: "#4F46E5",
    percentage: "45%",
    unit: "items",
  },
  {
    name: "Category C",
    value: 200,
    color: "#10B981",
    percentage: "20%",
    unit: "items",
  },
];

function MyDonutChart() {
  return (
    <DonutChart
      data={sampleData}
      showThirdRow={false}
      prefixTooltipCenterValue=""
      showTextLabel={true}
      LegendSecondRowSufix={true}
    />
  );
}
```

## API Reference

### Props

| Prop                            | Type                                                                                                            | Default | Description                                                      |
| ------------------------------- | --------------------------------------------------------------------------------------------------------------- | ------- | ---------------------------------------------------------------- |
| data                            | `Array&lt;{name: string, value: number, color: string, percentage?: string, unit?: string, price?: number}&gt;` | -       | **Required**. Array of data objects for the donut chart segments |
| className                       | `string`                                                                                                        | -       | Additional CSS classes for the main container                    |
| tooltipClassname                | `string`                                                                                                        | -       | CSS classes for the tooltip container                            |
| legendClassname                 | `string`                                                                                                        | -       | CSS classes for the legend container                             |
| itemLegendClassname             | `string`                                                                                                        | -       | CSS classes for individual legend items                          |
| chartClassname                  | `string`                                                                                                        | -       | CSS classes for the chart container                              |
| textTooltipClassname            | `string`                                                                                                        | -       | CSS classes for tooltip text                                     |
| centerTooltipClassname          | `string`                                                                                                        | -       | CSS classes for center tooltip                                   |
| centerTextTitleTooltipClassname | `string`                                                                                                        | -       | CSS classes for center tooltip title text                        |
| centerTextLabelClassname        | `string`                                                                                                        | -       | CSS classes for center tooltip label text                        |
| prefixTooltipCenterText         | `string`                                                                                                        | `""`    | Prefix text for the center tooltip                               |
| prefixTooltipCenterValue        | `string`                                                                                                        | `""`    | Prefix for the center tooltip value                              |
| showTextLabel                   | `boolean`                                                                                                       | `true`  | Whether to show text labels in tooltips                          |
| showThirdRow                    | `boolean`                                                                                                       | `false` | Whether to show a third row in legend items                      |
| LegendSecondRowSufix            | `boolean`                                                                                                       | `true`  | Whether to show unit suffix in legend second row                 |

### Types

```typescript
interface DonutChartProps {
  data: Array<{
    name: string;
    value: number;
    color: string;
    percentage?: string;
    unit?: string;
    price?: number;
  }>;
  className?: string;
  tooltipClassname?: string;
  legendClassname?: string;
  itemLegendClassname?: string;
  chartClassname?: string;
  textTooltipClassname?: string;
  centerTooltipClassname?: string;
  centerTextTitleTooltipClassname?: string;
  centerTextLabelClassname?: string;
  prefixTooltipCenterText?: string;
  prefixTooltipCenterValue?: string;
  showTextLabel?: boolean;
  showThirdRow?: boolean;
  LegendSecondRowSufix?: boolean;
}
```

## Behavior

- Displays donut chart with center value and label display
- Supports interactive tooltips on chart segments
- Includes customizable legend with percentage and value information
- Provides center tooltip with total value summary
- Supports optional third row for price information in legends
- Maintains responsive design with consistent sizing
- Uses shorthand number formatting for large values

**Variants**: single segment (2 segments), multi-segment (3+ segments)
**Sizes**: standard (168x168px), customizable via chartClassname
**Interaction**: hover tooltips, center value tooltip

## Component Code

```tsx
import {
  type ChartDataEntry,
  type CustomLegendProps,
  type CustomRechartsTooltipProps,
  type DonutChartProps,
} from "@muatmuat/ui/types";
import {
  Tooltip as RadixTooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import {
  Cell,
  Pie,
  PieChart,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
} from "recharts";

const CustomRechartsTooltip: React.FC<CustomRechartsTooltipProps> = ({
  active,
  payload,
  tooltipClassname,
  textTooltipClassname,
  textLabel,
  prefixTooltipCenterValue = "",
  showTextLabel = true,
}) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div
        className={cn(
          "pointer-events-none flex h-[36px] w-[112px] items-center justify-start rounded-lg border border-neutral-200 bg-white p-2 shadow-lg",
          tooltipClassname
        )}
      >
        <div
          className={cn(
            "flex flex-col text-xxs font-semibold text-neutral-900",
            textTooltipClassname
          )}
        >
          <p className=""> {data.name}: </p>
          <p className="">
            {`${prefixTooltipCenterValue}${data.value.toLocaleString("id-ID")}${showTextLabel ? ` ${textLabel}` : ""}`}
          </p>
        </div>
      </div>
    );
  }
  return null;
};

const CustomLegend: React.FC<CustomLegendProps> = ({
  data,
  showThirdRow,
  legendClassname,
  itemLegendClassname,
  secondRowSufix = true,
  sufixValueLegend = "",
}) => (
  <div className={cn("flex flex-col justify-center gap-y-3", legendClassname)}>
    {data.map((entry, index) => (
      <div
        key={`item-${index}`}
        className={cn("flex items-center gap-x-3", itemLegendClassname)}
      >
        <div
          className="h-3 w-3 flex-shrink-0"
          style={{ backgroundColor: entry.color }}
        />
        <div className="flex flex-col">
          <p className="text-xxs font-medium text-neutral-900">
            {" "}
            {`${entry.name} (${entry.percentage})`}{" "}
          </p>
          <p className="text-xxs font-bold text-neutral-900">
            {" "}
            {`${sufixValueLegend}${entry.value.toLocaleString(
              "id-ID"
            )}${secondRowSufix ? ` ${entry.unit}` : ""}`}{" "}
          </p>
          {showThirdRow && entry.price && (
            <p className="text-xxs font-medium text-neutral-900">
              {" "}
              {`Rp${entry.price.toLocaleString("id-ID")}`}{" "}
            </p>
          )}
        </div>
      </div>
    ))}
  </div>
);

const DonutChart: React.FC<DonutChartProps> = ({
  data,
  className,
  tooltipClassname,
  legendClassname,
  itemLegendClassname,
  chartClassname,
  textTooltipClassname,
  centerTooltipClassname,
  textCenterTooltipClassname,
  centerTextLabelClassname,
  centerTextTitleTooltipClassname,
  prefixTooltipCenterText = "",
  prefixTooltipCenterValue = "",
  showTextLabel = true,
  showThirdRow = false,
  LegendSecondRowSufix = true,
}) => {
  const textLabel = data[0]?.unit || "";
  const centerTextValue = data[0]?.value || 0;
  const centerTextLabel = textLabel;
  // Removed the hardcoded const prefixTooltipCenterValue = ""

  return (
    <TooltipProvider>
      <div className={cn("flex items-center gap-x-6 p-4", className)}>
        <div
          className={cn(
            "relative h-[168px] w-[168px] flex-shrink-0",
            chartClassname
          )}
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <RechartsTooltip
                content={({ active, payload }) => (
                  <CustomRechartsTooltip
                    active={active}
                    payload={payload}
                    tooltipClassname={tooltipClassname}
                    textLabel={textLabel}
                    textTooltipClassname={textTooltipClassname}
                    prefixTooltipCenterValue={prefixTooltipCenterValue}
                    showTextLabel={showTextLabel}
                  />
                )}
                cursor={{ fill: "transparent" }}
                wrapperStyle={{ zIndex: 999 }}
              />
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius="65%"
                outerRadius="100%"
                labelLine={false}
                label={false}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    stroke="none"
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          <RadixTooltip>
            <TooltipTrigger asChild>
              <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 cursor-pointer text-center">
                <p
                  className={cn(
                    "text-base font-bold text-neutral-900",
                    centerTextTitleTooltipClassname
                  )}
                >
                  {formatNumberShorthand(centerTextValue)}
                </p>
                <p
                  className={cn(
                    "text-base font-bold text-neutral-900",
                    centerTextLabelClassname
                  )}
                >
                  {centerTextLabel}
                </p>
              </div>
            </TooltipTrigger>
            <TooltipContent
              className={cn(
                "z-50 flex h-auto min-h-[36px] w-auto min-w-[112px] items-center justify-start rounded-lg border border-neutral-200 bg-white p-2 shadow-lg",
                centerTooltipClassname
              )}
            >
              <div
                className={cn(
                  "flex flex-col items-start text-start text-xxs font-semibold text-neutral-900",
                  textCenterTooltipClassname
                )}
              >
                <p>
                  {prefixTooltipCenterValue}
                  {centerTextValue.toLocaleString("id-ID")}
                </p>
                <div className="flex flex-row gap-x-[2px]">
                  {prefixTooltipCenterText && (
                    <p> {prefixTooltipCenterText} </p>
                  )}
                  <p> {centerTextLabel} </p>
                </div>
              </div>
            </TooltipContent>
          </RadixTooltip>
        </div>

        <CustomLegend
          data={data}
          showThirdRow={showThirdRow}
          legendClassname={legendClassname}
          itemLegendClassname={itemLegendClassname}
          secondRowSufix={LegendSecondRowSufix}
          sufixValueLegend={prefixTooltipCenterValue}
        />
      </div>
    </TooltipProvider>
  );
};

export { DonutChart };
```

---

# LineChart

_Source: packages/ui/src/content/docs/components/Chart/LineChart.mdx_

## Component Information

**Name:** LineChart

**Description:** A responsive line chart with area fill and interactive tooltips. Perfect for displaying trends over time with smooth animations.

## Imports

```javascript
import { formatNumberShorthand } from "@muatmuat/lib/utils";
import { LineChart } from "@muatmuat/ui/Chart";

import { tMockFn } from "../../lib/mock-t";
import { LineChartPreview } from "../../preview/LineChart.preview";
```

## Overview

**Description:** A responsive line chart with area fill and interactive tooltips. Perfect for displaying trends over time with smooth animations.

**Component:** LineChart

## Usage

<LineChartPreview />

```jsx
const sampleData = [
  { dateLabel: "Jan", tooltipDateLabel: "January 2024", income: 4500000 },
  { dateLabel: "Feb", tooltipDateLabel: "February 2024", income: 5200000 },
  { dateLabel: "Mar", tooltipDateLabel: "March 2024", income: 4800000 },
  { dateLabel: "Apr", tooltipDateLabel: "April 2024", income: 6700000 },
  { dateLabel: "May", tooltipDateLabel: "May 2024", income: 7200000 },
  { dateLabel: "Jun", tooltipDateLabel: "June 2024", income: 6500000 },
];

function MyLineChart() {
  return <LineChart data={sampleData} width="100%" height={182} />;
}
```

## API Reference

### Props

| Prop   | Type                                                                         | Default | Description                                                           |
| ------ | ---------------------------------------------------------------------------- | ------- | --------------------------------------------------------------------- | ---------------------------- |
| data   | `Array&lt;{dateLabel: string, tooltipDateLabel: string, income: number}&gt;` | -       | **Required**. Array of data objects containing date and income values |
| width  | `string                                                                      | number` | `"100%"`                                                              | Width of the chart container |
| height | `number`                                                                     | `182`   | Height of the chart container                                         |

### Types

```typescript
interface LineChartProps {
  data: Array<{
    dateLabel: string;
    tooltipDateLabel: string;
    income: number;
  }>;
  width?: string | number;
  height?: number;
}
```

## Behavior

- Displays time series data with smooth area fill visualization
- Supports interactive tooltips showing date and revenue information
- Uses shorthand number formatting for large values
- Provides responsive design with configurable dimensions
- Includes grid lines for better data readability
- Maintains consistent styling with yellow accent colors
- Uses internationalization for text labels

**Variants**: standard area chart with line overlay
**Sizes**: responsive container with configurable width and height
**Interaction**: hover tooltips with formatted date and revenue data

## Component Code

```tsx
import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface LineChartProps {
  data: Array<{
    dateLabel: string;
    tooltipDateLabel: string;
    income: number;
    [key: string]: any;
  }>;
  width?: number | `${number}%`;
  height?: number | `${number}%`;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    payload: {
      tooltipDateLabel: string;
      [key: string]: any;
    };
    [key: string]: any;
  }>;
  t?: (
    key: string,
    params?: Record<string, any>,
    defaultValue?: string
  ) => string;
}

const CustomTooltip = ({
  active,
  payload,
  t = tMockFn,
}: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    // Get the tooltip label directly from the payload
    const tooltipLabel = payload[0]?.payload?.tooltipDateLabel || "";

    return (
      <div className="min-w-[150px] rounded-md bg-white p-3 shadow-muat">
        {/* Date Section - Now shows the tooltipDateLabel */}
        <div className="pb-2">
          <p className="text-xxs font-semibold text-neutral-900">
            {tooltipLabel}
          </p>
        </div>
        <hr className="absolute -ml-3 w-full" />
        {/* Content Section */}
        <div className="pt-2">
          <div className="flex items-center justify-between gap-x-2">
            <p className="text-xxs text-neutral-600">
              {t("LineChart.labelRevenue", {}, "Pendapatan")}:
            </p>
            <p className="text-xxs font-semibold text-neutral-900">
              {`Rp${new Intl.NumberFormat("id-ID").format(
                payload[0]?.value || 0
              )}`}
            </p>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

const LineChart = ({
  data,
  width = "100%" as const,
  height = 182,
}: LineChartProps) => {
  const yAxisFormatter = (value: number): string => {
    if (value === 0) return "";
    return `${formatNumberShorthand(value)}`;
  };

  return (
    <ResponsiveContainer width={width} height={height}>
      <AreaChart
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <XAxis
          dataKey="dateLabel" // Use dateLabel for the X-axis ticks
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 12, fill: "#7B7B7B", fontWeight: "500" }}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tickFormatter={yAxisFormatter}
          tick={{ fontSize: 12, fill: "#7B7B7B", fontWeight: "500" }}
        />
        <Area
          type="linear"
          dataKey="income" // Use income for the area value
          stroke="none"
          fill="#FFFBEB"
          fillOpacity={1}
          activeDot={false}
        />
        <CartesianGrid vertical={false} style={{ stroke: "#F1F1F1" }} />
        <Tooltip
          cursor={{ strokeDasharray: "3 3" }}
          content={({ active, payload }) => (
            <CustomTooltip active={active} payload={payload} />
          )}
        />
        <Line
          type="linear"
          dataKey="income" // Use income for the line value
          stroke="#FFC217"
          strokeWidth={3}
          dot={false}
          activeDot={{
            r: 6,
            fill: "#FFC217",
            stroke: "none",
          }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export { LineChart };
```

---

# Collapsible

_Source: packages/ui/src/content/docs/components/Collapsible/Collapsible.mdx_

## Component Information

**Name:** Collapsible

**Description:** Expandable and collapsible content areas with smooth animations and accessibility

## Imports

```javascript
import React, { createContext, useContext } from "react";

import { cn } from "@muatmuat/lib/utils";
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";

import { CollapsiblePreview } from "../../preview/Collapsible.preview";
```

## Overview

**Description:** Expandable and collapsible content areas with smooth animations and accessibility

**Component:** Collapsible

## Usage

<CollapsiblePreview />

```jsx
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@muatmuat/ui/Collapsible";

// Basic collapsible section
<Collapsible>
  <CollapsibleTrigger> Click to expand </CollapsibleTrigger>
  <CollapsibleContent>
    <p> This content can be expanded and collapsed. </p>
  </CollapsibleContent>
</Collapsible>;

// With controlled state
function ControlledCollapsible() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger>
        {({ open }) => (open ? "Collapse" : "Expand")}
      </CollapsibleTrigger>
      <CollapsibleContent>
        <p> Controlled content area. </p>
      </CollapsibleContent>
    </Collapsible>
  );
}

// Nested collapsibles
<Collapsible>
  <CollapsibleTrigger> Parent Section </CollapsibleTrigger>
  <CollapsibleContent>
    <p> Parent content. </p>
    <Collapsible>
      <CollapsibleTrigger> Child Section </CollapsibleTrigger>
      <CollapsibleContent>
        <p> Nested child content. </p>
      </CollapsibleContent>
    </Collapsible>
  </CollapsibleContent>
</Collapsible>;
```

## API Reference

### Collapsible Props

| Prop         | Type                      | Default     | Description                              |
| ------------ | ------------------------- | ----------- | ---------------------------------------- |
| children     | `React.ReactNode`         | Required    | Content to render inside the collapsible |
| className    | `string`                  | `""`        | Additional CSS classes for the container |
| open         | `boolean`                 | `undefined` | Controlled open state                    |
| defaultOpen  | `boolean`                 | `false`     | Default open state when uncontrolled     |
| onOpenChange | `(open: boolean) => void` | `undefined` | Callback when open state changes         |

### CollapsibleTrigger Props

| Prop      | Type                                                                    | Default  | Description                            |
| --------- | ----------------------------------------------------------------------- | -------- | -------------------------------------- |
| children  | `React.ReactNode \| (({ open }: { open: boolean }) => React.ReactNode)` | Required | Trigger content or render prop         |
| className | `string`                                                                | `""`     | Additional CSS classes for the trigger |

### CollapsibleContent Props

| Prop      | Type              | Default  | Description                                 |
| --------- | ----------------- | -------- | ------------------------------------------- |
| children  | `React.ReactNode` | Required | Content to render when expanded             |
| className | `string`          | `""`     | Additional CSS classes for the content area |

### Types

```typescript
export interface CollapsibleProps {
  children: React.ReactNode;
  className?: string;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export interface CollapsibleTriggerProps {
  children:
    | React.ReactNode
    | (({ open }: { open: boolean }) => React.ReactNode);
  className?: string;
}

export interface CollapsibleContentProps {
  children: React.ReactNode;
  className?: string;
}

export interface CollapsibleContextType {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
```

## Behavior

- Built on Radix UI Collapsible primitive for accessibility and behavior
- Smooth CSS animations for expand/collapse transitions
- Supports both controlled and uncontrolled state management
- Context-based state sharing between trigger and content
- Trigger supports render prop pattern for dynamic content based on open state
- Fully keyboard accessible with proper ARIA attributes
- Supports nested collapsibles without state conflicts
- Content area automatically handles overflow during animations

## Component Code

```tsx
import {
  CollapsibleContentProps,
  CollapsibleContextType,
  CollapsibleProps,
  CollapsibleTriggerProps,
} from "@muatmuat/ui/types";

const CollapsibleContext = createContext<CollapsibleContextType>({
  open: false,
  onOpenChange: () => {},
});

export const useCollapsible = (): CollapsibleContextType => {
  const context = useContext(CollapsibleContext);
  if (!context) {
    throw new Error(
      "useCollapsible must be used within a Collapsible component"
    );
  }
  return context;
};

export const Collapsible = React.forwardRef<
  React.ElementRef<typeof CollapsiblePrimitive.Root>,
  CollapsibleProps
>(({ children, className, ...props }, ref) => {
  const [open, setOpen] = React.useState(props.defaultOpen || false);

  const contextValue: CollapsibleContextType = {
    open: props.open !== undefined ? props.open : open,
    onOpenChange: props.onOpenChange || setOpen,
  };

  return (
    <CollapsibleContext.Provider value={contextValue}>
      <CollapsiblePrimitive.Root
        ref={ref}
        open={contextValue.open}
        onOpenChange={contextValue.onOpenChange}
        className={cn("w-full overflow-hidden", className)}
        {...props}
      >
        {children}
      </CollapsiblePrimitive.Root>
    </CollapsibleContext.Provider>
  );
});

Collapsible.displayName = "Collapsible";

export const CollapsibleTrigger = React.forwardRef<
  React.ElementRef<typeof CollapsiblePrimitive.Trigger>,
  CollapsibleTriggerProps
>(({ className, children, ...props }, ref) => {
  const { open } = useCollapsible();

  return (
    <CollapsiblePrimitive.Trigger
      ref={ref}
      className={cn(
        "[&[data-state=open]> svg]:rotate-180 flex w-full items-center justify-between py-4 text-sm font-medium transition-all hover:underline",
        className
      )}
      {...props}
    >
      {/* kalau children function, kasih open */}
      {typeof children === "function" ? children({ open }) : children}
    </CollapsiblePrimitive.Trigger>
  );
});

CollapsibleTrigger.displayName = "CollapsibleTrigger";

export const CollapsibleContent = React.forwardRef<
  React.ElementRef<typeof CollapsiblePrimitive.Content>,
  CollapsibleContentProps
>(({ className, children, ...props }, ref) => {
  return (
    <CollapsiblePrimitive.Content
      ref={ref}
      className={cn(
        "overflow-hidden text-sm data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down",
        className
      )}
      {...props}
    >
      {children}
    </CollapsiblePrimitive.Content>
  );
});

CollapsibleContent.displayName = "CollapsibleContent";
```

---

# CropperPreviewResponsive

_Source: packages/ui/src/content/docs/components/Cropper/CropperPreviewResponsive.mdx_

## Component Information

**Name:** CropperPreviewResponsive

**Description:** A responsive preview component for cropped images with mobile-optimized interface and upload options.

## Imports

```javascript
import { useState } from "react";

import { CropperPreviewResponsive } from "@muatmuat/ui/Cropper";
import { ImageComponent } from "@muatmuat/ui/ImageComponent";

import { CropperPreviewResponsivePreview } from "../../preview/CropperPreviewResponsive.preview";
import { Button } from "../Button";
import { IconComponent } from "../IconComponent";
import { CropperPreviewResponsiveProps } from "./types";
```

## Overview

**Description:** A responsive preview component for cropped images with mobile-optimized interface and upload options.

**Component:** CropperPreviewResponsive

## Usage

<CropperPreviewResponsivePreview />

```jsx
export default function Example() {
  const [isShowPreview, setIsShowPreview] = useState(false);
  const [previewImage] = useState("https://picsum.photos/150");

  const uploadOptions = [
    {
      title: "Camera",
      src: "/icons/camera.svg",
      onClick: () => console.log("Camera clicked"),
    },
    {
      title: "Gallery",
      src: "/icons/gallery.svg",
      onClick: () => console.log("Gallery clicked"),
    },
  ];

  const handleConfirm = () => {
    console.log("Image confirmed");
    setIsShowPreview(false);
  };

  const handleCancel = () => {
    console.log("Image cancelled");
    setIsShowPreview(false);
  };

  return (
    <div className="p-6">
      <button
        onClick={() => setIsShowPreview(true)}
        className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      >
        Show Preview
      </button>

      <CropperPreviewResponsive
        isOpen={isShowPreview}
        src={previewImage}
        title="Upload Foto"
        description="Max. size foto 10MB"
        setIsShowPreview={setIsShowPreview}
        onConfirm={handleConfirm}
        onCancelCrop={handleCancel}
        uploadOptions={uploadOptions}
      />
    </div>
  );
}
```

## API Reference

### Props

| Prop             | Type                      | Default                 | Description                                                      |
| ---------------- | ------------------------- | ----------------------- | ---------------------------------------------------------------- |
| src              | `string`                  | `required`              | The image source URL or data URL for preview                     |
| title            | `string`                  | `"Upload Foto"`         | Title for the preview screen                                     |
| description      | `string`                  | `"Max. size foto 10MB"` | Description text for the preview screen                          |
| setIsShowPreview | `(show: boolean) => void` | `required`              | Function to control preview visibility                           |
| onConfirm        | `() => void`              | `() => {}`              | Callback function triggered when user confirms the cropped image |
| uploadOptions    | `Array <UploadOption> `   | `[]`                    | Array of upload options with onClick handlers                    |
| onCancelCrop     | `() => void`              | `undefined`             | Callback function triggered when user cancels cropping           |
| HeaderMobile     | `React.ComponentType`     | `undefined`             | Custom header component for mobile layout                        |

### Types

```typescript
interface UploadOption {
  title: string;
  src: string;
  onClick: () => void;
}

interface HeaderMobileProps {
  onBack: () => void;
  title: string;
}
```

## Behavior

- Full-screen mobile preview interface with header navigation
- Bottom sheet for upload source selection (Camera/Gallery)
- Circular preview display with proper image aspect ratio
- Edit functionality with upload options modal
- Mobile-optimized touch interactions and layouts
- Optional custom header component integration

**Variants**: Full-screen mobile layout with bottom sheet interaction
**Sizes**: Full viewport coverage with standardized preview dimensions
**Key Guidelines**:

- Use as preview step in mobile image upload workflows
- Provide meaningful upload options for your use case
- Ensure preview image source is valid and accessible
- Handle both confirmation and cancellation workflows
- Consider integrating with app navigation system

## Component Code

```tsx
import {
  BottomSheet,
  BottomSheetClose,
  BottomSheetContent,
  BottomSheetHeader,
  BottomSheetTitle,
} from "../BottomSheet/BottomSheet";

// HeaderMobile should be provided by the consuming application
// import HeaderMobile from "@muatmuat/ui/container/HeaderMobile/HeaderMobile";

/**
 * A responsive preview component for cropped images with mobile-optimized interface and upload options.
 * Features a full-screen mobile layout with header, preview area, and bottom sheet for upload source selection.
 */
export const CropperPreviewResponsive = ({
  src,
  title = "Upload Foto",
  setIsShowPreview,
  onConfirm = () => {},
  uploadOptions,
  onCancelCrop,
  // 24. THP 2 - MOD001 - MP - 015 - QC Plan - Web - MuatParts - Seller - Paket 039 A - Profil Seller - LB - 0066
  description = "Max. size foto 10MB",
  HeaderMobile, // Component passed from consuming application
}: CropperPreviewResponsiveProps) => {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const handleEditImage = () => setIsBottomSheetOpen(true);

  return (
    <div className="fixed left-0 top-0 z-50 h-screen w-full bg-white">
      {HeaderMobile && (
        <HeaderMobile
          onBack={() => {
            onCancelCrop();
            setIsShowPreview(false);
          }}
          title={title}
        />
      )}
      <div className="mt-[62px] flex h-full min-h-screen flex-col items-center">
        <div className="flex aspect-square w-full justify-center bg-[#cccccc] p-4">
          <div className="overflow-hidden rounded-full bg-neutral-50">
            <ImageComponent
              alt="preview"
              className="size-full"
              src={src}
              width={100}
              height={100}
            />
          </div>
        </div>
        <Button
          className="mt-6 h-10 px-6"
          variant="muatparts-primary-secondary"
          onClick={handleEditImage}
        >
          Ubah Foto
        </Button>
        <div className="mt-3 text-sm font-medium leading-[16.8px] text-[#676767]">
          {/* 24. THP 2 - MOD001 - MP - 015 - QC Plan - Web - MuatParts - Seller - Paket 039 A - Profil Seller - LB - 0066 */}
          {description}
        </div>
      </div>
      <div className="fixed bottom-0 left-0 w-full bg-neutral-50 px-4 py-3 shadow-muat">
        <Button
          className="h-8 w-full max-w-full"
          variant="muatparts-primary"
          onClick={onConfirm}
        >
          Simpan Foto
        </Button>
      </div>
      <BottomSheet open={isBottomSheetOpen} onOpenChange={setIsBottomSheetOpen}>
        <BottomSheetContent>
          <BottomSheetHeader>
            <BottomSheetClose />
            <BottomSheetTitle> Pilih Sumber Foto </BottomSheetTitle>
          </BottomSheetHeader>
          <div className="flex justify-around py-4">
            {uploadOptions.map((option, key) => (
              <div className="flex flex-col items-center gap-y-4" key={key}>
                <div
                  className="size-16 cursor-pointer rounded-[50px] bg-primary-700 p-5"
                  onClick={() => {
                    option.onClick();
                    setIsBottomSheetOpen(false);
                  }}
                >
                  <IconComponent src={option.src} size="medium" />
                </div>
                <span className="text-base font-semibold leading-[19.2px]">
                  {option.title}
                </span>
              </div>
            ))}
          </div>
        </BottomSheetContent>
      </BottomSheet>
    </div>
  );
};

CropperPreviewResponsive.displayName = "CropperPreviewResponsive";
```

---

# CropperPreviewScreen

_Source: packages/ui/src/content/docs/components/Cropper/CropperPreviewScreen.mdx_

## Component Information

**Name:** CropperPreviewScreen

**Description:** A screen-level preview component for displaying cropped images with footer actions and navigation integration.

## Imports

```javascript
import { useShallowCompareEffect } from "@muatmuat/hooks/use-shallow-effect";
import { useResponsiveNavigation } from "@muatmuat/lib/responsive-navigation";
import { CropperPreviewScreen } from "@muatmuat/ui/Cropper";
import { ImageComponent } from "@muatmuat/ui/ImageComponent";

import { CropperPreviewScreenPreview } from "../../preview/CropperPreviewScreen.preview";
import { Button } from "../Button";
import { ResponsiveFooter } from "../Footer";
import { CropperPreviewScreenProps } from "./types";
```

## Overview

**Description:** A screen-level preview component for displaying cropped images with footer actions and navigation integration.

**Component:** CropperPreviewScreen

## Usage

<CropperPreviewScreenPreview />

```jsx
export default function Example() {
  // Note: This component requires specific store and navigation context
  // This example is for documentation purposes only

  return (
    <div className="p-6">
      <div className="rounded border border-yellow-400 bg-yellow-100 px-4 py-3 text-yellow-700">
        <p className="font-semibold"> Component Requires Context </p>
        <p className="text-sm"> CropperPreviewScreen requires: </p>
        <ul className="mt-2 list-inside list-disc text-sm">
          <li> useResponsiveNavigation hook </li>
          <li> useImageUploaderStore hook </li>
          <li> useImageUploaderActions hook </li>
          <li> ResponsiveFooter component </li>
        </ul>
        <p className="mt-2 text-sm">
          This component is designed for specific navigation flows and cannot be
          used in isolation.
        </p>
      </div>
    </div>
  );
}
```

## API Reference

### Props

This component does not accept any props and relies entirely on store and navigation context.

### Context Requirements

The component requires the following context to be available:

- **useResponsiveNavigation**: For navigation management
- **useImageUploaderStore**: For accessing preview image data
- **useImageUploaderActions**: For updating upload state
- **ResponsiveFooter**: For footer action buttons

## Behavior

- Screen-level preview component with integrated footer actions
- Store-based state management for preview image data
- Automatic navigation handling for missing preview data
- Integrated footer with action buttons
- Navigation integration for workflow progression
- Responsive layout with proper image display

**Variants**: Full-screen layout with footer integration
**Sizes**: Responsive layout with aspect-square preview area
**Key Guidelines**:

- Use only within navigation-aware applications with proper store setup
- Ensure preview image data is available in store before mounting
- Configure navigation paths appropriately for your application flow
- Handle footer actions based on upload workflow requirements

## Component Code

```tsx
import {
  useImageUploaderActions,
  useImageUploaderStore,
} from "@muatmuat/ui/imageUploaderStore";

/**
 * A screen-level preview component for displaying cropped images with footer actions and navigation integration.
 * Designed for specific navigation flows with store integration and responsive footer support.
 */
export const CropperPreviewScreen = (_: CropperPreviewScreenProps) => {
  const navigation = useResponsiveNavigation();
  const { previewImage } = useImageUploaderStore();
  const { setIsReadyUploadPhoto } = useImageUploaderActions();

  useShallowCompareEffect(() => {
    if (!previewImage) {
      navigation.popTo("/InformasiPesanan");
    }
  }, [previewImage]);

  const handleSaveImage = () => {
    setIsReadyUploadPhoto(true);
    navigation.popTo("/InformasiPesanan");
  };

  return (
    <>
      <div className="mb-16 w-full bg-neutral-100">
        <div className="flex aspect-square w-full justify-center bg-[#cccccc] p-4">
          <div className="overflow-hidden rounded-full">
            <ImageComponent
              alt="preview"
              className="size-full bg-neutral-50"
              src={previewImage}
              width={100}
              height={100}
            />
          </div>
        </div>
        <div className="mt-6 flex flex-col items-center justify-center gap-y-3">
          <Button
            className="w-[134px]"
            variant="muatparts-primary-secondary"
            onClick={() => {}}
          >
            Ubah Foto
          </Button>
          <span className="text-sm font-medium leading-[14px] text-[#676767]">
            Max. size foto 10MB
          </span>
        </div>
      </div>
      <ResponsiveFooter>
        <Button
          variant="muatparts-primary"
          className="w-full"
          onClick={handleSaveImage}
          type="button"
        >
          Lanjut
        </Button>
      </ResponsiveFooter>
    </>
  );
};

CropperPreviewScreen.displayName = "CropperPreviewScreen";
```

---

# CropperResponsive

_Source: packages/ui/src/content/docs/components/Cropper/CropperResponsive.mdx_

## Component Information

**Name:** CropperResponsive

**Description:** A responsive image cropper component designed for mobile and full-screen experiences with overlay interface.

## Imports

```javascript
import { CropperResponsivePreview } from "../../preview/CropperResponsive.preview";

import { useState } from "react";

import { CropperResponsive } from "@muatmuat/ui/Cropper";

import React, { useRef, useState } from "react";

import Cropper from "react-cropper";

import { IconComponent } from "../IconComponent";
import style from "./CropperResponsive.module.scss";
import { CropperResponsiveProps } from "./types";

```

## Overview

**Description:** A responsive image cropper component designed for mobile and full-screen experiences with overlay interface.

**Component:** CropperResponsive

## Usage

<CropperResponsivePreview />

```jsx
export default function Example() {
  const [isOpen, setIsOpen] = useState(false);
  const [imageSource, setImageSource] = useState("");
  const [croppedImage, setCroppedImage] = useState(null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageSource(URL.createObjectURL(file));
      setIsOpen(true);
    }
  };

  const handleCropResult = (result) => {
    setCroppedImage(result);
    setIsOpen(false);
  };

  const handleClose = (cancelled) => {
    setIsOpen(false);
  };

  return (
    <div className="p-6">
      <input
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="mb-4 block w-full text-sm text-gray-500 file:mr-4 file:rounded-full file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100"
      />

      <CropperResponsive
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        imageSource={imageSource}
        result={handleCropResult}
        onClose={handleClose}
        isCircle={false}
        fileType="image/jpeg"
      />

      {croppedImage && (
        <div className="mt-4">
          <img
            src={croppedImage}
            alt="Cropped"
            className="h-32 w-32 rounded-full"
          />
        </div>
      )}
    </div>
  );
}
```

## API Reference

### Props

| Prop               | Type                             | Default        | Description                                            |
| ------------------ | -------------------------------- | -------------- | ------------------------------------------------------ |
| imageSource        | `string`                         | `""`           | The image source URL or data URL                       |
| result             | `(croppedImage: string) => void` | `undefined`    | Callback function triggered when cropping is completed |
| isOpen             | `boolean`                        | `required`     | Whether the cropper overlay is open                    |
| setIsOpen          | `(open: boolean) => void`        | `required`     | Function to control overlay open state                 |
| onClose            | `(cancelled: boolean) => void`   | `undefined`    | Callback function triggered when overlay is closed     |
| isCircle           | `boolean`                        | `false`        | Whether to crop as a circle                            |
| previewTitle       | `string`                         | `undefined`    | Title for preview screen                               |
| previewDescription | `string`                         | `undefined`    | Description for preview screen                         |
| uploadOptions      | `Array <UploadOption> `          | `undefined`    | Array of upload options for preview screen             |
| isShowPreview      | `boolean`                        | `false`        | Whether to show preview screen                         |
| setIsShowPreview   | `(show: boolean) => void`        | `undefined`    | Function to control preview state                      |
| fileType           | `string`                         | `"image/jpeg"` | File type for output image                             |

### Types

```typescript
interface UploadOption {
  title: string;
  src: string;
  onClick: () => void;
}
```

## Behavior

- Full-screen overlay interface optimized for mobile devices
- Zoom controls with intelligent zoom limits (2x max, 0.5x min of default)
- Circle cropping support with minimum crop box dimensions
- Integrated preview workflow with upload source selection
- Responsive design with proper aspect ratio handling
- State management for crop operations and preview workflow

**Variants**: Full-screen mobile overlay with header controls
**Sizes**: Full viewport coverage with aspect square constraint
**Key Guidelines**:

- Use for mobile-first image cropping workflows
- Ensure proper image source (URL or data URL) is provided
- Handle both crop completion and cancellation scenarios
- Configure zoom limits appropriately for use case

## Component Code

```tsx
import "cropperjs/dist/cropper.css";

//cropper

// import CropperPreviewResponsive from "@muatmuat/ui/CropperPreviewResponsive";
// TODO: This should be provided by the consuming application
// import { useHeader } from "@muatmuat/ui/common/ResponsiveContext";

import "./cropper_az.css";

/**
 * A responsive image cropper component designed for mobile and full-screen experiences with overlay interface.
 * Features a full-screen overlay with zoom controls, circle cropping support, and preview functionality.
 */
export const CropperResponsive = ({
  imageSource = "",
  result,
  isOpen,
  setIsOpen,
  onClose,
  isCircle = false,
  previewTitle,
  // 24. THP 2 - MOD001 - MP - 015 - QC Plan - Web - MuatParts - Seller - Paket 039 A - Profil Seller - LB - 0066
  previewDescription,
  uploadOptions,
  isShowPreview,
  setIsShowPreview,
  fileType,
}: CropperResponsiveProps) => {
  const cropperRef = useRef(null);
  const [previewImage, setPreviewImage] = useState(null);
  const defaultRatioRef = useRef(null);
  // const { setAppBar } = useHeader();

  const getCropData = () => {
    if (typeof cropperRef.current.cropper !== "undefined") {
      setPreviewImage(
        cropperRef.current?.cropper.getCroppedCanvas().toDataURL(fileType, 1.0)
      );
    }
    const cropper = cropperRef.current?.cropper;
    cropper.reset();
    setIsShowPreview(true);
  };

  const cancelCrop = () => {
    const cropper = cropperRef.current?.cropper;
    cropper.reset();
    // setAppBar({
    //   title: "Daftar Menjadi Toko",
    //   appBarType: "header_title",
    // });
    setIsOpen(false);
    onClose(true);
  };

  const handleConfirm = () => {
    //  setAppBar({
    //    title: "Daftar Menjadi Toko",
    //    appBarType: "header_title",
    //  });
    result(previewImage);
    setIsShowPreview(false);
    setIsOpen(false);
  };

  const handleZoom = (event) => {
    const oldRatio = event.detail.oldRatio;
    const newDefaultRatio =
      defaultRatioRef.current !== null ? defaultRatioRef.current : oldRatio;
    const ratio = event.detail.ratio;
    const isZoomingIn = ratio > oldRatio;
    defaultRatioRef.current = newDefaultRatio;
    // Only prevent zooming in beyond 2x the default ratio
    if (isZoomingIn && ratio > newDefaultRatio * 2) {
      event.preventDefault();
    }
    // Allow zooming out until minimum ratio (usually around 0.1 or lower)
    // You can adjust this minimum value based on your needs
    if (!isZoomingIn && ratio < newDefaultRatio / 2) {
      event.preventDefault();
    }
  };

  if (!isOpen) {
    return null;
  }

  // if (isShowPreview) {
  //   return (
  //     // 24. THP 2 - MOD001 - MP - 015 - QC Plan - Web - MuatParts - Seller - Paket 039 A - Profil Seller - LB - 0066
  //     // syntax fix CropperPreviewResponsive -> CropperReviewResponsive by fariz (tidak bisa build - biar cepat. kalau salah bisa direvert)
  //     <CropperPreviewResponsive
  //       title={previewTitle}
  //       description={previewDescription}
  //       src={previewImage}
  //       setIsShowPreview={setIsShowPreview}
  //       onConfirm={handleConfirm}
  //       uploadOptions={uploadOptions}
  //       onCancelCrop={cancelCrop}
  //     />
  //   );
  // }

  return (
    <>
      <div className={"fixed left-0 top-0 z-50 h-screen w-full bg-[#20242F]"}>
        <div className="flex flex-row items-center justify-between p-4 pt-3">
          <div className="flex flex-row items-center gap-x-3">
            {/* <button
                            onClick={() => setIsOpen(false)}
                        > */}
            <IconComponent
              className={style.close_btn_icon}
              src="/icons/silang.svg"
              size="medium"
              onClick={cancelCrop}
            />
            {/* </button> */}
            <span className="text-base font-medium leading-[19.2px] text-white">
              Cropper
            </span>
          </div>
          <IconComponent
            // className={style.close_btn_icon}
            src="/icons/check_white.svg"
            size="medium"
            onClick={getCropData}
          />
        </div>
        <div className="flex min-h-[600px]">
          <div
            className={`m-auto aspect-square w-full ${isCircle ? "modal-cropper-circle" : ""} `}
          >
            {/* <div className="absolute bottom-[7.5px] right-[8px] z-50 flex h-[80px] flex-col rounded-[12px] border-[1px] border-[#E2E2E2] bg-[white]">
              <div
                className="flex h-1/2 cursor-pointer items-center justify-center text-2xl text-[black]"
                onClick={zoomIn}
              >
                +
              </div>
              <div
                className="flex h-1/2 cursor-pointer items-center justify-center p-[15px] text-2xl text-[black]"
                onClick={zoomOut}
              >
                <div className="w-[12px] border-[1.25px] border-[#1B1B1B]"> </div>
              </div>
            </div> */}
            <Cropper
              ref={cropperRef}
              style={{ height: "100%", width: "100%" }}
              src={imageSource}
              aspectRatio={1}
              preview={".img-preview"}
              viewMode={0}
              background={true}
              responsive={true}
              autoCropArea={1}
              cropBoxResizable={true}
              minCropBoxHeight={isCircle ? 386 : 0}
              minCropBoxWidth={isCircle ? 300 : 0}
              zoom={handleZoom}
            />
          </div>
        </div>
      </div>
    </>
  );
};

CropperResponsive.displayName = "CropperResponsive";
```

---

# CropperScreen

_Source: packages/ui/src/content/docs/components/Cropper/CropperScreen.mdx_

## Component Information

**Name:** CropperScreen

**Description:** A screen-level cropper component that integrates with navigation and store management for image uploading workflows.

## Imports

```javascript
import React, { useRef } from "react";

import { useShallowCompareEffect } from "@muatmuat/hooks/use-shallow-effect";
import { useResponsiveNavigation } from "@muatmuat/lib/responsive-navigation";
import { CropperScreen } from "@muatmuat/ui/Cropper";
import Cropper from "react-cropper";

import { CropperScreenPreview } from "../../preview/CropperScreen.preview";
import { CropperScreenProps } from "./types";
```

## Overview

**Description:** A screen-level cropper component that integrates with navigation and store management for image uploading workflows.

**Component:** CropperScreen

## Usage

<CropperScreenPreview />

```jsx
export default function Example() {
  // Note: This component requires specific store and navigation context
  // This example is for documentation purposes only

  return (
    <div className="p-6">
      <div className="rounded border border-yellow-400 bg-yellow-100 px-4 py-3 text-yellow-700">
        <p className="font-semibold"> Component Requires Context </p>
        <p className="text-sm"> CropperScreen requires: </p>
        <ul className="mt-2 list-inside list-disc text-sm">
          <li> useResponsiveNavigation hook </li>
          <li> useImageUploaderStore hook </li>
          <li> useImageUploaderActions hook </li>
        </ul>
        <p className="mt-2 text-sm">
          This component is designed for specific navigation flows and cannot be
          used in isolation.
        </p>
      </div>
    </div>
  );
}
```

## API Reference

### Props

| Prop     | Type                            | Default     | Description                                        |
| -------- | ------------------------------- | ----------- | -------------------------------------------------- |
| isCircle | `boolean`                       | `false`     | Whether to crop as a circle                        |
| onClose  | `(cancelled?: boolean) => void` | `undefined` | Callback function triggered when cropper is closed |

## Behavior

- Screen-level component integrated with navigation system
- Store-based state management for image data
- Automatic navigation handling for missing image data
- Circle cropping support with proper constraints
- Zoom controls with intelligent limits
- Direct integration with preview workflow

**Variants**: Full-screen navigation component
**Sizes**: Full viewport with centered crop area
**Key Guidelines**:

- Use only within navigation-aware applications
- Ensure proper store initialization before mounting
- Handle navigation state changes appropriately
- Configure circle dimensions based on design requirements

## Component Code

```tsx
// import CropperResponsiveLayout from "@muatmuat/ui/CropperResponsiveLayout";
// TODO: This layout should be provided by the consuming application
// import CropperResponsiveLayout from "@muatmuat/ui/layout/Shipper/ResponsiveLayout/CropperResponsiveLayout";
// TODO: These stores should be provided by the consuming application
// import {
//   useImageUploaderActions,
//   useImageUploaderStore,
// } from "@muatmuat/ui/store/Shipper/forms/imageUploaderStore";
import {
  useImageUploaderActions,
  useImageUploaderStore,
} from "@muatmuat/ui/imageUploaderStore";
import "cropperjs/dist/cropper.css";

import "./cropper_az.css";

/**
 * A screen-level cropper component that integrates with navigation and store management for image uploading workflows.
 * Designed for specific navigation flows with store integration and responsive layout support.
 */
export const CropperScreen = ({ isCircle, onClose }: CropperScreenProps) => {
  const navigation = useResponsiveNavigation();
  const { image, imageFile } = useImageUploaderStore();
  const { setPreviewImage } = useImageUploaderActions();
  const cropperRef = useRef(null);
  const defaultRatioRef = useRef(null);

  useShallowCompareEffect(() => {
    if (!image || !imageFile) {
      navigation.popTo("/InformasiPesanan");
    }
  }, [image, imageFile]);

  const handleZoom = (event) => {
    const oldRatio = event.detail.oldRatio;
    const newDefaultRatio =
      defaultRatioRef.current !== null ? defaultRatioRef.current : oldRatio;
    const ratio = event.detail.ratio;
    const isZoomingIn = ratio > oldRatio;
    defaultRatioRef.current = newDefaultRatio;
    // Only prevent zooming in beyond 2x the default ratio
    if (isZoomingIn && ratio > newDefaultRatio * 2) {
      event.preventDefault();
    }
    // Allow zooming out until minimum ratio (usually around 0.1 or lower)
    // You can adjust this minimum value based on your needs
    if (!isZoomingIn && ratio < newDefaultRatio / 2) {
      event.preventDefault();
    }
  };

  const handlePreviewCroppedImage = () => {
    const cropper = cropperRef.current?.cropper;
    if (cropper) {
      // Get filename from imageFile or generate one
      // let fileName =
      //   imageFile?.name ||
      //   `cropped_image_${Date.now()}.${imageFile?.type?.split("/")[1] || "jpeg"}`;

      // // Ensure the filename doesn't have spaces or special characters
      // fileName = fileName.replace(/[^a-zA-Z0-9.-]/g, "_");

      setPreviewImage(
        cropperRef.current?.cropper
          .getCroppedCanvas()
          .toDataURL(imageFile.type, 0.7)
      ); // compress at 70%
      navigation.push("/CropperPreview");
    }
  };

  return (
    <>
      <div className="flex min-h-screen items-center">
        <div
          className={`aspect-square ${isCircle ? "modal-cropper-circle" : ""}`}
        >
          <Cropper
            ref={cropperRef}
            style={{ height: "100%", width: "100%" }}
            src={image}
            aspectRatio={1}
            preview={".img-preview"}
            viewMode={0}
            background={true}
            responsive={true}
            autoCropArea={1}
            cropBoxResizable={true}
            minCropBoxHeight={isCircle ? 386 : 0}
            minCropBoxWidth={isCircle ? 300 : 0}
            zoom={handleZoom}
          />
        </div>
      </div>
    </>
  );
};
```

---

# CropperWeb

_Source: packages/ui/src/content/docs/components/Cropper/CropperWeb.mdx_

## Component Information

**Name:** CropperWeb

**Description:** A web-based image cropper component with modal interface, zoom controls, and circle cropping support.

## Imports

```javascript
import { useState } from "react";
import React, { useCallback, useRef } from "react";

import { CropperWeb } from "@muatmuat/ui/Cropper";
import Cropper from "react-cropper";

import { CropperWebPreview } from "../../preview/CropperWeb.preview";
import { Button } from "../Button";
import { IconComponent } from "../IconComponent";
import { Modal, ModalContent, ModalTitle } from "../Modal";
import styles from "./CropperWeb.module.scss";
import { CropperWebProps } from "./types";
```

## Overview

**Description:** A web-based image cropper component with modal interface, zoom controls, and circle cropping support.

**Component:** CropperWeb

## Usage

<CropperWebPreview />

```jsx
export default function Example() {
  const [isOpen, setIsOpen] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imageSource, setImageSource] = useState("");
  const [croppedImage, setCroppedImage] = useState(null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
      setImageSource(URL.createObjectURL(file));
      setIsOpen(true);
    }
  };

  const handleCropResult = (result) => {
    setCroppedImage(result);
    setIsOpen(false);
  };

  const handleClose = (cancelled) => {
    setIsOpen(false);
  };

  return (
    <div className="p-6">
      <input
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="mb-4 block w-full text-sm text-gray-500 file:mr-4 file:rounded-full file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100"
      />

      <CropperWeb
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        imageFile={imageFile}
        imageSource={imageSource}
        result={handleCropResult}
        onClose={handleClose}
        isCircle={false}
        title="Unggah Gambar"
        variant="muattrans"
      />

      {croppedImage && (
        <div className="mt-4">
          <p className="mb-2 text-sm text-gray-600"> Cropped Image: </p>
          <img
            src={URL.createObjectURL(croppedImage)}
            alt="Cropped"
            className="h-32 w-32 rounded"
          />
        </div>
      )}
    </div>
  );
}
```

## API Reference

### Props

| Prop        | Type                             | Default           | Description                                            |
| ----------- | -------------------------------- | ----------------- | ------------------------------------------------------ |
| imageFile   | `File`                           | `undefined`       | The image file to be cropped                           |
| imageSource | `string`                         | `""`              | The image source URL or data URL                       |
| result      | `(croppedImage: string) => void` | `undefined`       | Callback function triggered when cropping is completed |
| isOpen      | `boolean`                        | `required`        | Whether the cropper modal is open                      |
| setIsOpen   | `(open: boolean) => void`        | `required`        | Function to control modal open state                   |
| onClose     | `(cancelled: boolean) => void`   | `undefined`       | Callback function triggered when modal is closed       |
| isCircle    | `boolean`                        | `false`           | Whether to crop as a circle                            |
| title       | `string`                         | `"Unggah Gambar"` | Modal title text                                       |
| variant     | `"muattrans" \| "muatparts"`     | `"muattrans"`     | Button styling variant                                 |
| aspectRatio | `number`                         | `1`               | Aspect ratio for cropping                              |
| viewMode    | `number`                         | `0`               | View mode for cropper behavior                         |
| onApply     | `(croppedImage: string) => void` | `undefined`       | Callback function when apply button is clicked         |

## Behavior

- Modal-based interface optimized for desktop/web environments
- Integrated zoom controls with visual buttons
- Circle cropping support with minimum dimension constraints
- Variant-based styling for different application themes
- File-based result handling with proper compression
- Modal state management with proper cleanup

**Variants**: muattrans (default), muatparts - different button styling themes
**Sizes**: Fixed modal size (424px width) with 386px crop area
**Key Guidelines**:

- Use for web/desktop image cropping workflows
- Ensure both imageFile and imageSource are provided for proper functionality
- Handle file result type appropriately (Blob/File vs string)
- Configure variant based on application theme requirements
- Use circle cropping for profile pictures/avatar uploads

## Component Code

```tsx
import "cropperjs/dist/cropper.css";

import "./cropper_az.css";

/**
 * A web-based image cropper component with modal interface, zoom controls, and circle cropping support.
 * Provides a complete cropping workflow with zoom in/out functionality and customizable modal styling.
 */
export const CropperWeb = ({
  imageFile,
  imageSource,
  result,
  isOpen,
  setIsOpen,
  onClose,
  isCircle = false,
  title = "Unggah Gambar",
  variant = "muattrans",
}: CropperWebProps) => {
  const cropperRef = useRef<any>(null);
  const defaultRatioRef = useRef<number | null>(null);

  const handleClose = useCallback(() => {
    const cropper = cropperRef.current?.cropper;
    if (cropper) {
      cropper.reset();
    }
    setIsOpen(false);
    if (onClose) {
      onClose(true); // Notify parent component of cancellation
    }
  }, [setIsOpen, onClose]);

  const getCropData = () => {
    const cropper = cropperRef.current?.cropper;
    if (cropper) {
      cropper.getCroppedCanvas().toBlob(
        (blob: Blob | null) => {
          if (blob) {
            const reader = new FileReader();
            reader.onload = () => {
              result?.(reader.result as string); // Pass data URL string
              cropper.reset();
              setIsOpen(false);
            };
            reader.readAsDataURL(blob);
          }
        },
        imageFile?.type,
        0.7 // compress at 70%
      );
    }
  };

  const zoomOut = () => {
    const cropper = cropperRef.current?.cropper;
    cropper?.zoom(-0.1);
  };

  const zoomIn = () => {
    const cropper = cropperRef.current?.cropper;
    cropper?.zoom(0.1);
  };

  const handleZoom = (event: any) => {
    const oldRatio = event.detail.oldRatio;
    const newDefaultRatio =
      defaultRatioRef.current !== null ? defaultRatioRef.current : oldRatio;
    const ratio = event.detail.ratio;
    const isZoomingIn = ratio > oldRatio;
    defaultRatioRef.current = newDefaultRatio;

    // Only prevent zooming in beyond 2x the default ratio
    if (isZoomingIn && ratio > newDefaultRatio * 2) {
      event.preventDefault();
    }
    // Allow zooming out until minimum ratio
    if (!isZoomingIn && ratio < newDefaultRatio / 2) {
      event.preventDefault();
    }
  };

  return (
    <Modal
      open={isOpen}
      onOpenChange={(open) => !open && handleClose()}
      closeOnOutsideClick
    >
      <ModalContent
        className={`${
          isCircle ? "modal-cropper-circle" : ""
        } w-[424px] rounded-xl bg-white px-6 py-9`}
      >
        <div className="mb-6 flex flex-col items-center gap-[18px]">
          <ModalTitle> {title} </ModalTitle>
          <div className="relative h-[386px] w-[386px]">
            <div className="absolute bottom-2 right-2 z-50 flex h-20 w-10 flex-col rounded-lg border border-[#E2E2E2] bg-white">
              <div
                className="flex h-1/2 cursor-pointer items-center justify-center"
                onClick={zoomIn}
                role="button"
                aria-label="Zoom In"
              >
                <IconComponent
                  className={styles.icon_zoom}
                  src="/icons/zoom_plus.svg"
                  width={20}
                  height={20}
                  alt="Zoom In"
                />
              </div>
              <div
                className="flex h-1/2 cursor-pointer items-center justify-center"
                onClick={zoomOut}
                role="button"
                aria-label="Zoom Out"
              >
                <IconComponent
                  className={styles.icon_zoom}
                  src="/icons/zoom_minus.svg"
                  width={20}
                  height={20}
                  alt="Zoom Out"
                />
              </div>
            </div>
            <Cropper
              ref={cropperRef}
              style={{ height: "100%", width: "100%" }}
              src={imageSource}
              aspectRatio={1}
              preview={".img-preview"}
              viewMode={0}
              background={true}
              responsive={true}
              autoCropArea={1}
              cropBoxResizable={true}
              minCropBoxHeight={isCircle ? 386 : 0}
              minCropBoxWidth={isCircle ? 386 : 0}
              zoom={handleZoom}
            />
            <div className="img-preview" />
          </div>
        </div>
        <div className="flex w-full items-center justify-between">
          <Button
            type="button"
            onClick={handleClose}
            variant={
              variant === "muatparts"
                ? "muatparts-primary-secondary"
                : "muattrans-primary-secondary"
            }
            className="min-w-[112px]"
          >
            Batal
          </Button>
          <Button
            type="button"
            onClick={getCropData}
            variant={
              variant === "muatparts"
                ? "muatparts-primary"
                : "muattrans-primary"
            }
            className="min-w-[112px]"
            autoFocus
          >
            Simpan
          </Button>
        </div>
      </ModalContent>
    </Modal>
  );
};

CropperWeb.displayName = "CropperWeb";
```

---

# CropperWebNew

_Source: packages/ui/src/content/docs/components/Cropper/CropperWebNew.mdx_

## Component Information

**Name:** CropperWebNew

**Description:** An enhanced web-based image cropper component with variant support, improved styling, and internationalization.

## Imports

```javascript
import { useState } from "react";
import { useCallback, useRef } from "react";

import { cn } from "@muatmuat/lib/utils";
import { CropperWebNew } from "@muatmuat/ui/Cropper";
import Cropper from "react-cropper";

import { tMockFn } from "../../lib/mock-t";
import { CropperWebNewPreview } from "../../preview/CropperWebNew.preview";
import { IconComponent } from "../IconComponent";
import { Modal, ModalContent, ModalTitle } from "../Modal";
import styles from "./CropperWeb.module.scss";
import { CropperWebNewProps } from "./types";
```

## Overview

**Description:** An enhanced web-based image cropper component with variant support, improved styling, and internationalization.

**Component:** CropperWebNew

## Usage

<CropperWebNewPreview />

```jsx
export default function Example() {
  const [isOpen, setIsOpen] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imageSource, setImageSource] = useState("");
  const [croppedImage, setCroppedImage] = useState(null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
      setImageSource(URL.createObjectURL(file));
      setIsOpen(true);
    }
  };

  const handleCropResult = (result) => {
    setCroppedImage(result);
    setIsOpen(false);
  };

  const handleClose = (cancelled) => {
    setIsOpen(false);
  };

  return (
    <div className="p-6">
      <input
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="mb-4 block w-full text-sm text-gray-500 file:mr-4 file:rounded-full file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100"
      />

      <CropperWebNew
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        imageFile={imageFile}
        imageSource={imageSource}
        result={handleCropResult}
        onClose={handleClose}
        isCircle={false}
        variant="muattrans"
        title="Upload Image"
      />

      {croppedImage && (
        <div className="mt-4">
          <p className="mb-2 text-sm text-gray-600"> Cropped File: </p>
          <div className="text-xs text-gray-500">
            Name: {croppedImage.name}
            <br />
            Size: {croppedImage.size} bytes
            <br />
            Type: {croppedImage.type}
          </div>
        </div>
      )}
    </div>
  );
}
```

## API Reference

### Props

| Prop        | Type                                                          | Default       | Description                                            |
| ----------- | ------------------------------------------------------------- | ------------- | ------------------------------------------------------ |
| imageFile   | `File`                                                        | `undefined`   | The image file to be cropped                           |
| imageSource | `string`                                                      | `""`          | The image source URL or data URL                       |
| result      | `(croppedFile: File) => void`                                 | `undefined`   | Callback function triggered when cropping is completed |
| isOpen      | `boolean`                                                     | `required`    | Whether the cropper modal is open                      |
| setIsOpen   | `(open: boolean) => void`                                     | `required`    | Function to control modal open state                   |
| onClose     | `(cancelled: boolean) => void`                                | `undefined`   | Callback function triggered when modal is closed       |
| isCircle    | `boolean`                                                     | `false`       | Whether to crop as a circle                            |
| title       | `string`                                                      | `undefined`   | Modal title text                                       |
| variant     | `"muattrans" \| "muatparts"`                                  | `"muattrans"` | Button styling variant                                 |
| aspectRatio | `number`                                                      | `1`           | Aspect ratio for cropping                              |
| viewMode    | `number`                                                      | `0`           | View mode for cropper behavior                         |
| onApply     | `(croppedImage: string) => void`                              | `undefined`   | Callback function when apply button is clicked         |
| t           | `(key: string, values?: object, fallback?: string) => string` | `tMockFn`     | Translation function for internationalization          |

## Behavior

- Enhanced modal interface with improved styling and UX
- Multiple styling variants for different application themes
- Internationalization support with translation function
- File-based result handling with automatic filename generation
- Enhanced button styling with proper focus states
- Improved modal behavior with better outside click handling

**Variants**: muattrans (default), muatparts - different color schemes and styling
**Sizes**: Fixed modal dimensions (424px width) with standardized crop area
**Key Guidelines**:

- Use as enhanced replacement for CropperWeb in new applications
- Configure translation function for multi-language support
- Handle File object results appropriately (not data URLs)
- Choose variant based on application design system
- Enable internationalization for global applications

## Component Code

```tsx
import "cropperjs/dist/cropper.css";

import "./cropper_az.css";

/**
 * An enhanced web-based image cropper component with variant support, improved styling, and internationalization.
 * Features multiple styling variants (muatparts/muatrans), translation support, and enhanced modal behavior.
 */
export const CropperWebNew = ({
  imageFile,
  imageSource,
  result,
  isOpen,
  setIsOpen,
  onClose,
  isCircle = false,
  title,
  variant = "muattrans",
  t = tMockFn,
}: CropperWebNewProps) => {
  const cropperRef = useRef(null);
  const defaultRatioRef = useRef(null);

  const buttonSecondaryVariants = {
    muatparts: "border-primary-700 text-primary-700",
    muatrans: "border-muat-trans-secondary-900 text-muat-trans-secondary-900",
  };
  const buttonPrimaryVariants = {
    muatparts: "bg-primary-700 text-neutral-50",
    muatrans: "bg-muat-trans-primary-400 text-neutral-900",
  };

  const cancelCrop = useCallback(() => {
    const cropper = cropperRef.current?.cropper;
    cropper?.reset();
    setIsOpen(false);
    onClose?.(true);
  }, [setIsOpen, onClose]);

  const getCropData = () => {
    const cropper = cropperRef.current?.cropper;
    if (cropper) {
      // Get filename from imageFile or generate one
      let fileName =
        imageFile?.name ||
        `cropped_image_${Date.now()}.${imageFile?.type?.split("/")[1] || "jpeg"}`;

      // Ensure the filename doesn't have spaces or special characters
      fileName = fileName.replace(/[^a-zA-Z0-9.-]/g, "_");

      cropper.getCroppedCanvas().toBlob(
        (blob) => {
          const file = new File([blob], fileName, { type: imageFile?.type });
          result(file); // Pass actual File object
          cropper.reset();
          setIsOpen(false);
        },
        imageFile?.type,
        0.7
      ); // compress at 70%
    }
  };

  const zoomOut = () => {
    const cropper = cropperRef.current?.cropper;
    cropper.zoom(-0.1);
  };

  const zoomIn = () => {
    const cropper = cropperRef.current?.cropper;
    cropper.zoom(0.1);
  };

  const handleZoom = (event) => {
    const oldRatio = event.detail.oldRatio;
    const newDefaultRatio =
      defaultRatioRef.current !== null ? defaultRatioRef.current : oldRatio;
    const ratio = event.detail.ratio;
    const isZoomingIn = ratio > oldRatio;
    defaultRatioRef.current = newDefaultRatio;
    // Only prevent zooming in beyond 2x the default ratio
    if (isZoomingIn && ratio > newDefaultRatio * 2) {
      event.preventDefault();
    }
    // Allow zooming out until minimum ratio (usually around 0.1 or lower)
    // You can adjust this minimum value based on your needs
    if (!isZoomingIn && ratio < newDefaultRatio / 2) {
      event.preventDefault();
    }
  };

  if (!isOpen) return null;

  return (
    <Modal
      open={isOpen}
      onOpenChange={setIsOpen}
      withCloseButton={false}
      closeOnOutsideClick={false}
    >
      <ModalContent
        className={`w-[424px] ${isCircle ? "modal-cropper-circle" : ""}`}
        type="muattrans"
      >
        <ModalTitle className="sr-only">
          {title || t("CropperWebNew.uploadImage", {}, "Unggah Gambar")}
        </ModalTitle>
        <div className="px-6 py-9">
          <div className="mb-6 flex flex-col items-center gap-[18px]">
            <span className="text-base font-bold leading-[19.2px] text-neutral-900">
              {title || t("CropperWebNew.uploadImage", {}, "Unggah Gambar")}
            </span>
            <div className="relative h-[386px] w-[386px]">
              <div className="absolute bottom-2 right-2 z-50 flex h-20 w-10 flex-col rounded-lg border border-[#E2E2E2] bg-white">
                <div
                  className="flex h-1/2 cursor-pointer items-center justify-center"
                  onClick={zoomIn}
                >
                  <IconComponent
                    className={styles.icon_zoom}
                    src="/icons/zoom_plus.svg"
                    width={20}
                    height={20}
                  />
                </div>
                <div
                  className="flex h-1/2 cursor-pointer items-center justify-center"
                  onClick={zoomOut}
                >
                  <IconComponent
                    className={styles.icon_zoom}
                    src="/icons/zoom_minus.svg"
                    width={20}
                    height={20}
                  />
                </div>
              </div>
              <Cropper
                ref={cropperRef}
                style={{ height: "100%", width: "100%" }}
                src={imageSource}
                aspectRatio={1}
                preview={".img-preview"}
                viewMode={0}
                background={true}
                responsive={true}
                autoCropArea={1}
                cropBoxResizable={true}
                minCropBoxHeight={isCircle ? 386 : 0}
                minCropBoxWidth={isCircle ? 386 : 0}
                zoom={handleZoom}
              />
              <div className="img-preview" />
            </div>
          </div>
          <div className="flex w-full items-center justify-between">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                cancelCrop();
              }}
              className={cn(
                "flex h-8 min-w-[112px] items-center justify-center rounded-full border bg-white px-3 outline-none",
                buttonSecondaryVariants[variant] ||
                  buttonSecondaryVariants.muatrans
              )}
            >
              <span className="text-sm font-semibold leading-[16.8px]">
                {t("CropperWebNew.cancel", {}, "Batal")}
              </span>
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                getCropData();
              }}
              className={cn(
                "flex h-8 min-w-[112px] items-center justify-center rounded-full px-3 outline-none",
                buttonPrimaryVariants[variant] || buttonPrimaryVariants.muatrans
              )}
              autoFocus
            >
              <span className="text-sm font-semibold leading-[16.8px]">
                {t("CropperWebNew.save", {}, "Simpan")}
              </span>
            </button>
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
};

CropperWebNew.displayName = "CropperWebNew";
```

---

# DisplayOptionsBar

_Source: packages/ui/src/content/docs/components/DisplayOptionsBar/DisplayOptionsBar.mdx_

## Component Information

**Name:** DisplayOptionsBar

**Description:** A horizontal bar for selecting display options with status filters, showing counts and optional notification indicators.

## Imports

```javascript
import { useState } from "react";

import { cn } from "@muatmuat/lib/utils";
import { DisplayOptionsBar } from "@muatmuat/ui/DisplayOptionsBar";

import { DisplayOptionsBarPreview } from "../../preview/DisplayOptionsBar.preview";
import { NotificationDot } from "../NotificationDot";
import { DisplayOptionsBarProps, StatusOption } from "./types";
```

## Overview

**Description:** A horizontal bar for selecting display options with status filters, showing counts and optional notification indicators.

**Component:** DisplayOptionsBar

## Usage

<DisplayOptionsBarPreview />

```jsx
function OrderFilterExample() {
  const [currentStatus, setCurrentStatus] = useState(null);

  const statusOptions = [
    { value: "pending", label: "Menunggu", count: 5, hasNotification: true },
    { value: "active", label: "Aktif", count: 12 },
    { value: "completed", label: "Selesai", count: 8 },
    {
      value: "cancelled",
      label: "Dibatalkan",
      count: 2,
      hasNotification: true,
    },
  ];

  return (
    <div className="space-y-4">
      <DisplayOptionsBar
        totalCount={27}
        statusOptions={statusOptions}
        currentStatus={currentStatus}
        onStatusChange={setCurrentStatus}
        showAllOption={true}
      />

      <div className="text-sm text-gray-600">
        Current filter: {currentStatus || "All"}
      </div>
    </div>
  );
}
```

## API Reference

### Props

| Prop           | Type             | Default | Description                                         |
| -------------- | ---------------- | ------- | --------------------------------------------------- |
| totalCount     | `number`         | 0       | Total count for all items (shown in 'Semua' option) |
| statusOptions  | `StatusOption[]` | []      | Array of status options to display                  |
| currentStatus  | `string\|null`   | null    | Currently selected status value                     |
| onStatusChange | `function`       | -       | Callback function when status is changed            |
| className      | `string`         | -       | Additional CSS classes for the container            |
| showAllOption  | `boolean`        | true    | Whether to show the 'Semua' option                  |

### StatusOption

| Property        | Type           | Description                                |
| --------------- | -------------- | ------------------------------------------ |
| value           | `string\|null` | The status value (null for "Semua" option) |
| label           | `string`       | Display label for the status               |
| count           | `number`       | Optional count to display in parentheses   |
| hasNotification | `boolean`      | Optional notification indicator            |

### Types

```typescript
interface StatusOption {
  value: string | null;
  label: string;
  count?: number;
  hasNotification?: boolean;
}

interface DisplayOptionsBarProps {
  totalCount?: number;
  statusOptions?: StatusOption[];
  currentStatus?: string | null;
  onStatusChange?: (status: string | null) => void;
  className?: string;
  showAllOption?: boolean;
}
```

## Behavior

- Displays status filter options as clickable pills with optional counts and notification indicators
- Automatically adds "Semua" option with total count when showAllOption is true
- Highlights the currently selected status with primary color styling
- Shows notification dots for status options that have pending notifications
- Supports empty status options array with graceful fallback handling
- Responsive design with proper text sizing and spacing
- Accessible button elements with proper labeling and keyboard navigation
- Smooth hover states and transitions for better user experience

**Variants**: with counts, without counts, with notifications, without "Semua" option, empty state
**Sizes**: Compact pill design with responsive text sizing

**Key Guidelines**:

- Use for filtering lists, tables, or data grids by status or category
- Provide meaningful labels that clearly describe each filter option
- Include count information when available to help users understand data distribution
- Leverage notification indicators for status options that require user attention
- Combine with proper state management for interactive filtering functionality
- Consider the data volume when deciding whether to show the "Semua" option

## Component Code

```tsx
export const DisplayOptionsBar = ({
  totalCount = 0,
  statusOptions = [],
  currentStatus = null,
  onStatusChange,
  className,
  showAllOption = true,
}: DisplayOptionsBarProps) => {
  const hasStatus = Array.isArray(statusOptions) && statusOptions.length > 0;

  const options: StatusOption[] = hasStatus
    ? showAllOption
      ? [{ value: null, label: `Semua (${totalCount})` }, ...statusOptions]
      : statusOptions
    : showAllOption
      ? [{ value: null, label: `Semua (${totalCount})` }]
      : [];

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <span className="text-xs font-bold"> Tampilkan: </span>
      <div className="flex items-center gap-2 text-xxs">
        {options.map((status) => (
          <button
            key={status.value ?? "all"}
            onClick={() => {
              onStatusChange?.(status.value);
            }}
            className={cn(
              "flex h-7 items-center gap-1 rounded-full px-4 font-semibold transition-colors",
              currentStatus === status.value
                ? "border border-primary-700 bg-primary-50 text-primary-700"
                : "border border-neutral-200 bg-neutral-200 hover:bg-neutral-100"
            )}
          >
            {status.label}
            {status.count !== undefined && (
              <span className="relative flex items-center">
                {" "}
                ({status.count})
                {status.hasNotification && (
                  <NotificationDot
                    position="absolute"
                    positionClasses="-right-2.5 top-0"
                    animated={false}
                    size="sm"
                    color="red"
                  />
                )}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};
```

---

# Dropdown

_Source: packages/ui/src/content/docs/components/Dropdown/Dropdown.mdx_

## Component Information

**Name:** Dropdown

**Description:** Compound component for dropdown menus with hover-based submenus and filter triggers built on Radix UI primitives

## Imports

```javascript
import { DropdownPreview } from "../../preview/Dropdown.preview";

import { useState } from "react";

import { Button } from "@muatmuat/ui/Button";
import { Dropdown } from "@muatmuat/ui/Dropdown";
import { IconComponent } from "@muatmuat/ui/IconComponent";

import * as React from "react";

import { cn } from "@muatmuat/lib/utils";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
import * as PopoverPrimitive from "@radix-ui/react-popover";

import { IconComponent } from "../IconComponent";
```

## Overview

**Description:** Compound component for dropdown menus with hover-based submenus and filter triggers built on Radix UI primitives

**Component:** Dropdown

## Usage

<DropdownPreview />

```jsx
function DropdownExample() {
  const [filterActive, setFilterActive] = useState(false);

  return (
    <div className="space-y-4">
      {/* Basic Dropdown */}
      <Dropdown.Root>
        <Dropdown.Trigger asChild>
          <Button variant="primary">
            Open Menu
            <IconComponent
              src="/icons/chevron-down.svg"
              className="ml-2 h-4 w-4"
            />
          </Button>
        </Dropdown.Trigger>
        <Dropdown.Content>
          <Dropdown.Item onClick={() => console.log("Profile clicked")}>
            <IconComponent src="/icons/user.svg" className="mr-2 h-4 w-4" />
            Profile
          </Dropdown.Item>
          <Dropdown.Item onClick={() => console.log("Settings clicked")}>
            <IconComponent src="/icons/settings.svg" className="mr-2 h-4 w-4" />
            Settings
          </Dropdown.Item>
          <Dropdown.Item
            isDestructive
            onClick={() => console.log("Logout clicked")}
          >
            <IconComponent src="/icons/logout.svg" className="mr-2 h-4 w-4" />
            Logout
          </Dropdown.Item>
        </Dropdown.Content>
      </Dropdown.Root>

      {/* Filter Dropdown */}
      <Dropdown.Root>
        <Dropdown.FilterTrigger isActive={filterActive} />
        <Dropdown.Content>
          <Dropdown.Item onClick={() => setFilterActive(false)}>
            All Status
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setFilterActive(true)}>
            <div className="mr-2 h-2 w-2 rounded-full bg-green-500" />
            Active
          </Dropdown.Item>
        </Dropdown.Content>
      </Dropdown.Root>

      {/* Nested Dropdown with Hover */}
      <Dropdown.Root>
        <Dropdown.Trigger asChild>
          <Button variant="secondary">
            <IconComponent src="/icons/menu.svg" className="mr-2 h-4 w-4" />
            Advanced
          </Button>
        </Dropdown.Trigger>
        <Dropdown.Content>
          <Dropdown.Item onClick={() => console.log("Dashboard clicked")}>
            <IconComponent
              src="/icons/dashboard.svg"
              className="mr-2 h-4 w-4"
            />
            Dashboard
          </Dropdown.Item>
          <Dropdown.HoverRoot title="Reports">
            <Dropdown.HoverContent>
              <Dropdown.HoverItem onClick={() => console.log("Sales clicked")}>
                <IconComponent
                  src="/icons/chart.svg"
                  className="mr-2 h-4 w-4"
                />
                Sales Report
              </Dropdown.HoverItem>
              <Dropdown.HoverItem onClick={() => console.log("Users clicked")}>
                <IconComponent
                  src="/icons/users.svg"
                  className="mr-2 h-4 w-4"
                />
                User Report
              </Dropdown.HoverItem>
            </Dropdown.HoverContent>
          </Dropdown.HoverRoot>
        </Dropdown.Content>
      </Dropdown.Root>
    </div>
  );
}
```

## API Reference

### Props

#### Dropdown.Root

Inherits all props from `@radix-ui/react-popover.PopoverPrimitive.Root`

| Prop         | Type                      | Default | Description                          |
| ------------ | ------------------------- | ------- | ------------------------------------ |
| open         | `boolean`                 | -       | Controlled open state                |
| onOpenChange | `(open: boolean) => void` | -       | Callback when open state changes     |
| defaultOpen  | `boolean`                 | -       | Initial open state when uncontrolled |

#### Dropdown.Trigger

Inherits all props from `@radix-ui/react-popover.PopoverPrimitive.Trigger`

| Prop    | Type      | Default | Description                        |
| ------- | --------- | ------- | ---------------------------------- |
| asChild | `boolean` | `false` | Whether to render as child element |

#### Dropdown.FilterTrigger

| Prop     | Type      | Default | Description                                    |
| -------- | --------- | ------- | ---------------------------------------------- |
| isActive | `boolean` | `false` | Whether the filter is active (affects styling) |
| disabled | `boolean` | `false` | Whether the trigger is disabled                |

#### Dropdown.Content

Inherits all props from `@radix-ui/react-popover.PopoverPrimitive.Content`

| Prop       | Type                              | Default    | Description                            |
| ---------- | --------------------------------- | ---------- | -------------------------------------- |
| align      | `"start" \| "center" \| "end"`    | `"center"` | Dropdown alignment relative to trigger |
| sideOffset | `number`                          | `4`        | Distance from trigger element          |
| appearance | `\{ contentClassName?: string \}` | -          | Additional styling configuration       |

#### Dropdown.Item

| Prop          | Type                                                    | Default | Description                                      |
| ------------- | ------------------------------------------------------- | ------- | ------------------------------------------------ |
| onClick       | `(event: React.MouseEvent\ <HTMLDivElement\> ) => void` | -       | Click handler                                    |
| isDestructive | `boolean`                                               | `false` | Whether the item represents a destructive action |

#### Dropdown.HoverRoot

Inherits all props from `@radix-ui/react-hover-card.HoverCardPrimitive.Root`

| Prop  | Type     | Default | Description                                     |
| ----- | -------- | ------- | ----------------------------------------------- |
| title | `string` | -       | **Required**: Text displayed for the hover item |

#### Dropdown.HoverContent

Inherits all props from `@radix-ui/react-hover-card.HoverCardPrimitive.Content`

| Prop       | Type                                     | Default   | Description                     |
| ---------- | ---------------------------------------- | --------- | ------------------------------- |
| align      | `"start" \| "center" \| "end"`           | `"start"` | Submenu alignment               |
| side       | `"top" \| "right" \| "bottom" \| "left"` | `"right"` | Which side to display submenu   |
| sideOffset | `number`                                 | `2`       | Distance from parent item       |
| appearance | `\{ wrapperClassName?: string \}`        | -         | Wrapper styling for scroll area |

#### Dropdown.HoverItem

| Prop    | Type                                                       | Default | Description                        |
| ------- | ---------------------------------------------------------- | ------- | ---------------------------------- |
| onClick | `(event: React.MouseEvent\ <HTMLButtonElement\> ) => void` | -       | Click handler                      |
| asChild | `boolean`                                                  | `false` | Whether to render as child element |

### Types

```typescript
export type FilterTriggerProps = React.ButtonHTMLAttributes\ <HTMLButtonElement\> & \{
  isActive?: boolean;
  disabled?: boolean;
\};

export type ContentProps = React.ComponentProps\ <typeof PopoverPrimitive.Content\> & \{
  align?: "start" | "center" | "end";
  sideOffset?: number;
  appearance?: \{ contentClassName?: string \};
\};

export type HoverRootProps = React.ComponentProps\ <typeof HoverCardPrimitive.Root\> & \{
  title?: string;
\};

export type HoverContentProps = React.ComponentProps\ <typeof HoverCardPrimitive.Content\> & \{
  align?: "start" | "center" | "end";
  sideOffset?: number;
  side?: "top" | "right" | "bottom" | "left";
  appearance?: \{ wrapperClassName?: string \};
\};

export type HoverItemProps = React.ButtonHTMLAttributes\ <HTMLButtonElement\> & \{
  asChild?: boolean;
\};

export type ItemProps = React.HTMLAttributes\ <HTMLDivElement\> & \{
  isDestructive?: boolean;
\};
```

## Behavior

- **Compound Component Pattern**: Use sub-components (Root, Trigger, Content, Item) together - no main Dropdown component
- **Hover-Based Submenus**: 100ms delay for smooth hover interactions with automatic positioning
- **State Management**: Supports both controlled (open/onOpenChange) and uncontrolled modes
- **Accessibility**: Full keyboard navigation and ARIA support via Radix UI primitives

**Filter Trigger**: Specialized trigger with visual state indicators for filter contexts
**Nested Menus**: Built-in support for hover-triggered submenus with scrolling
**Positioning**: Smart collision detection and viewport-aware alignment

## Component Code

```tsx
import {
  ContentProps,
  FilterTriggerProps,
  HoverContentProps,
  HoverItemProps,
  HoverRootProps,
  ItemProps,
} from "@muatmuat/ui/types";

// 1. Root Component (Popover Wrapper)
const Root = PopoverPrimitive.Root;
const Trigger = PopoverPrimitive.Trigger;

const FilterTrigger = React.forwardRef<HTMLButtonElement, FilterTriggerProps>(
  ({ isActive = false, disabled = false, ...props }, ref) => (
    <Trigger ref={ref} {...props} asChild>
      <button
        className={cn(
          "flex h-8 w-[104px] items-center gap-2 rounded-md border border-neutral-600 bg-neutral-50 p-3",
          isActive && "border-primary-700",
          disabled && "bg-neutral-200"
        )}
      >
        <span
          className={cn(
            `flex-grow text-left text-xs font-medium text-neutral-600`,
            isActive && "text-primary-700"
          )}
        >
          Filter
        </span>
        <IconComponent
          src="/icons/filter16.svg"
          className={cn(
            `size-4 shrink-0 text-neutral-600`,
            isActive && "text-primary-700"
          )}
        />
      </button>
    </Trigger>
  )
);
FilterTrigger.displayName = "FilterTrigger";

// 3. Content Component (The first-level dropdown content)
const Content = React.forwardRef<HTMLDivElement, ContentProps>(
  ({ className, align = "center", sideOffset = 4, ...props }, ref) => (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        ref={ref}
        align={align}
        sideOffset={sideOffset}
        className={cn(
          "z-50 w-48 overflow-hidden rounded-md border border-neutral-400 bg-neutral-50 shadow-md outline-none animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          className
        )}
        {...props}
      />
    </PopoverPrimitive.Portal>
  )
);
Content.displayName = PopoverPrimitive.Content.displayName;

// 4. Item Component (An item in the first-level dropdown that triggers a sub-menu on hover)
const HoverRoot: React.FC<HoverRootProps> = ({
  title,
  children,
  className,
}) => (
  <HoverCardPrimitive.Root openDelay={100} closeDelay={100}>
    <HoverCardPrimitive.Trigger asChild>
      <div
        className={cn(
          "flex cursor-pointer items-center justify-between px-3 py-2 text-xs font-medium hover:bg-neutral-200 focus:outline-none",
          className
        )}
        tabIndex={0}
      >
        <span> {title} </span>
        <IconComponent
          src="/icons/chevron-right.svg"
          className="h-4 w-4 text-neutral-400"
          alt={`Open submenu for ${title}`}
        />
      </div>
    </HoverCardPrimitive.Trigger>
    {children}
  </HoverCardPrimitive.Root>
);

// 5. SubContent Component (The second-level dropdown content that appears on hover)
const HoverContent = React.forwardRef<HTMLDivElement, HoverContentProps>(
  (
    {
      className,
      appearance = {
        wrapperClassName: "",
      },
      align = "start",
      sideOffset = 2,
      side = "right",
      ...props
    },
    ref
  ) => (
    <HoverCardPrimitive.Portal>
      <HoverCardPrimitive.Content
        ref={ref}
        align={align}
        sideOffset={sideOffset}
        side={side}
        className={cn(
          "z-50 w-48 overflow-hidden rounded-md border border-neutral-400 bg-white text-neutral-900 shadow-lg outline-none animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          className
        )}
        {...props}
      >
        {/* Wrapper for fixed height and scrolling */}
        <div
          className={cn(
            "flex max-h-48 flex-col overflow-y-auto",
            appearance.wrapperClassName
          )}
        >
          {props.children}
        </div>
      </HoverCardPrimitive.Content>
    </HoverCardPrimitive.Portal>
  )
);
HoverContent.displayName = HoverCardPrimitive.Content.displayName;

// 6. SubItem Component (A clickable item within the SubContent)
const HoverItem = React.forwardRef<HTMLButtonElement, HoverItemProps>(
  ({ children, onClick, className, asChild = false, ...props }, ref) => {
    if (asChild && React.isValidElement(children)) {
      const childElement = children as React.ReactElement<any>;
      return React.cloneElement(childElement, {
        ...props,
        ref,
        onClick,
        className: cn(
          childElement.props.className, // keep child's classes
          className // add parent classes
        ),
      });
    }
    return (
      <button
        onClick={onClick}
        className={cn(
          "flex h-8 w-full flex-shrink-0 items-center rounded px-2.5 text-left text-xs font-medium text-neutral-900 hover:bg-neutral-100 focus:outline-none focus-visible:bg-neutral-100",
          className
        )}
      >
        {children}
      </button>
    );
  }
);
HoverItem.displayName = "HoverItem";

const Item = React.forwardRef<HTMLDivElement, ItemProps>(
  ({ children, onClick, className, isDestructive = false, ...props }, ref) => {
    const baseClasses =
      "flex h-[26px] w-full items-center px-3 py-[6px] text-left text-xs font-normal hover:bg-neutral-100 transition-colors cursor-pointer";

    return (
      <div
        ref={ref}
        role="menuitem"
        tabIndex={-1} // Makes it focusable but not part of natural tab order (managed by Popover/Menu)
        onClick={onClick}
        className={cn(
          baseClasses,
          isDestructive ? "!text-error-500" : "text-neutral-900", // Red text for destructive action
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Item.displayName = "DropdownItem";

// Type definitions for the Dropdown components
export type DropdownComponents = {
  Root: typeof PopoverPrimitive.Root;
  Trigger: typeof PopoverPrimitive.Trigger;
  FilterTrigger: React.ForwardRefExoticComponent<
    FilterTriggerProps & React.RefAttributes<HTMLButtonElement>
  >;
  Content: React.ForwardRefExoticComponent<
    ContentProps & React.RefAttributes<HTMLDivElement>
  >;
  HoverRoot: React.FC<HoverRootProps>;
  HoverContent: React.ForwardRefExoticComponent<
    HoverContentProps & React.RefAttributes<HTMLDivElement>
  >;
  HoverItem: React.ForwardRefExoticComponent<
    HoverItemProps & React.RefAttributes<HTMLButtonElement>
  >;
  Item: React.ForwardRefExoticComponent<
    ItemProps & React.RefAttributes<HTMLDivElement>
  >;
};

// Main Dropdown compound component
const Dropdown = ({
  children,
  ...props
}: {
  children: React.ReactNode;
  [key: string]: any;
}) => {
  return <Root {...props}> {children} </Root>;
};

// Attach sub-components to the main component
Dropdown.Root = Root;
Dropdown.Trigger = Trigger;
Dropdown.FilterTrigger = FilterTrigger;
Dropdown.Content = Content;
Dropdown.HoverRoot = HoverRoot;
Dropdown.HoverContent = HoverContent;
Dropdown.HoverItem = HoverItem;
Dropdown.Item = Item;

Dropdown.displayName = "Dropdown";

export { Dropdown };
```

---

# DropdownMenu

_Source: packages/ui/src/content/docs/components/Dropdown/DropdownMenu.mdx_

## Component Information

**Name:** DropdownMenu

**Description:** A simplified dropdown menu component built on Radix UI primitives for basic menu functionality

## Imports

```javascript
import { cn } from "@muatmuat/lib/utils";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";

import { DropdownMenuPreview } from "../../preview/DropdownMenu.preview";
```

## Overview

**Description:** A simplified dropdown menu component built on Radix UI primitives for basic menu functionality

**Component:** DropdownMenu

## Usage

<DropdownMenuPreview />

```jsx
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@muatmuat/ui/Dropdown";

function Example() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="rounded-md border border-neutral-600 bg-neutral-50 px-3 py-2">
          Open Menu
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => console.log("View")}>
          View Details
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => console.log("Edit")}>
          Edit Item
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => console.log("Delete")}>
          Delete Item
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// User menu example
function UserMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 rounded-full bg-blue-500 px-3 py-1 text-white">
          <span> JD </span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="bottom" align="end">
        <DropdownMenuItem onClick={() => console.log("Profile")}>
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => console.log("Settings")}>
          Settings
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => console.log("Logout")}>
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
```

## API Reference

### DropdownMenu Components

#### DropdownMenu (Root)

| Prop         | Type                      | Default | Description                          |
| ------------ | ------------------------- | ------- | ------------------------------------ |
| open         | `boolean`                 | -       | Controlled open state                |
| onOpenChange | `(open: boolean) => void` | -       | Callback when open state changes     |
| defaultOpen  | `boolean`                 | -       | Initial open state when uncontrolled |

#### DropdownMenuTrigger

| Prop    | Type      | Default | Description                        |
| ------- | --------- | ------- | ---------------------------------- |
| asChild | `boolean` | `false` | Whether to render as child element |

#### DropdownMenuContent

| Prop      | Type                                     | Default    | Description                        |
| --------- | ---------------------------------------- | ---------- | ---------------------------------- |
| side      | `"top" \| "right" \| "bottom" \| "left"` | `"bottom"` | Which side to display the menu     |
| align     | `"start" \| "center" \| "end"`           | `"start"`  | Menu alignment relative to trigger |
| className | `string`                                 | -          | Additional CSS classes             |
| children  | `React.ReactNode`                        | -          | Menu content                       |

#### DropdownMenuItem

| Prop      | Type              | Default | Description            |
| --------- | ----------------- | ------- | ---------------------- |
| onClick   | `() => void`      | -       | Click handler function |
| className | `string`          | -       | Additional CSS classes |
| children  | `React.ReactNode` | -       | Item content           |

### Types

```typescript
export interface DropdownMenuContentProps {
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  className?: string;
  children: React.ReactNode;
}

export interface DropdownMenuItemProps {
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
}
```

## Behavior

- Built on Radix UI DropdownMenu primitives for robust accessibility
- Provides basic dropdown menu functionality with click-to-open behavior
- Proper keyboard navigation including arrow keys and escape
- Focus management with automatic focus trapping
- Mobile-friendly touch interactions
- Responsive positioning with collision detection
- Smooth animations and transitions
- Automatic cleanup of event listeners
- Works with screen readers and other assistive technologies

**Variants**: Standard dropdown menu with customizable positioning
**Sizes**: Fixed width (194px) with auto-height based on content
**Key Guidelines**: Use for simple action menus, user menus, navigation menus, and any scenario requiring basic dropdown functionality

## Component Code

```tsx
import {
  DropdownMenuContentProps,
  DropdownMenuItemProps,
} from "@muatmuat/ui/DropdownMenu.types";

export const DropdownMenu = DropdownMenuPrimitive.Root;
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

export const DropdownMenuContent = ({
  side = "bottom",
  align = "start",
  className,
  children,
}: DropdownMenuContentProps) => {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        className={cn(
          "z-50 mt-1 flex max-w-[194px] flex-col overflow-hidden rounded-md border border-neutral-300 bg-neutral-50 shadow-muat",
          className
        )}
        side={side}
        align={align}
      >
        {children}
      </DropdownMenuPrimitive.Content>
    </DropdownMenuPrimitive.Portal>
  );
};

export const DropdownMenuItem = ({
  className,
  onSelect,
  children,
  ...props
}: DropdownMenuItemProps) => (
  <DropdownMenuPrimitive.Item
    className={cn(
      "capsize cursor-pointer px-2.5 py-3 text-xs font-medium leading-[1.2] outline-none hover:bg-neutral-100",
      className
    )}
    onSelect={onSelect}
    {...props}
  >
    {children}
  </DropdownMenuPrimitive.Item>
);
```

---

# SimpleDropdown

_Source: packages/ui/src/content/docs/components/Dropdown/SimpleDropdown.mdx_

## Component Information

**Name:** SimpleDropdown

**Description:** A simplified dropdown component with declarative API for basic menu functionality

## Imports

```javascript
import React from "react";

import { SimpleDropdown } from "@muatmuat/ui/Dropdown";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";

import { SimpleDropdownPreview } from "../../preview/SimpleDropdown.preview";
```

## Overview

**Description:** A simplified dropdown component with declarative API for basic menu functionality

**Component:** SimpleDropdown

## Usage

<SimpleDropdownPreview />

```jsx
function Example() {
  const items = [
    {
      id: "view",
      label: "View Details",
      onClick: () => console.log("View clicked"),
    },
    {
      id: "edit",
      label: "Edit Item",
      onClick: () => console.log("Edit clicked"),
    },
    {
      id: "delete",
      label: "Delete Item",
      onClick: () => console.log("Delete clicked"),
    },
  ];

  return (
    <SimpleDropdown
      trigger={
        <button className="rounded-md border border-neutral-300 px-4 py-2">
          Actions
        </button>
      }
      items={items}
      className="w-fit"
    />
  );
}

// Custom trigger example
function CustomTriggerExample() {
  const menuItems = [
    {
      id: "profile",
      label: "My Profile",
      onClick: () => console.log("Profile"),
    },
    {
      id: "settings",
      label: "Settings",
      onClick: () => console.log("Settings"),
    },
    { id: "logout", label: "Sign Out", onClick: () => console.log("Logout") },
  ];

  return (
    <SimpleDropdown
      trigger={
        <div className="flex cursor-pointer items-center gap-2 rounded-full bg-gray-800 px-3 py-1 text-white">
          <div className="h-6 w-6 rounded-full bg-gray-600"> JD </div>
          <span> John Doe </span>
        </div>
      }
      items={menuItems}
    />
  );
}
```

## API Reference

### Props

| Prop      | Type              | Default | Description                              |
| --------- | ----------------- | ------- | ---------------------------------------- |
| trigger   | `React.ReactNode` | -       | Trigger element that opens the dropdown  |
| items     | `DropdownItem[]`  | -       | Array of menu items to display           |
| className | `string`          | -       | Additional CSS classes for the container |

### Types

```typescript
export interface SimpleDropdownProps {
  /** Trigger element */
  trigger: React.ReactNode;
  /** Dropdown items */
  items: Array<{
    id: string;
    label: string;
    onClick?: () => void;
  }>;
  /** Additional classes */
  className?: string;
}

export interface DropdownItem {
  id: string;
  label: string;
  onClick?: () => void;
}
```

## Behavior

- Provides a simple declarative API for dropdown functionality
- Built on top of SimpleDropdownMenu components
- Manages trigger and items through props array
- Click-to-open behavior with backdrop dismiss
- Automatic positioning relative to trigger
- Proper accessibility with keyboard navigation
- Mobile-friendly touch interactions
- Clean styling with consistent appearance
- Handles click events for each menu item
- Supports any React node as trigger element

**Variants**: Standard simple dropdown with customizable trigger and items
**Sizes**: Trigger size determined by content, dropdown fixed width (194px)
**Key Guidelines**: Use for basic action menus, simple user menus, and scenarios where items can be defined declaratively without complex nested structures

## Component Code

```tsx
/**
 * SimpleDropdown Component
 * A simplified dropdown component built on SimpleDropdownMenu
 */
import {
  SimpleDropdownContent,
  SimpleDropdownItem,
  SimpleDropdownTrigger,
} from "@muatmuat/ui/SimpleDropdownMenu";

export interface SimpleDropdownProps {
  /** Trigger element */
  trigger?: React.ReactNode;
  /** Dropdown items */
  items?: Array<{
    id: string;
    label: string;
    onClick?: () => void;
  }>;
  /** Additional classes */
  className?: string;
  /** Children for compound usage */
  children?: React.ReactNode;
}

// Legacy interface for backward compatibility
export interface SimpleDropdownLegacyProps {
  trigger: React.ReactNode;
  items: Array<{
    id: string;
    label: string;
    onClick?: () => void;
  }>;
  className?: string;
}

// Create the main component
const SimpleDropdownComponent = React.forwardRef<
  HTMLDivElement,
  SimpleDropdownProps & {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    defaultOpen?: boolean;
  }
>(({ children, ...props }, _ref) => {
  return (
    <DropdownMenuPrimitive.Root {...props}>
      {children}
    </DropdownMenuPrimitive.Root>
  );
});

SimpleDropdownComponent.displayName = "SimpleDropdownComponent";

// Create compound component with sub-components
const SimpleDropdown =
  SimpleDropdownComponent as typeof SimpleDropdownComponent & {
    Trigger: typeof SimpleDropdownTrigger;
    Content: typeof SimpleDropdownContent;
    Item: typeof SimpleDropdownItem;
  };

// Attach sub-components for compound usage
SimpleDropdown.Trigger = SimpleDropdownTrigger;
SimpleDropdown.Content = SimpleDropdownContent;
SimpleDropdown.Item = SimpleDropdownItem;

SimpleDropdown.displayName = "SimpleDropdown";

export { SimpleDropdown };
```

---

# SimpleDropdownMenu

_Source: packages/ui/src/content/docs/components/Dropdown/SimpleDropdownMenu.mdx_

## Component Information

**Name:** SimpleDropdownMenu

**Description:** Lightweight wrapper around Radix UI dropdown primitives for basic menu functionality

## Imports

```javascript
import { cn } from "@muatmuat/lib/utils";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";

import { SimpleDropdownMenuPreview } from "../../preview/SimpleDropdownMenu.preview";
```

## Overview

**Description:** Lightweight wrapper around Radix UI dropdown primitives for basic menu functionality

**Component:** SimpleDropdownMenu

## Usage

<SimpleDropdownMenuPreview />

```jsx
import {
  SimpleDropdown,
  SimpleDropdownContent,
  SimpleDropdownItem,
  SimpleDropdownTrigger,
} from "@muatmuat/ui/Dropdown";

function Example() {
  return (
    <SimpleDropdown>
      <SimpleDropdownTrigger asChild>
        <button className="rounded-md border border-neutral-300 px-4 py-2">
          Menu
        </button>
      </SimpleDropdownTrigger>
      <SimpleDropdownContent>
        <SimpleDropdownItem onClick={() => console.log("Option 1")}>
          Option 1
        </SimpleDropdownItem>
        <SimpleDropdownItem onClick={() => console.log("Option 2")}>
          Option 2
        </SimpleDropdownItem>
        <SimpleDropdownItem onClick={() => console.log("Option 3")}>
          Option 3
        </SimpleDropdownItem>
      </SimpleDropdownContent>
    </SimpleDropdown>
  );
}

// With custom positioning
function CustomPositioning() {
  return (
    <SimpleDropdown>
      <SimpleDropdownTrigger asChild>
        <button className="rounded-md bg-blue-600 px-4 py-2 text-white">
          Right Menu
        </button>
      </SimpleDropdownTrigger>
      <SimpleDropdownContent side="right" align="start">
        <SimpleDropdownItem onClick={() => console.log("First item")}>
          First Item
        </SimpleDropdownItem>
        <SimpleDropdownItem onClick={() => console.log("Second item")}>
          Second Item
        </SimpleDropdownItem>
      </SimpleDropdownContent>
    </SimpleDropdown>
  );
}
```

## API Reference

### Components

#### SimpleDropdown (Root)

Built on Radix UI DropdownMenu primitives, provides context for menu functionality.

#### SimpleDropdownTrigger

| Prop    | Type      | Default | Description                        |
| ------- | --------- | ------- | ---------------------------------- |
| asChild | `boolean` | `false` | Whether to render as child element |

#### SimpleDropdownContent

| Prop      | Type                                     | Default    | Description                        |
| --------- | ---------------------------------------- | ---------- | ---------------------------------- |
| side      | `"top" \| "right" \| "bottom" \| "left"` | `"bottom"` | Which side to display the menu     |
| align     | `"start" \| "center" \| "end"`           | `"start"`  | Menu alignment relative to trigger |
| className | `string`                                 | -          | Additional CSS classes             |
| children  | `React.ReactNode`                        | -          | Menu content                       |

#### SimpleDropdownItem

| Prop      | Type              | Default | Description            |
| --------- | ----------------- | ------- | ---------------------- |
| onClick   | `() => void`      | -       | Click handler function |
| className | `string`          | -       | Additional CSS classes |
| children  | `React.ReactNode` | -       | Item content           |

### Types

```typescript
export interface SimpleDropdownMenuContentProps {
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  className?: string;
  children: React.ReactNode;
}

export interface SimpleDropdownItemProps {
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
}
```

## Behavior

- Lightweight wrapper around Radix UI DropdownMenu primitives
- Provides basic dropdown menu functionality with minimal API
- Click-to-open behavior with automatic positioning
- Proper keyboard navigation including arrow keys and escape
- Focus management with automatic focus trapping
- Mobile-friendly touch interactions
- Consistent styling with design system
- Screen reader compatible with proper ARIA attributes
- Collision detection for optimal positioning
- Smooth animations and transitions

**Variants**: Standard menu with flexible positioning options
**Sizes**: Fixed width (194px) with auto-height based on content
**Key Guidelines**: Use as base for more complex dropdown components or for simple menu scenarios where you need full control over structure

## Component Code

```tsx
import {
  SimpleDropdownItemProps,
  SimpleDropdownMenuContentProps,
} from "@muatmuat/ui/SimpleDropdownMenu.types";

export const SimpleDropdown = DropdownMenuPrimitive.Root;
export const SimpleDropdownTrigger = DropdownMenuPrimitive.Trigger;

export const SimpleDropdownContent = ({
  side = "bottom",
  align = "start",
  className,
  children,
}: SimpleDropdownMenuContentProps) => {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        className={cn(
          "z-50 mt-1 flex max-w-[194px] flex-col overflow-hidden rounded-md border border-neutral-300 bg-neutral-50 shadow-muat",
          className
        )}
        side={side}
        align={align}
      >
        {children}
      </DropdownMenuPrimitive.Content>
    </DropdownMenuPrimitive.Portal>
  );
};

export const SimpleDropdownItem = ({
  className,
  onSelect,
  children,
  ...props
}: SimpleDropdownItemProps) => (
  <DropdownMenuPrimitive.Item
    className={cn(
      "capsize cursor-pointer px-2.5 py-3 text-xs font-medium leading-[1.2] outline-none hover:bg-neutral-100",
      className
    )}
    onSelect={onSelect}
    {...props}
  >
    {children}
  </DropdownMenuPrimitive.Item>
);
```

---

# Dropzone

_Source: packages/ui/src/content/docs/components/Dropzone/Dropzone.mdx_

## Component Information

**Name:** Dropzone

**Description:** Drag and drop file upload component with progress indicators and validation

## Imports

```javascript
import { DropzonePreview } from "../../preview/Dropzone.preview";

import { useState } from "react";

import { Dropzone } from "@muatmuat/ui/Dropzone";

import { ChangeEvent, DragEvent, useCallback, useRef, useState } from "react";

import { cn } from "@muatmuat/lib/utils";
import { LoaderCircle } from "lucide-react";

import { IconComponent } from "../IconComponent";
import type { DropzoneComponentProps, RenderPlaceholders } from "./types";

```

## Overview

**Description:** Drag and drop file upload component with progress indicators and validation

**Component:** Dropzone

## Usage

<DropzonePreview />

```jsx
export function DropzoneExample() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async (uploadedFile) => {
    setLoading(true);
    // Simulate upload process
    setTimeout(() => {
      setFile(uploadedFile);
      setLoading(false);
    }, 2000);
  };

  return (
    <Dropzone
      onUpload={handleUpload}
      file={file}
      loading={loading}
      placeholder="Upload product image"
    />
  );
}
```

## API Reference

### Props

| Prop              | Type                  | Default | Description                              |
| ----------------- | --------------------- | ------- | ---------------------------------------- |
| onUpload          | `function`            | -       | Function called when file is uploaded    |
| loading           | `boolean`             | false   | Whether upload is in progress            |
| file              | `File`                | -       | Currently uploaded file object           |
| placeholder       | `string \| ReactNode` | -       | Custom placeholder text or element       |
| renderPlaceholder | `object`              | `{}`    | Custom placeholders for different states |
| className         | `string`              | ""      | Additional CSS classes                   |

### renderPlaceholder Object

| Prop         | Type        | Default | Description                            |
| ------------ | ----------- | ------- | -------------------------------------- |
| loading      | `ReactNode` | null    | Custom loading state placeholder       |
| fileUploaded | `ReactNode` | null    | Custom file uploaded state placeholder |
| error        | `ReactNode` | null    | Custom error state placeholder         |
| default      | `ReactNode` | null    | Custom default state placeholder       |

## Behavior

- Drag and drop file upload with visual feedback
- Supports click to browse file selection
- Provides loading states during upload process
- Displays file information after successful upload
- Handles file type and size validation
- Mobile-optimized with touch support

**Features**: Drag & drop, file validation, progress indication
**States**: default, dragging, loading, uploaded, error

**Key Guidelines**:

- Use for image uploads, document uploads, file attachments
- Provide clear instructions for supported file types
- Show file size limits and requirements
- Implement proper error handling and validation
- Consider multiple file upload if needed for your use case

## Component Code

```tsx
const DropzoneComponent = ({
  onUpload,
  loading = false,
  file,
  placeholder,
  renderPlaceholder = {
    loading: null,
    fileUploaded: null,
    error: null,
    default: null,
  } as RenderPlaceholders,
  className = "",
  ...props
}: DropzoneComponentProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragEvent = useCallback((e: DragEvent, isEnter: boolean) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(isEnter);
  }, []);

  const handleDrop = useCallback(
    (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      const files = e.dataTransfer.files;
      if (files?.length > 0) onUpload(files[0]);
    },
    [onUpload]
  );

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files?.length > 0) onUpload(files[0]);
  };

  const openFileDialog = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
      fileInputRef.current.click();
    }
  };

  const renderContent = () => {
    if (loading) {
      return (
        renderPlaceholder?.loading || (
          <div className="flex flex-col items-center gap-4">
            <LoaderCircle className="size-5 animate-spin text-primary-700" />
            <p className="text-xs font-semibold text-neutral-900">
              Mengunggah...
            </p>
          </div>
        )
      );
    }

    if (file) {
      return (
        renderPlaceholder?.fileUploaded || (
          <div className="flex flex-col items-center gap-2">
            <p className="text-xs font-semibold text-neutral-900">
              {file.name} ({(file.size / 1024).toFixed(2)} KB)
            </p>
          </div>
        )
      );
    }

    return (
      renderPlaceholder?.default || (
        <div className="flex flex-col items-center gap-4">
          <IconComponent
            src="/icons/add_image.svg"
            width={20}
            height={20}
            className="text-neutral-500"
          />

          <p className="text-xs text-neutral-900">
            {placeholder || (
              <>
                {" "}
                <span
                  className="font-semibold text-primary-700 underline"
                  onClick={(e) => {
                    e.stopPropagation();
                    openFileDialog();
                  }}
                >
                  Unggah
                </span>{" "}
                atau letakkan file di sini
              </>
            )}
          </p>
        </div>
      )
    );
  };

  return (
    <div
      className={cn(
        "flex h-32 w-full flex-col items-center justify-center rounded-lg border-2 border-dashed",
        isDragging ? "border-primary-700" : "border-neutral-300",
        loading
          ? "bg-neutral-100"
          : "cursor-pointer bg-white hover:border-primary-500",
        className
      )}
      onDragEnter={(e) => handleDragEvent(e, true)}
      onDragLeave={(e) => handleDragEvent(e, false)}
      onDragOver={(e) => handleDragEvent(e, false)}
      onDrop={handleDrop}
      onClick={openFileDialog}
    >
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileSelect}
        disabled={loading}
        {...props}
      />
      {renderContent()}
    </div>
  );
};

export { DropzoneComponent };
```

---

# ButtonPlusMinus

_Source: packages/ui/src/content/docs/components/Form/ButtonPlusMinus.mdx_

## Component Information

**Name:** Button Plus Minus

**Description:** Compact numeric input with increment/decrement buttons for quantity controls

## Imports

```javascript
import { useState } from "react";
import * as React from "react";

import { cn } from "@muatmuat/lib/utils";
import { ButtonPlusMinus } from "@muatmuat/ui/Form";

import { ButtonPlusMinusPreview } from "../../preview/ButtonPlusMinus.preview";
import { IconComponent } from "../IconComponent";
```

## Overview

**Description:** Compact numeric input with increment/decrement buttons for quantity controls

**Component:** Button Plus Minus

## Usage

<ButtonPlusMinusPreview />

```jsx
export function ButtonPlusMinusExample() {
  const [quantity, setQuantity] = useState(1);
  const [passengers, setPassengers] = useState(2);

  return (
    <div className="space-y-4">
      <div>
        <label className="mb-2 block text-sm font-medium"> Quantity </label>
        <ButtonPlusMinus
          value={quantity}
          onChange={setQuantity}
          minValue={1}
          maxValue={10}
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium"> Passengers </label>
        <ButtonPlusMinus
          value={passengers}
          onChange={setPassengers}
          minValue={1}
          maxValue={8}
        />
      </div>
    </div>
  );
}
```

## API Reference

### Props

| Prop        | Type       | Default | Description                              |
| ----------- | ---------- | ------- | ---------------------------------------- |
| value       | `number`   | 0       | Current numeric value                    |
| onChange    | `function` | -       | Callback fired when value changes        |
| onIncrement | `function` | -       | Callback fired specifically on increment |
| onDecrement | `function` | -       | Callback fired specifically on decrement |
| minValue    | `number`   | 0       | Minimum allowed value                    |
| maxValue    | `number`   | -       | Maximum allowed value                    |
| disabled    | `boolean`  | false   | Whether the component is disabled        |

## Behavior

- Compact input with integrated increment/decrement buttons
- Handles numeric input validation and constraints
- Provides visual feedback for disabled states
- Supports both controlled and uncontrolled modes
- Prevents values outside min/max range
- Handles keyboard input and button clicks

**Use Cases**: Quantity selectors, passenger counts, item quantities
**States**: default, disabled, at-min, at-max

**Key Guidelines**:

- Use for small numeric ranges (typically 0-99)
- Set appropriate min/max constraints
- Provide clear labels for accessibility
- Consider using for quantity controls in shopping carts
- Ensure buttons are easily tappable on mobile

## Component Code

```tsx

export interface ButtonPlusMinusProps {
  value?: number;
  onChange?: (value: number) => void;
  onIncrement?: (value: number) => void;
  onDecrement?: (value: number) => void;
  minValue?: number;
  maxValue?: number;
  disabled?: boolean;
}

/**
 * ButtonPlusMinus component for incrementing/decrementing numeric values
 */
const ButtonPlusMinus: React.FC <ButtonPlusMinusProps> = ({
  value = 0,
  onChange,
  onIncrement,
  onDecrement,
  minValue = 0,
  maxValue,
  disabled = false,
}) => {
  // Ensure value is always a number
  const numericValue = isNaN(value) ? 0 : Number(value);
  const disabledDecrement = disabled || numericValue === minValue;
  const disabledIncrement = disabled || numericValue === maxValue;

  const handleDecrement = () => {
    if (disabledDecrement || numericValue <= minValue) {
      return;
    }

    const newValue = numericValue - 1;
    onChange?.(newValue);
    onDecrement?.(newValue);
  };

  const handleIncrement = () => {
    if (
      disabledIncrement ||
      (maxValue !== undefined && numericValue > = maxValue)
    ) {
      return;
    }

    const newValue = numericValue + 1;
    onChange?.(newValue);
    onIncrement?.(newValue);
  };

  const handleInputChange = (e: React.ChangeEvent <HTMLInputElement> ) => {
    if (disabled) return;

    const inputValue = e.target.value;

    // Only allow numeric values
    if (/^\d*$/.test(inputValue)) {
      const newValue =
        inputValue === ""
          ? 0
          : parseInt(inputValue.replace(/^0+/, "") || "0", 10);
      onChange?.(newValue);
    }
  };

  const handleInputBlur = (e: React.FocusEvent <HTMLInputElement> ) => {
    if (disabled) return;

    let newValue = parseInt(e.target.value, 10);

    // Apply constraints
    if (isNaN(newValue)) newValue = 0;
    if (maxValue !== undefined && newValue > maxValue) newValue = maxValue;
    if (newValue < minValue) newValue = minValue;

    onChange?.(newValue);
  };

  return (
    <div
      className={`flex h-8 w-[110px] items-center justify-between rounded-md border border-neutral-600 px-3 ${disabled ? "bg-neutral-200" : ""}`}
    >
      <button
        className="disabled:cursor-not-allowed"
        onClick={handleDecrement}
        disabled={disabledDecrement}
      >
        <IconComponent
          className={disabledDecrement ? "icon-stroke-neutral-500" : ""}
          src="/icons/minus16.svg"
        />
      </button>

      <input
        type="number"
        className={cn(
          "w-full max-w-4 select-none text-xs font-medium leading-[14.4px] outline-none",
          disabled ? "text-neutral-500" : "text-neutral-900"
        )}
        value={numericValue}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        disabled={disabled}
      />

      <button
        className="disabled:cursor-not-allowed"
        onClick={handleIncrement}
        disabled={disabledIncrement}
      >
        <IconComponent
          className={disabledIncrement ? "icon-stroke-neutral-500" : ""}
          src="/icons/plus16.svg"
        />
      </button>
    </div>
  );
};

export { ButtonPlusMinus };

```

---

# Checkbox

_Source: packages/ui/src/content/docs/components/Form/Checkbox.mdx_

## Component Information

**Name:** Checkbox

**Description:** Accessible checkbox component with customizable variants and label positioning

## Imports

```javascript
import { useState } from "react";
import * as React from "react";
import { forwardRef, memo, useId } from "react";

import { cn } from "@muatmuat/lib/utils";
import { Checkbox } from "@muatmuat/ui/Form";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";

import { CheckboxPreview } from "../../preview/Checkbox.preview";
```

## Overview

**Description:** Accessible checkbox component with customizable variants and label positioning

**Component:** Checkbox

## Usage

<CheckboxPreview />

```jsx
export function CheckboxExample() {
  const [terms, setTerms] = useState(false);
  const [newsletter, setNewsletter] = useState(true);

  return (
    <div className="space-y-4">
      <Checkbox
        label="I agree to the terms and conditions"
        checked={terms}
        onCheckedChange={setTerms}
        required
      />

      <Checkbox
        label="Subscribe to newsletter"
        checked={newsletter}
        onCheckedChange={setNewsletter}
        variant="blue"
      />

      <Checkbox
        label="Premium features"
        checked={false}
        variant="yellow"
        disabled
      />

      <Checkbox
        label="Show label on left"
        checked={true}
        labelPosition="left"
      />
    </div>
  );
}
```

## API Reference

### Props

| Prop            | Type                 | Default | Description                                        |
| --------------- | -------------------- | ------- | -------------------------------------------------- |
| label           | `string`             | -       | Content to be displayed as the checkbox's label    |
| checked         | `boolean`            | -       | Whether the checkbox is checked                    |
| onCheckedChange | `function`           | -       | Callback fired when checked state changes          |
| disabled        | `boolean`            | false   | Whether the checkbox is disabled                   |
| variant         | `"blue" \| "yellow"` | "blue"  | Visual variant of the checkbox                     |
| labelPosition   | `"left" \| "right"`  | "right" | Position of label relative to checkbox             |
| className       | `string`             | -       | Additional CSS classes                             |
| appearance      | `CheckboxAppearance` | `{}`    | Custom class names for component parts             |
| id              | `string`             | -       | Unique identifier (auto-generated if not provided) |

### Types

```typescript
export type CheckboxLabelPosition = "left" | "right";

export type CheckboxVariant = "blue" | "yellow";

export interface CheckboxAppearance {
  containerClassName?: string;
  labelClassName?: string;
}
```

## Behavior

- Built on Radix UI Checkbox primitive for accessibility
- Supports both checked and unchecked states with proper keyboard navigation
- Provides customizable visual variants (blue, yellow)
- Handles disabled states with appropriate styling
- Supports flexible label positioning (left/right)
- Generates unique IDs automatically for accessibility
- Memoized for performance optimization

**Variants**: blue (primary), yellow (accent)
**Positions**: left (label first), right (checkbox first)
**States**: default, checked, disabled, focus

**Key Guidelines**:

- Use descriptive labels for accessibility
- Apply variant based on context (blue for primary, yellow for accent)
- Use disabled state for unavailable options
- Position labels consistently within forms
- Leverage automatic ID generation for accessibility

## Component Code

```tsx
// Assuming this utility exists

export type CheckboxLabelPosition = "left" | "right";

export interface CheckboxAppearance {
  /**
   * Custom class name for the container div that wraps the checkbox and label.
   */
  containerClassName?: string;
  /**
   * Custom class name for the label element.
   */
  labelClassName?: string;
}

export interface CheckboxProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>,
    "id" // Omit to handle it internally
  > {
  /**
   * The content to be displayed as the checkbox's label.
   */
  label?: string;
  /**
   * Optional class name to be applied to the checkbox root element.
   */
  className?: string;
  /**
   * Object to customize the class names of the component's parts.
   */
  appearance?: CheckboxAppearance;
  /**
   * The position of the label relative to the checkbox.
   * @default "right"
   */
  labelPosition?: CheckboxLabelPosition;
  /**
   * The visual variant of the checkbox.
   * @default "default"
   */
  variant?: CheckboxVariant;
  /**
   * A unique identifier for the checkbox. If not provided, a unique ID will be
   * generated automatically to ensure accessibility.
   */
  id?: string;
}

export type CheckboxVariant = "blue" | "yellow";

const checkboxStyles = {
  blue: "border-neutral-600 hover:border-primary-700 disabled:border-neutral-500 data-[state=checked]:border-primary-700 data-[state=checked]:bg-primary-700 data-[state=checked]:text-neutral-50",
  yellow:
    "data-[state=checked]:bg-yellow-500 data-[state=checked]:border-yellow-600 data-[state=checked]:text-yellow-900",
};

/**
 * A memoized Checkbox component that is properly typed and supports server-side rendering.
 * It is built on top of Radix UI's Checkbox primitive for accessibility and functionality.
 */
const Checkbox = memo(
  forwardRef<React.ElementRef<typeof CheckboxPrimitive.Root>, CheckboxProps>(
    (props, ref) => {
      const {
        className,
        label,
        appearance = {}, // Default to an empty object for cleaner usage.
        labelPosition = "right",
        variant = "blue",
        id: providedId, // Rename to avoid conflict with the generated ID.
        ...checkboxProps
      } = props;

      // ✨ Use React.useId() for stable, SSR-friendly unique ID generation.
      const generatedId = useId();
      const checkboxId = providedId || generatedId;

      const checkboxElement = (
        <CheckboxPrimitive.Root
          ref={ref}
          id={checkboxId}
          data-slot="checkbox"
          className={cn(
            // Base styles
            "border-input dark:bg-input/30 data-[state=checked]:text-primary-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive shadow-xs peer size-4 shrink-0 rounded-[4px] border outline-none transition-shadow hover:cursor-pointer focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
            checkboxStyles[variant],
            className
          )}
          {...checkboxProps}
        >
          <CheckboxPrimitive.Indicator
            data-slot="checkbox-indicator"
            className="flex items-center justify-center text-current transition-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-full"
            >
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>
      );

      // If there's no label, return only the checkbox element.
      if (!label) {
        return checkboxElement;
      }

      // If a label exists, wrap the checkbox and label in a container.
      return (
        <div
          className={cn(
            "flex items-center gap-2",
            labelPosition === "left" && "flex-row-reverse",
            // Safely apply custom container class. `cn` handles undefined values.
            appearance.containerClassName
          )}
        >
          {checkboxElement}
          <label
            htmlFor={checkboxId}
            className={cn(
              "cursor-pointer select-none text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
              // Safely apply custom label class.
              appearance.labelClassName
            )}
          >
            {label}
          </label>
        </div>
      );
    }
  )
);

Checkbox.displayName = "Checkbox";

export { Checkbox };
```

---

# DimensionInput

_Source: packages/ui/src/content/docs/components/Form/DimensionInput.mdx_

## Component Information

**Name:** Dimension Input

**Description:** 3D measurement input for length, width, and height with numeric formatting

## Imports

```javascript
import { DimensionInputPreview } from "../../preview/DimensionInput.preview";

import { useState } from "react";

import { DimensionInput } from "@muatmuat/ui/Form";

import { type FC, useCallback } from "react";

import { cn } from "@muatmuat/lib/utils";
```

## Overview

**Description:** 3D measurement input for length, width, and height with numeric formatting

**Component:** Dimension Input

## Usage

<DimensionInputPreview />

```jsx
export function DimensionInputExample() {
  const [dimensions, setDimensions] = useState({
    panjang: {
      value: 10,
      setValue: (val) =>
        setDimensions((prev) => ({
          ...prev,
          panjang: { ...prev.panjang, value: val },
        })),
    },
    lebar: {
      value: 5,
      setValue: (val) =>
        setDimensions((prev) => ({
          ...prev,
          lebar: { ...prev.lebar, value: val },
        })),
    },
    tinggi: {
      value: 3,
      setValue: (val) =>
        setDimensions((prev) => ({
          ...prev,
          tinggi: { ...prev.tinggi, value: val },
        })),
    },
  });

  return <DimensionInput manual={dimensions} disabled={false} />;
}
```

## API Reference

### Props

| Prop       | Type                       | Default | Description                                    |
| ---------- | -------------------------- | ------- | ---------------------------------------------- |
| manual     | `ManualInputProps`         | -       | Object containing dimension fields and setters |
| disabled   | `boolean`                  | false   | Whether the input fields are disabled          |
| className  | `string`                   | -       | Additional CSS classes                         |
| appearance | `DimensionInputAppearance` | `{}`    | Custom class names for component parts         |

### Types

```typescript
interface DimensionField {
  value: number | string | null | undefined;
  setValue: (value: number | string) => void;
}

interface ManualInputProps {
  panjang?: DimensionField;
  lebar?: DimensionField;
  tinggi?: DimensionField;
}

interface DimensionInputAppearance {
  inputClassName?: string;
}
```

## Behavior

- Composite input for 3D measurements (length × width × height)
- Built on react-number-format for proper numeric formatting
- Supports decimal values with configurable precision
- Designed for integration with form libraries like react-hook-form
- Provides consistent spacing and visual separators
- Mobile-optimized with appropriate touch targets

**Features**: 3D measurements, numeric formatting, decimal support
**Fields**: Panjang (length), Lebar (width), Tinggi (height)
**States**: default, focus, disabled, error

**Key Guidelines**:

- Use for product dimensions, package measurements, spatial calculations
- Integrate with form state management libraries
- Provide clear labels for each dimension
- Consider units display (cm, inches, etc.)
- Validate ranges appropriate for your use case

## Component Code

```tsx
import {
  type NumberFormatValues,
  NumericFormat,
  type NumericFormatProps,
} from "react-number-format";

// Assuming this utility exists

/**
 * Represents a single dimension field, typically managed by a form state library.
 */
interface DimensionField {
  /** The current value of the dimension input. */
  value: number | string | null | undefined;
  /** A function to update the value of the dimension input. */
  setValue: (value: number | string) => void;
}

/**
 * Defines the structure for the manual input fields (length, width, height).
 */
interface ManualInputProps {
  panjang?: DimensionField;
  lebar?: DimensionField;
  tinggi?: DimensionField;
}

/**
 * Defines class names for customizing the appearance of the input.
 */
interface DimensionInputAppearance {
  inputClassName?: string;
}

export interface DimensionInputProps {
  /**
   * An object containing the value and setter for each dimension.
   * Designed to be compatible with react-hook-form's `Controller`.
   */
  manual?: ManualInputProps;
  /**
   * Optional class name for the main container div.
   */
  className?: string;
  /**
   * Object to customize the class names of the component's parts.
   */
  appearance?: DimensionInputAppearance;
  /**
   * If `true`, the input fields will be disabled.
   * @default false
   */
  disabled?: boolean;
}

/**
 * A composite input component for entering 3D measurements (panjang x lebar x tinggi).
 * It uses `react-number-format` for numeric formatting and is designed to integrate
 * easily with form libraries like `react-hook-form`.
 */
export const DimensionInput: FC<DimensionInputProps> = ({
  manual,
  className,
  appearance = {},
  disabled = false,
}) => {
  /**
   * A memoized factory function that generates the required props for each NumericFormat input.
   * This avoids redefining the same logic for each of the three inputs.
   */
  const getInputProps = useCallback(
    (field: DimensionField | undefined): NumericFormatProps => {
      return {
        allowNegative: false,
        decimalScale: 2,
        thousandSeparator: ".",
        decimalSeparator: ",",
        className: cn(
          "w-full min-w-0 bg-transparent text-center text-xs font-medium placeholder:text-neutral-600 focus:outline-none",
          disabled ? "cursor-not-allowed" : "cursor-text",
          appearance.inputClassName
        ),
        value: field?.value ?? "",
        onValueChange: (values: NumberFormatValues) => {
          // `setValue` expects a string or number, floatValue can be undefined.
          // Coalesce undefined to an empty string to clear the input.
          field?.setValue(values.floatValue ?? "");
        },
        isAllowed: (values: NumberFormatValues) => {
          const { floatValue } = values;
          // Allow the input to be cleared.
          if (floatValue === undefined) return true;
          // Limit the total number of digits to 6.
          const valueStr = String(floatValue).replace(".", "");
          return valueStr.length <= 6;
        },
        disabled,
      };
    },
    [appearance.inputClassName, disabled]
  );

  return (
    <div
      className={cn(
        "grid h-8 w-full grid-cols-[1fr,auto,1fr,auto,1fr] items-center gap-x-1 rounded-md border border-neutral-600 px-3",
        disabled
          ? "cursor-not-allowed bg-neutral-200"
          : "bg-neutral-50 focus-within:border-primary-700 hover:border-primary-700",
        className
      )}
    >
      <NumericFormat {...getInputProps(manual?.panjang)} placeholder="p" />
      <span className="text-xs text-neutral-600"> x </span>
      <NumericFormat {...getInputProps(manual?.lebar)} placeholder="l" />
      <span className="text-xs text-neutral-600"> x </span>
      <NumericFormat {...getInputProps(manual?.tinggi)} placeholder="t" />
    </div>
  );
};
```

---

# Form

_Source: packages/ui/src/content/docs/components/Form/Form.mdx_

## Component Information

**Name:** Form

**Description:** Consistent form layouts and labeling system for responsive forms

## Imports

```javascript
import { FormPreview } from "../../preview/Form.preview";

import { FormContainer, FormLabel } from "@muatmuat/ui/Form";

import React from "react";

import { cn } from "@muatmuat/lib/utils";

import { type TranslationFunction, tMockFn } from "../../lib/mock-t";

```

## Overview

**Description:** Consistent form layouts and labeling system for responsive forms

**Component:** Form

## Usage

<FormPreview />

```jsx
export function FormExample() {
  return (
    <FormContainer>
      <FormLabel required> First Name * </FormLabel>
      <input
        type="text"
        className="w-full rounded border border-neutral-300 px-3 py-2"
        placeholder="Enter first name"
      />

      <FormLabel optional> Middle Name </FormLabel>
      <input
        type="text"
        className="w-full rounded border border-neutral-300 px-3 py-2"
        placeholder="Enter middle name"
      />

      <FormLabel required> Email Address * </FormLabel>
      <input
        type="email"
        className="w-full rounded border border-neutral-300 px-3 py-2"
        placeholder="Enter email"
      />
    </FormContainer>
  );
}
```

## API Reference

### FormContainer Props

| Prop      | Type              | Default | Description                                      |
| --------- | ----------------- | ------- | ------------------------------------------------ |
| children  | `React.ReactNode` | -       | Content to be rendered inside the form container |
| className | `string`          | -       | Additional CSS classes for the container         |

### FormLabel Props

| Prop      | Type               | Default | Description                             |
| --------- | ------------------ | ------- | --------------------------------------- |
| children  | `React.ReactNode`  | -       | Content to be displayed as the label    |
| variant   | `"big" \| "small"` | "big"   | Visual size variant for the label       |
| required  | `boolean`          | false   | Whether to show required indicator (\*) |
| optional  | `boolean`          | false   | Whether to show optional text           |
| tooltip   | `React.ReactNode`  | -       | Additional tooltip or info element      |
| t         | `function`         | tMockFn | Translation function for optional text  |
| className | `string`           | -       | Additional CSS classes for the label    |

### Types

```typescript
export type FormLabelVariant = "big" | "small";

export type TranslationFunction = (
  key: string,
  options?: Record<string, any>,
  defaultValue?: string
) => string;
```

## Behavior

- Provides responsive grid layout (stacked on mobile, side-by-side on desktop)
- Supports required/optional field indicators with internationalization
- Maintains consistent label styling across form elements
- Handles both string and React children content for flexible labeling
- Responsive design with proper text wrapping and sizing

**Variants**: big (desktop height), small (compact height)
**Sizes**: Responsive (mobile-first design)

**Key Guidelines**:

- Use FormContainer for consistent form field layout
- Apply required prop for mandatory fields
- Use optional prop for non-mandatory fields
- Combine with other form components for complete form solutions
- Leverage tooltip prop for additional field information

## Component Code

```tsx
export interface FormContainerProps {
  children: React.ReactNode;
  className?: string;
}

export interface FormLabelProps {
  children: React.ReactNode;
  className?: string;
  variant?: "big" | "small";
  required?: boolean;
  optional?: boolean;
  tooltip?: React.ReactNode;
  t?: TranslationFunction;
}

export type FormLabelVariant = "big" | "small";

export const FormContainer: React.FC<FormContainerProps> = ({
  children,
  className,
}) => (
  <div
    className={cn(
      "grid grid-cols-1 items-start gap-4 bg-white md:grid-cols-[174px_1fr] md:gap-8",
      className
    )}
  >
    {children}
  </div>
);

export const FormLabel: React.FC<FormLabelProps> = ({
  t = tMockFn,
  variant = "big",
  required = false,
  optional = false,
  className,
  children,
  tooltip,
}) => {
  return (
    <div
      className={cn(
        "flex w-full items-center gap-1 text-sm font-semibold leading-[1.1] text-neutral-900 md:h-4 md:w-[174px] md:text-xs md:font-medium md:leading-[1.2] md:text-neutral-600",
        variant === "big" && "md:h-8",
        className
      )}
    >
      {typeof children === "string" ? (
        <label>
          {children}
          {required && <span> * </span>}
          {optional && (
            <>
              &nbsp;
              <span className="text-xxs md:text-xs md:font-normal md:italic md:text-neutral-500">
                {t("FormLabel.optional", {}, "(Opsional)")}
              </span>
            </>
          )}
        </label>
      ) : (
        children
      )}

      {/* If you need to add like InfoTooltip, you can add via tooltip props */}
      <div className="flex-shrink-0"> {tooltip} </div>
    </div>
  );
};
```

---

# Input

_Source: packages/ui/src/content/docs/components/Form/Input.mdx_

## Component Information

**Name:** Input

**Description:** Versatile text input component with icons, validation, and reset functionality

## Imports

```javascript
import { InputPreview } from "../../preview/Input.preview";

import { useState } from "react";

import { Input } from "@muatmuat/ui/Form";

import { cn } from "@muatmuat/lib/utils";
import { X } from "lucide-react";

import { type TranslationFunction, tMockFn } from "../../lib/mock-t";
import { IconComponent } from "../IconComponent";

```

## Overview

**Description:** Versatile text input component with icons, validation, and reset functionality

**Component:** Input

## Usage

<InputPreview />

```jsx
export function InputExample() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="space-y-4">
      <Input
        placeholder="Enter your email"
        type="email"
        icon={{ left: "/icons/email16.svg" }}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        errorMessage={
          email && !email.includes("@") ? "Please enter a valid email" : ""
        }
      />

      <Input
        placeholder="Create a password"
        type="password"
        icon={{ left: "/icons/lock16.svg" }}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        withReset={true}
        supportiveText="Must be at least 8 characters"
      />

      <Input
        placeholder="Enter amount"
        type="number"
        text={{ left: "$" }}
        icon={{ right: "/icons/dollar16.svg" }}
      />
    </div>
  );
}
```

## Customization Guide

### Appearance Prop Usage

The `appearance` prop is the primary way to customize the Input component's visual styling. Each part of the input can be customized independently:

```typescript
const appearance = {
  containerClassName: "h-12 w-full", // Controls the main container (height, width, borders)
  inputClassName: "text-lg", // Controls the actual input element
  errorMessageClassName: "text-sm", // Controls error message styling
  supportiveTextClassName: "text-xs", // Controls supportive text styling
  iconClassName: "w-5 h-5", // Controls icon sizing
};
```

### Height Customization (Important)

To customize the input height, **always use `appearance.containerClassName`**, not the input element itself:

```jsx
// ✅ CORRECT: Use containerClassName for height
<Input
  appearance={{
    containerClassName: "h-12 px-4"  // Sets container height
  }}
  // inputClassName controls only the text input styling
  inputClassName="text-base"
/>

// ❌ WRONG: Don't try to set height on input element directly
<Input
  inputClassName="h-12"  // This won't work as expected
  // The input element is contained within the wrapper div
/>
```

### Complete Customization Examples

```jsx
// Large input with custom styling
<Input
  placeholder="Search products..."
  icon={{ left: "/icons/search.svg" }}
  appearance={{
    containerClassName: "h-14 w-full border-2 border-primary-500 rounded-lg shadow-sm",
    inputClassName: "text-base font-medium placeholder:text-gray-400",
    iconClassName: "w-6 h-6 text-primary-500"
  }}
/>

// Compact input for tight spaces
<Input
  placeholder="Enter code"
  appearance={{
    containerClassName: "h-7 px-2 border border-gray-300 rounded",
    inputClassName: "text-xs font-medium",
    supportiveTextClassName: "text-[10px]"
  }}
  supportiveText="6 characters"
/>

// Error state with custom styling
<Input
  placeholder="Email address"
  type="email"
  errorMessage="Please enter a valid email"
  appearance={{
    containerClassName: "h-10 border-2 border-error-400 bg-error-50 rounded-md",
    inputClassName: "text-sm",
    errorMessageClassName: "text-xs font-semibold text-error-600"
  }}
/>
```

## API Reference

### Props

| Prop             | Type              | Default       | Description                                          |
| ---------------- | ----------------- | ------------- | ---------------------------------------------------- |
| value            | `string`          | -             | The current value of the input                       |
| name             | `string`          | -             | The name of the input element                        |
| type             | `string`          | "text"        | Input type (text, password, email, number, tel, url) |
| placeholder      | `string`          | "Placeholder" | Placeholder text                                     |
| disabled         | `boolean`         | false         | Whether the input is disabled                        |
| icon             | `InputIcon`       | `{}`          | Icons to display on left/right sides                 |
| text             | `InputText`       | `{}`          | Static text to display on left/right sides           |
| appearance       | `InputAppearance` | `{}`          | **Custom class names for component parts**           |
| errorMessage     | `string`          | -             | Error message to display below the input             |
| hideErrorMessage | `boolean`         | false         | Whether to hide the error message                    |
| supportiveText   | `string`          | -             | Supportive text displayed below the input            |
| withReset        | `boolean`         | false         | Whether to show reset button when input has value    |
| onChange         | `function`        | -             | Change event handler                                 |
| maxLength        | `number`          | -             | Maximum character length                             |
| className        | `string`          | -             | Additional CSS classes for outer wrapper             |
| t                | `function`        | tMockFn       | Translation function                                 |

### Types

```typescript
export type InputAppearance = {
  /** Controls the main container wrapper (height, width, borders, padding) */
  containerClassName?: string;
  /** Controls the actual input element styling (text, background) */
  inputClassName?: string;
  /** Controls error message styling */
  errorMessageClassName?: string;
  /** Controls supportive text styling */
  supportiveTextClassName?: string;
  /** Controls icon sizing and colors */
  iconClassName?: string;
};
```

### Common Customization Patterns & Pitfalls

#### 🎯 **Best Practices**

1. **Always use `containerClassName` for structural changes**

   ```jsx
   // ✅ Height, width, borders, padding, margins
   appearance={{
     containerClassName: "h-12 w-full border-2 border-blue-500 rounded-lg p-4"
   }}
   ```

2. **Use `inputClassName` for text and background styling**

   ```jsx
   // ✅ Font size, color, text styling, background
   appearance={{
     inputClassName: "text-base font-semibold text-gray-900 bg-white"
   }}
   ```

3. **Combine styles systematically**
   ```jsx
   <Input
     appearance={{
       // Structure first
       containerClassName:
         "h-12 px-4 border border-gray-300 rounded-md shadow-sm",
       // Then content styling
       inputClassName: "text-base font-medium placeholder:text-gray-500",
       // Finally accent elements
       iconClassName: "w-5 h-5 text-gray-400",
     }}
   />
   ```

#### ⚠️ **Common Mistakes to Avoid**

1. **Don't set height on `inputClassName`**

   ```jsx
   // ❌ WRONG - This won't work
   appearance={{
     inputClassName: "h-12 w-full"  // Height ignored
   }}

   // ✅ CORRECT - Use containerClassName
   appearance={{
     containerClassName: "h-12 w-full"  // Height applied correctly
   }}
   ```

2. **Don't use the root `className` prop for structural changes**

   ```jsx
   // ❌ LESS EFFECTIVE - Limited control
   <Input
     className="h-12 w-full"  // Only affects outer wrapper
     appearance={{ /* ... */ }}
   />

   // ✅ BETTER - Full control with appearance
   <Input
     appearance={{
       containerClassName: "h-12 w-full border-2 border-primary-500"
     }}
   />
   ```

3. **Don't override internal component structure**
   ```jsx
   // ❌ DON'T TRY THIS - Will break the component
   // The input has internal structure (icons, text, button)
   // that depends on the container layout
   ```

#### 🔧 **Quick Reference for Common Customizations**

| Goal                  | Correct Approach                                        |
| --------------------- | ------------------------------------------------------- |
| **Change height**     | `containerClassName: "h-12"`                            |
| **Change width**      | `containerClassName: "w-full"` or `className: "w-full"` |
| **Change border**     | `containerClassName: "border-2 border-blue-500"`        |
| **Change background** | `containerClassName: "bg-gray-50"`                      |
| **Change text size**  | `inputClassName: "text-lg"`                             |
| **Change text color** | `inputClassName: "text-gray-900"`                       |
| **Change icon size**  | `iconClassName: "w-6 h-6"`                              |
| **Change icon color** | `iconClassName: "text-blue-500"`                        |

## Behavior

- Supports all standard HTML input types with enhanced styling
- Displays left/right icons and text elements for better UX
- Shows error states with proper validation feedback
- Includes reset functionality for clearing input values
- Provides supportive text for additional guidance
- Handles disabled states with appropriate styling
- Responsive design with mobile-first approach

**Variants**: text, password, email, number, tel, url
**States**: default, focus, error, disabled, with-reset

**Key Guidelines**:

- Use icon prop for visual context (search icon, lock icon, etc.)
- Apply text prop for units or prefixes ($, kg, etc.)
- Use errorMessage for validation feedback
- Set withReset to true for user convenience
- Combine with FormLabel for complete form fields

## Component Code

```tsx
import {
  type ChangeEvent,
  type InputHTMLAttributes,
  type ReactNode,
  forwardRef,
} from "react";

// Assuming this utility exists

// Assuming component exists

/**
 * Defines the structure for icons that can be placed inside the input.
 * The value can be a URL string or a React component.
 */
export type InputIcon = {
  left?: string | ReactNode;
  onClickLeft?: () => void;
  right?: string | ReactNode;
  onClickRight?: () => void;
};

/**
 * Defines the structure for static text that can be placed inside the input.
 */
export type InputText = {
  left?: string;
  right?: string;
};

/**
 * Defines class names for customizing the appearance of the input component's parts.
 */
export type InputAppearance = {
  containerClassName?: string;
  inputClassName?: string;
  errorMessageClassName?: string;
  supportiveTextClassName?: string;
  iconClassName?: string;
};

/**

 * A standard translation function signature.
 */

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  /**
   * The current value of the input. Required for the `withReset` feature to work correctly.
   */
  value?: string;
  /**
   * The name of the input element, submitted with the form data.
   */
  name?: string;
  /**
   * A translation function. If not provided, a mock function will be used.
   * @default tMockFn
   */
  t?: TranslationFunction;
  /**
   * An optional icon or custom React node to display on the left or right side.
   */
  icon?: InputIcon;
  /**
   * An optional static text to display on the left or right side.
   */
  text?: InputText;
  /**
   * Object to customize the class names of the component's parts.
   */
  appearance?: InputAppearance;
  /**
   * The error message to display below the input. The component will be styled with an error state if this is present.
   */
  errorMessage?: string;
  hideErrorMessage?: boolean;
  /**
   * Additional descriptive text displayed below the input. Can be shown alongside an error message.
   */
  supportiveText?: string;
  /**
   * If true, a reset button (X) will be shown when the input has a value, allowing the user to clear it.
   * @default false
   */
  withReset?: boolean;
  /**
   * The `onChange` handler. It receives the standard `ChangeEvent` or a synthetic event from the reset button.
   * The synthetic event is designed to be compatible with form libraries.
   */
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

/**
 * A versatile and customizable text input component.
 * It supports icons, text adornments, error states, and a built-in reset button.
 * Built with forwardRef to allow direct access to the underlying input element.
 */
const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    t = tMockFn,
    name,
    type = "text",
    placeholder = "Placeholder",
    disabled = false,
    icon = {},
    text = {},
    className,
    maxLength,
    appearance = {},
    errorMessage,
    hideErrorMessage = false,
    supportiveText,
    onChange,
    withReset = false,
    value,
    ...restProps
  } = props;

  /**
   * Handles the click event for the reset button.
   * Creates a synthetic ChangeEvent to clear the input value,
   * ensuring compatibility with form libraries like Formik or React Hook Form.
   */
  const handleReset = () => {
    if (!onChange) return;

    // Create a synthetic event object that mimics a real ChangeEvent
    const syntheticEvent: ChangeEvent<HTMLInputElement> = {
      target: {
        ...props,
        value: "",
        name,
      },
      currentTarget: {
        ...props,
        value: "",
        name,
      },
      // Add other event properties as needed, though most handlers only need target.value
      bubbles: true,
      cancelable: false,
      defaultPrevented: false,
      eventPhase: 0,
      isTrusted: false,
      nativeEvent: new Event("input", { bubbles: true }),
      isDefaultPrevented: () => false,
      isPropagationStopped: () => false,
      persist: () => {},
      preventDefault: () => {},
      stopPropagation: () => {},
      timeStamp: Date.now(),
      type: "change",
    } as unknown as ChangeEvent<HTMLInputElement>; // Assert type for handler compatibility

    onChange(syntheticEvent);
  };

  const hasValue = !!value;
  const showReset = withReset && hasValue && !disabled;
  const showErrorState = !!errorMessage;

  return (
    <div className={cn("flex w-full flex-col gap-y-2", className)}>
      <div
        className={cn(
          "flex h-8 w-full items-center rounded-md border bg-neutral-50 px-3 transition-colors",
          // Default & Hover & Focus states
          "border-neutral-600 focus-within:border-primary-700 hover:border-primary-700",
          // Error state
          showErrorState && "border-error-400",
          // Disabled state
          disabled
            ? "cursor-not-allowed border-neutral-600 bg-neutral-200 hover:border-neutral-600"
            : "cursor-text",
          appearance.containerClassName
        )}
      >
        {/* Left Icon */}
        {icon.left && (
          <div className="mr-2 flex items-center">
            {typeof icon.left === "string" ? (
              <IconComponent
                src={icon.left}
                height={16}
                width={16}
                onClick={icon.onClickLeft}
                className={cn(
                  "text-neutral-700",
                  showErrorState && "text-error-400",
                  appearance.iconClassName
                )}
              />
            ) : (
              icon.left
            )}
          </div>
        )}
        {/* Left Text */}
        {text.left && (
          <span className="mr-3 whitespace-nowrap text-sm font-semibold text-neutral-900 md:text-xs md:font-medium">
            {text.left}
          </span>
        )}

        <input
          ref={ref}
          type={type}
          name={name}
          value={value}
          maxLength={maxLength}
          placeholder={placeholder}
          disabled={disabled}
          onChange={onChange}
          className={cn(
            "w-full min-w-0 border-none bg-transparent text-sm font-semibold text-neutral-900 outline-none placeholder:text-neutral-600 hover:cursor-pointer focus:ring-0 md:text-xs md:font-medium",
            disabled ? "cursor-not-allowed" : "cursor-text",
            appearance.inputClassName
          )}
          {...restProps}
        />

        {/* Right Adornment: Reset Button or Icon */}
        <div className="ml-2 flex items-center">
          {showReset ? (
            <X
              onClick={handleReset}
              className="size-4 cursor-pointer text-neutral-700 hover:text-neutral-900"
              aria-label="Clear input"
            />
          ) : icon.right ? (
            typeof icon.right === "string" ? (
              <IconComponent
                src={icon.right}
                height={16}
                width={16}
                onClick={icon.onClickRight}
                className={cn(
                  "text-neutral-700",
                  showErrorState && "text-error-400",
                  appearance.iconClassName
                )}
              />
            ) : (
              icon.right
            )
          ) : null}
        </div>

        {/* Right Text */}
        {text.right && (
          <span className="ml-3 whitespace-nowrap text-sm font-semibold text-neutral-900 md:text-xs md:font-medium">
            {text.right}
          </span>
        )}
      </div>

      {/* Supportive and Error Text Area */}
      {(errorMessage || supportiveText) && (
        <div className="flex w-full items-start justify-between">
          {errorMessage && !hideErrorMessage && (
            <span
              className={cn(
                "text-xs font-medium text-error-400",
                appearance.errorMessageClassName
              )}
            >
              {t(errorMessage)}
            </span>
          )}
          {supportiveText && (
            <span
              className={cn(
                "text-right text-xs font-medium text-neutral-900",
                // Push to the right if there is no error message
                !errorMessage && "ml-auto",
                appearance.supportiveTextClassName
              )}
            >
              {supportiveText}
            </span>
          )}
        </div>
      )}
    </div>
  );
});

Input.displayName = "Input";

export { Input };
```

---

# NumberInput

_Source: packages/ui/src/content/docs/components/Form/NumberInput.mdx_

## Component Information

**Name:** Number Input

**Description:** Numeric input with steppers, formatting, and validation support

## Imports

```javascript
import { NumberInputPreview } from "../../preview/NumberInput.preview";

import { useState } from "react";

import { NumberInput } from "@muatmuat/ui/Form";

import { cn } from "@muatmuat/lib/utils";
import { Minus, Plus } from "lucide-react";
import { type TranslationFunction, tMockFn } from "../../lib/mock-t";

```

## Overview

**Description:** Numeric input with steppers, formatting, and validation support

**Component:** Number Input

## Usage

<NumberInputPreview />

```jsx
export function NumberInputExample() {
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(1000);

  return (
    <div className="space-y-4">
      <NumberInput
        placeholder="Quantity"
        value={quantity}
        onChange={(value) => setQuantity(value?.value)}
        min={1}
        max={10}
        stepper={1}
      />

      <NumberInput
        placeholder="Price"
        value={price}
        onChange={(value) => setPrice(value?.value)}
        min={0}
        max={999999}
        text={{ left: "Rp", right: ",00" }}
        thousandSeparator="."
        decimalScale={2}
      />
    </div>
  );
}
```

## API Reference

### Props

| Prop              | Type                 | Default  | Description                                        |
| ----------------- | -------------------- | -------- | -------------------------------------------------- |
| value             | `number \| null`     | -        | The controlled value of the input                  |
| defaultValue      | `number \| null`     | 0        | The default value for uncontrolled mode            |
| onValueChange     | `function`           | -        | Callback fired when numeric value changes          |
| onChange          | `function`           | -        | Simplified onChange handler for form libraries     |
| min               | `number`             | 0        | Minimum allowed numeric value                      |
| max               | `number`             | Infinity | Maximum allowed numeric value                      |
| stepper           | `number`             | 1        | Amount to increment/decrement with stepper buttons |
| hideStepper       | `boolean`            | false    | Whether to hide stepper buttons                    |
| errorMessage      | `string`             | -        | Error message to display below input               |
| hideErrorMessage  | `boolean`            | false    | Whether to hide error message                      |
| text              | `InputTextAdornment` | -        | Prefix/suffix text adornments                      |
| t                 | `function`           | tMockFn  | Translation function                               |
| thousandSeparator | `string`             | "."      | Thousand separator character                       |
| decimalSeparator  | `string`             | ","      | Decimal separator character                        |
| decimalScale      | `number`             | 0        | Number of decimal places                           |
| fixedDecimalScale | `boolean`            | false    | Whether to always show decimal places              |
| placeholder       | `string`             | "0"      | Placeholder text                                   |
| disabled          | `boolean`            | false    | Whether the input is disabled                      |
| className         | `string`             | -        | Additional CSS classes                             |

### Types

```typescript
export interface InputTextAdornment {
  left?: string;
  right?: string;
}

export type TranslationFunction = (key: string) => string;
```

## Behavior

- Built on react-number-format for proper numeric formatting
- Provides stepper buttons for increment/decrement functionality
- Supports customizable prefix/suffix text adornments
- Handles numeric validation with min/max constraints
- Provides both controlled and uncontrolled modes
- Includes error handling and supportive text display
- Supports international number formatting

**Features**: Stepper buttons, numeric formatting, validation, prefix/suffix
**States**: default, focus, error, disabled, stepper-active

**Key Guidelines**:

- Use stepper for small numeric ranges (1-100)
- Set appropriate min/max values for validation
- Use text prop for units ($, kg, etc.)
- Configure decimalScale for currency/precision requirements
- Handle empty/null values appropriately in form logic

## Component Code

```tsx
import {
  type FocusEvent,
  forwardRef,
  useCallback,
  useEffect,
  useState,
} from "react";

// Assuming this utility exists

import {
  type NumberFormatValues,
  NumericFormat,
  type NumericFormatProps,
} from "react-number-format";

/**
 * Defines the structure for prefix/suffix text adornments.
 */
export interface InputTextAdornment {
  left?: string;
  right?: string;
}

export interface NumberInputProps
  extends Omit <
    NumericFormatProps,
    | "value"
    | "defaultValue"
    | "onValueChange"
    | "onChange"
    | "min"
    | "max"
    | "isAllowed"
  > {
  /**
   * The controlled value of the input.
   */
  value?: number | null;
  /**
   * The default value for uncontrolled mode.
   * @default 0
   */
  defaultValue?: number | null;
  /**
   * Callback fired when the numeric value changes.
   */
  onValueChange?: (value: number | undefined) => void;
  /**
   * A simplified `onChange` handler compatible with standard form libraries.
   */
  onChange?: (event: { target: { value: number | undefined } }) => void;
  /**
   * The minimum allowed numeric value.
   * @default 0
   */
  min?: number;
  /**
   * The maximum allowed numeric value.
   * @default Infinity
   */
  max?: number;
  /**
   * The amount to increment or decrement with stepper buttons.
   * @default 1
   */
  stepper?: number;
  /**
   * If `true`, the stepper buttons will be hidden.
   * @default false
   */
  hideStepper?: boolean;
  /**
   * The error message to display below the input.
   */
  errorMessage?: string;
  hideErrorMessage?: boolean;
  /**
   * A translation function.
   */
  t?: TranslationFunction;
  /**
   * An object for adding prefix and suffix text.
   */
  text?: InputTextAdornment;
}

/**
 * A versatile number input component with steppers, numeric formatting, and validation.
 * It can be used as a controlled or uncontrolled component and is built upon `react-number-format`.
 */
const NumberInput = forwardRef <HTMLInputElement, NumberInputProps> (
  (
    {
      t = tMockFn,
      value: controlledValue,
      defaultValue = 0,
      onValueChange,
      onChange,
      min = 0,
      max = Infinity,
      stepper = 1,
      className,
      disabled = false,
      thousandSeparator = ".",
      decimalSeparator = ",",
      decimalScale = 0,
      fixedDecimalScale = false,
      placeholder = "0",
      hideStepper = false,
      errorMessage,
      hideErrorMessage = false,
      text,
      onBlur,
      ...props
    },
    ref
  ) => {
    const isControlled = controlledValue !== undefined;
    const [internalValue, setInternalValue] = useState <number | null> (
      defaultValue
    );
    const [isFocused, setIsFocused] = useState(false);

    // Determine the current value based on whether the component is controlled or not.
    const value = isControlled ? controlledValue : internalValue;

    // Sync internal state if the controlled value changes from the outside.
    useEffect(() => {
      if (isControlled) {
        setInternalValue(controlledValue);
      }
    }, [controlledValue, isControlled]);

    /**
     * A memoized callback to enforce the `max` value constraint.
     */
    const isAllowed = useCallback(
      (values: NumberFormatValues) => {
        const { floatValue } = values;
        // Allow empty values or values within the max limit.
        return floatValue === undefined || floatValue <= max;
      },
      [max]
    );

    /**
     * A centralized and memoized function to trigger state updates and callbacks.
     */
    const triggerChange = useCallback(
      (newValue: number | undefined) => {
        if (!isControlled) {
          setInternalValue(newValue ?? null);
        }
        onValueChange?.(newValue);
        onChange?.({ target: { value: newValue } });
      },
      [isControlled, onChange, onValueChange]
    );

    const handleIncrement = useCallback(() => {
      const currentValue = typeof value === "number" ? value : 0;
      const newValue = Math.min(currentValue + stepper, max);
      triggerChange(newValue);
    }, [value, stepper, max, triggerChange]);

    const handleDecrement = useCallback(() => {
      const currentValue = typeof value === "number" ? value : 0;
      const newValue = Math.max(currentValue - stepper, min);
      triggerChange(newValue);
    }, [value, stepper, min, triggerChange]);

    const handleValueChange = (values: NumberFormatValues) => {
      triggerChange(values.floatValue);
    };

    const handleBlur = (e: FocusEvent <HTMLInputElement> ) => {
      setIsFocused(false);
      const numericValue = typeof value === "number" ? value : null;

      if (numericValue === null || numericValue < min) {
        triggerChange(min);
      } else if (numericValue > max) {
        triggerChange(max);
      }
      // Forward the original onBlur event if it exists.
      onBlur?.(e);
    };

    const handleFocus = () => setIsFocused(true);

    return (
      <div className={cn("flex w-full flex-col gap-2", className)}>
        <div
          className={cn(
            "flex h-8 items-center rounded-md border border-neutral-600 bg-neutral-50 transition-colors",
            disabled && "cursor-not-allowed bg-neutral-200",
            isFocused && !disabled && "border-primary-700",
            errorMessage && !disabled && "border-error-400"
          )}
        >
          {text?.left && (
            <span className="flex-shrink-0 pl-3 pr-2 text-sm font-semibold text-neutral-500">
              {text.left}
            </span>
          )}

          {!hideStepper && (
            <button
              type="button"
              aria-label="Decrease value"
              onClick={handleDecrement}
              disabled={disabled || (value ?? min) <= min}
              className={cn(
                "disabled:cursor-not-allowed",
                !text?.left && "pl-3"
              )}
            >
              <Minus className="size-4 text-neutral-700 transition-colors disabled:text-neutral-500" />
            </button>
          )}

          <NumericFormat
            {...props}
            getInputRef={ref}
            isAllowed={isAllowed}
            value={value ?? ""}
            onValueChange={handleValueChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            thousandSeparator={thousandSeparator}
            decimalSeparator={decimalSeparator}
            decimalScale={decimalScale}
            fixedDecimalScale={fixedDecimalScale}
            allowNegative={min < 0}
            placeholder={placeholder}
            disabled={disabled}
            className={cn(
              "min-w-0 flex-grow border-none bg-transparent text-sm font-semibold text-neutral-900 outline-none hover:cursor-pointer focus:ring-0 md:text-xs",
              !hideStepper && "text-center",
              "disabled:cursor-not-allowed disabled:text-neutral-500",
              // Hide browser default number input spinners
              "[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
              // Dynamic padding
              hideStepper && !text?.left && "pl-3",
              hideStepper && !text?.right && "pr-3"
            )}
          />

          {!hideStepper && (
            <button
              type="button"
              aria-label="Increase value"
              onClick={handleIncrement}
              disabled={disabled || (value ?? min) > = max}
              className={cn(
                "disabled:cursor-not-allowed",
                !text?.right && "pr-3"
              )}
            >
              <Plus className="size-4 text-neutral-700 transition-colors disabled:text-neutral-500" />
            </button>
          )}

          {text?.right && (
            <span className="flex-shrink-0 pl-2 pr-3 text-sm font-semibold text-neutral-500">
              {text.right}
            </span>
          )}
        </div>
        {errorMessage && !hideErrorMessage && (
          <span className="text-error-400 text-xs font-medium">
            {t(errorMessage)}
          </span>
        )}
      </div>
    );
  }
);

NumberInput.displayName = "NumberInput";

export { NumberInput };

```

---

# OtpInput

_Source: packages/ui/src/content/docs/components/Form/OtpInput.mdx_

## Component Information

**Name:** OTP Input

**Description:** One-time password input with individual character slots and auto-focus

## Imports

```javascript
import { useState } from "react";
import * as React from "react";
import { HTMLAttributes } from "react";

import { cn } from "@muatmuat/lib/utils";
import { InputOTPGroup, InputOTPSlot, OtpInput } from "@muatmuat/ui/Form";
import { OTPInput, OTPInputContext } from "input-otp";
import { MinusIcon } from "lucide-react";

import { OtpInputPreview } from "../../preview/OtpInput.preview";
```

## Overview

**Description:** One-time password input with individual character slots and auto-focus

**Component:** OTP Input

## Usage

<OtpInputPreview />

```jsx
export function OtpInputExample() {
  const [value, setValue] = useState("");

  return (
    <OtpInput value={value} onChange={setValue} maxLength={6}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </OtpInput>
  );
}
```

## API Reference

### OtpInput Props

| Prop               | Type              | Default | Description                               |
| ------------------ | ----------------- | ------- | ----------------------------------------- |
| value              | `string`          | -       | Current OTP value                         |
| onChange           | `function`        | -       | Callback fired when OTP value changes     |
| maxLength          | `number`          | 6       | Maximum number of characters              |
| className          | `string`          | -       | Additional CSS classes                    |
| containerClassName | `string`          | -       | Container CSS classes                     |
| children           | `React.ReactNode` | -       | InputOTPGroup and InputOTPSlot components |

### InputOTPGroup Props

| Prop      | Type     | Default | Description            |
| --------- | -------- | ------- | ---------------------- |
| className | `string` | -       | Additional CSS classes |

### InputOTPSlot Props

| Prop      | Type     | Default | Description                |
| --------- | -------- | ------- | -------------------------- |
| index     | `number` | -       | Position index of the slot |
| className | `string` | -       | Additional CSS classes     |

## Behavior

- Provides individual character input slots for OTP entry
- Auto-focuses next slot on character entry
- Supports backspace navigation between slots
- Built on input-otp library for accessibility
- Provides visual feedback for active slots
- Supports keyboard navigation and paste functionality
- Mobile-optimized with large touch targets

**Features**: Auto-focus, paste support, keyboard navigation, mobile-friendly
**States**: default, active, filled, disabled

**Key Guidelines**:

- Use for 2FA, verification codes, and PIN entry
- Set appropriate maxLength (typically 4-6 characters)
- Ensure clear instructions for users
- Consider auto-verification when complete
- Test thoroughly on mobile devices

## Component Code

```tsx
// Extend the existing OTPInputProps with additional properties
export interface InputOTPProps {
  className?: string;
  containerClassName?: string;
  children?: React.ReactNode;
  value?: string;
  onChange?: (newValue: string) => void;
  maxLength?: number;
}

export interface InputOTPGroupProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export interface InputOTPSlotProps extends HTMLAttributes<HTMLDivElement> {
  index: number;
  className?: string;
}

export interface InputOTPSeparatorProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

/**
 * InputOTP component implementation for one-time password entry
 */
const InputOTPImplementation = (
  {
    className,
    containerClassName,
    children,
    value,
    onChange,
    maxLength = 6,
    ...props
  }: InputOTPProps,
  ref: React.ForwardedRef<HTMLInputElement>
) => {
  return (
    <OTPInput
      ref={ref}
      value={value}
      onChange={onChange}
      maxLength={maxLength}
      data-slot="input-otp"
      containerClassName={cn(
        "has-disabled:opacity-50 flex items-center gap-3 hover:cursor-pointer", // Increased gap from gap-2 to gap-3
        containerClassName
      )}
      className={cn("disabled:cursor-not-allowed", className)}
      {...props}
    >
      {children}
    </OTPInput>
  );
};

// Wrap with forwardRef for ref forwarding
const OtpInput = React.forwardRef(InputOTPImplementation);
OtpInput.displayName = "OtpInput";

/**
 * InputOTPGroup component for grouping OTP slots
 */
function InputOTPGroup({
  className,
  ...props
}: InputOTPGroupProps): React.ReactElement {
  return (
    <div
      data-slot="input-otp-group"
      className={cn("flex items-center gap-2", className)} // Added gap-3 for consistent spacing
      {...props}
    />
  );
}

/**
 * InputOTPSlot component for individual OTP character input
 */
function InputOTPSlot({
  index,
  className,
  ...props
}: InputOTPSlotProps): React.ReactElement {
  const inputOTPContext = React.useContext(OTPInputContext);
  const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {};

  return (
    <div
      data-slot="input-otp-slot"
      data-active={isActive}
      className={cn(
        // Base styling - larger size and rounded corners
        "relative flex size-[30px] items-center justify-center p-0 text-center text-sm font-bold leading-[16.8px]",
        // Border and background
        "rounded-lg border border-[#868686] bg-white outline-none",
        // Active state
        "data-[active=true]:border-blue-500 data-[active=true]:ring-2 data-[active=true]:ring-blue-500/20",
        // Focus and hover states
        "transition-all duration-200 ease-in-out",
        "hover:border-gray-400",
        // Error states
        "aria-invalid:border-red-500 data-[active=true]:aria-invalid:border-red-500 data-[active=true]:aria-invalid:ring-red-500/20",
        // Remove default shadcn styling
        "shadow-sm",
        className
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-4 w-px animate-caret-blink bg-foreground duration-1000" />
        </div>
      )}
    </div>
  );
}

/**
 * InputOTPSeparator component for visual separation between OTP groups
 */
function InputOTPSeparator({
  ...props
}: InputOTPSeparatorProps): React.ReactElement {
  return (
    <div
      data-slot="input-otp-separator"
      role="separator"
      className="mx-2"
      {...props}
    >
      <MinusIcon className="h-4 w-4 text-gray-400" />
    </div>
  );
}

export { InputOTPGroup, InputOTPSeparator, InputOTPSlot, OtpInput };
```

---

# PhoneInput

_Source: packages/ui/src/content/docs/components/Form/PhoneInput.mdx_

## Component Information

**Name:** Phone Input

**Description:** International phone number input with country selection and validation

## Imports

```javascript
import { useState } from "react";

import { PhoneInputBO } from "@muatmuat/ui/Form";

import { PhoneInput } from "@muatmuat/ui/Form";
import * as RPNInput from "react-phone-number-input";

import { cn } from "@muatmuat/lib/utils";
import { Input } from "@muatmuat/ui/Form";
import { Popover, PopoverContent, PopoverTrigger } from "@muatmuat/ui/Popover";
import { ChevronDown } from "lucide-react";
import * as RPNInput from "react-phone-number-input";
import flags from "react-phone-number-input/flags";

```

## Overview

**Description:** International phone number input with country selection and validation

**Component:** Phone Input

import {
CustomPhoneInputPreview,
PhoneInputPreview,
} from "@muatmuat/ui/preview/PhoneInput.preview";

## Usage

<PhoneInputPreview />

```jsx
export function PhoneInputExample() {
  const [phone, setPhone] = useState("");

  return (
    <div className="space-y-4">
      <PhoneInputBO
        placeholder="Enter phone number"
        value={phone}
        onChange={setPhone}
        defaultCountry="ID"
      />
    </div>
  );
}
```

### Custom Phone Input

<CustomPhoneInputPreview />

For advanced use cases, you can build custom phone inputs using the compound components:

```jsx
export function CustomPhoneInputExample() {
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("US");

  // Custom components for styling
  const CustomCountrySelect = (props) => (
    <PhoneInput.CountrySelect
      {...props}
      className="border-r border-neutral-600 px-2"
    />
  );

  const CustomInput = (props) => (
    <PhoneInput.Input
      {...props}
      placeholder="Custom phone input"
      className="flex-1 px-3 py-2 outline-none placeholder:text-neutral-400"
    />
  );

  return (
    <div className="space-y-4">
      <PhoneInput.Root
        value={phone}
        onChange={setPhone}
        defaultCountry={country}
        onCountryChange={setCountry}
        className="flex items-center overflow-hidden rounded-md border border-neutral-600 bg-white transition-colors focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-0"
        countrySelectComponent={CustomCountrySelect}
        inputComponent={CustomInput}
      />
    </div>
  );
}
```

## API Reference

### PhoneInputBO Props

Complete phone input component with label, error handling, and built-in validation.

| Prop           | Type                                              | Default                | Description                        |
| -------------- | ------------------------------------------------- | ---------------------- | ---------------------------------- |
| value          | `RPNInput.Value`                                  | -                      | Phone number value in E.164 format |
| onChange       | `(value: RPNInput.Value) => void`                 | -                      | Callback when phone number changes |
| defaultCountry | `RPNInput.Country`                                | `"US"`                 | Default country code               |
| disabled       | `boolean`                                         | `false`                | Whether the input is disabled      |
| errorMessage   | `string`                                          | -                      | Error message to display           |
| label          | `string`                                          | -                      | Label for the input                |
| placeholder    | `string`                                          | `"Enter phone number"` | Placeholder text                   |
| onBlur         | `(event: FocusEvent <HTMLInputElement> ) => void` | -                      | Callback when input loses focus    |
| onFocus        | `(event: FocusEvent <HTMLInputElement> ) => void` | -                      | Callback when input gains focus    |
| appearance     | `\{ rootClassName?: string \}`                    | -                      | Custom appearance styles           |
| className      | `string`                                          | -                      | Additional CSS classes             |

### Types

```typescript
type PhoneInputBOProps =
  Pick <PhoneInputProps,
    "className"
    | "onChange"
    | "value"
    | "defaultCountry"
    | "disabled"
    | "errorMessage"
    | "label"
    | "placeholder"
    | "onBlur"
    | "onFocus"
    | "appearance"
  > ;

interface CountryEntry {
  label: string;
  value: RPNInput.Country \| undefined;
}
```

### Compound Components

#### PhoneInput.Root

Base component that provides phone number context and validation.

| Prop                   | Type                                  | Default | Description                     |
| ---------------------- | ------------------------------------- | ------- | ------------------------------- |
| value                  | `RPNInput.Value`                      | -       | Phone number value              |
| onChange               | `(value: RPNInput.Value) => void`     | -       | Callback when value changes     |
| defaultCountry         | `RPNInput.Country`                    | -       | Default country code            |
| onCountryChange        | `(country: RPNInput.Country) => void` | -       | Callback when country changes   |
| disabled               | `boolean`                             | `false` | Whether the input is disabled   |
| className              | `string`                              | -       | Additional CSS classes          |
| inputComponent         | `React.ComponentType <any> `          | -       | Custom input component          |
| countrySelectComponent | `React.ComponentType <any> `          | -       | Custom country select component |
| flagComponent          | `React.ComponentType <any> `          | -       | Custom flag component           |
| smartCaret             | `boolean`                             | -       | Enable smart caret positioning  |

#### PhoneInput.CountrySelect

Country selector dropdown with search and flags.

| Prop      | Type                                  | Default | Description                    |
| --------- | ------------------------------------- | ------- | ------------------------------ |
| value     | `RPNInput.Country`                    | -       | Currently selected country     |
| onChange  | `(country: RPNInput.Country) => void` | -       | Callback when country changes  |
| disabled  | `boolean`                             | `false` | Whether the select is disabled |
| className | `string`                              | -       | Additional CSS classes         |
| hasError  | `boolean`                             | `false` | Whether to show error state    |

#### PhoneInput.Input

Phone number input field with national number formatting.

| Prop      | Type                                               | Default | Description                     |
| --------- | -------------------------------------------------- | ------- | ------------------------------- |
| value     | `string`                                           | -       | Input display value             |
| onChange  | `(event: ChangeEvent <HTMLInputElement> ) => void` | -       | Callback when input changes     |
| onFocus   | `(event: FocusEvent <HTMLInputElement> ) => void`  | -       | Callback when input gets focus  |
| onBlur    | `(event: FocusEvent <HTMLInputElement> ) => void`  | -       | Callback when input loses focus |
| className | `string`                                           | -       | Additional CSS classes          |

#### PhoneInput.Flag

Country flag display component.

| Prop        | Type               | Default | Description                 |
| ----------- | ------------------ | ------- | --------------------------- |
| country     | `RPNInput.Country` | -       | Country code for flag       |
| countryName | `string`           | -       | Accessible name for country |

## Behavior

- International phone number input with country selection and smart formatting
- Validates phone number format based on selected country with E.164 output
- Handles keyboard navigation, search, and full accessibility support
- Supports custom components for styling and functionality customization

**Variants**: country-selector (default), compound-components
**States**: default, focus, disabled, error, country-dropdown-open

**Key Guidelines**:

- Use appropriate default country for your target audience
- Ensure proper validation on form submission using E.164 format
- Handle international number formats correctly with react-phone-number-input integration

## Component Code

```tsx
import React, {
  type ChangeEvent,
  type ComponentPropsWithoutRef,
  type FocusEvent,
  type KeyboardEvent,
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";

/**
 * Enhanced TypeScript interfaces for better type safety
 */
export interface PhoneInputProps
  extends Omit <
    ComponentPropsWithoutRef <"input"> ,
    "onChange" | "value" | "children"
  > {
  /** Phone number value in E.164 format */
  value?: string;
  /** Callback when phone number changes */
  onChange?: (value: RPNInput.Value) => void;
  /** Default country code */
  defaultCountry?: RPNInput.Country;
  /** Callback when country changes */
  onCountryChange?: (country: RPNInput.Country | undefined) => void;
  /** Whether the input is disabled */
  disabled?: boolean;
  /** Whether the input is in error state */
  errorMessage?: string;
  /** Helper text to display */
  helperText?: string;
  /** Label for the input */
  label?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Custom input component */
  inputComponent?: React.ComponentType <any> ;
  /** Custom country select component */
  countrySelectComponent?: React.ComponentType <any> ;
  /** Custom flag component */
  flagComponent?: React.ComponentType <any> ;

  appearance?: {
    rootClassName?: string;
  };
}

export interface CountrySelectProps {
  /** Whether the select is disabled */
  disabled?: boolean;
  /** Currently selected country */
  value: RPNInput.Country;
  /** List of country options */
  options: CountryEntry[];
  /** Callback when country selection changes */
  onChange: (country: RPNInput.Country) => void;
  /** Additional CSS classes */
  className?: string;
  /** Custom option component */
  OptionComponent?: React.ComponentType <CountrySelectOptionProps> ;
  /** Currently focused option for accessibility */
  focusedIndex?: number;
  /** Callback when focused option changes */
  setFocusedIndex?: (index: number) => void;
  /** Whether the input is in error state */
  hasError?: boolean;
}

export interface CountrySelectOptionProps {
  /** Country code */
  country: RPNInput.Country;
  /** Country display name */
  countryName: string;
  /** Currently selected country */
  selectedCountry: RPNInput.Country;
  /** Callback when this option is selected */
  onChange: (country: RPNInput.Country) => void;
  /** Callback after selection is complete */
  onSelectComplete: () => void;
  /** Whether this option is focused */
  isFocused?: boolean;
  /** Index of this option for accessibility */
  index?: number;
}

export interface CountryEntry {
  /** Country display name */
  label: string;
  /** Country code */
  value: RPNInput.Country | undefined;
}

export interface PhoneInputComponentProps {
  /** Phone number value */
  value?: RPNInput.Value;
  /** Callback when value changes */
  onChange?: (event: ChangeEvent <HTMLInputElement> ) => void;
  /** Callback when input loses focus */
  onBlur?: (event: FocusEvent <HTMLInputElement> ) => void;
  /** Callback when input gains focus */
  onFocus?: (event: FocusEvent <HTMLInputElement> ) => void;
  /** Additional CSS classes */
  className?: string;
  [key: string]: any;
}

/**
 * Custom hook for managing phone number formatting and validation
 */
const usePhoneNumberFormatting = () => {
  const getNationalNumber = useCallback(
    (phoneValue: RPNInput.Value): string => {
      if (!phoneValue) {
        return "";
      }

      // Convert to string, handling all possible value types
      const phoneStr = String(phoneValue);

      // If it's already a national number (no country code prefix), return as is
      if (!phoneStr.startsWith("+")) {
        return phoneStr;
      }

      // Check if this is just a country code (like "+62", "+1", "+44") with no national number
      const countryCodeOnlyMatch = phoneStr.match(/^\+\d+$/);
      if (countryCodeOnlyMatch) {
        return "";
      }

      // Extract national number from international format using a more robust regex
      const match = phoneStr.match(/^\+\d+[\s-]*(.+)$/);

      // If there's no match after the country code, it means it's just a country code (like "+62")
      // In that case, return empty string to hide the country code in the input field
      return match ? match[1] : "";
    },
    []
  );

  return { getNationalNumber };
};

/**
 * Enhanced Input Component with better accessibility and error handling
 */
const InputField = memo(
  forwardRef <HTMLInputElement, PhoneInputComponentProps> (
    ({ className, value, onChange, onBlur, onFocus, ...props }, ref) => {
      const { getNationalNumber } = usePhoneNumberFormatting();
      const [focused, setFocused] = useState(false);

      const displayValue = useMemo(
        () => getNationalNumber(value),
        [getNationalNumber, value]
      );

      const handleChange = useCallback(
        (event: ChangeEvent <HTMLInputElement> ) => {
          onChange?.(event);
        },
        [onChange]
      );

      const handleFocus = useCallback(
        (event: FocusEvent <HTMLInputElement> ) => {
          setFocused(true);
          onFocus?.(event);
        },
        [onFocus]
      );

      const handleBlur = useCallback(
        (event: FocusEvent <HTMLInputElement> ) => {
          setFocused(false);
          onBlur?.(event);
        },
        [onBlur]
      );

      return (
        <input
          ref={ref}
          type="tel"
          autoComplete="tel"
          className={cn(
            "h-8 w-full rounded-e-md rounded-s-none px-3 text-xs font-medium",
            "border-none outline-none focus:ring-0",
            "placeholder:text-neutral-400",
            "disabled:cursor-not-allowed disabled:opacity-50",
            focused && "bg-white",
            className
          )}
          value={displayValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          aria-label="Phone number"
          {...props}
        />
      );
    }
  )
);

InputField.displayName = "PhoneInputField";

/**
 * Enhanced Country Select Dropdown with improved accessibility and keyboard navigation
 */
const CountrySelect = memo <CountrySelectProps> (
  ({
    disabled,
    value: selectedCountry,
    options: countryList,
    onChange,
    className,
    OptionComponent = CountrySelectOption,
    focusedIndex = -1,
    setFocusedIndex,
    hasError = false,
  }) => {
    const scrollAreaRef = useRef <HTMLDivElement> (null);
    const searchInputRef = useRef <HTMLInputElement> (null);
    const [searchValue, setSearchValue] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    // Reset search when dropdown opens
    useEffect(() => {
      if (isOpen && searchInputRef.current) {
        searchInputRef.current.focus();
        setSearchValue("");
        setFocusedIndex?.(-1);
      }
    }, [isOpen, setFocusedIndex]);

    // Filter countries based on search
    const filteredCountries = useMemo(() => {
      if (!searchValue || searchValue.trim() === "") return countryList;

      const trimmedSearch = searchValue.trim().toLowerCase();

      return countryList.filter(({ value, label }) => {
        if (!value) return false;
        const callingCode = RPNInput.getCountryCallingCode(value);
        return (
          label.toLowerCase().includes(trimmedSearch) ||
          callingCode.includes(searchValue.trim()) ||
          value.toLowerCase().includes(trimmedSearch)
        );
      });
    }, [searchValue, countryList]);

    // Handle search input changes
    const handleSearchChange = useCallback(
      (event: ChangeEvent <HTMLInputElement> ) => {
        const newValue = event.target.value;
        setSearchValue(newValue);
        setFocusedIndex?.(-1);

        // Reset scroll position
        if (scrollAreaRef.current) {
          scrollAreaRef.current.scrollTop = 0;
        }
      },
      [setFocusedIndex]
    );

    // Handle keyboard navigation
    const handleKeyDown = useCallback(
      (event: KeyboardEvent <HTMLInputElement> ) => {
        if (event.key === "Escape") {
          setIsOpen(false);
          return;
        }

        if (event.key === "ArrowDown" || event.key === "ArrowUp") {
          event.preventDefault();
          const direction = event.key === "ArrowDown" ? 1 : -1;
          const newIndex = Math.max(
            0,
            Math.min(filteredCountries.length - 1, focusedIndex + direction)
          );
          setFocusedIndex?.(newIndex);

          // Scroll the focused option into view
          const optionElement = scrollAreaRef.current?.querySelector(
            `[data-option-index="${newIndex}"]`
          );
          optionElement?.scrollIntoView({ block: "nearest" });
        }

        if (
          event.key === "Enter" &&
          focusedIndex > = 0 &&
          filteredCountries[focusedIndex]
        ) {
          event.preventDefault();
          const selectedOption = filteredCountries[focusedIndex];
          if (selectedOption.value) {
            onChange(selectedOption.value);
            setIsOpen(false);
          }
        }
      },
      [focusedIndex, filteredCountries, onChange, setFocusedIndex]
    );

    // Handle country selection
    const handleCountryChange = useCallback(
      (country: RPNInput.Country) => {
        onChange(country);
        setIsOpen(false);
      },
      [onChange]
    );

    // Generate safe ID for accessibility
    const dropdownId = useId();

    return (
      <Popover
        open={isOpen}
        modal
        onOpenChange={(open) => {
          setIsOpen(open);
          if (open) {
            setSearchValue("");
          }
        }}
      >
        <PopoverTrigger asChild>
          <button
            type="button"
            className={cn(
              "flex h-8 items-center gap-1 border-r px-1",
              hasError ? "border-error-500" : "border-neutral-600",
              "hover:bg-neutral-50 focus:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-0",
              "disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent",
              className
            )}
            disabled={disabled}
            aria-haspopup="listbox"
            aria-expanded={isOpen}
            aria-labelledby={dropdownId}
          >
            <Flag country={selectedCountry} countryName={selectedCountry} />
            <span className="text-xs font-medium text-neutral-600">
              {`+${RPNInput.getCountryCallingCode(selectedCountry)}`}
            </span>
            <ChevronDown
              className={cn(
                "size-4 opacity-50 transition-transform",
                isOpen && "rotate-180",
                disabled && "hidden"
              )}
              aria-hidden="true"
            />
          </button>
        </PopoverTrigger>

        <PopoverContent className="w-[300px] p-0" align="start" sideOffset={4}>
          <div className="border-b border-neutral-300 p-2">
            <Input
              ref={searchInputRef}
              value={searchValue}
              onChange={handleSearchChange}
              onKeyDown={handleKeyDown}
              placeholder="Search country..."
              className="h-8"
              icon={{ left: "/icons/search16.svg" }}
              aria-label="Search countries"
            />
          </div>

          <div
            ref={scrollAreaRef}
            className="max-h-64 overflow-y-auto"
            role="listbox"
            aria-label="Countries"
          >
            {filteredCountries.length === 0 ? (
              <div
                className="py-6 text-center text-sm text-neutral-500"
                role="status"
                aria-live="polite"
              >
                No country found.
              </div>
            ) : (
              <div className="p-1">
                {filteredCountries.map((country, index) =>
                  country.value ? (
                    <OptionComponent
                      key={country.value}
                      country={country.value}
                      countryName={country.label}
                      selectedCountry={selectedCountry}
                      onChange={handleCountryChange}
                      onSelectComplete={() => setIsOpen(false)}
                      isFocused={index === focusedIndex}
                      index={index}
                    />
                  ) : null
                )}
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>
    );
  }
);

CountrySelect.displayName = "CountrySelectDropdown";

/**
 * Enhanced Country Select Option with better accessibility
 */
const CountrySelectOption = memo <CountrySelectOptionProps> (
  ({
    country,
    countryName,
    selectedCountry,
    onChange,
    onSelectComplete,
    isFocused = false,
    index = 0,
  }) => {
    const handleSelect = useCallback(() => {
      onChange(country);
      onSelectComplete();
    }, [onChange, onSelectComplete, country]);

    const isSelected = country === selectedCountry;

    return (
      <button
        type="button"
        onClick={handleSelect}
        className={cn(
          "flex w-full cursor-pointer items-center gap-2 rounded-md p-2 text-left text-sm",
          "transition-colors duration-75",
          "hover:bg-neutral-100 focus:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500",
          isSelected && "bg-blue-50 hover:bg-blue-100",
          isFocused && "bg-neutral-100 ring-2 ring-inset ring-blue-500"
        )}
        role="option"
        aria-selected={isSelected}
        aria-label={`${countryName} (+${RPNInput.getCountryCallingCode(country)})`}
        data-option-index={index}
      >
        <Flag country={country} countryName={countryName} />
        <span className="flex-1 truncate font-medium"> {countryName} </span>
        <span className="font-mono text-xs text-neutral-500">
          {`+${RPNInput.getCountryCallingCode(country)}`}
        </span>
        {isSelected && (
          <span className="text-blue-600" aria-hidden="true">
            ✓
          </span>
        )}
      </button>
    );
  }
);

CountrySelectOption.displayName = "CountrySelectOption";

/**
 * Flag Component with error handling
 */
const Flag = memo <{ country: RPNInput.Country; countryName?: string }> (
  ({ country, countryName }) => {
    const FlagComp = flags[country];

    return (
      <span
        className="inline-block h-4 w-6 overflow-hidden rounded-sm bg-neutral-200"
        role="img"
        aria-label={countryName || country}
      >
        {FlagComp ? (
          <FlagComp title={countryName || country} />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs text-neutral-400">
            🏳️
          </div>
        )}
      </span>
    );
  }
);

Flag.displayName = "Flag";

/**
 * Export individual components for customization
 */
export const PhoneInput = {
  Root: RPNInput.default,
  Flag,
  CountrySelect,
  CountrySelectOption,
  Input: InputField,
};

/**
 * Main Phone Input Component with enhanced features
 */
export const PhoneInputBO = forwardRef <any, PhoneInputProps> (
  (
    {
      className,
      onChange,
      value,
      defaultCountry = "US",
      disabled = false,
      errorMessage,
      label,
      placeholder = "Enter phone number",
      inputComponent,
      countrySelectComponent,
      flagComponent,
      onBlur,
      onFocus,
      appearance,
      ...props
    },
    ref
  ) => {
    const [focused, setFocused] = useState(false);

    // Handle value changes
    const handleChange = useCallback(
      (newValue: RPNInput.Value | undefined) => {
        onChange?.(newValue as RPNInput.Value);
      },
      [onChange]
    );

    // Handle country changes
    const handleCountryChange = useCallback(
      (_country: RPNInput.Country | undefined) => {
        // Country change logic if needed
      },
      []
    );

    // Custom country select component with error state support
    const CustomCountrySelect = useCallback(
      (props: any) => (
        <PhoneInput.CountrySelect {...props} hasError={Boolean(errorMessage)} />
      ),
      [errorMessage]
    );

    // Handle focus events
    const handleFocus = useCallback(
      (event: FocusEvent <HTMLInputElement> ) => {
        setFocused(true);
        onFocus?.(event);
      },
      [onFocus]
    );

    const handleBlur = useCallback(
      (event: FocusEvent <HTMLInputElement> ) => {
        setFocused(false);
        onBlur?.(event);
      },
      [onBlur]
    );

    // Generate unique IDs for accessibility
    const inputId = useId();
    const errorMessageId = useId();

    const rootClassName = cn(
      "ring-none flex items-center overflow-hidden rounded-md border transition-colors duration-75",
      "border-neutral-600 bg-white",
      focused && "border-blue-500 ring-2 ring-blue-500 ring-offset-0",
      errorMessage && "border-red-500",
      disabled && "cursor-not-allowed bg-neutral-50 opacity-60",
      appearance?.rootClassName
    );

    return (
      <div className={cn("w-full space-y-1", className)}>
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-neutral-700"
          >
            {label}
          </label>
        )}

        <PhoneInput.Root
          ref={ref}
          className={rootClassName}
          flagComponent={(flagComponent || PhoneInput.Flag) as any}
          countrySelectComponent={countrySelectComponent || CustomCountrySelect}
          inputComponent={inputComponent || PhoneInput.Input}
          smartCaret={false}
          value={value || undefined}
          onChange={handleChange}
          onCountryChange={handleCountryChange}
          defaultCountry={defaultCountry}
          disabled={disabled}
          placeholder={placeholder}
          onFocus={handleFocus}
          onBlur={handleBlur}
          id={inputId}
          aria-invalid={Boolean(errorMessage)}
          {...props}
        />

        {errorMessage && (
          <span
            id={errorMessageId}
            className="text-error-500 text-xs font-medium"
          >
            {errorMessage}
          </span>
        )}
      </div>
    );
  }
);

PhoneInputBO.displayName = "PhoneInputBO";

```

---

# RatingInput

_Source: packages/ui/src/content/docs/components/Form/RatingInput.mdx_

## Component Information

**Name:** Rating Input

**Description:** Interactive star rating component with customizable labels and mobile optimization

## Imports

```javascript
import { RatingInputPreview } from "../../preview/RatingInput.preview";

import { useState } from "react";

import { RatingInput } from "@muatmuat/ui/Form";

import { useDevice } from "@muatmuat/hooks/use-device";
import { cn } from "@muatmuat/lib/utils";

import { type TranslationFunction, tMockFn } from "../../lib/mock-t";
import { IconComponent } from "../IconComponent";

```

## Overview

**Description:** Interactive star rating component with customizable labels and mobile optimization

**Component:** Rating Input

## Usage

<RatingInputPreview />

```jsx
export function RatingInputExample() {
  const [rating, setRating] = useState(0);
  const [serviceRating, setServiceRating] = useState(4);

  return (
    <div className="space-y-4">
      <RatingInput value={rating} onChange={setRating} withLabel={true} />

      <RatingInput
        value={serviceRating}
        onChange={setServiceRating}
        withLabel={true}
      />
    </div>
  );
}
```

## API Reference

### Props

| Prop      | Type       | Default  | Description                            |
| --------- | ---------- | -------- | -------------------------------------- |
| value     | `number`   | 0        | Current selected rating value (0-5)    |
| onChange  | `function` | -        | Callback fired when rating changes     |
| disabled  | `boolean`  | false    | Whether the rating input is disabled   |
| withLabel | `boolean`  | true     | Whether to show descriptive text label |
| t         | `function` | identity | Translation function for rating labels |

### Types

```typescript
export type TranslationFunction = (key: string) => string;
```

## Behavior

- Interactive 5-star rating system with hover effects
- Supports both mobile and desktop optimized icons
- Provides descriptive text labels for each rating level
- Handles disabled states with appropriate styling
- Supports internationalization for rating labels
- Responsive design with proper spacing and sizing

**Rating Levels**: 1 (Sangat Buruk), 2 (Buruk), 3 (Cukup), 4 (Baik), 5 (Sangat Baik)
**States**: default, hover, selected, disabled
**Features**: Mobile optimization, hover effects, descriptive labels

**Key Guidelines**:

- Use for product reviews, service ratings, feedback collection
- Ensure proper labeling for accessibility
- Consider whether to show labels based on context
- Handle partial ratings appropriately if needed
- Test interaction on both mobile and desktop

## Component Code

```tsx

export type RatingValue = 0 | 1 | 2 | 3 | 4 | 5;

export interface RatingInputProps
  extends Omit <
    React.ButtonHTMLAttributes <HTMLDivElement> ,
    "onChange" | "value"
  > {
  t?: TranslationFunction;
  value?: RatingValue;
  onChange?: (rating: RatingValue) => void;
  disabled?: boolean;
  withLabel?: boolean;
}

const LENGTH = [1, 2, 3, 4, 5];

const RatingInput = ({
  t = tMockFn,
  value = 0,
  onChange,
  disabled = false,
  withLabel = true,
}: RatingInputProps) => {
  const { isMobile } = useDevice();
  const [hover, setHover] = useState <RatingValue> (0);

  const getRatingLabel = (score: RatingValue): string => {
    switch (score) {
      case 1:
        return t("labelSangatBuruk");
      case 2:
        return t("labelBuruk");
      case 3:
        return t("labelCukup");
      case 4:
        return t("labelBaik");
      case 5:
        return t("labelSangatBaik");
      default:
        return "";
    }
  };

  const handleStarClick = (rating: RatingValue) => {
    if (!disabled && onChange) {
      onChange(rating);
    }
  };

  const handleMouseEnter = (rating: RatingValue) => {
    if (!disabled) {
      setHover(rating as RatingValue);
    }
  };

  const handleMouseLeave = () => {
    if (!disabled) {
      setHover(0);
    }
  };

  return (
    <div className="flex items-center gap-4 md:gap-1">
      <div className="flex items-center [&> *+*]:pl-1">
        {LENGTH.map((starValue) => (
          <button
            type="button"
            key={starValue}
            disabled={disabled}
            onClick={() => handleStarClick(starValue as RatingValue)}
            onMouseEnter={() => handleMouseEnter(starValue as RatingValue)}
            onMouseLeave={handleMouseLeave}
            className="disabled:cursor-not-allowed"
            aria-label={`Rate ${starValue} out of 5 stars`}
          >
            <IconComponent
              className={cn(
                "transition-colors duration-200",
                (hover || value) > = starValue
                  ? "text-secondary-700"
                  : isMobile
                    ? "text-neutral-700"
                    : "text-neutral-400"
              )}
              src={
                isMobile && (hover || value) < starValue
                  ? "/icons/bintang-outline24.svg"
                  : "/icons/bintang-solid24.svg"
              }
              size="medium"
            />
          </button>
        ))}
      </div>
      {withLabel && value > 0 && (
        <span className="text-xs font-semibold leading-[14.4px] text-neutral-900">
          {getRatingLabel(value as RatingValue)}
        </span>
      )}
    </div>
  );
};

export { RatingInput };

```

---

# Select

_Source: packages/ui/src/content/docs/components/Form/Select.mdx_

## Component Information

**Name:** Select

**Description:** Accessible dropdown selection component with search and validation support

## Imports

```javascript
import { SelectPreview } from "../../preview/Select.preview";

import { useState } from "react";

import { Select } from "@muatmuat/ui/Form";

import { type ElementRef, forwardRef } from "react";

import { cn } from "@muatmuat/lib/utils";
import * as SelectPrimitive from "@radix-ui/react-select";

import { type TranslationFunction, tMockFn } from "../../lib/mock-t";
import { IconComponent } from "../IconComponent";

```

## Overview

**Description:** Accessible dropdown selection component with search and validation support

**Component:** Select

## Usage

<SelectPreview />

```jsx
export function SelectExample() {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const countries = [
    { value: "id", label: "Indonesia" },
    { value: "my", label: "Malaysia" },
    { value: "sg", label: "Singapore" },
    { value: "th", label: "Thailand" },
  ];

  return (
    <div className="space-y-4">
      <Select
        placeholder="Select your country"
        options={countries}
        value={selectedCountry}
        onChange={setSelectedCountry}
        errorMessage={!selectedCountry ? "Please select a country" : ""}
      />

      <Select
        placeholder="Select your city"
        options={[
          { value: "jkt", label: "Jakarta" },
          { value: "sby", label: "Surabaya" },
          { value: "bdg", label: "Bandung" },
        ]}
        value={selectedCity}
        onChange={setSelectedCity}
        disabled={!selectedCountry}
        notFoundText="Select a country first"
      />
    </div>
  );
}
```

## API Reference

### Props

| Prop             | Type             | Default                | Description                              |
| ---------------- | ---------------- | ---------------------- | ---------------------------------------- |
| options          | `SelectOption[]` | []                     | Array of selectable options              |
| value            | `string`         | -                      | Currently selected value                 |
| onChange         | `function`       | -                      | Callback fired when selection changes    |
| placeholder      | `string`         | "Select item..."       | Placeholder text when no option selected |
| notFoundText     | `string`         | "No options available" | Text shown when no options available     |
| disabled         | `boolean`        | false                  | Whether the select is disabled           |
| className        | `string`         | "w-full"               | Additional CSS classes                   |
| errorMessage     | `string \| null` | null                   | Error message to display below select    |
| hideErrorMessage | `boolean`        | false                  | Whether to hide the error message        |
| contentClassName | `string`         | -                      | Custom class name for dropdown content   |
| searchable       | `boolean`        | false                  | Whether search functionality is enabled  |
| t                | `function`       | tMockFn                | Translation function                     |

### Types

```typescript
export interface SelectOption {
  value: string;
  label: string;
}

export type TranslationFunction = (
  key: string,
  options?: Record<string, any>,
  defaultValue?: string
) => string;
```

## Behavior

- Built on Radix UI primitives for accessibility and keyboard navigation
- Supports single selection from predefined options
- Displays error states with proper validation feedback
- Provides search functionality for large option lists
- Handles disabled states with appropriate styling
- Shows placeholder when no option is selected
- Includes visual indicators for selected items

**Variants**: default, searchable, disabled, error
**States**: default, focus, open, disabled, error

**Key Guidelines**:

- Provide meaningful placeholder text for better UX
- Use errorMessage for validation feedback
- Enable searchable for large option lists (> 10 items)
- Group related options logically
- Ensure options have clear, concise labels

## Component Code

```tsx
import type {
  SelectProps as RadixSelectProps,
  SelectItemProps,
} from "@radix-ui/react-select";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps
  extends Omit<RadixSelectProps, "value" | "onValueChange" | "disabled"> {
  options?: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  notFoundText?: string;
  disabled?: boolean;
  className?: string;
  errorMessage?: string | null;
  hideErrorMessage?: boolean;
  contentClassName?: string;
  searchable?: boolean;
  t?: TranslationFunction;
}

const SelectItem = ({
  className,
  children,
  ...props
}: SelectItemProps & {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "flex w-full cursor-pointer items-center justify-between gap-2.5 px-2.5 py-3 text-left text-xs leading-[14.4px] transition-colors duration-150",
        "font-medium text-black outline-none hover:border-none hover:bg-neutral-200 hover:outline-none",
        "data-[state=checked]:bg-neutral-50 data-[state=checked]:font-semibold data-[state=checked]:text-black",
        className
      )}
      {...props}
    >
      <span className="absolute right-2.5 flex size-4 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <IconComponent
            src={"/icons/check-circle16.svg"}
            className="text-[#176CF7]"
            width={16}
            height={16}
          />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText> {children} </SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
};

const SelectComponent = (
  props: SelectProps,
  ref: React.ForwardedRef<ElementRef<typeof SelectPrimitive.Content>>
) => {
  const {
    t = tMockFn,
    options = [],
    value,
    onChange,
    placeholder = "Select item...",
    notFoundText = "No options available",
    disabled = false,
    className = "w-full",
    errorMessage = null,
    contentClassName,
    hideErrorMessage = false,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    searchable = false,
    ...restProps
  } = props;

  return (
    <div className="relative flex flex-col gap-2">
      <SelectPrimitive.Root
        data-slot="select"
        value={value}
        onValueChange={onChange}
        disabled={disabled}
        {...restProps}
      >
        <SelectPrimitive.Trigger
          data-slot="select-trigger"
          data-size={"sm"}
          className={cn(
            "group",
            "flex h-8 items-center justify-between gap-2 rounded-md border px-3 text-sm font-semibold leading-[14.4px] transition-colors duration-200 md:text-xs md:font-medium",
            "bg-white text-black focus:outline-none focus:ring-1 focus:ring-primary-700/20",
            "border-neutral-600 hover:border-primary-700 data-[state=open]:border-primary-700",
            errorMessage && "border-red-500 focus:border-red-500",
            disabled && "cursor-not-allowed bg-gray-50 opacity-50",
            !value && "text-neutral-600",
            className
          )}
        >
          <SelectPrimitive.Value
            data-slot="select-value"
            placeholder={placeholder}
            className="flex-1 truncate text-left placeholder:text-neutral-600"
          />
          <SelectPrimitive.Icon asChild>
            <span
              data-slot="select-chevron"
              className="inline-flex transition-transform duration-200 group-data-[state=open]:rotate-180"
            >
              <IconComponent src="/icons/chevron-down.svg" />
            </span>
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>

        <SelectPrimitive.Portal>
          <SelectPrimitive.Content
            ref={ref}
            data-slot="select-content"
            className={cn(
              "z-[52] overflow-hidden rounded-md border border-neutral-300 bg-white text-xs font-medium shadow-lg",
              "max-h-64",
              contentClassName
            )}
            position="popper"
            sideOffset={4}
          >
            <SelectPrimitive.Viewport
              className={cn(
                "w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1 p-0",
                "scrollbar-thin scrollbar-thumb-neutral-400 scrollbar-track-neutral-100 overflow-y-auto",
                "[&::-webkit-scrollbar-thumb]:bg-neutral-400 [&::-webkit-scrollbar-track]:bg-neutral-100 [&::-webkit-scrollbar]:w-3",
                "[&::-webkit-scrollbar-thumb:rounded-sm] [&::-webkit-scrollbar-thumb:hover]:bg-neutral-500"
              )}
            >
              {options.length === 0 ? (
                <div className="px-2.5 py-2 text-xs text-gray-500">
                  {notFoundText}
                </div>
              ) : (
                options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))
              )}
            </SelectPrimitive.Viewport>
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>
      {errorMessage && !hideErrorMessage && (
        <span className="text-xs font-medium text-error-400">
          {t(errorMessage)}
        </span>
      )}
    </div>
  );
};

// Wrap with forwardRef for ref forwarding
const Select = forwardRef(SelectComponent);
Select.displayName = "Select";

export { Select, SelectItem };
```

---

# TagInput

_Source: packages/ui/src/content/docs/components/Form/TagInput.mdx_

## Component Information

**Name:** Tag Input

**Description:** Dynamic tag input component with add/remove functionality and validation

## Imports

```javascript
import { TagInputPreview } from "../../preview/TagInput.preview";

import { useState } from "react";

import { TagInput } from "@muatmuat/ui/Form";

import { cn } from "@muatmuat/lib/utils";

import { type TranslationFunction, tMockFn } from "../../lib/mock-t";
import { TagBubble } from "../Badge/TagBubble";

```

## Overview

**Description:** Dynamic tag input component with add/remove functionality and validation

**Component:** Tag Input

## Usage

<TagInputPreview />

```jsx
export function TagInputExample() {
  const [tags, setTags] = useState(["react", "javascript"]);

  return (
    <TagInput
      tags={tags}
      onTagsChange={setTags}
      placeholder="Type and press Enter to add tags..."
      maxTags={10}
      maxLength={20}
      allowDuplicates={false}
      withTagInputHelp={true}
    />
  );
}
```

## API Reference

### Props

| Prop             | Type                 | Default                               | Description                                  |
| ---------------- | -------------------- | ------------------------------------- | -------------------------------------------- |
| tags             | `string[]`           | []                                    | Array of tags (controlled mode)              |
| onTagsChange     | `function`           | -                                     | Callback fired when tags array changes       |
| onTagsDuplicate  | `function`           | -                                     | Callback fired when duplicate tag is entered |
| placeholder      | `string`             | "Type and press Enter to add tags..." | Placeholder text                             |
| maxTags          | `number`             | Infinity                              | Maximum number of tags allowed               |
| maxLength        | `number`             | 50                                    | Maximum character length for single tag      |
| allowDuplicates  | `boolean`            | false                                 | Whether to allow duplicate tags              |
| disabled         | `boolean`            | false                                 | Whether the component is disabled            |
| errorMessage     | `string`             | -                                     | Error message to display                     |
| hideErrorMessage | `boolean`            | false                                 | Whether to hide error message                |
| withTagInputHelp | `boolean`            | false                                 | Whether to show tag count help text          |
| className        | `string`             | -                                     | Additional CSS classes                       |
| appearance       | `TagInputAppearance` | `{}`                                  | Custom class names for component parts       |
| t                | `function`           | tMockFn                               | Translation function                         |

### Types

```typescript
export interface TagInputAppearance {
  tagClassName?: string;
  inputClassName?: string;
}

export type TranslationFunction = (key: string) => string;
```

## Behavior

- Supports both controlled and uncontrolled modes
- Provides visual tag display with remove functionality
- Handles duplicate detection and prevention
- Supports keyboard navigation (Enter to add, Backspace to remove)
- Provides character count and tag limit validation
- Mobile-optimized with responsive design
- Supports paste functionality for multiple tags

**Features**: Add/remove tags, duplicate prevention, validation, keyboard support
**States**: default, focus, error, disabled, tag-limit-reached

**Key Guidelines**:

- Use for categorization, skills, interests, or metadata
- Set appropriate maxTags for your use case
- Provide clear instructions for users
- Consider auto-completion for large tag sets
- Handle tag normalization (lowercase, trim spaces)

## Component Code

```tsx
import {
  type ChangeEvent,
  type KeyboardEvent,
  useCallback,
  useRef,
  useState,
} from "react";

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
  const [internalTags, setInternalTags] = useState <string[]> (tags);
  const [inputValue, setInputValue] = useState("");

  const inputRef = useRef <HTMLInputElement> (null);

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
        currentTags.length > = maxTags ||
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
    (e: KeyboardEvent <HTMLInputElement> ) => {
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

  const handleInputChange = useCallback((e: ChangeEvent <HTMLInputElement> ) => {
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
              disabled={disabled || currentTags.length > = maxTags}
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
            {currentTags.length > = maxTags && (
              <span className="ml-2 text-amber-600"> Maximum tags reached </span>
            )}
          </div>
        )}
      </div>
      {errorMessage && !hideErrorMessage && (
        <span className="mt-2 text-sm text-red-500"> {t(errorMessage)} </span>
      )}
    </div>
  );
};

export { TagInput };

```

---

# TextArea

_Source: packages/ui/src/content/docs/components/Form/TextArea.mdx_

## Component Information

**Name:** Text Area

**Description:** Multi-line text input with character counting and validation support

## Imports

```javascript
import { TextAreaPreview } from "../../preview/TextArea.preview";

import { useState } from "react";

import { TextArea } from "@muatmuat/ui/Form";

import { type TextareaHTMLAttributes, forwardRef, memo } from "react";

import { cn } from "@muatmuat/lib/utils";

import { type TranslationFunction, tMockFn } from "../../lib/mock-t";

```

## Overview

**Description:** Multi-line text input with character counting and validation support

**Component:** Text Area

## Usage

<TextAreaPreview />

```jsx
export function TextAreaExample() {
  const [description, setDescription] = useState("");
  const [feedback, setFeedback] = useState("Great product!");

  return (
    <div className="space-y-4">
      <TextArea
        placeholder="Enter product description..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        maxLength={500}
        withCharCount={true}
        supportiveText="Describe your product in detail"
      />

      <TextArea
        placeholder="Share your feedback..."
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        maxLength={200}
        withCharCount={true}
        errorMessage={
          feedback.length < 10 ? "Feedback must be at least 10 characters" : ""
        }
      />
    </div>
  );
}
```

## API Reference

### Props

| Prop             | Type                 | Default          | Description                             |
| ---------------- | -------------------- | ---------------- | --------------------------------------- |
| value            | `string`             | -                | Current value of the textarea           |
| placeholder      | `string`             | "Placeholder..." | Placeholder text                        |
| disabled         | `boolean`            | false            | Whether the textarea is disabled        |
| maxLength        | `number`             | -                | Maximum character length                |
| withCharCount    | `boolean`            | false            | Whether to show character count         |
| errorMessage     | `string`             | -                | Error message to display below textarea |
| hideErrorMessage | `boolean`            | false            | Whether to hide error message           |
| supportiveText   | `string`             | -                | Supportive or descriptive text          |
| className        | `string`             | -                | Additional CSS classes                  |
| appearance       | `TextAreaAppearance` | `{}`             | Custom class names for component parts  |
| t                | `function`           | tMockFn          | Translation function                    |

### Types

```typescript
export interface TextAreaAppearance {
  inputClassName?: string;
}

export type TranslationFunction = (key: string) => string;
```

## Behavior

- Multi-line text input with responsive design
- Optional character counting with maxLength support
- Error handling and supportive text display
- Memoized for performance optimization
- Supports ref forwarding for direct DOM access
- Proper accessibility with semantic textarea element

**Features**: Character counting, validation, responsive sizing
**States**: default, focus, error, disabled

**Key Guidelines**:

- Use for longer text input (descriptions, feedback, comments)
- Set appropriate maxLength for character limits
- Use withCharCount for user feedback on length constraints
- Provide helpful placeholder text and supportive text
- Ensure sufficient height for expected content length

## Component Code

```tsx
/**
 * Defines class names for customizing the appearance of the TextArea component.
 */
export interface TextAreaAppearance {
  inputClassName?: string;
}

export interface TextAreaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  /**
   * The current value of the textarea.
   */
  value?: string;
  /**
   * An error message to display below the textarea. This will override the supportive text.
   */
  errorMessage?: string;
  hideErrorMessage?: boolean;
  /**
   * Optional class name for the root container element.
   */
  className?: string;
  /**
   * Object to customize the class names of the component's parts.
   */
  appearance?: TextAreaAppearance;
  /**
   * If `true`, a character count will be displayed. `maxLength` must also be provided.
   * @default false
   */
  withCharCount?: boolean;
  /**
   * Supportive or descriptive text to display below the textarea.
   */
  supportiveText?: string;
  /**
   * An optional translation function.
   */
  t?: TranslationFunction;
}

/**
 * A multi-line text input component with error handling and an optional character counter.
 * It is memoized and supports ref forwarding to the underlying textarea element.
 */
export const TextArea = memo(
  forwardRef<HTMLTextAreaElement, TextAreaProps>(
    (
      {
        value,
        errorMessage,
        hideErrorMessage,
        className,
        appearance = {},
        maxLength,
        withCharCount = false,
        supportiveText,
        placeholder = "Placeholder...",
        disabled = false,
        t = tMockFn,
        ...inputProps
      },
      ref
    ) => {
      const displayMessage =
        errorMessage && !hideErrorMessage ? t(errorMessage) : supportiveText;

      return (
        <div className={cn("flex w-full flex-col gap-2", className)}>
          <textarea
            {...inputProps}
            ref={ref}
            value={value}
            maxLength={maxLength}
            placeholder={placeholder}
            disabled={disabled}
            className={cn(
              "w-full flex-shrink-0 rounded-[6px] border border-neutral-600 p-3 text-xs font-medium leading-[1.2] text-neutral-900 outline-none transition-colors placeholder:text-neutral-600 focus-within:border-primary-700 hover:cursor-pointer hover:border-primary-700 disabled:cursor-not-allowed disabled:bg-neutral-200",
              errorMessage && "border-error-400",
              appearance.inputClassName
            )}
          />
          {(displayMessage || withCharCount) && (
            <div className="flex min-h-[1.2em] items-center justify-between">
              {displayMessage && (
                <span
                  className={cn(
                    "flex-1 text-xs font-medium text-neutral-600",
                    errorMessage && "text-error-400"
                  )}
                >
                  {displayMessage}
                </span>
              )}
              {withCharCount && maxLength && (
                <span className="ml-auto pl-2 text-xs font-medium text-neutral-600">
                  {value?.length ?? 0}/{maxLength}
                </span>
              )}
            </div>
          )}
        </div>
      );
    }
  )
);

TextArea.displayName = "TextArea";
```

---

# SimpleHoverMenu

_Source: packages/ui/src/content/docs/components/HoverMenu/SimpleHoverMenu.mdx_

## Component Information

**Name:** SimpleHoverMenu

**Description:** A hover-triggered dropdown menu component built on Radix UI primitives for contextual actions

## Imports

```javascript
import { SimpleHoverMenuPreview } from "../../preview/SimpleHoverMenu.preview";

import type { ComponentProps } from "react";

import { cn } from "@muatmuat/lib/utils";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";

```

## Overview

**Description:** A hover-triggered dropdown menu component built on Radix UI primitives for contextual actions

**Component:** SimpleHoverMenu

## Usage

<SimpleHoverMenuPreview />

```jsx
import {
  SimpleHover,
  SimpleHoverContent,
  SimpleHoverItem,
  SimpleHoverTrigger,
} from "@muatmuat/ui/HoverMenu";

function Example() {
  return (
    <SimpleHover>
      <SimpleHoverTrigger asChild>
        <button className="flex items-center gap-2 rounded-md bg-primary-700 px-4 py-2 text-white">
          <span> Hover me </span>
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </SimpleHoverTrigger>
      <SimpleHoverContent>
        <SimpleHoverItem onClick={() => console.log("Profile clicked")}>
          Profile
        </SimpleHoverItem>
        <SimpleHoverItem onClick={() => console.log("Settings clicked")}>
          Settings
        </SimpleHoverItem>
        <SimpleHoverItem onClick={() => console.log("Logout clicked")}>
          Logout
        </SimpleHoverItem>
      </SimpleHoverContent>
    </SimpleHover>
  );
}

// User menu example
function UserMenu() {
  return (
    <SimpleHover>
      <SimpleHoverTrigger asChild>
        <div className="flex cursor-pointer items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-700 text-sm font-medium text-white">
            JD
          </div>
          <span className="text-sm font-medium"> John Doe </span>
        </div>
      </SimpleHoverTrigger>
      <SimpleHoverContent>
        <SimpleHoverItem onClick={() => console.log("View profile")}>
          View Profile
        </SimpleHoverItem>
        <SimpleHoverItem onClick={() => console.log("Account settings")}>
          Account Settings
        </SimpleHoverItem>
        <SimpleHoverItem onClick={() => console.log("Sign out")}>
          Sign Out
        </SimpleHoverItem>
      </SimpleHoverContent>
    </SimpleHover>
  );
}

// Custom positioning
function CustomPositioning() {
  return (
    <div className="flex gap-8">
      <SimpleHover>
        <SimpleHoverTrigger asChild>
          <button className="rounded-md bg-blue-600 px-4 py-2 text-white">
            Top Menu
          </button>
        </SimpleHoverTrigger>
        <SimpleHoverContent side="top">
          <SimpleHoverItem> Top Item 1 </SimpleHoverItem>
          <SimpleHoverItem> Top Item 2 </SimpleHoverItem>
        </SimpleHoverContent>
      </SimpleHover>

      <SimpleHover>
        <SimpleHoverTrigger asChild>
          <button className="rounded-md bg-green-600 px-4 py-2 text-white">
            Right Menu
          </button>
        </SimpleHoverTrigger>
        <SimpleHoverContent side="right">
          <SimpleHoverItem> Right Item 1 </SimpleHoverItem>
          <SimpleHoverItem> Right Item 2 </SimpleHoverItem>
        </SimpleHoverContent>
      </SimpleHover>

      <SimpleHover>
        <SimpleHoverTrigger asChild>
          <button className="rounded-md bg-purple-600 px-4 py-2 text-white">
            Center Menu
          </button>
        </SimpleHoverTrigger>
        <SimpleHoverContent align="center">
          <SimpleHoverItem> Center Item 1 </SimpleHoverItem>
          <SimpleHoverItem> Center Item 2 </SimpleHoverItem>
        </SimpleHoverContent>
      </SimpleHover>
    </div>
  );
}

// Custom delays
function CustomDelays() {
  return (
    <SimpleHover openDelay={500} closeDelay={300}>
      <SimpleHoverTrigger asChild>
        <button className="rounded-md bg-indigo-600 px-4 py-2 text-white">
          Slow Hover
        </button>
      </SimpleHoverTrigger>
      <SimpleHoverContent>
        <SimpleHoverItem> Delayed appearance </SimpleHoverItem>
        <SimpleHoverItem> Item 2 </SimpleHoverItem>
      </SimpleHoverContent>
    </SimpleHover>
  );
}
```

## API Reference

### Components

#### SimpleHover (Root)

| Prop         | Type                      | Default | Description                          |
| ------------ | ------------------------- | ------- | ------------------------------------ |
| openDelay    | `number`                  | `200`   | Delay before opening in milliseconds |
| closeDelay   | `number`                  | `100`   | Delay before closing in milliseconds |
| open         | `boolean`                 | -       | Controlled open state                |
| onOpenChange | `(open: boolean) => void` | -       | Callback when open state changes     |
| defaultOpen  | `boolean`                 | -       | Initial open state when uncontrolled |

#### SimpleHoverTrigger

| Prop    | Type      | Default | Description                        |
| ------- | --------- | ------- | ---------------------------------- |
| asChild | `boolean` | `false` | Whether to render as child element |

#### SimpleHoverContent

| Prop      | Type                                     | Default    | Description                        |
| --------- | ---------------------------------------- | ---------- | ---------------------------------- |
| side      | `"top" \| "right" \| "bottom" \| "left"` | `"bottom"` | Which side to display the menu     |
| align     | `"start" \| "center" \| "end"`           | `"start"`  | Menu alignment relative to trigger |
| className | `string`                                 | -          | Additional CSS classes             |
| children  | `React.ReactNode`                        | -          | Menu content                       |

#### SimpleHoverItem

| Prop      | Type              | Default | Description            |
| --------- | ----------------- | ------- | ---------------------- |
| onClick   | `() => void`      | -       | Click handler function |
| className | `string`          | -       | Additional CSS classes |
| children  | `React.ReactNode` | -       | Item content           |

### Types

```typescript
export interface SimpleHoverProps {
  openDelay?: number;
  closeDelay?: number;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultOpen?: boolean;
}

export interface SimpleHoverTriggerProps {
  asChild?: boolean;
}

export interface SimpleHoverContentProps {
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  className?: string;
  children: React.ReactNode;
}

export interface SimpleHoverItemProps {
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
}
```

## Behavior

- Built on Radix UI HoverCard primitives for robust accessibility
- Hover-triggered menu with customizable open/close delays
- Automatic positioning with collision detection
- Proper keyboard navigation and focus management
- Mobile-friendly with touch interactions
- Smooth animations and transitions
- Clickable menu items with onClick handlers
- Responsive design that adapts to content
- Screen reader compatible with proper ARIA attributes
- Automatic cleanup of event listeners

**Variants**: Standard hover menu with flexible positioning and timing options
**Sizes**: Fixed width (194px) with auto-height based on content
**Key Guidelines**: Use for user menus, navigation items, contextual actions, and scenarios where hover-based interaction provides better UX than click-based menus

## Component Code

```tsx
type HoverCardRootProps = ComponentProps<typeof HoverCardPrimitive.Root>;
type HoverCardTriggerProps = ComponentProps<typeof HoverCardPrimitive.Trigger>;
type HoverCardContentProps = ComponentProps<typeof HoverCardPrimitive.Content>;

export interface SimpleHoverProps extends Omit<HoverCardRootProps, "children"> {
  children: React.ReactNode;
}

export interface SimpleHoverTriggerProps extends HoverCardTriggerProps {}

export interface SimpleHoverContentProps
  extends Omit<HoverCardContentProps, "children"> {
  children: React.ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  className?: string;
}

export interface SimpleHoverItemProps extends ComponentProps<"div"> {
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  className?: string;
  children: React.ReactNode;
}

export const SimpleHover: React.FC<SimpleHoverProps> = ({
  children,
  ...props
}) => (
  <HoverCardPrimitive.Root openDelay={200} closeDelay={100} {...props}>
    {children}
  </HoverCardPrimitive.Root>
);

export const SimpleHoverTrigger = HoverCardPrimitive.Trigger;

export const SimpleHoverContent: React.FC<SimpleHoverContentProps> = ({
  side = "bottom",
  align = "start",
  className,
  children,
}) => {
  return (
    <HoverCardPrimitive.Portal>
      <HoverCardPrimitive.Content
        className={cn(
          "z-50 mt-1 flex w-[194px] flex-col overflow-hidden rounded-md border border-neutral-300 bg-neutral-50 shadow-muat",
          className
        )}
        side={side}
        align={align}
      >
        {children}
      </HoverCardPrimitive.Content>
    </HoverCardPrimitive.Portal>
  );
};

export const SimpleHoverItem: React.FC<SimpleHoverItemProps> = ({
  className,
  onClick,
  children,
  ...props
}) => (
  <div
    className={cn(
      "cursor-pointer px-2.5 py-3 text-xs font-medium leading-[1.2] outline-none hover:bg-neutral-100",
      className
    )}
    onClick={onClick}
    {...props}
  >
    {children}
  </div>
);
```

---

# Lightbox

_Source: packages/ui/src/content/docs/components/Lightbox/Lightbox.mdx_

## Component Information

**Name:** Lightbox

**Description:** A responsive lightbox component for displaying images in a modal with navigation capabilities

## Imports

```javascript
import { createContext, useContext, useMemo, useState } from "react";

import { useDevice } from "@muatmuat/hooks/use-device";
import { cn } from "@muatmuat/lib/utils";
import { cva } from "class-variance-authority";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { LightboxPreviewExample } from "../../preview/Lightbox.preview";
import { IconComponent } from "../IconComponent";
import { ImageComponent } from "../ImageComponent";
import { Modal, ModalContent } from "../Modal";
```

## Overview

**Description:** A responsive lightbox component for displaying images in a modal with navigation capabilities

**Component:** Lightbox

## Usage

<LightboxPreviewExample />

```jsx
import {
  LightboxPreview,
  LightboxProvider,
  LightboxTrigger,
  useLightbox,
} from "@muatmuat/ui/Lightbox";

function Example() {
  const images = [
    "https://images.unsplash.com/photo-1501854140801-50d01698450b?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=800&h=600&fit=crop",
  ];

  return (
    <LightboxProvider title="Image Gallery" images={images} variant="shipper">
      <div className="grid grid-cols-2 gap-4">
        {images.map((image, index) => (
          <LightboxPreview
            key={index}
            image={image}
            index={index}
            alt={`Sample image ${index + 1}`}
          />
        ))}
      </div>

      <div className="mt-6">
        <LightboxTrigger>
          <button className="rounded-lg bg-primary-700 px-6 py-3 text-white">
            Open Gallery
          </button>
        </LightboxTrigger>
      </div>
    </LightboxProvider>
  );
}

// Hook usage
function CustomComponent() {
  const { openLightbox, closeLightbox, next, prev, images, current } =
    useLightbox();

  return (
    <div>
      <button onClick={() => openLightbox(0)}> Open Lightbox </button>
      <button onClick={next}> Next </button>
      <button onClick={prev}> Previous </button>
      <button onClick={closeLightbox}> Close </button>
    </div>
  );
}
```

## API Reference

### LightboxProvider Props

| Prop     | Type                                    | Default     | Description                                                   |
| -------- | --------------------------------------- | ----------- | ------------------------------------------------------------- |
| title    | `string \| ((index: number) => string)` | -           | Title displayed in lightbox header, can be static or function |
| images   | `string[]`                              | `[]`        | Array of image URLs to display in the lightbox                |
| image    | `string \| null`                        | -           | Single image URL (alternative to images array)                |
| children | `React.ReactNode`                       | -           | Child components that can access lightbox context             |
| variant  | `"shipper" \| "square"`                 | `"shipper"` | Visual style variant of the lightbox                          |

### LightboxPreview Props

| Prop      | Type                    | Default     | Description                               |
| --------- | ----------------------- | ----------- | ----------------------------------------- |
| image     | `string`                | -           | Image URL to display as preview thumbnail |
| index     | `number`                | `0`         | Index of image in the lightbox array      |
| className | `string`                | -           | Additional CSS classes                    |
| alt       | `string`                | -           | Alt text for the preview image            |
| variant   | `"shipper" \| "square"` | `"shipper"` | Visual style variant                      |

### LightboxTrigger Props

| Prop      | Type                    | Default     | Description             |
| --------- | ----------------------- | ----------- | ----------------------- |
| children  | `React.ReactNode`       | -           | Trigger element content |
| \_variant | `"shipper" \| "square"` | `"shipper"` | Internal variant prop   |

### useLightbox Hook Returns

| Property      | Type                      | Description                                 |
| ------------- | ------------------------- | ------------------------------------------- |
| images        | `string[]`                | Array of images in the lightbox             |
| current       | `number`                  | Current image index                         |
| open          | `boolean`                 | Whether lightbox is open                    |
| openLightbox  | `(index: number) => void` | Function to open lightbox at specific index |
| closeLightbox | `() => void`              | Function to close lightbox                  |
| next          | `() => void`              | Function to navigate to next image          |
| prev          | `() => void`              | Function to navigate to previous image      |

### Types

```typescript
interface LightboxContextValue {
  images: string[];
  current: number;
  open: boolean;
  openLightbox: (index: number) => void;
  closeLightbox: () => void;
  next: () => void;
  prev: () => void;
}

interface LightboxProviderProps {
  title: string | ((index: number) => string);
  images?: string[];
  image?: string | null;
  children: React.ReactNode;
  variant?: "shipper" | "square";
}

interface LightboxPreviewProps {
  image: string;
  index?: number;
  className?: string;
  alt?: string;
  variant?: "shipper" | "square";
}

interface LightboxTriggerProps {
  children: React.ReactNode;
  _variant?: "shipper" | "square";
}
```

## Behavior

- Provides context-based API for managing image gallery state
- Supports both single image and multiple image galleries
- Responsive design with different layouts for mobile and desktop
- Mobile: Full-screen overlay with swipe gestures
- Desktop: Modal with image preview thumbnails and navigation controls
- Keyboard navigation support (arrow keys, escape)
- Proper focus management and accessibility features
- Visual zoom icon overlay on preview thumbnails
- Dynamic title support that can change based on current image index
- Smooth transitions and animations between images
- Support for both shipper and square visual variants

**Variants**: Shipper (standard gallery) and Square (compact square format)
**Sizes**: Responsive - mobile full-screen, desktop modal (592px wide for shipper, variable for square)
**Key Guidelines**: Use for image galleries, product image viewers, document previews, and any scenario requiring full-screen image viewing

## Component Code

```tsx
interface LightboxContextValue {
  images: string[];
  current: number;
  open: boolean;
  openLightbox: (index: number) => void;
  closeLightbox: () => void;
  next: () => void;
  prev: () => void;
}

const LightboxContext = createContext<LightboxContextValue | null>(null);

interface LightboxProviderProps {
  title: string | ((index: number) => string);
  images?: string[];
  image?: string | null;
  children: React.ReactNode;
  variant?: "shipper" | "square";
}

export const lightboxModalVariants = cva(
  "flex w-screen flex-col items-center md:w-[592px] md:bg-white md:px-6 md:pb-3 md:pt-8",
  {
    variants: {
      variant: {
        shipper: "",
        square: "md:w-fit md:pb-[23px]",
      },
    },
    defaultVariants: { variant: "shipper" },
  }
);

export const lightboxTitleVariants = cva(
  "mb-3 hidden text-center text-base font-bold leading-[1.2] md:block",
  {
    variants: { variant: { shipper: "", square: "" } },
    defaultVariants: { variant: "shipper" },
  }
);

export const lightboxImageVariants = cva(
  "w-full object-cover md:h-[306px] md:w-[544px] md:rounded-[9px]",
  {
    variants: {
      variant: {
        shipper: "",
        square: "md:h-[364px] md:w-[364px] md:object-cover",
      },
    },
    defaultVariants: { variant: "shipper" },
  }
);

export const lightboxNavButtonVariants = cva(
  "absolute top-1/2 hidden size-8 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg md:flex",
  {
    variants: {
      variant: { shipper: "", square: "" },
      position: { left: "-left-3", right: "-right-3" },
    },
    defaultVariants: { variant: "shipper", position: "left" },
  }
);

export const lightboxPreviewThumbVariants = cva(
  "size-[56px] cursor-pointer rounded-[6px] border-2 border-neutral-400 object-cover",
  {
    variants: {
      variant: { shipper: "", square: "" },
      active: { true: "border-primary-700", false: "" },
    },
    defaultVariants: { variant: "shipper", active: false },
  }
);

export const lightboxPreviewRootVariants = cva("relative block w-fit", {
  variants: { variant: { shipper: "", square: "" } },
  defaultVariants: { variant: "shipper" },
});

export const lightboxPreviewImageVariants = cva(
  "size-[68px] rounded-xl border border-neutral-400 object-contain",
  {
    variants: { variant: { shipper: "", square: "" } },
    defaultVariants: { variant: "shipper" },
  }
);

export const lightboxPreviewIconVariants = cva(
  "absolute right-1 top-1 flex size-5 cursor-pointer items-center justify-center rounded-full bg-white",
  {
    variants: { variant: { shipper: "", square: "" } },
    defaultVariants: { variant: "shipper" },
  }
);

export const LightboxProvider: React.FC<LightboxProviderProps> = ({
  title,
  images = [],
  image,
  children,
  variant = "shipper",
}) => {
  const { isMobile, mounted } = useDevice();
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(0);

  const openLightbox = (index: number) => {
    setCurrent(index);
    setOpen(true);
  };

  const closeLightbox = () => setOpen(false);
  const next = () => setCurrent((prev) => (prev + 1) % images.length);
  const prev = () =>
    setCurrent((prev) => (prev - 1 + images.length) % images.length);

  const memoizedImages = useMemo(() => {
    if (image) {
      return [image];
    }
    return images;
  }, [image, images]);

  const displayTitle = useMemo(() => {
    if (typeof title === "function") {
      return title(current);
    }
    return title;
  }, [current, title]);

  if (!mounted) return null;

  return (
    <LightboxContext.Provider
      value={{
        images: memoizedImages,
        current,
        open,
        openLightbox,
        closeLightbox,
        next,
        prev,
      }}
    >
      {children}

      <Modal
        open={open}
        onOpenChange={closeLightbox}
        closeOnOutsideClick={!isMobile}
        withCloseButton={!isMobile}
      >
        <ModalContent
          appearance={{
            backgroundClassName: "bg-black md:bg-black/25",
          }}
          className={cn(
            lightboxModalVariants({ variant }),
            "rounded-none bg-white md:rounded-xl"
          )}
          type="lightbox"
        >
          <h1 className={lightboxTitleVariants({ variant })}>
            {" "}
            {displayTitle}{" "}
          </h1>
          <div className="relative w-full bg-white">
            <ImageComponent
              src={memoizedImages[current]}
              className={cn(lightboxImageVariants({ variant }))}
              alt=""
              unoptimized
            />
            {memoizedImages.length > 1 && (
              <>
                <button
                  className={lightboxNavButtonVariants({
                    variant,
                    position: "left",
                  })}
                  onClick={prev}
                >
                  <ChevronLeft className="size-6" />
                </button>
                <button
                  className={lightboxNavButtonVariants({
                    variant,
                    position: "right",
                  })}
                  onClick={next}
                >
                  <ChevronRight className="size-6" />
                </button>
              </>
            )}
          </div>
          {/* Previews of images */}
          {memoizedImages.length > 1 && (
            <div className="mt-3 hidden justify-center gap-2 md:flex md:flex-row">
              {memoizedImages.map((image, index) => (
                <div
                  key={`${index}_${image}`}
                  className="cursor-pointer"
                  onClick={() => setCurrent(index)}
                >
                  <ImageComponent
                    src={image}
                    className={lightboxPreviewThumbVariants({
                      variant,
                      active: current === index,
                    })}
                    alt=""
                  />
                </div>
              ))}
            </div>
          )}
        </ModalContent>
      </Modal>
    </LightboxContext.Provider>
  );
};

export const useLightbox = (): LightboxContextValue => {
  const context = useContext(LightboxContext);
  if (!context)
    throw new Error("useLightbox must be used within a LightboxProvider");
  return context;
};

interface LightboxPreviewProps {
  image: string;
  index?: number;
  className?: string;
  alt?: string;
  variant?: "shipper" | "square";
}

export const LightboxPreview: React.FC<LightboxPreviewProps> = ({
  image,
  index = 0,
  className,
  alt,
  variant = "shipper",
}) => {
  const { openLightbox } = useLightbox();

  return (
    <div className={cn(lightboxPreviewRootVariants({ variant }))}>
      <ImageComponent
        className={cn(lightboxPreviewImageVariants({ variant }), className)}
        src={image}
        alt={alt}
        unoptimized
      />
      <div
        onClick={(e) => {
          e.stopPropagation();
          openLightbox(index);
        }}
        className={lightboxPreviewIconVariants({ variant })}
      >
        <IconComponent
          src="/icons/zoom12.svg"
          width={12}
          height={12}
          className="text-neutral-700"
        />
      </div>
    </div>
  );
};

interface LightboxTriggerProps {
  children: React.ReactNode;
  _variant?: "shipper" | "square";
}

export const LightboxTrigger: React.FC<LightboxTriggerProps> = ({
  children,
  _variant = "shipper",
}) => {
  const { openLightbox } = useLightbox();

  return <div onClick={() => openLightbox(0)}> {children} </div>;
};
```

---

# LoadingInteractive

_Source: packages/ui/src/content/docs/components/Loading/LoadingInteractive.mdx_

## Component Information

**Name:** LoadingInteractive

**Description:** Interactive loading component that responds to global loading state using Zustand store

## Imports

```javascript
import { useState } from "react";
import * as React from "react";

import { ImageComponent } from "@muatmuat/ui/ImageComponent";
import { LoadingInteractive, useLoadingAction } from "@muatmuat/ui/Loading";

import { LoadingInteractivePreview } from "../../preview/LoadingInteractive.preview";
import { useLoadingStore } from "./loadingStore";
```

## Overview

**Description:** Interactive loading component that responds to global loading state using Zustand store

**Component:** LoadingInteractive

## Usage

<LoadingInteractivePreview />

```jsx
export function LoadingExample() {
  const { setIsGlobalLoading } = useLoadingAction();
  const [isLoading, setIsLoading] = useState(true);

  const toggleLoading = () => {
    const newState = !isLoading;
    setIsLoading(newState);
    setIsGlobalLoading(newState);
  };

  return (
    <div className="relative">
      <LoadingInteractive />

      <div className="space-y-4 p-8">
        <h2 className="text-2xl font-bold"> Page Content </h2>
        <p className="text-neutral-600">
          This content is behind the loading overlay when active.
        </p>

        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 transform rounded-lg border bg-white p-4 shadow-lg">
          <button
            onClick={toggleLoading}
            className="rounded bg-primary-700 px-4 py-2 text-white transition-colors hover:bg-primary-800"
          >
            {isLoading ? "Stop Loading" : "Start Loading"}
          </button>
        </div>
      </div>
    </div>
  );
}
```

## API Reference

### Props

| Prop   | Type | Default | Description                         |
| ------ | ---- | ------- | ----------------------------------- |
| (none) | -    | -       | Component has no configurable props |

### Types

```typescript
export interface LoadingInteractiveProps {}
```

## Behavior

- Displays full-screen loading overlay with backdrop blur when global loading state is active
- Renders conditionally based on Zustand store state, returning null when not loading
- Centers loading animation using fixed positioning with high z-index (9999)
- Uses image-based loading animation from `/img/loading-animation.webp`
- Integrates with global loading state management through useLoadingStore

**Key Guidelines**:

- Requires client-side rendering due to Zustand store dependency
- Use directive when using in Next.js App Router
- Pair with useLoadingAction hook to control loading state
- Automatically handles translation ready state
- Best for interactive applications with dynamic loading states

## Component Code

```tsx
export interface LoadingInteractiveProps {}

/**
 * Interactive loading component that responds to global loading state using Zustand store.
 * Features backdrop blur and centered loading animation. Only renders when loading is active.
 */
export const LoadingInteractive = (): React.ReactElement | null => {
  const isGlobalLoading = useLoadingStore((state) => state.isGlobalLoading);
  const isTranslationsReady = true;

  if (isGlobalLoading || !isTranslationsReady) {
    return (
      <div className="fixed left-0 top-0 z-[9999] flex h-screen w-screen items-center justify-center bg-black/10 backdrop-blur-md">
        <ImageComponent
          src={"/img/loading-animation.webp"}
          width={100}
          height={100}
          alt="loading"
          unoptimized
        />
      </div>
    );
  }

  return null;
};
```

---

# LoadingStatic

_Source: packages/ui/src/content/docs/components/Loading/LoadingStatic.mdx_

## Component Information

**Name:** LoadingStatic

**Description:** SSR/RSC friendly loading component that always renders a full-screen loading overlay

## Imports

```javascript
import * as React from "react";

import { ImageComponent } from "@muatmuat/ui/ImageComponent";
import { LoadingStatic } from "@muatmuat/ui/Loading";

import { LoadingStaticPreview } from "../../preview/LoadingStatic.preview";
```

## Overview

**Description:** SSR/RSC friendly loading component that always renders a full-screen loading overlay

**Component:** LoadingStatic

## Usage

<LoadingStaticPreview />

```jsx
export function LoadingExample() {
  return (
    <div className="relative">
      <LoadingStatic />

      <div className="space-y-4 p-8">
        <h2 className="text-2xl font-bold"> Page Content </h2>
        <p className="text-neutral-600">
          This content is behind the static loading overlay.
        </p>

        <div className="rounded-lg border border-blue-200 bg-blue-50 p-6">
          <h4 className="mb-2 font-medium text-blue-900"> ✅ Use Cases: </h4>
          <ul className="space-y-1 text-sm text-blue-800">
            <li> • Server-side rendered applications </li>
            <li> • React Server Components </li>
            <li> • Suspense fallbacks </li>
            <li> • Static site generation </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
```

## API Reference

### Props

| Prop   | Type | Default | Description                         |
| ------ | ---- | ------- | ----------------------------------- |
| (none) | -    | -       | Component has no configurable props |

### Types

```typescript
export interface LoadingStaticProps {}
```

## Behavior

- Always renders full-screen loading overlay regardless of application state
- SSR/RSC friendly with no client-side dependencies or state management
- Uses fixed positioning with z-index 50 for consistent overlay behavior
- Centers loading animation with backdrop blur effect
- Self-contained with no external dependencies or props

**Key Guidelines**:

- Perfect for server-side rendering and React Server Components
- Use as Suspense fallback component
- No client-side hooks or state management required
- Consistent appearance across all rendering environments
- Ideal for static site generation and pre-rendering scenarios

## Component Code

```tsx
export interface LoadingStaticProps {}

/**
 * SSR / RSC Friendly Loading Component that always renders a full-screen loading overlay.
 * Perfect for server-side rendered applications, React Server Components, and Suspense boundaries.
 */
export const LoadingStatic = (): React.ReactElement => {
  return (
    <div className="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-black/10 backdrop-blur-md">
      <ImageComponent
        src={"/img/loading-animation.webp"}
        width={100}
        height={100}
        alt="loading"
        unoptimized
      />
    </div>
  );
};
```

---

# MapContainer

_Source: packages/ui/src/content/docs/components/Maps/MapContainer.mdx_

## Component Information

**Name:** MapContainer

**Description:** Interactive Google Maps container with marker placement and location selection capabilities

## Imports

```javascript
import { MapContainerPreview } from "../../preview/MapContainer.preview";

import { useState } from "react";

import { MapContainer } from "@muatmuat/ui/Maps";

import { useCallback, useEffect, useRef, useState } from "react";

import { cn } from "@muatmuat/lib/utils";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

import { getAssetPath } from "../../lib/asset-path";

```

## Overview

**Description:** Interactive Google Maps container with marker placement and location selection capabilities

**Component:** MapContainer

## Usage

<MapContainerPreview />

```jsx
export function MapContainerExample() {
  const [coordinates, setCoordinates] = useState({
    latitude: -7.2575,
    longitude: 112.7521,
  });
  const [viewOnly, setViewOnly] = useState(false);
  const [textLabel, setTextLabel] = useState("Selected Location");

  const handlePositionChange = (newPosition) => {
    setCoordinates(newPosition);
    setTextLabel(
      `Location: ${newPosition.latitude.toFixed(4)}, ${newPosition.longitude.toFixed(4)}`
    );
  };

  return (
    <div className="space-y-4">
      {/* Interactive Map */}
      <div className="rounded-lg border border-gray-200 p-4">
        <h3 className="mb-2 font-medium"> Interactive Location Picker </h3>
        <MapContainer
          coordinates={coordinates}
          className="h-[400px] w-full"
          viewOnly={viewOnly}
          textLabel={textLabel}
          draggableMarker={!viewOnly}
          onPositionChange={handlePositionChange}
        />
      </div>

      {/* Current Coordinates */}
      <div className="rounded-lg border bg-gray-50 p-4">
        <h4 className="mb-2 font-medium"> Current Coordinates </h4>
        <div className="font-mono text-sm">
          <div> Latitude: {coordinates.latitude} </div>
          <div> Longitude: {coordinates.longitude} </div>
        </div>
      </div>

      {/* Controls */}
      <div className="rounded-lg border bg-white p-4">
        <h4 className="mb-2 font-medium"> Controls </h4>
        <div className="flex gap-4">
          <button
            onClick={() => setViewOnly(!viewOnly)}
            className={`rounded px-4 py-2 ${
              viewOnly ? "bg-gray-500 text-white" : "bg-blue-500 text-white"
            }`}
          >
            {viewOnly ? "View Only" : "Interactive"}
          </button>

          <button
            onClick={() => {
              const newCoords = {
                latitude: -6.2088,
                longitude: 106.8456,
              };
              setCoordinates(newCoords);
              setTextLabel("Jakarta, Indonesia");
            }}
            className="rounded bg-green-500 px-4 py-2 text-white"
          >
            Set to Jakarta
          </button>

          <button
            onClick={() => {
              const newCoords = {
                latitude: -7.2575,
                longitude: 112.7521,
              };
              setCoordinates(newCoords);
              setTextLabel("Surabaya, Indonesia");
            }}
            className="rounded bg-purple-500 px-4 py-2 text-white"
          >
            Set to Surabaya
          </button>
        </div>
      </div>

      {/* Usage Instructions */}
      <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
        <h4 className="mb-2 font-medium text-blue-900"> Instructions </h4>
        <ul className="list-inside text-sm text-blue-800">
          {viewOnly ? (
            <>
              <li> • Map is in view-only mode </li>
              <li> • Click "Interactive" to enable location selection </li>
              <li> • Click on markers to see location labels </li>
            </>
          ) : (
            <>
              <li> • Click anywhere on the map to place a marker </li>
              <li> • Drag the marker to adjust position </li>
              <li> • Click the marker to see location details </li>
              <li> • Coordinates update automatically </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}
```

## API Reference

### Props

| Prop             | Type                                        | Default                         | Description                                                         |
| ---------------- | ------------------------------------------- | ------------------------------- | ------------------------------------------------------------------- |
| coordinates      | `{latitude: `number`, longitude: `number`}` | required                        | Initial map coordinates with latitude and longitude                 |
| className        | `string`                                    | ""                              | Additional CSS classes for the map container                        |
| viewOnly         | `boolean`                                   | false                           | Whether the map is in view-only mode (disables interaction)         |
| textLabel        | `string`                                    | ""                              | Text label to display in the info window when marker is clicked     |
| draggableMarker  | `boolean`                                   | true                            | Whether the marker can be dragged (only when not viewOnly)          |
| markerIcon       | `string`                                    | "/icons/marker-lokasi-muat.svg" | Custom marker icon URL                                              |
| onPositionChange | `function`                                  | () => {}                        | Callback function triggered when position changes via click or drag |

### Types

```typescript
interface MapContainerProps {
  coordinates: { latitude: number; longitude: number };
  className?: string;
  viewOnly?: boolean;
  textLabel?: string;
  draggableMarker?: boolean;
  onPositionChange?: (position: {
    latitude: number;
    longitude: number;
  }) => void;
  markerIcon?: string;
}
```

## Behavior

- Interactive Google Maps container with marker placement capabilities
- Supports both interactive mode (click to place marker, drag to reposition) and view-only mode
- Displays custom marker with configurable icon and info window with text label
- Automatically pans map to new coordinates when coordinates prop changes
- Provides onPositionChange callback for tracking location updates
- Shows loading placeholder while Google Maps API loads
- Requires NEXT_PUBLIC_MAP_API environment variable with valid Google Maps API key
- Customizable container styling via Tailwind CSS classes

**Key Guidelines**:

- Ensure NEXT_PUBLIC_MAP_API environment variable is configured with valid Google Maps API key
- Use viewOnly mode for displaying static locations without interaction
- Implement onPositionChange callback to capture location updates in your application
- Customize marker appearance by providing custom icon URLs
- Use className prop to control container dimensions and styling
- Coordinates should be provided as `{latitude, longitude}` object format

## Component Code

```tsx
declare global {
  interface Window {
    google: any;
  }
}

interface MapContainerProps {
  coordinates: { latitude: number; longitude: number };
  className?: string;
  viewOnly?: boolean;
  textLabel?: string;
  draggableMarker?: boolean;
  onPositionChange?: (position: {
    latitude: number;
    longitude: number;
  }) => void;
  markerIcon?: string;
  size?: {
    width: number;
    height: number;
    widthUnit?: string;
    heightUnit?: string;
  };
  anchor?: {
    x: number;
    y: number;
  };
}

/**
 * An interactive Google Maps container with marker placement and location selection capabilities.
 * Perfect for address selection, location picking, and coordinate management interfaces.
 */
export const MapContainer = ({
  coordinates,
  className,
  viewOnly,
  textLabel,
  draggableMarker = true,
  onPositionChange = (_position: { latitude: number; longitude: number }) => {},
  markerIcon = "/icons/marker-lokasi-muat.svg",
  size,
  anchor,
}: MapContainerProps) => {
  const [map, setMap] = useState<any>(null);
  const [infoWindow, setInfoWindow] = useState<any>(null);
  // Ref to track if marker was just clicked
  const justClickedMarkerRef = useRef(false);
  const kuningMarkerRef = useRef<any>(null);

  // When lat/lng changes, optionally pan the map
  useEffect(() => {
    if (map) {
      map.panTo(
        new window.google.maps.LatLng(
          coordinates.latitude,
          coordinates.longitude
        )
      );
    }
  }, [coordinates, map]);

  const onLoad = useCallback(
    (mapInstance: any) => {
      mapInstance.setCenter(
        new window.google.maps.LatLng(
          coordinates.latitude,
          coordinates.longitude
        )
      );
      mapInstance.setZoom(15);
      setMap(mapInstance);
    },
    [coordinates]
  );

  // Handle map click to set marker position, unless marker was just clicked
  const handleMapClick = useCallback(
    (e: any) => {
      if (viewOnly) return;
      if (justClickedMarkerRef.current) {
        justClickedMarkerRef.current = false;
        return;
      }
      if (e && e.latLng) {
        const lat = e.latLng.lat();
        const lng = e.latLng.lng();
        onPositionChange({ latitude: lat, longitude: lng });
      }
      // Close InfoWindow if open (even if not setting position)
      if (infoWindow) {
        infoWindow.close();
        setInfoWindow(null);
      }
    },
    [viewOnly, infoWindow, onPositionChange]
  );

  // Handle marker drag end
  const handleMarkerDragEnd = useCallback(
    (e: any) => {
      if (e && e.latLng) {
        onPositionChange({
          latitude: e.latLng.lat(),
          longitude: e.latLng.lng(),
        });
        // Close InfoWindow if open
        if (infoWindow) {
          infoWindow.close();
          setInfoWindow(null);
        }
      }
    },
    [infoWindow, onPositionChange]
  );

  // Handle marker click
  const handleMarkerClick = useCallback(
    (_e: any, markerInstance: any) => {
      if (
        kuningMarkerRef.current &&
        markerInstance === kuningMarkerRef.current
      ) {
        // Don't open InfoWindow for this marker
        return;
      }
      justClickedMarkerRef.current = true;
      if (infoWindow) {
        infoWindow.close();
      }
      const newInfoWindow = new window.google.maps.InfoWindow({
        content: textLabel
          ? ` <div style="font-weight:500;font-size: text-sm;margin:0;padding:0;line-height:1.2;"> ${textLabel} </div> `
          : "",
        position: {
          lat: coordinates.latitude,
          lng: coordinates.longitude,
        },
        disableAutoPan: false,
      });
      newInfoWindow.open(map);
      setInfoWindow(newInfoWindow);
    },
    [coordinates, infoWindow, map, textLabel]
  );

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAP_API,
  });

  // Loading placeholder
  if (!isLoaded) {
    return (
      <div
        className={cn(
          "h-[200px] w-[200px] animate-pulse overflow-hidden rounded-md bg-gray-400",
          className
        )}
      >
        {" "}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "h-[200px] w-[200px] overflow-hidden rounded-md",
        className
      )}
    >
      <GoogleMap
        center={{
          lat: coordinates.latitude,
          lng: coordinates.longitude,
        }}
        mapContainerStyle={{ width: "100%", height: "100%" }}
        onLoad={onLoad}
        onUnmount={() => setMap(null)}
        onClick={handleMapClick}
        options={{
          // 24. THP 2 - MOD001 - MP - 012 - QC Plan - Web - Muatparts - Paket 005 A - Daftar Sebagai Seller Muatparts - LB - 0310
          draggable: !viewOnly,
          scrollwheel: !viewOnly,
          streetViewControl: false,
          mapTypeControl: false,
          cameraControl: false,
          fullscreenControl: false,
        }}
        zoom={15}
      >
        <Marker
          ref={kuningMarkerRef}
          position={{
            lat: coordinates.latitude,
            lng: coordinates.longitude,
          }}
          draggable={!viewOnly && draggableMarker}
          onDragEnd={handleMarkerDragEnd}
          icon={{
            url: getAssetPath(markerIcon),
            scaledSize: new window.google.maps.Size(
              size?.width || 45,
              size?.height || 58,
              size?.widthUnit,
              size?.heightUnit
            ),
            anchor: new window.google.maps.Point(
              anchor?.x || 22.5,
              anchor?.y || 29
            ),
          }}
          onClick={(e) => handleMarkerClick(e, kuningMarkerRef.current)}
        />
      </GoogleMap>
    </div>
  );
};
```

---

# MapWithPath

_Source: packages/ui/src/content/docs/components/Maps/MapWithPath.mdx_

## Component Information

**Name:** MapWithPath

**Description:** Advanced Google Maps component with path visualization, multiple markers, and animated truck tracking

## Imports

```javascript
import { useState } from "react";
import { useEffect, useMemo } from "react";

import { useDevice } from "@muatmuat/hooks/use-device";
import { ImageComponent } from "@muatmuat/ui/ImageComponent";
import { MapWithPath } from "@muatmuat/ui/Maps";

import { getAssetPath } from "../../lib/asset-path";
import { MapWithPathPreview } from "../../preview/MapWithPath.preview";
```

## Overview

**Description:** Advanced Google Maps component with path visualization, multiple markers, and animated truck tracking

**Component:** MapWithPath

## Usage

<MapWithPathPreview />

```jsx
export function MapWithPathExample() {
  const [showTruck, setShowTruck] = useState(true);
  const [pathColor, setPathColor] = useState("#DD7B02");
  const [showPath, setShowPath] = useState(true);

  // Mock location data
  const locationMarkers = [
    {
      title: "Warehouse",
      position: { lat: -7.2575, lng: 112.7521 },
      type: "pickup",
      icon: "/icons/warehouse-icon.svg",
      onClick: (marker) => console.log("Warehouse clicked:", marker),
    },
    {
      title: "Customer Location",
      position: { lat: -7.2755, lng: 112.7631 },
      type: "dropoff",
      icon: "/icons/customer-icon.svg",
      onClick: (marker) => console.log("Customer location clicked:", marker),
    },
    {
      title: "Distribution Center",
      position: { lat: -7.2405, lng: 112.7451 },
      type: "pickup",
      icon: "/icons/distribution-icon.svg",
      onClick: (marker) => console.log("Distribution center clicked:", marker),
    },
  ];

  const locationPolyline = [
    { lat: -7.2575, lng: 112.7521 },
    { lat: -7.2605, lng: 112.7551 },
    { lat: -7.2655, lng: 112.7581 },
    { lat: -7.2705, lng: 112.7611 },
    { lat: -7.2755, lng: 112.7631 },
  ];

  const encodedTruckPolyline = "_p~iF~ps|U_ulLnnqC_mqNvxq`@";

  const pathOptions = {
    strokeColor: pathColor,
    strokeOpacity: 1,
    strokeWeight: 6,
  };

  const truckPathOptions = {
    strokeColor: "#FFC217",
    strokeOpacity: 1,
    strokeWeight: 6,
    strokeDashArray: "10,5",
  };

  return (
    <div className="space-y-4">
      {/* Main Map Display */}
      <div className="rounded-lg border border-gray-200 p-4">
        <h3 className="mb-2 font-medium"> Logistics Route Tracking </h3>
        <MapWithPath
          apiKey="AIzaSyDw_9D9-4zTechHn1wMEILZqiBv51Q7jHU"
          mapContainerStyle={{ width: "100%", height: "500px" }}
          center={{ lat: -7.2575, lng: 112.7521 }}
          zoom={12}
          locationMarkers={locationMarkers}
          locationPolyline={showPath ? locationPolyline : []}
          encodedTruckPolyline={encodedTruckPolyline}
          pathOptions={pathOptions}
          truckPathOptions={truckPathOptions}
          showTruck={showTruck}
          truckIcon="/icons/truck-icon.svg"
        />
      </div>

      {/* Controls */}
      <div className="rounded-lg border bg-white p-4">
        <h4 className="mb-2 font-medium"> Display Controls </h4>
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => setShowTruck(!showTruck)}
            className={`rounded px-4 py-2 ${
              showTruck
                ? "bg-green-500 text-white"
                : "bg-gray-300 text-gray-700"
            }`}
          >
            {showTruck ? "Hide Truck" : "Show Truck"}
          </button>

          <button
            onClick={() => setShowPath(!showPath)}
            className={`rounded px-4 py-2 ${
              showPath ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-700"
            }`}
          >
            {showPath ? "Hide Path" : "Show Path"}
          </button>

          <div className="flex items-center gap-2">
            <label className="text-sm font-medium"> Path Color: </label>
            <select
              value={pathColor}
              onChange={(e) => setPathColor(e.target.value)}
              className="rounded border px-2 py-1 text-sm"
            >
              <option value="#DD7B02"> Orange </option>
              <option value="#059669"> Green </option>
              <option value="#dc2626"> Red </option>
              <option value="#2563eb"> Blue </option>
              <option value="#7c3aed"> Purple </option>
            </select>
          </div>
        </div>
      </div>

      {/* Route Information */}
      <div className="rounded-lg border bg-gray-50 p-4">
        <h4 className="mb-2 font-medium"> Route Information </h4>
        <div className="grid grid-cols-1 gap-2 text-sm md:grid-cols-3">
          <div>
            <span className="font-medium"> Total Stops: </span>{" "}
            {locationMarkers.length}
          </div>
          <div>
            <span className="font-medium"> Pickup Points: </span>{" "}
            {locationMarkers.filter((m) => m.type === "pickup").length}
          </div>
          <div>
            <span className="font-medium"> Dropoff Points: </span>{" "}
            {locationMarkers.filter((m) => m.type === "dropoff").length}
          </div>
        </div>
      </div>

      {/* Feature List */}
      <div className="rounded-lg border border-green-200 bg-green-50 p-4">
        <h4 className="mb-2 font-medium text-green-900"> Features </h4>
        <ul className="list-inside text-sm text-green-800">
          <li> • Multiple location markers with custom icons </li>
          <li> • Animated truck tracking with rotation based on direction </li>
          <li> • Customizable path styling and colors </li>
          <li> • Mobile-responsive marker labels </li>
          <li> • Click handlers for location interactions </li>
          <li> • Support for encoded polylines from Google Maps API </li>
          <li> • Separate truck route and location path visualization </li>
        </ul>
      </div>
    </div>
  );
}
```

## API Reference

### Props

| Prop                 | Type                                  | Default                                                                                  | Description                                                  |
| -------------------- | ------------------------------------- | ---------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| apiKey               | `string`                              | "AIzaSyDw_9D9-4zTechHn1wMEILZqiBv51Q7jHU"                                                | Google Maps API key                                          |
| mapContainerStyle    | `React.CSSProperties`                 | `{ width: "100%", height: "400px" }`                                                     | Custom CSS styles for the map container                      |
| center               | `{lat: number, lng: number}`          | `{ lat: -7.2575, lng: 112.7521 }`                                                        | Map center coordinates                                       |
| zoom                 | `number`                              | 13                                                                                       | Map zoom level                                               |
| locationMarkers      | `Array <LocationMarker> `             | []                                                                                       | Array of location markers to display on the map              |
| locationPolyline     | `Array <{lat: number, lng: number}> ` | []                                                                                       | Array of coordinates forming the path between locations      |
| encodedTruckPolyline | `string`                              | ""                                                                                       | Encoded polyline string for truck route from Google Maps API |
| pathOptions          | `google.maps.PolylineOptions`         | `{ strokeColor: "#DD7B02", strokeOpacity: 1, strokeWeight: 6 }`                          | Custom styling options for the location path                 |
| truckPathOptions     | `google.maps.PolylineOptions`         | `{ strokeColor: "#DD7B02", strokeOpacity: 1, strokeWeight: 6, strokeDashArray: "10,5" }` | Custom styling options for the truck path                    |
| mapOptions           | `google.maps.MapOptions`              | `{}`                                                                                     | Additional Google Maps options                               |
| showTruck            | `boolean`                             | true                                                                                     | Whether to show the animated truck marker                    |
| truckIcon            | `string`                              | "/icons/truck-icon.svg"                                                                  | Custom truck icon URL                                        |

### Types

```typescript
interface LocationMarker {
  position: any;
  title: string;
  type: "pickup" | "dropoff";
  icon: string;
  onClick?: (marker: LocationMarker) => void;
}

interface LatLng {
  lat: number;
  lng: number;
}

interface MapWithPathProps {
  apiKey?: string;
  mapContainerStyle?: any;
  center?: LatLng;
  zoom?: number;
  locationMarkers?: LocationMarker[];
  locationPolyline?: any[];
  encodedTruckPolyline?: string;
  pathOptions?: any;
  truckPathOptions?: any;
  mapOptions?: any;
  showTruck?: boolean;
  truckIcon?: string;
}
```

## Behavior

- Advanced Google Maps component designed for logistics and delivery tracking
- Supports multiple location markers with different types (pickup/dropoff) and custom icons
- Visualizes routes between locations using polylines with customizable styling
- Features animated truck tracking that rotates based on direction of travel
- Handles both standard coordinate arrays and Google Maps encoded polylines
- Mobile-responsive design with simplified marker labels on mobile devices
- Provides loading states and error handling for Google Maps API failures
- Supports separate styling for location paths and truck routes

**Markers**: Support for pickup and dropoff types with custom icons and click handlers
**Paths**: Separate visualization for location connections and truck movement routes
**Truck Animation**: Automatically calculates bearing and rotation for realistic truck orientation
**Mobile Responsive**: Simplified marker labels and optimized display for smaller screens
**Key Guidelines**:

- Use locationMarkers array to define pickup and dropoff points with custom icons
- Provide locationPolyline for route visualization between locations
- Use encodedTruckPolyline for separate truck route tracking from backend services
- Customize path appearance using pathOptions and truckPathOptions
- Handle marker click events via onClick callbacks in locationMarker definitions
- Ensure proper Google Maps API key with sufficient API quota and enabled services

## Component Code

```tsx

import {
  GoogleMap,
  Marker,
  OverlayView,
  Polyline,
  useLoadScript,
} from "@react-google-maps/api";

declare global {
  interface Window {
    google: any;
  }
}

interface LocationMarker {
  position: any;
  title: string;
  type: "pickup" | "dropoff";
  icon: string;
  onClick?: (marker: LocationMarker) => void;
}

interface LatLng {
  lat: number;
  lng: number;
}

interface MapWithPathProps {
  apiKey?: string;
  mapContainerStyle?: any;
  center?: LatLng;
  zoom?: number;
  locationMarkers?: LocationMarker[];
  locationPolyline?: any[];
  encodedTruckPolyline?: string;
  pathOptions?: any;
  truckPathOptions?: any;
  mapOptions?: any;
  showTruck?: boolean;
  truckIcon?: string;
}

// Remove unused imports and code
const defaultMapContainerStyle = { width: "100%", height: "400px" };
const defaultCenter = { lat: -7.2575, lng: 112.7521 }; // Default to Surabaya
const defaultZoom = 13;
const defaultPathOptions = {
  strokeColor: "#DD7B02",
  strokeOpacity: 1,
  strokeWeight: 6,
};
const defaultTruckPathOptions = {
  strokeColor: "#DD7B02",
  strokeOpacity: 1,
  strokeWeight: 6,
  strokeDashArray: "10,5", // Dashed line to differentiate
};

const defaultMapOptions = {
  disableDefaultUI: false,
  zoomControl: false,
  streetViewControl: false,
  mapTypeControl: false,
  cameraControl: false,
  fullscreenControl: false,
};

// Function to calculate bearing between two points
const calculateBearing = (start: any, end: any) => {
  const startLat = start.lat * (Math.PI / 180);
  const startLng = start.lng * (Math.PI / 180);
  const endLat = end.lat * (Math.PI / 180);
  const endLng = end.lng * (Math.PI / 180);

  const dLng = endLng - startLng;
  const y = Math.sin(dLng) * Math.cos(endLat);
  const x =
    Math.cos(startLat) * Math.sin(endLat) -
    Math.sin(startLat) * Math.cos(endLat) * Math.cos(dLng);

  const bearing = Math.atan2(y, x) * (180 / Math.PI);
  const result = (bearing + 360) % 360;
  return result; // Normalize to 0-360 degrees
};

/**
 * Advanced Google Maps component with path visualization, multiple markers, and animated truck tracking.
 * Perfect for logistics, delivery tracking, and route optimization interfaces.
 */
export const MapWithPath = ({
  apiKey = "AIzaSyDw_9D9-4zTechHn1wMEILZqiBv51Q7jHU",
  mapContainerStyle = defaultMapContainerStyle,
  center = defaultCenter,
  zoom = defaultZoom,
  locationMarkers = [],
  locationPolyline = [], // Regular waypoints for connecting locations
  encodedTruckPolyline = "", // Separate truck waypoints from backend
  pathOptions = defaultPathOptions,
  truckPathOptions = defaultTruckPathOptions,
  mapOptions = {},
  showTruck = true,
  truckIcon = "/icons/truck-icon.svg", // Path to truck icon
}: MapWithPathProps) => {
  pathOptions = { ...defaultPathOptions, ...pathOptions };
  truckPathOptions = { ...defaultTruckPathOptions, ...truckPathOptions };
  const { isMobile } = useDevice();
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: apiKey,
    libraries: ["places", "geometry"],
  });

  const truckPolyline = useMemo(() => {
    if (!encodedTruckPolyline || !isLoaded) {
      return [];
    }
    return window.google.maps.geometry.encoding.decodePath(
      encodedTruckPolyline
    );
  }, [encodedTruckPolyline, isLoaded]);

  // Calculate truck position and rotation based on truck waypoints
  const truckMarker = useMemo(() => {
    if (!truckPolyline || truckPolyline.length < 2 || !showTruck || !isLoaded) {
      return null;
    }

    const lastPoint = truckPolyline[truckPolyline.length - 1];
    const secondLastPoint = truckPolyline[truckPolyline.length - 2];

    const startCoords = {
      lat: secondLastPoint.lat(),
      lng: secondLastPoint.lng(),
    };
    const endCoords = { lat: lastPoint.lat(), lng: lastPoint.lng() };

    const bearing = calculateBearing(startCoords, endCoords);

    return {
      position: lastPoint,
      rotation: bearing,
    };
  }, [truckPolyline, showTruck, isLoaded]);

  // Process markers with proper icons when Google Maps is loaded
  const processedMarkers = useMemo(() => {
    if (!isLoaded || !window.google) return locationMarkers;

    // Track pickup and dropoff counters for proper indexing
    let pickupCounter = 0;
    let dropoffCounter = 0;

    // First pass: count pickups and dropoffs
    locationMarkers.forEach((marker) => {
      if (marker.type === "pickup") {
        pickupCounter++;
      } else if (marker.type === "dropoff") {
        dropoffCounter++;
      }
    });

    // Reset counters for second pass
    pickupCounter = 0;
    dropoffCounter = 0;

    return locationMarkers.map((marker) => {
      let title = marker.title;
      const showLabel = pickupCounter > 1 || dropoffCounter > 1;

      if (isMobile) {
        // Group indices by type: pickup or dropoff
        if (marker.type === "pickup") {
          pickupCounter++;
          title = pickupCounter.toString();
        } else if (marker.type === "dropoff") {
          dropoffCounter++;
          title = dropoffCounter.toString();
        } else {
          title = "?";
        }
      } else {
        // Show full title when not mobile
        title = marker.title;
      }

      return {
        ...marker,
        title,
        showLabel,
        icon: {
          url: getAssetPath(marker.icon),

          scaledSize: new window.google.maps.Size(45, 58),
          anchor: new window.google.maps.Point(22.5, 48), // Center bottom of the marker
        },
      };
    });
  }, [locationMarkers, isLoaded, isMobile]);

  // Add styles for marker labels
  useEffect(() => {
    // Add CSS for marker labels
    const style = document.createElement("style");
    if (isMobile) {
      style.textContent = `
      .marker-label {
        position: relative;
        background: #EE4343;
        color: white;
        width: 18px;
        height: 18px;
        border-radius: 4px;
        font-size: text-xs;
        font-weight: bold;
        white-space: nowrap;
        transform: translate(11px, -22px);
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
      }
    `;
    } else {
      style.textContent = `
      .marker-label {
        position: relative;
        background: black;
        color: white;
        padding: 4px 8px;
        border-radius: 4px;
        font-size: text-xs;
        font-weight: bold;
        white-space: nowrap;
        transform: translateY(-38px);
      }
    `;
    }
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, [isMobile]);

  const combinedMapOptions = useMemo(
    () => ({
      ...defaultMapOptions,
      ...mapOptions,
    }),
    [mapOptions]
  );

  if (loadError) {
    return (
      <div className="flex h-96 items-center justify-center rounded-lg border-2 border-dashed border-red-300 bg-red-50">
        <div className="text-center">
          <p className="mb-2 text-red-600"> Error loading Google Maps </p>
          <p className="text-sm text-red-500"> {(loadError as any).message} </p>
        </div>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="flex h-96 items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50">
        <div className="flex items-center space-x-2">
          <div className="h-6 w-6 animate-spin rounded-full border-b-2 border-blue-600"> </div>
          <span className="text-gray-700"> Loading maps... </span>
        </div>
      </div>
    );
  }

  if (!apiKey) {
    return (
      <div className="flex h-96 items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-100">
        <div className="text-center">
          <p className="mb-2 text-gray-600"> Google Maps API Key Required </p>
          <p className="text-sm text-gray-500">
            Please provide a valid Google Maps API key
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={zoom}
        options={combinedMapOptions}
      >
        {/* Render path between waypoints (location connections) */}
        {locationPolyline.length > = 2 && (
          <Polyline path={locationPolyline} options={pathOptions} />
        )}

        {/* Render truck path (separate from location connections) */}
        {truckPolyline.length > = 2 && (
          <Polyline
            path={truckPolyline}
            options={{ ...truckPathOptions, strokeColor: "#FFC217" }}
          />
        )}

        {/* Render custom markers */}
        {processedMarkers.map((marker, index) => (
          <Marker
            key={marker.title}
            position={marker.position}
            icon={marker.icon}
            onClick={() => marker.onClick?.(marker)}
            label={
              marker.showLabel
                ? {
                    text: marker.title,
                    className: "marker-label",
                    color: "white",
                  }
                : undefined
            }
          />
        ))}

        {/* Render truck marker at the end of the path */}
        {truckMarker && (
          <OverlayView
            position={truckMarker.position}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
            getPixelPositionOffset={(width, height) => ({
              x: -(width / 2),
              y: -(height / 2),
            })}
          >
            <div
              style={{
                transform: `rotate(${truckMarker.rotation}deg)`,
                transformOrigin: "center center",
              }}
            >
              <ImageComponent
                src={truckIcon}
                alt="Truck"
                width={30}
                className="translate-x-[5px] object-contain"
              />
            </div>
          </OverlayView>
        )}
      </GoogleMap>
    </div>
  );
};

```

---

# ConfirmationModal

_Source: packages/ui/src/content/docs/components/Modal/ConfirmationModal.mdx_

## Component Information

**Name:** ConfirmationModal

**Description:** A pre-built confirmation modal dialog that provides standardized confirmation patterns with customizable title, description, and action buttons.

## Imports

```javascript
import { useState } from "react";
import React from "react";

import { cn } from "@muatmuat/lib/utils";
import { ConfirmationModal } from "@muatmuat/ui/Modal";

import { ConfirmationModalPreview } from "../../preview/ConfirmationModal.preview";
import { Button } from "../Button";
```

## Overview

**Description:** A pre-built confirmation modal dialog that provides standardized confirmation patterns with customizable title, description, and action buttons.

**Component:** ConfirmationModal

## Usage

<ConfirmationModalPreview />

```jsx
function ConfirmationModalExample() {
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = () => {
    // Handle delete action
    console.log("Item deleted");
    setIsOpen(false);
  };

  return (
    <div>
      <button onClick={() => setIsOpen(true)}> Delete Item </button>
      <ConfirmationModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title={{ text: "Delete Item?" }}
        description={{ text: "This action cannot be undone." }}
        cancel={{ text: "Cancel" }}
        confirm={{ text: "Delete", onClick: handleDelete }}
      />
    </div>
  );
}
```

## API Reference

### Props

| Prop        | Type                            | Default                                          | Description                         |
| ----------- | ------------------------------- | ------------------------------------------------ | ----------------------------------- |
| size        | `"small" \| "big"`              | "small"                                          | Controls the modal size             |
| variant     | `"muattrans" \| "muatparts"`    | "muattrans"                                      | The visual style variant            |
| isOpen      | `boolean`                       | -                                                | Whether the modal is currently open |
| setIsOpen   | `(open: boolean) => void`       | -                                                | Function to control the open state  |
| title       | `ConfirmationModalConfig`       | `{ text: "", className: "" }`                    | Title configuration                 |
| description | `ConfirmationModalConfig`       | `{ text: "", className: "" }`                    | Description configuration           |
| cancel      | `ConfirmationModalButtonConfig` | `{ classname: "", text: "", onClick: () => {} }` | Cancel button configuration         |
| confirm     | `ConfirmationModalButtonConfig` | `{ classname: "", text: "", onClick: () => {} }` | Confirm button configuration        |
| withCancel  | `boolean`                       | true                                             | Whether to show the cancel button   |
| className   | `string`                        | ""                                               | Additional CSS classes              |

## Types

```typescript
export interface ConfirmationModalConfig {
  text: string;
  className?: string;
}

export interface ConfirmationModalButtonConfig {
  classname?: string;
  text: string;
  onClick?: () => void;
}

export interface ConfirmationModalProps {
  size?: "small" | "big";
  variant?: ModalVariants;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  title?: ConfirmationModalConfig;
  withCancel?: boolean;
  description?: ConfirmationModalConfig;
  cancel?: ConfirmationModalButtonConfig;
  confirm?: ConfirmationModalButtonConfig;
  className?: string;
}
```

## Behavior

- Provides standardized confirmation dialog with branded header
- Uses modal types for consistent brand styling (muattrans, muatparts)
- Supports both small and big sizes for different content needs
- Includes customizable title, description, and action buttons
- Handles cancel and confirm actions with proper state management
- Uses Button component with appropriate variants for each modal type
- Centers content with proper spacing and typography
- Supports optional cancel button for forced confirmations

**Variants**: muattrans (transportation theme), muatparts (marketplace theme)
**Sizes**: small (compact confirmations), big (detailed confirmations)
**Use Cases**: Delete confirmations, critical actions, destructive operations, system updates

## Component Code

```tsx
// Added ModalClose for the inline close button
import {
  Modal,
  ModalClose,
  ModalContent,
  // Ensure ModalVariants includes 'bo' but not 'muatparts'
  ModalHeader,
  // Re-added ModalHeader for default variants
  ModalTitle,
  ModalVariants,
} from "@muatmuat/ui/Modal";

export interface ConfirmationModalConfig {
  text: string;
  className?: string;
}

export interface ConfirmationModalButtonConfig {
  classname?: string;
  text: string;
  onClick?: () => void;
}

export interface ConfirmationModalProps {
  size?: "small" | "big"; // Kept size prop with original default
  variant?: ModalVariants; // Includes 'bo' now, kept original default
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  title?: ConfirmationModalConfig;
  withCancel?: boolean;
  description?: ConfirmationModalConfig;
  cancel?: ConfirmationModalButtonConfig;
  confirm?: ConfirmationModalButtonConfig;
  className?: string;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  size = "small", // Restored default
  variant = "muattrans", // Restored default
  isOpen,
  setIsOpen,
  title = { text: "", className: "" }, // Use empty defaults unless 'bo'
  withCancel = true,
  description = { text: "", className: "" },
  cancel = { text: "Cancel", onClick: () => setIsOpen(false) }, // Generic default
  confirm = { text: "Confirm", onClick: () => setIsOpen(false) }, // Generic default
  className = "",
}) => {
  // Use specific defaults only if variant is 'bo'
  const isBoVariant = variant === "bo";
  const finalTitle = isBoVariant ? { text: "Pemberitahuan", ...title } : title;
  const finalCancel = isBoVariant
    ? { text: "Batal", onClick: () => setIsOpen(false), ...cancel }
    : cancel;
  const finalConfirm = isBoVariant
    ? { text: "Simpan", onClick: () => setIsOpen(false), ...confirm }
    : confirm;

  const { text: titleText = "", className: titleClassName = "" } = finalTitle;
  const { text: descriptionText = "", className: descriptionClassName = "" } =
    description;
  const {
    classname: cancelClassname = "",
    text: cancelText = "",
    onClick: onCancel = () => setIsOpen(false),
  } = finalCancel;
  const {
    classname: confirmClassname = "",
    text: confirmText = "",
    onClick: onConfirm = () => setIsOpen(false),
  } = finalConfirm;

  // Default modal sizes
  const modalSizeClasses: Record<string, string> = {
    small: "w-modal-small",
    big: "w-modal-big",
  };

  // Determine modal class: use fixed width for 'bo', otherwise use size prop
  const modalStyles = isBoVariant
    ? "w-[411px] rounded-xl p-0" // Specific 'bo' styling
    : modalSizeClasses[size] || modalSizeClasses.small; // Default sizing

  // Button variants map including 'bo' but excluding 'muatparts'
  const secondaryStyles: Partial<Record<ModalVariants, string>> = {
    "muatparts-plus": "muatparts-primary-secondary",
    muattrans: "muattrans-primary-secondary",
    bo: "muatparts-error-secondary", // Red border button
  };

  const primaryButtonStyles: Partial<Record<ModalVariants, string>> = {
    "muatparts-plus": "muatparts-primary",
    muattrans: "muattrans-primary",
    bo: "muatparts-primary", // Blue button
  };

  const currentSecondaryStyles =
    secondaryStyles[variant] || secondaryStyles.muattrans; // Fallback to original default
  const currentPrimaryStyles =
    primaryButtonStyles[variant] || primaryButtonStyles.muattrans; // Fallback to original default

  return (
    <Modal
      // Disable default corner close button only for 'bo' variant
      withCloseButton={!isBoVariant}
      closeOnOutsideClick={false}
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <ModalContent
        className={cn(modalStyles, className)} // Apply determined class
        type={variant} // Pass the current variant for styling context
      >
        {/* Conditionally render ModalHeader for non-'bo' variants */}
        {!isBoVariant && <ModalHeader size={size} variant={variant} />}

        {/* Adjusted padding/gap only for 'bo' variant */}
        <div
          className={cn(
            "flex flex-col items-center",
            isBoVariant ? "gap-y-6 px-6 py-9" : "gap-y-6 px-6 py-9" // Default padding kept, adjust if needed
          )}
        >
          {titleText &&
            // Conditionally use ModalTitle with inline close for 'bo'
            (isBoVariant ? (
              <ModalTitle
                withClose={true}
                className={cn(
                  "w-full text-center text-sm font-bold leading-[17px] text-neutral-900",
                  titleClassName
                )}
              >
                {titleText}
              </ModalTitle>
            ) : (
              // Original h1 for other variants
              <h1
                className={cn(
                  "text-base font-bold leading-[19.2px] text-neutral-900",
                  titleClassName
                )}
              >
                {titleText}
              </h1>
            ))}
          {descriptionText && (
            <p
              className={cn(
                "text-center text-sm font-medium leading-[15.4px] text-neutral-900", // Keep original style
                isBoVariant && "leading-[17px]", // Override leading for 'bo'
                descriptionClassName
              )}
            >
              {descriptionText}
            </p>
          )}
          {/* Adjusted button gap and container style based on variant */}
          <div
            className={cn(
              "flex items-center gap-x-2",
              isBoVariant && "justify-center" // Center buttons only for 'bo'
            )}
          >
            {withCancel && (
              <Button
                variant={currentSecondaryStyles as any}
                // Apply specific 'bo' styles or default h-8
                className={cn(
                  isBoVariant
                    ? "h-8 w-[112px] rounded-[20px] text-sm font-semibold"
                    : "h-8",
                  cancelClassname
                )}
                onClick={onCancel}
                type="button"
              >
                {cancelText}
              </Button>
            )}
            <Button
              variant={currentPrimaryStyles as any}
              // Apply specific 'bo' styles or default h-8
              className={cn(
                isBoVariant
                  ? "h-8 w-[112px] rounded-[20px] text-sm font-semibold"
                  : "h-8",
                confirmClassname
              )}
              onClick={onConfirm}
              type="button"
            >
              {confirmText}
            </Button>
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
};
```

---

# ConfirmationModalResponsive

_Source: packages/ui/src/content/docs/components/Modal/ConfirmationModalResponsive.mdx_

## Component Information

**Name:** ConfirmationModalResponsive

**Description:** A mobile-optimized confirmation modal designed specifically for responsive layouts and mobile devices with touch-friendly interactions.

## Imports

```javascript
import { useState } from "react";
import * as React from "react";

import { cn } from "@muatmuat/lib/utils";
import { ConfirmationModalResponsive } from "@muatmuat/ui/Modal";

import { ConfirmationModalResponsivePreview } from "../../preview/ConfirmationModalResponsive.preview";
import { Button } from "../Button";
import { Modal, ModalContent } from "./Modal";
```

## Overview

**Description:** A mobile-optimized confirmation modal designed specifically for responsive layouts and mobile devices with touch-friendly interactions.

**Component:** ConfirmationModalResponsive

## Usage

<ConfirmationModalResponsivePreview />

```jsx
function ConfirmationModalResponsiveExample() {
  const [isOpen, setIsOpen] = useState(false);

  const handleConfirm = () => {
    // Handle confirm action
    console.log("Action confirmed");
    setIsOpen(false);
  };

  return (
    <div>
      <button onClick={() => setIsOpen(true)}> Open Confirmation </button>
      <ConfirmationModalResponsive
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title={{ text: "Confirm Action?" }}
        description={{ text: "Are you sure you want to proceed?" }}
        cancel={{ text: "Cancel" }}
        confirm={{ text: "Confirm", onClick: handleConfirm }}
      />
    </div>
  );
}
```

## API Reference

### Props

| Prop        | Type                                                                              | Default                                          | Description                         |
| ----------- | --------------------------------------------------------------------------------- | ------------------------------------------------ | ----------------------------------- |
| isOpen      | `boolean`                                                                         | -                                                | Whether the modal is currently open |
| setIsOpen   | `(open: boolean) => void`                                                         | -                                                | Function to control the open state  |
| title       | `{ text?: string, className?: string }`                                           | `{ text: "", className: "" }`                    | Title configuration                 |
| description | `{ text?: string, className?: string }`                                           | `{ text: "", className: "" }`                    | Description configuration           |
| cancel      | `{ classname?: string, text?: string, onClick?: () => void }`                     | `{ classname: "", text: "", onClick: () => {} }` | Cancel button configuration         |
| confirm     | `{ classname?: string, text?: string, onClick?: () => void }`                     | `{ classname: "", text: "", onClick: () => {} }` | Confirm button configuration        |
| className   | `string`                                                                          | -                                                | Additional CSS classes              |
| t           | `(key: string, options?: Record <string, any> , defaultValue?: string) => string` | tMockFn                                          | Translation function                |

## Types

```typescript
export interface ConfirmationModalResponsiveProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  title?: {
    text?: string;
    className?: string;
  };
  description?: {
    text?: string;
    className?: string;
  };
  cancel?: {
    classname?: string;
    text?: string;
    onClick?: () => void;
  };
  confirm?: {
    classname?: string;
    text?: string;
    onClick?: () => void;
  };
}
```

## Behavior

- Mobile-optimized modal with fixed width (296px) for consistent mobile layout
- Touch-friendly button sizes (h-7 w-[112px]) optimized for mobile interactions
- Responsive padding (px-4 py-6) designed for mobile spacing
- Vertical layout with centered content optimized for mobile screens
- Uses MuatParts button variants (muatparts-primary-secondary, muatparts-primary)
- Supports translation function for internationalization
- Compact design with small text sizes for space-constrained mobile environments
- Proper focus management and keyboard navigation for mobile accessibility

**Mobile Features**: Fixed width layout, touch-friendly targets, compact button design, responsive spacing
**Styling**: MuatParts branding, centered content layout, mobile-optimized typography
**Use Cases**: Mobile confirmations, responsive dialogs, touch-first applications, space-constrained environments

## Component Code

```tsx
export interface ConfirmationModalResponsiveProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  title?: {
    text?: string;
    className?: string;
  };
  description?: {
    text?: string;
    className?: string;
  };
  cancel?: {
    classname?: string;
    text?: string;
    onClick?: () => void;
  };
  confirm?: {
    classname?: string;
    text?: string;
    onClick?: () => void;
  };
}

export const ConfirmationModalResponsive: React.FC<
  ConfirmationModalResponsiveProps
> = ({
  isOpen,
  setIsOpen,
  title = { text: "", className: "" },
  description = { text: "", className: "" },
  cancel = { classname: "", text: "", onClick: () => setIsOpen(false) }, // Added default for cancel
  confirm = { classname: "", text: "", onClick: () => setIsOpen(false) }, // Added default for confirm
}) => {
  const { text: titleText = "", className: titleClassName = "" } = title;
  const { text: descriptionText = "", className: descriptionClassName = "" } =
    description;
  const {
    classname: cancelClassname = "",
    text: cancelText = "",
    onClick: onCancel = () => setIsOpen(false),
  } = cancel;
  const {
    classname: confirmClassname = "",
    text: confirmText = "",
    onClick: onConfirm = () => setIsOpen(false),
  } = confirm;
  return (
    <Modal open={isOpen} onOpenChange={setIsOpen} closeOnOutsideClick>
      <ModalContent>
        <div className="w-[296px] px-4 py-6">
          <div className="flex flex-col items-center justify-center gap-y-5">
            {titleText ? (
              <h1
                className={cn(
                  "text-base font-bold leading-[1.1] text-neutral-900",
                  titleClassName
                )}
              >
                {titleText}
              </h1>
            ) : null}
            {descriptionText ? (
              <p
                className={cn(
                  "text-center text-sm font-medium leading-[1.1] text-neutral-900",
                  descriptionClassName
                )}
              >
                {descriptionText}
              </p>
            ) : null}

            <div className="flex items-center gap-x-2">
              <Button
                variant="muatparts-primary-secondary"
                // 25. 18 - Web - LB - 0275
                // 25. 18 - Web - LB - 0282
                className={cn(
                  "h-7 w-[112px] text-xs leading-[1.1]",
                  cancelClassname
                )}
                onClick={onCancel}
                type="button"
              >
                {cancelText}
              </Button>
              <Button
                variant="muatparts-primary"
                // 25. 18 - Web - LB - 0275
                // 25. 18 - Web - LB - 0282
                className={cn(
                  "h-7 w-[112px] text-xs leading-[1.1]",
                  confirmClassname
                )}
                onClick={onConfirm}
                type="button"
              >
                {confirmText}
              </Button>
            </div>
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
};
```

---

# Modal

_Source: packages/ui/src/content/docs/components/Modal/Modal.mdx_

## Component Information

**Name:** Modal

**Description:** A flexible modal dialog component built on Radix UI for displaying content overlays with various customization options.

## Imports

```javascript
import { Button } from "@muatmuat/ui/Button";
import { useState } from "react";
import { Modal, ModalContent, ModalTitle, ModalTrigger } from "@muatmuat/ui/Modal";

import { useState } from "react";

import { createContext, useContext, useRef, useState } from "react";

import { cn } from "@muatmuat/lib/utils";
import * as Dialog from "@radix-ui/react-dialog";

import { IconComponent } from "../IconComponent";
import { ImageComponent } from "../ImageComponent";

```

## Overview

**Description:** A flexible modal dialog component built on Radix UI for displaying content overlays with various customization options.

**Component:** Modal

import {
BasicModalExample,
BrandedModalExample,
ControlledModalExample,
ModalPreview,
MuatpartsPlusExample,
SimpleModalExample,
} from "@muatmuat/ui/preview/Modal.preview";

## Modal System Implementation

**Architecture**: Compound component pattern with context-managed state
**Components**: `Modal` (root), `ModalTrigger` (wrapper), `ModalContent` (container), `ModalHeader` (decorative), `ModalTitle` (semantic)

### Component API Reference

| Component      | Purpose                                                                | Key Props                                                                                                                     | Constraints                                                                                             |
| -------------- | ---------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| `Modal`        | Root wrapper that manages visibility state and context                 | `open`, `onOpenChange`, `closeOnOutsideClick`                                                                                 | Use `open`/`onOpenChange` for controlled mode; omit both for uncontrolled behaviour                     |
| `ModalTrigger` | Wraps the interactive element that toggles the modal                   | `asChild`                                                                                                                     | Must be the direct child of `Modal`; the child element becomes the trigger                              |
| `ModalContent` | Structural container for header, body, and footer sections             | `className`, `type` (e.g., `"muatmuat"`, `"muatparts"`, `"muatparts-plus"`, `"muattrans"`, `"lightbox"`, `"primary"`, `"bo"`) | Automatically renders a close button—never add custom close triggers inside                             |
| `ModalHeader`  | Optional decorative header when the design includes a background image | —                                                                                                                             | Self-closing; only render when the design shows a branded header image                                  |
| `ModalTitle`   | Semantic heading renderer for modal titles                             | `className`                                                                                                                   | Always place immediately after `ModalHeader` (when present) or as the first child inside `ModalContent` |

### Implementation Strategy

Follow this decision tree when implementing a modal from a Figma design:

1. **Standard Match**: If the design matches the default modal behavior (e.g., a close button in the top-right corner), use the component as-is. Set `withCloseButton={true}` (or omit, as it's the default).

2. **Near Match (Adaptation Required)**: If the design is structurally a modal but has minor visual differences, **do not fall back to primitives**. Instead, adapt the component with a non-breaking change.

   > **Example Scenario**: The Figma design requires an inline close button next to the title, not in the corner.

   > - **Step A: Disable Default Behavior**: Set `withCloseButton={false}` on the root `<Modal>` component to remove the corner 'X' button.
   > - **Step B: Propose an Adaptation**: State the need for an adaptation: "The design requires an inline close button. I will add a `withClose: boolean` prop to the `ModalTitle` component to support this layout."
   > - **Step C: Generate Updated Code**: Provide the full, updated code for the `Modal.jsx` file, incorporating the new prop and its conditional logic within `ModalTitle`.
   > - **Step D: Generate Final Usage Example**: Use the newly adapted component to perfectly match the design.

**Implementation Details**:

- **Header with background-image**: Use `<ModalHeader />` and apply direct width classes to `<ModalContent>`.
- **Header without background**: Omit `<ModalHeader />`.
- **Close Button Logic**: The default corner 'X' is controlled by `withCloseButton` on `<Modal>`. The inline 'X' is controlled by `withClose` on `<ModalTitle>`. **You must disable one to use the other.**

#### Example: Standard Modal

```jsx
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalTrigger,
} from "@muatmuat/ui/Modal";

const StandardModal = () => (
  <Modal>
    <ModalTrigger asChild>
      <Button> Open Standard Modal </Button>
    </ModalTrigger>
    <ModalContent className="w-[458px]">
      <ModalHeader />
      <ModalTitle className="px-4 pt-6"> Standard Modal Title </ModalTitle>
      <div className="p-6"> Modal content goes here... </div>
    </ModalContent>
  </Modal>
);
```

#### Example: Adapted Modal for Inline Close Button

```jsx

const WarningModalExample = ({...}) => {
  ...
  return (
    <Modal open={isOpen} onOpenChange={setIsOpen} withCloseButton={false}>
      <ModalContent
        type="muatmuat"
        className="w-[411px] rounded-xl bg-white p-0 shadow-[0px_4px_11px_rgba(65,65,65,0.25)]"
      >
        <div className="flex flex-col items-center justify-center gap-6 px-6 py-9">
          <ModalTitle withClose> Warning </ModalTitle>
          ...
        </div>
      </ModalContent>
    </Modal>
  );
};
```

## Usage

<ModalPreview />

### Basic Example

<BasicModalExample />

```jsx
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalTrigger,
} from "@muatmuat/ui/Modal";

const ExampleModal = () => (
  <Modal>
    <ModalTrigger asChild>
      <Button> Open Modal </Button>
    </ModalTrigger>
    <ModalContent className="w-[458px] px-4 py-6">
      <ModalHeader />
      <ModalTitle className="text-center font-bold"> Modal Title </ModalTitle>
      <div className="p-6"> Modal content goes here... </div>
    </ModalContent>
  </Modal>
);
```

### Controlled Mode Example

<ControlledModalExample />

```jsx
import {
  Modal,
  ModalContent,
  ModalTitle,
  ModalTrigger,
} from "@muatmuat/ui/Modal";

function ControlledModalExample() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Modal open={isOpen} onOpenChange={setIsOpen}>
      <ModalTrigger asChild>
        <Button> Open Modal </Button>
      </ModalTrigger>
      <ModalContent className="w-[458px] px-4 py-6">
        <ModalTitle className="text-center font-bold"> Modal Title </ModalTitle>
        <div className="p-6">
          <p> Modal content goes here... </p>
        </div>
      </ModalContent>
    </Modal>
  );
}
```

### Modal with Branded Header

<BrandedModalExample />

```jsx
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalTrigger,
} from "@muatmuat/ui/Modal";

const BrandedModalExample = () => (
  <Modal>
    <ModalTrigger asChild>
      <Button> Open Branded Modal </Button>
    </ModalTrigger>
    <ModalContent type="muattrans" className="w-[500px]">
      <ModalHeader />
      <ModalTitle className="text-center font-bold">
        Transportation Modal
      </ModalTitle>
      <div className="px-6 pb-6">
        <p> This modal uses the muattrans branded header. </p>
      </div>
    </ModalContent>
  </Modal>
);
```

### Modal Without Header

<SimpleModalExample />

```jsx
import {
  Modal,
  ModalContent,
  ModalTitle,
  ModalTrigger,
} from "@muatmuat/ui/Modal";

const SimpleModalExample = () => (
  <Modal>
    <ModalTrigger asChild>
      <Button> Open Simple Modal </Button>
    </ModalTrigger>
    <ModalContent type="primary" className="w-[400px] p-6">
      <ModalTitle className="mb-4"> Simple Modal </ModalTitle>
      <p> This modal has no branded header and uses the primary theme. </p>
    </ModalContent>
  </Modal>
);
```

### Muatparts Plus Theme

<MuatpartsPlusExample />

```jsx
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalTrigger,
} from "@muatmuat/ui/Modal";

const MuatpartsPlusExample = () => (
  <Modal>
    <ModalTrigger asChild>
      <Button> Open Premium Modal </Button>
    </ModalTrigger>
    <ModalContent type="muatparts-plus" className="w-[500px]">
      <ModalHeader variant="muatparts-plus" />
      <ModalTitle className="text-center font-bold">
        Premium Features
      </ModalTitle>
      <div className="px-6 pb-6">
        <p> This modal showcases the muatparts-plus premium theme. </p>
      </div>
    </ModalContent>
  </Modal>
);
```

## API Reference

### Modal Props

| Prop                | Type                      | Default   | Description                               |
| ------------------- | ------------------------- | --------- | ----------------------------------------- |
| children            | `React.ReactNode`         | -         | Modal content and structure               |
| open                | `boolean`                 | undefined | Controlled open state                     |
| onOpenChange        | `(open: boolean) => void` | undefined | Callback when open state changes          |
| withCloseButton     | `boolean`                 | true      | Whether to show the close button          |
| closeOnOutsideClick | `boolean`                 | false     | Whether clicking outside closes the modal |

### ModalContent Props

| Prop       | Type                                                                                              | Default    | Description                                    |
| ---------- | ------------------------------------------------------------------------------------------------- | ---------- | ---------------------------------------------- |
| type       | `"bo" \| "muatmuat" \| "muatparts" \| "muatparts-plus" \| "muattrans" \| "lightbox" \| "primary"` | "muatmuat" | Modal theme and styling variant                |
| children   | `React.ReactNode`                                                                                 | -          | Content inside the modal                       |
| className  | `string`                                                                                          | -          | Additional CSS classes                         |
| appearance | `{ backgroundClassName?: string; closeButtonClassname?: string }`                                 | -          | Custom styling for background and close button |

### ModalTitle Props

| Prop      | Type              | Default   | Description                            |
| --------- | ----------------- | --------- | -------------------------------------- |
| className | `string`          | -         | Additional CSS classes                 |
| children  | `React.ReactNode` | -         | Title content                          |
| withClose | `boolean`         | undefined | Whether to include inline close button |

### ModalHeader Props

| Prop      | Type                                      | Default     | Description                             |
| --------- | ----------------------------------------- | ----------- | --------------------------------------- |
| className | `string`                                  | -           | Additional CSS classes                  |
| variant   | `"muattrans" \| "muatparts-plus" \| "bo"` | "muattrans" | Header visual variant                   |
| size      | `"small" \| "big"`                        | -           | Header size (not currently implemented) |

### ModalFooter Props

| Prop      | Type              | Default | Description                        |
| --------- | ----------------- | ------- | ---------------------------------- |
| className | `string`          | -       | Additional CSS classes             |
| children  | `React.ReactNode` | -       | Footer content (typically buttons) |

### ModalTrigger Props

| Prop      | Type              | Default | Description                        |
| --------- | ----------------- | ------- | ---------------------------------- |
| className | `string`          | -       | Additional CSS classes             |
| children  | `React.ReactNode` | -       | Trigger element                    |
| asChild   | `boolean`         | true    | Whether to render as child element |

### ModalClose Props

| Prop     | Type              | Default | Description                        |
| -------- | ----------------- | ------- | ---------------------------------- |
| asChild  | `boolean`         | true    | Whether to render as child element |
| children | `React.ReactNode` | -       | Close trigger element              |

## Types

```typescript
export interface ModalProps {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  withCloseButton?: boolean;
  closeOnOutsideClick?: boolean;
  [key: string]: any;
}

export interface ModalContentProps {
  type?:
    | "bo"
    | "muatmuat"
    | "muatparts"
    | "muatparts-plus"
    | "muattrans"
    | "lightbox"
    | "primary";
  children: React.ReactNode;
  className?: string;
  appearance?: {
    backgroundClassName?: string;
    closeButtonClassname?: string;
  };
  [key: string]: any;
}

export interface ModalTitleProps {
  className?: string;
  children: React.ReactNode;
  withClose?: boolean;
}

export interface ModalTriggerProps {
  className?: string;
  children: React.ReactNode;
  asChild?: boolean;
}

export interface ModalHeaderProps {
  className?: string;
  variant?: ModalVariants;
  size?: "small" | "big";
}

export interface ModalFooterProps {
  className?: string;
  children: React.ReactNode;
}

export interface ModalCloseProps {
  asChild?: boolean;
  children: React.ReactNode;
}

export type ModalVariants = "muattrans" | "muatparts-plus" | "bo";
```

## Architecture

The Modal system uses a compound component pattern built on Radix UI Dialog primitives:

### Core Architecture

- **Compound Component Pattern**: Multiple components work together as a single cohesive unit
- **Context-Managed State**: `Modal` creates a React context that manages visibility and configuration
- **Radix UI Foundation**: Built on `@radix-ui/react-dialog` for accessibility and focus management
- **Theme System**: Supports multiple visual variants through the `type` prop

### Component Responsibilities

| Component      | Responsibility                                           |
| -------------- | -------------------------------------------------------- |
| `Modal`        | State management, context provider, root configuration   |
| `ModalTrigger` | Wraps trigger elements, handles asChild rendering        |
| `ModalContent` | Portal rendering, overlay management, close button logic |
| `ModalHeader`  | Decorative branded header with background images         |
| `ModalTitle`   | Semantic heading with optional inline close button       |

### State Management

The modal supports both controlled and uncontrolled modes:

- **Uncontrolled**: Modal manages its own open state internally
- **Controlled**: Parent component controls open state via `open`/`onOpenChange` props

### Key Features

- **Focus Management**: Automatic focus trapping and restoration
- **Keyboard Navigation**: Escape key handling, tab navigation
- **Portal Rendering**: Modals render outside the normal DOM hierarchy
- **Stacking Support**: Multiple modals can be stacked with proper z-index management
- **Accessibility**: Full ARIA support and screen reader compatibility
- **Theme Variants**: Multiple visual styles for different product contexts

## Behavior

- Provides modal overlay with proper focus management and accessibility
- Supports both controlled and uncontrolled open state management
- Includes escape key handling and focus trapping
- Renders modal content with proper z-index stacking
- Handles multiple modal stacking with proper escape key behavior
- Responsive design that adapts to different screen sizes
- Built on Radix UI Dialog primitives for consistent accessibility

**Variants**: bo (back office), muatmuat (primary brand), muatparts (marketplace), muatparts-plus (premium), muattrans (transportation), lightbox (media), primary (generic)
**Header Sizes**: small, big (not currently implemented in ModalHeader)
**Interactions**: Keyboard navigation, focus management, click outside handling

## Component Code

```tsx
interface ModalContextValue {
  open: boolean;
  withCloseButton?: boolean;
  closeOnOutsideClick?: boolean;
  [key: string]: any;
}

const ModalContext = createContext<ModalContextValue | null>(null);

export const useModal = (): ModalContextValue => {
  const context = useContext(ModalContext);
  if (context === null) {
    throw new Error("useModal must be used within a Modal");
  }
  return context;
};

export interface ModalProps {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  withCloseButton?: boolean;
  closeOnOutsideClick?: boolean;
  [key: string]: any;
}

export const Modal: React.FC<ModalProps> = ({
  children,
  open: controlledOpen,
  onOpenChange,
  withCloseButton = true,
  closeOnOutsideClick = false,
  ...props
}) => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : uncontrolledOpen;

  const handleOpenChange = (newOpenState: boolean) => {
    if (!isControlled) {
      setUncontrolledOpen(newOpenState);
    }
    onOpenChange?.(newOpenState);
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={handleOpenChange}>
      <ModalContext.Provider
        value={{ open: isOpen, withCloseButton, closeOnOutsideClick, ...props }}
      >
        {children}
      </ModalContext.Provider>
    </Dialog.Root>
  );
};

export interface ModalTitleProps {
  className?: string;
  children: React.ReactNode;
  withClose?: boolean; // New prop added
}

export const ModalTitle: React.FC<ModalTitleProps> = ({
  className,
  children,
  withClose,
}) => {
  if (withClose) {
    return (
      <div className="flex w-full items-start justify-center">
        <Dialog.Title
          className={cn(
            "flex-grow text-center text-sm font-bold text-[#1B1B1B]",
            className
          )}
        >
          {children}
        </Dialog.Title>
        <ModalClose asChild>
          <button
            aria-label="Close"
            className="flex-shrink-0 focus:outline-none"
          >
            <IconComponent
              src="/icons/close12.svg"
              className="size-2.5 text-[#176CF7]"
            />
          </button>
        </ModalClose>
      </div>
    );
  }

  return (
    <Dialog.Title
      className={cn(
        "text-center text-base font-bold text-neutral-900",
        className
      )}
    >
      {children}
    </Dialog.Title>
  );
};

export interface ModalTriggerProps {
  className?: string;
  children: React.ReactNode;
  asChild?: boolean;
}

export const ModalTrigger: React.FC<ModalTriggerProps> = ({
  className,
  children,
  asChild = true,
}) => {
  return (
    <Dialog.Trigger asChild={asChild} className={className}>
      {children}
    </Dialog.Trigger>
  );
};

export interface ModalContentProps {
  type?:
    | "bo"
    | "muatmuat"
    | "muatparts"
    | "muatparts-plus"
    | "muattrans"
    | "lightbox"
    | "primary";
  children: React.ReactNode;
  className?: string;
  appearance?: {
    backgroundClassName?: string;
    closeButtonClassname?: string;
  };
  [key: string]: any;
}

export const ModalContent: React.FC<ModalContentProps> = ({
  type = "muatmuat",
  children,
  className,
  appearance,
  ...props
}) => {
  const { withCloseButton = true, closeOnOutsideClick = false } = useModal();
  const dialogRef = useRef<HTMLDivElement>(null);

  const closeIconStyles: Record<string, string> = {
    bo: "size-3 text-primary-700",
    muatmuat: "size-6 md:size-5 text-primary-700",
    muatparts: "size-6 md:size-5 text-muat-parts-non-800",
    "muatparts-plus": "size-6 md:size-5 text-muat-parts-member-900",
    muattrans: "size-6 md:size-5 text-muat-trans-secondary-900",
    lightbox: "size-6 md:size-5 text-primary-700",
    primary: "size-6 md:size-5 text-blue-500",
  };

  return (
    <Dialog.Portal>
      <Dialog.Overlay
        data-stack-item="true"
        className={cn(
          "fixed inset-0 z-[50] bg-black/25",
          "data-[state=open]:animate-overlay-show",
          "data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
          appearance?.backgroundClassName
        )}
      >
        {type === "lightbox" && (
          <Dialog.Close className="absolute left-4 top-[55px] z-[9998] block text-white md:hidden">
            <IconComponent
              className="text-white"
              src="/icons/close20.svg"
              width={24}
              height={24}
            />
          </Dialog.Close>
        )}
      </Dialog.Overlay>

      <Dialog.Content
        ref={dialogRef}
        data-stack-content="true"
        onEscapeKeyDown={(e) => {
          const stackItems = Array.from(
            document.querySelectorAll('[data-stack-item="true"]')
          );
          const isTopmost =
            dialogRef.current?.parentElement?.parentElement ===
            stackItems[stackItems.length - 1];
          if (!isTopmost) {
            e.preventDefault();
          }
        }}
        onInteractOutside={(e) => {
          if (!closeOnOutsideClick) {
            e.preventDefault();
          }
        }}
        {...props}
        className={cn(
          "fixed left-1/2 top-1/2 z-[51] -translate-x-1/2 -translate-y-1/2",
          "rounded-xl bg-neutral-50 shadow-lg",
          "data-[state=open]:animate-content-show",
          "data-[state=closed]:animate-content-hide",
          type === "lightbox" && "bg-transparent shadow-none",
          className
        )}
      >
        {children}
        {withCloseButton && (
          <Dialog.Close>
            <IconComponent
              className={cn(
                "absolute right-2 top-2 z-50 flex cursor-pointer items-center justify-center rounded-full bg-neutral-50",
                closeIconStyles[type] || closeIconStyles.muattrans,
                type === "bo" && "right-4 top-3",
                appearance?.closeButtonClassname
              )}
              src="/icons/close20.svg"
            />
          </Dialog.Close>
        )}
      </Dialog.Content>
    </Dialog.Portal>
  );
};

const headerBackgroundVariants = {
  muattrans: "bg-muat-trans-primary-400",
  "muatparts-plus": "bg-muat-parts-member-900",
} as const;

const headerkiriSrc = {
  muattrans: "/img/header-modal/header-kiri.svg",
  "muatparts-plus": "/img/header-modal/header-kiri-muatparts-plus.svg",
} as const;

const headerHeaderSrc = {
  muattrans: "/img/header-modal/muatmuat-brown.svg",
  "muatparts-plus": "/img/header-modal/muatparts-plus.svg",
} as const;

const headerKananSrc = {
  muattrans: "/img/header-modal/header-kanan.svg",
  "muatparts-plus": "/img/header-modal/header-kanan-muatparts-plus.svg",
} as const;

export type ModalVariants = "muattrans" | "muatparts-plus" | "bo";

export interface ModalHeaderProps {
  className?: string;
  variant?: ModalVariants;
  size?: "small" | "big";
}

export const ModalHeader: React.FC<ModalHeaderProps> = ({
  className,
  variant = "muattrans",
}) => {
  return (
    <div
      className={cn(
        "relative flex h-[70px] justify-between overflow-hidden rounded-t-xl",
        headerBackgroundVariants[variant],
        className
      )}
    >
      <div>
        <ImageComponent
          alt="svg header modal kiri"
          src={headerkiriSrc[variant]}
          width={70}
          height={70}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="my-auto">
        <ImageComponent
          alt="logo muatmuat header coklat"
          src={headerHeaderSrc[variant]}
          width={120}
          height={40}
          className="h-full w-full"
        />
      </div>
      <div>
        <ImageComponent
          alt="svg header modal kanan "
          src={headerKananSrc[variant]}
          width={70}
          height={70}
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
};

export interface ModalFooterProps {
  className?: string;
  children: React.ReactNode;
}

export const ModalFooter: React.FC<ModalFooterProps> = ({
  className,
  children,
}) => {
  return (
    <div
      className={cn(
        "flex items-center justify-center gap-3 rounded-b-xl bg-white px-6 pb-9 pt-6",
        className
      )}
    >
      {children}
    </div>
  );
};

export interface ModalCloseProps {
  asChild?: boolean;
  children: React.ReactNode;
}

export const ModalClose: React.FC<ModalCloseProps> = ({
  asChild = true,
  children,
}) => {
  return <Dialog.Close asChild={asChild}> {children} </Dialog.Close>;
};
```

---

# NotificationCount

_Source: packages/ui/src/content/docs/components/NotificationDot/NotificationCount.mdx_

## Component Information

**Name:** NotificationCount

**Description:** A notification count component for displaying numeric badges with various sizes, colors, and styles

## Imports

```javascript
import { useState } from "react";
import React from "react";

import { cn } from "@muatmuat/lib/utils";
import { NotificationCount } from "@muatmuat/ui/NotificationDot";
import { cva } from "class-variance-authority";

import { NotificationCountPreview } from "../../preview/NotificationCount.preview";
```

## Overview

**Description:** A notification count component for displaying numeric badges with various sizes, colors, and styles

**Component:** NotificationCount

## Usage

<NotificationCountPreview />

```jsx
export function NotificationCountExample() {
  const [count, setCount] = useState(5);
  const [animated, setAnimated] = useState(false);
  const [variant, setVariant] = useState("default");
  const [backgroundColor, setBackgroundColor] = useState("red");

  return (
    <div className="space-y-6">
      {/* Real-world examples */}
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-100">
              <span className="text-primary-700"> 📧 </span>
            </div>
            <NotificationCount
              count={12}
              position="absolute"
              positionClasses="top-0 right-0"
              backgroundColor="red"
              animated={animated}
              variant={variant}
            />
          </div>
          <span> Email (12 new messages) </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-warning-100">
              <span className="text-warning-700"> 🔔 </span>
            </div>
            <NotificationCount
              count={3}
              position="absolute"
              positionClasses="top-0 right-0"
              backgroundColor="warning"
              animated={animated}
              variant={variant}
            />
          </div>
          <span> Notifications (3 new) </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-error-100">
              <span className="text-error-700"> ⚠️ </span>
            </div>
            <NotificationCount
              count={99}
              position="absolute"
              positionClasses="top-0 right-0"
              backgroundColor="error"
              maxCount={99}
              animated={animated}
              variant={variant}
            />
          </div>
          <span> Errors (99+ issues) </span>
        </div>
      </div>

      {/* Count values demonstration */}
      <div className="space-y-2">
        <h4 className="font-medium"> Count Values (maxCount: 99) </h4>
        <div className="flex flex-wrap items-center gap-4">
          {[1, 5, 9, 10, 99, 100, 150].map((value) => (
            <div key={value} className="text-center">
              <NotificationCount
                count={value}
                backgroundColor={backgroundColor}
                animated={animated}
                variant={variant}
                maxCount={99}
              />
              <p className="mt-2 text-xs text-neutral-600"> {value} </p>
            </div>
          ))}
        </div>
      </div>

      {/* Size variants */}
      <div className="space-y-2">
        <h4 className="font-medium"> Size Variants </h4>
        <div className="flex flex-wrap items-center gap-6">
          {["xs", "sm", "md", "lg", "xl"].map((size) => (
            <div key={size} className="text-center">
              <NotificationCount
                count={5}
                size={size}
                backgroundColor={backgroundColor}
                animated={animated}
                variant={variant}
              />
              <p className="mt-2 text-xs text-neutral-600">
                {size.toUpperCase()}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="rounded-lg border bg-white p-4">
        <h4 className="mb-2 font-medium"> Controls </h4>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <label className="text-sm"> Count: </label>
            <input
              type="number"
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
              className="w-16 rounded border px-2 py-1 text-sm"
              min="0"
              max="999"
            />
          </div>

          <button
            onClick={() => setAnimated(!animated)}
            className={`rounded px-3 py-1 text-sm ${
              animated ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
            }`}
          >
            Animation: {animated ? "ON" : "OFF"}
          </button>

          <div className="flex items-center gap-2">
            <label className="text-sm"> Variant: </label>
            <select
              value={variant}
              onChange={(e) => setVariant(e.target.value)}
              className="rounded border px-2 py-1 text-sm"
            >
              <option value="default"> Default </option>
              <option value="bordered"> Bordered </option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-sm"> Background: </label>
            <select
              value={backgroundColor}
              onChange={(e) => setBackgroundColor(e.target.value)}
              className="rounded border px-2 py-1 text-sm"
            >
              <option value="red"> Red </option>
              <option value="green"> Green </option>
              <option value="blue"> Blue </option>
              <option value="yellow"> Yellow </option>
              <option value="orange"> Orange </option>
              <option value="purple"> Purple </option>
              <option value="gray"> Gray </option>
              <option value="primary"> Primary </option>
              <option value="success"> Success </option>
              <option value="warning"> Warning </option>
              <option value="error"> Error </option>
            </select>
          </div>
        </div>
      </div>

      {/* Current display */}
      <div className="rounded-lg border bg-white p-4">
        <h4 className="mb-2 font-medium"> Current Badge </h4>
        <div className="flex items-center gap-4">
          <NotificationCount
            count={count}
            animated={animated}
            variant={variant}
            backgroundColor={backgroundColor}
          />
          <span className="text-sm text-neutral-600">
            Showing: {count > 99 ? "99+" : count}
          </span>
        </div>
      </div>
    </div>
  );
}
```

## API Reference

### Props

| Prop            | Type                                                                                                                         | Default          | Description                           |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------- | ---------------- | ------------------------------------- |
| count           | `number`                                                                                                                     | 0                | The count to display                  |
| animated        | `boolean`                                                                                                                    | false            | Whether to show the pulsing animation |
| size            | `"xs" \| "sm" \| "md" \| "lg" \| "xl"`                                                                                       | "sm"             | Size of the counter                   |
| color           | `"white" \| "black" \| "gray" \| "red" \| "blue" \| "green" \| "yellow" \| "primary"`                                        | "white"          | Text color                            |
| backgroundColor | `"red" \| "green" \| "blue" \| "yellow" \| "orange" \| "purple" \| "gray" \| "primary" \| "success" \| "warning" \| "error"` | "red"            | Background color                      |
| variant         | `"default" \| "bordered"`                                                                                                    | "default"        | Style variant                         |
| borderColor     | `string`                                                                                                                     | "border-red-900" | Border color for bordered variant     |
| className       | `string`                                                                                                                     | -                | Additional CSS classes                |
| position        | `"absolute" \| "relative" \| "fixed"`                                                                                        | "relative"       | Position type                         |
| positionClasses | `string`                                                                                                                     | ""               | Position classes like "top-0 right-0" |
| maxCount        | `number`                                                                                                                     | 99               | Maximum count to display (e.g., 99+)  |

### Types

```typescript
export interface NotificationCountProps {
  count?: number;
  animated?: boolean;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  color?:
    | "white"
    | "black"
    | "gray"
    | "red"
    | "blue"
    | "green"
    | "yellow"
    | "primary";
  backgroundColor?:
    | "red"
    | "green"
    | "blue"
    | "yellow"
    | "orange"
    | "purple"
    | "gray"
    | "primary"
    | "success"
    | "warning"
    | "error";
  variant?: "default" | "bordered";
  borderColor?: string;
  className?: string;
  position?: "absolute" | "relative" | "fixed";
  positionClasses?: string;
  maxCount?: number;
}
```

## Behavior

- Displays numeric badges with count values, automatically formatting large numbers with "+"
- Only renders when count is 1 or greater (returns null for 0 or negative values)
- Supports two variants: default (circular) and bordered (rectangular with border)
- Configurable maximum count display (e.g., 99+ for values exceeding the limit)
- Optional pulsing animation for active/live notifications
- Extensive color options for both text and background colors
- Flexible positioning system for overlaying on other elements
- Built with class-variance-authority for consistent styling

**Sizes**: xs (16px), sm (20px), md (24px), lg (28px), xl (32px)
**Variants**: default (circular), bordered (rectangular with padding and border)
**Key Guidelines**:

- Use maxCount to prevent overflow for very large numbers (commonly 99 or 999)
- Position absolutely over icons, buttons, or navigation items
- Leverage semantic background colors (success, warning, error) for meaningful visual communication
- Use bordered variant when text needs more space or when rectangular design is preferred
- Consider animation for real-time notifications, static for historical counts

## Component Code

```tsx
export interface NotificationCountProps {
  /** The count to display */
  count?: number;
  /** Whether to show the pulsing animation */
  animated?: boolean;
  /** Size of the counter */
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  /** Text color */
  color?:
    | "white"
    | "black"
    | "gray"
    | "red"
    | "blue"
    | "green"
    | "yellow"
    | "primary";
  /** Background color */
  backgroundColor?:
    | "red"
    | "green"
    | "blue"
    | "yellow"
    | "orange"
    | "purple"
    | "gray"
    | "primary"
    | "success"
    | "warning"
    | "error";
  /** Style variant */
  variant?: "default" | "bordered";
  /** Border color for bordered variant */
  borderColor?: string;
  /** Additional CSS classes */
  className?: string;
  /** Position type */
  position?: "absolute" | "relative" | "fixed";
  /** Position classes like "top-0 right-0" */
  positionClasses?: string;
  /** Maximum count to display (e.g., 99+) */
  maxCount?: number;
}

const notificationCountVariants = cva(
  "inline-flex items-center justify-center font-medium",
  {
    variants: {
      size: {
        xs: "h-4 w-4 text-xxs",
        sm: "h-5 w-5 text-xs",
        md: "h-6 w-6 text-sm",
        lg: "h-7 w-7 text-base",
        xl: "h-8 w-8 text-lg",
      },
      color: {
        white: "text-white",
        black: "text-black",
        gray: "text-gray-600",
        red: "text-red-600",
        blue: "text-blue-600",
        green: "text-green-600",
        yellow: "text-yellow-600",
        primary: "text-primary-600",
      },
      backgroundColor: {
        red: "bg-red-500",
        green: "bg-green-500",
        blue: "bg-blue-500",
        yellow: "bg-yellow-500",
        orange: "bg-orange-500",
        purple: "bg-purple-500",
        gray: "bg-gray-500",
        primary: "bg-primary-500",
        success: "bg-success-500",
        warning: "bg-warning-500",
        error: "bg-[#EE4343]",
      },
      variant: {
        default: "rounded-full",
        bordered:
          "h-4 min-w-fit rounded-full px-1.5 py-0.5 text-[10px] font-semibold",
      },
    },
    defaultVariants: {
      size: "sm",
      color: "white",
      backgroundColor: "red",
      variant: "default",
    },
  }
);

export const NotificationCount: React.FC<NotificationCountProps> = ({
  count = 0,
  animated = false,
  size = "sm",
  color = "white",
  backgroundColor = "red",
  variant = "default",
  borderColor = "border-red-900",
  className,
  position = "relative",
  positionClasses = "",
  maxCount = 99,
}) => {
  const countClasses = notificationCountVariants({
    size: variant === "bordered" ? undefined : size,
    color,
    backgroundColor,
    variant,
  });

  // Only show if count is between 1 and 99+
  if (count < 1) return null;

  // Format count display - show actual number up to 99, then "99+"
  const displayCount = count > maxCount ? `${maxCount}+` : count.toString();

  return (
    <span className={cn(position, positionClasses, className)}>
      <div className="relative inline-flex">
        {animated && (
          <span
            className={cn(
              "absolute inline-flex h-full w-full animate-ping opacity-75",
              variant === "bordered" ? "rounded-full" : "rounded-full",
              notificationCountVariants({ backgroundColor })
                .split(" ")
                .filter((c) => c.startsWith("bg-"))
            )}
          />
        )}
        <span
          className={cn(
            countClasses,
            "relative",
            variant === "bordered" && "border-[1.5px]",
            variant === "bordered" && borderColor
          )}
        >
          {displayCount}
        </span>
      </div>
    </span>
  );
};
```

---

# NotificationDot

_Source: packages/ui/src/content/docs/components/NotificationDot/NotificationDot.mdx_

## Component Information

**Name:** NotificationDot

**Description:** A notification dot component for displaying small indicators with various sizes, colors, and animation options

## Imports

```javascript
import { useState } from "react";
import React from "react";

import { cn } from "@muatmuat/lib/utils";
import { NotificationDot } from "@muatmuat/ui/NotificationDot";
import { cva } from "class-variance-authority";

import { NotificationDotPreview } from "../../preview/NotificationDot.preview";
```

## Overview

**Description:** A notification dot component for displaying small indicators with various sizes, colors, and animation options

**Component:** NotificationDot

## Usage

<NotificationDotPreview />

```jsx
export function NotificationDotExample() {
  const [animated, setAnimated] = useState(true);
  const [color, setColor] = useState("red");
  const [size, setSize] = useState("sm");

  return (
    <div className="space-y-6">
      {/* Real-world examples */}
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-100">
              <span className="text-primary-700"> 📧 </span>
            </div>
            <NotificationDot
              position="absolute"
              positionClasses="top-0 right-0"
              color="red"
              animated={animated}
              size={size}
            />
          </div>
          <span> Email with new message </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-warning-100">
              <span className="text-warning-700"> 🔔 </span>
            </div>
            <NotificationDot
              position="absolute"
              positionClasses="top-0 right-0"
              color="warning"
              animated={animated}
              size={size}
            />
          </div>
          <span> Notification with warning </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success-100">
              <span className="text-success-700"> ✓ </span>
            </div>
            <NotificationDot
              position="absolute"
              positionClasses="top-0 right-0"
              color="success"
              animated={animated}
              size={size}
            />
          </div>
          <span> Task completed </span>
        </div>
      </div>

      {/* Size variants */}
      <div className="flex flex-wrap items-center gap-6">
        <div className="text-center">
          <NotificationDot size="xs" color={color} animated={animated} />
          <p className="mt-2 text-xs text-neutral-600"> XS </p>
        </div>
        <div className="text-center">
          <NotificationDot size="sm" color={color} animated={animated} />
          <p className="mt-2 text-xs text-neutral-600"> SM </p>
        </div>
        <div className="text-center">
          <NotificationDot size="md" color={color} animated={animated} />
          <p className="mt-2 text-xs text-neutral-600"> MD </p>
        </div>
        <div className="text-center">
          <NotificationDot size="lg" color={color} animated={animated} />
          <p className="mt-2 text-xs text-neutral-600"> LG </p>
        </div>
        <div className="text-center">
          <NotificationDot size="xl" color={color} animated={animated} />
          <p className="mt-2 text-xs text-neutral-600"> XL </p>
        </div>
      </div>

      {/* Controls */}
      <div className="rounded-lg border bg-white p-4">
        <h4 className="mb-2 font-medium"> Controls </h4>
        <div className="flex gap-4">
          <button
            onClick={() => setAnimated(!animated)}
            className={`rounded px-3 py-1 text-sm ${
              animated ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
            }`}
          >
            Animation: {animated ? "ON" : "OFF"}
          </button>
          <select
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="rounded border px-2 py-1 text-sm"
          >
            <option value="red"> Red </option>
            <option value="green"> Green </option>
            <option value="blue"> Blue </option>
            <option value="yellow"> Yellow </option>
            <option value="primary"> Primary </option>
            <option value="success"> Success </option>
            <option value="warning"> Warning </option>
            <option value="error"> Error </option>
          </select>
          <select
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className="rounded border px-2 py-1 text-sm"
          >
            <option value="xs"> XS </option>
            <option value="sm"> SM </option>
            <option value="md"> MD </option>
            <option value="lg"> LG </option>
            <option value="xl"> XL </option>
          </select>
        </div>
      </div>
    </div>
  );
}
```

## API Reference

### Props

| Prop            | Type                                                                                                                         | Default    | Description                           |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------- | ---------- | ------------------------------------- |
| animated        | `boolean`                                                                                                                    | true       | Whether to show the pulsing animation |
| size            | `"xs" \| "sm" \| "md" \| "lg" \| "xl"`                                                                                       | "sm"       | Size of the dot                       |
| color           | `"red" \| "green" \| "blue" \| "yellow" \| "orange" \| "purple" \| "gray" \| "primary" \| "success" \| "warning" \| "error"` | "red"      | Color of the dot                      |
| className       | `string`                                                                                                                     | -          | Additional CSS classes                |
| position        | `"absolute" \| "relative" \| "fixed"`                                                                                        | "relative" | Position type                         |
| positionClasses | `string`                                                                                                                     | ""         | Position classes like "top-0 right-0" |

### Types

```typescript
export interface NotificationDotProps {
  animated?: boolean;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  color?:
    | "red"
    | "green"
    | "blue"
    | "yellow"
    | "orange"
    | "purple"
    | "gray"
    | "primary"
    | "success"
    | "warning"
    | "error";
  className?: string;
  position?: "absolute" | "relative" | "fixed";
  positionClasses?: string;
}
```

## Behavior

- Displays a circular dot indicator with optional pulsing animation
- Supports 5 size variants from extra-small to extra-large
- Available in 11 color variants including semantic colors (success, warning, error)
- Flexible positioning system with absolute, relative, and fixed positioning options
- Animation uses CSS animate-ping for smooth pulsing effect
- Built with class-variance-authority for consistent styling

**Sizes**: xs (4px), sm (6px), md (8px), lg (10px), xl (12px)
**Colors**: red, green, blue, yellow, orange, purple, gray, primary, success, warning, error
**Key Guidelines**:

- Use absolute positioning with positionClasses for overlay indicators on other elements
- Combine with icons, buttons, or navigation items to show status
- Leverage semantic colors (success, warning, error) for meaningful visual communication
- Consider animation state - use animated for active/live indicators, static for historical status

## Component Code

```tsx
export interface NotificationDotProps {
  /** Whether to show the pulsing animation */
  animated?: boolean;
  /** Size of the dot */
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  /** Color of the dot */
  color?:
    | "red"
    | "green"
    | "blue"
    | "yellow"
    | "orange"
    | "purple"
    | "gray"
    | "primary"
    | "success"
    | "warning"
    | "error";
  /** Additional CSS classes */
  className?: string;
  /** Position type */
  position?: "absolute" | "relative" | "fixed";
  /** Position classes like "top-0 right-0" */
  positionClasses?: string;
}

const notificationDotVariants = cva("rounded-full", {
  variants: {
    size: {
      xs: "h-1 w-1",
      sm: "h-1.5 w-1.5",
      md: "h-2 w-2",
      lg: "h-2.5 w-2.5",
      xl: "h-3 w-3",
    },
    color: {
      red: "bg-red-500",
      green: "bg-green-500",
      blue: "bg-blue-500",
      yellow: "bg-yellow-500",
      orange: "bg-orange-500",
      purple: "bg-purple-500",
      gray: "bg-gray-500",
      primary: "bg-primary-500",
      success: "bg-success-500",
      warning: "bg-warning-900",
      error: "bg-error-500",
    },
  },
  defaultVariants: {
    size: "sm",
    color: "red",
  },
});

export const NotificationDot: React.FC<NotificationDotProps> = ({
  animated = true,
  size = "sm",
  color = "red",
  className,
  position = "relative",
  positionClasses = "",
}) => {
  const dotClasses = notificationDotVariants({ size, color });

  return (
    <span className={cn(position, positionClasses, className)}>
      <div className="relative flex">
        {animated && (
          <span
            className={cn("absolute inline-flex animate-ping", dotClasses)}
          />
        )}
        <span className={cn("relative inline-flex", dotClasses)} />
      </div>
    </span>
  );
};
```

---

# Popover

_Source: packages/ui/src/content/docs/components/Popover/Popover.mdx_

## Component Information

**Name:** Popover

**Description:** A floating popover component built on Radix UI with customizable positioning, animations, and accessibility features.

## Imports

```javascript
import { useState } from "react";
import React from "react";

import { cn } from "@muatmuat/lib/utils";
import * as PopoverPrimitive from "@radix-ui/react-popover";

import { PopoverPreview } from "../../preview/Popover.preview";
```

## Overview

**Description:** A floating popover component built on Radix UI with customizable positioning, animations, and accessibility features.

**Component:** Popover

## Usage

<PopoverPreview />

```jsx
import {
  Popover,
  PopoverArrow,
  PopoverContent,
  PopoverTrigger,
} from "@muatmuat/ui/Popover";

function PopoverExample() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <button className="rounded bg-primary-500 px-4 py-2 text-white hover:bg-primary-600">
          Show Popover
        </button>
      </PopoverTrigger>

      <PopoverContent side="top" align="center" sideOffset={8}>
        <div className="space-y-3">
          <h3 className="font-semibold"> Popover Content </h3>
          <p className="text-sm text-gray-600">
            This is a popover with rich content. You can add any React
            components inside.
          </p>
          <div className="flex gap-2">
            <button className="rounded bg-blue-500 px-3 py-1 text-sm text-white">
              Action 1
            </button>
            <button className="rounded border px-3 py-1 text-sm">
              Action 2
            </button>
          </div>
        </div>
        <PopoverArrow />
      </PopoverContent>
    </Popover>
  );
}
```

## API Reference

### Components

#### Popover (Root)

| Prop         | Type       | Default | Description                                          |
| ------------ | ---------- | ------- | ---------------------------------------------------- |
| open         | `boolean`  | -       | Whether the popover is open (controlled)             |
| defaultOpen  | `boolean`  | false   | Whether the popover is initially open (uncontrolled) |
| onOpenChange | `function` | -       | Callback fired when the open state changes           |

#### PopoverTrigger

| Prop    | Type      | Default | Description                            |
| ------- | --------- | ------- | -------------------------------------- |
| asChild | `boolean` | false   | Whether to render as the child element |

#### PopoverContent

| Prop                   | Type                               | Default     | Description                                  |
| ---------------------- | ---------------------------------- | ----------- | -------------------------------------------- | ------------------------------------------- |
| className              | `string`                           | -           | Additional CSS classes for the content       |
| side                   | `"top"\|"right"\|"bottom"\|"left"` | "top"       | Preferred side of the trigger                |
| align                  | `"start"\|"center"\|"end"`         | "center"    | Alignment along the chosen side              |
| sideOffset             | `number`                           | 5           | Distance from the trigger                    |
| alignOffset            | `number`                           | 0           | Offset along the alignment axis              |
| avoidCollisions        | `boolean`                          | true        | Whether to avoid viewport collisions         |
| collisionBoundary      | `Element                           | Element[]`  | -                                            | Boundary element(s) for collision detection |
| collisionPadding       | `number                            | object`     | 0                                            | Padding from collision boundaries           |
| sticky                 | `"partial"\|"always"`              | "partial"   | Sticky positioning behavior                  |
| hideWhenDetached       | `boolean`                          | false       | Whether to hide when detached                |
| updatePositionStrategy | `"optimized"\|"always"`            | "optimized" | Position update strategy                     |
| onOpenAutoFocus        | `function`                         | -           | Callback when popover opens and focuses      |
| onCloseAutoFocus       | `function`                         | -           | Callback when popover closes and focuses     |
| onEscapeKeyDown        | `function`                         | -           | Callback when escape key is pressed          |
| onPointerDownOutside   | `function`                         | -           | Callback when pointer is pressed outside     |
| onFocusOutside         | `function`                         | -           | Callback when focus moves outside            |
| onInteractOutside      | `function`                         | -           | Callback when any interaction occurs outside |

#### PopoverArrow

| Prop      | Type     | Default | Description                          |
| --------- | -------- | ------- | ------------------------------------ |
| className | `string` | -       | Additional CSS classes for the arrow |

### Types

```typescript
interface PopoverArrowProps {
  className?: string;
}

interface PopoverContentProps {
  className?: string;
  children: React.ReactNode;
  sideOffset?: number;
  align?: "start" | "center" | "end";
  alignOffset?: number;
  avoidCollisions?: boolean;
  collisionBoundary?: Element | Element[];
  collisionPadding?:
    | number
    | `Partial <Record <"top" | "right" | "bottom" | "left", number> >`;
  sticky?: "partial" | "always";
  hideWhenDetached?: boolean;
  updatePositionStrategy?: "optimized" | "always";
  onOpenAutoFocus?: (event: Event) => void;
  onCloseAutoFocus?: (event: Event) => void;
  onEscapeKeyDown?: (event: KeyboardEvent) => void;
  onPointerDownOutside?: (event: Event) => void;
  onFocusOutside?: (event: Event) => void;
  onInteractOutside?: (event: Event) => void;
}
```

## Behavior

- Renders floating content anchored to a trigger element with smart positioning
- Automatically adjusts position to avoid viewport edges and collisions
- Supports controlled and uncontrolled open state management
- Provides smooth slide and fade animations based on placement
- Includes focus management and keyboard navigation support
- Click outside or press escape key to close the popover
- Customizable arrow pointing to the trigger element
- Portal rendering to avoid z-index and overflow issues
- Full accessibility support with proper ARIA attributes

**Variants**: top, bottom, left, right placement; with/without arrow; controlled/uncontrolled
**Sizes**: Content-based sizing with maximum width constraints

**Key Guidelines**:

- Use for contextual information, menus, or forms that should appear on demand
- Ensure trigger content clearly indicates the popover's purpose
- Leverage collision avoidance to prevent content from being hidden
- Include proper focus management for form content within popovers
- Test across different screen sizes and viewport dimensions
- Consider adding a close button for longer content or mobile accessibility

## Component Code

```tsx
import type {
  PopoverArrowProps as RadixPopoverArrowProps,
  PopoverContentProps as RadixPopoverContentProps,
} from "@radix-ui/react-popover";

export const Popover = PopoverPrimitive.Root;
export const PopoverTrigger = PopoverPrimitive.Trigger;
export const PopoverClose = PopoverPrimitive.Close;

export type PopoverArrowProps = RadixPopoverArrowProps & {
  className?: string;
};

export type PopoverContentProps = RadixPopoverContentProps & {
  className?: string;
};

export const PopoverArrow: React.FC<PopoverArrowProps> = () => (
  <PopoverPrimitive.Arrow
    className="h-[11px] w-4 fill-white"
    style={{
      filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))",
    }}
  />
);

const PopoverContentComponent = (
  { className, children, ...props }: PopoverContentProps,
  ref: React.ForwardedRef<HTMLDivElement>
) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      sideOffset={5}
      className={cn(
        "z-[52] rounded-md border bg-white p-4 shadow-md outline-none",

        // --- FULLY CUSTOM ANIMATIONS ---
        // Removed `animate-in` and `animate-out`. We now only use our custom keyframes.

        // OPENING ANIMATIONS
        "data-[side=bottom]:animate-slide-up-and-fade",
        "data-[side=top]:animate-slide-down-and-fade",

        // CLOSING ANIMATIONS
        "data-[state=closed][data-side=bottom]:animate-slide-up-and-fade-out",
        "data-[state=closed][data-side=top]:animate-slide-down-and-fade-out",

        // Anti-glitch fixes are still useful with transform-based animations
        "data-[state=closed]:scrollbar-hide data-[state=closed]:overflow-hidden",

        className
      )}
      {...props}
    >
      {children}
    </PopoverPrimitive.Content>
  </PopoverPrimitive.Portal>
);

export const PopoverContent = React.forwardRef(PopoverContentComponent);
PopoverContent.displayName = "PopoverContent";
```

---

# RadioButton

_Source: packages/ui/src/content/docs/components/Radio/RadioButton.mdx_

## Component Information

**Name:** Radio Button

**Description:** Customizable radio button component with enhanced styling and accessibility

## Imports

```javascript
import { useState } from "react";
import React, { forwardRef, memo, useRef } from "react";

import { cn } from "@muatmuat/lib/utils";
import { RadioButton } from "@muatmuat/ui/Radio";

import { RadioButtonPreview } from "../../preview/RadioButton.preview";
import style from "./RadioButton.module.scss";
```

## Overview

**Description:** Customizable radio button component with enhanced styling and accessibility

**Component:** Radio Button

## Usage

<RadioButtonPreview />

```jsx
export function RadioButtonExample() {
  const [selectedMethod, setSelectedMethod] = useState("standard");

  return (
    <div className="space-y-3">
      <RadioButton
        name="shipping"
        label="Standard Shipping (5-7 days)"
        value="standard"
        checked={selectedMethod === "standard"}
        onChange={() => setSelectedMethod("standard")}
      />

      <RadioButton
        name="shipping"
        label="Express Shipping (2-3 days)"
        value="express"
        checked={selectedMethod === "express"}
        onChange={() => setSelectedMethod("express")}
      />

      <RadioButton
        name="shipping"
        label="Overnight Shipping"
        value="overnight"
        checked={selectedMethod === "overnight"}
        onChange={() => setSelectedMethod("overnight")}
        disabled={true}
      />
    </div>
  );
}
```

## API Reference

### Props

| Prop           | Type              | Default | Description                          |
| -------------- | ----------------- | ------- | ------------------------------------ |
| name           | `string`          | -       | Name of the radio button group       |
| label          | `string`          | -       | Text label for the radio button      |
| checked        | `boolean`         | -       | Whether the radio button is checked  |
| value          | `string`          | -       | Value of the radio button            |
| disabled       | `boolean`         | false   | Whether the radio button is disabled |
| onChange       | `function`        | -       | Change event handler                 |
| onClick        | `function`        | -       | Click event handler                  |
| children       | `React.ReactNode` | -       | Custom content instead of label      |
| className      | `string`          | -       | Additional CSS classes               |
| classNameRound | `string`          | -       | Custom class for radio button visual |
| classNameLabel | `string`          | -       | Custom class for label text          |

## Behavior

- Custom styled radio button with accessibility features
- Supports both text labels and custom children content
- Provides keyboard navigation and screen reader support
- Handles click events with proper state management
- Includes visual feedback for checked and disabled states
- Compatible with form libraries and standard HTML forms

**Features**: Custom styling, accessibility, keyboard navigation
**States**: default, checked, disabled, focus

**Key Guidelines**:

- Group radio buttons with the same name attribute
- Provide clear, descriptive labels
- Use disabled state for unavailable options
- Ensure one option is pre-selected when appropriate
- Test keyboard navigation for accessibility

## Component Code

```tsx
export interface RadioButtonProps {
  onClick?: (data: { checked: boolean; value: string }) => void;
  name?: string;
  label?: string;
  checked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  disabled?: boolean;
  children?: React.ReactNode;
  className?: string;
  classNameRound?: string;
  classNameLabel?: string;
}

/**
 * RadioButton component with enhanced styling and accessibility.
 *
 * A customizable radio button that supports both label text and custom children content
 * with proper keyboard navigation, screen reader support, and visual feedback.
 */
const RadioButtonImplementation = (
  props: RadioButtonProps,
  ref: React.ForwardedRef<HTMLInputElement>
) => {
  const {
    onClick = () => {},
    name,
    label,
    checked,
    onChange,
    value,
    disabled,
    children,
    className,
    classNameRound,
    classNameLabel,
    ...restProps
  } = props;

  const radioRef = useRef<HTMLInputElement>(null);
  const isLabelMissing = !label && !children;

  const handleClick = () => {
    if (disabled) {
      return;
    }
    onClick({
      checked: !checked,
      value: value || "",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e);
    }
    handleClick();
  };

  return (
    <div
      className={cn(
        style.container_radio,
        "flex cursor-pointer items-center gap-[8px]",
        className
      )}
      onClick={handleClick}
    >
      <input
        type="radio"
        ref={ref || radioRef}
        checked={checked}
        name={name}
        onChange={handleChange}
        value={value}
        disabled={disabled}
        {...restProps}
      />
      {/* Radio button visual element */}
      <span
        className={`${style.radio_primary} ${classNameRound} ${
          isLabelMissing ? "after:top-[4px]" : "after:top-[5px]"
        } select-none bg-neutral-50`}
      />
      {children ? (
        children
      ) : (
        <span
          className={cn(
            "capsize select-none text-sm font-semibold leading-[15.4px] text-neutral-900 md:text-xs md:font-medium md:leading-[14.4px]",
            classNameLabel
          )}
        >
          {label}
        </span>
      )}
    </div>
  );
};

const RadioButton = memo(forwardRef(RadioButtonImplementation));
RadioButton.displayName = "RadioButton";
export { RadioButton };
```

---

# ScrollArea

_Source: packages/ui/src/content/docs/components/ScrollArea/ScrollArea.mdx_

## Component Information

**Name:** ScrollArea

**Description:** Custom scrollbars with improved accessibility and responsive behavior

## Imports

```javascript
import React from "react";

import { cn } from "@muatmuat/lib/utils";
import { ScrollArea, ScrollBar } from "@muatmuat/ui/ScrollArea";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";

import { ScrollAreaPreview } from "../../preview/ScrollArea.preview";
```

## Overview

**Description:** Custom scrollbars with improved accessibility and responsive behavior

**Component:** ScrollArea

## Usage

<ScrollAreaPreview />

```jsx

// Basic scrollable content
<ScrollArea className="h-[200px] w-[350px]">
  <div className="p-4">
    <p> Long content that needs scrolling... </p>
    {/* More content */}
  </div>
</ScrollArea>

// With both vertical and horizontal scrollbars
<ScrollArea className="h-[200px] w-[350px]">
  <div className="w-[500px] p-4">
    {/* Wide content that requires horizontal scrolling */}
  </div>
  <ScrollBar orientation="horizontal" />
</ScrollArea>

// Custom styling
<ScrollArea className="h-[300px] rounded-lg border">
  <div className="p-4">
    {/* Scrollable content with custom container styling */}
  </div>
</ScrollArea>
```

## API Reference

### ScrollArea Props

| Prop      | Type              | Default  | Description                                          |
| --------- | ----------------- | -------- | ---------------------------------------------------- |
| children  | `React.ReactNode` | Required | Content to be rendered inside the scroll area        |
| className | `string`          | `""`     | Additional CSS classes for the scroll area container |

### ScrollBar Props

| Prop        | Type                         | Default      | Description                              |
| ----------- | ---------------------------- | ------------ | ---------------------------------------- |
| orientation | `"vertical" \| "horizontal"` | `"vertical"` | Orientation of the scrollbar             |
| className   | `string`                     | `""`         | Additional CSS classes for the scrollbar |

### Types

```typescript
export interface ScrollAreaProps
  extends React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root> {
  className?: string;
  children: React.ReactNode;
}

export interface ScrollBarProps
  extends React.ComponentPropsWithoutRef<
    typeof ScrollAreaPrimitive.ScrollAreaScrollbar
  > {
  className?: string;
  orientation?: "vertical" | "horizontal";
}
```

## Behavior

- Built on Radix UI ScrollArea primitive for accessibility and cross-browser compatibility
- Custom styled scrollbars with consistent appearance across platforms
- Supports both vertical and horizontal scrolling orientations
- Responsive design with proper touch support on mobile devices
- Maintains aspect ratio and prevents layout shifts during scrolling
- Keyboard accessible with proper focus management
- Smooth scrolling behavior with customizable scroll containers
- Automatic corner element when both scrollbars are present

## Component Code

```tsx
export interface ScrollAreaProps
  extends React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root> {
  className?: string;
  children: React.ReactNode;
}

export const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  ScrollAreaProps
>(({ className, children, ...props }, ref) => {
  return (
    <ScrollAreaPrimitive.Root
      ref={ref}
      data-slot="scroll-area"
      className={cn("relative", className)}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport
        data-slot="scroll-area-viewport"
        className="focus-visible:ring-ring/50 h-full w-full rounded-[inherit] outline-none transition-[color,box-shadow] focus-visible:outline-1 focus-visible:ring-[3px]"
      >
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar />
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  );
});

export interface ScrollBarProps
  extends React.ComponentPropsWithoutRef<
    typeof ScrollAreaPrimitive.ScrollAreaScrollbar
  > {
  className?: string;
  orientation?: "vertical" | "horizontal";
}

export const ScrollBar = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  ScrollBarProps
>(({ className, orientation = "vertical", ...props }, ref) => {
  return (
    <ScrollAreaPrimitive.ScrollAreaScrollbar
      ref={ref}
      data-slot="scroll-area-scrollbar"
      orientation={orientation}
      className={cn(
        "flex touch-none select-none p-px transition-colors",
        orientation === "vertical" &&
          "h-full w-2.5 border-l border-l-transparent",
        orientation === "horizontal" &&
          "h-2.5 flex-col border-t border-t-transparent",
        className
      )}
      {...props}
    >
      <ScrollAreaPrimitive.ScrollAreaThumb
        data-slot="scroll-area-thumb"
        className="bg-border relative flex-1 rounded-full"
      />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
  );
});

ScrollArea.displayName = "ScrollArea";
ScrollBar.displayName = "ScrollBar";
```

---

# DataTableBO

_Source: packages/ui/src/content/docs/components/Table/DataTableBO.mdx_

## Component Information

**Name:** DataTableBO

**Description:** A comprehensive data table component with search, pagination, and sorting capabilities

## Imports

```javascript
import { DataTableBOPreview } from "../../preview/DataTableBO.preview";

import { useMemo, useState } from "react";

import { DataTableBO, TableBO } from "@muatmuat/ui/Table";

import * as React from "react";

import { cn } from "@muatmuat/lib/utils";
import { Input, Select } from "@muatmuat/ui/Form";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { TableBO } from "./TableBO";
import { usePagination } from "./usePagination";

```

## Overview

**Description:** A comprehensive data table component with search, pagination, and sorting capabilities

**Component:** DataTableBO

## Usage

<DataTableBOPreview />

```jsx
function EmployeeDirectoryExample() {
  const [data] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "Developer",
      department: "Engineering",
      status: "Active",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      role: "Designer",
      department: "Design",
      status: "Active",
    },
    {
      id: 3,
      name: "Bob Johnson",
      email: "bob@example.com",
      role: "Manager",
      department: "Management",
      status: "Inactive",
    },
    {
      id: 4,
      name: "Alice Brown",
      email: "alice@example.com",
      role: "Developer",
      department: "Engineering",
      status: "Active",
    },
    {
      id: 5,
      name: "Charlie Wilson",
      email: "charlie@example.com",
      role: "Designer",
      department: "Design",
      status: "Pending",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });
  const [sorting, setSorting] = useState([{ id: "name", desc: false }]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "name",
        header: "Name",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "email",
        header: "Email",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "role",
        header: "Role",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "department",
        header: "Department",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: (info) => (
          <span
            className={`rounded px-2 py-1 text-xs ${
              info.getValue() === "Active"
                ? "bg-green-100 text-green-800"
                : info.getValue() === "Inactive"
                  ? "bg-red-100 text-red-800"
                  : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {info.getValue()}
          </span>
        ),
      },
    ],
    []
  );

  const paginationData = {
    currentPage: pagination.pageIndex + 1,
    itemsPerPage: pagination.pageSize,
    totalItems: data.length,
    totalPages: Math.ceil(data.length / pagination.pageSize),
  };

  return (
    <DataTableBO.Root
      data={data}
      columns={columns}
      pagination={pagination}
      onPaginationChange={setPagination}
      sorting={sorting}
      onSortingChange={setSorting}
      searchTerm={searchTerm}
      onSearchChange={setSearchTerm}
      paginationData={paginationData}
    >
      <DataTableBO.Header>
        <DataTableBO.Search />
      </DataTableBO.Header>
      <DataTableBO.Content Table={TableBO} />
      <DataTableBO.Pagination />
    </DataTableBO.Root>
  );
}

// Custom header example
function CustomHeaderExample() {
  const [data] = useState([
    {
      id: 1,
      product: "Laptop",
      price: 999,
      category: "Electronics",
      stock: 15,
    },
    { id: 2, product: "Mouse", price: 29, category: "Accessories", stock: 50 },
    {
      id: 3,
      product: "Keyboard",
      price: 79,
      category: "Accessories",
      stock: 25,
    },
  ]);

  const columns = [
    { accessorKey: "product", header: "Product" },
    { accessorKey: "price", header: "Price" },
    { accessorKey: "category", header: "Category" },
    { accessorKey: "stock", header: "Stock" },
  ];

  return (
    <DataTableBO.Root
      data={data}
      columns={columns}
      pagination={{ pageIndex: 0, pageSize: 10 }}
      onPaginationChange={() => {}}
      paginationData={{
        currentPage: 1,
        itemsPerPage: 10,
        totalItems: 3,
        totalPages: 1,
      }}
    >
      <DataTableBO.Header className="border-b pb-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold"> Product Inventory </h2>
          <DataTableBO.Search />
        </div>
      </DataTableBO.Header>
      <DataTableBO.Content Table={TableBO} />
    </DataTableBO.Root>
  );
}
```

## API Reference

### Components

#### DataTable.Root

| Prop               | Type                       | Default                                               | Description                                 |
| ------------------ | -------------------------- | ----------------------------------------------------- | ------------------------------------------- | ------------------------- |
| data               | `TData[]`                  | `[]`                                                  | Array of data objects                       |
| columns            | `Column <TData> []`        | `[]`                                                  | Column definitions from TanStack Table      |
| pageCount          | `number`                   | `-1`                                                  | Total page count for server-side pagination |
| pagination         | `PaginationState`          | -                                                     | Current pagination state                    |
| onPaginationChange | `(updater: PaginationState | ((old: PaginationState) => PaginationState)) => void` | -                                           | Pagination change handler |
| sorting            | `SortingState`             | -                                                     | Current sorting state                       |
| onSortingChange    | `(updater: SortingState    | ((old: SortingState) => SortingState)) => void`       | -                                           | Sorting change handler    |
| searchTerm         | `string`                   | -                                                     | Current search term                         |
| onSearchChange     | `(value: string) => void`  | -                                                     | Search change handler                       |
| paginationData     | `PaginationData`           | -                                                     | Pagination metadata                         |
| children           | `React.ReactNode`          | -                                                     | Child components                            |

#### DataTable.Header

| Prop      | Type              | Default | Description            |
| --------- | ----------------- | ------- | ---------------------- |
| className | `string`          | -       | Additional CSS classes |
| children  | `React.ReactNode` | -       | Header content         |

#### DataTable.Search

| Prop      | Type     | Default | Description            |
| --------- | -------- | ------- | ---------------------- |
| className | `string` | -       | Additional CSS classes |

#### DataTable.Content

| Prop  | Type             | Default   | Description                   |
| ----- | ---------------- | --------- | ----------------------------- |
| Table | `typeof TableBO` | `TableBO` | Custom table component to use |

#### DataTable.Pagination

No additional props beyond those provided by the context.

### Types

```typescript
export interface DataTableContextValue<TData> {
  table: Table<TData>;
  columns: Column<TData>[];
  data: TData[];
  searchTerm?: string;
  onSearchChange?: (value: string) => void;
  pagination?: PaginationState;
  onPaginationChange?: (
    updater: PaginationState | ((old: PaginationState) => PaginationState)
  ) => void;
  sorting?: SortingState;
  onSortingChange?: (
    updater: SortingState | ((old: SortingState) => SortingState)
  ) => void;
  paginationData?: {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
  };
}

export interface DataTableRootProps<TData> {
  children: React.ReactNode;
  data: TData[];
  columns: Column<TData>[];
  pageCount?: number;
  pagination?: PaginationState;
  onPaginationChange?: (
    updater: PaginationState | ((old: PaginationState) => PaginationState)
  ) => void;
  sorting?: SortingState;
  onSortingChange?: (
    updater: SortingState | ((old: SortingState) => SortingState)
  ) => void;
  searchTerm?: string;
  onSearchChange?: (value: string) => void;
  paginationData?: {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
  };
}

export interface PaginationData {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
}
```

## Behavior

- Built on TanStack Table for robust data management and performance
- Compound component architecture with context-based state management
- Search functionality with real-time filtering
- Pagination with customizable page sizes and navigation controls
- Column sorting with visual indicators
- Responsive design with horizontal scrolling
- Empty state handling when no data is available
- Loading states during data fetching
- Keyboard navigation support
- Mobile-friendly with touch interactions
- Customizable styling and layout
- Server-side pagination support
- Type-safe with TypeScript integration

**Variants**: Standard data table with search, pagination, and sorting capabilities
**Sizes**: Responsive width with configurable pagination and search areas
**Key Guidelines**: Use for large datasets, admin panels, data management interfaces, and scenarios requiring advanced table features like search, pagination, and sorting

## Component Code

```tsx
import {
  Column,
  PaginationState,
  SortingState,
  Table,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

// --- Type Definitions ---
export interface DataTableContextValue<TData> {
  table: Table<TData>;
  columns: Column<TData>[];
  data: TData[];
  searchTerm?: string;
  inputValue?: string;
  onSearchChange?: (value: string) => void;
  pagination?: PaginationState;
  onPaginationChange?: (
    updater: PaginationState | ((old: PaginationState) => PaginationState)
  ) => void;
  sorting?: SortingState;
  onSortingChange?: (
    updater: SortingState | ((old: SortingState) => SortingState)
  ) => void;
  paginationData?: {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
  };
}

export interface DataTableRootProps<TData> {
  children: React.ReactNode;
  data: TData[];
  columns: Column<TData>[];
  pageCount?: number;
  pagination?: PaginationState;
  onPaginationChange?: (
    updater: PaginationState | ((old: PaginationState) => PaginationState)
  ) => void;
  sorting?: SortingState;
  onSortingChange?: (
    updater: SortingState | ((old: SortingState) => SortingState)
  ) => void;
  searchTerm?: string;
  inputValue?: string;
  onSearchChange?: (value: string) => void;
  paginationData?: {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
  };
}

export interface DataTableHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export interface DataTableSearchProps {
  className?: string;
}

export interface DataTableContentProps {
  Table?: typeof TableBO;
}

// --- DataTable Compound Component Definition ---
const DataTableContext = React.createContext<DataTableContextValue<any> | null>(
  null
);
export const useDataTableContext = <
  TData = any,
>(): DataTableContextValue<TData> => {
  const context = React.useContext(DataTableContext);
  if (!context) {
    throw new Error("useDataTableContext must be used within a DataTable.Root");
  }
  return context as DataTableContextValue<TData>;
};

const DataTableRoot = <TData,>({
  children,
  ...props
}: DataTableRootProps<TData>) => {
  const table = useReactTable({
    data: props.data || [],
    columns: props.columns,
    pageCount: props.pageCount ?? -1,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    manualSorting: true,
    state: {
      pagination: props.pagination,
      sorting: props.sorting,
    },
    onPaginationChange: props.onPaginationChange,
    onSortingChange: props.onSortingChange,
  });

  return (
    <DataTableContext.Provider value={{ table, ...props }}>
      {children}
    </DataTableContext.Provider>
  );
};

const DataTableHeader: React.FC<DataTableHeaderProps> = ({
  children,
  className,
}) => (
  <div
    className={cn("flex items-center justify-between gap-4 pb-2.5", className)}
  >
    {children}
  </div>
);

const DataTableSearch: React.FC<DataTableSearchProps> = () => {
  const { inputValue, onSearchChange } = useDataTableContext();
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-[#1B1B1B]"> Pencarian : </span>
      <div className="relative">
        <Input
          value={inputValue}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Minimal 3 karakter untuk mencari"
          className="h-8 w-[232px] rounded-[6px] border-[#A8A8A8] pr-8 text-xs"
        />
        {inputValue && inputValue.length > 0 && inputValue.length < 3 && (
          <div className="absolute right-2 top-1/2 -translate-y-1/2 transform">
            <span className="text-xs text-gray-400">
              {" "}
              {inputValue.length}/3{" "}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

const DataTableContent: React.FC<DataTableContentProps> = React.memo(
  ({ Table = TableBO }) => {
    const { table, columns, searchTerm } = useDataTableContext();

    // Determine the appropriate empty state message
    const getEmptyStateMessage = () => {
      if (searchTerm && searchTerm.trim().length > 0) {
        return "Pencarian tidak ditemukan";
      }
      return "Tidak ada dalam tabel";
    };

    return (
      <div className="rounded-[10px] border border-[#A8A8A8] bg-white px-2">
        <Table.Root>
          <Table.Header>
            {table.getHeaderGroups().map((headerGroup) => (
              <Table.Row
                key={headerGroup.id}
                className="border-b-[2px] border-[#C6CBD4] hover:bg-white"
              >
                {headerGroup.headers.map((header) => (
                  <Table.Head key={header.id} column={header.column}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </Table.Head>
                ))}
              </Table.Row>
            ))}
          </Table.Header>
          <Table.Body>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <Table.Row
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="h-[51px]"
                >
                  {row.getVisibleCells().map((cell) => (
                    <Table.Cell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </Table.Cell>
                  ))}
                </Table.Row>
              ))
            ) : (
              <Table.Row>
                <Table.Cell
                  colSpan={columns.length}
                  className="py-3 text-center text-sm font-medium"
                >
                  {getEmptyStateMessage()}
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table.Root>
      </div>
    );
  }
);
DataTableContent.displayName = "DataTableContent";

const DataTablePagination: React.FC = () => {
  const { table, paginationData } = useDataTableContext();
  const { currentPage, itemsPerPage, totalItems, totalPages } =
    paginationData || {};

  const paginationRange = usePagination({
    currentPage,
    totalPages,
  });

  if (!paginationData || paginationData.totalItems === 0) {
    return null;
  }

  const firstItem = totalItems > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0;
  const lastItem = Math.min(currentPage * itemsPerPage, totalItems);
  const pageSizeOptions = [10, 20, 30, 40, 50].map((size) => ({
    value: String(size),
    label: String(size),
  }));

  return (
    <div className="flex items-center justify-between pb-3 pt-2.5">
      <p className="flex-1 text-sm font-medium text-[#1B1B1B]">
        Menampilkan {firstItem} - {lastItem} data dari total {totalItems} data
      </p>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1.5">
          <span className="text-sm text-[#1B1B1B]"> Menampilkan </span>
          <Select
            options={pageSizeOptions}
            value={String(table.getState().pagination.pageSize)}
            onChange={(value) => table.setPageSize(Number(value))}
            className="h-[33px] w-[55px] rounded-[6px] border-[#A8A8A8] text-xs font-medium"
          />
          <span className="text-sm text-[#1B1B1B]"> data </span>
        </div>
        <div className="mx-2 h-5 w-px bg-[#C6CBD4]" />
        <div className="flex items-center gap-2">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft
              size={24}
              className={cn(
                "text-[#868686]",
                !table.getCanPreviousPage() && "text-[#D7D7D7]"
              )}
            />
          </button>
          {paginationRange.map((pageNumber, index) =>
            pageNumber === "..." ? (
              <span
                key={`dots-${index}`}
                className="px-1 py-1 text-sm font-medium text-[#868686]"
              >
                ...
              </span>
            ) : (
              <button
                key={pageNumber}
                onClick={() => table.setPageIndex(Number(pageNumber) - 1)}
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-[6px] p-1.5 text-sm font-medium",
                  currentPage === pageNumber
                    ? "bg-[#176CF7] text-white"
                    : "bg-transparent text-[#868686] hover:bg-neutral-100"
                )}
              >
                {pageNumber}
              </button>
            )
          )}
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight
              size={24}
              className={cn(
                "text-[#868686]",
                !table.getCanNextPage() && "text-[#D7D7D7]"
              )}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export const DataTableBO = {
  Root: DataTableRoot,
  Header: DataTableHeader,
  Search: DataTableSearch,
  Content: DataTableContent,
  Pagination: DataTablePagination,
};
```

---

# TableBO

_Source: packages/ui/src/content/docs/components/Table/TableBO.mdx_

## Component Information

**Name:** TableBO

**Description:** A comprehensive table component with sorting capabilities and responsive design for data display

## Imports

```javascript
import * as React from "react";

import { cn } from "@muatmuat/lib/utils";
import { IconComponent } from "@muatmuat/ui/IconComponent";
import { TableBO } from "@muatmuat/ui/Table";

import { TableBOPreview } from "../../preview/TableBO.preview";
```

## Overview

**Description:** A comprehensive table component with sorting capabilities and responsive design for data display

**Component:** TableBO

## Usage

<TableBOPreview />

```jsx
function Example() {
  const data = [
    { id: 1, name: "John Doe", email: "john@example.com", status: "Active" },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      status: "Inactive",
    },
    { id: 3, name: "Bob Johnson", email: "bob@example.com", status: "Pending" },
  ];

  return (
    <TableBO.Root>
      <TableBO.Header>
        <TableBO.Row>
          <TableBO.Head> ID </TableBO.Head>
          <TableBO.Head> Name </TableBO.Head>
          <TableBO.Head> Email </TableBO.Head>
          <TableBO.Head> Status </TableBO.Head>
        </TableBO.Row>
      </TableBO.Header>
      <TableBO.Body>
        {data.map((row) => (
          <TableBO.Row key={row.id}>
            <TableBO.Cell> {row.id} </TableBO.Cell>
            <TableBO.Cell> {row.name} </TableBO.Cell>
            <TableBO.Cell> {row.email} </TableBO.Cell>
            <TableBO.Cell> {row.status} </TableBO.Cell>
          </TableBO.Row>
        ))}
      </TableBO.Body>
    </TableBO.Root>
  );
}

// With sorting
function SortableExample() {
  const [data] = useState([
    { id: 1, name: "Alice", age: 25, department: "Engineering" },
    { id: 2, name: "Bob", age: 30, department: "Design" },
    { id: 3, name: "Charlie", age: 28, department: "Marketing" },
  ]);

  return (
    <TableBO.Root>
      <TableBO.Header>
        <TableBO.Row>
          <TableBO.Head
            column={{ getIsSorted: () => "asc", toggleSorting: () => {} }}
          >
            Name
          </TableBO.Head>
          <TableBO.Head
            column={{ getIsSorted: () => false, toggleSorting: () => {} }}
          >
            Age
          </TableBO.Head>
          <TableBO.Head
            column={{ getIsSorted: () => "desc", toggleSorting: () => {} }}
          >
            Department
          </TableBO.Head>
        </TableBO.Row>
      </TableBO.Header>
      <TableBO.Body>
        {data.map((row) => (
          <TableBO.Row key={row.id}>
            <TableBO.Cell> {row.name} </TableBO.Cell>
            <TableBO.Cell> {row.age} </TableBO.Cell>
            <TableBO.Cell> {row.department} </TableBO.Cell>
          </TableBO.Row>
        ))}
      </TableBO.Body>
    </TableBO.Root>
  );
}
```

## API Reference

### Components

#### TableBO.Root

| Prop      | Type              | Default | Description                                    |
| --------- | ----------------- | ------- | ---------------------------------------------- |
| className | `string`          | -       | Additional CSS classes for the table container |
| children  | `React.ReactNode` | -       | Table content                                  |

#### TableBO.Header

| Prop      | Type     | Default | Description                                   |
| --------- | -------- | ------- | --------------------------------------------- |
| className | `string` | -       | Additional CSS classes for the header section |

#### TableBO.Body

| Prop      | Type     | Default | Description                                 |
| --------- | -------- | ------- | ------------------------------------------- |
| className | `string` | -       | Additional CSS classes for the body section |

#### TableBO.Row

| Prop       | Type     | Default | Description                        |
| ---------- | -------- | ------- | ---------------------------------- |
| className  | `string` | -       | Additional CSS classes for the row |
| data-state | `string` | -       | State data (e.g., "selected")      |

#### TableBO.Head

| Prop      | Type              | Default | Description                                |
| --------- | ----------------- | ------- | ------------------------------------------ |
| className | `string`          | -       | Additional CSS classes for the header cell |
| column    | `object`          | -       | Column object with sorting properties      |
| children  | `React.ReactNode` | -       | Header content                             |

#### TableBO.Cell

| Prop      | Type     | Default | Description                              |
| --------- | -------- | ------- | ---------------------------------------- |
| className | `string` | -       | Additional CSS classes for the data cell |

### Types

```typescript
export interface TableProps extends React.HTMLAttributes<HTMLTableElement> {}

export interface TableHeaderProps
  extends React.HTMLAttributes<HTMLTableSectionElement> {}

export interface TableBodyProps
  extends React.HTMLAttributes<HTMLTableSectionElement> {}

export interface TableRowProps
  extends React.HTMLAttributes<HTMLTableRowElement> {}

export interface TableHeadProps
  extends React.ThHTMLAttributes<HTMLTableCellElement> {
  column?: any;
  children?: React.ReactNode;
}

export interface TableCellProps
  extends React.TdHTMLAttributes<HTMLTableCellElement> {}
```

## Behavior

- Responsive table with horizontal scrolling on small screens
- Built-in sorting support with visual indicators (ascending/descending arrows)
- Hover states on rows for better interactivity
- Consistent styling with design system colors and spacing
- Proper semantic HTML structure for accessibility
- Border styling for clear visual separation
- Hover effects on rows for better user experience
- Support for both basic and sortable column headers
- Mobile-friendly with horizontal scroll container
- Clean typography with consistent font sizes and weights

**Variants**: Standard table with optional sorting capabilities
**Sizes**: Responsive width with auto-sizing based on content
**Key Guidelines**: Use for displaying tabular data, data tables, lists with multiple columns, and scenarios requiring structured data presentation

## Component Code

```tsx
export interface TableProps extends React.HTMLAttributes<HTMLTableElement> {}

const Table = React.forwardRef<HTMLTableElement, TableProps>(
  ({ className, ...props }, ref) => (
    <div className="relative w-full overflow-x-auto">
      <table
        ref={ref}
        className={cn("w-full caption-bottom text-sm", className)}
        {...props}
      />
    </div>
  )
);
Table.displayName = "Table";

export interface TableHeaderProps
  extends React.HTMLAttributes<HTMLTableSectionElement> {}

const TableHeader = React.forwardRef<HTMLTableSectionElement, TableHeaderProps>(
  ({ className, ...props }, ref) => (
    <thead ref={ref} className={cn("[&_tr]:border-b", className)} {...props} />
  )
);
TableHeader.displayName = "TableHeader";

export interface TableBodyProps
  extends React.HTMLAttributes<HTMLTableSectionElement> {}

const TableBody = React.forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ className, ...props }, ref) => (
    <tbody
      ref={ref}
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  )
);
TableBody.displayName = "TableBody";

export interface TableRowProps
  extends React.HTMLAttributes<HTMLTableRowElement> {}

const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className, ...props }, ref) => (
    <tr
      ref={ref}
      className={cn(
        "data-[state=selected]:bg-muted border-b border-[#C6CBD4] transition-colors hover:bg-neutral-50",
        className
      )}
      {...props}
    />
  )
);
TableRow.displayName = "TableRow";

export interface TableHeadProps
  extends React.ThHTMLAttributes<HTMLTableCellElement> {
  column?: any;
  children?: React.ReactNode;
}

const TableHead = React.forwardRef<HTMLTableCellElement, TableHeadProps>(
  ({ className, column, children, ...props }, ref) => {
    const enableSorting = column?.enableSorting !== false;

    if (enableSorting && column) {
      const sortDirection = column.getIsSorted();
      const iconSrc =
        sortDirection === "asc"
          ? "/icons/asc-sort.svg"
          : sortDirection === "desc"
            ? "/icons/desc-sort.svg"
            : "/icons/default-sort.svg";
      return (
        <th
          ref={ref}
          className={cn(
            "h-auto py-2 text-left align-middle text-xs font-semibold text-[#868686] [&:has([role=checkbox])]:pr-0",
            className
          )}
          {...props}
        >
          {/* ✅ w-full class has been removed from this button */}
          <button
            onClick={() => column.toggleSorting()}
            className="flex min-h-8 items-center gap-2 p-2 text-xs font-semibold text-[#868686] hover:bg-transparent"
          >
            {children}
            <IconComponent src={iconSrc} alt="sort icon" className="h-4 w-4" />
          </button>
        </th>
      );
    }
    // Non-sortable header remains the same
    return (
      <th
        ref={ref}
        className={cn(
          "h-auto py-2 text-left align-middle text-xs font-semibold text-[#868686] [&:has([role=checkbox])]:pr-0",
          className
        )}
        {...props}
      >
        <div className="flex min-h-8 items-center px-2"> {children} </div>
      </th>
    );
  }
);
TableHead.displayName = "TableHead";

export interface TableCellProps
  extends React.TdHTMLAttributes<HTMLTableCellElement> {}

const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ className, ...props }, ref) => (
    <td
      ref={ref}
      className={cn(
        "p-2 text-left align-middle text-xs text-[#1B1B1B] [&:has([role=checkbox])]:pr-0",
        className
      )}
      {...props}
    />
  )
);
TableCell.displayName = "TableCell";

export const TableBO = {
  Root: Table,
  Header: TableHeader,
  Body: TableBody,
  Row: TableRow,
  Head: TableHead,
  Cell: TableCell,
};
```

---

# Timeline

_Source: packages/ui/src/content/docs/components/Timeline/Timeline.mdx_

## Component Information

**Name:** Timeline

**Description:** A flexible timeline component for displaying sequential events with interactive state management.

## Imports

```javascript
import * as React from "react";

import { cn } from "@muatmuat/lib/utils";
import { Slot } from "@radix-ui/react-slot";

import { TimelinePreview } from "../../preview/Timeline.preview";
```

## Overview

**Description:** A flexible timeline component for displaying sequential events with interactive state management.

**Component:** Timeline

## Usage

<TimelinePreview />

```jsx
import {
  Timeline,
  TimelineContent,
  TimelineDate,
  TimelineHeader,
  TimelineIndicator,
  TimelineItem,
  TimelineSeparator,
  TimelineTitle,
} from "@muatmuat/ui/Timeline";

export function ExampleTimeline() {
  const [currentStep, setCurrentStep] = useState(2);

  return (
    <Timeline
      value={currentStep}
      onValueChange={setCurrentStep}
      className="max-w-md"
    >
      <TimelineItem step={1}>
        <TimelineHeader>
          <TimelineDate> Jan 15, 2024 </TimelineDate>
          <TimelineTitle> Order Created </TimelineTitle>
        </TimelineHeader>
        <TimelineContent>
          Order has been received and is being processed.
        </TimelineContent>
        <TimelineSeparator />
        <TimelineIndicator />
      </TimelineItem>

      <TimelineItem step={2}>
        <TimelineHeader>
          <TimelineDate> Jan 15, 2024 </TimelineDate>
          <TimelineTitle> Driver Assigned </TimelineTitle>
        </TimelineHeader>
        <TimelineContent>
          Professional driver has been assigned to your delivery.
        </TimelineContent>
        <TimelineSeparator />
        <TimelineIndicator />
      </TimelineItem>

      <TimelineItem step={3}>
        <TimelineHeader>
          <TimelineDate> Jan 15, 2024 </TimelineDate>
          <TimelineTitle> Pickup Completed </TimelineTitle>
        </TimelineHeader>
        <TimelineContent>
          Package has been picked up and is in transit.
        </TimelineContent>
        <TimelineSeparator />
        <TimelineIndicator />
      </TimelineItem>
    </Timeline>
  );
}
```

## API Reference

### Timeline Props

| Prop          | Type                         | Default      | Description                           |
| ------------- | ---------------------------- | ------------ | ------------------------------------- |
| defaultValue  | `number`                     | `1`          | Initial active step when uncontrolled |
| value         | `number`                     | -            | Current active step when controlled   |
| onValueChange | `(value: number) => void`    | -            | Callback when step changes            |
| orientation   | `"horizontal" \| "vertical"` | `"vertical"` | Timeline layout direction             |
| className     | `string`                     | -            | Additional CSS classes                |

### TimelineItem Props

| Prop      | Type     | Default | Description               |
| --------- | -------- | ------- | ------------------------- |
| step      | `number` | -       | Step number for this item |
| className | `string` | -       | Additional CSS classes    |

### TimelineIndicator Props

| Prop      | Type      | Default | Description            |
| --------- | --------- | ------- | ---------------------- |
| asChild   | `boolean` | `false` | Use as slot component  |
| className | `string`  | -       | Additional CSS classes |

### TimelineDate Props

| Prop      | Type      | Default | Description            |
| --------- | --------- | ------- | ---------------------- |
| asChild   | `boolean` | `false` | Use as slot component  |
| className | `string`  | -       | Additional CSS classes |

### TimelineHeader, TimelineTitle, TimelineContent, TimelineSeparator Props

All extend `React.HTMLAttributes <HTMLDivElement> ` (except TimelineDate which extends `HTMLTimeElement`) and accept standard props plus `className`.

### Types

```typescript
type TimelineContextValue = {
  activeStep: number;
  setActiveStep: (step: number) => void;
  orientation: "horizontal" | "vertical";
};
```

## Behavior

- Interactive timeline with context-based state management for active step tracking
- Supports both controlled (value/onValueChange) and uncontrolled (defaultValue) modes
- Automatically highlights completed steps based on current active step
- Responsive design with horizontal and vertical orientation support
- Semantic HTML5 structure with proper ARIA attributes
- Flexible composition with multiple sub-components for custom layouts

**Variants**: vertical (default), horizontal layout options
**Sizes**: Responsive design adapts to screen size
**Orientation**: Controls layout direction and indicator positioning

**Key Guidelines**:

- Use TimelineItem components with unique step numbers for proper state tracking
- Combine sub-components to create custom timeline layouts
- Leverage the context system for interactive timeline experiences
- Orientation affects layout of indicators, separators, and content positioning

## Component Code

```tsx
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
```

---

# Toaster

_Source: packages/ui/src/content/docs/components/Toaster/Toaster.mdx_

## Component Information

**Name:** Toaster

**Description:** Global toast notification system for displaying success, error, and info messages with automatic positioning and animations

## Imports

```javascript
import { useEffect, useMemo } from "react";

import { useDevice } from "@muatmuat/hooks/use-device";
import { cn } from "@muatmuat/lib/utils";
import { toast } from "@muatmuat/ui/Toaster";
import { Portal } from "@radix-ui/react-portal";
import { cva } from "class-variance-authority";

import { ToasterPreview } from "../../preview/Toaster.preview";
import { IconComponent } from "../IconComponent";
import { useToastStore } from "./toastStore";
```

## Overview

**Description:** Global toast notification system for displaying success, error, and info messages with automatic positioning and animations

**Component:** Toaster

## Usage

> **⚠️ Important Note**: Do not use the `<Toaster />` component directly in your pages. The Toaster component is already included in the application layout and will render automatically. Instead, use the `toast` utility functions to trigger notifications.

<ToasterPreview />

```jsx
// Success notification (most common)
toast.success("Order placed successfully!");

// Error notification
toast.error("Payment failed. Please try again.");

// Info notification (rarely used)
toast.info("New features available in settings.");

// With custom duration (default is 6000ms)
toast.success("Processing complete", { duration: 3000 });

// With custom position (default is bottom)
toast.error("Critical error occurred", { position: "top" });
```

## API Reference

### Toast Functions

| Function        | Parameters                              | Description                                        |
| --------------- | --------------------------------------- | -------------------------------------------------- |
| `toast.success` | `message: string, config?: ToastConfig` | Displays a success notification with green styling |
| `toast.error`   | `message: string, config?: ToastConfig` | Displays an error notification with red styling    |
| `toast.info`    | `message: string, config?: ToastConfig` | Displays an info notification with blue styling    |

### ToastConfig

| Property   | Type                | Default    | Description                       |
| ---------- | ------------------- | ---------- | --------------------------------- |
| `duration` | `number`            | `6000`     | Auto-dismiss time in milliseconds |
| `position` | `"top" \| "bottom"` | `"bottom"` | Vertical position on screen       |

### Toaster Component Props

> **Note**: The Toaster component is typically used once at the app root level and configured through layout settings.

| Prop           | Type                         | Default       | Description                                       |
| -------------- | ---------------------------- | ------------- | ------------------------------------------------- |
| `className`    | `string`                     | `undefined`   | Additional CSS classes for toast containers       |
| `variant`      | `"muattrans" \| "muatparts"` | `"muattrans"` | Layout variant affecting positioning styles       |
| `appearance`   | `ToasterAppearance`          | `undefined`   | Custom wrapper styling configuration              |
| `bottomOffset` | `string \| null`             | `undefined`   | Custom bottom offset for bottom-positioned toasts |

### Types

```typescript
interface ToastConfig {
  duration?: number;
  position?: "top" | "bottom";
}

interface ToasterAppearance {
  wrapperClassName?: string;
}

interface ToasterProps {
  className?: string;
  variant?: "muattrans" | "muatparts";
  appearance?: {
    wrapperClassName?: string;
  };
  bottomOffset?: string | null;
}
```

## Behavior

- Displays contextual messages with semantic styling and appropriate icons
- Supports automatic positioning with responsive layout (mobile vs desktop)
- Applies smooth enter/leave animations with staggered timing for multiple toasts
- Enforces maximum of 3 concurrent toasts with automatic queue management
- Calculates intelligent bottom offsets to avoid UI elements (footer, help buttons)
- Provides accessible markup with proper ARIA labels and live regions
- Automatically dismisses after configurable duration with manual close option
- Maintains responsive width (full on mobile, fixed on desktop)

**Variants**: muattrans (default positioning for Muattrans app), muatparts (alternative positioning for Muatparts app)
**Positions**: top (top of screen), bottom (bottom of screen, default)
**Types**: success (green styling), error (red styling), info (blue styling)

**Key Guidelines**:

- Use `toast.success()` for successful actions and confirmations
- Use `toast.error()` for failures and validation errors
- Use `toast.info()` sparingly for neutral informational messages
- Keep messages concise and actionable
- Do not manually import or render the `<Toaster />` component
- Toasts automatically stack and manage their lifecycle

## Component Code

```tsx
const toasterVariants = cva(
  // Base classes
  "pointer-events-none fixed left-0 z-[51] flex w-full flex-col gap-2 px-4 md:left-auto md:w-fit md:items-end md:px-0",
  {
    variants: {
      variant: {
        "muattrans-top": "top-[116px] md:right-6",
        "muattrans-bottom": "md:right-12",
        "muatparts-top": "top-6 md:right-6",
        "muatparts-bottom": "top-3/4 md:right-12",
      },
    },
    defaultVariants: {
      variant: "muattrans-bottom",
    },
  }
);

const toastVariants = cva(
  // Base classes
  "pointer-events-auto flex h-[48px] w-full items-center justify-between gap-3 rounded-lg border px-3 text-xs font-semibold leading-[1.2] tracking-tight text-neutral-900 md:w-[440px]",
  {
    variants: {
      type: {
        success: "border-success-400 bg-success-50",
        error: "border-error-400 bg-error-50",
        info: "border-info-400 bg-info-50",
      },
      animation: {
        enter: "animate-enter",
        leave: "animate-leave",
      },
    },
    defaultVariants: {
      type: "success",
      animation: "enter",
    },
  }
);

export interface ToasterProps {
  className?: string;
  variant?: "muattrans" | "muatparts";
  appearance?: {
    wrapperClassName?: string;
  };
  bottomOffset?: string | null;
}

/**
 * Toaster component renders a global toast notification container with responsive positioning.
 * Displays success and error messages with smooth animations and accessibility support.
 * Should be placed once at the app root level to handle notifications throughout the application.
 */

export const Toaster: React.FC<ToasterProps> = ({
  className,
  variant = "muattrans",
  appearance,
  bottomOffset,
}) => {
  const dataToast = useToastStore((state) => state.dataToast);
  const { removeToast, removeAll } = useToastStore((state) => state.actions);
  const { isMobile, mounted } = useDevice();

  const calculatedBottomOffset = useMemo(() => {
    // Getting the right offset for the toast
    // 29px is the position of Pusat Bantuan Icon
    // 70px is the height of Pusat Bantuan Icon
    // 69px is the offset from the Pusat Bantuan Icon
    if (!isMobile) return "calc(29px + 70px + 14px)";

    // Getting the height of the responsive footer
    const footerHeight =
      document.getElementById("responsive-footer")?.clientHeight || 0;

    return `calc(20px + ${footerHeight}px)`;

    // dataToast must be added to the dependency array, so we can recalculate the offset when the toast is added or removed
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile, dataToast]);

  // Separate toasts by position
  const topToasts = dataToast.filter((toast) => toast.position === "top");
  const bottomToasts = dataToast.filter(
    (toast) => !toast.position || toast.position === "bottom"
  );

  useEffect(() => {
    return () => {
      removeAll();
    };
  }, [removeAll]);

  if (!mounted) return null;

  const renderToast = (toast: any, index: number) => (
    <div
      key={toast.id}
      className={cn(
        toastVariants({
          type: toast.type,
          animation: toast.isLeaving ? "leave" : "enter",
        }),
        className
      )}
      style={{
        animationDelay: toast.isLeaving ? "0ms" : `${index * 150}ms`,
      }}
      role="alert"
      aria-live="polite"
    >
      <div className="flex flex-1 items-center gap-3">
        <div className="flex-shrink-0">
          <IconComponent
            src={
              toast.type === "success"
                ? "/icons/toast-succes.svg"
                : toast.type === "error"
                  ? "/icons/toast-error.svg"
                  : "/icons/toast-info.svg"
            }
            className={cn(
              toast.type === "success"
                ? "text-success-400"
                : toast.type === "error"
                  ? "text-error-400"
                  : "text-info-400"
            )}
            height={18}
            width={18}
            aria-hidden="true"
          />
        </div>
        <span className="flex-1"> {toast.message} </span>
      </div>
      <button
        onClick={() => removeToast(toast.id)}
        className="flex size-6 cursor-pointer items-center justify-center rounded-full transition-colors hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-black/10"
        aria-label="Close notification"
      >
        <IconComponent
          src="/icons/toast-close.svg"
          height={16}
          width={16}
          className="text-neutral-700"
        />
      </button>
    </div>
  );

  return (
    <Portal>
      {/* Top positioned toasts */}
      {topToasts.length > 0 && (
        <div
          className={cn(
            toasterVariants({ variant: `${variant}-top` }),
            appearance?.wrapperClassName
          )}
          role="region"
          aria-label="Top notifications"
        >
          {topToasts.map((toast, index) => renderToast(toast, index))}
        </div>
      )}

      {/* Bottom positioned toasts */}
      {bottomToasts.length > 0 && (
        <div
          className={cn(
            toasterVariants({ variant: `${variant}-bottom` }),
            appearance?.wrapperClassName
          )}
          style={{
            bottom:
              bottomOffset !== undefined
                ? bottomOffset
                : calculatedBottomOffset,
          }}
          role="region"
          aria-label="Bottom notifications"
        >
          {bottomToasts.map((toast, index) => renderToast(toast, index))}
        </div>
      )}
    </Portal>
  );
};
```

---

# InfoTooltip

_Source: packages/ui/src/content/docs/components/Tooltip/InfoTooltip.mdx_

## Component Information

**Name:** InfoTooltip

**Description:** Accessible tooltip component for displaying additional information on hover or focus

## Imports

```javascript
import React from "react";

import { Info } from "@muatmuat/icons";
import { cn } from "@muatmuat/lib/utils";
import { InfoTooltip } from "@muatmuat/ui/Tooltip";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

import { InfoTooltipPreview } from "../../preview/InfoTooltip.preview";
```

## Overview

**Description:** Accessible tooltip component for displaying additional information on hover or focus

**Component:** InfoTooltip

## Usage

<InfoTooltipPreview />

```jsx

// Basic tooltip with default icon
<InfoTooltip>
  This is helpful information that appears on hover.
</InfoTooltip>

// Custom trigger element
<InfoTooltip trigger={ <button> Help </button> }>
  Custom tooltip content with detailed explanation.
</InfoTooltip>

// Custom icon and positioning
<InfoTooltip
  icon="/icons/warning.svg"
  side="right"
  align="start"
  sideOffset={12}
>
  Warning information positioned to the right.
</InfoTooltip>

// Complex content
<InfoTooltip>
  <div className="space-y-2">
    <h4 className="font-semibold"> Quick Guide </h4>
    <ul className="list-disc list-inside text-sm">
      <li> First step description </li>
      <li> Second step description </li>
      <li> Third step description </li>
    </ul>
  </div>
</InfoTooltip>

// Using render prop instead of children
<InfoTooltip
  render={
    <div className="p-3">
      <h4 className="font-semibold mb-2"> Using Render Prop </h4>
      <p className="text-sm"> Content provided via render prop. </p>
    </div>
  }
/>
```

## API Reference

### Props

| Prop       | Type                                     | Default                                 | Description                                 |
| ---------- | ---------------------------------------- | --------------------------------------- | ------------------------------------------- |
| trigger    | `React.ReactNode`                        | `null`                                  | Custom trigger element (button, span, etc.) |
| icon       | `string`                                 | `"/icons/info16.svg"`                   | Icon path for default trigger               |
| side       | `"top" \| "right" \| "bottom" \| "left"` | `"top"`                                 | Preferred side of tooltip placement         |
| align      | `"center" \| "start" \| "end"`           | `"center"`                              | Alignment of tooltip relative to trigger    |
| sideOffset | `number`                                 | `8`                                     | Distance in pixels from trigger             |
| className  | `string`                                 | `""`                                    | Additional CSS classes for tooltip content  |
| appearance | `InfoTooltipAppearance`                  | `{ iconClassName: "text-neutral-600" }` | Icon appearance configuration               |
| children   | `React.ReactNode`                        | `undefined`                             | Tooltip content (alternative to render)     |
| render     | `React.ReactNode`                        | `undefined`                             | Tooltip content (alternative to children)   |

### Types

```typescript
interface InfoTooltipAppearance {
  iconClassName?: string;
}

interface InfoTooltipProps {
  trigger?: React.ReactNode;
  icon?: string;
  side?: "top" | "right" | "bottom" | "left";
  align?: "center" | "start" | "end";
  sideOffset?: number;
  className?: string;
  appearance?: InfoTooltipAppearance;
  children?: React.ReactNode;
  render?: React.ReactNode;
}
```

## Behavior

- Built on Radix UI Tooltip primitive for accessibility and proper behavior
- Automatic positioning with fallback to ensure tooltip stays in viewport
- Hover and focus triggers for mouse and keyboard accessibility
- Customizable trigger with either default icon or custom React element
- Support for complex tooltip content including headings, lists, and formatted text
- Responsive sizing with max-width constraints (280px mobile, 336px desktop)
- Automatic dismissal on escape key and outside click
- Proper ARIA attributes and screen reader support
- 100ms delay duration to prevent accidental triggering during rapid mouse movement

## Component Code

```tsx
interface InfoTooltipAppearance {
  iconClassName?: string;
}

interface InfoTooltipProps {
  trigger?: React.ReactNode;
  icon?: string;
  side?: "top" | "right" | "bottom" | "left";
  align?: "center" | "start" | "end";
  sideOffset?: number;
  className?: string;
  appearance?: InfoTooltipAppearance;
  children?: React.ReactNode;
  render?: React.ReactNode;
}

export const InfoTooltip: React.FC<InfoTooltipProps> = ({
  // You can pass a custom trigger element like a <button> or <span>
  trigger = null,
  // Or you can just pass an icon path to use the default trigger
  icon = "/icons/info16.svg",
  side = "top",
  align = "center",
  sideOffset = 8,
  className,
  appearance = {
    iconClassName: "text-neutral-600",
  },
  children,
  render,
}) => {
  return (
    <TooltipPrimitive.Provider delayDuration={100}>
      <TooltipPrimitive.Root>
        {/* <TooltipPrimitive.Root open={true}> */}
        <TooltipPrimitive.Trigger asChild>
          {trigger ? (
            trigger
          ) : (
            <button
              className={cn(
                "inline-flex items-center justify-center",
                appearance.iconClassName
              )}
            >
              <Info width={16} height={16} />
            </button>
          )}
        </TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            side={side}
            align={align}
            sideOffset={sideOffset}
            className={cn(
              "z-20 max-w-[280px] rounded-lg border bg-white p-3 text-xs font-medium shadow-md md:max-w-[336px]",
              className
            )}
          >
            {children || render}
            <TooltipPrimitive.Arrow className="fill-white" />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
};
```

<!-- Generated by merge-mdx-docs.js -->
