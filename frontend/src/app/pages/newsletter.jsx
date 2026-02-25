"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import WordPullUp from "@/components/ui/word-pull-up";
import { ArrowRight, ArrowLeft, Eye, Download } from "lucide-react";

// Gallery Images
import staffImage from "../assets/images/staff.jpg";
import glimpseImage from "../assets/images/infra.jpg";
import Newsletterjan2024 from "@/assets/pdf/newsletter/2024/BFIS_NEWLETTER_JAN_2024.pdf";
import Newsletterfeb2024 from "@/assets/pdf/newsletter/2024/BFIS_NEWLETTER_FEB_2024.pdf";
import Newslettermar2024 from "@/assets/pdf/newsletter/2024/BFIS_NEWLETTER_MARCH_2024.pdf";
import Newsletteraprjr2024 from "@/assets/pdf/newsletter/2024/BFIS_JR.NEWSLETTER/BFIS_JR.NEWSLETTER_APRIL_2024.pdf";
import Newsletteraprsr2024 from "@/assets/pdf/newsletter/2024/BFIS_SR.NEWSLETTER/BFIS_SR.NEWSLETTER_APRIL_2024.pdf";
import Newslettermaysr2024 from "@/assets/pdf/newsletter/2024/BFIS_SR.NEWSLETTER/BFIS_SR.NEWLETTER_MAY_2024.pdf";
import Newslettermayjr2024 from "@/assets/pdf/newsletter/2024/BFIS_JR.NEWSLETTER/BFIS_JR.NEWLETTER_MAY_2024.pdf";
import Newsletterjun2024 from "@/assets/pdf/newsletter/2024/BFIS_NEWLETTER_JUN_2024.pdf";
import Newsletterjulsr2024 from "@/assets/pdf/newsletter/2024/BFIS_SR.NEWSLETTER/BFIS_SR.NEWSLETTER_JULY_2024.pdf";
import Newsletterjuljr2024 from "@/assets/pdf/newsletter/2024/BFIS_JR.NEWSLETTER/BFIS_JR.NEWSLETTER_JULY_2024.pdf";
import Newsletteraugsr2024 from "@/assets/pdf/newsletter/2024/BFIS_SR.NEWSLETTER/BFIS_SR.NEWLETTER_AUGUST_2024.pdf";
import Newsletteraugjr2024 from "@/assets/pdf/newsletter/2024/BFIS_JR.NEWSLETTER/BFIS_JR.NEWSLETTER_AUGUST_2024.pdf";
import Newslettersep2024 from "@/assets/pdf/newsletter/2024/BFIS_NEWLETTER_SEPTEMBER_2024.pdf";
import Newsletteroctsr2024 from "@/assets/pdf/newsletter/2024/BFIS_SR.NEWSLETTER/BFIS_SR.NEWLETTER_OCTOBER_2024.pdf";
import Newsletteroctjr2024 from "@/assets/pdf/newsletter/2024/BFIS_JR.NEWSLETTER/BFIS_JR.NEWLETTER_OCTOBER_2024.pdf";
import Newsletternov2024 from "@/assets/pdf/newsletter/2024/BFIS_NEWLETTER_NOVEMBER_2024.pdf";
import Newsletterdecjr2024 from "@/assets/pdf/newsletter/2024/BFIS_JR.NEWSLETTER/BFIS_JR.NEWLETTER_DECEMBER_2024.pdf";

