import uploadDownloadProgressPlugin from "xior/plugins/progress";

import { fetcherMPPInter, fetcherMock } from "@/lib/axios";

(fetcherMock as any).plugins.use(uploadDownloadProgressPlugin());
(fetcherMPPInter as any).plugins.use(uploadDownloadProgressPlugin());

export interface UploadResponse {
  fileUrl: string;
  fileName: string;
}

/**
 * Interface for useFileUpload hook options
 */
export interface UseFileUploadOptions {
  onError?: (error: Error) => void;
}

export interface UseFileUploadReturn {
  isLoading: boolean;
  progress: number;
  uploadFile: (file: File) => Promise<UploadResponse>;
}

const USE_MOCK = false;

export const uploadFile = async (file: File): Promise<UploadResponse> => {
  const formData = new FormData();
  formData.append("document", file); // API expects "document" field name

  let response: any;
  if (USE_MOCK) {
    response = await fetcherMock.post("/api/v1/upload", formData); // Mock endpoint
  } else {
    response = await fetcherMPPInter.post(
      "/v1/globals/upload-document", // Real API endpoint
      formData
    );
  }

  // API response structure: { Message: { Code, Text }, Data: { fileUrl, fileName, fileSize } }
  return response.data?.Data;
};

export const uploadFileWithProgress = async (
  file: File,
  onProgress: (progress: number) => void
): Promise<UploadResponse> => {
  const formData = new FormData();
  formData.append("document", file); // API expects "document" field name

  if (USE_MOCK) {
    const response = await fetcherMock.post("/api/v1/upload", formData, {
      onUploadProgress: (progressEvent: any) => {
        const progress = Math.round(progressEvent.progress);
        onProgress(progress);
      },
    });
    return response.data?.Data;
  } else {
    const response = await fetcherMPPInter.post(
      `/v1/globals/upload/upload-document`,
      formData,
      {
        onUploadProgress: (progressEvent: any) => {
          const progress = Math.round(progressEvent.progress);
          onProgress(progress);
        },
      }
    );
    return {
      fileName: response.data?.Data?.originalFileName,
      fileUrl: response.data?.Data?.documentUrl,
    };
  }
};
