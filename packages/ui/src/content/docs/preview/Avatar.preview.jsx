"use client";

import { useState } from "react";

import { Avatar } from "@muatmuat/ui/Avatar";

export function AvatarPreview() {
  const [useImages, setUseImages] = useState(false);
  const [nameLength, setNameLength] = useState(1);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-4">
        <label className="text-sm font-medium">
          <input
            type="checkbox"
            checked={useImages}
            onChange={(e) => setUseImages(e.target.checked)}
            className="mr-2"
          />
          Use Images
        </label>

        <label className="text-sm font-medium">
          Name Length:
          <select
            value={nameLength}
            onChange={(e) => setNameLength(Number(e.target.value))}
            className="ml-2 rounded border px-2 py-1"
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
          </select>
        </label>
      </div>

      <div className="space-y-4">
        <div>
          <h4 className="mb-3 text-sm font-semibold text-gray-700">
            Different Sizes
          </h4>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex flex-col items-center gap-2">
              <Avatar
                name="Alice"
                size={24}
                src={
                  useImages
                    ? "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
                    : undefined
                }
                nameLength={nameLength}
              />
              <span className="text-xs text-gray-600">24px</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Avatar
                name="Bob Smith"
                size={32}
                src={
                  useImages
                    ? "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
                    : undefined
                }
                nameLength={nameLength}
              />
              <span className="text-xs text-gray-600">32px</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Avatar
                name="Charlie Johnson"
                size={36}
                src={
                  useImages
                    ? "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face"
                    : undefined
                }
                nameLength={nameLength}
              />
              <span className="text-xs text-gray-600">36px</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Avatar
                name="Diana Prince"
                size={48}
                src={
                  useImages
                    ? "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face"
                    : undefined
                }
                nameLength={nameLength}
              />
              <span className="text-xs text-gray-600">48px</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Avatar
                name="Eve Wilson"
                size={64}
                src={
                  useImages
                    ? "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
                    : undefined
                }
                nameLength={nameLength}
              />
              <span className="text-xs text-gray-600">64px</span>
            </div>
          </div>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold text-gray-700">
            Name Variations
          </h4>
          <div className="flex flex-wrap items-center gap-4">
            <Avatar
              name="Madonna"
              size={36}
              src={
                useImages
                  ? "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face"
                  : undefined
              }
              nameLength={nameLength}
            />
            <Avatar
              name="Dr. Maria Consuela Rodriguez"
              size={36}
              src={
                useImages
                  ? "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
                  : undefined
              }
              nameLength={nameLength}
            />
            <Avatar
              name=""
              size={36}
              src={
                useImages
                  ? "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
                  : undefined
              }
              nameLength={nameLength}
            />
          </div>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold text-gray-700">
            Custom Styling
          </h4>
          <div className="flex flex-wrap items-center gap-4">
            <Avatar
              name="Rounded"
              size={36}
              src={
                useImages
                  ? "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
                  : undefined
              }
              className="ring-2 ring-primary-500 ring-offset-2"
            />
            <Avatar
              name="Custom Text"
              size={48}
              src={
                useImages
                  ? "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face"
                  : undefined
              }
              appearance={{ labelClassName: "font-bold text-lg text-red-500" }}
            />
          </div>
        </div>
      </div>

      <p className="text-sm text-gray-600">
        Toggle the checkbox to switch between images and initials. Adjust name
        length to see how different configurations work.
      </p>
    </div>
  );
}
