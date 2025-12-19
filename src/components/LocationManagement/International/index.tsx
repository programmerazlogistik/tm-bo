import React from "react";

import { Input } from "@muatmuat/ui/Form";

import SelectSearch, { type Option } from "@/components/Select/SelectSearch";

import LocationFieldProvider, {
  useLocationFieldStateMachineContext,
} from "./LocationFieldProvider";
import LocationFieldAddress from "./components/LocationFieldAddress";
import LocationFieldInput from "./components/LocationFieldInput";
import LocationFieldPinPoint from "./components/LocationFieldPinPoint";

// Export only what consumers need to use the component
export { LocationFieldProvider, useLocationFieldStateMachineContext };

interface CitySelectProps {
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  className?: string;
  onCreate?: (searchTerm: string) => void;
  placeholder?: string;
  errorMessage?: string;
  name?: string;
  onBlur?: () => void;
}

// Pre-configured City SelectSearch with cities from API data
const CitySelect: React.FC<CitySelectProps> = (props) => {
  const { state } = useLocationFieldStateMachineContext();

  // Extract city options from location context API data
  const cityOptions: Option[] = React.useMemo(() => {
    // Use postal codes from context to generate city options
    if (state.context.postalCodes?.length > 0) {
      const contextCityOptions: Option[] = state.context.postalCodes.map(
        (pc: any) => ({
          label: pc.name,
          value: pc.name,
        })
      );

      // Deduplicate cities from context
      const uniqueContextCities = contextCityOptions.filter(
        (city, index, self) =>
          index === self.findIndex((c) => c.value === city.value)
      );

      // Sort alphabetically by city name
      return uniqueContextCities.sort((a, b) => a.value.localeCompare(b.value));
    }

    return [];
  }, [state.context.postalCodes]);

  return (
    <SelectSearch
      {...props}
      options={cityOptions}
      placeholder={props.placeholder || "Pilih kota..."}
    />
  );
};

interface PostalCodeInputProps {
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  className?: string;
  placeholder?: string;
  errorMessage?: string;
  name?: string;
  onBlur?: () => void;
}

// Simple postal code input component - user can edit and we can autofill
const PostalCodeInput: React.FC<PostalCodeInputProps> = ({
  onChange,
  ...props
}) => {
  // Convert string onChange to Input's ChangeEvent onChange
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event.target.value);
    }
  };

  return (
    <Input
      {...props}
      onChange={handleInputChange}
      placeholder={props.placeholder || "Enter postal code"}
      maxLength={10} // Reasonable limit for postal codes
    />
  );
};

const LocationFieldInternational = {
  Provider: LocationFieldProvider,
  Input: LocationFieldInput,
  Address: LocationFieldAddress,
  City: CitySelect, // Pre-configured city select with options
  PostalCode: PostalCodeInput, // Simple postal code input with autofill
  PinPoint: LocationFieldPinPoint,
};
export default LocationFieldInternational;
