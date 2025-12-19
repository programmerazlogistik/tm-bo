"use client";

import { useEffect, useRef, useState } from "react";

import Quill from "quill";
import "quill/dist/quill.snow.css";

const RichTextEditor = ({
  value,
  onChange,
  placeholder,
  maxLength = 5000,
  errorMessage = "",
  className = "",
  showCounter = false,
}) => {
  const editorRef = useRef(null);
  const quillRef = useRef(null);
  const [currentLength, setCurrentLength] = useState(0);
  const [isQuillReady, setIsQuillReady] = useState(false);
  const isInitialMount = useRef(true);
  const valueRef = useRef(value);
  const lastSetValue = useRef("");

  const onChangeRef = useRef(onChange);
  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  // Update valueRef when value changes
  useEffect(() => {
    valueRef.current = value;
  }, [value]);

  useEffect(() => {
    if (editorRef.current && !quillRef.current) {
      const editorElement = editorRef.current; // Capture for cleanup
      const quill = new Quill(editorElement, {
        theme: "snow",
        placeholder,
        modules: {
          toolbar: {
            container: [
              ["undo", "redo"],
              [{ header: [1, 2, 3, false] }],
              ["bold", "italic", "underline", "strike"],
              ["code"],
              [{ color: [] }, { background: [] }],
              [{ list: "ordered" }, { list: "bullet" }],
              [{ indent: "-1" }, { indent: "+1" }],
              ["link", "image", "code-block", "blockquote"],
            ],
            handlers: {
              undo: function () {
                this.quill.history.undo();
              },
              redo: function () {
                this.quill.history.redo();
              },
            },
          },
          history: {
            delay: 1000,
            maxStack: 100,
            userOnly: true,
          },
        },
        formats: [
          "header",
          "bold",
          "italic",
          "underline",
          "strike",
          "code",
          "color",
          "background",
          "list",
          "indent",
          "link",
          "image",
          "code-block",
          "blockquote",
        ],
      });

      quillRef.current = quill;

      // Mark Quill as ready
      setIsQuillReady(true);

      // Set initial value if exists
      if (
        valueRef.current &&
        valueRef.current !== "" &&
        valueRef.current !== "<p><br></p>"
      ) {
        quill.clipboard.dangerouslyPasteHTML(valueRef.current);
        lastSetValue.current = valueRef.current;
        const text = quill.getText();
        const actualLength = text.length - 1; // Quill adds trailing newline
        setCurrentLength(actualLength);
        isInitialMount.current = false;
        // Blur to prevent auto-focus on initial load
        quill.blur();
      }

      const handleTextChange = (delta, oldDelta, source) => {
        if (source === "user") {
          const text = quill.getText();
          const currentContent = quill.root.innerHTML;

          // Quill adds a trailing newline, so we need to subtract 1 for accurate count
          const actualLength = text.length - 1;
          setCurrentLength(actualLength);

          if (actualLength > maxLength) {
            const overage = actualLength - maxLength;
            quill.deleteText(maxLength, overage);
          } else if (onChangeRef.current) {
            if (currentContent === "<p><br></p>") {
              onChangeRef.current("");
            } else {
              onChangeRef.current(currentContent);
            }
          }
        }
      };

      quill.on("text-change", handleTextChange);

      return () => {
        if (quillRef.current) {
          quillRef.current.off("text-change", handleTextChange);
          // Remove the auto-generated toolbar to prevent duplication
          const toolbar = editorElement?.previousSibling;
          if (toolbar?.classList?.contains("ql-toolbar")) {
            toolbar.remove();
          }
          quillRef.current = null;
        }
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maxLength]);

  // Update placeholder when it changes without recreating Quill
  useEffect(() => {
    const quill = quillRef.current;
    if (quill) {
      const placeholderElement = quill.root.dataset;
      if (placeholderElement) {
        quill.root.setAttribute("data-placeholder", placeholder);
      }
    }
  }, [placeholder]);

  // Update editor content when value changes externally
  useEffect(() => {
    const quill = quillRef.current;
    if (quill && isQuillReady) {
      const currentContent = quill.root.innerHTML;
      const normalizedValue = value || "";
      const normalizedCurrent =
        currentContent === "<p><br></p>" ? "" : currentContent;

      // Check if value is different from what's currently in the editor
      const valueChanged = normalizedValue !== normalizedCurrent;
      const valueChangedFromLast = normalizedValue !== lastSetValue.current;

      // Update if:
      // 1. Value is different from current content
      // 2. Value is different from last set value (to catch delayed setValue)
      // 3. Editor is not focused
      // 4. Not empty value
      if (
        valueChanged &&
        valueChangedFromLast &&
        !quill.hasFocus() &&
        normalizedValue !== ""
      ) {
        quill.clipboard.dangerouslyPasteHTML(normalizedValue);
        lastSetValue.current = normalizedValue;
        const text = quill.getText();
        const actualLength = text.length - 1;
        setCurrentLength(actualLength);
        isInitialMount.current = false;
        // Blur to prevent auto-focus after external update
        quill.blur();
      }
    }
  }, [value, isQuillReady]);

  return (
    <div className="quill-editor-container">
      <div
        className={`quill-editor-container relative flex w-full flex-col overflow-hidden rounded-md border ${errorMessage !== "" ? "border-error-400 focus-within:border-error-400 hover:border-error-400" : "!border-neutral-600 focus-within:border-primary-500 hover:border-primary-500"} bg-neutral-50 transition-colors ${className}`}
      >
        <div ref={editorRef} className="min-h-[62px] w-full" />

        <style jsx global>{`
          .quill-editor-container .ql-toolbar.ql-snow {
            border: none !important;
            border-bottom: 1px solid #ccc !important;
            padding: 8px !important;
            background: #fafafa;
          }

          .quill-editor-container .ql-toolbar .ql-formats {
            margin-right: 15px;
          }

          /* Custom icons for undo/redo buttons */
          .ql-snow .ql-toolbar button.ql-undo::after {
            content: "↶";
            font-size: 18px;
          }

          .ql-snow .ql-toolbar button.ql-redo::after {
            content: "↷";
            font-size: 18px;
          }

          /* Styling untuk area editor (.ql-container) */
          .quill-editor-container .ql-container.ql-snow {
            border: none !important;
            font-family: inherit;
          }

          /* Styling untuk area teks di dalam editor */
          .quill-editor-container .ql-editor {
            padding: 5px 12px !important;
            font-size: 14px !important;
            font-weight: 500 !important;
            color: #17171f !important;
            min-height: 62px !important;
            line-height: 1.5 !important;
            overflow-wrap: break-word !important;
            word-wrap: break-word !important;
            word-break: break-word !important;
          }

          @media (min-width: 768px) {
            .quill-editor-container .ql-editor {
              font-size: 12px !important;
              color: #000000 !important;
              overflow-wrap: break-word !important;
              word-wrap: break-word !important;
              word-break: break-word !important;
            }
          }

          /* Styling untuk Placeholder */
          .quill-editor-container .ql-editor.ql-blank::before {
            color: #7b7b7b !important;
            font-style: normal !important;
            font-weight: 600 !important;
            font-size: 14px !important;
            left: 12px !important;
            top: 7px !important;
            line-height: 1.1 !important;
            right: 12px !important;
            pointer-events: none;
          }

          @media (min-width: 768px) {
            .quill-editor-container .ql-editor.ql-blank::before {
              font-weight: 500 !important;
              font-size: 12px !important;
            }
          }

          .quill-editor-container .ql-toolbar .ql-formats button {
            width: 24px !important;
            height: 24px !important;
            padding: 2px !important;
          }
        `}</style>
      </div>
      <div
        className={`mt-2 flex items-center justify-between text-xs font-medium`}
      >
        <span
          className={`${errorMessage ? "text-error-400" : "text-neutral-600"}`}
        >
          {errorMessage}
        </span>
        {showCounter && (
          <span
            className={`${errorMessage ? "text-error-400" : "text-neutral-600"}`}
          >
            {currentLength}/{maxLength}
          </span>
        )}
      </div>
    </div>
  );
};

export default RichTextEditor;
