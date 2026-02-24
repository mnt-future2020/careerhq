"use client";

import { Icon } from "@iconify/react";
import Link from "next/link";

export function EmailFloat() {
  // Using a professional email address
  const emailAddress = "hello@careerhq.in"; // Replace with your actual email
  const emailLink = `mailto:${emailAddress}`;

  return (
    <div className="fixed bottom-48  right-6 z-[9999]">
      {/* Wave Animation Rings */}
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full bg-purple-500/20 animate-ping" />
        <div className="absolute inset-0 scale-125 rounded-full bg-purple-500/10 animate-pulse" />
        <div className="absolute inset-0 scale-150 rounded-full bg-purple-500/5 animate-pulse delay-75" />

        {/* Email Button */}
        <Link
          href={emailLink}
          className="absolute inset-0 flex items-center justify-center bg-purple-500 rounded-full shadow-lg hover:bg-purple-600 transition-colors group"
        >
          <Icon
            icon="ic:baseline-email"
            className="w-9 h-9 text-white transform group-hover:scale-110 transition-transform"
          />

          {/* Tooltip */}
          <span className="absolute right-full mr-3 px-2 py-1 bg-black/75 text-white text-sm rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
            Email us
          </span>
        </Link>
      </div>
    </div>
  );
}