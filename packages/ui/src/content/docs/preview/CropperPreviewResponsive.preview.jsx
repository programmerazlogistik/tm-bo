"use client";

import { useState } from "react";

import { CropperPreviewResponsive } from "@muatmuat/ui/Cropper";

export function CropperPreviewResponsivePreview() {
  const [isShowPreview, setIsShowPreview] = useState(false);
  const [previewImage] = useState("https://picsum.photos/150");

  const uploadOptions = [
    {
      title: "Camera",
      src: "/icons/camera.svg",
      onClick: () => console.log("Camera clicked"),
    },
    {
      title: "Gallery",
      src: "/icons/gallery.svg",
      onClick: () => console.log("Gallery clicked"),
    },
  ];

  const handleConfirm = () => {
    console.log("Image confirmed");
    setIsShowPreview(false);
  };

  const handleCancel = () => {
    console.log("Image cancelled");
    setIsShowPreview(false);
  };

  return (
    <div className="p-6">
      <button
        onClick={() => setIsShowPreview(true)}
        className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      >
        Show Preview
      </button>

      <CropperPreviewResponsive
        isOpen={isShowPreview}
        src={previewImage}
        title="Upload Foto"
        description="Max. size foto 10MB"
        setIsShowPreview={setIsShowPreview}
        onConfirm={handleConfirm}
        onCancelCrop={handleCancel}
        uploadOptions={uploadOptions}
      />
    </div>
  );
}
