# LocationField - AI Agent Guide

> **Quick Summary:** Compound component for international location management with autocomplete, geolocation, and reverse geocoding. Uses decoupled hooks pattern with XState state machine. Framework-agnostic. TypeScript. Production-ready.

---

## 🎯 What This Is

A comprehensive location input system with:

- **Autocomplete search** with Google Places-like suggestions
- **GPS/Geolocation** for current location
- **Reverse geocoding** (coordinates → address)

# Location Management (International)

This module provides a robust, state-managed solution for handling international location selection, including street autocomplete, place details, and map pinpointing. It uses [XState](https://stately.ai/) for complex logic management and is decoupled from specific form libraries.

## 🌟 Key Features

- **XState Machine**: Deterministic state management for search, geocoding, and loading states.
- **Framework Agnostic**: Integrates via a simple `onLocationChange` callback. Works with `react-hook-form`, Redux, or local state.
- **Autocomplete**: Google Maps-like street search with debounce.
- **Intelligent Mapping**:
  - `formattedAddress`: Automatically uses the user-selected **Title** (e.g., "Jalan Sudirman...") for accurate display.
  - `postalCodes`: Dynamically populated and deduplicated from the API response.
- **Search I/O**: Input field persists user selection for better UX.
- **Stable References**: Optimized to prevent infinite render loops.

## 📦 Components

The module exports a composite object `LocationFieldInternational` with the following sub-components:

- **`Provider`**: The context provider that holds the state machine.
- **`Input`**: The search input field with autocomplete dropdown.
- **`PinPoint`**: Map component for visual location selection.
- **`Address`**: Text area for manual address details.
- **`City`**: Dropdown for city selection (dynamic options).
- **`PostalCode`**: Dropdown for postal code selection (dynamic options).

## 🚀 Usage

### basic Implementation with React Hook Form

```tsx
import LocationFieldInternational, {
  useLocationFieldStateMachineContext,
} from "@/components/LocationManagement/International";

const MyForm = () => {
  const { setValue } = useForm();

  return (
    <LocationFieldInternational.Provider
      // Callback triggered whenever location data updates (search or map drag)
      onLocationChange={(data) => {
        // data = { city, country, postalCode, address, formattedAddress, coordinates }

        // 1. Update your form state
        setValue("city", data.city);
        setValue("postalCode", data.postalCode);

        // 2. Map formattedAddress to your "Gmaps" or "Location" display field
        setValue("companyLocationGmaps", data.formattedAddress);

        // 3. (Optional) Auto-fill coordinates
        if (data.coordinates) {
          setValue("latitude", data.coordinates.latitude);
          setValue("longitude", data.coordinates.longitude);
        }

        // Note: 'address' field (detail) is NOT auto-filled by default to allow manual entry.
      }}
    >
      <div className="flex flex-col gap-4">
        {/* Search Input */}
        <LocationFieldInternational.Input placeholder="Search for a location..." />

        {/* Manual Address Detail */}
        <LocationFieldInternational.Address placeholder="Enter detailed address (Floor, Unit, etc.)" />

        {/* Map Pin Point */}
        <LocationFieldInternational.PinPoint />

        {/* Dynamic Selects */}
        <LocationFieldInternational.City />
        <LocationFieldInternational.PostalCode />
      </div>
    </LocationFieldInternational.Provider>
  );
};
```

## 🛠️ API Reference

### `LocationFieldInternational.Provider`

| Prop                 | Type                           | Description                                                        |
| -------------------- | ------------------------------ | ------------------------------------------------------------------ |
| `onLocationChange`   | `(data: LocationData) => void` | **Required**. Callback fired when location is selected or updated. |
| `defaultCoordinates` | `Coordinates`                  | Initial map center coordinates.                                    |
| `children`           | `ReactNode`                    | Child components.                                                  |

### `LocationData` Interface

```typescript
interface LocationData {
  city?: string;
  country?: string;
  postalCode?: string;
  address?: string; // Raw address from API
  formattedAddress?: string; // Formatted Title from Autocomplete selection
  coordinates?: Coordinates;
}
```

## ⚠️ Notes

1.  **Address Mapping**: The `formattedAddress` field in the callback is prioritized to use the Title of the autocomplete result. This ensures the text in your readonly "Gmaps" field matches exactly what the user clicked.
2.  **Autofill**: By design, the `Address` component (for details like 'Jl. X No. 5') is **not** autofilled. This prevents overwriting user-specific details with generic API data.
3.  **City/Postal Data**: The generic `City` and `PostalCode` components automatically read available options from the provider's context, which is populated by the API based on the selected location.

---

## 📂 File Organization

```
LocationManagement/International/
├── index.tsx                      # Main compound component exports
├── LocationFieldProvider.tsx      # XState machine + React provider
├── api-adapter.ts                 # API wrapper with type mapping
├── types.ts                       # Clean TypeScript definitions
│
├── components/                    # Sub-components
│   ├── LocationFieldInput.tsx     # Autocomplete dropdown
│   ├── LocationFieldAddress.tsx   # Address textarea
│   └── LocationFieldPinPoint.tsx   # Map preview
│
├── modals/                        # Modal dialogs
│   ├── PostalCodeModal.tsx        # Postal code selection
│   └── LocationDetailModal.tsx    # Map with coordinate edit
│
└── utils/
    ├── locationConstants.ts       # Constants, error messages
    └── locationNormalizers.ts     # Data transformation utilities
```

---

## 🔄 How It Works (Data Flow)

### User Searches Location

```
1. User types in LocationField.Input
   ↓
2. useAutoComplete debounces, calls API
   ↓
3. Dropdown shows: Current Location | Recent | Suggestions
   ↓
4. User selects → triggers API: useGetPlaceDetail
   ↓
5. placeDetail arrives → triggered onLocationChange callback with:
   - city
   - country
   - postalCode
   - formattedAddress
   - coordinates
   ↓
6. useLocationCoordinates.handleCoordinateChange(coords, true)
   ↓
7. Reverse geocoding: useGetInternationalLocationByCoordinates
   ↓
8. locationData arrives → triggers onLocationChange callback again with refined data
```

### User Gets Current Location

```
1. User clicks "Pilih Lokasi Saat Ini"
   ↓
2. useCurrentLocation.handleGetCurrentLocation()
   ↓
3. navigator.geolocation.getCurrentPosition()
   ↓
4. Coordinates received → triggers reverse geocoding
   ↓
5. onLocationChange callback fired with full address details
```

---

## 🔌 API Integration

### Pattern: Direct API Calls with XState

**Location Search and Geocoding:**

```typescript
// Used by XState machine for state management
LocationAPIAdapter.searchLocations(query);
LocationAPIAdapter.getPlaceDetails(placeId);
LocationAPIAdapter.reverseGeocode(latitude, longitude);
LocationAPIAdapter.getPostalCodes(city);
```

**Type-Safe API Wrapper:**

- ✅ Maps raw API responses to clean camelCase types
- ✅ Handles error states consistently
- ✅ Used by XState machine actions
- ✅ Easy to mock for testing
- ✅ Centralized API configuration

---

## 🛠️ How to Use (Integration)

### With React Hook Form (Recommended)

```jsx
import { Controller, useForm } from "react-hook-form";

import LocationField from "@/components/LocationManagement/International";

function MyForm() {
  const { control, setValue, handleSubmit } = useForm();

  return (
    <LocationField
      onLocationChange={(data) => {
        // You have full control over how to map to your form
        if (data.city) setValue("city", data.city, { shouldValidate: true });
        if (data.country) setValue("country", data.country);
        if (data.postalCode)
          setValue("postalCode", data.postalCode, { shouldValidate: true });
        if (data.formattedAddress) {
          setValue("addressDetail", data.formattedAddress, {
            shouldValidate: true,
          });
        }
        if (data.coordinates) {
          setValue("pinPoint", data.coordinates, { shouldValidate: true });
        }
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Address Detail */}
        <Controller
          name="addressDetail"
          control={control}
          render={({ field }) => <LocationField.Address {...field} />}
        />

        {/* Autocomplete Search */}
        <LocationField.Input placeholder="Search location..." />

        {/* City (Auto-filled) */}
        <Controller
          name="city"
          control={control}
          render={({ field }) => <LocationField.City {...field} />}
        />

        {/* Postal Code */}
        <Controller
          name="postalCode"
          control={control}
          render={({ field }) => <LocationField.PostalCode {...field} />}
        />

        {/* Map with Pin */}
        <Controller
          name="pinPoint"
          control={control}
          render={({ field }) => (
            <LocationField.PinPoint
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />

        <button type="submit">Submit</button>
      </form>
    </LocationField>
  );
}
```

**Critical:** Wrap ENTIRE form (or section) with `<LocationField>` provider. ONE instance only!

---

## 📝 Common Tasks for AI Agents

### Task 1: Add New Field to Location Data

**Example:** Add "building name" field

1. **Update types** (`types.ts`):

```typescript
export interface LocationDetails {
  // ... existing fields
  info: LocationInfo & {
    buildingName?: string; // Add this
  };
}

export interface LocationChangeData {
  // ... existing fields
  buildingName?: string; // Add this
}
```

2. **Update context** (`LocationFieldProvider.tsx`):

```typescript
// In placeDetail effect:
if (state.context.placeDetail && onLocationChange) {
  const { info, coordinates } = state.context.placeDetail;
  onLocationChange({
    // ... existing fields
    buildingName: info.buildingName, // Pass to callback
  });
}
```

3. **Create component** (`components/LocationFieldBuildingName.tsx`):

```typescript
const LocationFieldBuildingName: React.FC<Props> = ({
  value, onChange, error
}) => {
  return <Input value={value} onChange={onChange} error={error} />;
};
```

4. **Add to compound** (`LocationField.tsx`):

```typescript
LocationField.BuildingName = LocationFieldBuildingName;
```

5. **Use in form:**

```tsx
<LocationField
  onLocationChange={(data) => {
    // ... other fields
    if (data.buildingName) setValue("buildingName", data.buildingName);
  }}
>
```

---

### Task 2: Fix/Update API Integration

**Example:** Change autocomplete API endpoint

1. **Update api-adapter.ts** (`api-adapter.ts`):

```typescript
searchLocations: async (query: string): Promise<LocationSuggestion[]> => {
  const params = new URLSearchParams();
  params.append("phrase", query);

  const response = await fetcherMPPInter.post(
    "/api/new-endpoint", // Change this
    params,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
    }
  );

  return rawData.map(mapToLocationSuggestion);
};
```

**Example:** Add new API method

1. **Add to api-adapter.ts**:

```typescript
validateCoordinates: async (latitude: number, longitude: number) => {
  const response = await fetcherMPPInter.post("/api/validate-coordinates", {
    latitude,
    longitude,
  });
  return response.data;
};
```

2. **Use in XState machine**:

```typescript
validateCoordinates: fromPromise(async ({ input }) => {
  return LocationAPIAdapter.validateCoordinates(input.latitude, input.longitude);
}),
```

### Task 3: Add New XState State/Event

**Example:** Add coordinate validation state

1. **Add to types** (`types.ts`):

```typescript
export type LocationStateMachineEvent =
  // ... existing events
  { type: "VALIDATE_COORDINATES"; latitude: number; longitude: number };

export type LocationStateMachineState =
  // ... existing states
  "validating";
```

2. **Add to machine** (`LocationFieldProvider.tsx`):

```typescript
validating: {
  on: {
    VALIDATION_SUCCESS: {
      target: "idle",
      actions: assign(({ event }) => ({
        validationResults: event.results,
      })),
    },
    VALIDATION_ERROR: {
      target: "error",
      actions: assign(({ event }) => ({
        errors: { validation: event.error },
      })),
    },
  },
},
```

3. **Add service** (`LocationFieldProvider.tsx`):

```typescript
validateCoordinates: fromPromise(async ({ input }) => {
  return LocationAPIAdapter.validateCoordinates(input.latitude, input.longitude);
}),
```

### Task 4: Debug Issue

**Problem:** "City not auto-filling"

**Steps:**

1. Check `LocationFieldProvider.tsx` → `onLocationChange` effect
2. Verify `state.context.placeDetail` is populated correctly
3. Verify your form's `onLocationChange` handler is receiving the data
4. Check if you are calling `setValue('city', data.city)` in the callback

### Task 5: Add Modal

**Example:** Add "Map Settings" modal

1. **Create modal** (`modals/MapSettingsModal.tsx`):

```typescript
const MapSettingsModal = () => {
  const { state, send } = useLocationFieldStateMachineContext();

  return (
    <Modal
      open={state.context.activeModal === "mapSettings"}
      onOpenChange={(open) => send({
        type: open ? "OPEN_MODAL" : "CLOSE_MODAL",
        modal: "mapSettings"
      })}
    >
      {/* Modal content */}
    </Modal>
  );
};
```

2. **Add modal type** (`types.ts`):

```typescript
export type LocationStateMachineEvent =
  // ... existing events
  {
    type: "OPEN_MODAL";
    modal: "postal" | "detail" | "management" | "mapSettings";
  };
```

3. **Export and include** (`modals/index.ts` and `LocationFieldProvider.tsx`):

```typescript
// modals/index.ts
export { default as MapSettingsModal } from "./MapSettingsModal";

// LocationFieldProvider.tsx
import { MapSettingsModal } from "./modals";

// In JSX:
<MapSettingsModal />
```

---

## ⚠️ Critical Rules for AI Agents

### DO ✅

1. **Use XState for state management** - Centralized state with transitions
2. **Follow XState patterns** - States, events, actions, services
3. **Single provider** - Wrap form ONCE with `<LocationField>`
4. **Direct API usage** - Use LocationAPIAdapter methods directly
5. **TypeScript** - Always add/update types in types.ts
6. **Use onLocationChange** - Handle all form updates in this callback
7. **Clean type mapping** - Map API responses to camelCase types

### DON'T ❌

1. **Don't create multiple providers** - One per form only
2. **Don't bypass XState** - Use machine events for all state changes
3. **Don't trigger side effects directly** - Use XState actions/services
4. **Don't put logic in components** - Logic in XState machine
5. **Don't assume form library** - The provider is framework-agnostic
6. **Don't modify state directly** - Use XState transitions
7. **Don't break compound pattern** - Keep sub-components as properties

---

## 🧪 Testing Approach

### Unit Test XState Machine

```typescript
import { createMachine } from "xstate";

import { locationMachine } from "./LocationFieldProvider";

test("should handle search selection", () => {
  const machine = createMachine(locationMachine);
  const state = machine.transition("idle", {
    type: "SEARCH_SELECT",
    location: mockLocationSuggestion,
  });

  expect(state.matches("loadingPlaceDetails")).toBe(true);
});
```

### Integration Test Provider

```typescript
import { render, waitFor } from '@testing-library/react';
import LocationFieldProvider from './LocationFieldProvider';

test('should auto-fill after selection', async () => {
  const { getByText, getByRole } = render(
    <LocationFieldProvider>
      <TestForm />
    </LocationFieldProvider>
  );

  // Test full flow with XState machine
});
```

### Mock API Adapter

```typescript
jest.mock("./api-adapter", () => ({
  default: {
    searchLocations: jest.fn().mockResolvedValue(mockSuggestions),
    getPlaceDetails: jest.fn().mockResolvedValue(mockPlaceDetail),
  },
}));
```

---

## 🐛 Common Issues & Solutions

### Issue: City not auto-filling

**Cause:** XState transition not working or property name mismatch
**Fix:** Check PLACE_SUCCESS transition → property mapping (info.city)

### Issue: Infinite API calls

**Cause:** XState service configuration error
**Fix:** Ensure proper service implementation and transition guards

### Issue: Modal appears multiple times

**Cause:** Multiple LocationField providers
**Fix:** Wrap form ONCE, not each field

### Issue: TypeScript errors

**Cause:** Missing type definitions or property mismatches
**Fix:** Update `types.ts` with new interfaces and check camelCase properties

### Issue: Form validation not working

**Cause:** Missing `{ shouldValidate: true }` in setValue
**Fix:** Add flag to all setValue calls

---

## 🎓 Key Patterns to Follow

### 1. Compound Component Pattern

```typescript
// Main component with sub-components as properties
LocationField.Input = LocationFieldInput;
LocationField.Address = LocationFieldAddress;
// Usage: <LocationField.Input />
```

### 2. XState Machine Pattern

```typescript
// Centralized state management with transitions
const locationMachine = setup({
  types: {
    context: LocationMachineContext,
    events: LocationMachineEvent,
  },
  actions: {
    /* ... */
  },
  services: {
    /* ... */
  },
}).createMachine({
  /* ... */
});
```

### 3. Type-Safe API Integration

```typescript
// Clean interface with type mapping
const LocationAPIAdapter = {
  searchLocations: async (query: string): Promise<LocationSuggestion[]> => {
    // Maps raw API response to clean types
    return rawData.map(mapToLocationSuggestion);
  },
};
```

### 4. Clean TypeScript Types

```typescript
// Consistent camelCase interfaces
export interface LocationSuggestion {
  id: string;
  title: string;
  level: number;
}
```

---

## 📊 Quick Reference

| Component                  | Purpose | Input         | Output                    |
| -------------------------- | ------- | ------------- | ------------------------- |
| `LocationField.Input`      | Search  | User types    | Calls API, shows dropdown |
| `LocationField.Address`    | Details | User types    | Text value                |
| `LocationField.City`       | Display | Auto-filled   | Read-only                 |
| `LocationField.PostalCode` | Select  | Click → modal | Postal code               |
| `LocationField.PinPoint`   | Map     | Click → modal | Coordinates               |

| XState Feature | Responsibility    | Triggers/Returns                    |
| -------------- | ----------------- | ----------------------------------- |
| Search State   | Autocomplete      | SEARCH_START, SEARCH_SELECT events  |
| Location State | GPS & coordinates | GET_CURRENT_LOCATION event          |
| Modal State    | UI management     | OPEN_MODAL, CLOSE_MODAL events      |
| Error State    | Error handling    | Error states and messages           |
| Loading State  | Coordination      | Loading states for async operations |

---

## 🚀 Quick Start Checklist

When implementing location features:

- [ ] Import LocationField from correct path
- [ ] Wrap form with single `<LocationField>` provider
- [ ] Pass control, setValue, watch to provider
- [ ] Use Controller for each field
- [ ] Handle errors with fieldState.error?.message
- [ ] Test autocomplete search
- [ ] Test GPS location
- [ ] Test form validation
- [ ] Check TypeScript compilation
- [ ] Verify no duplicate API calls

---

## 📚 Additional Resources

- **API Services:** `/src/services/location-management/`
- **Type Definitions:** `types.ts`
- **Constants:** `utils/locationConstants.ts`
- **Example Integration:** `src/container/FormVendorInternasional/.../FormAccountInformation.jsx`

---

**Last Updated:** 2025-12-10
**Status:** Production Ready
**Pattern:** Compound Component + XState Machine
**Language:** TypeScript
