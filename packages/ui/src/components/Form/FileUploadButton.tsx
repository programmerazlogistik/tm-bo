import {
  ChangeEvent,
  FC,
  ReactNode,
  useCallback,
  useRef,
  useState,
} from "react";

// Assuming these components and hooks exist
import { Button, ButtonVariant } from "@muatmuat/ui/Button";
import { IconComponent } from "@muatmuat/ui/IconComponent";
import { toast } from "@muatmuat/ui/Toaster";

import { type TranslationFunction, tMockFn } from "../../lib/mock-t";

export interface UploadResponse {
  fileUrl: string;
  fileName: string;
}

// Define the allowed file types
export type FileType = "pdf" | "jpg" | "png" | "xlsx" | "zip";

// --- INTERFACES (Props expect translated strings for messages) ---
export interface FileUploadButtonProps {
  value?: string | null;
  onChange?: (value: string | null) => void;
  name?: string;
  labelButton?: string; // Button text if provided
  errorMessage?: string; // ALREADY TRANSLATED error string
  disabled?: boolean;
  accept?: FileType[];
  messageInvalidFormat?: string; // ALREADY TRANSLATED validation string
  messageInvalidSize?: string; // ALREADY TRANSLATED validation string
  messageUploadFailed?: string; // ALREADY TRANSLATED validation string
  maxSize?: number;
  fileName?: string;
  onBlur?: (e: any) => void;
  onUpload?: (
    file: File,
    onProgress: (progress: number) => void
  ) => Promise<UploadResponse>;
  t?: TranslationFunction;
  variant?: ButtonVariant;
}

interface ProgressBarProps {
  progress: number;
}

interface UseFileChangeHandlerProps {
  accept: string;
  maxSize?: number;
  uploadFile: (file: File) => Promise<UploadResponse>;
  onChange?: (value: string | null) => void;
  messageInvalidFormat?: string; // Expects ALREADY TRANSLATED string
  messageInvalidSize?: string; // Expects ALREADY TRANSLATED string
  onBeforeUpload?: () => void;
  // t removed as it's not needed for these messages
}

interface UploadProgressDisplayProps {
  isUploading: boolean;
  uploadProgress: number;
  accept: string;
  maxSize?: number;
  t: TranslationFunction;
}

interface FileUrlPreviewProps {
  fileUrl: string;
  fileName?: string;
  onRemove: () => void;
  disabled?: boolean;
  openFileDialog: (e?: React.MouseEvent) => void;
  t: TranslationFunction;
}

interface UploadTriggerProps {
  name?: string;
  labelButton?: string; // Use this prop directly for button text
  errorMessage?: string; // Expects ALREADY TRANSLATED string
  disabled?: boolean;
  accept: string;
  maxSize?: number;
  isUploading: boolean;
  uploadProgress: number;
  onBlur?: (e: any) => void;
  openFileDialog: (e?: React.MouseEvent) => void;
  t: TranslationFunction;
  variant: ButtonVariant;
  [key: string]: any;
}

// --- UTILITY FUNCTIONS (Unchanged) ---
const mapFileTypesToMimeTypes = (fileTypes: FileType[]): string => {
  const mimeTypeMap: Record<FileType, string> = {
    pdf: "application/pdf",
    jpg: "image/jpeg",
    png: "image/png",
    xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    zip: "application/zip",
  };
  return fileTypes.map((type) => mimeTypeMap[type]).join(",");
};

const formatFileSize = (sizeInBytes?: number): string => {
  if (!sizeInBytes || sizeInBytes <= 0) return "0 B";
  const kb = sizeInBytes / 1024;
  const mb = kb / 1024;
  if (mb >= 1) {
    const formattedMB = mb % 1 === 0 ? mb.toFixed(0) : mb.toFixed(1);
    return `${formattedMB}MB`;
  }
  if (kb >= 1) return `${Math.round(kb)}KB`;
  return `${sizeInBytes}B`;
};

// --- COMPONENTS (Unchanged except where translation is applied) ---

const ProgressBar: FC<ProgressBarProps> = ({ progress }) => {
  const clampedProgress = Math.max(0, Math.min(100, progress || 0));
  return (
    <div className="relative h-[14px] w-[168px] self-center overflow-hidden rounded-[20px] bg-neutral-400">
      <div
        className="absolute left-0 top-0 h-full bg-primary-700 transition-[width] duration-300 ease-linear"
        style={{ width: `${clampedProgress}%` }}
        aria-valuenow={clampedProgress}
        aria-valuemin={0}
        aria-valuemax={100}
        role="progressbar"
      />
    </div>
  );
};