// Import 2023 newsletters
import NewsletterJan2023 from "@/assets/pdf/newsletter/2023/BFIS-NEWLETTER-JANUARY-2023.pdf";
import NewsletterFeb2023 from "@/assets/pdf/newsletter/2023/BFIS-NEWLETTER-FEBRUARY-2023.pdf";
import NewsletterMar2023 from "@/assets/pdf/newsletter/2023/BFIS-NEWLETTER-MARCH-2023.pdf";
import NewsletterAprSr2023 from "@/assets/pdf/newsletter/2023/BFIS-SR.-NEWLETTER-APRIL-2023.pdf";
import NewsletterAprJr2023 from "@/assets/pdf/newsletter/2023/BFIS-JR.-NEWLETTER-APRIL-2023.pdf";
import NewsletterMaySr2023 from "@/assets/pdf/newsletter/2023/BFIS-SR.-NEWLETTER-MAY-2023.pdf";
import NewsletterMayJr2023 from "@/assets/pdf/newsletter/2023/BFIS-JR.-NEWLETTER-MAY-2023.pdf";
import NewsletterJulSr2023 from "@/assets/pdf/newsletter/2023/BFIS-SR.-NEWLETTER-JULY-2023.pdf";
import NewsletterJulJr2023 from "@/assets/pdf/newsletter/2023/BFIS-JR.-NEWLETTER-JULY-2023.pdf";
import NewsletterAugSr2023 from "@/assets/pdf/newsletter/2023/BFIS-SR.-NEWLETTER-AUGUST-2023.pdf";
import NewsletterAugJr2023 from "@/assets/pdf/newsletter/2023/BFIS-JR.-NEWLETTER-AUGUST-2023.pdf";
import NewsletterSepSr2023 from "@/assets/pdf/newsletter/2023/BFIS-SR.-NEWLETTER-SEPTEMBER-2023.pdf";
import NewsletterSepJr2023 from "@/assets/pdf/newsletter/2023/BFIS-JR.-NEWLETTER-SEPTEMBER-2023.pdf";
import NewsletterOctSr2023 from "@/assets/pdf/newsletter/2023/BFIS-SR.-NEWLETTER-OCTOBER-2023.pdf";
import NewsletterOctJr2023 from "@/assets/pdf/newsletter/2023/BFIS-JR.-NEWLETTER-OCTOBER-2023.pdf";
import NewsletterNovSr2023 from "@/assets/pdf/newsletter/2023/BFIS-SR.-NEWLETTER-NOVEMBER-2023.pdf";
import NewsletterNovJr2023 from "@/assets/pdf/newsletter/2023/BFIS-JR.-NEWLETTER-NOVEMBER-2023.pdf";
import NewsletterDecSr2023 from "@/assets/pdf/newsletter/2023/BFIS-SR.-NEWLETTER-DECEMBER-2023.pdf";
import NewsletterDecJr2023 from "@/assets/pdf/newsletter/2023/BFIS-JR.-NEWLETTER-DECEMBER-2023.pdf";

// Add these imports at the top
import NewsletterJan2022 from "@/assets/pdf/newsletter/2022/JANUARY_2022.pdf";
import NewsletterFeb2022 from "@/assets/pdf/newsletter/2022/FEBRUARY_2022.pdf";
import NewsletterMay2022 from "@/assets/pdf/newsletter/2022/BFIS_NEWSLETTER-MAY-2022.pdf";
import NewsletterApr2022 from "@/assets/pdf/newsletter/2022/APRIL_2022.pdf";
import NewsletterJun2022 from "@/assets/pdf/newsletter/2022/BFIS-NEWLETTER-JUNE-2022.pdf";
import NewsletterJul2022 from "@/assets/pdf/newsletter/2022/BFIS-NEWLETTER-JULY-2022.pdf";
import NewsletterAug2022 from "@/assets/pdf/newsletter/2022/BFIS-NEWLETTER-AUGUST-2022.pdf";
import NewsletterSep2022 from "@/assets/pdf/newsletter/2022/BFIS-NEWSLETTER-SEPTEMBER-2022.pdf";
import NewsletterOct2022 from "@/assets/pdf/newsletter/2022/BFIS-NEWLETTER-OCTOBER-2022.pdf";
import NewsletterNov2022 from "@/assets/pdf/newsletter/2022/BFIS-NEWLETTER-NOVEMBER-2022.pdf";
import NewsletterDec2022 from "@/assets/pdf/newsletter/2022/BFIS-NEWSLETTER-DECEMBER-2022.pdf";

// Import 2025 newsletters
import NewsletterMar2025 from "@/assets/pdf/newsletter/2025/BFIS NEWSLETTER MARCH 2024-25.pdf";
import NewsletterAprJr2025 from "@/assets/pdf/newsletter/2025/01- BFIS JR. NEWSLETTER APRIL 2025.pdf";
import NewsletterAprSr2025 from "@/assets/pdf/newsletter/2025/02- BFIS SR. NEWSLETTER APRIL 2025.pdf";
import NewsletterMayJr2025 from "@/assets/pdf/newsletter/2025/03- BFIS JR. NEWSLETTER MAY 2025.pdf";
import NewsletterMaySr2025 from "@/assets/pdf/newsletter/2025/04- BFIS SR. NEWSLETTER MAY 2025.pdf";
import NewsletterJun2025 from "@/assets/pdf/newsletter/2025/05- BFIS NEWSLETTER JUNE 2025.pdf";

