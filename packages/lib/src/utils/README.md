# @muatmuat/lib/utils

A comprehensive collection of utility functions for MuatMuat packages with full TypeScript support and autocomplete.

## Installation

This package is part of the `@muatmuat/lib` monorepo package. Install it as a dependency:

```bash
npm install @muatmuat/lib
```

## Usage

Import specific utilities from the utils module:

```javascript
import { cn, formatDate, idrFormat } from "@muatmuat/lib/utils";
```

Or import everything:

```javascript
import * as utils from "@muatmuat/lib/utils";
```

## Available Utilities

### Array Utilities

#### `addArraysUnique<T>(arr1: T[], arr2: T[]): T[]`

Combines two arrays and returns a new array with unique elements only.

```javascript
const result = addArraysUnique([1, 2, 3], [3, 4, 5]);
// Returns: [1, 2, 3, 4, 5]
```

#### `getElementsNotInSecondArray<T>(arr1: T[], arr2: T[]): T[]`

Returns elements from the first array that are not present in the second array.

```javascript
const result = getElementsNotInSecondArray([1, 2, 3, 4], [2, 4]);
// Returns: [1, 3]
```

#### `compareArraysByNameOnly(array1: MuatanItem[], array2: MuatanItem[]): boolean`

Compares two arrays by their `namaMuatan.value` property only. Used for cargo information validation.

```javascript
const items1 = [{ namaMuatan: { value: "Rice" } }];
const items2 = [{ namaMuatan: { value: "Rice" } }];
const result = compareArraysByNameOnly(items1, items2);
// Returns: true
```

### Class Name Utilities

#### `cn(...inputs: ClassValue[]): string`

Utility function for merging Tailwind CSS classes with clsx. Resolves conflicts by giving priority to later classes.

```javascript
cn("px-2 py-1", "px-4", { "bg-red-500": true, "bg-blue-500": false });
// Returns: "py-1 px-4 bg-red-500"
```

### Dynamic Import Utilities

#### `dynamicImport(screen: ComponentImportFunction): NextComponent`

Creates a Next.js dynamic import with SSR disabled.

```javascript
const LazyComponent = dynamicImport(() => import("./MyComponent"));
```

### Number Formatting Utilities

#### `idrFormat(num: number, opts?: NumberFormatOptions): string`

Formats a number as Indonesian Rupiah currency.

```javascript
idrFormat(1000000);
// Returns: "Rp1.000.000"
```

#### `thousandSeparator(num: number, opts?: NumberFormatOptions): string`

Formats a number with thousand separators using Indonesian locale.

```javascript
thousandSeparator(1000000);
// Returns: "1.000.000"
```

#### `formatNumberWithComma(value: any): string`

Formats a number with comma as decimal separator.

```javascript
formatNumberWithComma(3.5);
// Returns: "3,5"
```

#### `formatNumberShorthand(value: any, t?: TranslationFunction): string`

Formats a number into Indonesian shorthand notation.

```javascript
formatNumberShorthand(1500); // Returns: "1RB"
formatNumberShorthand(2500000); // Returns: "2JT"
formatNumberShorthand(3500000000); // Returns: "3M"
```

### Phone Formatting Utilities

#### `formatPhoneNumber(phoneNumber: string): string`

Formats phone numbers by adding dashes every 4 digits.

```javascript
formatPhoneNumber("081234567890");
// Returns: "0812-3456-7890"
```

#### `formatPhoneNumberWithPrefix(phoneNumber: string): string`

Formats phone number with consistent formatting.

```javascript
formatPhoneNumberWithPrefix("081234567890");
// Returns: "0812-3456-7890"
```

### Date Formatting Utilities

#### `formatDate(isoString: DateInput, options?: FormatDateOptions): string`

Formats an ISO string into "d MMM yyyy HH:mm WIB" format.

```javascript
formatDate("2023-12-25T10:30:00Z");
// Returns: "25 Des 2023 10:30 WIB"

formatDate("2023-12-25T10:30:00Z", { padDay: true, withWIB: false });
// Returns: "25 Des 2023 10:30"
```

#### `formatTime(isoString: DateInput): string`

Formats an ISO string into "HH:mm WIB" format.

```javascript
formatTime("2023-12-25T10:30:00Z");
// Returns: "10:30 WIB"
```

#### `formatShortDate(isoString: DateInput): string`

Formats an ISO string to short date format.

```javascript
formatShortDate("2023-12-25T10:30:00Z");
// Returns: "25 Des 2023"
```

#### Other Date Utilities

- `formatDateFullMonth()` - Full month name format
- `formatDateInput()` - Legacy formatting with toLocaleDateString
- `formatDateToDDMonYYYY()` - Padded day format
- `formatDateRange()` - Smart date range formatting
- `formatLoadTime()` - Load time formatting with React elements
- `formatToYYYYMMDD()` - Convert DD-MM-YYYY to YYYY-MM-DD
- `getAdjustedDate()` - Get future/past dates
- `convertDate()` - English date format
- `clasifyformatdate` - Date classification utilities

### Valibot Utilities

#### `mapValibotErrors(valibotErrors: ValibotNestedErrors): FlatErrorObject`

Maps nested Valibot errors to a flat error object.

```javascript
const valibotErrors = {
  email: ["Invalid email format", "Email is required"],
  password: ["Password too short"],
};
const flatErrors = mapValibotErrors(valibotErrors);
// Returns: { email: "Invalid email format", password: "Password too short" }
```

### Zustand DevTools

#### `zustandDevtools<T>(fn: ZustandStoreConfig<T>): ZustandStoreConfig<T>`

Zustand devtools middleware that only applies in development environment.

```javascript
const useStore = create(
  zustandDevtools((set, get) => ({
    count: 0,
    increment: () => set((state) => ({ count: state.count + 1 })),
  }))
);
```

## TypeScript Support

All utilities come with full TypeScript definitions and JSDoc annotations for excellent developer experience:

- ✅ **Perfect autocomplete** - IntelliSense shows all available utilities
- ✅ **Parameter hints** - Function calls show proper parameter types
- ✅ **Hover documentation** - Detailed JSDoc appears on hover
- ✅ **Type checking** - Incorrect usage shows TypeScript errors
- ✅ **Import resolution** - No "module not found" errors

## Development

The utilities are built with:

- **Self-contained TypeScript definitions** - No cross-module dependencies
- **Comprehensive JSDoc annotations** - Full documentation for each function
- **Workspace-optimized exports** - Proper package.json configuration
- **Zero external runtime dependencies** - Only peer dependencies for framework integration

## Examples

```javascript
// Import multiple utilities
import {
  addArraysUnique,
  cn,
  formatDate,
  formatPhoneNumber,
  idrFormat,
} from "@muatmuat/lib/utils";

// Use with full type checking and autocomplete
const classes = cn("btn", { "btn-primary": isPrimary });
const price = idrFormat(product.price);
const date = formatDate(order.createdAt);
const phone = formatPhoneNumber(user.phoneNumber);
const merged = addArraysUnique(existingItems, newItems);
```

## Contributing

When adding new utilities:

1. Add the implementation in the appropriate file (or create a new one)
2. Export from `src/utils/index.js`
3. Add TypeScript definitions to `src/utils/index.d.ts`
4. Add JSDoc annotations with examples
5. Update this README with usage examples

All utilities should be pure functions with no side effects and comprehensive type definitions.
