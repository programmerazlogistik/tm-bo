"use client";

import { useState } from "react";

import { Dropzone } from "@muatmuat/ui/Dropzone";

export function DropzonePreview() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleUpload = async (uploadedFile) => {
    setLoading(true);
    setError(false);

    // Simulate upload process
    setTimeout(() => {
      // Simulate success or error randomly
      if (Math.random() > 0.3) {
        setFile(uploadedFile);
        setError(false);
      } else {
        setError(true);
        setFile(null);
      }
      setLoading(false);
    }, 2000);
  };

  const handleReset = () => {
    setFile(null);
    setError(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="mb-3 block text-sm font-medium">
          Upload Product Image
        </label>
        <Dropzone
          onUpload={handleUpload}
          file={file}
          loading={loading}
          placeholder="Upload or drag product image here"
          renderPlaceholder={{
            loading: (
              <div className="flex flex-col items-center gap-4">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary-700 border-t-transparent" />
                <p className="text-xs font-semibold text-neutral-900">
                  Uploading...
                </p>
                <p className="text-xs text-neutral-500">
                  Please wait while we upload your image
                </p>
              </div>
            ),
            fileUploaded: file && (
              <div className="flex flex-col items-center gap-2">
                <div className="h-12 w-12 rounded-full bg-green-100 p-2">
                  <svg
                    className="h-full w-full text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <p className="text-xs font-semibold text-neutral-900">
                  {file.name}
                </p>
                <p className="text-xs text-neutral-500">
                  ({(file.size / 1024).toFixed(2)} KB)
                </p>
                <button
                  onClick={handleReset}
                  className="text-xs text-primary-700 hover:underline"
                >
                  Remove file
                </button>
              </div>
            ),
            error: error && (
              <div className="flex flex-col items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-red-100 p-2">
                  <svg
                    className="h-full w-full text-red-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>
                <p className="text-xs font-semibold text-red-600">
                  Upload Failed
                </p>
                <button
                  onClick={handleReset}
                  className="text-xs text-primary-700 hover:underline"
                >
                  Try again
                </button>
              </div>
            ),
            default: (
              <div className="flex flex-col items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-neutral-100 p-2">
                  <svg
                    className="h-full w-full text-neutral-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                </div>
                <div className="text-center">
                  <p className="text-xs text-neutral-900">
                    <span className="font-semibold text-primary-700">
                      Browse files
                    </span>{" "}
                    or drag and drop
                  </p>
                  <p className="mt-1 text-xs text-neutral-500">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
            ),
          }}
        />
        <p className="mt-2 text-xs text-neutral-500">
          Supported formats: PNG, JPG, GIF (Max 10MB)
        </p>
      </div>

      <div>
        <label className="mb-3 block text-sm font-medium">
          Simple Dropzone Example
        </label>
        <Dropzone
          onUpload={(uploadedFile) => {
            console.log("File uploaded:", uploadedFile.name);
          }}
          placeholder="Drop files here or click to browse"
        />
        <p className="mt-2 text-xs text-neutral-500">
          Basic dropzone without custom states
        </p>
      </div>
    </div>
  );
}
