# React Code Generation Guidelines

**AI Agent Instructions for Generating React Code from Figma Design**

These guidelines provide a structured approach for AI agents to generate high-quality, maintainable React code from Figma design. The focus is on adhering to design specifications, following React best practices, leveraging existing components, and ensuring code reusability and consistency.

## Role and Objectives

As a senior React developer AI agent, your primary objectives are to:

- **Translate Figma designs** into pixel-perfect, functional React components and pages.
- **Ensure code quality** by adhering to React best practices, maintaining consistency, and promoting reusability.
- **Follow provided guidelines** to produce clean, modular, and maintainable code that aligns with the project's architecture.
- **Automatically generate SWR service files** for any design containing dynamic data, following the mandatory Data-Driven Component Generation process.
- **Leverage existing components** whenever possible to maintain consistency and reduce development time.

---

## 🚨 Master Rules: Critical Safety & Prohibitions

**READ THESE RULES FIRST - They override all other instructions.**

### 1. ❌ FORBIDDEN: Card Component

**Card component is STRICTLY BANNED** due to consistent misuse patterns. Always use html element instead.

```jsx
// ✅ CORRECT - Using html element for card layouts
<div className="rounded-lg border border-neutral-100 bg-white p-4 shadow-sm">
  <div className="mb-3 flex items-center justify-between">
    <h3 className="text-base font-semibold text-neutral-900">Card Title</h3>
  </div>
  <div className="text-sm text-neutral-600">Card content goes here</div>
</div>
```

### 2. 🔒 MANDATORY: SWR Services for Dynamic Data

Any design with dynamic data (lists, profiles, dashboards, grids) **requires immediate SWR service file generation** before implementing the component. See "SWR Data-Driven Component Generation" section for details.

### 3. 🚫 PROHIBITED: Template Strings in className

**NEVER use template strings for className construction.** Always use the `cn` helper for conditional classes.

```jsx
// ❌ WRONG
<div className={`flex ${isActive ? 'bg-blue' : 'bg-gray'}`}>

// ✅ CORRECT
<div className={cn('flex', isActive ? 'bg-blue' : 'bg-gray')}>
```

### 4. 🖼️ REQUIRED: ImageComponent Only

**NEVER use** plain HTML `<img>` tags or `next/image`. **ALWAYS use** `<ImageComponent/>` from `@muatmuat/ui/ImageComponent`.

### 5. 📸 REQUIRED: Placeholder Images

All images must use `https://picsum.photos/{width}?random={uniqueId}` immediately for instant rendering.

### 6. ✅ MANDATORY: 3-Step Component Selection Protocol

**NEVER skip these steps for ANY component:**

1. **Functional Match**: Read `component-descriptions.json` → Does purpose match design?
2. **Visual Test**: Open `ComponentName.stories.jsx` → Compare with design (background, borders, shape, structure)
3. **API Check**: Review component code → Verify props and imports match requirements

**Result**: Use component ONLY if ALL THREE steps pass, otherwise fallback to primitives.

### 7. 📝 MANDATORY: React Hook Form + Valibot

All forms with submission pathways **must use** React Hook Form + Valibot for validation. No exceptions.

### 8. 🔤 MANDATORY: JavaScript by Default (No TypeScript)

**ALWAYS generate JavaScript code (.jsx files) with JSDoc for type annotations.** TypeScript should ONLY be used when explicitly requested by the user.

**Key Points**:

- Use `.jsx` file extensions (not `.tsx`)
- Use JSDoc comments for type definitions and prop types
- Only generate TypeScript when user explicitly asks for it
- Keep type safety through JSDoc annotations

## Table of Contents

