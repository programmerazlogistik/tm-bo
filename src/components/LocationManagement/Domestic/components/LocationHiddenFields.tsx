import React from "react";

import { Controller } from "react-hook-form";
import type { Control } from "react-hook-form";

import type { RHFLocationData } from "../types";

interface LocationHiddenFieldsProps {
  control: Control<any>;
  locationData: RHFLocationData | null;
}

const LocationHiddenFields: React.FC<LocationHiddenFieldsProps> = ({
  control,
  locationData,
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

export default LocationHiddenFields;
