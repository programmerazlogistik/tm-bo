"use client";

import { useCallback, useRef, useState } from "react";

import { cn } from "@muatmuat/lib/utils";
import { IconComponent } from "@muatmuat/ui/IconComponent";

import { toast } from "@/lib/toast";

import Button from "../Button/Button";
import CropperWeb from "../Cropper/CropperWeb";
import { Modal, ModalContent, ModalHeader } from "../Modal/Modal";

const Dropzone = ({ onFileAccepted, inputRef, maxSize, acceptedFormats }) => {
  const [isDragging, setIsDragging] = useState(false);

  const validateFile = useCallback(
    (file) => {
      if (!file) return null;

      const fileExtension = `.${file.name.split(".").pop().toLowerCase()}`;
      if (!acceptedFormats.includes(fileExtension)) {
        toast.error("Format file tidak sesuai ketentuan");
        return null;
      }

      if (file.size > maxSize * 1024 * 1024) {
        toast.error(`Ukuran file maksimal ${maxSize}MB`);
        return null;
      }
      return file;
    },
    [acceptedFormats, maxSize]
  );

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      const file = validateFile(e.dataTransfer.files?.[0]);
      if (file) {
        onFileAccepted(file);
      }
    },
    [onFileAccepted, validateFile]
  );

  const handleFileChange = (e) => {
    const file = validateFile(e.target.files?.[0]);
    if (file) {
      onFileAccepted(file);
    }
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className="text-start">
      <input
        type="file"
        ref={inputRef}
        onChange={handleFileChange}
        accept={acceptedFormats.join(",")}
        className="hidden"
      />
      <div
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "mx-auto flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-primary-700 bg-neutral-50 transition-colors hover:border-primary-800",
          isDragging && "border-primary-700 bg-primary-50"
        )}
      >
        <span className="text-xs font-medium text-neutral-900">
          Browse File
        </span>
      </div>
      <p className="mt-2 text-xs text-neutral-600">
        Format file jpg/png maks. {maxSize}MB
      </p>
    </div>
  );
};

const ImageUploudWithModal = ({
  onSuccess,
  label = "Upload",
  changeLabel = "Ubah",
  maxSize = 10,
  acceptedFormats = [".jpg", ".jpeg", ".png"],
  aspectRatio = 1,
  isCircle = true,
  title = "Unggah Gambar",
  previewSize = 72,
  initialImageUrl = null,
}) => {
  const [croppedImage, setCroppedImage] = useState(initialImageUrl);
  const [imageToCrop, setImageToCrop] = useState(null);
  const [sourceFile, setSourceFile] = useState(null);
  const [isUploadModalOpen, setUploadModalOpen] = useState(false);
  const [isCropModalOpen, setCropModalOpen] = useState(false);
  const fileInputRef = useRef(null);

  const openUploadModal = () => setUploadModalOpen(true);

  const handleFileAccepted = (file) => {
    setSourceFile(file);
    setImageToCrop(URL.createObjectURL(file));
    setUploadModalOpen(false);
    setCropModalOpen(true);
  };

  return (
    <div>
      <div className="flex items-center gap-4">
        <div
          className={cn(
            "relative flex items-center justify-center",
            !croppedImage && "border border-neutral-500 bg-neutral-200"
          )}
          style={{
            height: previewSize,
            width: previewSize,
            borderRadius: isCircle ? "9999px" : "8px",
            overflow: "hidden",
            cursor: "pointer",
          }}
          onClick={openUploadModal}
          title={croppedImage ? "Change Image" : "Upload Image"}
        >
          {croppedImage ? (
            <img
              src={croppedImage}
              alt="Preview"
              className="h-full w-full object-cover"
              style={{
                borderRadius: isCircle ? "9999px" : "8px",
              }}
            />
          ) : (
            <IconComponent
              src="/icons/photo.svg"
              width={18}
              height={18}
              className="text-neutral-700"
            />
          )}
        </div>
        <div className="flex items-center">
          <Button type="button" onClick={openUploadModal} className="!px-8">
            {croppedImage ? changeLabel : label}
          </Button>
          <div className="ml-2 text-xs leading-tight text-neutral-600">
            Format file jpg/png
            <br />
            maks. {maxSize}MB
          </div>
        </div>
      </div>

      {/* Modal Upload */}
      <Modal open={isUploadModalOpen} onOpenChange={setUploadModalOpen}>
        <ModalContent size="small" className="w-[550px]" type="muattrans">
          <ModalHeader />
          <div className="rounded-lg bg-white p-6 px-[67px]">
            <h3 className="mb-6 mt-2 text-center text-sm font-bold">{title}</h3>
            <Dropzone
              onFileAccepted={handleFileAccepted}
              inputRef={fileInputRef}
              maxSize={maxSize}
              acceptedFormats={acceptedFormats}
            />
          </div>
        </ModalContent>
      </Modal>

      {/* Cropper Modal */}
      <CropperWeb
        imageFile={sourceFile}
        imageSource={imageToCrop}
        result={(file) => {
          const previewUrl = URL.createObjectURL(file);
          setCroppedImage(previewUrl);
          onSuccess?.(file);
          setImageToCrop(null);
          setSourceFile(null);
          setCropModalOpen(false);
        }}
        isOpen={isCropModalOpen}
        setIsOpen={setCropModalOpen}
        onClose={() => {
          setCropModalOpen(false);
          setImageToCrop(null);
          setSourceFile(null);
          setUploadModalOpen(true);
        }}
        isCircle={isCircle}
        title={title}
        aspectRatio={aspectRatio}
      />
    </div>
  );
};

export default ImageUploudWithModal;
