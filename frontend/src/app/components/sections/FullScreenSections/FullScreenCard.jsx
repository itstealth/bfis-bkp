"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const FullScreenCard = ({
  backgroundImage, // expect public URL string path like "/assets/your-image.jpg"
  heading,
  buttonText,
  onButtonClick, // optional callback, otherwise fallback to navigate
  to = null, // optional path for router push fallback
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    if (onButtonClick) {
      onButtonClick();
    } else if (to) {
      router.push(to);
    }
  };

  return (
    <div
      className="fullscreen-card flex flex-col justify-center items-center text-white bg-cover bg-center relative"
      style={{
        width: "1280px",
        height: "90vh",
        padding:
          "clamp(1.5rem, 2.380952381vw + 0.6904761905rem, 4.5rem) clamp(3rem, 5.5555555556vw + 1.1111111111rem, 10rem)",
        backgroundImage: `url(${backgroundImage})`,
        margin: "0 auto", // center horizontally
      }}
    >
      <h2 className="text-4xl md:text-6xl font-bold mb-8 text-center">
        {heading}
      </h2>

      <button
        className="group relative inline-flex items-center bg-nblue text-white font-bold py-4 pl-6 pr-24 overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleClick}
        type="button"
      >
        <span className="relative z-10 mr-2 text-2xl">{buttonText}</span>

        {/* Background animation on hover */}
        <span
          className="absolute inset-0 bg-lblue transition-transform duration-300 ease-in-out origin-right"
          style={{ transform: isHovered ? "scaleX(1)" : "scaleX(0)" }}
        />

        {/* Border Polygon */}
        <span
          className="absolute right-0 top-0 h-full w-[86px] transition-all duration-300"
          style={{
            clipPath: "polygon(36% 0, 100% 0, 100% 100%, 36% 100%, 0 50%)",
            backgroundColor: isHovered ? "#143c66" : "#6dbd45",
            zIndex: 1,
          }}
        />

        {/* Main Polygon */}
        <span
          className="absolute right-0 top-0 h-full w-20 bg-lblue transition-all duration-300"
          style={{
            clipPath: "polygon(39% 0, 100% 0, 100% 100%, 39% 100%, 0 50%)",
            zIndex: 2,
          }}
        />

        {/* Plus Icon */}
        <svg
          className="absolute right-8 top-1/2 -translate-y-1/2 w-6 h-6 text-white z-10"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
          focusable="false"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        </svg>
      </button>
    </div>
  );
};

export default FullScreenCard;
