"use client";

import { FaPhone } from "react-icons/fa6";

const CallUsStrip = ({ setIsOpen }) => {
  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setIsOpen(true);
    }
  };

  return (
    /* Visible only on mobile */
    <div className="fixed bottom-0 left-0 right-0 z-50 block md:hidden shadow-lg">
      <div className="flex">
        {/* Enquire Now Button */}
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-gradient-to-r from-nblue to-lblue p-4 text-center text-white font-semibold cursor-pointer hover:from-lblue hover:to-nblue transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-lblue"
          aria-label="Open enquiry form"
        >
          Enquire Now
        </button>

        {/* Call Us Link */}
        <a
          href="tel:+919066790662"
          className="flex-1 bg-vgreen p-4 text-center text-white font-semibold hover:bg-hgreen transition-colors duration-300 flex justify-center items-center gap-2 focus:outline-none focus:ring-2 focus:ring-vgreen/60"
          aria-label="Call us at +91 90667 90662"
        >
          <FaPhone className="text-xl" aria-hidden="true" />
          Call Us
        </a>
      </div>
    </div>
  );
};

export default CallUsStrip;
