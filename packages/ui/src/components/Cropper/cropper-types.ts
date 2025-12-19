import Cropper from "cropperjs";

export interface ZoomEvent {
  detail: {
    oldRatio: number;
    ratio: number;
  };
  preventDefault: () => void;
}

export interface CropperRef {
  current: {
    cropper: Cropper;
  } | null;
}
