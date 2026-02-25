"use client";

import React, { useEffect, useState, useCallback } from "react";
import { FaArrowUp } from "react-icons/fa6";

const ScrollUp = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Handler to check scroll position and toggle visibility
  const toggleVisibility = useCallback(() => {
    setIsVisible(window.pageYOffset > 300);
  }, []);

  // Scroll-to-top handler
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, [toggleVisibility]);

  return (
    <>
      {isVisible && (
        <div
          role="button"
          tabIndex={0}
          aria-label="Scroll to top"
          onClick={scrollToTop}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              scrollToTop();
            }
          }}
          className="fixed bottom-[128px] md:bottom-[80px] right-3 w-12 h-12 rounded-full bg-primary text-cream-foreground flex justify-center items-center border-3 border-white cursor-pointer z-50 hover:bg-primary/90 transition-all duration-300"
        >
          <FaArrowUp />
        </div>
      )}
    </>
  );
};

export default ScrollUp;
