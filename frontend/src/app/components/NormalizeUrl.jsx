"use client";

import { useEffect } from "react";

export default function NormalizeUrl() {
  useEffect(() => {
    const { pathname, search, hash } = window.location;

    // Fix double slashes and trailing slashes
    let newPath = pathname;

    // Remove multiple consecutive slashes
    newPath = newPath.replace(/\/+/g, "/");

    // Remove trailing slash unless it's the root
    if (newPath.length > 1 && newPath.endsWith("/")) {
      newPath = newPath.replace(/\/+$/, "");
    }

    // Only update if path actually changed
    if (newPath !== pathname) {
      window.history.replaceState(null, "", newPath + search + hash);
    }
  }, []);

  return null; // no UI output needed
}
