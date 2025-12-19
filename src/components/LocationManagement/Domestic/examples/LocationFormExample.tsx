import React from "react";

import { useForm } from "react-hook-form";

import { RHFLocationFieldProvider } from "../LocationFieldProvider";
import LocationFieldInput from "../components/LocationFieldInput";
import type { RHFLocationData } from "../types";

/**
 * Example usage of the new RHF-integrated LocationFieldProvider
 *
 * This example shows how to integrate the location management system
 * directly with React Hook Form without manual callback handling.
 */
const LocationFormExample: React.FC = () => {
  const {
    control,
    handleSubmit,
    watch,
    register,
    formState: { errors },
  } = useForm<{
    location: RHFLocationData;
    vendorName: string;
    description: string;
  }>({
    defaultValues: {
      location: {
        addressDetail: "",
        addressFormatted: "",
        coordinates: { latitude: 0, longitude: 0 },
        city: { cityId: 0, cityName: "" },
        province: { provinceId: 0, provinceName: "" },
        district: { districtId: 0, districtName: "" },
        postalCode: "",
      },
      vendorName: "",
      description: "",
    },
  });

  const locationValue = watch("location");

  const onSubmit = (data: any) => {
    console.log("Form submitted with data:", data);
    console.log("Location data:", data.location);

    // Example: Submit to API
    // await submitVendorRegistration(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <h2 className="mb-4 text-lg font-semibold">Vendor Registration</h2>

        {/* Location Field using RHF Integration */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Location *
          </label>

          <RHFLocationFieldProvider
            control={control}
            defaultCoordinates={{ latitude: -6.2088, longitude: 106.8456 }}
          >
            <LocationFieldInput
              placeholder="Search for location..."
              error={errors.location?.addressFormatted?.message}
            />
          </RHFLocationFieldProvider>
        </div>

        {/* Manual Address Detail Input */}
        <div className="mt-4 space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Address Detail *
          </label>
          <input
            {...register("location.addressDetail", {
              required: "Address detail is required",
              minLength: {
                value: 10,
                message: "Address must be at least 10 characters",
              },
            })}
            type="text"
            placeholder="Enter detailed address (street, building, etc.)"
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.location?.addressDetail && (
            <p className="text-sm text-red-500">
              {errors.location.addressDetail.message}
            </p>
          )}
        </div>

        {/* Other Form Fields */}
        <div className="mt-4 space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Vendor Name *
          </label>
          <input
            {...register("vendorName", { required: "Vendor name is required" })}
            type="text"
            placeholder="Enter vendor name"
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.vendorName && (
            <p className="text-sm text-red-500">{errors.vendorName.message}</p>
          )}
        </div>

        <div className="mt-4 space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            {...register("description")}
            placeholder="Enter description"
            rows={3}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Debug Information */}
        <div className="mt-6 rounded-md bg-gray-100 p-4">
          <h3 className="mb-2 text-sm font-semibold">
            Debug: Current Location Values
          </h3>
          <pre className="overflow-auto text-xs">
            {JSON.stringify(locationValue, null, 2)}
          </pre>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Register Vendor
        </button>
      </div>
    </form>
  );
};

export default LocationFormExample;

/**
 * Migration Guide:
 *
 * OLD WAY (with callbacks):
 * ```tsx
 * <LocationFieldProvider
 *   onLocationChange={(locationData) => {
 *     // Manually handle location data
 *     setValue('city', locationData.city);
 *     setValue('postalCode', locationData.postalCode);
 *     // ... etc for all fields
 *   }}
 * >
 *   <LocationFieldInput />
 * </LocationFieldProvider>
 * ```
 *
 * NEW WAY (with RHF integration):
 * ```tsx
 * <RHFLocationFieldProvider control={control}>
 *   <LocationFieldInput />
 *   <input {...register('location.addressDetail')} />
 * </RHFLocationFieldProvider>
 * ```
 *
 * Benefits:
 * 1. No manual callback handling
 * 2. Automatic form validation integration
 * 3. Type-safe field names
 * 4. Cleaner component code
 * 5. Better error handling
 */
