"use client";

import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppButton() {
  const whatsappUrl =
    "https://wa.me/919066790662?text=Hi,%20I%20would%20like%20to%20experience%20Brookfield%20International%20School";

  return (
    <div className="group fixed bottom-16 right-3 md:bottom-4 z-[100] flex flex-col items-end gap-2">
      {/* Speech Bubble Tooltip - Shows on hover, hidden on mobile */}
      <div className="relative hidden sm:block opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="bg-[#dbdbdb] text-[#6e6e6e] text-base leading-[50px] shadow-[5px_5px_9px_-3px_#A3A3A3] text-center w-[250px] h-[50px] rounded-[10px] flex items-center justify-center">
          Connect with us on whatsapp
        </div>
        {/* Speech bubble tail */}
        <div
          className="absolute bottom-[-12px] right-[18%] w-0 h-0"
          style={{
            borderLeft: "12.5px solid transparent",
            borderRight: "12.5px solid transparent",
            borderTop: "12.5px solid #dbdbdb",
          }}
        />
      </div>

      {/* WhatsApp Floating Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-[60px] h-[60px] bg-[#25d366] text-white rounded-full flex items-center justify-center text-[30px] shadow-[2px_2px_3px_#999] hover:bg-[#20ba5a] transition-colors duration-300 active:scale-95"
        aria-label="Connect with us on WhatsApp"
      >
        <FaWhatsapp />
      </a>
    </div>
  );
}
