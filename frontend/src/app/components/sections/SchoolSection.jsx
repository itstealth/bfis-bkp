/* components/sections/SchoolSection.jsx */
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { memo } from "react";
import dynamic from "next/dynamic";

// Lazy load animation components for better performance
const WordPullUp = dynamic(() => import("../ui/word-pull-up"), {
  loading: () => <div className="h-20 animate-pulse bg-gray-200 rounded" />,
});

const WordFadeIn = dynamic(() => import("../ui/word-fade-in"), {
  loading: () => <div className="h-12 animate-pulse bg-gray-200 rounded" />,
});

// ✅ BEST PRACTICE: Use public folder paths instead of imports
const sections = [
  {
    id: "pre-primary",
    title: "PRE-PRIMARY",
    subtitle: "Ages 3-5",
    image: "/assets/bfis_images/pre-primary.webp", // ✅ Public folder path
    description:
      "Our pre-primary program focuses on early childhood development through play-based learning, fostering curiosity and social skills in a nurturing environment.",
    href: "/academics/pre-primary",
  },
  {
    id: "primary",
    title: "PRIMARY",
    subtitle: "Grades 1-5",
    image: "/assets/bfis_images/primary.webp", // ✅ Public folder path
    description:
      "The primary section builds a strong foundation in core subjects while encouraging creativity and critical thinking through interactive and engaging lessons.",
    href: "/academics/primary",
  },
  {
    id: "middle",
    title: "MIDDLE SCHOOL",
    subtitle: "Grades 6-8",
    image: "/assets/bfis_images/middle.webp", // ✅ Public folder path
    description:
      "Middle school prepares students for higher academic challenges, focusing on developing independent learning skills and exploring diverse subjects and extracurricular activities.",
    href: "/academics/middle-school",
  },
  {
    id: "high-school",
    title: "HIGH SCHOOL",
    subtitle: "Grades 9-10",
    image: "/assets/bfis_images/high.webp", // ✅ Public folder path
    description:
      "Our high school program offers a comprehensive curriculum that prepares students for advanced studies, with a focus on academic excellence and personal growth.",
    href: "/academics/high-school",
  },
  {
    id: "senior-secondary",
    title: "SENIOR SECONDARY",
    subtitle: "Grades 11-12",
    image: "/assets/bfis_images/senior.webp", // ✅ Public folder path
    description:
      "The senior secondary program provides specialized streams and career guidance, equipping students with the knowledge and skills needed for higher education and future careers.",
    href: "/academics/senior-secondary",
  },
  {
    id: "smart-classes",
    title: "SMART CLASSES",
    subtitle: "Pre-Nursery to Class 12th",
    image: "/assets/images/jpg/gallery10.jpg", // ✅ Public folder path
    description:
      "Our smart classes integrate cutting-edge technology across all grades, enhancing learning experiences with interactive digital content, virtual labs, and personalized learning tools.",
    href: "/academics/smart-classes",
  },
];

// Memoized card component for performance
const SectionCard = memo(({ section, index }) => {
  return (
    <motion.article
      className="group relative bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <Link href={`/academics#${section.id}`} className="block">
        <div className="relative h-64 overflow-hidden">
          <Image
            src={section.image} // ✅ Using public folder paths
            alt={`${section.title} - Academic program at Brookfield International School`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority={index < 3} // ✅ Prioritize first 3 images for LCP
          />
          <div className="absolute inset-0 bg-black/60 transition-opacity duration-300 group-hover:bg-black/10" />
          <div className="absolute top-4 left-4 bg-nblue text-white px-4 py-1 rounded-full text-sm font-medium z-10">
            {section.subtitle}
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-2xl font-bold text-nblue mb-3 group-hover:text-lblue transition-colors">
            {section.title}
          </h3>
          <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed">
            {section.description}
          </p>

          <div className="flex justify-between items-center">
            <span className="inline-flex items-center px-4 py-2 bg-nblue text-white rounded-lg group-hover:bg-vgreen transition-colors duration-300">
              <span>Learn More</span>
              <svg
                className="w-4 h-4 ml-2 transform transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
});

SectionCard.displayName = "SectionCard";

export default function SchoolSection() {
  return (
    <section className="w-full py-16" aria-labelledby="academic-excellence">
      <div className="container mx-auto px-4">
        <header className="text-center mb-16">
          <WordPullUp
            words="Academic Excellence"
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-nblue mb-6"
            id="academic-excellence"
          />
          <WordFadeIn
            words="Inspiring a Love of Learning from Pre-Primary to Senior Secondary"
            className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto"
          />
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {sections.map((section, index) => (
            <SectionCard key={section.id} section={section} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
