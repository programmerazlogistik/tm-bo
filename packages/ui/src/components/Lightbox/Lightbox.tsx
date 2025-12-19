"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { useDevice } from "@muatmuat/hooks/use-device";
import { Galeri, Zoom } from "@muatmuat/icons";
import { cn } from "@muatmuat/lib/utils";
import { cva } from "class-variance-authority";
import { ChevronLeft, ChevronRight, Play, Video, X } from "lucide-react";
import ReactPlayer from "react-player";

import { ImageComponent } from "../ImageComponent";
import { Modal, ModalContent } from "../Modal";

// --- Utils ---

const getYouTubeThumbnail = (url: string) => {
  try {
    let videoId = "";
    if (url.includes("youtube.com/watch?v=")) {
      videoId = url.split("youtube.com/watch?v=")[1]?.split("&")[0] || "";
    } else if (url.includes("youtu.be/")) {
      videoId = url.split("youtu.be/")[1]?.split("?")[0] || "";
    }
    if (videoId) return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  } catch (e) {
    return "";
  }
  return "";
};

// --- Types ---

export type LightboxMediaType = "image" | "video";

export interface LightboxVideoItem {
  type: "video";
  url: string;
  thumbnail?: string;
  alt?: string;
}

export interface LightboxImageItem {
  type: "image";
  url: string;
  alt?: string;
}

export type LightboxMediaItem = string | LightboxVideoItem | LightboxImageItem;

interface NormalizedMediaItem {
  type: LightboxMediaType;
  url: string;
  thumbnail?: string;
  alt?: string;
}

interface LightboxContextValue {
  media: NormalizedMediaItem[];
  current: number;
  open: boolean;
  openLightbox: (index: number) => void;
  closeLightbox: () => void;
  next: () => void;
  prev: () => void;
}

const LightboxContext = createContext<LightboxContextValue | null>(null);

interface LightboxProviderProps {
  title?: string | ((index: number) => string);
  media?: LightboxMediaItem[];
  children: React.ReactNode;
  variant?: "shipper" | "square";
  appearance?: {
    modalClassName?: string;
    titleClassName?: string;
    imageClassName?: string;
    navButtonClassName?: string;
    previewThumbClassName?: string;
  };
}

// --- Variants ---

export const lightboxModalVariants = cva(
  "relative flex flex-col items-center", // Removed transition-all to prevent jarring layout shifts
  {
    variants: {
      variant: {
        shipper: [
          // Mobile: Full screen, force top-left alignment
          "fixed left-0 top-0 h-[100dvh] w-screen translate-x-0 translate-y-0 rounded-none bg-black p-0",
          // Desktop: Restore Modal centering and styles
          "md:fixed md:left-1/2 md:top-1/2 md:h-auto md:w-[592px] md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-xl md:bg-white md:px-6 md:pb-3 md:pt-8",
        ].join(" "),
        square: "md:w-fit md:pb-[23px]",
      },
    },
    defaultVariants: { variant: "shipper" },
  }
);

export const lightboxTitleVariants = cva(
  "mb-3 hidden text-center text-base font-bold leading-[1.2] md:block",
  {
    variants: { variant: { shipper: "", square: "" } },
    defaultVariants: { variant: "shipper" },
  }
);

export const lightboxImageVariants = cva(
  "h-full w-full bg-black object-contain md:h-[306px] md:w-[544px] md:rounded-[9px]",
  {
    variants: {
      variant: {
        shipper: "",
        square: "md:h-[364px] md:w-[364px] md:object-cover",
      },
      mediaType: {
        image: "",
        video: "md:h-[306px] md:w-[544px]",
      },
    },
    defaultVariants: { variant: "shipper", mediaType: "image" },
  }
);

export const lightboxNavButtonVariants = cva(
  "absolute top-1/2 hidden size-8 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg transition-colors hover:bg-neutral-50 md:flex",
  {
    variants: {
      variant: { shipper: "", square: "" },
      position: { left: "-left-3", right: "-right-3" },
    },
    defaultVariants: { variant: "shipper", position: "left" },
  }
);

