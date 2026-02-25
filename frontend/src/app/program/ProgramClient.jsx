"use client";

import React, { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { subjects } from "@/app/lib/data/programSubjects";

const animationVariants = (direction) => ({
  hidden: { opacity: 0, x: direction === "left" ? -50 : 50 },
  visible: { opacity: 1, x: 0 },
});

export default function ProgramClient() {
  const router = useRouter();
  const subjectRefs = useRef({});

  // Scroll to section if hash present
  useEffect(() => {
    const scrollToHash = () => {
      const hash = window.location.hash?.replace("#", "");
      if (hash && subjectRefs.current[hash]) {
        subjectRefs.current[hash].scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    };
    scrollToHash();
    window.addEventListener("hashchange", scrollToHash);
    return () => window.removeEventListener("hashchange", scrollToHash);
  }, []);

  const handleProgramClick = (subject) => {
    router.push(`/program/${subject.id}`);
  };

  return (
    <div className="min-h-screen bg-[#e4eff9] py-8 md:py-16">
      <div className="w-[90%] mx-auto md:max-w-7xl">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-nblue mb-4">
            Our Programs
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover our comprehensive educational programs designed to nurture
            creativity, innovation, and academic excellence.
          </p>
        </div>
        <div className="grid gap-6 md:gap-12">
          {subjects.map((subject) => (
            <motion.div
              key={subject.id}
              ref={(el) => (subjectRefs.current[subject.id] = el)}
              id={subject.id}
              className={`relative overflow-hidden rounded-lg shadow-lg cursor-pointer group ${
                subject.featured ? "md:col-span-2" : ""
              }`}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, margin: "-100px" }}
              variants={animationVariants(
                subject.id % 2 === 0 ? "left" : "right"
              )}
              transition={{ duration: 0.8, ease: "easeOut" }}
              onClick={() => handleProgramClick(subject)}
            >
              <div className="relative">
                <img
                  src={subject.image}
                  alt={subject.title}
                  className="w-full h-48 md:h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-nblue/80 via-nblue/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="text-xl md:text-2xl font-bold mb-2">
                    {subject.title}
                  </h3>
                  <p className="text-sm md:text-base opacity-90 line-clamp-2">
                    {subject.description}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {subject.highlight && (
                      <span className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs">
                        {subject.highlight}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
