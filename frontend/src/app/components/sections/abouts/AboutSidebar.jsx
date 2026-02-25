/* eslint-disable react/prop-types */
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/app/components/ui/button";

export default function AboutSidebar({ sidebarLinks }) {
  const router = useRouter();

  return (
    <div className="col-span-1 mb-16 pt-8 lg:h-[700px] lg:sticky lg:top-4 lg:overflow-y-auto hidden lg:block">
      <div className="flex flex-col h-full p-6 rounded-lg shadow-lg bg-white text-nblue border border-nblue/40">
        <h2 className="mb-4 text-2xl text-nblue font-bold tracking-wider uppercase ml-4">
          Overview
        </h2>

        <nav className="mb-8 space-y-2">
          {sidebarLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block px-3 py-2 text-sm text-nblue transition-all duration-300 rounded-lg hover:pl-6 hover:text-white hover:bg-nblue hover:shadow-md"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Button
          onClick={() => router.push("/contact-us")}
          className="w-full px-3 py-2 mb-6 font-bold text-white bg-gradient-to-r from-nblue to-lblue rounded-lg shadow-lg transition-all duration-300 hover:from-lblue hover:to-nblue"
        >
          Apply Online
        </Button>

        <div className="relative flex-grow overflow-hidden rounded-lg bg-nblue min-h-48 max-h-96 shadow-md">
          <div className="absolute inset-0 bg-nblue/80"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-white">
            <p className="mb-3 text-xl font-semibold text-center">
              Discover Our Partnerships
            </p>
            <Button
              variant="outline"
              className="text-white transition-colors bg-transparent border border-white rounded-lg hover:bg-white hover:text-nblue max-w-[90%] text-sm"
              onClick={() => router.push("/contact-us")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