// Main Menu and Submenu Data
const mainMenu = [
  {
    label: "E-Newsletter 2025",
    submenu: [
      {
        label: "March 2024-25",
        url: NewsletterMar2025,
      },
      {
        label: "April 2025 (JR)",
        url: NewsletterAprJr2025,
      },
      {
        label: "April 2025 (SR)",
        url: NewsletterAprSr2025,
      },
      {
        label: "May 2025 (JR)",
        url: NewsletterMayJr2025,
      },
      {
        label: "May 2025 (SR)",
        url: NewsletterMaySr2025,
      },
      {
        label: "June 2025",
        url: NewsletterJun2025,
      },
    ],
  },
  {
    label: "E-Newsletter 2024",
    submenu: [
      {
        label: "January 2024",
        url: Newsletterjan2024,
      },
      {
        label: "February 2024",
        url: Newsletterfeb2024,
      },

      {
        label: "March 2024",
        url: Newslettermar2024,
      },

      {
        label: "April 2024 (SR)",
        url: Newsletteraprsr2024,
      },
      {
        label: "April 2024 (JR)",
        url: Newsletteraprjr2024,
      },
      {
        label: "May 2024(SR)",
        url: Newslettermaysr2024,
      },
      {
        label: "May 2024(JR)",
        url: Newslettermayjr2024,
      },
      {
        label: "June 2024",
        url: Newsletterjun2024,
      },
      {
        label: "July 2024(SR)",
        url: Newsletterjulsr2024,
      },
      {
        label: "July 2024(JR)",
        url: Newsletterjuljr2024,
      },
      {
        label: "August 2024(SR)",
        url: Newsletteraugsr2024,
      },
      {
        label: "August 2024(JR)",
        url: Newsletteraugjr2024,
      },
      {
        label: "September 2024",
        url: Newslettersep2024,
      },
      {
        label: "October 2024(SR)",
        url: Newsletteroctsr2024,
      },
      {
        label: "October 2024(JR)",
        url: Newsletteroctjr2024,
      },
      {
        label: "November 2024",
        url: Newsletternov2024,
      },
      {
        label: "December 2024(JR)",
        url: Newsletterdecjr2024,
      },
    ],
  },
  {
    label: "E-Newsletter 2023",
    submenu: [
      {
        label: "January 2023",
        url: NewsletterJan2023,
      },
      {
        label: "February 2023",
        url: NewsletterFeb2023,
      },
      {
        label: "March 2023",
        url: NewsletterMar2023,
      },
      {
        label: "April 2023 (SR)",
        url: NewsletterAprSr2023,
      },
      {
        label: "April 2023 (JR)",
        url: NewsletterAprJr2023,
      },
      {
        label: "May 2023 (SR)",
        url: NewsletterMaySr2023,
      },
      {
        label: "May 2023 (JR)",
        url: NewsletterMayJr2023,
      },
      {
        label: "July 2023 (SR)",
        url: NewsletterJulSr2023,
      },
      {
        label: "July 2023 (JR)",
        url: NewsletterJulJr2023,
      },
      {
        label: "August 2023 (SR)",
        url: NewsletterAugSr2023,
      },
      {
        label: "August 2023 (JR)",
        url: NewsletterAugJr2023,
      },
      {
        label: "September 2023 (SR)",
        url: NewsletterSepSr2023,
      },
      {
        label: "September 2023 (JR)",
        url: NewsletterSepJr2023,
      },
      {
        label: "October 2023 (SR)",
        url: NewsletterOctSr2023,
      },
      {
        label: "October 2023 (JR)",
        url: NewsletterOctJr2023,
      },
      {
        label: "November 2023 (SR)",
        url: NewsletterNovSr2023,
      },
      {
        label: "November 2023 (JR)",
        url: NewsletterNovJr2023,
      },
      {
        label: "December 2023 (SR)",
        url: NewsletterDecSr2023,
      },
      {
        label: "December 2023 (JR)",
        url: NewsletterDecJr2023,
      },
    ],
  },
  {
    label: "E-Newsletter 2022",
    submenu: [
      {
        label: "January 2022",
        url: NewsletterJan2022,
      },
      {
        label: "February 2022",
        url: NewsletterFeb2022,
      },
      {
        label: "April 2022",
        url: NewsletterApr2022,
      },
      {
        label: "May 2022",
        url: NewsletterMay2022,
      },
      {
        label: "June 2022",
        url: NewsletterJun2022,
      },
      {
        label: "July 2022",
        url: NewsletterJul2022,
      },
      {
        label: "August 2022",
        url: NewsletterAug2022,
      },
      {
        label: "September 2022",
        url: NewsletterSep2022,
      },
      {
        label: "October 2022",
        url: NewsletterOct2022,
      },
      {
        label: "November 2022",
        url: NewsletterNov2022,
      },
      {
        label: "December 2022",
        url: NewsletterDec2022,
      },
    ],
  },
];

