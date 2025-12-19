import * as React from "react";
import { useCallback, useEffect, useRef, useState } from "react";

import { cn } from "@muatmuat/lib/utils";

import { ImageComponent } from "../ImageComponent";

export interface BannerCarouselItem {
  id: string | number;
  imageUrl: string;
  altText?: string;
  linkUrl?: string;
}

export interface BannerCarouselProps {
  className?: string;
  banners: BannerCarouselItem[];
  autoplaySpeed?: number;
  showControls?: boolean;
  showIndicators?: boolean;
}

/**
 * BannerCarousel component for displaying a series of banner images with optional navigation controls and autoplay functionality.
 *
 * Features:
 * - Responsive design (146px mobile, 250px desktop height)
 * - Automatic slideshow with configurable timing
 * - Hover to pause autoplay functionality
 * - Navigation arrow controls (appear on hover)
 * - Dot indicators for direct slide navigation
 * - Smooth fade transitions between slides
 * - Accessibility support with ARIA labels
 * - Clickable banners with external link support
 */
export const BannerCarousel: React.FC<BannerCarouselProps> = ({
  className,
  banners,
  autoplaySpeed = 5000,
  showControls = true,
  showIndicators = true,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const autoplayTimerRef = useRef<any>(null);

  const totalBanners = banners.length;

  // Stable callback for goToNext
  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalBanners);
  }, [totalBanners]);

  const goToPrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + totalBanners) % totalBanners
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Setup autoplay (best practice)
  useEffect(() => {
    if (autoplaySpeed > 0) {
      autoplayTimerRef.current = setInterval(goToNext, autoplaySpeed);
    }
    return () => {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current);
        autoplayTimerRef.current = null;
      }
    };
  }, [autoplaySpeed, goToNext]);

  // Pause on hover
  const handleMouseEnter = () => {
    if (autoplayTimerRef.current) {
      clearInterval(autoplayTimerRef.current);
      autoplayTimerRef.current = null;
    }
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (autoplaySpeed > 0 && !autoplayTimerRef.current) {
      autoplayTimerRef.current = setInterval(goToNext, autoplaySpeed);
    }
    setIsHovered(false);
  };

  return (
    <div
      className={cn(
        "relative mx-auto h-[146px] bg-background md:h-[250px] md:w-[1054px]",
        className
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative mx-auto h-[146px] w-full overflow-hidden md:h-[250px] md:w-[1000px] md:rounded-xl">
        {banners.map((banner, index) => (
          <a
            key={banner.id}
            href={banner.linkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`absolute left-0 top-0 h-full w-full cursor-pointer transition-opacity duration-500 ${
              index === currentIndex ? "z-0 opacity-100" : "-z-10 opacity-0"
            }`}
          >
            <ImageComponent
              src={banner.imageUrl}
              alt={banner.altText || "Banner image"}
              className="h-full w-full object-cover"
              unoptimized
            />
          </a>
        ))}
      </div>

      {/* Navigation Controls */}
      {showControls && (
        <div
          className={cn(
            "pointer-events-none absolute bottom-[42%] left-0 right-0 top-[42%] flex justify-between transition-opacity duration-500",
            !isHovered && "opacity-0"
          )}
        >
          <button
            className="pointer-events-auto z-10 flex size-[40px] items-center justify-center rounded-full bg-white shadow-lg"
            onClick={goToPrev}
          >
            <ImageComponent
              src="/icons/chevron-left16-2.svg"
              width={9}
              height={16}
              alt="Previous banner"
              className=""
            />
          </button>
          <button
            onClick={goToNext}
            className="pointer-events-auto z-10 flex h-[40px] w-[40px] items-center justify-center rounded-full bg-white shadow-lg"
            aria-label="Next banner"
          >
            <ImageComponent
              src="/icons/chevron-right16-2.svg"
              width={9}
              height={16}
              alt="Next banner"
              className=""
            />
          </button>
        </div>
      )}

      {/* Indicator Dots */}
      {showIndicators && (
        <div className="absolute bottom-1 left-1/2 flex -translate-x-1/2 transform gap-[8px] p-3">
          {banners.map((banner, index) => (
            <button
              key={banner.id}
              onClick={() => goToSlide(index)}
              className={`h-[8px] ${
                index === currentIndex
                  ? "w-[32px] rounded-[14px] bg-white"
                  : "w-[8px] rounded-full bg-white"
              }`}
              aria-label={`Go to banner ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};
