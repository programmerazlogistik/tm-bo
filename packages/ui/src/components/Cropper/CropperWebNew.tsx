"use client";

import { useCallback, useRef } from "react";

import { cn } from "@muatmuat/lib/utils";
import "cropperjs/dist/cropper.css";
import type { ReactCropperElement } from "react-cropper";
import Cropper from "react-cropper";

import { tMockFn } from "../../lib/mock-t";
import { IconComponent } from "../IconComponent";
import { Modal, ModalContent, ModalTitle } from "../Modal";
import styles from "./CropperWeb.module.scss";
import { ZoomEvent } from "./cropper-types";
import "./cropper_az.css";
import { CropperWebNewProps } from "./types";

/**
 * An enhanced web-based image cropper component with variant support, improved styling, and internationalization.
 * Features multiple styling variants (muatparts/muatrans), translation support, and enhanced modal behavior.
 */
export const CropperWebNew = ({
  imageFile,
  imageSource,
  result,
  isOpen,
  setIsOpen,
  onClose,
  isCircle = false,
  title,
  variant = "muatrans",
  t = tMockFn,
}: CropperWebNewProps) => {
  const cropperRef = useRef<ReactCropperElement>(null);
  const defaultRatioRef = useRef<number | null>(null);

  const buttonSecondaryVariants = {
    muatparts: "border-primary-700 text-primary-700",
    muatrans: "border-muat-trans-secondary-900 text-muat-trans-secondary-900",
  };
  const buttonPrimaryVariants = {
    muatparts: "bg-primary-700 text-neutral-50",
    muatrans: "bg-muat-trans-primary-400 text-neutral-900",
  };

  const cancelCrop = useCallback(() => {
    const cropper = cropperRef.current?.cropper;
    cropper?.reset();
    setIsOpen(false);
    onClose?.(true);
  }, [setIsOpen, onClose]);

  const getCropData = () => {
    const cropper = cropperRef.current?.cropper;
    if (cropper) {
      // Get filename from imageFile or generate one
      let fileName =
        imageFile?.name ||
        `cropped_image_${Date.now()}.${imageFile?.type?.split("/")[1] || "jpeg"}`;

      // Ensure the filename doesn't have spaces or special characters
      fileName = fileName.replace(/[^a-zA-Z0-9.-]/g, "_");

      cropper.getCroppedCanvas().toBlob(
        (blob: Blob | null) => {
          if (blob) {
            const file = new File([blob], fileName, { type: imageFile?.type });
            result?.(file); // Pass actual File object
          }
          cropper.reset();
          setIsOpen(false);
        },
        imageFile?.type,
        0.7
      ); // compress at 70%
    }
  };

  const zoomOut = () => {
    const cropper = cropperRef.current?.cropper;
    cropper?.zoom(-0.1);
  };

  const zoomIn = () => {
    const cropper = cropperRef.current?.cropper;
    cropper?.zoom(0.1);
  };

  const handleZoom = (event: ZoomEvent) => {
    const oldRatio = event.detail.oldRatio;
    const newDefaultRatio =
      defaultRatioRef.current !== null ? defaultRatioRef.current : oldRatio;
    const ratio = event.detail.ratio;
    const isZoomingIn = ratio > oldRatio;
    defaultRatioRef.current = newDefaultRatio;
    // Only prevent zooming in beyond 2x the default ratio
    if (isZoomingIn && ratio > newDefaultRatio * 2) {
      event.preventDefault();
    }
    // Allow zooming out until minimum ratio (usually around 0.1 or lower)
    // You can adjust this minimum value based on your needs
    if (!isZoomingIn && ratio < newDefaultRatio / 2) {
      event.preventDefault();
    }
  };

  if (!isOpen) return null;

  return (
    <Modal
      open={isOpen}
      onOpenChange={setIsOpen}
      withCloseButton={false}
      closeOnOutsideClick={false}
    >
      <ModalContent
        className={`w-[424px] ${isCircle ? "modal-cropper-circle" : ""}`}
        type="muattrans"
      >
        <ModalTitle className="sr-only">
          {title || t("CropperWebNew.uploadImage", {}, "Unggah Gambar")}
        </ModalTitle>
        <div className="px-6 py-9">
          <div className="mb-6 flex flex-col items-center gap-[18px]">
            <span className="text-base font-bold leading-[19.2px] text-neutral-900">
              {title || t("CropperWebNew.uploadImage", {}, "Unggah Gambar")}
            </span>
            <div className="relative h-[386px] w-[386px]">
              <div className="absolute bottom-2 right-2 z-50 flex h-20 w-10 flex-col rounded-lg border border-[#E2E2E2] bg-white">
                <div
                  className="flex h-1/2 cursor-pointer items-center justify-center"
                  onClick={zoomIn}
                >
                  <IconComponent
                    className={styles.icon_zoom}
                    src="/icons/zoom_plus.svg"
                    width={20}
                    height={20}
                  />
                </div>
                <div
                  className="flex h-1/2 cursor-pointer items-center justify-center"
                  onClick={zoomOut}
                >
                  <IconComponent
                    className={styles.icon_zoom}
                    src="/icons/zoom_minus.svg"
                    width={20}
                    height={20}
                  />
                </div>
              </div>
              <Cropper
                ref={cropperRef}
                style={{ height: "100%", width: "100%" }}
                src={imageSource}
                aspectRatio={1}
                preview={".img-preview"}
                viewMode={0}
                background={true}
                responsive={true}
                autoCropArea={1}
                cropBoxResizable={true}
                minCropBoxHeight={isCircle ? 386 : 0}
                minCropBoxWidth={isCircle ? 386 : 0}
                zoom={handleZoom}
              />
              <div className="img-preview" />
            </div>
          </div>
          <div className="flex w-full items-center justify-between">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                cancelCrop();
              }}
              className={cn(
                "flex h-8 min-w-[112px] items-center justify-center rounded-full border bg-white px-3 outline-none",
                buttonSecondaryVariants[variant] ||
                  buttonSecondaryVariants.muatrans
              )}
            >
              <span className="text-sm font-semibold leading-[16.8px]">
                {t("CropperWebNew.cancel", {}, "Batal")}
              </span>
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                getCropData();
              }}
              className={cn(
                "flex h-8 min-w-[112px] items-center justify-center rounded-full px-3 outline-none",
                buttonPrimaryVariants[variant] || buttonPrimaryVariants.muatrans
              )}
              autoFocus
            >
              <span className="text-sm font-semibold leading-[16.8px]">
                {t("CropperWebNew.save", {}, "Simpan")}
              </span>
            </button>
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
};

CropperWebNew.displayName = "CropperWebNew";
