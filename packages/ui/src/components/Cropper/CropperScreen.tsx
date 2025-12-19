// import CropperResponsiveLayout from "./CropperResponsiveLayout";
import { useRef } from "react";

// TODO: This layout should be provided by the consuming application
// import CropperResponsiveLayout from "./layout/Shipper/ResponsiveLayout/CropperResponsiveLayout";
// TODO: These stores should be provided by the consuming application
// import {
//   useImageUploaderActions,
//   useImageUploaderStore,
// } from "../../store/Shipper/forms/imageUploaderStore";

import { useShallowCompareEffect } from "@muatmuat/hooks/use-shallow-effect";
import { useResponsiveNavigation } from "@muatmuat/lib/responsive-navigation";
import "cropperjs/dist/cropper.css";
import type { ReactCropperElement } from "react-cropper";
import Cropper from "react-cropper";

import { ZoomEvent } from "./cropper-types";
import "./cropper_az.css";
import {
  useImageUploaderActions,
  useImageUploaderStore,
} from "./imageUploaderStore";
import { CropperScreenProps } from "./types";

/**
 * A screen-level cropper component that integrates with navigation and store management for image uploading workflows.
 * Designed for specific navigation flows with store integration and responsive layout support.
 */
export const CropperScreen = ({ isCircle, onClose }: CropperScreenProps) => {
  const navigation = useResponsiveNavigation();
  const { image, imageFile } = useImageUploaderStore();
  const { setPreviewImage } = useImageUploaderActions();
  const cropperRef = useRef<ReactCropperElement>(null);
  const defaultRatioRef = useRef<number | null>(null);

  useShallowCompareEffect(() => {
    if (!image || !imageFile) {
      navigation.popTo("/InformasiPesanan");
    }
  }, [image, imageFile]);

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

  const handlePreviewCroppedImage = () => {
    const cropper = cropperRef.current?.cropper;
    if (cropper) {
      // Get filename from imageFile or generate one
      // let fileName =
      //   imageFile?.name ||
      //   `cropped_image_${Date.now()}.${imageFile?.type?.split("/")[1] || "jpeg"}`;

      // // Ensure the filename doesn't have spaces or special characters
      // fileName = fileName.replace(/[^a-zA-Z0-9.-]/g, "_");

      setPreviewImage(
        cropperRef.current?.cropper
          ?.getCroppedCanvas()
          ?.toDataURL(imageFile?.type ?? "image/jpeg", 0.7) ?? ""
      ); // compress at 70%
      navigation.push("/CropperPreview");
    }
  };

  return (
    <>
      <div className="flex min-h-screen items-center">
        <div
          className={`aspect-square ${isCircle ? "modal-cropper-circle" : ""}`}
        >
          <Cropper
            ref={cropperRef}
            style={{ height: "100%", width: "100%" }}
            src={image ?? undefined}
            aspectRatio={1}
            preview={".img-preview"}
            viewMode={0}
            background={true}
            responsive={true}
            autoCropArea={1}
            cropBoxResizable={true}
            minCropBoxHeight={isCircle ? 386 : 0}
            minCropBoxWidth={isCircle ? 300 : 0}
            zoom={handleZoom}
          />
        </div>
      </div>
    </>
  );
};
