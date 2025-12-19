# Location Management RHF Integration - Required Fixes

This document outlines the remaining fixes needed to complete the RHF integration for the Location Management system in the RegisterVendorDomestik form.

## 🚨 Critical Issues to Fix

### 1. Location Field Components Need Updates

**Problem**: The individual location field components (`District`, `City`, `Province`, `PostalCode`) are still expecting flat field names and need to be updated to work with the new nested structure.

**Files to Update**:

- `/src/components/LocationManagement/Domestic/components/District.tsx`
- `/src/components/LocationManagement/Domestic/components/City.tsx`
- `/src/components/LocationManagement/Domestic/components/Province.tsx`
- `/src/components/LocationManagement/Domestic/components/PostalCode.tsx`

**Required Changes**:

```typescript
// Each component needs to:
1. Accept `name` prop for custom field names (default to nested paths)
2. Use Controller with correct nested field paths
3. Handle value extraction from nested structure
4. Update onChange handlers to set nested values
```

### 2. LocationHiddenFields Implementation

**Problem**: The `LocationHiddenFields` component needs to be properly implemented to handle all nested location fields.

**File to Update**:

- `/src/components/LocationManagement/Domestic/components/LocationHiddenFields.tsx`

**Required Changes**:

```typescript
// Update to use LOCATION_FIELD_NAMES constants:
-location.addressDetail -
  location.addressFormatted -
  location.coordinates.latitude -
  location.coordinates.longitude -
  location.city.cityId -
  location.city.cityName -
  location.province.provinceId -
  location.province.provinceName -
  location.district.districtId -
  location.district.districtName -
  location.postalCode;
```

### 3. FormAccountInformation Field References

**Problem**: Some location fields in the form are still using old flat field names.

**File to Update**:

- `/src/container/RegisterVendorDomestik/components/FormAccountInformation.tsx`

**Required Changes**:

```typescript
// Update these Controller components to use nested paths:
- name="location.addressDetail" ✅ (already done)
- name="location.addressFormatted" ✅ (already done)
- name="location.coordinates" ✅ (already done)
- Add proper Controller wrappers for District/City/Province/PostalCode
```

### 4. LocationFieldProvider XState Integration

**Problem**: The `updateLocationField` function in LocationFieldProvider needs to handle nested field paths correctly.

**File to Update**:

- `/src/components/LocationManagement/Domestic/LocationFieldProvider.tsx`

**Required Changes**:

```typescript
// Update updateLocationField function:
- Handle nested field paths (e.g., "location.city.cityId")
- Use setValue with proper nested path resolution
- Ensure all LOCATION_FIELD_NAMES are supported
```

## 🔧 Implementation Steps

### Step 1: Update Location Field Components

```bash
# For each component (District, City, Province, PostalCode):
1. Add `name` prop with default nested path
2. Update Controller to use nested field name
3. Handle value extraction from nested form data
4. Update onChange to set nested values correctly
```

### Step 2: Fix LocationHiddenFields

```bash
1. Import LOCATION_FIELD_NAMES constants
2. Update all Controller components to use nested paths
3. Ensure proper value extraction and setting
4. Test with form submission
```

### Step 3: Update FormAccountInformation

```bash
1. Remove manual Controller wrappers for location fields
2. Let RHFLocationFieldProvider handle them automatically
3. Keep only custom fields like AddressDetail and PinPoint
4. Test form validation and submission
```

### Step 4: Test Integration

```bash
1. Test location search and selection
2. Test manual field entry (District, City, etc.)
3. Test form validation with nested structure
4. Test form submission and API payload
5. Test draft save/load functionality
```

## 🧪 Testing Checklist

### Form Functionality

- [ ] Location search works and populates all fields
- [ ] Manual district selection updates form correctly
- [ ] Manual city selection updates form correctly
- [ ] Manual province selection updates form correctly
- [ ] Postal code selection works properly
- [ ] PinPoint coordinate selection works
- [ ] Form validation shows correct errors

### Data Flow

- [ ] Location changes update nested form state
- [ ] Form submission extracts nested data correctly
- [ ] API payload format is correct
- [ ] Draft save/load preserves location data

### Edge Cases

- [ ] Empty location data handling
- [ ] Invalid location data handling
- [ ] Form reset with location data
- [ ] Default values with location data

## 📋 Code Examples

### Updated District Component Example

```typescript
interface DistrictProps {
  name?: string; // Default: "location.district.districtId"
  value?: string;
  onChange?: (value: string) => void;
  // ... other props
}

const District: React.FC<DistrictProps> = ({
  name = "location.district.districtId",
  value,
  onChange,
  ...props
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <DistrictSelect
          value={field.value?.toString() || ""}
          onChange={(value) => field.onChange(value)}
          error={fieldState.error?.message}
          {...props}
        />
      )}
    />
  );
};
```

### Updated FormAccountInformation Usage

```typescript
// Remove manual Controllers - let provider handle them:
<FormRow label="Kecamatan" required>
  <LocationFieldDomestic.District />
</FormRow>
<FormRow label="Kabupaten/Kota" required>
  <LocationFieldDomestic.City />
</FormRow>
<FormRow label="Provinsi" required>
  <LocationFieldDomestic.Province />
</FormRow>
<FormRow label="Kode Pos" required>
  <LocationFieldDomestic.PostalCode />
</FormRow>
```

## 🎯 Success Criteria

1. **All location fields work correctly** with nested structure
2. **Form validation** works for all nested location fields
3. **API payload** is correctly formatted from nested data
4. **No TypeScript errors** in the entire integration
5. **Backward compatibility** maintained for existing forms
6. **Performance** is not degraded by the changes

## 📝 Notes

- The schema changes are already complete ✅
- The basic RHF provider structure is in place ✅
- The main work is updating individual components to use nested paths
- Test thoroughly after each component update
- Consider creating a comprehensive test suite for location management

---

**Priority**: High - These fixes are required for the location management system to work correctly with the new RHF integration.
**Estimated Time**: 4-6 hours for complete implementation and testing.
