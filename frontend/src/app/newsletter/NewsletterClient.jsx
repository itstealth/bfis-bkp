"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import WordPullUp from "@/app/components/ui/word-pull-up";
import { ArrowRight, ArrowLeft, Eye, Download } from "lucide-react";

// 2025
const NewsletterMar2025 =
  "/assets/pdf/newsletter/2025/BFIS NEWSLETTER MARCH 2024-25.pdf";
const NewsletterAprJr2025 =
  "/assets/pdf/newsletter/2025/01- BFIS JR. NEWSLETTER APRIL 2025.pdf";
const NewsletterAprSr2025 =
  "/assets/pdf/newsletter/2025/02- BFIS SR. NEWSLETTER APRIL 2025.pdf";
const NewsletterMayJr2025 =
  "/assets/pdf/newsletter/2025/03- BFIS JR. NEWSLETTER MAY 2025.pdf";
const NewsletterMaySr2025 =
  "/assets/pdf/newsletter/2025/04- BFIS SR. NEWSLETTER MAY 2025.pdf";
const NewsletterJun2025 =
  "/assets/pdf/newsletter/2025/05- BFIS NEWSLETTER JUNE 2025.pdf";
const NewsletterJunJr2025 =
  "/assets/pdf/newsletter/2025/BFIS_NEWSLETTER_JUNE_2025.pdf";
const NewsletterJul2025 =
  "/assets/pdf/newsletter/2025/BFIS SR. NEWLETTER JULY 2025.pdf";
const NewsletterJulJr2025 =
  "/assets/pdf/newsletter/2025/BFIS_JR_NEWSLETTER_JULY_2025.pdf";
const NewsletterAug2025 = "/assets/pdf/newsletter/2025/BFIS SR. NEWSLETTER AUGUST 2025.pdf";
const NewsletterAugJr2025 = "/assets/pdf/newsletter/2025/BFIS_JR_NEWSLETTER_AUGUST_2025.pdf";
const NewsletterSepAndOct2025 = "/assets/pdf/newsletter/2025/BFIS SR. NEWSLETTER SEP-and-OCT 2025.pdf";
const NewsletterSepAndOctJr2025 = "/assets/pdf/newsletter/2025/BFIS_JR_NEWSLETTER_SEP_&_OCT_2025.pdf";
const NewsletterNovAndDec2025 = "/assets/pdf/newsletter/2025/BFIS SR.NEWSLETTER NOV-DEC25.pdf";
const NewsletterNovAndDecJr2025 = "/assets/pdf/newsletter/2025/BFIS_JR.NEWSLETTER_NOV_&_DEC 25.pdf";
// 2024
const Newsletterjan2024 =
  "/assets/pdf/newsletter/2024/BFIS_NEWLETTER_JAN_2024.pdf";
const Newsletterfeb2024 =
  "/assets/pdf/newsletter/2024/BFIS_NEWLETTER_FEB_2024.pdf";
const Newslettermar2024 =
  "/assets/pdf/newsletter/2024/BFIS_NEWLETTER_MARCH_2024.pdf";
const Newsletteraprjr2024 =
  "/assets/pdf/newsletter/2024/BFIS_JR.NEWSLETTER/BFIS_JR.NEWSLETTER_APRIL_2024.pdf";
const Newsletteraprsr2024 =
  "/assets/pdf/newsletter/2024/BFIS_SR.NEWSLETTER/BFIS_SR.NEWSLETTER_APRIL_2024.pdf";
const Newslettermaysr2024 =
  "/assets/pdf/newsletter/2024/BFIS_SR.NEWSLETTER/BFIS_SR.NEWLETTER_MAY_2024.pdf";
const Newslettermayjr2024 =
  "/assets/pdf/newsletter/2024/BFIS_JR.NEWSLETTER/BFIS_JR.NEWLETTER_MAY_2024.pdf";
const Newsletterjun2024 =
  "/assets/pdf/newsletter/2024/BFIS_NEWLETTER_JUN_2024.pdf";
