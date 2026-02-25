"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";

// Component imports
import HeroVideo from "@/app/components/sections/heros/HeroVideo";
import SchoolSection from "@/app/components/sections/SchoolSection";
import Gallery from "@/app/components/sections/Gallery";
import PicLayout from "@/app/components/sections/PicLayout";
import FullscreenSections from "@/app/components/sections/FullScreenSections/FullScreenSection";
import EducationalExperience from "@/app/components/sections/SchoolComponent/EducationalExperience";
import StudentLife from "@/app/components/sections/studentLife";
import AchievementsSection from "@/app/components/sections/achievementsSection";
import BfisLife from "@/app/components/sections/BfisLife";
import EnquiryPopup from "@/app/components/sections/EnquiryPopup";

// ✅ Use image paths as strings (public folder best practice)
const sectionsData = [
  {
    id: "section-1",
    backgroundImage: "/assets/images/world.png",
    heading: "World-Class Learning",
    buttonText: "Know More",
    onButtonClick: (router) => router.push("/program"),
  },
  {
    id: "section-2",
    backgroundImage: "/assets/images/learn.png",
    heading: "Innovative E-Learning Facilities",
    buttonText: "Know More",
    onButtonClick: (router) => router.push("/academics#smart-classes"),
  },
  {
    id: "section-5",
    backgroundImage: "/assets/images/ethos.png",
    heading: "BFIS Values & Ethos",
    buttonText: "Know More",
    onButtonClick: (router) => router.push("/about/values"),
  },
  {
    id: "section-4",
    backgroundImage: "/assets/images/art.png",
    heading: "State-of-the-art Facilities",
    buttonText: "Know More",
    onButtonClick: (router) => router.push("/glimpse"),
  },
];

export default function HomePage() {
  const ref = useRef(null);
  const router = useRouter();

  // Pass router callback for buttons
  const sectionBtnProps = sectionsData.map((section) => ({
    ...section,
    onButtonClick: () => section.onButtonClick(router),
  }));

  return (
    <div ref={ref} className="relative w-full">
      <EnquiryPopup />
      <HeroVideo />
      <EducationalExperience />
      <PicLayout />
      {/* Pass updated sections with router injected */}
      <FullscreenSections sections={sectionBtnProps} />
      <StudentLife />
      <AchievementsSection />
      <SchoolSection />
      <BfisLife />
      <Gallery />
    </div>
  );
}
