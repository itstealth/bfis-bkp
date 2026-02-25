"use client";

import Link from "next/link";
import { FaFacebookF, FaInstagram } from "react-icons/fa6";
import { cn } from "@/app/lib/utils";
import PropTypes from "prop-types"; // Optional, keep or remove

const icons = [
  {
    id: 1,
    link: "https://www.facebook.com/brookfieldintschool/",
    icon: <FaFacebookF aria-hidden="true" />,
  },
  {
    id: 2,
    link: "https://www.instagram.com/brookfieldschool_chandigarh/",
    icon: <FaInstagram aria-hidden="true" />,
  },
];

const SocalIcons = ({ className = "", parentClass = "" }) => {
  return (
    <ul className={cn("flex items-center gap-[14px]", parentClass)}>
      {icons.map(({ icon, id, link }) => (
        <li key={id}>
          <Link
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "rounded-md w-6 h-6 flex items-center justify-center border border-white border-opacity-20 text-cream-foreground hover:bg-primary transition-all duration-500",
              className
            )}
            aria-label={`Visit us on ${
              link.includes("facebook") ? "Facebook" : "Instagram"
            }`}
          >
            {icon}
          </Link>
        </li>
      ))}
    </ul>
  );
};

SocalIcons.propTypes = {
  className: PropTypes.string,
  parentClass: PropTypes.string,
};

export default SocalIcons;
