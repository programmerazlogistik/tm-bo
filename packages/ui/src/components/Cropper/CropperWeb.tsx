"use client";

import { useCallback, useRef } from "react";

import "cropperjs/dist/cropper.css";
import Cropper from "react-cropper";

import { Button } from "../Button";
import { IconComponent } from "../IconComponent";
import { Modal, ModalContent, ModalTitle } from "../Modal";
import styles from "./CropperWeb.module.scss";
import "./cropper_az.css";
import { CropperWebProps } from "./types";

/**
 * A web-based image cropper component with modal interface, zoom controls, and circle cropping support.
 * Provides a complete cropping workflow with zoom in/out functionality and customizable modal styling.
 */
export const CropperWeb = ({
  imageFile,
  imageSource,
  result,
  isOpen,
  setIsOpen,
  onClose,
  isCircle = false,
  title = "Unggah Gambar",
  variant = "muatrans",
  buttons,
}: CropperWebProps) => {
  const cropperRef = useRef<any>(null);
  const defaultRatioRef = useRef<number | null>(null);

  const handleClose = useCallback(() => {
    const cropper = cropperRef.current?.cropper;
    if (cropper) {
      cropper.reset();
    }
    setIsOpen(false);
    if (onClose) {
      onClose(true); // Notify parent component of cancellation
    }
  }, [setIsOpen, onClose]);

  const getCropData = () => {
    const cropper = cropperRef.current?.cropper;
    if (cropper) {
      cropper.getCroppedCanvas().toBlob(
        (blob: Blob | null) => {
          if (blob) {
            const reader = new FileReader();
            reader.onload = () => {
              result?.(reader.result as string); // Pass data URL string
              cropper.reset();
              setIsOpen(false);
            };
            reader.readAsDataURL(blob);
          }
        },
        imageFile?.type,
        0.7 // compress at 70%
      );
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

  const handleZoom = (event: any) => {
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
    // Allow zooming out until minimum ratio
    if (!isZoomingIn && ratio < newDefaultRatio / 2) {
      event.preventDefault();
    }
  };

  return (
    <Modal
      open={isOpen}
      onOpenChange={(open) => !open && handleClose()}
      closeOnOutsideClick
    >
      <ModalContent
        className={`${
          isCircle ? "modal-cropper-circle" : ""
        } w-[424px] rounded-xl bg-white px-6 py-9`}
      >
        <div className="mb-6 flex flex-col items-center gap-[18px]">
          <ModalTitle>{title}</ModalTitle>
          <div className="relative h-[386px] w-[386px]">
            <div className="absolute bottom-2 right-2 z-50 flex h-20 w-10 flex-col rounded-lg border border-[#E2E2E2] bg-white">
              <div
                className="flex h-1/2 cursor-pointer items-center justify-center"
                onClick={zoomIn}
                role="button"
                aria-label="Zoom In"
              >
                <IconComponent
                  className={styles.icon_zoom}
                  src="/icons/zoom_plus.svg"
                  width={20}
                  height={20}
                  alt="Zoom In"
                />
              </div>
              <div
                className="flex h-1/2 cursor-pointer items-center justify-center"
                onClick={zoomOut}
                role="button"
                aria-label="Zoom Out"
              >
                <IconComponent
                  className={styles.icon_zoom}
                  src="/icons/zoom_minus.svg"
                  width={20}
                  height={20}
                  alt="Zoom Out"
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
          <Button
            type="button"
            onClick={handleClose}
            variant={
              variant === "muatparts"
                ? "muatparts-primary-secondary"
                : "muattrans-primary-secondary"
            }
            className="min-w-[112px]"
          >
            {buttons?.cancelLabel ? buttons.cancelLabel : "Batal"}
          </Button>
          <Button
            type="button"
            onClick={getCropData}
            variant={
              variant === "muatparts"
                ? "muatparts-primary"
                : "muattrans-primary"
            }
            className="min-w-[112px]"
            autoFocus
          >
            {buttons?.saveLabel ? buttons.saveLabel : "Simpan"}
          </Button>
        </div>
      </ModalContent>
    </Modal>
  );
};

CropperWeb.displayName = "CropperWeb";
