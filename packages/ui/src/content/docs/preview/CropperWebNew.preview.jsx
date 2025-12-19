"use client";

import { useState } from "react";

import { CropperWebNew } from "@muatmuat/ui/Cropper";

export function CropperWebNewPreview() {
  const [isOpen, setIsOpen] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imageSource, setImageSource] = useState("");
  const [croppedImage, setCroppedImage] = useState(null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
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

      <CropperWebNew
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        imageFile={imageFile}
        imageSource={imageSource}
        result={handleCropResult}
        onClose={handleClose}
        isCircle={false}
        variant="muattrans"
        title="Upload Image"
      />

      {croppedImage && (
        <div className="mt-4">
          <p className="mb-2 text-sm text-gray-600">Cropped File:</p>
          <div className="text-xs text-gray-500">
            Name: {croppedImage.name}
            <br />
            Size: {croppedImage.size} bytes
            <br />
            Type: {croppedImage.type}
          </div>
        </div>
      )}
    </div>
  );
}
