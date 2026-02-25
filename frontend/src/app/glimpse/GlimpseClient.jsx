"use client";

import React, { Suspense, useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/app/components/ui/button";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import WordFadeIn from "@/app/components/ui/word-fade-in";

// Image paths from public/assets
const infraimages = Array.from(
  { length: 20 },
  (_, i) => `/assets/images/jpg/gallery${i + 1}.jpg`
);

const sportsImages = [
  "/assets/sports/img4.webp",
  "/assets/sports/img5.webp",
  "/assets/sports/img6.webp",
  "/assets/sports/img7.webp",
  "/assets/sports/img8.webp",
  "/assets/sports/img9.webp",
  "/assets/sports/img10.webp",
  "/assets/sports/img11.webp",
  "/assets/sports/img12.webp",
  "/assets/sports/img14.webp",
  "/assets/sports/img15.webp",
  "/assets/sports/img16.webp",
  "/assets/sports/img17.webp",
  "/assets/sports/img18.webp",
  "/assets/sports/img19.webp",
  "/assets/sports/img20.webp",
  "/assets/sports/img21.webp",
  "/assets/sports/img22.webp",
  "/assets/sports/img23.webp",
  "/assets/sports/img24.webp",
  "/assets/sports/img25.webp",
  "/assets/sports/img26.webp",
  "/assets/sports/img27.webp",
  "/assets/sports/img28.webp",
];

const labImages = [1, 2, 3, 4, 5, 6, 7].map(
  (n) => `/assets/lab/lab${n}.${n >= 4 ? "jpeg" : "jpg"}`
);

const smartclassImages = [1, 2, 3, 4, 5].map(
  (n) => `/assets/smartclass/smartclass${n}.jpg`
);

const artsImages = [1, 2, 3, 4]
  .map((n) => `/assets/arts/arts${n}.jpg`)
  .concat([
    "/assets/arts/arts5.jpeg",
    "/assets/arts/arts6.jpeg",
    "/assets/arts/arts7.jpeg",
    "/assets/arts/arts8.jpeg",
    "/assets/arts/arts9.jpeg",
  ]);

const categories = [
  { id: "all", label: "All" },
  { id: "sports", label: "Sports" },
  { id: "infrastructure", label: "Infrastructure" },
  { id: "lab", label: "Lab" },
  { id: "smartclass", label: "Smart Class" },
  { id: "arts", label: "Arts" },
];

function GlimpseContent() {
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const IMAGES_PER_PAGE = 8;
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Initialize from query param, e.g., /glimpse?category=sports
  useEffect(() => {
    const initial = searchParams.get("category");
    if (initial && categories.find((c) => c.id === initial)) {
      setSelectedCategory(initial);
    }
  }, [searchParams]);

  const filteredImages = useMemo(() => {
    switch (selectedCategory) {
      case "sports":
        return sportsImages;
      case "infrastructure":
        return infraimages;
      case "lab":
        return labImages;
      case "smartclass":
        return smartclassImages;
      case "arts":
        return artsImages;
      case "all":
      default:
        return [
          ...infraimages,
          ...sportsImages,
          ...labImages,
          ...smartclassImages,
          ...artsImages,
        ];
    }
  }, [selectedCategory]);

  const startIndex = (currentPage - 1) * IMAGES_PER_PAGE;
  const visibleImages = filteredImages.slice(
    startIndex,
    startIndex + IMAGES_PER_PAGE
  );

  return (
    <section className="relative min-h-screen container bg-[#f4f8fb]">
      <div className="py-12">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-center lg:text-5xl text-nblue mb-4"
        >
          Glimpse of BFIS
        </motion.h1>
        <WordFadeIn
          className="text-nblue/70 text-xl text-center mb-12"
          words="Discover our state-of-the-art facilities and achievements."
        />

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {categories.map((category) => {
            const isActive = selectedCategory === category.id;
            return (
              <Button
                key={category.id}
                variant={isActive ? "default" : "outline"}
                className={
                  isActive
                    ? "bg-nblue text-white hover:bg-lblue"
                    : "border-nblue text-nblue hover:bg-nblue hover:text-white"
                }
                onClick={() => {
                  setSelectedCategory(category.id);
                  setCurrentPage(1);
                }}
              >
                {category.label}
              </Button>
            );
          })}
        </div>

        {/* Image Grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {visibleImages.map((image, index) => (
            <div
              key={index}
              className={`relative rounded-lg overflow-hidden shadow-lg bg-white h-96 transition-all duration-300 ${
                hoveredIndex !== null && hoveredIndex !== index ? "blur-sm" : ""
              }`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <LazyLoadImage
                src={image}
                alt={`Image ${index + 1}`}
                wrapperClassName="h-full w-full"
                className={`w-full h-full object-cover transition-transform duration-300 ${
                  hoveredIndex === index ? "scale-110" : ""
                }`}
                effect="blur"
              />
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-4 mt-8">
          <Button
            variant="outline"
            className="border-nblue text-nblue hover:bg-nblue hover:text-white"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <span className="text-gray-700">
            Page {currentPage} of{" "}
            {Math.ceil(filteredImages.length / IMAGES_PER_PAGE)}
          </span>
          <Button
            variant="outline"
            className="border-nblue text-nblue hover:bg-nblue hover:text-white"
            onClick={() =>
              setCurrentPage((prev) =>
                Math.min(
                  prev + 1,
                  Math.ceil(filteredImages.length / IMAGES_PER_PAGE)
                )
              )
            }
            disabled={
              currentPage === Math.ceil(filteredImages.length / IMAGES_PER_PAGE)
            }
          >
            Next
          </Button>
        </div>
      </div>
    </section>
  );
}

export default function GlimpseClient() {
  return (
    <Suspense
      fallback={
        <section className="relative min-h-screen container bg-[#f4f8fb] py-12 flex items-center justify-center text-nblue/70">
          Loading gallery...
        </section>
      }
    >
      <GlimpseContent />
    </Suspense>
  );
}
