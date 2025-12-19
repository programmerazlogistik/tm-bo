"use client";

import { useState } from "react";

import { AvatarDriver } from "@muatmuat/ui/Avatar";

export function AvatarDriverPreview() {
  const [showIcon, setShowIcon] = useState(true);
  const [useCustomStyle, setUseCustomStyle] = useState(false);

  const drivers = [
    {
      name: "Ahmad Surya",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      licensePlate: "B 1234 ABC",
    },
    {
      name: "Budi Santoso",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      licensePlate: "D 5678 DEF",
    },
    {
      name: "Siti Nurhaliza",
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face",
      licensePlate: "B 9012 GHI",
    },
    {
      name: "Rudi Express",
      image:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
      licensePlate: "B 9999 XYZ",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-4">
        <label className="text-sm font-medium">
          <input
            type="checkbox"
            checked={showIcon}
            onChange={(e) => setShowIcon(e.target.checked)}
            className="mr-2"
          />
          Show Transporter Icon
        </label>

        <label className="text-sm font-medium">
          <input
            type="checkbox"
            checked={useCustomStyle}
            onChange={(e) => setUseCustomStyle(e.target.checked)}
            className="mr-2"
          />
          Use Custom Styling
        </label>
      </div>

      <div className="space-y-4">
        <div>
          <h4 className="mb-3 text-sm font-semibold text-gray-700">
            Driver Profiles
          </h4>
          <div className="space-y-3">
            {drivers.map((driver, index) => (
              <AvatarDriver
                key={index}
                {...driver}
                withIcon={showIcon}
                className={
                  useCustomStyle ? "rounded-lg bg-neutral-50 p-3 shadow-sm" : ""
                }
                appearance={
                  useCustomStyle
                    ? {
                        nameClassName: "text-primary-700 font-semibold",
                        licensePlateClassName: "text-primary-600",
                      }
                    : {}
                }
              />
            ))}
          </div>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold text-gray-700">
            Layout Variations
          </h4>
          <div className="space-y-3">
            <div className="flex items-center justify-center">
              <div className="text-center">
                <p className="mb-2 text-sm font-medium text-gray-600">
                  Centered Layout
                </p>
                <AvatarDriver
                  name="Centered Driver"
                  image="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
                  licensePlate="B 7777 CTR"
                  withIcon={showIcon}
                  className="justify-center"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <div>
                <p className="mb-2 text-sm font-medium text-gray-600">
                  Compact
                </p>
                <AvatarDriver
                  name="Compact"
                  image="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face"
                  licensePlate="B 5555 CMP"
                  withIcon={showIcon}
                  className="h-8"
                  appearance={{
                    photoClassName: "h-8 w-8",
                    nameClassName: "text-sm",
                    licensePlateClassName: "text-xs",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <p className="text-sm text-gray-600">
        AvatarDriver components display driver information with photo, name, and
        license plate. Toggle options to see different configurations.
      </p>
    </div>
  );
}