1. [Quick Start Guide for AI Agents](#quick-start-guide-for-ai-agents)
2. [Component Development Guidelines](#component-development-guidelines)
3. [SWR Data-Driven Component Generation](#swr-data-driven-component-generation)
4. [Component Selection & Usage](#component-selection-usage)
5. [Layout & Styling Guidelines](#layout-styling-guidelines)
6. [Form Implementation Patterns](#form-implementation-patterns)
7. [Internationalization (i18n)](#internationalization-i18n)
8. [Code Quality & Best Practices](#code-quality-best-practices)

---

## Quick Start Guide for AI Agents

<a id="quick-start-guide-for-ai-agents"></a>

### Essential Workflow Checklist

**Step 1: Analyze Design**

- Identify dynamic data patterns → Generate SWR service if needed (see [SWR Data-Driven Component Generation](#swr-data-driven-component-generation))
- Look for zoomable images → Implement LightboxPreview (see [Lightbox Implementation](#lightbox-implementation))
- Check for form inputs → Use React Hook Form + Valibot pattern (see [Form Implementation Patterns](#form-implementation-patterns))
- Note any internationalization needs → Use useTranslation hook (see [Internationalization](#internationalization-i18n))

**Step 2: Component Selection**

Follow the mandatory 3-Step Verification Protocol (see Master Rules #6):

1. **Functional Match**: Read `component-descriptions.json` for component purpose
2. **Visual Test**: Open `ComponentName.stories.jsx` - compare with design
3. **API Check**: Verify props and imports match requirements
4. **Result**: Use ONLY if ALL THREE steps pass, otherwise fallback to primitives

See [Component Selection & Usage](#component-selection-usage) for detailed guidance.

**Step 3: Code Generation**

- **ALWAYS use JavaScript (.jsx) with JSDoc** - TypeScript only if explicitly requested (see Master Rule #8)
- Use functional components with hooks
- Follow Tailwind v3 utilities only (no invented variants)
- Implement proper error handling and loading states
- Apply semantic HTML and accessibility practices
- Follow all Master Rules (Card prohibition, ImageComponent requirement, className rules, etc.)

**Step 4: Final Validation**

- All Master Rules followed (no template strings, ImageComponent used, etc.)
- All images have proper alt text and placeholder URLs
- Form validation uses Valibot with explicit error messages
- Component follows naming conventions and import patterns
- SWR service generated for any dynamic data

## Component Development Guidelines

<a id="component-development-guidelines"></a>

### Figma-First Approach

- **Adhere to Figma Specifications**: Implement layouts, sizes, colors, and typography exactly as specified in the Figma design and exported CSS

- **Pixel-Perfect Implementation**: Ensure the rendered UI matches the design down to the pixel, paying attention to spacing, alignment, and visual details

- **Tailwind CSS**: Use Tailwind CSS classes from `tailwind.config.mjs` for styling. Avoid inline styles or custom `.scss` files unless explicitly required

- **Automatic Service Generation**: **MANDATORY** - When the design contains dynamic data (lists, user profiles, dashboards, etc.), immediately generate a corresponding SWR service file before implementing the component, following the Data-Driven Component Generation guidelines

### Component Decomposition and Reusability

- **Identify Patterns**: Analyze the Figma design for repeating UI elements (e.g., cards, lists, buttons) and extract them into reusable components

- **Search Existing Components**: **Before creating a new component**, check the [Component Selection & Usage](#component-selection-usage) section and the `src/components` directory for existing components that match the design

- **Modular Design**: Break down complex UIs into smaller, reusable components (atoms, molecules, organisms) with single responsibilities

### Component Co-location for Page-Specific Logic

When a complex page is broken down into smaller components (ProfileHeader, UserInfoCard, etc.) that are **not intended for reuse on other pages**, these components should be defined within the same file as the main page component (e.g., `src/app/your-page/page.js`).

This approach keeps page-specific logic co-located, simplifying file structure for single-page features. A component should only be extracted into its own file in `src/components/` if it is designed to be reused across multiple, unrelated pages.

#### Example Implementation

**❌ BEFORE (Separate Files Approach):**

```jsx
import { ProfileHeader } from '@/components/company-profile/ProfileHeader';
import { CompanyInfoSection } from '@/components/company-profile/CompanyInfoSection';
// ...
// src/components/company-profile/ProfileHeader.js
export const ProfileHeader = ({ user }) => { /* ... */ };
```

**✅ AFTER (Co-located Approach):**

```jsx
"use client";

import React from "react";

import { cn } from "@muatmuat/lib/utils";
import { ImageComponent } from "@muatmuat/ui/ImageComponent";
// ... other imports
// Sub-component defined in the same file
const ProfileHeader = ({ user }) => {
  return (
    <div className="flex items-center space-x-4 p-6">
      <ImageComponent {...} />
      <div>
        <h1 className="text-2xl font-bold">{user.name}</h1>
        <p className="text-gray-600">{user.title}</p>
      </div>
    </div>
  );
};
// Main page component
const CompanyProfilePage = () => {
  const { data, isLoading, error } = useGetCompanyProfile();
  if (isLoading) return <LoadingStatic />;
  if (error) return <Alert variant="error">Failed to load profile</Alert>;
  return (
    <div className="min-h-screen bg-gray-50">
      <ProfileHeader user={data.user} />
      {/* Additional page-specific sections */}
    </div>
  );
};
export default CompanyProfilePage;
```

### Fallback to Primitives for Near Matches

If a component is functionally similar but not a 100% visual match, DO NOT force a fit. Forcing an existing component that violates the design's visual specifications (e.g., using BadgeStatus for a badge with no background) is a critical error.

The correct protocol is to "Fallback to Primitives":

- Construct the element from fundamental building blocks: div, span, icons from @muatmuat/icons, etc.

- Apply Tailwind CSS classes directly to achieve a pixel-perfect match.

**Example**: The design shows a green "Verified" status with an icon but no background.

- ❌ **Incorrect**: Using `<BadgeStatus variant="success">` because it incorrectly adds a solid green background.

- ✅ **Correct**: Constructing it from html element:

```jsx
import { Verified } from "@muatmuat/icons";

<div className="flex items-center gap-1">
  <Verified className="size-4 text-success-400" />
  <span className="text-sm font-semibold text-success-400">Verified</span>
</div>;
```

### Code Redundancy Elimination

- **Extract Repeated Logic**: Move complex or repeated logic into custom hooks (e.g., `useModalState`, `useFormValidation`)
- **Compose Components**: Build complex components by composing simpler ones to reduce duplication
- **Keep Components Focused**: Ensure each component has a single responsibility and minimal file size

**Example:**

```jsx
// ✅ Good: Reusable ProductItem component
const ProductItem = ({product}) => (
  <div key={product.id} className="p-4 border rounded">
    <h3>{product.name}</h3>
    <p>{product.price}</p>
  </div>
)
const ProductList = ({ products }) => (
  <div className="grid grid-cols-3 gap-4">
    {products.map((product) => (
      <ProductItem key={product.id} product={product} />
    ))}
  </div>
);

---
```

## SWR Data-Driven Component Generation

<a id="swr-data-driven-component-generation"></a>

Generate React components for dynamic data (lists, grids, profiles, dashboards) using this strict SWR service-layer pattern that separates data fetching from presentation.

---

## Core Workflow

Every component with dynamic content follows this 3-step pipeline:

1. **Create Service File**: Dedicated SWR service in `src/services/`
2. **Implement Component**: Consume SWR hook with proper state handling
3. **Maintain Separation**: Data logic in service layer, presentation in components

---

## Service File Templates

### Basic Service Template

**File Location**: `src/services/getResourceName.js`

```javascript
import useSWR from "swr";

import { fetcherMock } from "@/lib/axios";

const USE_MOCK = true;

export const mockAPIResult = {
  data: {
    Message: { Code: 200, Text: "SUCCESS" },
    Data: {
      // TODO: Add realistic mock data
    },
    Type: "resource-list",
  },
};

export const getResourceName = async (params) => {
  let response;
  if (USE_MOCK) {
    response = mockAPIResult;
  } else {
    // TODO: Replace with actual endpoint
    response = await fetcherMock.get("/api/resource-name", { params });
  }
  return response.data?.Data;
};

export const useGetResourceName = (params = {}) => {
  const key = params
    ? `resource-name-${JSON.stringify(params)}`
    : "resource-name";

  const { data, error, isLoading, mutate } = useSWR(
    key,
    () => getResourceName(params),
    {
      revalidateOnFocus: false,
    }
  );

  return { data, error, isLoading, mutate };
};
```

### DataTable Service Template

**File Location**: `src/services/getResourceName.ts`

```typescript
"use client";

import useSWR from "swr";

import { fetcherMock } from "@/lib/axios";

const USE_MOCK = true;

// Mock data with type inference
const mockData = [
  {
    id: "item-001",
    name: "Sample Item 1",
    // TODO: Add all fields matching API structure
  },
] as const;

type ResourceType = (typeof mockData)[number];

// Client-side operations
const sortData = (
  data: ResourceType[],
  sorting: { id: keyof ResourceType; desc: boolean }[]
) => {
  if (!sorting?.length) return data;
  const { id, desc } = sorting[0];
  return [...data].sort((a, b) => {
    const valA = a[id],
      valB = b[id];
    if (valA < valB) return desc ? 1 : -1;
    if (valA > valB) return desc ? -1 : 1;
    return 0;
  });
};

const filterData = (
  data: readonly ResourceType[],
  searchTerm?: string
): ResourceType[] => {
  if (!searchTerm) return data as ResourceType[];
  const term = searchTerm.toLowerCase();
  return data.filter((item) =>
    Object.values(item).some((val) => String(val).toLowerCase().includes(term))
  ) as ResourceType[];
};

// Main fetcher with pagination, sorting, filtering
const fetcherResource = async ({
  pagination,
  sorting,
  searchTerm,
}: {
  pagination: { pageIndex: number; pageSize: number };
  sorting: { id: keyof ResourceType; desc: boolean }[];
  searchTerm?: string;
}) => {
  let response: any;

  if (USE_MOCK) {
    await new Promise((res) => setTimeout(res, 500));

    let processedData = filterData(mockData, searchTerm);
    processedData = sortData(processedData, sorting);

    const { pageIndex, pageSize } = pagination;
    const totalItems = processedData.length;
    const totalPages = Math.ceil(totalItems / pageSize);

    response = {
      Message: { Code: 200, Text: "Success: Fetched resource data." },
      Data: {
        items: processedData.slice(
          pageIndex * pageSize,
          (pageIndex + 1) * pageSize
        ),
        pagination: {
          currentPage: pageIndex + 1,
          itemsPerPage: pageSize,
          totalItems,
          totalPages,
        },
      },
      Type: "resource-list" as const,
    };
  } else {
    response = await fetcherMock.get("/api/resource", {
      params: {
        page: pagination.pageIndex + 1,
        limit: pagination.pageSize,
        sort: sorting[0]?.id,
        order: sorting[0]?.desc ? "desc" : "asc",
        search: searchTerm,
      },
    });
  }

  return response.data;
};

export const useGetResource = ({
  pagination,
  sorting,
  searchTerm,
}: {
  pagination: { pageIndex: number; pageSize: number };
  sorting: { id: keyof ResourceType; desc: boolean }[];
  searchTerm?: string;
}) => {
  const swrKey = `resource-list-${JSON.stringify({ pagination, sorting, searchTerm })}`;
  const { data, error, isLoading } = useSWR(
    swrKey,
    () => fetcherResource({ pagination, sorting, searchTerm }),
    { revalidateOnFocus: false }
  );
  return { data: data?.Data, error, isLoading };
};

export type { ResourceType };
```

---

## Component Implementation Patterns

### Basic Component Pattern

```jsx
import { Alert } from "@muatmuat/ui/Alert";
import { LoadingStatic } from "@muatmuat/ui/Loading";

import { useGetProducts } from "@/services/getProducts";

const ProductPage = () => {
  const { data, error, isLoading } = useGetProducts();

  if (isLoading) return <LoadingStatic />;
  if (error) return <Alert variant="error">Failed to load products.</Alert>;

  return (
    <div>
      {data?.items?.map((product) => (
        // TODO: Implement item rendering
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
};
```

### DataTable Component Pattern

```tsx
import { useMemo, useState } from "react";

import { Alert } from "@muatmuat/ui/Alert";
import { DataTable } from "@muatmuat/ui/DataTable";
import { LoadingStatic } from "@muatmuat/ui/Loading";
import type { ColumnDef } from "@tanstack/react-table";

import { useGetResource } from "@/services/getResource";
import type { ResourceType } from "@/services/getResource";

const ResourcePage = () => {
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [sorting, setSorting] = useState<
    { id: keyof ResourceType; desc: boolean }[]
  >([]);
  const [searchTerm, setSearchTerm] = useState<string>();

  const { data, error, isLoading } = useGetResource({
    pagination,
    sorting,
    searchTerm,
  });

  const columns = useMemo<ColumnDef<ResourceType>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Name",
        // TODO: Add more columns
      },
    ],
    []
  );

  if (isLoading) return <LoadingStatic />;
  if (error) return <Alert variant="error">Failed to load data.</Alert>;

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm || ""}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 rounded border p-2"
      />
      <DataTable
        columns={columns}
        data={data?.items || []}
        pagination={pagination}
        onPaginationChange={setPagination}
        sorting={sorting}
        onSortingChange={setSorting}
        rowCount={data?.pagination.totalItems || 0}
      />
    </div>
  );
};
```

### ❌ Prohibited Pattern (Never Use Inline Mock Data)

```jsx
const ProductPage = () => {
  // NEVER mock data inline - violates service layer separation
  const products = [
    { id: 1, name: "Product A" },
    { id: 2, name: "Product B" },
  ];
  return (
    <div>
      {products.map((product) => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
};
```

---

## Quick Reference

### Essential Imports

```javascript
import { Alert } from "@muatmuat/ui/Alert";
import { LoadingStatic } from "@muatmuat/ui/Loading";
import useSWR from "swr";

import { fetcherMock } from "@/lib/axios";
```

### Common Hook Pattern

```javascript
const { data, error, isLoading, mutate } = useSWR(
  key,
  () => fetcherFunction(params),
  { revalidateOnFocus: false }
);
```

### Standard State Handling

```jsx
if (isLoading) return <LoadingStatic />;
if (error) return <Alert variant="error">Error message.</Alert>;
// Render success state
```

---

## Naming Conventions

- **Service File**: `getProducts.js` (verb + noun, no `use` prefix)
- **Fetcher Function**: `getProducts`
- **Hook**: `useGetProducts`
- **SWR Key**: Unique string, kebab-case (`'product-list'`). Dynamic if request uses parameters.

---

## Best Practices Checklist

### All Components

- ✅ Create dedicated service file with proper structure
- ✅ Include realistic mock data matching expected API structure
- ✅ Handle loading and error states in UI component
- ✅ Use descriptive, unique SWR keys for caching
- ✅ Keep all data logic in service layer
- ✅ Ensure components remain presentation-only
- ✅ Follow naming conventions consistently

### DataTable Components (Additional)

- ✅ Use `as const` on mock data for proper type inference
- ✅ Implement client-side operations in service layer
- ✅ Structure mock response to match real API pagination format
- ✅ Include pagination metadata (currentPage, totalItems, totalPages)
- ✅ Use proper TypeScript types for sorting parameters
- ✅ Ensure search filtering is case-insensitive across relevant fields

---

## Component Selection & Usage

<a id="component-selection-usage"></a>

### 3-Step Component Selection Protocol

This protocol is detailed in Master Rules #6. Follow these steps for EVERY component:

1. **Functional Match**: Read `component-descriptions.json` → Does purpose match design?
2. **Visual Test**: Open `ComponentName.stories.jsx` → Compare with design (background, borders, shape, structure)
3. **API Check**: Review the related component code → Verify props and imports

**Result**: Use component ONLY if ALL THREE steps pass, otherwise fallback to primitives.

### Component Reference Access

**AI Agents**: Find and read `component-descriptions.json` in the current project:

- Search pattern: `component-descriptions.json`
- Search scope: Entire current project/workspace
- Contains: Component purposes, critical rules, anti-patterns, usage constraints

**⚠️ CRITICAL**: This JSON file is the **ONLY source of truth** for component information.

### Quick Reference: Common Component Selections

When you need to select components, use this quick reference to identify candidates:

**Status Indicators**:

- Badge with background → `BadgeStatus`
- Status text without background → Use primitives (`div` + icons from `@muatmuat/icons` + `span`)
- Filter tags → `TagBubble`
- Notification count → `NotificationCount`

**Forms & Inputs**:

- Standard text input → `Input`
- Dropdown selection → `Select`
- Date selection → `Calendar`
- Multi-select filtering → `FilterDropdown`

**Modals & Overlays**:

- General modal → `Modal`
- Confirmations → `ConfirmationModal`
- Mobile bottom sheet → `BottomSheet`
- Information display → `InfoTooltip`

**Media & Assets**:

- All images → `ImageComponent` (see Master Rules #4)
- Zoomable images → `LightboxProvider` + `LightboxPreview`
- Maps → `MapContainer`

### Specialized Components

**Maps**: Use `MapContainer` for location selection, coordinate display, interactive markers
**Lightbox**: Implement for zoomable images with `LightboxProvider` + `LightboxPreview`

### Common Mistakes to Avoid

- **Import Errors**: Check `index.js` for correct exports before importing

  ```jsx
  // ❌ WRONG - Assuming component exists
  import { Badge } from "@muatmuat/ui/Badge";
  // Badge doesn't exist!

  // ✅ CORRECT - Check index.js first
  import { BadgeStatus, TagBubble } from "@muatmuat/ui/Badge";
  ```

- **Props Hallucination**: Always verify actual props in component code, don't invent them

  ```jsx
  import { Edit } from "@muatmuat/icons";

  // ❌ WRONG - Making up props
  <Edit name="icon-edit" /> // No 'name' prop exists!

  // ✅ CORRECT - Icons accept standard SVG props like className
  <Edit className="h-4 w-4 text-primary-500" />
  ```

- **Visual Mismatches**: If ANY visual difference exists, use primitives
  - Don't force-fit components that don't match the design
  - Fallback to primitives when in doubt
  - See Master Rules #1 for Card component prohibition

### Correct Research Process Example

1. **Need**: Status badge → Check Badge components
2. **Verify**: Read `component-descriptions.json` → Check purpose and constraints
3. **Visual Test**: Open `Badge.stories.jsx` → Compare with design
4. **API Check**: Review component code → Confirm props and imports
5. **Implement**: `<BadgeStatus variant="success">Completed</BadgeStatus>`

## Layout & Styling Guidelines

<a id="layout-styling-guidelines"></a>

### Core Layout Patterns

#### Scrollable Flex Containers

**Pattern**: Apply this trio for scrollable regions inside flex columns:

1. `max-h-[...]` or `h-[...]` — establishes vertical boundary
2. `overflow-y-auto` — enables scrolling when content exceeds boundary
3. `min-h-0` — allows element to shrink and respect boundary

**Example**:

```jsx
// ✅ Correct scrollable flex container
<div className="flex h-[400px] flex-col border">
  <div className="flex-shrink-0 border-b p-4">Fixed Header</div>
  <div className="max-h-full min-h-0 overflow-y-auto">
    <div className="space-y-3 p-4">...very long content...</div>
  </div>
  <div className="flex-shrink-0 border-t p-4">Fixed Footer</div>
</div>
```

**Key Reminders**:

- Use `flex-shrink-0` on headers/footers to prevent shrinking
- Apply to every scrollable flex child
- Consider pagination/virtualization for very large lists (≈1000+ items)

### TailwindCSS Usage Guidelines

- Use official Tailwind v3 utilities only (no invented variants)
- Group utilities logically: layout → spacing → color → typography → state
- Arbitrary values allowed for custom Figma metrics (`h-[312px]`)
- Use `cn` helper for conditional class composition

#### Grid vs Flexbox Decision

**Core Principle**:

- **Flexbox** for 1D layouts (single row OR single column)
- **Grid** for 2D layouts (rows AND columns simultaneously)

**Grid Crossover Rule**: Use Grid over Flexbox when design specifies explicit, distinct widths for direct children.

**Example**:

```jsx
// ✅ Preferred (Grid) for explicit widths
<div className="grid grid-cols-[250px_456px_1fr] items-center gap-[72px]">
  <div>{/* Logo */}</div>
  <div>{/* Title */}</div>
  <div className="flex justify-end">{/* Buttons */}</div>
</div>
```

### Muatparts Design System Reference (Tailwind Map)

#### 🤖 Core Rules

1. **NO ARBITRARY VALUES:** ALWAYS use predefined tokens (e.g., `bg-primary-500`, `text-sm`, `h-6`). NEVER use arbitrary values (e.g., `bg-[#008fff]`, `text-[14px]`, `h-[24px]`) _if a token exists_.
2. **SEMANTIC COLORS:** Prioritize semantic tokens (`success-*`, `error-*`, `primary-*`) using the full palette below.
3. **TYPOGRAPHY SCALE:** STRICTLY adhere to the `text-*` scale, _if a token exists_.
4. **GRADIENT TEXT:** Use the 3-class combo: `[gradient-class] bg-clip-text text-transparent`.

#### 📝 Typography Scale

| Font Size | Tailwind Class | Usage            |
| :-------- | :------------- | :--------------- |
| `10px`    | `text-xxs`     | Extra small text |
| `12px`    | `text-xs`      | Small text       |
| `14px`    | `text-sm`      | Body text        |
| `16px`    | `text-base`    | Base text size   |
| `18px`    | `text-lg`      | Large text       |
| `20px`    | `text-xl`      | Extra large text |
| `24px`    | `text-2xl`     | 2X large text    |
| `32px`    | `text-3xl`     | 3X large text    |

- **Font Family:** `font-sans` ("Avenir Next LT Pro", system-ui, sans-serif). You don't need to explicitly implement this class, because its alread applied in body.

#### 🎨 Color System (Full Reference)

##### Success Colors (Green Scale)

```
success-50: #e3f5ed
success-100: #bae6d1
success-200: #8cd6b5
success-300: #54c797
success-400: #0fbb81
success-500: #00af6c
success-600: #00a061
success-700: #008d54
success-800: #007c47
success-900: #005d31
```

##### Error Colors (Red Scale)

```
error-50: #ffe9ed
error-100: #ffc9ce
error-200: #f09393
error-300: #e56869
error-400: #ee4343
error-500: #f22c25
error-600: #e31f25
error-700: #d20f20
error-800: #c50018
error-900: #b5000b
```

##### Primary Colors (Blue Scale)

```
primary-50: #e2f2ff
primary-100: #b9ddff
primary-200: #7eafff
primary-300: #52b2ff
primary-400: #1aa0ff
primary-500: #008fff
primary-600: #0080ff
primary-700: #176cf7
primary-800: #1257c6
primary-900: #0c377c
```

##### Secondary Colors (Yellow Scale)

```
secondary-50: #fff8e1
secondary-100: #ffecb4
secondary-200: #ffe084
secondary-300: #ffd552
secondary-400: #ffca2e
secondary-500: #ffc117
secondary-600: #ffb311
secondary-700: #fea010
secondary-800: #fe900f
secondary-900: #fe700d
```

##### Warning Colors (Yellow/Orange Scale)

```
warning-50: #fffde6
warning-100: #fff9c1
warning-200: #fff597
warning-300: #fff06c
warning-400: #ffeb47
warning-500: #fee61a
warning-600: #ffd920
warning-700: #ffa700
warning-800: #fe900f
warning-900: #fe700d
```

##### Neutral Colors (Gray Scale)

```
neutral-50: #ffffff
neutral-100: #f5f5f5
neutral-200: #f1f1f1
neutral-300: #d9d9d9
neutral-400: #c4c4c4
neutral-500: #9d9d9d
neutral-600: #7b7b7b
neutral-700: #555555
neutral-800: #434343
neutral-900: #000000
```

##### Brand-Specific Colors

```
muat-parts-member-50: #f6e6e8
muat-parts-member-100: #eac0c3
muat-parts-member-200: #cb8683
muat-parts-member-300: #b35956
muat-parts-member-400: #b43832
muat-parts-member-500: #b02316
muat-parts-member-600: #a31a17
muat-parts-member-700: #931012
muat-parts-member-800: #86090c
muat-parts-member-900: #770000

muat-parts-non-50: #ffeaec
muat-parts-non-100: #ffcccd
muat-parts-non-200: #ef9892
muat-parts-non-300: #e47168
muat-parts-non-400: #ec5241
muat-parts-non-500: #ef4422
muat-parts-non-600: #e03923
muat-parts-non-700: #cf2e1d
muat-parts-non-800: #c22716
muat-parts-non-900: #b31b06

buyer-seller-50: #e8ebf7
buyer-seller-100: #c4cdeb
buyer-seller-200: #9daddd
buyer-seller-300: #758ccf
buyer-seller-400: #5573c5
buyer-seller-500: #325abb
buyer-seller-600: #2b52b1
buyer-seller-700: #2048a5
buyer-seller-800: #163e99
buyer-seller-900: #176cf7
```

##### Special Background Colors

```
background: #F8F8FB
foreground: #171717
```

#### 📐 Sizing, Layout & Shadows

##### Sizing & Spacing Rule

You **must** map pixel values for `padding`, `margin`, `width`, `height`, and `gap` to Tailwind's standard **$4\text{px}$ scale**.

- **Example 1:** `height: 24px;` → `h-6`
- **Example 2:** `padding: 16px;` → `p-4`
- **Example 3:** `gap: 8px;` → `gap-2`
- **Example 4:** `margin-top: 12px;` → `mt-3`
- **Exception:** Only use arbitrary value classes (e.g., `h-[27px]`) if a pixel value has **no direct match** in the $4\text{px}$ scale.

##### Custom Box Shadows

```
shadow-button: 0 -4px 6px rgba(0, 0, 0, 0.1)
shadow-button-container: 0 -8px 8px rgba(0, 0, 0, 0.05)
shadow-responsive-footer: 0px -8px 16px 2px rgba(0, 0, 0, 0.15)
shadow-muat: 0 4px 11px 0 #41414140
```

##### Custom Drop Shadows

```
drop-shadow-muat: 0 4px 11px rgba(65, 65, 65, 0.25)
```

#### 🌈 Visual Effects & Gradients

##### Custom Gradients

```
bg-plus-global-gradient: linear-gradient(90deg, #D29A00 0%, #FFD664 35%, #D09C0C 69%, #FFDA71 100%)
bg-plus-global-text-gradient: linear-gradient(61.46deg, #770000 15.08%, #BF0808 51.23%, #770000 85.97%)
bg-yellow-gradient: linear-gradient(61.46deg, #FFBC00 15.08%, #FFD14F 85.97%)
```

- **Gradient Text:** Use `bg-clip-text` and `text-transparent` with a gradient.

### Accessibility and Interaction Requirements

**Accessibility Compliance**:

- Provide meaningful `alt` text for every `LightboxPreview`
- Verify keyboard support: Enter/Space opens the lightbox; Escape closes; Arrow keys navigate multi-image sets
- Ensure focus trapping behaves as expected—test with both mouse and keyboard navigation

**Quality Requirements**:

- Supply high-resolution assets (≥2× the display dimensions) to avoid pixelation
- Respect layout spacing with Tailwind utilities (`h-*`, `w-*`, `object-cover`)
- Use responsive classes when thumbnails must adapt to different breakpoints
- Maintain consistent aspect ratios between thumbnails and full-size images

**Pre-Ship Checklist**:

- ✅ All placeholders point to `https://picsum.photos/...` with unique `?random` parameters
- ✅ `LightboxProvider` / `LightboxPreview` wrap every image flagged for zoom
- ✅ Keyboard and screen-reader interactions verified
- ✅ Any associated captions or metadata appear alongside the enlarged view when required by the design

### Common Styling Pitfalls

**🚫 PROHIBITED**: Template strings for className construction
**✅ REQUIRED**: Always use `cn` helper for conditional classes

**Other pitfalls to avoid**:

- Mixing string concatenation with `cn`
- Use && operator instead of using ternary
- Leaving conflicting utilities (`px-4` and `px-6`)
- Copying raw Figma token names that don't exist in preset
- Skipping responsive classes in design specs

## Form Implementation Patterns

<a id="form-implementation-patterns"></a>

### Activation Checklist

**Use React Hook Form + Valibot when**:

- UI contains at least one input element (`<input>`, `<textarea>`, `<select>`, file upload)
- UI exposes a primary submission pathway (typically `<button type="submit">`)

**Skip when**:

- Single uncontrolled input (search bars, filtering chips) that reacts immediately
- Validation is unnecessary beyond simple presence checks

**Reference Documentation**:

- Comprehensive Valibot documentation is available in `.claude/docs/ui-agent/valibot.txt`
- This file contains complete API reference, examples, and advanced patterns
- Agents should read this file for complex validation scenarios or syntax questions

### Base Setup

```tsx
import React from "react";

import { valibotResolver } from "@hookform/resolvers/valibot";
import { cn } from "@muatmuat/lib/utils";
import { Button } from "@muatmuat/ui/Button";
import { Input } from "@muatmuat/ui/Form";
import { TextArea } from "@muatmuat/ui/TextArea";
import { toast } from "@muatmuat/ui/Toaster";
import {
  FieldErrors,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import * as v from "valibot";
```

### Implementation Workflow

#### Step 1: Define Schema & Types

```tsx
const contactSchema = v.object({
  name: v.pipe(
    v.string("ContactForm.errorNameRequired"),
    v.nonEmpty("ContactForm.errorNameRequired")
  ),
  email: v.pipe(
    v.string("ContactForm.errorEmailRequired"),
    v.nonEmpty("ContactForm.errorEmailRequired"),
    v.email("ContactForm.errorEmailInvalid")
  ),
});

type ContactFormData = v.InferOutput<typeof contactSchema>;
```

**Critical**: Add explicit messages to ALL validation rules. `v.string()` validates against `null/undefined`, while `v.nonEmpty()` validates against empty strings - both need the same message.

#### Step 2: Build Component

```tsx
const ContactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: valibotResolver(contactSchema),
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<ContactFormData> = async (data) => {
    console.log("Contact form submitted", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="Name"
        placeholder="Enter your name"
        error={errors.name?.message}
        {...register("name")}
      />
      <Input
        label="Email"
        placeholder="Enter your email"
        error={errors.email?.message}
        {...register("email")}
      />
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Submitting…" : "Submit"}
      </Button>
    </form>
  );
};
```

### Advanced Patterns

#### Cross-field Validation (`v.check`)

```tsx
const registrationSchema = v.pipe(
  v.object({
    password: v.pipe(
      v.string("Register.errorPasswordRequired"),
      v.minLength(8, "Register.errorPasswordTooShort")
    ),
    confirmPassword: v.pipe(
      v.string("Register.errorConfirmPasswordRequired"),
      v.nonEmpty("Register.errorConfirmPasswordRequired")
    ),
  }),
  v.check(
    ({ password, confirmPassword }) => password === confirmPassword,
    "Register.errorPasswordMismatch"
  )
);

type RegistrationFormData = v.InferOutput<typeof registrationSchema>;
```

#### Dynamic Arrays with `useFieldArray`

```tsx
const projectSchema = v.object({
  projectName: v.pipe(
    v.string("ProjectForm.errorProjectNameRequired"),
    v.nonEmpty("ProjectForm.errorProjectNameRequired")
  ),
  teamMembers: v.array(
    v.object({
      name: v.pipe(
        v.string("ProjectForm.errorMemberNameRequired"),
        v.nonEmpty("ProjectForm.errorMemberNameRequired")
      ),
      email: v.pipe(
        v.string("ProjectForm.errorMemberEmailRequired"),
        v.email("ProjectForm.errorMemberEmailInvalid")
      ),
    })
  ),
});

type ProjectFormData = v.InferOutput<typeof projectSchema>;

const ProjectForm = () => {
  const { control, register, handleSubmit } = useForm<ProjectFormData>({
    resolver: valibotResolver(projectSchema),
    defaultValues: { teamMembers: [{ name: "", email: "" }] },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "teamMembers",
  });

  const onSubmit: SubmitHandler<ProjectFormData> = async (data) => {
    console.log("Project form submitted", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="Project Name"
        placeholder="Enter project name"
        {...register("projectName")}
      />
      {fields.map((field, index) => (
        <div key={field.id} className="flex gap-3">
          <Input
            placeholder="Member name"
            {...register(`teamMembers.${index}.name`)}
          />
          <Input
            placeholder="Member email"
            {...register(`teamMembers.${index}.email`)}
          />
          <Button onClick={() => remove(index)}>Remove</Button>
        </div>
      ))}
      <Button onClick={() => append({ name: "", email: "" })}>
        Add member
      </Button>
      <Button type="submit">Create project</Button>
    </form>
  );
};
```

#### Conditional Validation with `v.variant`

Use discriminated unions when one field controls whether others are required:

```tsx
const uploadProofSchema = v.variant("isOverload", [
  v.object({
    isOverload: v.literal(false),
    proofOfLoading: v.pipe(
      v.array(v.instance(File)),
      v.minLength(1, "UploadProof.errorProofRequired")
    ),
  }),
  v.object({
    isOverload: v.literal(true),
    proofOfLoading: v.pipe(
      v.array(v.instance(File)),
      v.minLength(1, "UploadProof.errorProofRequired")
    ),
    additionalCostAgreement: v.pipe(
      v.number("UploadProof.errorAdditionalCostRequired"),
      v.minValue(1, "UploadProof.errorAdditionalCostRequired")
    ),
  }),
]);

type UploadProofFormData = v.InferOutput<typeof uploadProofSchema>;
```

### Handling Form-Level Errors with `onError` Callback

Use `onError` for form-wide validation failures (e.g., showing a toast for completely empty form submission):

```tsx
const followUpSchema = v.object({
  followUpResult: v.pipe(
    v.string("FollowUpForm.errorFollowUpResultRequired"),
    v.nonEmpty("FollowUpForm.errorFollowUpResultRequired")
  ),
  nextFollowUpEstimate: v.pipe(
    v.string("FollowUpForm.errorNextFollowUpEstimateRequired"),
    v.nonEmpty("FollowUpForm.errorNextFollowUpEstimateRequired")
  ),
  changeStatus: v.pipe(
    v.string("FollowUpForm.errorChangeStatusRequired"),
    v.nonEmpty("FollowUpForm.errorChangeStatusRequired")
  ),
});

type FollowUpFormData = v.InferOutput<typeof followUpSchema>;

interface FollowUpFormProps {
  onSubmit: (data: FollowUpFormData) => Promise<void>;
}

const FollowUpForm = ({ onSubmit: handleSuccessSubmit }: FollowUpFormProps) => {
  const {
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<FollowUpFormData>({
    resolver: valibotResolver(followUpSchema),
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<FollowUpFormData> = async (data) => {
    console.log("Form submitted:", data);
    // Handle successful form submission
    await handleSuccessSubmit(data);
  };

  const onError = (errors: FieldErrors<FollowUpFormData>) => {
    if (
      errors.followUpResult &&
      errors.nextFollowUpEstimate &&
      errors.changeStatus
    ) {
      toast.error("All fields are required.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      {/* Form fields */}
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : "Save"}
      </button>
    </form>
  );
};
```

### Internationalisation (i18n) Integration

Replace literal error strings with translation keys and translate them in components:

```tsx
import { useTranslation } from "@/hooks/use-translation";

const loginSchema = v.object({
  email: v.pipe(
    v.string("LoginForm.errorEmailRequired"),
    v.nonEmpty("LoginForm.errorEmailRequired"),
    v.email("LoginForm.errorEmailInvalid")
  ),
  password: v.pipe(
    v.string("LoginForm.errorPasswordRequired"),
    v.nonEmpty("LoginForm.errorPasswordRequired")
  ),
});

type LoginFormData = v.InferOutput<typeof loginSchema>;

const LoginForm = () => {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: valibotResolver(loginSchema),
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    console.log("Login form submitted", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        type="email"
        label={t("LoginForm.labelEmail", {}, "Email")}
        placeholder={t("LoginForm.placeholderEmail", {}, "Enter your email")}
        error={t(errors.email?.message, {}, errors.email?.message)}
        {...register("email")}
      />
      <Input
        type="password"
        label={t("LoginForm.labelPassword", {}, "Password")}
        placeholder={t(
          "LoginForm.placeholderPassword",
          {},
          "Enter your password"
        )}
        error={t(errors.password?.message, {}, errors.password?.message)}
        {...register("password")}
      />
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting
          ? t("LoginForm.buttonSigningIn", {}, "Signing in…")
          : t("LoginForm.buttonSubmit", {}, "Sign in")}
      </Button>
    </form>
  );
};
```

**Important**: Update locale JSON files with new keys: `public/mock-common-id.json`, `public/mock-common-en.json`, and `public/mock-common-cn.json`.

### Final Checklist

**Before shipping any form implementation:**

- ✅ **Activation conditions met** (true form submission flow vs uncontrolled inputs)
- ✅ **Schema mirrors the payload**; all validation rules live in Valibot
- ✅ **ALL validation rules have explicit messages** (no Valibot defaults)
- ✅ **`useForm` initialized** with `valibotResolver` and appropriate mode
- ✅ **UI pulls validation messages** from `errors.{field}.message` (translated when necessary)
- ✅ **Conditional rules use `v.variant`**; cross-field logic uses `v.check`
- ✅ **`useFieldArray` handles repeatable groups** when schema expects arrays
- ✅ **`onError` callback implemented** for form-level validation side-effects
- ✅ **Locale JSON files include** every new translation key
- ✅ **Type safety maintained** with proper TypeScript types and interfaces
- ✅ **Loading states handled** for form submission (`isSubmitting`)
- ✅ **Error boundaries considered** for robust error handling
- ✅ **Form reset implemented** where appropriate (after successful submission)
- ✅ **Accessibility standards met** for form controls and error messages

## Internationalization (i18n)

<a id="internationalization-i18n"></a>

### Overview

Systematic approach for implementing internationalization in React components by identifying hardcoded strings, creating translation keys, and generating multilingual content for Indonesian (ID), English (EN), and Chinese (ZH) languages.

### Implementation Process

#### Phase 1: String Analysis

Identify all user-facing hardcoded strings in:

- **JSX Text Nodes**: Text between JSX tags
- **Component Props**: title, label, placeholder, etc.
- **JavaScript Logic**: Error messages, alerts, notifications
- **Special Components**: InfoBottomsheet and InfoTooltip with HTML content

**🚨 IMPORTANT**: Only translate meaningful text strings that users see and understand. **DO NOT translate**:

- **`alt` props**: These should remain descriptive in English for accessibility and SEO
- **`aria-*` attributes**: These should remain in English for screen readers and accessibility tools
- **Technical identifiers**: IDs, class names, data attributes
- **URLs, file paths, or technical strings**
- **Icon names or technical references**

**Examples of what NOT to translate**:

```jsx
// ❌ DON'T translate alt text
<ImageComponent src="..." alt="Product image" /> // Keep in Original Text

// ❌ DON'T translate aria attributes
<button aria-label="Close dialog">Close</button> // Keep aria-label in Original Text

// ❌ DON'T translate technical props
<div data-testid="submit-button">Submit</div> // Keep data-testid in Original Text

// ✅ DO translate user-facing text
<button>Submit</button> // Translate "Submit"
<h1>Welcome to our app</h1> // Translate the heading
<p>Please enter your email address</p> // Translate the paragraph
```

#### Phase 2: Translation Key Generation

Create unique keys following this pattern: `ComponentName.keyDescription` (only 1 level deep)

**Key Naming Patterns**:

- Error Messages: `ComponentName.errorContextDescription`
- Form Labels: `ComponentName.labelComponentField`
- Button Text: `ComponentName.buttonActionContext`
- Navigation: `ComponentName.navSectionItem` or `ComponentName.tabSectionName`
- Titles: `ComponentName.titlePageSection`
- InfoBottomsheet: `ComponentName.infoBottomsheetContent`
- InfoTooltip: `ComponentName.infoTooltipContent`

**Examples**:

- Before: `FollowUpForm.validation.changeStatusRequired`
- After: `FollowUpForm.errorChangeStatusRequired`

- Before: `ContactForm.validation.emailRequired`
- After: `ContactForm.errorEmailRequired`

- Before: `LoginForm.label.password`
- After: `LoginForm.labelPassword`

- Before: `ProductPage.button.addToCart`
- After: `ProductPage.buttonAddToCart`

#### Phase 3: Dynamic Value Handling

Replace dynamic values with descriptive placeholders:

- Original: "Kebutuhan 3 Unit" → Processed: "Kebutuhan {number} Unit"
- Original: "Menampilkan 5 dari 20 item" → Processed: "Menampilkan {current} dari {total} item"

#### Phase 4: Component Implementation

1. Import the translation hook:

   ```jsx
   import { useTranslation } from "@/hooks/use-translation";
   ```

2. Instantiate in the component:

   ```jsx
   const { t } = useTranslation();
   ```

3. Replace all user-facing strings with t() calls, providing parameters and fallback:

   ```jsx
   {
     // Basic usage without parameters
     t("ComponentName.uniqueLabel", {}, "Original Fallback Text");
     // With parameters for string replacement
     t("ComponentName.labelWeight", { weight: 100 }, `Berat ${weight}kg`);
   }
   ```

4. **🚨 MANDATORY RULE**: **ALWAYS use the `t` function returned from `useTranslation()`**. **NEVER use `tMockFn`** when generating React code. The `tMockFn` function is only for internal component library use as a fallback when consumers don't provide a translation function.

   **Correct Implementation**:

   ```jsx
   import { useTranslation } from "@/hooks/use-translation";

   const MyComponent = () => {
     const { t } = useTranslation(); // ✅ CORRECT - Use the t function from useTranslation

     return <div>{t("MyComponent.title", {}, "Default Title")}</div>;
   };
   ```

   **❌ INCORRECT - Forbidden Usage**:

   ```jsx
   import { tMockFn } from "@muatmuat/lib/mock-t";

   const MyComponent = () => {
     return <div>{tMockFn("MyComponent.title", {}, "Default Title")}</div>; // ❌ WRONG
   };
   ```

5. **Strict Implementation**: You must import useTranslation from `@/hooks/use-translation` and use it directly. Do not generate a mock useTranslation hook inside the page component file for demonstration. Assume the hook is fully integrated.

#### Phase 5: Special Component Handling

**InfoBottomsheet Components**:

1. Minify HTML content to single line
2. Create translation key with `infoBottomsheet` prefix
3. Translate while preserving HTML tags
4. Use render prop for implementation:

```jsx
import { InfoBottomsheet } from "@muatmuat/ui/InfoBottomsheet";

import { useTranslation } from "@/hooks/use-translation";

<InfoBottomsheet
  title={t("ComponentName.titleCargoTypeDimensions", {}, "Tipe Muatan")}
  render={t(
    "ComponentName.infoBottomsheetCargoTypeDimensions",
    {},
    "<ul><li><b>Panjang:</b> Ukuran terpanjang</li></ul>"
  )}
/>;
```

**InfoTooltip Components**:
Follow same pattern as InfoBottomsheet but use `infoTooltip` prefix:

```jsx
import { InfoTooltip } from "@muatmuat/ui/InfoTooltip";

import { useTranslation } from "@/hooks/use-translation";

<InfoTooltip
  className="w-[336px]"
  side="right"
  render={t(
    "ComponentName.infoTooltipHalalLogistics",
    {},
    "<p>Centang opsi ini jika pengiriman memerlukan...</p>"
  )}
/>;
```

#### Phase 6: Output Generation

When a component using useTranslation is generated, you must also generate the following three mock JSON files as SEPARATE files. DO NOT put it in the page as comments EVER!:

1. `public/mock-common-id.json` (Indonesian)
2. `public/mock-common-en.json` (English)
3. `public/mock-common-cn.json` (Chinese)

These files will contain all translation keys identified in Phase 2, with their respective translations.

**Example File Generation**:

`public/mock-common-id.json`:

```json
{
  "CompanyProfilePage.labelEmail": "Email",
  "CompanyProfilePage.badgeVerified": "Terverifikasi"
}
```

`public/mock-common-en.json`:

```json
{
  "CompanyProfilePage.labelEmail": "Email",
  "CompanyProfilePage.badgeVerified": "Verified"
}
```

`public/mock-common-cn.json`:

```json
{
  "CompanyProfilePage.labelEmail": "邮箱",
  "CompanyProfilePage.badgeVerified": "已验证"
}
```

### Complete Example

**Before**:

```jsx
import { Tabs } from "@muatmuat/ui/Tabs";
import { TabsTrigger } from "@muatmuat/ui/Tabs";

<Tabs>
  <TabsTrigger value="ringkasan">Ringkasan</TabsTrigger>
</Tabs>;
```

**After**:

```jsx
import { cn } from "@muatmuat/lib/utils";
import { Tabs } from "@muatmuat/ui/Tabs";
import { TabsTrigger } from "@muatmuat/ui/Tabs";

import { useTranslation } from "@/hooks/use-translation";

const Component = () => {
  const { t } = useTranslation();
  const weightValue = 100;
  return (
    <div>
      <Tabs>
        <TabsTrigger value="ringkasan">
          {t("DetailPesananScreen.tabRingkasan", {}, "Ringkasan")}
        </TabsTrigger>
      </Tabs>
      {/* Example with parameter */}
      <div>
        {t(
          "ComponentName.labelWeight",
          { weight: weightValue },
          `Berat ${weightValue}kg`
        )}
      </div>
    </div>
  );
};
export default Component;
```

The three JSON files will be automatically generated with all translation keys as shown in Phase 6 examples above.

## Code Quality & Best Practices

<a id="code-quality-best-practices"></a>

### Core Principles

These principles guide all code generation and decision-making:

1. **Design Fidelity** – Treat Figma designs and exported CSS as the single source of truth for visual specifications.
2. **Reusability** – Prioritise existing components and create new ones only when necessary, ensuring modularity and consistency.
3. **Maintainability** – Write clean, readable code with clear separation of concerns and minimal redundancy.
4. **Best Practices** – Follow modern React conventions, including functional components, hooks, and appropriate state management.
5. **Data-Driven Architecture** – Generate SWR service files for any design containing dynamic data to keep data fetching separate from presentation.
6. **JavaScript by Default** – Always generate JavaScript (.jsx) with JSDoc annotations unless TypeScript is explicitly requested.

---

### Language & File Extensions

**🚨 CRITICAL RULE: JavaScript by Default**

**ALWAYS generate JavaScript code (.jsx files) with JSDoc for type annotations.** TypeScript should ONLY be used when explicitly requested by the user.

**Why JavaScript with JSDoc?**

- Maintains type safety without TypeScript complexity
- Easier for junior developers to understand
- No build step complications
- Still provides IntelliSense and type checking in modern IDEs

**Key Rules**:

- Use `.jsx` file extensions (not `.tsx`)
- Add JSDoc `@typedef` for complex type definitions
- Document function parameters with `@param`
- Only generate TypeScript when user explicitly requests it

---

### File & Component Structure

**Component Organization**:

- Use functional components with hooks; export main component as default export
- Import order: React → third-party libraries → project-level modules → local files
- Co-locate page-specific subcomponents; extract only reusable primitives to `src/components`
- Keep helpers/utilities as named exports for tree-shaking

**Example**:

```jsx
import React, { useEffect, useState } from "react";

import { cn } from "@muatmuat/lib/utils";
import { Button } from "@muatmuat/ui/Button";

import { useTranslation } from "@/hooks/use-translation";

const ExampleCard = ({ title }) => {
  const { t } = useTranslation();
  const [value, setValue] = useState("");

  return (
    <section className="rounded-xl border border-neutral-200 bg-white p-6">
      <h2 className="text-lg font-semibold text-neutral-900">{t(title)}</h2>
      <Button className="mt-4">{t("actions.save", {}, "Save")}</Button>
    </section>
  );
};

export default ExampleCard;
```

### Naming Conventions

| Item              | Style                                             | Example                                         |
| ----------------- | ------------------------------------------------- | ----------------------------------------------- |
| Components        | PascalCase                                        | `UserProfile`, `ModalFooter`                    |
| Files             | PascalCase for components, route-driven for pages | `UserProfile.jsx`, `src/app/dashboard/page.jsx` |
| Hooks / functions | camelCase                                         | `useFetchOrders`, `handleSubmit`                |
| Variables         | camelCase                                         | `orderTotal`, `isLoading`                       |
| Constants         | UPPER_SNAKE_CASE                                  | `MAX_FILE_SIZE`, `API_BASE_URL`                 |

### Import Sources

- **UI primitives**: `@muatmuat/ui/*`
- **Icons**: `@muatmuat/icons`
- **Shared hooks**: `@muatmuat/hooks/*`
- **Utilities/services**: `@muatmuat/lib/*` or local `@/services/*`
- **Services**: `@/services/*`

### Icon Selection & Usage

**Icon Selection Protocol (MANDATORY)**:

1. **Semantic Match**: Read `icon-descriptions.json` → Find icon that matches the intended purpose/action
2. **Visual Appropriateness**: Verify icon description aligns with the design context
3. **Import Verification**: Confirm icon exists in `@muatmuat/icons` package

**Result**: Use icon ONLY if it semantically matches the purpose, otherwise request clarification.

**Icon Reference Access**:

**AI Agents**: Find and read `icon-descriptions.json` in the current project:

- File location: `.claude/docs/ui-agent/icon-descriptions.json`
- Search pattern: `icon-descriptions.json`
- Search scope: Entire current project/workspace
- Contains: Icon descriptions, visual characteristics, and intended use cases

**⚠️ CRITICAL**: This JSON file is the **ONLY source of truth** for icon selection.

**Import Pattern**:

```jsx
import { Search, Filter2, Plus } from "@muatmuat/icons";

// Usage
<Search className="h-5 w-5 text-neutral-500" />
<Filter2 className="h-4 w-4" />
<Plus className="h-6 w-6 text-primary-500" />
```

**Common Icon Use Cases**:

- **Navigation**: `ArrowLeft`, `ArrowRight`, `ChevronDown`, `ChevronUp`, `Home`
- **Actions**: `Edit`, `TrashBin`, `Plus`, `Minus`, `Search`, `Filter2`
- **Status**: `Check`, `CircleCross`, `Warning`, `Info`, `Verified`
- **Communication**: `Chat`, `Email`, `Call`, `Notification`, `Whatsapp`
- **Business**: `Dashboard`, `Cart`, `CreditCard`, `Building`, `Profile`

**Common Mistakes to Avoid**:

- **Semantic Mismatch**: Don't use icons that don't match their described purpose
- **Import Errors**: Always import from `@muatmuat/icons`, not from local files
- **Size Inconsistency**: Use appropriate sizing (typically `h-4 w-4` to `h-6 w-6`)
- **Icon Hallucination**: Don't use icon names that don't exist in the package

### Asset & Image Guidelines

**🚨 MANDATORY RULE**: **NEVER use** plain HTML `<img>` tags or `next/image`. **ALWAYS use** `<ImageComponent/>` imported from `@muatmuat/ui/ImageComponent` for all images. This ensures consistent loading states, error handling, and optimization.

**Critical Rule**: All components must render immediately - always use placeholders first, replace with real assets later.

**Placeholder Implementation**:

- Use `https://picsum.photos/{width}?random={uniqueId}` for ALL images.
- Include dimensions, unique random values, and descriptive `alt` text.
- Apply responsive Tailwind classes and wrap zoomable images in `LightboxPreview`.

**Example**:

```jsx
// ✅ CORRECT - Renders instantly using the mandatory component
import { ImageComponent } from "@muatmuat/ui/ImageComponent";

<ImageComponent
  src="https://picsum.photos/56?random=2"
  alt="Truck" // Descriptive alt text is REQUIRED
  width={56}
  height={56}
  className="rounded-lg border object-cover"
/>;

// ❌ INCORRECT - Forbidden HTML img tag
// <img src="https://picsum.photos/56?random=2" alt="Truck" ... />

// ❌ INCORRECT - Forbidden Next.js Image component
// import Image from 'next/image';
// <Image src="https://picsum.photos/56?random=2" alt="Truck" ... />
```

**Mock Data Images**: All service mock data must also use Picsum URLs.

### Code Quality Standards

**React Best Practices**:

- Use functional components with hooks (`useState`, `useEffect`, etc.) instead of class components
- Prefer `useState` for local state and lift state up to nearest common ancestor when needed
- Use Context API for shared state when prop drilling becomes cumbersome
- Write readable, well-documented code with consistent formatting (use Prettier and ESLint)
- Implement proper error boundaries and fallback UIs

**Code Organization**:

- Extract repeated logic into custom hooks (e.g., `useModalState`, `useFormValidation`)
- Build complex components by composing simpler ones to reduce duplication
- Keep components focused with single responsibility and minimal file size

### Performance Considerations

**Component Optimization**:

- Use `React.memo` for components that receive same props frequently
- Implement proper dependency arrays in `useEffect` and `useMemo`
- Consider virtualization for very large lists (≈1000+ items)
- Optimize bundle size by using dynamic imports for large components

**Image Optimization**:

- Supply high-resolution assets (≥2× display dimensions) to avoid pixelation
- Use responsive classes when thumbnails must adapt to different breakpoints
- Maintain consistent aspect ratios between thumbnails and full-size images

### Error Handling & Accessibility

**Error Boundaries**:

- Implement proper error boundaries for robust applications
- Provide meaningful fallback UIs when components fail to render
- Log errors appropriately for debugging without exposing sensitive information

**Accessibility**:

- Ensure all interactive elements are keyboard navigable
- Provide meaningful `alt` text for all images
- Use semantic HTML elements appropriately
- Test with screen readers and keyboard navigation

### Development Workflow

**Before Shipping**:

- [ ] **Code is in JavaScript (.jsx) with JSDoc annotations** (unless TypeScript explicitly requested)
- [ ] Component follows naming conventions and import patterns
- [ ] No template strings in className (use `cn` helper)
- [ ] **ALL images use `<ImageComponent/>`** with proper `alt` text and placeholder URLs
- [ ] Form validation uses Valibot with explicit error messages
- [ ] Error handling implemented for all async operations
- [ ] Accessibility features tested and verified
- [ ] Performance considerations addressed
- [ ] Code formatted with Prettier and passes ESLint

### Why This Matters

Consistent structure and imports make code maintainable. Shared patterns keep implementations predictable. Proper error handling ensures robust user experience. Accessibility standards make applications usable by everyone. Performance optimization provides smooth user interactions.