export const lightboxPreviewThumbVariants = cva(
  "relative box-border flex-shrink-0 cursor-pointer overflow-hidden object-cover transition-all duration-200",
  {
    variants: {
      variant: { shipper: "", square: "" },
      device: {
        mobile: "size-[80px] rounded-[4px] bg-[#D9D9D9]",
        desktop:
          "size-[56px] rounded-[6px] border-2 border-neutral-400 bg-neutral-100",
      },
      active: { true: "", false: "" },
    },
    compoundVariants: [
      {
        device: "desktop",
        active: true,
        class: "border-primary-700",
      },
      {
        device: "mobile",
        active: true,
        class: "border-[4px] border-[#770000]", // Figma Color
      },
    ],
    defaultVariants: { variant: "shipper", active: false, device: "desktop" },
  }
);

export const lightboxPreviewRootVariants = cva("relative block w-fit", {
  variants: { variant: { shipper: "", square: "" } },
  defaultVariants: { variant: "shipper" },
});

export const lightboxPreviewImageVariants = cva(
  "size-[68px] rounded-xl border border-neutral-400 bg-neutral-100 object-contain",
  {
    variants: { variant: { shipper: "", square: "" } },
    defaultVariants: { variant: "shipper" },
  }
);

export const lightboxPreviewIconVariants = cva(
  "absolute right-1 top-1 flex size-5 cursor-pointer items-center justify-center rounded-full bg-white",
  {
    variants: { variant: { shipper: "", square: "" } },
    defaultVariants: { variant: "shipper" },
  }
);

// --- Main Component ---

