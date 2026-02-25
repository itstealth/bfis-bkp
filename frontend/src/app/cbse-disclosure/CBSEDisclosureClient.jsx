"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import WordPullUp from "@/app/components/ui/word-pull-up";
import { ArrowRight, ArrowLeft, Eye, Download } from "lucide-react";

const staffImage = "/assets/images/staff.jpg";
const glimpseImage = "/assets/images/infra.jpg";

const inspectionReport =
  "/assets/pdf/cbseDisclosure/Inspection-Report-SARAS.pdf";
const cbseAffiliation = "/assets/pdf/cbseDisclosure/CBSE-AFFILIATION.pdf";
const trustDeed = "/assets/pdf/cbseDisclosure/trustDeed.pdf";
const noc = "/assets/pdf/cbseDisclosure/NOC.pdf";
const rte = "/assets/pdf/cbseDisclosure/RTE.pdf";
const buildingSafety =
  "/assets/pdf/cbseDisclosure/building-safet-certificate.pdf";
const fireSafety =
  "/assets/pdf/cbseDisclosure/Punjab-Fire-Services-1_page-0001.pdf";
const deoCertificate = "/assets/pdf/cbseDisclosure/DEO-CERTIFICATE.pdf";
const waterHealthSanitisation =
  "/assets/pdf/cbseDisclosure/WATER-HEALTH-AND-SANITATION-CERTIFICATE.pdf";
const annualCalendar = "/assets/pdf/cbseDisclosure/Annual-Calender.pdf";

const result202425 = "/assets/pdf/cbseDisclosure/Result-2024-25.pdf";
const smc = "/assets/pdf/cbseDisclosure/SMC-min-scaled.jpg";
const parentsTeacherAssociation = "/assets/pdf/cbseDisclosure/4-scaled.jpg";
const schoolLeavingCertificate =
  "/assets/pdf/cbseDisclosure/SLC-min-scaled.jpg";
const classWiseStudentStrength = "/assets/pdf/cbseDisclosure/6-1-scaled.jpg";

const mainMenu = [
  {
    label: "Appendix 11",
    submenu: [
      {
        label: "Appendix 9",
        url: inspectionReport,
      },
    ],
  },
  {
    label: "Documents & Information",
    submenu: [
      { label: "CBSE Affiliation Letter", url: cbseAffiliation },
      { label: "Trust Deed", url: trustDeed },
      { label: "NOC", url: noc },
      { label: "Recognition Certificate under RTE", url: rte },
      { label: "Building Safety Certificate", url: buildingSafety },
      { label: "Fire Safety Certificate", url: fireSafety },
      { label: "Deo Certificate", url: deoCertificate },
      {
        label: "Water, Health & Sanitisation Certificate",
        url: waterHealthSanitisation,
      },
    ],
  },
  {
    label: "Results & Academics",
    submenu: [
      { label: "Annual Calendar", url: annualCalendar },
      { label: "Result 2024-25", url: result202425 },
      { label: "School Management Committee", url: smc },
      { label: "Parents Teacher Association", url: parentsTeacherAssociation },
      { label: "School Leaving Certificate", url: schoolLeavingCertificate },
      { label: "Class wise student strength", url: classWiseStudentStrength },
    ],
  },
  {
    label: "Staff (Teaching)",
    submenu: [
      { label: "Staff Details", images: [staffImage], type: "gallery" },
    ],
  },
  {
    label: "School glimpse",
    submenu: [{ label: "glimpse", images: [glimpseImage], type: "gallery" }],
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

export default function CBSEDisclosureClient() {
  const [currentMenu, setCurrentMenu] = useState(mainMenu);
  const [previousMenu, setPreviousMenu] = useState(null);
  const [currentHeading, setCurrentHeading] = useState("CBSE Disclosure");
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
    setCurrentHeading("CBSE Disclosure");
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
              className="absolute top-2 right-2 text-black text-3xl font-bold cursor-pointer"
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
