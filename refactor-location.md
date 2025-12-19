# Location Management Refactoring Plan - React Hook Form Integration

## Executive Summary

This document outlines a comprehensive refactoring plan to integrate the existing location management system with React Hook Form (RHF). The goal is to replace the current `onLocationChange` callback system with direct RHF control integration, using hidden inputs to manage the complex location data structure.

## Current State Analysis

### Existing Architecture
- **Provider**: `LocationFieldProvider` uses XState machine for state management
- **Data Flow**: Location changes trigger `onLocationChange` callback
- **Data Structure**: Complex nested object with multiple location properties
- **Form Integration**: Manual callback system requiring parent components to handle location data

### Current Data Structure
```typescript
{
  address: string,        // User manual fill
  city: string,
  cityId?: number,
  district: string,
  districtId?: number,
  province: string,
  provinceId?: number,
  country: string,
  postalCode: string,
  coordinates: {
    latitude: number,
    longitude: number,
  },
  formattedAddress?: string,
  // Additional metadata...
}
```

## Target Architecture

### Design Principles
1. **Direct RHF Integration**: Use RHF's `control` and `setValue` for direct form manipulation
2. **Hidden Inputs**: Create hidden inputs for each location property
3. **Maintain API Compatibility**: Keep existing location functionality intact
4. **Type Safety**: Leverage TypeScript for robust type checking
5. **Performance**: Minimize re-renders and unnecessary updates

### New Data Structure
```typescript
{
  addressDetail: string,        // User manual fill
  addressFormatted: string,     // Formatted address from search/API

  coordinates: {
    latitude: number,
    longitude: number,
  },

  city: {
    cityId: number,
    cityName: string,
  },

  province: {
    provinceId: number,
    provinceName: string,
  },

  district: {
    districtId: number,
    districtName: string,
  },

  postalCode: string,
}
```

## Implementation Plan

### Phase 1: Type Definitions and Interface Updates

#### 1.1 Update Location Types
```typescript
// New RHF-integrated location types
export interface RHFLocationData {
  addressDetail: string;
  addressFormatted: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  city: {
    cityId: number;
    cityName: string;
  };
  province: {
    provinceId: number;
    provinceName: string;
  };
  district: {
    districtId: number;
    districtName: string;
  };
  postalCode: string;
}

export interface LocationFieldProviderProps {
  children: React.ReactNode;
  control: Control<any>; // RHF control object
  defaultCoordinates?: Coordinates;
  // Remove onLocationChange callback and name prop - defaults to "location"
}
```

#### 1.2 Create Field Name Constants
```typescript
export const LOCATION_FIELD_NAMES = {
  ADDRESS_DETAIL: 'location.addressDetail',
  ADDRESS_FORMATTED: 'location.addressFormatted',
  LATITUDE: 'location.coordinates.latitude',
  LONGITUDE: 'location.coordinates.longitude',
  CITY_ID: 'location.city.cityId',
  CITY_NAME: 'location.city.cityName',
  PROVINCE_ID: 'location.province.provinceId',
  PROVINCE_NAME: 'location.province.provinceName',
  DISTRICT_ID: 'location.district.districtId',
  DISTRICT_NAME: 'location.district.districtName',
  POSTAL_CODE: 'location.postalCode',
} as const;
```

### Phase 2: LocationFieldProvider Refactoring

#### 2.1 Update Provider Signature
```typescript
export const LocationFieldProvider: React.FC<LocationFieldProviderProps> = ({
  children,
  control,           // RHF control object
  defaultCoordinates,
}) => {
  // Remove onLocationChange callback handling
  // Integrate with RHF control
  // Hardcode "location" as the field name for simplicity
}
```

#### 2.2 Create Hidden Input Component using Controller
```typescript
interface LocationHiddenInputProps {
  control: Control<any>;
  name: string;
  value: any;
}

const LocationHiddenInput: React.FC<LocationHiddenInputProps> = ({
  control,
  name,
  value
}) => {
  // Using Controller component instead of useController hook
  // Controller is simpler and more direct for hidden inputs
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={value}
      render={({ field }) => <input type="hidden" {...field} />}
    />
  );
};
```

#### 2.3 Integration with XState Machine
```typescript
export const useLocationMachine = (props: LocationFieldProviderProps) => {
  const { control } = props;

  // Update XState machine to use RHF setValue instead of callbacks
  const updateLocationField = useCallback((fieldName: string, value: any) => {
    control._setValue(`location.${fieldName}`, value, {
      shouldValidate: true,
      shouldDirty: true,
    });
  }, [control]);

  // Modify machine effects to use updateLocationField
  useEffect(() => {
    if (state.context.selectedLocation && !isLoading) {
      const location = state.context.selectedLocation;

      // Update all location fields via RHF using hardcoded "location" prefix
      updateLocationField('addressFormatted', location.formattedAddress || '');
      updateLocationField('coordinates.latitude', location.coordinates.latitude);
      updateLocationField('coordinates.longitude', location.coordinates.longitude);
      updateLocationField('city.cityId', location.cityId || 0);
      updateLocationField('city.cityName', location.city || '');
      updateLocationField('province.provinceId', location.provinceId || 0);
      updateLocationField('province.provinceName', location.province || '');
      updateLocationField('district.districtId', location.districtId || 0);
      updateLocationField('district.districtName', location.district || '');
      updateLocationField('postalCode', location.postalCode || '');
    }
  }, [state.context.selectedLocation, isLoading, updateLocationField]);
};
```

