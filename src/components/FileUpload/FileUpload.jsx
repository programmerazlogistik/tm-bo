"use client";

import { useRef, useState } from "react";

import { Button } from "@muatmuat/ui/Button";
import { IconComponent } from "@muatmuat/ui/IconComponent";

const FileUpload = ({
  className,
  label = "Unggah",
  maxSize = 5,
  onError = () => {},
  onSuccess = () => {},
  value = null, // Can now be a File object, a URL string, or null
  acceptedFormats = [".jpg", ".jpeg", ".png"],
  errorMessage,
  showFormatInfo = true, // New prop to control format info display
}) => {
  const fileRef = useRef(null);
  const [internalError, setInternalError] = useState(null);

  // --- MODIFICATION START ---
  // Check the type of the 'value' prop to determine behavior.
  const isFileInstance = value instanceof File;
  const isUrlString = typeof value === "string" && value.trim() !== "";
  const hasValue = isFileInstance || isUrlString;

  // Determine the file name to display, whether from a File object or a URL.
  const displayName = isFileInstance
    ? value.name
    : isUrlString
      ? value.split("/").pop() // Extracts 'file.jpg' from 'https://.../file.jpg'
      : "";
  // --- MODIFICATION END ---

  const displayFormats = acceptedFormats
    .map((format) => format.replace(".", ""))
    .join("/");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setInternalError(null);

    if (!file) {
      if (fileRef.current) {
        fileRef.current.value = null;
      }
      return;
    }

    const fileExtension = `.${file.name.split(".").pop().toLowerCase()}`;
    if (!acceptedFormats.includes(fileExtension)) {
      const message = "Format file tidak sesuai ketentuan";
      onError(message);
      setInternalError(message);
      if (fileRef.current) {
        fileRef.current.value = null;
      }
      return;
    }

    if (file.size > maxSize * 1024 * 1024) {
      const message = `Ukuran file melebihi ${maxSize}MB`;
      onError(message);
      setInternalError(message);
      if (fileRef.current) {
        fileRef.current.value = null;
      }
      return;
    }

    onSuccess(file);
  };

  const handleDelete = () => {
    onSuccess(null);
    setInternalError(null);
    if (fileRef.current) {
      fileRef.current.value = null;
    }
  };

  const displayedError = errorMessage || internalError;

  return (
    <div className={className}>
      <input
        ref={fileRef}
        type="file"
        className="hidden"
        accept={acceptedFormats.join(",")}
        onChange={handleFileChange}
      />
      {/* Use the new 'hasValue' boolean for conditional rendering */}
      {hasValue ? (
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-2">
            <span
              className="line-clamp-1 max-w-[239px] truncate break-all text-xs font-medium text-success-400"
              // Use the new 'displayName' for both the title and text
              title={displayName}
            >
              {displayName}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <IconComponent
              src="/icons/silang.svg"
              onClick={handleDelete}
              className="h-4 w-4 cursor-pointer"
              width={16}
              height={16}
              alt="Hapus file"
            />
            <span
              className="cursor-pointer text-xs font-medium leading-[14.4px] text-primary-700"
              onClick={() => fileRef.current.click()}
            >
              Ubah File
            </span>
          </div>
        </div>
      ) : (
        <div className="flex w-full items-center">
          <Button
            type="button"
            className="shrink-0 rounded-full bg-amber-400 px-8 py-2 text-sm font-semibold text-black hover:bg-amber-500"
            name="upload"
            onClick={() => fileRef.current.click()}
          >
            {label}
          </Button>
          {showFormatInfo && (
            <div className="ml-4 flex w-full flex-1 flex-col">
              <div className="text-xs leading-tight text-neutral-600">
                Format file {displayFormats} maks. {maxSize}MB
              </div>
              {/* <div className="text-xs leading-tight text-neutral-600">
                maks. {maxSize}MB
              </div> */}
            </div>
          )}
        </div>
      )}

      {displayedError && (
        <span className="mt-2 block text-xs text-error-400">
          {displayedError}
        </span>
      )}
    </div>
  );
};

export default FileUpload;
