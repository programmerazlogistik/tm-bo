export interface CropperWebProps {
  imageFile?: File;
  imageSource?: string;
  result?: (croppedImage: string) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onClose?: (cancelled: boolean) => void;
  isCircle?: boolean;
  title?: string;
  onApply?: (croppedImage: string) => void;
  aspectRatio?: number;
  viewMode?: number;
  variant?: "muatrans" | "muatparts";
  buttons?: {
    cancelLabel?: string;
    saveLabel?: string;
  };
}

export interface CropperResponsiveProps {
  imageSource?: string;
  result?: (croppedImage: string) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onClose?: (cancelled: boolean) => void;
  isCircle?: boolean;
  previewTitle?: string;
  previewDescription?: string;
  uploadOptions?: Array<{
    src: string;
    title: string;
    onClick: () => void;
  }>;
  isShowPreview?: boolean;
  setIsShowPreview?: (show: boolean) => void;
  fileType?: string;
}

export interface CropperScreenProps {
  isCircle?: boolean;
  onClose?: () => void;
}

export interface CropperPreviewScreenProps {
  // No props for now - uses store internally
}

export interface CropperPreviewResponsiveProps {
  src?: string;
  title?: string;
  setIsShowPreview?: (show: boolean) => void;
  onConfirm?: () => void;
  uploadOptions?: Array<{
    src: string;
    title: string;
    onClick: () => void;
  }>;
  onCancelCrop?: () => void;
  description?: string;
  HeaderMobile?: React.ComponentType<any>;
}

export interface CropperWebNewProps {
  imageFile?: File;
  imageSource?: string;
  result?: (croppedImage: File) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onClose?: (cancelled: boolean) => void;
  isCircle?: boolean;
  title?: string;
  variant?: "muatrans" | "muatparts";
  t?: (
    key: string,
    params?: Record<string, any>,
    defaultValue?: string
  ) => string;
}
