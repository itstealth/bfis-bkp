"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import FullScreenCard from "./FullScreenCard";

const FullScreenSection = ({ sections }) => {
  // References for the text sections to track scroll progress
  const textBeforeRef = useRef(null);
  const textAfterRef = useRef(null);

  // Scroll progress for the "text before" section
  const { scrollYProgress: scrollBefore } = useScroll({
    target: textBeforeRef,
    offset: ["start center", "end center"],
  });
  const opacityBefore = useTransform(scrollBefore, [0, 0.5, 1], [0, 1, 0]);

  // Scroll progress for the "text after" section
  const { scrollYProgress: scrollAfter } = useScroll({
    target: textAfterRef,
    offset: ["start center", "end center"],
  });
  const opacityAfter = useTransform(scrollAfter, [0, 0.5, 1], [0, 1, 0]);

  return (
    <div className="relative w-full">
      {/* Text Before Images */}
      <div ref={textBeforeRef} className="relative h-[50vh]">
        {/* Fixed Text Overlay */}
        <motion.div
          className="fixed inset-0 flex items-center justify-center pointer-events-none"
          style={{ opacity: opacityBefore, zIndex: 20 }}
        >
          <h2 className="text-nblue text-3xl md:text-5xl font-bold text-center max-w-[90vw]">
            Shaping Young Minds for a Brighter Tomorrow
          </h2>
        </motion.div>
      </div>

      {/* Sticky Image Sections Container */}
      <div
        className="relative"
        style={{ height: `${sections.length * 100}vh` }}
      >
        {sections.map((section, index) => (
          <section
            key={section.id}
            className="sticky top-0 h-screen flex justify-center items-center"
            style={{ zIndex: index + 1 }}
          >
            <FullScreenCard
              backgroundImage={section.backgroundImage}
              heading={section.heading}
              buttonText={section.buttonText}
              onButtonClick={section.onButtonClick}
            />
          </section>
        ))}
      </div>

      {/* Text After Images */}
      <div ref={textAfterRef} className="relative h-[50vh]">
        {/* Fixed Text Overlay */}
        <motion.div
          className="fixed inset-0 flex items-center justify-center pointer-events-none"
          style={{ opacity: opacityAfter, zIndex: 20 }}
        >
          <h2 className="text-nblue text-3xl md:text-5xl font-bold text-center max-w-[90vw]">
            Continuing the Legacy of Academic Excellence
          </h2>
        </motion.div>
      </div>
    </div>
  );
};

export default FullScreenSection;
