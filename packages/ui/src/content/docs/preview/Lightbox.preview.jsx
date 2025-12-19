"use client";

import {
  LightboxPreview,
  LightboxProvider,
  LightboxTrigger,
} from "@muatmuat/ui/Lightbox";

export function LightboxPreviewExample() {
  const images = [
    "https://images.unsplash.com/photo-1501854140801-50d01698450b?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800&h=600&fit=crop",
  ];

  return (
    <LightboxProvider title="Image Gallery" media={images} variant="shipper">
      <div className="space-y-6 p-8">
        <div>
          <h3 className="mb-4 text-lg font-semibold">Lightbox Gallery</h3>
          <p className="mb-6 text-neutral-600">
            Click on any image preview to open the lightbox with navigation
            controls
          </p>
        </div>

        {/* Image grid */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {images.map((image, index) => (
            <div key={index} className="space-y-2">
              <h4 className="text-sm font-medium text-neutral-700">
                Image {index + 1}
              </h4>
              <LightboxPreview
                image={image}
                index={index}
                alt={`Sample image ${index + 1}`}
                variant="shipper"
              />
            </div>
          ))}
        </div>

        {/* Custom trigger */}
        <div className="mt-8 rounded-lg bg-neutral-100 p-4">
          <h4 className="mb-3 font-medium">Custom Trigger</h4>
          <LightboxTrigger>
            <button className="rounded-lg bg-primary-700 px-6 py-3 text-white hover:bg-primary-800">
              Open Full Gallery
            </button>
          </LightboxTrigger>
        </div>
      </div>
    </LightboxProvider>
  );
}