// Framer Motion Variants
const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

export default function Newsletter() {
  const [currentMenu, setCurrentMenu] = useState(mainMenu);
  const [previousMenu, setPreviousMenu] = useState(null);
  const [currentHeading, setCurrentHeading] = useState("Newsletter");
  const [lightboxImages, setLightboxImages] = useState([]);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const handleMenuClick = (submenu, label) => {
    if (submenu) {
      setPreviousMenu(currentMenu);
      setCurrentMenu(submenu);
      setCurrentHeading(label); // Update the heading to the main menu item label
    }
  };

  const handleBackClick = () => {
    setCurrentMenu(previousMenu);
    setPreviousMenu(null);
    setCurrentHeading("Newsletter"); // Reset the heading to the default title
  };

  const openLightbox = (images) => {
    setLightboxImages(images);
    setLightboxIndex(0);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
    setLightboxImages([]);
  };

  const showNextImage = () => {
    setLightboxIndex((prevIndex) =>
      prevIndex < lightboxImages.length - 1 ? prevIndex + 1 : 0
    );
  };

  const showPrevImage = () => {
    setLightboxIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : lightboxImages.length - 1
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#2196F3]/10 to-[#4CAF50]/10 p-8">
      <motion.div
        className="max-w-lg w-full bg-white/80 backdrop-blur-md rounded-3xl shadow-lg p-8"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        <WordPullUp
          words={currentHeading} // Use the current heading state
          className="text-4xl font-bold text-[#2196F3] mb-6 text-center"
        />

        <div className="space-y-4">
          {currentMenu.map((item, index) => (
            <button
              key={index}
              className="w-full bg-[#4CAF50] hover:bg-[#388E3C] text-white py-4 rounded-lg transition-transform duration-150 hover:scale-105 flex items-center justify-between px-4"
              onClick={() => {
                if (item.submenu) handleMenuClick(item.submenu, item.label);
                else if (item.type === "gallery") openLightbox(item.images);
                else window.open(item.url, "_blank");
              }}
            >
              <span>{item.label}</span>
              {item.submenu ? (
                <ArrowRight className="h-5 w-5" />
              ) : item.type === "gallery" ? (
                <Eye className="h-5 w-5" />
              ) : (
                <Download className="h-5 w-5" />
              )}
            </button>
          ))}
        </div>

        {previousMenu && (
          <button
            className="mt-4 w-full bg-gray-300 hover:bg-gray-400 text-gray-700 py-4 rounded-lg transition-transform duration-150 hover:scale-105 flex items-center justify-center"
            onClick={handleBackClick}
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back
          </button>
        )}
      </motion.div>

      {/* Lightbox Popup */}
      {lightboxIndex !== null && lightboxImages.length > 0 && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="relative">
            <button
              onClick={closeLightbox}
              className="absolute top-2 right-2 text-white text-3xl font-bold cursor-pointer"
            >
              &times;
            </button>
            <button
              onClick={showPrevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-40 text-white text-3xl font-bold rounded-full h-10 w-10 flex items-center justify-center cursor-pointer"
            >
              &#10094;
            </button>
            <img
              src={lightboxImages[lightboxIndex]}
              alt="Gallery Image"
              className="max-w-[90vw] max-h-[90vh] rounded-lg"
            />
            <button
              onClick={showNextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-40 text-white text-3xl font-bold rounded-full h-10 w-10 flex items-center justify-center cursor-pointer"
            >
              &#10095;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