export const LightboxProvider: React.FC<LightboxProviderProps> = ({
  title,
  media = [],
  children,
  variant = "shipper",
  appearance,
}) => {
  const { isMobile, mounted } = useDevice();
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(0);
  const thumbnailsRef = useRef<HTMLDivElement>(null);

  // Normalize input media
  const normalizedMedia: NormalizedMediaItem[] = useMemo(() => {
    return media.map((item) => {
      if (typeof item === "string") {
        return { type: "image", url: item };
      }

      let thumb: string | undefined;
      // Safe type guard
      if (item.type === "video") {
        thumb = item.thumbnail;
        if (!thumb) {
          thumb = getYouTubeThumbnail(item.url);
        }
        return {
          type: "video",
          url: item.url,
          thumbnail: thumb,
          alt: item.alt,
        };
      }

      return {
        type: "image",
        url: item.url,
        thumbnail: undefined,
        alt: item.alt,
      };
    });
  }, [media]);

  const openLightbox = (index: number) => {
    setCurrent(index);
    setOpen(true);
  };

  const closeLightbox = () => setOpen(false);

  const next = useCallback(
    () => setCurrent((prev) => (prev + 1) % normalizedMedia.length),
    [normalizedMedia.length]
  );
  const prev = useCallback(
    () =>
      setCurrent(
        (prev) => (prev - 1 + normalizedMedia.length) % normalizedMedia.length
      ),
    [normalizedMedia.length]
  );

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, next, prev]);

  // Auto-scroll active thumbnail into view
  useEffect(() => {
    if (open && thumbnailsRef.current) {
      const activeThumb = thumbnailsRef.current.children[
        current
      ] as HTMLElement;
      if (activeThumb) {
        activeThumb.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }
  }, [current, open]);

  const displayTitle = useMemo(() => {
    if (!title) return "";
    if (typeof title === "function") {
      return title(current);
    }
    return title;
  }, [current, title]);

  if (!mounted) return null;

  const activeItem = normalizedMedia[current];

  return (
    <LightboxContext.Provider
      value={{
        media: normalizedMedia,
        current,
        open,
        openLightbox,
        closeLightbox,
        next,
        prev,
      }}
    >
      {children}

      <Modal
        open={open}
        onOpenChange={closeLightbox}
        closeOnOutsideClick={!isMobile}
        withCloseButton={!isMobile}
      >
        <ModalContent
          appearance={{
            backgroundClassName: "bg-black md:bg-black/25",
            closeButtonClassname: "hidden md:flex",
          }}
          className={cn(
            lightboxModalVariants({ variant }),
            appearance?.modalClassName
          )}
          type="lightbox"
        >
          {/* Inject simple fade animation styles locally */}
          <style jsx global>{`
            @keyframes fadeIn {
              from {
                opacity: 0;
              }
              to {
                opacity: 1;
              }
            }
          `}</style>

          {/* Mobile Close Button */}
          <div className="absolute left-4 top-4 z-50 md:hidden">
            <button
              onClick={closeLightbox}
              className="flex items-center justify-center rounded-full bg-black/20 p-2 backdrop-blur-sm transition-colors hover:bg-black/40"
            >
              <X className="size-6 text-white" strokeWidth={2.5} />
            </button>
          </div>

          {/* Desktop Title */}
          <h1
            className={cn(
              lightboxTitleVariants({ variant }),
              appearance?.titleClassName
            )}
          >
            {displayTitle}
          </h1>

          {/* Main Display Area with Fade Animation */}
          <div className="relative flex h-full w-full flex-col items-center justify-center md:h-auto md:rounded-[9px]">
            <div
              // KEY CHANGE: Using key={current} forces remount on slide change, triggering animation
              key={current}
              className="black relative flex h-full w-full animate-[fadeIn_0.3s_ease-in-out] items-center justify-center"
            >
              {activeItem?.type === "video" ? (
                <div
                  className={cn(
                    "relative flex h-full w-full items-center justify-center bg-black",
                    lightboxImageVariants({ variant, mediaType: "video" })
                  )}
                >
                  <ReactPlayer
                    src={activeItem.url}
                    width="100%"
                    height="100%"
                    controls
                    playing={true}
                    // light={isMobile ? activeItem.thumbnail : false}
                    playIcon={
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                        <div className="flex size-16 items-center justify-center rounded-full bg-white backdrop-blur-sm transition-transform hover:scale-110">
                          <Galeri className="ml-1 h-8 w-8 fill-primary-700 text-primary-700" />
                        </div>
                      </div>
                    }
                  />
                </div>
              ) : (
                <ImageComponent
                  src={activeItem?.url || ""}
                  className={cn(
                    lightboxImageVariants({ variant, mediaType: "image" }),
                    appearance?.imageClassName
                  )}
                  alt={activeItem?.alt || ""}
                  unoptimized
                />
              )}
            </div>

            {/* Desktop Nav Arrows */}
            {normalizedMedia.length > 1 && (
              <>
                <button
                  className={cn(
                    lightboxNavButtonVariants({ variant, position: "left" }),
                    appearance?.navButtonClassName
                  )}
                  onClick={prev}
                >
                  <ChevronLeft className="size-6" />
                </button>
                <button
                  className={cn(
                    lightboxNavButtonVariants({ variant, position: "right" }),
                    appearance?.navButtonClassName
                  )}
                  onClick={next}
                >
                  <ChevronRight className="size-6" />
                </button>
              </>
            )}
          </div>

          {/* Mobile Bottom Strip (Counter + Thumbnails) */}
          {normalizedMedia.length > 1 && (
            <div className="absolute bottom-0 left-0 right-0 z-50 flex w-full flex-col gap-4 bg-gradient-to-t from-black via-black/90 to-transparent p-4 pb-6 pt-10 md:hidden">
              {/* Counter with Gradient */}
              <div className="px-1">
                <span
                  className="text-[12px] font-semibold leading-[14px]"
                  style={{
                    background:
                      "linear-gradient(180deg, #EDEDED 0%, #E6E6E6 51.87%, #E8E8E8 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {current + 1}/{normalizedMedia.length}
                </span>
              </div>

              {/* Thumbnails Slider */}
              <div
                ref={thumbnailsRef}
                className="scrollbar-hide flex w-full gap-[10px] overflow-x-auto"
              >
                {normalizedMedia.map((item, index) => (
                  <div
                    key={`mob-thumb-${index}`}
                    onClick={() => setCurrent(index)}
                    className={cn(
                      lightboxPreviewThumbVariants({
                        variant,
                        device: "mobile",
                        active: current === index,
                      })
                    )}
                  >
                    <ImageComponent
                      src={item.thumbnail || item.url}
                      className="h-full w-full object-cover"
                      alt={item.alt || `Thumbnail ${index + 1}`}
                      unoptimized={item.type === "video"}
                    />
                    {item.type === "video" && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="rounded-full bg-white/80 p-1">
                          <Play className="ml-0.5 size-3 fill-neutral-900 text-neutral-900" />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Desktop Thumbnails Strip */}
          {normalizedMedia.length > 1 && (
            <div className="mt-3 hidden w-full justify-center gap-2 overflow-auto py-1 md:flex md:flex-row">
              {normalizedMedia.map((item, index) => (
                <div
                  key={`desk-thumb-${index}`}
                  className={cn(
                    lightboxPreviewThumbVariants({
                      variant,
                      device: "desktop",
                      active: current === index,
                    }),
                    appearance?.previewThumbClassName
                  )}
                  onClick={() => setCurrent(index)}
                >
                  <ImageComponent
                    src={item.thumbnail || item.url}
                    className="h-full w-full object-cover"
                    alt={item.alt || ""}
                    unoptimized={item.type === "video"}
                  />
                  {item.type === "video" && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="rounded-full bg-white/80 p-0.5">
                        <Play className="ml-0.5 size-3 fill-neutral-900 text-neutral-900" />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </ModalContent>
      </Modal>
    </LightboxContext.Provider>
  );
};

export const useLightbox = (): LightboxContextValue => {
  const context = useContext(LightboxContext);
  if (!context)
    throw new Error("useLightbox must be used within a LightboxProvider");
  return context;
};

// --- Preview Component ---

interface LightboxPreviewProps {
  media?: LightboxMediaItem;
  index?: number;
  className?: string;
  alt?: string;
  variant?: "shipper" | "square";
  appearance?: {
    previewRootClassName?: string;
    previewImageClassName?: string;
    previewIconClassName?: string;
  };
  image?: string;
  withZoomIcon?: boolean;
}

export const LightboxPreview: React.FC<LightboxPreviewProps> = ({
  media,
  image,
  index = 0,
  className,
  alt,
  variant = "shipper",
  appearance,
  withZoomIcon,
}) => {
  const { openLightbox } = useLightbox();

  const resolvedMedia: NormalizedMediaItem = useMemo(() => {
    const input = media || image;
    if (typeof input === "string") {
      return { type: "image", url: input, alt };
    }
    if (input && typeof input === "object") {
      let thumb: string | undefined;
      if (input.type === "video") {
        thumb = input.thumbnail;
        if (!thumb) {
          thumb = getYouTubeThumbnail(input.url);
        }
        return {
          type: "video",
          url: input.url,
          thumbnail: thumb,
          alt: input.alt || alt,
        };
      }
      return {
        type: "image",
        url: input.url,
        thumbnail: undefined,
        alt: input.alt || alt,
      };
    }
    return { type: "image", url: "", alt };
  }, [media, image, alt]);

  const displaySrc =
    resolvedMedia.type === "video"
      ? resolvedMedia.thumbnail || getYouTubeThumbnail(resolvedMedia.url)
      : resolvedMedia.url;

  return (
    <div
      className={cn(
        lightboxPreviewRootVariants({ variant }),
        appearance?.previewRootClassName
      )}
      onClick={(e) => {
        e.stopPropagation();
        openLightbox(index);
      }}
    >
      <div
        className={cn(
          lightboxPreviewImageVariants({ variant }),
          "relative cursor-pointer overflow-hidden bg-neutral-100",
          className,
          appearance?.previewImageClassName
        )}
      >
        {resolvedMedia.type === "video" ? (
          <>
            {displaySrc ? (
              <ImageComponent
                src={displaySrc}
                className="h-full w-full object-cover opacity-90"
                alt={resolvedMedia.alt || "Video thumbnail"}
                unoptimized
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-black">
                <Video className="h-8 w-8 text-white/50" />
              </div>
            )}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="rounded-full bg-white/30 p-2 backdrop-blur-sm transition-transform hover:scale-110">
                <Play className="ml-0.5 h-4 w-4 fill-white text-white" />
              </div>
            </div>
          </>
        ) : (
          <ImageComponent
            src={resolvedMedia.url}
            className="h-full w-full object-contain"
            alt={resolvedMedia.alt || ""}
            unoptimized
          />
        )}
      </div>

      {withZoomIcon && (
        <div
          className={cn(
            lightboxPreviewIconVariants({ variant }),
            appearance?.previewIconClassName
          )}
        >
          <Zoom width={12} height={12} className="text-neutral-700" />
        </div>
      )}
    </div>
  );
};

interface LightboxTriggerProps {
  children: React.ReactNode;
  index?: number;
  className?: string;
}

export const LightboxTrigger: React.FC<LightboxTriggerProps> = ({
  children,
  index = 0,
  className,
}) => {
  const { openLightbox } = useLightbox();
  return (
    <div className={className} onClick={() => openLightbox(index)}>
      {children}
    </div>
  );
};
