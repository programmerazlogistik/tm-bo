import React from "react";

import SelectSearch, { type Option } from "@/components/Select/SelectSearch";

import LocationFieldProvider, {
  RHFLocationFieldProvider,
  useLocationFieldStateMachineContext,
} from "./LocationFieldProvider";
import LocationFieldAddress from "./components/LocationFieldAddress";
import LocationFieldInput from "./components/LocationFieldInput";
import LocationFieldPinPoint from "./components/LocationFieldPinPoint";

// Export only what consumers need to use component
export {
  LocationFieldProvider,
  RHFLocationFieldProvider,
  useLocationFieldStateMachineContext,
};

// Export types for RHF integration
export type {
  LOCATION_FIELD_NAMES,
  LocationFieldProviderProps,
  RHFLocationData,
} from "./types";

interface DistrictSelectProps {
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  className?: string;
  onCreate?: (searchTerm: string) => void;
  placeholder?: string;
  errorMessage?: string;
  name?: string;
  onBlur?: () => void;
  readOnly?: boolean;
  label?: string;
  required?: boolean;
}

// Pre-configured District SelectSearch with districts from API data
const DistrictSelect: React.FC<DistrictSelectProps> = (props) => {
  const { state } = useLocationFieldStateMachineContext();
  const { onChange, readOnly, value } = props;

  // Determine if we're loading place details or have no location selected
  const isLoadingPlaceDetails = state.value === "loadingPlaceDetails";
  const hasSelectedLocation =
    !!state.context.selectedLocation || !!state.context.tempLocationTitle;
  const hasPlaceDetail = !!state.context.placeDetail;

  // Extract district options from location context API data
  const districtOptions: Option[] = React.useMemo(() => {
    // Get districts from place detail data
    const districtsData = (state.context.placeDetail as any)?.districtsData;

    console.log(
      "🔍 FORM_STATE_DEBUG - District options available:",
      districtsData?.length || 0
    );

    if (districtsData?.length > 0) {
      const mappedOptions: Option[] = districtsData.map((district: any) => ({
        label: district.district,
        value: district.districtID.toString(),
        description: `${district.cityName}, ${district.provinceName}`,
      }));

      // Sort alphabetically by district name
      const sortedOptions = mappedOptions.sort((a: Option, b: Option) =>
        a.label.localeCompare(b.label)
      );

      return sortedOptions;
    }

    return [];
  }, [state.context.placeDetail]);

  // Auto-select district whenever place detail changes
  React.useEffect(() => {
    const completeLocation = (state.context.placeDetail as any)?.info;
    const hasPlaceDetail = !!completeLocation;

    if (hasPlaceDetail && districtOptions.length > 0) {
      const expectedDistrict = completeLocation.district;

      if (expectedDistrict) {
        // Find the district that matches the CompleteLocation.district
        const selectedDistrict = districtOptions.find(
          (option) =>
            option.label.toLowerCase() === expectedDistrict.toLowerCase()
        );

        if (selectedDistrict) {
          // Only update if the current value is different from the expected value
          if (props.value !== selectedDistrict.value) {
            onChange?.(selectedDistrict.value);
          }
        } else {
          // Fallback: select the first district if no exact match
          const firstDistrict = districtOptions[0];
          if (props.value !== firstDistrict.value) {
            onChange?.(firstDistrict.value);
          }
        }
      }
    }
  }, [state.context.placeDetail, districtOptions, onChange, props.value]);

  // Read-Only Mode: Use SelectSearch with normal styling but disabled
  if (readOnly) {
    // If we have a value but no district options, create a single option from the value
    const readOnlyOptions =
      districtOptions.length > 0
        ? districtOptions
        : value
          ? [
              {
                label: value,
                value: value,
                description: "",
              },
            ]
          : [];

    return (
      <SelectSearch
        {...props}
        options={readOnlyOptions}
        disabled={true}
        value={value}
      />
    );
  }

  // Determine appropriate placeholder and disabled state
  let placeholder = props.placeholder || "Pilih kecamatan...";
  let disabled = props.disabled;

  if (!hasSelectedLocation) {
    placeholder = "Pilih lokasi terlebih dahulu...";
    disabled = true;
  } else if (isLoadingPlaceDetails) {
    placeholder = "Memuat data kecamatan...";
    disabled = true;
  } else if (hasPlaceDetail) {
    placeholder = "Pilih kecamatan...";
    disabled = false;
  }

  return (
    <SelectSearch
      {...props}
      options={districtOptions}
      placeholder={placeholder}
      disabled={disabled}
    />
  );
};

interface PostalCodeSelectProps {
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  className?: string;
  onCreate?: (searchTerm: string) => void;
  placeholder?: string;
  errorMessage?: string;
  name?: string;
  onBlur?: () => void;
  readOnly?: boolean;
  label?: string;
  required?: boolean;
}