const Newsletterjulsr2024 =
  "/assets/pdf/newsletter/2024/BFIS_SR.NEWSLETTER/BFIS_SR.NEWSLETTER_JULY_2024.pdf";
const Newsletterjuljr2024 =
  "/assets/pdf/newsletter/2024/BFIS_JR.NEWSLETTER/BFIS_JR.NEWSLETTER_JULY_2024.pdf";
const Newsletteraugsr2024 =
  "/assets/pdf/newsletter/2024/BFIS_SR.NEWSLETTER/BFIS_SR.NEWLETTER_AUGUST_2024.pdf";
const Newsletteraugjr2024 =
  "/assets/pdf/newsletter/2024/BFIS_JR.NEWSLETTER/BFIS_JR.NEWSLETTER_AUGUST_2024.pdf";
const Newslettersep2024 =
  "/assets/pdf/newsletter/2024/BFIS_NEWLETTER_SEPTEMBER_2024.pdf";
const Newsletteroctsr2024 =
  "/assets/pdf/newsletter/2024/BFIS_SR.NEWSLETTER/BFIS_SR.NEWLETTER_OCTOBER_2024.pdf";
const Newsletteroctjr2024 =
  "/assets/pdf/newsletter/2024/BFIS_JR.NEWSLETTER/BFIS_JR.NEWLETTER_OCTOBER_2024.pdf";
const Newsletternov2024 =
  "/assets/pdf/newsletter/2024/BFIS_NEWLETTER_NOVEMBER_2024.pdf";
const Newsletterdecjr2024 =
  "/assets/pdf/newsletter/2024/BFIS_JR.NEWSLETTER/BFIS_JR.NEWLETTER_DECEMBER_2024.pdf";

// 2023
const NewsletterJan2023 =
  "/assets/pdf/newsletter/2023/BFIS-NEWLETTER-JANUARY-2023.pdf";
const NewsletterFeb2023 =
  "/assets/pdf/newsletter/2023/BFIS-NEWLETTER-FEBRUARY-2023.pdf";
const NewsletterMar2023 =
  "/assets/pdf/newsletter/2023/BFIS-NEWLETTER-MARCH-2023.pdf";
const NewsletterAprSr2023 =
  "/assets/pdf/newsletter/2023/BFIS-SR.-NEWLETTER-APRIL-2023.pdf";
const NewsletterAprJr2023 =
  "/assets/pdf/newsletter/2023/BFIS-JR.-NEWLETTER-APRIL-2023.pdf";
const NewsletterMaySr2023 =
  "/assets/pdf/newsletter/2023/BFIS-SR.-NEWLETTER-MAY-2023.pdf";
const NewsletterMayJr2023 =
  "/assets/pdf/newsletter/2023/BFIS-JR.-NEWLETTER-MAY-2023.pdf";
const NewsletterJulSr2023 =
  "/assets/pdf/newsletter/2023/BFIS-SR.-NEWLETTER-JULY-2023.pdf";
const NewsletterJulJr2023 =
  "/assets/pdf/newsletter/2023/BFIS-JR.-NEWLETTER-JULY-2023.pdf";
const NewsletterAugSr2023 =
  "/assets/pdf/newsletter/2023/BFIS-SR.-NEWLETTER-AUGUST-2023.pdf";
const NewsletterAugJr2023 =
  "/assets/pdf/newsletter/2023/BFIS-JR.-NEWLETTER-AUGUST-2023.pdf";
const NewsletterSepSr2023 =
  "/assets/pdf/newsletter/2023/BFIS-SR.-NEWLETTER-SEPTEMBER-2023.pdf";
const NewsletterSepJr2023 =
  "/assets/pdf/newsletter/2023/BFIS-JR.-NEWLETTER-SEPTEMBER-2023.pdf";
const NewsletterOctSr2023 =
  "/assets/pdf/newsletter/2023/BFIS-SR.-NEWLETTER-OCTOBER-2023.pdf";
