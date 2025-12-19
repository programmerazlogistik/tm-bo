# Location Management Dual-Mode Integration Plan

## Overview

This document outlines the integration strategy for enhancing location management components to support both React Hook Form (RHF) mode and read-only mode, enabling component reuse across different vendor management workflows.

## Problem Statement

- **UbahVendorDomestik** uses RHF with nested location structure for editing
- **VerifikasiVendorDomestik** is read-only but wants to reuse the same location components
- Current location components only accept RHF `control` prop
- Need automatic population of location data from API responses

## Solution: Dual-Mode Components

Enhance each location component to support three usage modes:

1. **RHF Mode**: Full form integration with `control` prop
2. **Read-Only Mode**: Direct value display with `value` prop
3. **Fallback Mode**: Disabled input when neither control nor value provided

## Implementation Plan

### Phase 1: Component Enhancement

#### 1.1 District Component Enhancement

**File**: `@/components/LocationManagement/District.tsx`

**Current Interface**:

```typescript
interface DistrictProps {
  control: Control<any>;
  name?: string;
  disabled?: boolean;
}
```

**Enhanced Interface**:

```typescript
interface DistrictProps {
  // RHF Mode
  control?: Control<any>;
  name?: string;

  // Read-Only Mode
  value?: string;

  // Common props
  disabled?: boolean;
  readOnly?: boolean;
  label?: string;
  required?: boolean;
  className?: string;
}
```

**Enhanced Component Logic**:

```typescript
const District = ({
  control,
  name = "district",
  value,
  disabled,
  readOnly,
  label = "Kecamatan",
  required = false,
  className
}) => {
  // Read-Only Mode: Direct value display
  if (readOnly && value !== undefined) {
    return (
      <FormRow label={label} required={required} className={className}>
        <Input value={value} disabled />
      </FormRow>
    );
  }

  // RHF Mode: Use Controller
  if (control) {
    return (
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <FormRow label={label} required={required} className={className}>
            <Input {...field} disabled={disabled} />
            {error && <span className="error">{error.message}</span>}
          </FormRow>
        )}
      />
    );
  }

  // Fallback: Disabled input
  return (
    <FormRow label={label} required={required} className={className}>
      <Input value="" disabled />
    </FormRow>
  );
};
```

#### 1.2 City Component Enhancement

**File**: `@/components/LocationManagement/City.tsx`

Apply the same enhancement pattern as District component.

#### 1.3 Province Component Enhancement

**File**: `@/components/LocationManagement/Province.tsx`

Apply the same enhancement pattern as District component.

#### 1.4 PostalCode Component Enhancement

**File**: `@/components/LocationManagement/PostalCode.tsx`

Apply the same enhancement pattern as District component.

### Phase 2: VerifikasiVendorDomestik Integration

#### 2.1 Update FormAccountInformation Component

**File**: `@/src/container/VerifikasiVendorDomestik/components/FormAccountInformation.tsx`

**Current Implementation** (lines 151-162):

```typescript
<FormRow label="Kecamatan" required>
  <Input value={defaultValues?.district || ""} disabled />
</FormRow>
<FormRow label="Kabupaten/Kota" required>
  <Input value={defaultValues?.city || ""} disabled />
</FormRow>
<FormRow label="Provinsi" required>
  <Input value={defaultValues?.province || ""} disabled />
</FormRow>
<FormRow label="Kode Pos" required>
  <Input value={defaultValues?.postalCode || ""} disabled />
</FormRow>
```

**Enhanced Implementation**:

```typescript
// Import enhanced location components
import { District, City, Province, PostalCode } from "@/components/LocationManagement";

// Replace with enhanced components
<District
  value={defaultValues?.district}
  readOnly
  label="Kecamatan"
  required
/>
<City
  value={defaultValues?.city}
  readOnly
  label="Kabupaten/Kota"
  required
/>
<Province
  value={defaultValues?.province}
  readOnly
  label="Provinsi"
  required
/>
<PostalCode
  value={defaultValues?.postalCode}
  readOnly
  label="Kode Pos"
  required
/>
```

### Phase 3: Testing and Validation

#### 3.1 Component Testing

**Test Cases for Each Enhanced Component**:

1. **RHF Mode**:
   - Component renders with Controller
   - Form integration works correctly
   - Validation errors display properly
   - Disabled state works

2. **Read-Only Mode**:
   - Component displays provided value
   - Input is disabled
   - No Controller rendered
   - Label and required indicator work

3. **Fallback Mode**:
   - Component renders disabled input
   - No errors thrown
   - Graceful degradation

#### 3.2 Integration Testing

**UbahVendorDomestik**:

- Verify existing functionality unchanged
- Location search still works
- Form validation works
- Nested structure maintained

**VerifikasiVendorDomestik**:

- Location data displays correctly from API
- Components are properly disabled
- No RHF errors in console
- Performance impact minimal

## Benefits of This Approach

### ✅ **Component Reusability**

- Single component serves multiple use cases
- No code duplication
- Consistent UI/UX across workflows

### ✅ **Backward Compatibility**

- Existing RHF implementations continue to work
- No breaking changes
- Gradual adoption possible

### ✅ **Maintainability**

- Single source of truth for location components
- Easier to update and maintain
- Clear separation of concerns

### ✅ **Performance**

- No unnecessary RHF overhead in read-only mode
- Direct value rendering
- Minimal bundle size impact

### ✅ **Flexibility**

- Three usage modes for different scenarios
- Easy to extend for future requirements
- Clean, predictable API

## Implementation Timeline

### **Day 1**: Component Enhancement

- [ ] Enhance District component
- [ ] Enhance City component
- [ ] Enhance Province component
- [ ] Enhance PostalCode component

### **Day 2**: Integration

- [ ] Update VerifikasiVendorDomestik FormAccountInformation
- [ ] Test component functionality
- [ ] Verify backward compatibility

### **Day 3**: Testing and Validation

- [ ] Component unit tests
- [ ] Integration tests
- [ ] Cross-browser testing
- [ ] Performance validation

## Risk Assessment

### **Low Risk**

- Component enhancement is additive
- Backward compatibility maintained
- Isolated changes

### **Mitigation Strategies**

- Thorough testing of each mode
- Gradual rollout
- Rollback plan ready

## Future Considerations

### **Potential Enhancements**

1. **Advanced Read-Only Mode**: Add copy-to-clipboard functionality
2. **Loading States**: Add loading indicators for async operations
3. **Error Boundaries**: Better error handling for component failures
4. **Accessibility**: Enhanced ARIA labels and keyboard navigation

### **Migration Path**

1. **Phase 1**: Implement dual-mode components
2. **Phase 2**: Migrate all location component usage
3. **Phase 3**: Deprecate old single-mode versions

## Success Criteria

### **Functional Requirements**

- [ ] All location components support dual modes
- [ ] VerifikasiVendorDomestik displays location data correctly
- [ ] UbahVendorDomestik functionality unchanged
- [ ] No console errors in either workflow

### **Non-Functional Requirements**

- [ ] No performance regression
- [ ] Bundle size increase < 5KB
- [ ] Component reusability achieved
- [ ] Code maintainability improved

## Conclusion

This integration plan provides a clean, maintainable solution for reusing location components across different vendor management workflows. The dual-mode approach ensures backward compatibility while enabling new functionality for read-only scenarios.

The implementation is straightforward, low-risk, and provides immediate benefits in terms of code reusability and maintainability.
