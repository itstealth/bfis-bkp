"use client";

import Link from "next/link";

export default function About() {
  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-4">About Us</h2>
      <p className="mb-8">
        Learn more about our company, values, and what sets us apart.
      </p>
      <ul className="space-y-2">
        <li>
          <Link href="/about/message" className="text-blue-500 hover:underline">
            Message
          </Link>
        </li>
        <li>
          <Link href="/about/values" className="text-blue-500 hover:underline">
            Values
          </Link>
        </li>
        <li>
          <Link
            href="/about/set-us-apart"
            className="text-blue-500 hover:underline"
          >
            What Sets Us Apart
          </Link>
        </li>
      </ul>
    </div>
  );
}
