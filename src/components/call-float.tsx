"use client";

import { Icon } from "@iconify/react";
import Link from "next/link";

export function CallFloat() {
  // Using the provided phone number
  const phoneNumber = "91"; // Same number for calls
  const callLink = `tel:+${phoneNumber}`;

  return (
    <div className="fixed bottom-28 right-6 z-[9999]">
      {/* Wave Animation Rings */}
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full bg-blue-500/20 animate-ping" />
        <div className="absolute inset-0 scale-125 rounded-full bg-blue-500/10 animate-pulse" />
        <div className="absolute inset-0 scale-150 rounded-full bg-blue-500/5 animate-pulse delay-75" />

        {/* Call Button */}
        <Link
          href={callLink}
          className="absolute inset-0 flex items-center justify-center bg-blue-500 rounded-full shadow-lg hover:bg-blue-600 transition-colors group"
        >
          <Icon 
            icon="ic:baseline-phone" 
            className="w-9 h-9 text-white transform group-hover:scale-110 transition-transform" 
          />
          
          {/* Tooltip */}
          <span className="absolute right-full mr-3 px-2 py-1 bg-black/75 text-white text-sm rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
            Call us
          </span>
        </Link>
      </div>
    </div>
  );
}