// validateFile accepts translated messages
const validateFile = ({
  file,
  accept,
  maxSize,
  messageInvalidFormat, // Expecting translated string
  messageInvalidSize, // Expecting translated string
}: {
  file: File;
  accept: string;
  maxSize?: number;
  messageInvalidFormat?: string;
  messageInvalidSize?: string;
}) => {
  const errors = {
    type: false,
    size: false,
  };

  if (accept && accept !== "*") {
    const allowedTypes = accept.split(",").map((type) => type.trim());
    const fileTypeValid = allowedTypes.some((allowedType) => {
      if (allowedType === "*") return true;
      if (allowedType.includes("*")) {
        const [mainType] = allowedType.split("/");
        return file.type.startsWith(`${mainType}/`);
      }
      return file.type === allowedType;
    });

    if (!fileTypeValid && messageInvalidFormat) {
      toast.error(messageInvalidFormat);
      errors.type = true;
    }
  }

  if (maxSize && maxSize > 0 && file.size > maxSize && messageInvalidSize) {
    errors.size = true;
    toast.error(messageInvalidSize);
  }

  return errors;
};

// Hook updated to not require `t` for messages, receives translated strings directly
const useFileChangeHandler = ({
  accept,
  maxSize,
  uploadFile,
  onChange,
  messageInvalidFormat, // Expects translated string
  messageInvalidSize, // Expects translated string
  onBeforeUpload,
}: UseFileChangeHandlerProps) => {
  const handleFileChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (event.target) event.target.value = "";
      if (!file) return;

      // Pass translated messages directly to validateFile
      const validation = validateFile({
        file,
        accept,
        maxSize,
        messageInvalidFormat,
        messageInvalidSize,
      });
      if (validation.type || validation.size) return;

      onBeforeUpload?.();
      try {
        const uploadResult = await uploadFile(file);
        if (onChange && uploadResult?.fileUrl) {
          onChange(uploadResult.fileUrl);
        } else if (onChange) {
          // onChange(null);
        }
      } catch (error) {
        // Error toast handled by handleUploadFile
        console.error("Upload failed in handleFileChange:", error);
      }
    },
    [
      accept,
      maxSize,
      uploadFile,
      onChange,
      messageInvalidFormat,
      messageInvalidSize,
      onBeforeUpload,
    ]
  );
  return { handleFileChange };
};

const UploadProgressDisplay: FC<UploadProgressDisplayProps> = ({
  isUploading,
  uploadProgress,
  accept,
  maxSize,
  t,
}) => {
  if (isUploading) {
    return <ProgressBar progress={uploadProgress} />;
  }
  // Keep existing t call for format info
  return (
    <span
      className="text-sm font-medium text-neutral-500"
      dangerouslySetInnerHTML={{
        __html: t(
          "FileUploadButton.label.fileFormatInfo",
          {
            accept: accept || "*",
            size: formatFileSize(maxSize),
          },
          `Format file ${accept || "*"}<br/>maks. ${formatFileSize(maxSize)}` // Indonesian Fallback remains
        ),
      }}
    />
  );
};

