"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { FaPhone, FaEnvelope, FaLocationDot } from "react-icons/fa6";

import Logo from "@/app/components/ui/logo";
import SocalIcons from "@/app/components/ui/socalIcons";
import CopyRight from "@/app/footer/copyRight";
import ScrollUp from "@/app/footer/ScrollUp";
import SlideUp from "@/app/lib/animations/slideUp";
import EnquiryPopup from "@/app/components/sections/EnquiryPopup";
import ImagePopup from "@/app/components/sections/ImagePopup"; // Import the new component
import CallUsStrip from "@/app/footer/CallUsStrip";

const apple = "/assets/images/shapes/apple.svg";
const scissors = "/assets/images/shapes/scissors.svg";
const feeStructure = "/assets/images/fee-structure/Fee-Structure.jpeg";
const Brochure = "/assets/pdf/BFIS-Brochure.pdf";

const restrictedPaths = ["/login", "/admin", "/thankyou", "/contact-us"];

export default function Footer() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false); // For enquiry form
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false); // For image popup
  const shouldShowEnquiry = !restrictedPaths.some((path) =>
    pathname.startsWith(path)
  );

  // This effect will show the image popup only once on homepage load
  useEffect(() => {
    // Only show on homepage
    if (pathname === "/" && shouldShowEnquiry) {
      // Check if popup has already been shown in this session
      const popupShown = sessionStorage.getItem("bfisImagePopupShown");
      if (!popupShown) {
        const timer = setTimeout(() => {
          setIsImagePopupOpen(true);
          sessionStorage.setItem("bfisImagePopupShown", "true");
        }, 5000); // Show after 5 seconds
        return () => clearTimeout(timer);
      }
    }
  }, [pathname, shouldShowEnquiry]); // Only trigger when pathname changes to "/"

  return (
    <footer className="pt-20 bg-nblue relative">
      <div className="container">
        <div className="grid lg:grid-cols-[300px_auto_auto_268px] md:grid-cols-2 grid-cols-1 gap-x-4 gap-y-8 sm:gap-x-7 sm:gap-y-10 justify-between text-center sm:text-left">
          {/* About Section */}
          <SlideUp delay={2}>
            <div>
              <div className="flex justify-center sm:justify-start">
                <div className="bg-white rounded-lg p-4 inline-block">
                  <Logo className="text-white" />
                </div>
              </div>
              <p className="mt-10 text-white opacity-80">
                We cultivate the potential of young minds to excel. Our
                dedication guarantees each child's utmost growth.
              </p>
            </div>
          </SlideUp>

          {/* Quick Links */}
          <SlideUp delay={3}>
            <div>
              <h3 className="text-2xl font-semibold text-white">Quick Links</h3>
              <span className="hidden sm:block w-[130%] h-[1px] mt-2 bg-vgreen relative after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:bg-vgreen after:rounded-full after:w-1.5 after:h-1.5" />
              <ul className="mt-5 flex flex-col space-y-2">
                {[
                  { title: "Newsletter", url: "/newsletter" },
                  { title: "CBSE Disclosure", url: "/cbse-disclosure" },
                  { title: "Uniform", url: "/uniform" },
                  { title: "Book List", url: "/books" },
                  { title: "Work With Us", url: "/work-with-us" },
                  { title: "Policies", url: "/policies" },
                ].map(({ title, url }) => (
                  <li key={url}>
                    <Link
                      href={url}
                      className="text-white transition-all duration-500 hover:ml-1 hover:text-vgreen"
                    >
                      {title}
                    </Link>
                  </li>
                ))}
                <li>
                  <a
                    href={feeStructure}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white transition-all duration-500 hover:ml-1 hover:text-vgreen"
                  >
                    Fee Structure
                  </a>
                </li>
                <li>
                  <a
                    href={Brochure}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white transition-all duration-500 hover:ml-1 hover:text-vgreen"
                  >
                    Download Brochure
                  </a>
                </li>
              </ul>
            </div>
          </SlideUp>

          {/* Contact Section */}
          <SlideUp delay={4}>
            <div>
              <h3 className="text-2xl font-semibold text-white">Contact</h3>
              <span className="hidden sm:block w-[130%] h-[1px] mt-2 bg-vgreen relative after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:bg-vgreen after:rounded-full after:w-1.5 after:h-1.5" />
              <ul className="mt-5 flex flex-col space-y-3 items-center sm:items-start">
                <li
                  role="link"
                  tabIndex={0}
                  onClick={() =>
                    window.open(
                      "https://goo.gl/maps/VrSztaoNVPFTmy4v8",
                      "_blank",
                      "noopener,noreferrer"
                    )
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      window.open(
                        "https://goo.gl/maps/VrSztaoNVPFTmy4v8",
                        "_blank",
                        "noopener,noreferrer"
                      );
                    }
                  }}
                  className="flex gap-2 cursor-pointer max-w-[250px] text-white items-start"
                >
                  <FaLocationDot className="mt-[6px]" aria-hidden="true" />
                  <span className="max-w-[220px]">
                    Sheikhpura, New Chandigarh, Kurali, Dist. SAS Nagar, Mohali,
                    Pin 140110
                  </span>
                </li>
                <li className="flex gap-2 items-center text-white">
                  <FaEnvelope aria-hidden="true" />
                  <a
                    href="mailto:info@bfis.in"
                    className="hover:text-vgreen"
                    aria-label="Email"
                  >
                    info@bfis.in
                  </a>
                </li>
                <li className="flex gap-2 items-center text-white">
                  <FaPhone aria-hidden="true" />
                  <a
                    href="tel:+919066790662"
                    className="hover:text-vgreen"
                    aria-label="Phone"
                  >
                    +91 90667 90662
                  </a>
                </li>
              </ul>
            </div>
          </SlideUp>

          {/* Share Section */}
          <SlideUp delay={5}>
            <div>
              <h3 className="text-2xl font-semibold text-white">Share</h3>
              <span className="hidden sm:block w-[130%] h-[1px] mt-2 bg-background relative after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:bg-background after:rounded-full after:w-1.5 after:h-1.5" />
              <div className="mt-4 flex justify-center sm:justify-start gap-4">
                <SocalIcons
                  parentClass="gap-5 sm:gap-3 justify-start"
                  className="w-8 h-8 border border-white border-opacity-30 rounded hover:bg-vgreen cursor-pointer"
                />
              </div>
            </div>
          </SlideUp>
        </div>

        <CopyRight color="text-white opacity-80" />
      </div>

      <ScrollUp />

      {/* Enquiry Call-To-Actions */}
      {shouldShowEnquiry && (
        <>
          <CallUsStrip setIsOpen={setIsOpen} />
          <div className="fixed right-0 top-1/2 transform -translate-y-1/2 z-50 hidden md:block">
            <button
              onClick={() => setIsOpen(true)}
              className="bg-vgreen text-white px-1 py-2 hover:bg-hgreen transition-colors duration-300 font-semibold rounded-r-lg shadow-lg z-50 text-base whitespace-nowrap"
              style={{
                writingMode: "vertical-rl",
                textOrientation: "mixed",
                transform: "rotate(180deg)",
                minWidth: "max-content",
              }}
            >
              Enquire Now
            </button>
          </div>
          <EnquiryPopup isOpen={isOpen} setIsOpen={setIsOpen} />
          <ImagePopup
            isOpen={isImagePopupOpen}
            setIsOpen={setIsImagePopupOpen}
          />
        </>
      )}

      {/* Decorative Images */}
      <div>
        <img
          src={apple}
          alt="Decorative Apple"
          className="pointer-events-none absolute right-[68px] top-[40%] h-auto w-12 animate-up-down"
          aria-hidden="true"
          loading="lazy"
        />
        <img
          src={scissors}
          alt="Decorative Scissors"
          className="pointer-events-none absolute left-[45%] top-[40%] h-auto w-12"
          aria-hidden="true"
          loading="lazy"
        />
      </div>
    </footer>
  );
}