const NewsletterOctJr2023 =
  "/assets/pdf/newsletter/2023/BFIS-JR.-NEWLETTER-OCTOBER-2023.pdf";
const NewsletterNovSr2023 =
  "/assets/pdf/newsletter/2023/BFIS-SR.-NEWLETTER-NOVEMBER-2023.pdf";
const NewsletterNovJr2023 =
  "/assets/pdf/newsletter/2023/BFIS-JR.-NEWLETTER-NOVEMBER-2023.pdf";
const NewsletterDecSr2023 =
  "/assets/pdf/newsletter/2023/BFIS-SR.-NEWLETTER-DECEMBER-2023.pdf";
const NewsletterDecJr2023 =
  "/assets/pdf/newsletter/2023/BFIS-JR.-NEWLETTER-DECEMBER-2023.pdf";

// 2022
const NewsletterJan2022 = "/assets/pdf/newsletter/2022/JANUARY_2022.pdf";
const NewsletterFeb2022 = "/assets/pdf/newsletter/2022/FEBRUARY_2022.pdf";
const NewsletterMay2022 =
  "/assets/pdf/newsletter/2022/BFIS_NEWSLETTER-MAY-2022.pdf";
const NewsletterApr2022 = "/assets/pdf/newsletter/2022/APRIL_2022.pdf";
const NewsletterJun2022 =
  "/assets/pdf/newsletter/2022/BFIS-NEWLETTER-JUNE-2022.pdf";
const NewsletterJul2022 =
  "/assets/pdf/newsletter/2022/BFIS-NEWLETTER-JULY-2022.pdf";
const NewsletterAug2022 =
  "/assets/pdf/newsletter/2022/BFIS-NEWLETTER-AUGUST-2022.pdf";
const NewsletterSep2022 =
  "/assets/pdf/newsletter/2022/BFIS-NEWSLETTER-SEPTEMBER-2022.pdf";
const NewsletterOct2022 =
  "/assets/pdf/newsletter/2022/BFIS-NEWLETTER-OCTOBER-2022.pdf";
const NewsletterNov2022 =
  "/assets/pdf/newsletter/2022/BFIS-NEWLETTER-NOVEMBER-2022.pdf";
const NewsletterDec2022 =
  "/assets/pdf/newsletter/2022/BFIS-NEWSLETTER-DECEMBER-2022.pdf";

