import { useEffect, useRef, useState } from "react";

// Ganti dengan icon upload yang sesuai di project
const IconUpload = (props) => (
  <svg width={32} height={32} fill="none" {...props}>
    <rect width={32} height={32} rx={8} fill="#F3F4F6" />
    <path
      d="M16 22v-8m0 0l-3 3m3-3l3 3"
      stroke="#A3A3A3"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const MAX_SIZE = 10 * 1024 * 1024; // 10MB
const ACCEPT = "image/jpeg,image/png,image/jpg";

const SingleImageUploadBox = ({ label, value, onChange }) => {
  const inputRef = useRef();
  const [preview, setPreview] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (value instanceof File) {
      const url = URL.createObjectURL(value);
      setPreview(url);
      return () => URL.revokeObjectURL(url);
    } else if (typeof value === "string" && value) {
      setPreview(value);
    } else {
      setPreview("");
    }
  }, [value]);

  const handleFile = (e) => {
    setError("");
    const file = e.target.files[0];
    if (!file) return;
    if (!ACCEPT.includes(file.type)) {
      setError("Format harus .jpg/.jpeg/.png");
      return;
    }
    if (file.size > MAX_SIZE) {
      setError("Ukuran maks. 10MB");
      return;
    }
    onChange?.(file);
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    onChange?.(null);
    setError("");
  };

  return (
    <div
      className={`relative flex h-[120px] w-[120px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed bg-white transition hover:border-blue-500 ${error ? "border-red-500" : "border-neutral-300"}`}
      onClick={() => inputRef.current?.click()}
    >
      {preview ? (
        <>
          <img
            src={preview}
            alt={label}
            className="h-full w-full rounded-lg object-cover"
          />
          <button
            type="button"
            className="absolute right-2 top-2 rounded-full bg-white p-1 shadow hover:bg-neutral-100"
            onClick={handleRemove}
          >
            <span className="text-lg">×</span>
          </button>
        </>
      ) : (
        <>
          <IconUpload className="mb-2 text-2xl text-black" />
          <span className="text-center text-xs text-black">{label}</span>
        </>
      )}
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPT}
        className="absolute inset-0 cursor-pointer opacity-0"
        onChange={handleFile}
        tabIndex={-1}
      />
      {error && (
        <span className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded bg-white bg-opacity-80 px-1 text-xs text-red-500">
          {error}
        </span>
      )}
    </div>
  );
};

export default SingleImageUploadBox;
