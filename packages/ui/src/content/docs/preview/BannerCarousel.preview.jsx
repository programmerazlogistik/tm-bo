"use client";

import { BannerCarousel } from "@muatmuat/ui/BannerCarousel";

export function BannerCarouselPreview() {
  const banners = [
    {
      id: 1,
      imageUrl:
        "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1000&h=250&fit=crop",
      altText: "Special promotion - 20% off all shipments this month",
      linkUrl: "#promo-1",
    },
    {
      id: 2,
      imageUrl:
        "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=1000&h=250&fit=crop",
      altText: "New logistics solutions for your business",
      linkUrl: "#promo-2",
    },
    {
      id: 3,
      imageUrl:
        "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1000&h=250&fit=crop",
      altText: "Fast delivery guaranteed - order now",
      linkUrl: "#promo-3",
    },
  ];

  return (
    <div className="space-y-4">
      <BannerCarousel
        banners={banners}
        autoplaySpeed={4000}
        showControls={true}
        showIndicators={true}
      />

      <p className="text-center text-sm text-gray-600">
        Hover over the carousel to see navigation controls and pause autoplay
      </p>
    </div>
  );
}