### Phase 3: Hidden Inputs Implementation

#### 3.1 Create LocationHiddenFields Component using Controller
```typescript
interface LocationHiddenFieldsProps {
  control: Control<any>;
  locationData: RHFLocationData | null;
}

const LocationHiddenFields: React.FC<LocationHiddenFieldsProps> = ({
  control,
  locationData
}) => {
  // Using Controller component instead of useController hook for simplicity
  // Controller is ideal for hidden inputs - cleaner syntax and less boilerplate
  if (!locationData) return null;

  return (
    <>
      <Controller
        name="location.addressDetail"
        control={control}
        defaultValue={locationData.addressDetail}
        render={({ field }) => <input type="hidden" {...field} />}
      />
      <Controller
        name="location.addressFormatted"
        control={control}
        defaultValue={locationData.addressFormatted}
        render={({ field }) => <input type="hidden" {...field} />}
      />
      <Controller
        name="location.coordinates.latitude"
        control={control}
        defaultValue={locationData.coordinates.latitude}
        render={({ field }) => <input type="hidden" {...field} />}
      />
      <Controller
        name="location.coordinates.longitude"
        control={control}
        defaultValue={locationData.coordinates.longitude}
        render={({ field }) => <input type="hidden" {...field} />}
      />
      <Controller
        name="location.city.cityId"
        control={control}
        defaultValue={locationData.city.cityId}
        render={({ field }) => <input type="hidden" {...field} />}
      />
      <Controller
        name="location.city.cityName"
        control={control}
        defaultValue={locationData.city.cityName}
        render={({ field }) => <input type="hidden" {...field} />}
      />
      <Controller
        name="location.province.provinceId"
        control={control}
        defaultValue={locationData.province.provinceId}
        render={({ field }) => <input type="hidden" {...field} />}
      />
      <Controller
        name="location.province.provinceName"
        control={control}
        defaultValue={locationData.province.provinceName}
        render={({ field }) => <input type="hidden" {...field} />}
      />
      <Controller
        name="location.district.districtId"
        control={control}
        defaultValue={locationData.district.districtId}
        render={({ field }) => <input type="hidden" {...field} />}
      />
      <Controller
        name="location.district.districtName"
        control={control}
        defaultValue={locationData.district.districtName}
        render={({ field }) => <input type="hidden" {...field} />}
      />
      <Controller
        name="location.postalCode"
        control={control}
        defaultValue={locationData.postalCode}
        render={({ field }) => <input type="hidden" {...field} />}
      />
    </>
  );
};
```

### Phase 4: Provider Integration

#### 4.1 Updated LocationFieldProvider
```typescript
export const LocationFieldProvider: React.FC<LocationFieldProviderProps> = ({
  children,
  control,
  defaultCoordinates,
}) => {
  const machine = useLocationMachine({
    control,
    defaultCoordinates,
  });

  // Convert machine state to RHF-compatible format
  const locationData: RHFLocationData | null = useMemo(() => {
    if (!machine.selectedLocation) return null;

    return {
      addressDetail: '', // Always empty for manual fill
      addressFormatted: machine.selectedLocation.formattedAddress || '',
      coordinates: {
        latitude: machine.selectedLocation.coordinates.latitude,
        longitude: machine.selectedLocation.coordinates.longitude,
      },
      city: {
        cityId: machine.selectedLocation.cityId || 0,
        cityName: machine.selectedLocation.city || '',
      },
      province: {
        provinceId: machine.selectedLocation.provinceId || 0,
        provinceName: machine.selectedLocation.province || '',
      },
      district: {
        districtId: machine.selectedLocation.districtId || 0,
        districtName: machine.selectedLocation.district || '',
      },
      postalCode: machine.selectedLocation.postalCode || '',
    };
  }, [machine.selectedLocation]);

  return (
    <LocationFieldContext.Provider value={{ machine }}>
      {children}
      {/* Hidden inputs for RHF integration - using Controller components */}
      <LocationHiddenFields
        control={control}
        locationData={locationData}
      />
      {/* Modals remain the same */}
      <PostalCodeModal />
      <LocationDetailModal />
    </LocationFieldContext.Provider>
  );
};
```

### Phase 5: Usage Examples