const FileUrlPreview: FC<FileUrlPreviewProps> = ({
  fileUrl,
  fileName,
  onRemove,
  disabled,
  openFileDialog,
  t,
}) => {
  // Keep existing t call for default filename
  const displayName =
    fileName ||
    fileUrl?.split("/")?.pop() ||
    t("FileUploadButton.label.defaultFileName", {}, "File"); // Indonesian Fallback remains

  return (
    <div className="flex w-full flex-col">
      <div className="flex items-center justify-between gap-2">
        <span
          className="line-clamp-1 break-all text-sm font-medium text-success-400"
          title={displayName}
        >
          {displayName}
        </span>
        {!disabled && (
          <div className="flex flex-shrink-0 items-center gap-4">
            <button
              type="button"
              onClick={onRemove}
              aria-label="Hapus file" // Keep aria-label hardcoded
              className="flex-shrink-0"
            >
              <IconComponent
                src="/icons/close12.svg"
                className="size-3 text-neutral-700"
              />
            </button>
            <button
              type="button"
              onClick={openFileDialog}
              className="flex-shrink-0 cursor-pointer text-sm font-medium text-primary-700"
            >
              {/* Keep existing t call for change button */}
              {t("FileUploadButton.button.changeFile", {}, "Ubah File")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const UploadTrigger: FC<UploadTriggerProps> = ({
  labelButton,
  errorMessage, // Expects ALREADY TRANSLATED string
  disabled,
  accept,
  maxSize,
  isUploading,
  uploadProgress,
  onBlur,
  t,
  openFileDialog,
  variant,
  ...props
}) => {
  const handleButtonClick = (event: React.MouseEvent) => {
    openFileDialog(event);
  };

  // Keep existing t call for default label
  const defaultButtonLabel = t(
    "FileUploadButton.button.uploadDefaultLabel",
    {},
    "Unggah" // Indonesian fallback remains
  );

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex items-center gap-4">
        <Button
          type="button"
          variant={variant}
          className="h-8 cursor-pointer rounded-[20px] px-6 py-2 text-sm font-semibold"
          disabled={disabled || isUploading}
          onClick={handleButtonClick}
          onBlur={onBlur}
          {...props}
        >
          {labelButton || defaultButtonLabel}
        </Button>

        <UploadProgressDisplay
          isUploading={isUploading}
          uploadProgress={uploadProgress}
          accept={accept}
          maxSize={maxSize}
          t={t}
        />
      </div>

      {/* Display the errorMessage directly as it's already translated */}
      {errorMessage && (
        <span className="text-xs font-medium text-error-500">
          {errorMessage}
        </span>
      )}
    </div>
  );
};

// --- Main Component (Corrected Prop Handling) ---

export const FileUploadButton: FC<FileUploadButtonProps> = ({
  value,
  onChange,
  name,
  labelButton,
  errorMessage, // Receives ALREADY TRANSLATED string or undefined
  disabled = false,
  accept = ["pdf", "jpg", "png"],
  messageInvalidFormat, // Receives translation KEY or fallback string
  messageInvalidSize, // Receives translation KEY or fallback string
  messageUploadFailed,
  maxSize = 5 * 1024 * 1024,
  fileName,
  onUpload,
  t = tMockFn,
  variant = "muatparts-primary",
  ...props
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Default for Invalid Format
  messageInvalidFormat =
    messageInvalidFormat ||
    t(
      "FileUploadButton.validation.invalidFormat", // Use prop key or default key
      {}, // Params object
      "Format file tidak memenuhi persyaratan" // Indonesian fallback
    );

  // Default for Invalid Size
  messageInvalidSize = t(
    messageInvalidSize || "FileUploadButton.validation.invalidSize", // Use prop key or default key
    {}, // Params object
    "Ukuran file melebihi batas yang diizinkan" // Indonesian fallback
  );

  // Default for Upload Failed (assuming prop is messageUploadFailed)
  messageUploadFailed = t(
    messageUploadFailed || "FileUploadButton.message.error.uploadFailed", // Use prop key or default key
    {}, // Params object
    "Gagal melakukan upload dokumen" // Indonesian fallback
  );

  const handleUploadFile = useCallback(
    async (file: File): Promise<UploadResponse> => {
      if (!onUpload) throw new Error("onUpload is required");
      setIsUploading(true);
      setUploadProgress(0);
      try {
        const result = await onUpload(file, setUploadProgress);
        return result;
      } catch (err) {
        // Use the translated upload failure message
        toast.error(messageUploadFailed);
        throw err;
      } finally {
        setIsUploading(false);
        setUploadProgress(0);
      }
    },
    [messageUploadFailed, onUpload] // Depend on the translated string
  );

  const acceptDisplay = accept.join(", ");
  const acceptMimeTypes = mapFileTypesToMimeTypes(accept);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleRemove = useCallback(() => {
    onChange?.(null);
  }, [onChange]);

  const openFileDialog = useCallback((event?: React.MouseEvent) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, []);

  // Pass TRANSLATED messages to the hook
  const commonHandlerProps = {
    accept: acceptMimeTypes,
    maxSize,
    uploadFile: handleUploadFile,
    onChange,
    messageInvalidFormat,
    messageInvalidSize,
    // t removed here
  };

  const { handleFileChange: handleChangeExistingFile } = useFileChangeHandler({
    ...commonHandlerProps,
    onBeforeUpload: handleRemove,
  });

  const { handleFileChange: handleInitialUpload } = useFileChangeHandler({
    ...commonHandlerProps,
    onBeforeUpload: undefined,
  });

  const renderContent = (): ReactNode => {
    if (typeof value === "string" && value.trim() !== "") {
      return (
        <FileUrlPreview
          fileUrl={value}
          fileName={fileName}
          onRemove={handleRemove}
          disabled={disabled}
          openFileDialog={openFileDialog}
          t={t} // Pass t down for internal text
        />
      );
    }

    return (
      <UploadTrigger
        name={name}
        labelButton={labelButton}
        errorMessage={errorMessage} // Pass the ALREADY TRANSLATED errorMessage
        disabled={disabled}
        accept={acceptDisplay}
        maxSize={maxSize}
        isUploading={isUploading}
        uploadProgress={uploadProgress}
        t={t} // Pass t down for internal text (default button label)
        openFileDialog={openFileDialog}
        variant={variant}
        {...props}
      />
    );
  };

  return (
    <div>
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept={acceptMimeTypes}
        onChange={value ? handleChangeExistingFile : handleInitialUpload}
        disabled={disabled || isUploading}
      />
      {renderContent()}
    </div>
  );
};
