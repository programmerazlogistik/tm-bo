"use client";

import { useState } from "react";

import { CropperResponsive } from "@muatmuat/ui/Cropper";

export function CropperResponsivePreview() {
  const [isOpen, setIsOpen] = useState(false);
  const [imageSource, setImageSource] = useState("");
  const [croppedImage, setCroppedImage] = useState(null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageSource(URL.createObjectURL(file));
      setIsOpen(true);
    }
  };

  const handleCropResult = (result) => {
    setCroppedImage(result);
    setIsOpen(false);
  };

  const handleClose = (cancelled) => {
    setIsOpen(false);
  };

  return (
    <div className="p-6">
      <input
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="mb-4 block w-full text-sm text-gray-500 file:mr-4 file:rounded-full file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100"
      />

      <CropperResponsive
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        imageSource={imageSource}
        result={handleCropResult}
        onClose={handleClose}
        isCircle={false}
        fileType="image/jpeg"
      />

      {croppedImage && (
        <div className="mt-4">
          <p className="mb-2 text-sm text-gray-600">Cropped Result:</p>
          <img
            src={croppedImage}
            alt="Cropped"
            className="h-32 w-32 rounded-full"
          />
        </div>
      )}
    </div>
  );
}