#### 5.1 Form Integration Example
```typescript
const MyForm: React.FC = () => {
  const { control, handleSubmit, watch } = useForm<{
    location: RHFLocationData;
    otherField: string;
  }>({
    defaultValues: {
      location: {
        addressDetail: '',
        addressFormatted: '',
        coordinates: { latitude: 0, longitude: 0 },
        city: { cityId: 0, cityName: '' },
        province: { provinceId: 0, provinceName: '' },
        district: { districtId: 0, districtName: '' },
        postalCode: '',
      },
      otherField: '',
    },
  });

  const locationValue = watch('location');

  const onSubmit = (data: any) => {
    console.log('Form data:', data.location);
    // Full location object is available in form data
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Simplified provider usage - no name prop needed */}
      <LocationFieldProvider
        control={control}
        defaultCoordinates={{ latitude: -6.2088, longitude: 106.8456 }}
      >
        <LocationFieldInput />
        {/* Manual address detail input */}
        <Input
          {...register('location.addressDetail')}
          placeholder="Enter detailed address"
          label="Address Detail"
        />
      </LocationFieldProvider>

      <Input {...register('otherField')} label="Other Field" />

      <Button type="submit">Submit</Button>

      {/* Debug: Show current location values */}
      <pre>{JSON.stringify(locationValue, null, 2)}</pre>
    </form>
  );
};
```

#### 5.2 Schema Validation Example
```typescript
import { object, string, number } from 'valibot';

const locationSchema = object({
  addressDetail: string('Address detail is required'),
  addressFormatted: string('Formatted address is required'),
  coordinates: object({
    latitude: number('Latitude is required'),
    longitude: number('Longitude is required'),
  }),
  city: object({
    cityId: number('City ID is required'),
    cityName: string('City name is required'),
  }),
  province: object({
    provinceId: number('Province ID is required'),
    provinceName: string('Province name is required'),
  }),
  district: object({
    districtId: number('District ID is required'),
    districtName: string('District name is required'),
  }),
  postalCode: string('Postal code is required'),
});

const formSchema = object({
  location: locationSchema,
  otherField: string('Other field is required'),
});
```

### Phase 6: Migration Strategy

#### 6.1 Backward Compatibility
- Maintain existing provider interface with deprecation warnings
- Provide adapter component for gradual migration
- Support both callback and RHF integration during transition

#### 6.2 Migration Path
1. **Phase 1**: Update types and create new interfaces
2. **Phase 2**: Implement RHF integration alongside existing system
3. **Phase 3**: Update existing forms one by one
4. **Phase 4**: Remove deprecated callback system
5. **Phase 5**: Clean up unused code and optimize

#### 6.3 Breaking Changes
- `onLocationChange` prop will be removed
- Provider requires `control` prop (no `name` prop - defaults to "location")
- Data structure changes (nested object format)
- Form validation schemas need updates

## Benefits

### Technical Benefits
1. **Direct Form Integration**: No more callback handling
2. **Type Safety**: Full TypeScript support with RHF
3. **Validation**: Leverage RHF's validation system
4. **Performance**: Reduced re-renders and optimized updates
5. **Developer Experience**: Better DX with form state management

### Business Benefits
1. **Consistency**: Standardized form handling across the application
2. **Maintainability**: Cleaner, more predictable code
3. **Scalability**: Easier to extend and modify
4. **Testing**: Simpler unit tests with direct form integration

## Risks and Mitigations

### Technical Risks
1. **Complex Migration**: Gradual migration strategy reduces risk
2. **Type Safety Issues**: Comprehensive testing of new types
3. **Performance Impact**: Benchmark against existing implementation

### Business Risks
1. **Development Time**: Phased approach allows incremental delivery
2. **Training**: Documentation and examples for development team

## Testing Strategy

### Unit Tests
- Test all new components and hooks
- Validate RHF integration
- Test form validation scenarios

### Integration Tests
- Test provider integration with forms
- Test modal interactions with RHF
- Test complete user workflows

### End-to-End Tests
- Test complete location selection flows
- Test form submission with location data
- Test error handling and validation

## Timeline

### Phase 1: Foundation (1-2 weeks)
- Type definitions and interfaces
- Basic component structure
- Initial RHF integration

### Phase 2: Implementation (2-3 weeks)
- Complete provider refactoring
- Hidden inputs implementation
- Modal integration

### Phase 3: Testing & Migration (2-3 weeks)
- Comprehensive testing
- Documentation
- Migration guide

### Phase 4: Rollout (1-2 weeks)
- Gradual migration of existing forms
- Monitoring and bug fixes
- Performance optimization

## Conclusion

This refactoring plan provides a comprehensive approach to integrating the location management system with React Hook Form. The phased approach minimizes risks while delivering immediate benefits. The new architecture will provide better developer experience, improved maintainability, and more robust form handling capabilities.