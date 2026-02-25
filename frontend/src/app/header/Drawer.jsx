"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/app/components/ui/sheet";
import { Menu } from "lucide-react";

const logoSrc = "/assets/images/logo_color.png";

export default function Drawer() {
  const navlinks = [
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

  return (
    <Sheet>
      <SheetTrigger className="lg:hidden block">
        <Menu className="w-8 h-8 text-nblue" />
      </SheetTrigger>

      <SheetContent className="bg-nblue text-white">
        <SheetHeader>
          {/* Logo with white background for visibility */}
          <div className="bg-white rounded-lg p-3 mb-4">
            <Link
              href="/"
              aria-label="Home"
              className="flex items-center transition-all duration-300 hover:opacity-90"
            >
              <Image
                src={logoSrc}
                alt="Brookfield International School Logo"
                width={320}
                height={64}
                priority
                className="h-auto w-auto max-w-[240px]"
              />
            </Link>
          </div>

          <SheetDescription className="text-white text-left pt-5">
            <nav>
              <ul className="space-y-2">
                {navlinks.map((link) => (
                  <li key={link.name}>
                    <SheetClose asChild>
                      <Link
                        href={link.path}
                        className="block py-2 px-4 font-semibold text-slate-200 hover:bg-lblue/40 rounded"
                      >
                        {link.name}
                      </Link>
                    </SheetClose>
                    {link.dropdown && (
                      <ul className="ml-4 space-y-1">
                        {link.dropdown.map((dropdownItem) => (
                          <li key={dropdownItem.name}>
                            <SheetClose asChild>
                              <Link
                                href={dropdownItem.path}
                                className="block py-2 px-4 font-medium text-slate-200 hover:bg-lblue/40 rounded"
                              >
                                {dropdownItem.name}
                              </Link>
                            </SheetClose>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
