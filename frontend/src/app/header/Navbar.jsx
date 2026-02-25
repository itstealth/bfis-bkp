"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Drawer from "./Drawer";

const logoSrc = "/assets/images/logo_color.png";

export default function Navbar() {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState(null);

  const navLinks = [
    { name: "Home", path: "/" },
    {
      name: "About Us",
      path: "/about",
      dropdown: [
        { name: "Message", path: "/about/message" },
        { name: "Our Values", path: "/about/values" },
        { name: "What Sets Us Apart", path: "/about/set-us-apart" },
      ],
    },
    { name: "Academics", path: "/academics" },
    { name: "Programs", path: "/program" },
    { name: "Admissions", path: "/admission" },
    { name: "Glimpse", path: "/glimpse" },
    {
      name: "Highlights",
      path: "/events",
      dropdown: [
        { name: "Events", path: "/events" },
        { name: "News Coverage", path: "/news-coverage" },
      ],
    },
    { name: "Contact", path: "/contact-us" },
  ];

  const isDropdownActive = (dropdown) =>
    dropdown?.some((item) => pathname.startsWith(item.path));

  const isActiveLink = (path, dropdown) =>
    pathname === path || (dropdown && isDropdownActive(dropdown));

  return (
    <nav className="bg-white/95 backdrop-blur-sm shadow-sm sticky top-0 z-50 border-b border-gray-200/80">
      <div className="container mx-auto">
        <div className="flex items-center justify-between ">
          {/* Logo */}
          <Link
            href="/"
            aria-label="Home"
            className="flex items-center transition-all duration-300 hover:opacity-90 hover:scale-[1.02]"
          >
            <Image
              src={logoSrc}
              alt="Brookfield International School Logo"
              width={700}
              height={140}
              priority
              className="h-24 w-auto"
            />
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden lg:flex items-center space-x-2">
            {navLinks.map((link) => (
              <li
                key={link.name}
                className="relative"
                onMouseEnter={() => setOpenDropdown(link.name)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={link.path}
                  className={`relative inline-flex items-center gap-1.5 px-5 py-2.5 text-sm font-semibold transition-all duration-300 rounded-lg ${
                    isActiveLink(link.path, link.dropdown)
                      ? "text-white bg-vgreen"
                      : "text-nblue hover:text-white hover:bg-vgreen"
                  }`}
                >
                  <span>{link.name}</span>
                  {link.dropdown && (
                    <svg
                      className={`w-5 h-5 transition-transform duration-300 ${
                        openDropdown === link.name ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  )}
                </Link>

                {/* Enhanced Dropdown with Gap */}
                {link.dropdown && openDropdown === link.name && (
                  <div className="absolute left-0 top-full pt-3 transition-opacity duration-200">
                    <div className="bg-white rounded-xl shadow-2xl border border-gray-200/50 overflow-hidden min-w-[220px] backdrop-blur-sm transform transition-all duration-200">
                      <ul className="py-2">
                        {link.dropdown.map((sublink) => (
                          <li key={sublink.name}>
                            <Link
                              href={sublink.path}
                              className={`flex items-center px-6 py-3 text-sm font-medium transition-all duration-200 rounded-lg mx-2 ${
                                pathname === sublink.path
                                  ? "bg-vgreen text-white font-semibold"
                                  : "text-nblue hover:bg-vgreen hover:text-white"
                              }`}
                            >
                              <span className="flex-1">{sublink.name}</span>
                              {pathname === sublink.path && (
                                <svg
                                  className="w-4 h-4 text-white"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              )}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>

          {/* Mobile Menu */}
          <div className="lg:hidden">
            <Drawer />
          </div>
        </div>
      </div>
    </nav>
  );
}