// Pre-configured PostalCode SelectSearch with postal codes from API data
const PostalCodeSelect: React.FC<PostalCodeSelectProps> = (props) => {
  const { state } = useLocationFieldStateMachineContext();
  const {
    onChange,
    readOnly,
    value,
    label = "Kode Pos",
    required = false,
  } = props;

  // Extract postal code options from districts data (same source as DistrictSelect)
  const postalCodeOptions = React.useMemo(() => {
    // Get districts from place detail data (same as DistrictSelect)
    const districtsData = (state.context.placeDetail as any)?.districtsData;

    console.log(
      "🔍 FORM_STATE_DEBUG - PostalCode options available:",
      districtsData?.length || 0
    );

    if (districtsData?.length > 0) {
      // Flatten all postal codes from all districts
      const allPostalCodes: any[] = [];

      districtsData.forEach((district: any) => {
        if (district.postalCodes?.length > 0) {
          district.postalCodes.forEach((postal: any) => {
            // Avoid duplicates
            if (
              !allPostalCodes.find((pc) => pc.postalCode === postal.postalCode)
            ) {
              allPostalCodes.push({
                postalCode: postal.postalCode,
                description: postal.description,
                districtName: district.district,
                cityName: district.cityName,
              });
            }
          });
        }
      });

      // Map to SelectSearch options format
      const mappedOptions = allPostalCodes.map((postal) => ({
        label: postal.postalCode, // Use postal code as label
        value: postal.postalCode,
        description: `${postal.districtName}, ${postal.cityName}`,
      }));

      // Sort alphabetically by postal code value
      const sortedOptions = mappedOptions.sort((a: Option, b: Option) =>
        a.value.localeCompare(b.value)
      );

      return sortedOptions;
    }

    return [];
  }, [state.context.placeDetail]);

  // Auto-select postal code whenever place detail changes
  React.useEffect(() => {
    const completeLocation = (state.context.placeDetail as any)?.info;
    const hasPlaceDetail = !!completeLocation;

    if (hasPlaceDetail && postalCodeOptions.length > 0) {
      const expectedPostalCode = completeLocation.postalCode;

      if (expectedPostalCode) {
        // Find the postal code that matches the CompleteLocation.postal
        const matchingPostal = postalCodeOptions.find(
          (option) => option.value === expectedPostalCode
        );

        if (matchingPostal) {
          // Only update if the current value is different from the expected value
          if (props.value !== matchingPostal.value) {
            onChange?.(matchingPostal.value);
          }
        } else {
          // Fallback: select the first postal code if no exact match
          const firstPostal = postalCodeOptions[0];
          if (props.value !== firstPostal.value) {
            onChange?.(firstPostal.value);
          }
        }
      } else {
        // If no expected postal code but we have options, select the first one
        const firstPostal = postalCodeOptions[0];
        if (props.value !== firstPostal.value) {
          onChange?.(firstPostal.value);
        }
      }
    }
  }, [state.context.placeDetail, postalCodeOptions, onChange, props.value]);

  // Read-Only Mode: Use SelectSearch with normal styling but disabled
  if (readOnly) {
    // If we have a value but no postal code options, create a single option from the value
    const readOnlyOptions =
      postalCodeOptions.length > 0
        ? postalCodeOptions
        : value
          ? [
              {
                label: value,
                value: value,
                description: "",
              },
            ]
          : [];

    return (
      <div className={props.className}>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </label>
        <SelectSearch
          {...props}
          options={readOnlyOptions}
          disabled={true}
          value={value}
        />
      </div>
    );
  }

  return (
    <SelectSearch
      {...props}
      options={postalCodeOptions}
      placeholder={props.placeholder || "Pilih kode pos..."}
    />
  );
};

interface CityInputProps {
  value?: string;
  onChange?: (value: string) => void;
  name?: string;
}

// Pre-configured City Input with hidden fields for cityId and cityName
const CityInput: React.FC<CityInputProps> = () => {
  const { state } = useLocationFieldStateMachineContext();

  // Get current city information from selected location
  const currentCity = state.context.selectedLocation?.city;

  return <span className="font-semibold">{currentCity || "-"}</span>;
};

interface ProvinceInputProps {
  value?: string;
  onChange?: (value: string) => void;
  name?: string;
}

// Pre-configured Province Input with hidden fields for provinceId and provinceName
const ProvinceInput: React.FC<ProvinceInputProps> = () => {
  const { state } = useLocationFieldStateMachineContext();

  // Get current province information from selected location
  const currentProvince = state.context.selectedLocation?.province;

  return <span className="font-semibold">{currentProvince || "-"}</span>;
};

const LocationFieldDomestic: {
  Provider: typeof LocationFieldProvider;
  RHFProvider: typeof RHFLocationFieldProvider; // New RHF-integrated provider
  Input: typeof LocationFieldInput;
  Address: typeof LocationFieldAddress;
  City: typeof CityInput; // City display component
  Province: typeof ProvinceInput; // Province display component
  District: typeof DistrictSelect; // Pre-configured district select with options
  PostalCode: typeof PostalCodeSelect; // Pre-configured postal code select with options
  PinPoint: typeof LocationFieldPinPoint;
} = {
  Provider: LocationFieldProvider,
  RHFProvider: RHFLocationFieldProvider, // New RHF-integrated provider
  Input: LocationFieldInput,
  Address: LocationFieldAddress,
  City: CityInput, // City display component
  Province: ProvinceInput, // Province display component
  District: DistrictSelect, // Pre-configured district select with options
  PostalCode: PostalCodeSelect, // Pre-configured postal code select with options
  PinPoint: LocationFieldPinPoint,
};
export default LocationFieldDomestic;
