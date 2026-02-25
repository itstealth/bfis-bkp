// components/sections/Gallery.jsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import dynamic from "next/dynamic";

// Lazy load for best practices (optional)
const WordPullUp = dynamic(() => import("@/app/components/ui/word-pull-up"), {
  loading: () => (
    <div className="h-12 animate-pulse bg-gray-200 rounded mb-6 md:mb-12" />
  ),
});

const images = [
  "/assets/images/jpg/gallery2.jpg", // infrastructure
  "/assets/sports/img10.webp", // sports
  "/assets/lab/lab1.jpg", // lab
  "/assets/smartclass/smartclass1.jpg", // smartclass
  "/assets/arts/arts1.jpg", // arts
  "/assets/images/jpg/gallery12.jpg", // Extra image, mobile only
];
const categories = ["infrastructure", "sports", "lab", "smartclass", "arts"];
const categoryAlts = [
  "Infrastructure",
  "Sports",
  "Lab",
  "Smart Class",
  "Arts",
  "Gallery",
];

export default function Gallery() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const router = useRouter();

  const handleImageClick = (categoryIndex) => {
    if (categoryIndex < categories.length) {
      router.push(`/glimpse?selectedCategory=${categories[categoryIndex]}`);
    } else {
      router.push("/glimpse");
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto px-4 pt-8 md:pt-16 mb-8 md:mb-16">
      <WordPullUp
        className="text-3xl sm:text-4xl md:text-5xl font-bold text-nblue font-roboto mb-6 md:mb-12"
        words="Gallery"
      />

      <div className="grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-4 mt-0">
        {/* Render the first 5 images (desktop + mobile) */}
        {images.slice(0, 5).map((src, idx) => (
          <div
            key={src}
            // Add 'relative' for Image fill to work!
            className={
              "relative " +
              (idx === 1
                ? "aspect-square w-full md:row-span-2 md:aspect-auto md:h-full"
                : "aspect-square w-full")
            }
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => handleImageClick(idx)}
            style={{ cursor: "pointer" }}
            tabIndex={0}
            role="button"
            aria-label={`Show ${categoryAlts[idx]} Gallery`}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleImageClick(idx);
            }}
          >
            <Image
              src={src}
              alt={`${categoryAlts[idx]} Image`}
              fill
              className={`w-full h-full object-cover object-top rounded-lg transition-transform duration-300
                ${
                  hoveredIndex !== null && hoveredIndex !== idx
                    ? "blur-sm scale-95"
                    : "blur-0 scale-100"
                }
              `}
              sizes="(max-width: 768px) 100vw, 33vw"
              priority={idx === 0}
            />
          </div>
        ))}

        {/* 6th image - only on mobile; parent must also be relative */}
        <div
          className="relative aspect-square w-full md:hidden"
          onMouseEnter={() => setHoveredIndex(5)}
          onMouseLeave={() => setHoveredIndex(null)}
          onClick={() => handleImageClick(5)}
          style={{ cursor: "pointer" }}
          tabIndex={0}
          role="button"
          aria-label="Show Gallery"
          onKeyDown={(e) => {
            if (e.key === "Enter") handleImageClick(5);
          }}
        >
          <Image
            src={images[5]}
            alt="Gallery Image"
            fill
            className={`w-full h-full object-cover object-top rounded-lg transition-transform duration-300
              ${
                hoveredIndex !== null && hoveredIndex !== 5
                  ? "blur-sm scale-95"
                  : "blur-0 scale-100"
              }
            `}
            sizes="100vw"
          />
        </div>
      </div>
    </div>
  );
}
