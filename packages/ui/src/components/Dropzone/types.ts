import type { ReactNode } from "react";

export interface RenderPlaceholders {
  loading?: ReactNode | null;
  fileUploaded?: ReactNode | null;
  error?: ReactNode | null;
  default?: ReactNode | null;
}

export interface DropzoneComponentProps {
  onUpload: (file: File) => void;
  loading?: boolean;
  file?: File | null;
  placeholder?: ReactNode;
  loadingText?: string;
  renderPlaceholder?: RenderPlaceholders;
  className?: string;
  // Allow any additional props that might be passed to the input element
  [key: string]: unknown;
}

export type DropzoneComponentRef = HTMLDivElement;
