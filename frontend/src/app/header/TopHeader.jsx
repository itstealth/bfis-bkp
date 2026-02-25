"use client";

import { FaPhone, FaEnvelope, FaLocationDot } from "react-icons/fa6";
import SocalIcons from "@/app/components/ui/socalIcons";

export default function TopHeader() {
  return (
    <div id="top-header" className="bg-nblue text-white sm:block hidden">
      <div className="container mx-auto">
        <div className="flex lg:flex-row flex-col justify-between items-center gap-2 py-3">
          <div>
            <ul className="flex gap-6 text-sm">
              <li className="flex items-center gap-2">
                <FaPhone />
                <a
                  href="tel:+919066790662"
                  className="hover:text-red-400 transition-colors"
                >
                  +91-90667 90662
                </a>
              </li>
              <li className="flex items-center gap-2">
                <FaEnvelope />
                <a
                  href="mailto:info@bfis.in"
                  className="hover:text-red-400 transition-colors"
                >
                  info@bfis.in
                </a>
              </li>
              <li className="flex items-center gap-2">
                <FaLocationDot />
                <a
                  href="https://www.google.com/maps/place/Sheikhpura+New+Chandigarh,+Kurali-Siswan+Road,+Mohali,+Pin:140110"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-red-400 transition-colors"
                >
                  Sheikhpura New Chandigarh, Kurali-Siswan Road, Dist. S.A.S
                  Nagar, Mohali, Pin: 140110
                </a>
              </li>
            </ul>
          </div>
          <div>
            <SocalIcons className="text-white hover:text-red-400 transition-colors text-sm" />
          </div>
        </div>
      </div>
    </div>
  );
}
