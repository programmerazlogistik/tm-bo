import { useShallowCompareEffect } from "@muatmuat/hooks/use-shallow-effect";
import { useResponsiveNavigation } from "@muatmuat/lib/responsive-navigation";
import { ImageComponent } from "@muatmuat/ui/ImageComponent";

import { Button } from "../Button";
import { ResponsiveFooter } from "../Footer";
import {
  useImageUploaderActions,
  useImageUploaderStore,
} from "./imageUploaderStore";
import { CropperPreviewScreenProps } from "./types";

/**
 * A screen-level preview component for displaying cropped images with footer actions and navigation integration.
 * Designed for specific navigation flows with store integration and responsive footer support.
 */
export const CropperPreviewScreen = (_: CropperPreviewScreenProps) => {
  const navigation = useResponsiveNavigation();
  const { previewImage } = useImageUploaderStore();
  const { setIsReadyUploadPhoto } = useImageUploaderActions();

  useShallowCompareEffect(() => {
    if (!previewImage) {
      navigation.popTo("/InformasiPesanan");
    }
  }, [previewImage]);

  const handleSaveImage = () => {
    setIsReadyUploadPhoto(true);
    navigation.popTo("/InformasiPesanan");
  };

  return (
    <>
      <div className="mb-16 w-full bg-neutral-100">
        <div className="flex aspect-square w-full justify-center bg-[#cccccc] p-4">
          <div className="overflow-hidden rounded-full">
            <ImageComponent
              alt="preview"
              className="size-full bg-neutral-50"
              src={previewImage || undefined}
              width={100}
              height={100}
            />
          </div>
        </div>
        <div className="mt-6 flex flex-col items-center justify-center gap-y-3">
          <Button
            className="w-[134px]"
            variant="muatparts-primary-secondary"
            onClick={() => {}}
          >
            Ubah Foto
          </Button>
          <span className="text-sm font-medium leading-[14px] text-[#676767]">
            Max. size foto 10MB
          </span>
        </div>
      </div>
      <ResponsiveFooter>
        <Button
          variant="muatparts-primary"
          className="w-full"
          onClick={handleSaveImage}
          type="button"
        >
          Lanjut
        </Button>
      </ResponsiveFooter>
    </>
  );
};

CropperPreviewScreen.displayName = "CropperPreviewScreen";