const mainMenu = [
  {
    label: "E-Newsletter 2025",
    submenu: [
      { label: "March 2024-25", url: NewsletterMar2025 },
      { label: "April 2025 (JR)", url: NewsletterAprJr2025 },
      { label: "April 2025 (SR)", url: NewsletterAprSr2025 },
      { label: "May 2025 (JR)", url: NewsletterMayJr2025 },
      { label: "May 2025 (SR)", url: NewsletterMaySr2025 },
      { label: "June 2025 (SR)", url: NewsletterJun2025 },
      { label: "June 2025 (JR)", url: NewsletterJulJr2025 },
      { label: "July 2025 (SR)", url: NewsletterJul2025 },
      { label: "July 2025 (JR)", url: NewsletterJulJr2025 },
      { label: "August 2025 (SR)", url: NewsletterAug2025 },
      { label: "August 2025 (JR)", url: NewsletterAugJr2025 },
      { label: "September & October 2025 (SR)", url: NewsletterSepAndOct2025 },
      { label: "September & October 2025 (JR)", url: NewsletterSepAndOctJr2025 },
      { label: "November & December 2025 (SR)", url: NewsletterNovAndDec2025 },
      { label: "November & December 2025 (JR)", url: NewsletterNovAndDecJr2025 },
    ],
  },
  {
    label: "E-Newsletter 2024",
    submenu: [
      { label: "January 2024", url: Newsletterjan2024 },
      { label: "February 2024", url: Newsletterfeb2024 },
      { label: "March 2024", url: Newslettermar2024 },
      { label: "April 2024 (SR)", url: Newsletteraprsr2024 },
      { label: "April 2024 (JR)", url: Newsletteraprjr2024 },
      { label: "May 2024(SR)", url: Newslettermaysr2024 },
      { label: "May 2024(JR)", url: Newslettermayjr2024 },
      { label: "June 2024", url: Newsletterjun2024 },
      { label: "July 2024(SR)", url: Newsletterjulsr2024 },
      { label: "July 2024(JR)", url: Newsletterjuljr2024 },
      { label: "August 2024(SR)", url: Newsletteraugsr2024 },
      { label: "August 2024(JR)", url: Newsletteraugjr2024 },
      { label: "September 2024", url: Newslettersep2024 },
      { label: "October 2024(SR)", url: Newsletteroctsr2024 },
      { label: "October 2024(JR)", url: Newsletteroctjr2024 },
      { label: "November 2024", url: Newsletternov2024 },
      { label: "December 2024(JR)", url: Newsletterdecjr2024 },
    ],
  },
  {
    label: "E-Newsletter 2023",
    submenu: [
      { label: "January 2023", url: NewsletterJan2023 },
      { label: "February 2023", url: NewsletterFeb2023 },
      { label: "March 2023", url: NewsletterMar2023 },
      { label: "April 2023 (SR)", url: NewsletterAprSr2023 },
      { label: "April 2023 (JR)", url: NewsletterAprJr2023 },
      { label: "May 2023 (SR)", url: NewsletterMaySr2023 },
      { label: "May 2023 (JR)", url: NewsletterMayJr2023 },
      { label: "July 2023 (SR)", url: NewsletterJulSr2023 },
      { label: "July 2023 (JR)", url: NewsletterJulJr2023 },
      { label: "August 2023 (SR)", url: NewsletterAugSr2023 },
      { label: "August 2023 (JR)", url: NewsletterAugJr2023 },
      { label: "September 2023 (SR)", url: NewsletterSepSr2023 },
      { label: "September 2023 (JR)", url: NewsletterSepJr2023 },
      { label: "October 2023 (SR)", url: NewsletterOctSr2023 },
      { label: "October 2023 (JR)", url: NewsletterOctJr2023 },
      { label: "November 2023 (SR)", url: NewsletterNovSr2023 },
      { label: "November 2023 (JR)", url: NewsletterNovJr2023 },
      { label: "December 2023 (SR)", url: NewsletterDecSr2023 },
      { label: "December 2023 (JR)", url: NewsletterDecJr2023 },
    ],
  },
  {
    label: "E-Newsletter 2022",
    submenu: [
      { label: "January 2022", url: NewsletterJan2022 },
      { label: "February 2022", url: NewsletterFeb2022 },
      { label: "April 2022", url: NewsletterApr2022 },
      { label: "May 2022", url: NewsletterMay2022 },
      { label: "June 2022", url: NewsletterJun2022 },
      { label: "July 2022", url: NewsletterJul2022 },
      { label: "August 2022", url: NewsletterAug2022 },
      { label: "September 2022", url: NewsletterSep2022 },
      { label: "October 2022", url: NewsletterOct2022 },
      { label: "November 2022", url: NewsletterNov2022 },
      { label: "December 2022", url: NewsletterDec2022 },
    ],
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

export default function NewsletterClient() {
  const [currentMenu, setCurrentMenu] = useState(mainMenu);
  const [previousMenu, setPreviousMenu] = useState(null);
  const [currentHeading, setCurrentHeading] = useState("Newsletter");
  const [lightboxImages, setLightboxImages] = useState([]);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const handleMenuClick = (submenu, label) => {
    if (submenu) {
      setPreviousMenu(currentMenu);
      setCurrentMenu(submenu);
      setCurrentHeading(label);
    }
  };

  const handleBackClick = () => {
    setCurrentMenu(previousMenu);
    setPreviousMenu(null);
    setCurrentHeading("Newsletter");
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
          words={currentHeading}
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
