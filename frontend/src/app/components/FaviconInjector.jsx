"use client";

import { useEffect } from "react";

export default function FaviconInjector() {
  useEffect(() => {
    // Remove any existing favicon links
    const existingLinks = document.querySelectorAll('link[rel*="icon"]');
    existingLinks.forEach((link) => link.remove());

    // Create and inject the correct favicon
    const link = document.createElement("link");
    link.rel = "icon";
    link.type = "image/png";
    link.href = "/assets/favicon.png";
    document.head.appendChild(link);

    // Also add shortcut icon
    const shortcutLink = document.createElement("link");
    shortcutLink.rel = "shortcut icon";
    shortcutLink.type = "image/png";
    shortcutLink.href = "/assets/favicon.png";
    document.head.appendChild(shortcutLink);

    // Add apple-touch-icon
    const appleLink = document.createElement("link");
    appleLink.rel = "apple-touch-icon";
    appleLink.href = "/assets/favicon.png";
    document.head.appendChild(appleLink);
  }, []);

  return null;
}

