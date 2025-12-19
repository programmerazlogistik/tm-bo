import { ChangeEvent, DragEvent, useCallback, useRef, useState } from "react";

import { cn } from "@muatmuat/lib/utils";
import { LoaderCircle } from "lucide-react";

import { IconComponent } from "../IconComponent";
import type { DropzoneComponentProps, RenderPlaceholders } from "./types";

const DropzoneComponent = ({
  onUpload,
  loading = false,
  file,
  placeholder,
  loadingText = "Mengunggah...",
  renderPlaceholder = {
    loading: null,
    fileUploaded: null,
    error: null,
    default: null,
  } as RenderPlaceholders,
  className = "",
  ...props
}: DropzoneComponentProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragEvent = useCallback((e: DragEvent, isEnter: boolean) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(isEnter);
  }, []);

  const handleDrop = useCallback(
    (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      const files = e.dataTransfer.files;
      if (files && files.length > 0) onUpload(files[0]!);
    },
    [onUpload]
  );

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) onUpload(files[0]!);
  };

  const openFileDialog = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
      fileInputRef.current.click();
    }
  };

  const renderContent = () => {
    if (loading) {
      return (
        renderPlaceholder?.loading || (
          <div className="flex flex-col items-center gap-4">
            <LoaderCircle className="size-5 animate-spin text-primary-700" />
            <p className="text-xs font-semibold text-neutral-900">
              {loadingText}
            </p>
          </div>
        )
      );
    }

    if (file) {
      return (
        renderPlaceholder?.fileUploaded || (
          <div className="flex flex-col items-center gap-2">
            <p className="text-xs font-semibold text-neutral-900">
              {file.name} ({(file.size / 1024).toFixed(2)} KB)
            </p>
          </div>
        )
      );
    }

    return (
      renderPlaceholder?.default || (
        <div className="flex flex-col items-center gap-4">
          <IconComponent
            src="/icons/add_image.svg"
            width={20}
            height={20}
            className="text-neutral-500"
          />

          <p className="text-xs text-neutral-900">
            {placeholder || (
              <>
                {" "}
                <span
                  className="font-semibold text-primary-700 underline"
                  onClick={(e) => {
                    e.stopPropagation();
                    openFileDialog();
                  }}
                >
                  Unggah
                </span>{" "}
                atau letakkan file di sini
              </>
            )}
          </p>
        </div>
      )
    );
  };

  return (
    <div
      className={cn(
        "flex h-32 w-full flex-col items-center justify-center rounded-lg border-2 border-dashed",
        isDragging ? "border-primary-700" : "border-neutral-300",
        loading
          ? "bg-neutral-100"
          : "cursor-pointer bg-white hover:border-primary-500",
        className
      )}
      onDragEnter={(e) => handleDragEvent(e, true)}
      onDragLeave={(e) => handleDragEvent(e, false)}
      onDragOver={(e) => handleDragEvent(e, false)}
      onDrop={handleDrop}
      onClick={openFileDialog}
    >
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileSelect}
        disabled={loading}
        {...props}
      />
      {renderContent()}
    </div>
  );
};

export { DropzoneComponent };
