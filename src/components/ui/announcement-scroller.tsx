"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react";

interface AnnouncementItem {
  id: string;
  text: string;
  link: string;
  icon?: string;
}

interface AnnouncementScrollerProps {
  items: AnnouncementItem[];
  className?: string;
  speed?: number;
}

export function AnnouncementScroller({
  items,
  className,
  speed = 80,
}: AnnouncementScrollerProps) {
  // Duplicate items for seamless loop
  const duplicatedItems = [...items, ...items, ...items];

  // Calculate dynamic speed based on content length
  // Lower duration = faster scroll
  const calculatedSpeed = Math.max(speed / items.length, 15);

  return (
    <div
      className={cn(
        "relative overflow-hidden py-2 md:py-4 bg-gradient-to-r from-red-600 via-rose-500 to-red-600 shadow-lg",
        className
      )}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-30">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-0 left-10 w-32 h-32 bg-gradient-to-br from-red-400 to-orange-400 rounded-full blur-2xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-0 right-10 w-32 h-32 bg-gradient-to-br from-rose-400 to-pink-400 rounded-full blur-2xl"
        />
      </div>

      {/* Animated shine effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
        animate={{
          x: ["-100%", "200%"],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Decorative top border with animation */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/40 to-transparent"
        animate={{
          opacity: [0.4, 1, 0.4],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Decorative bottom border with animation */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/40 to-transparent"
        animate={{
          opacity: [0.4, 1, 0.4],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      <div className="relative flex items-center">
        {/* News Icon Badge with animation */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            duration: 0.5,
            type: "spring",
          }}
          className="absolute left-4 z-10 flex items-center gap-2 bg-white/95 backdrop-blur-sm px-2 py-1.5 md:px-4 md:py-2 rounded-full shadow-md"
        >
          <motion.div
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <Icon
              icon="lucide:newspaper"
              className="w-4 h-4 md:w-5 md:h-5 text-red-600"
            />
          </motion.div>
          <motion.span
            animate={{
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="text-sm font-bold text-red-600 hidden sm:inline"
          >
            Latest Updates
          </motion.span>
        </motion.div>

        {/* Scrolling content with padding for the badge */}
        <div className="pl-14 md:pl-48">
          <motion.div
            className="flex gap-8 whitespace-nowrap"
            animate={{
              x: [0, -100 * items.length],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: calculatedSpeed,
                ease: "linear",
              },
            }}
          >
            {duplicatedItems.map((item, index) => (
              <motion.div
                key={`${item.id}-${index}`}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <Link
                  href={item.link}
                  className="inline-flex items-center gap-3 px-4 py-1 rounded-lg hover:bg-white/20 transition-all duration-200 font-semibold text-white group text-sm md:text-base"
                >
                  <motion.div
                    animate={{
                      rotate: [0, 360],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <Icon
                      icon="lucide:sparkles"
                      className="w-4 h-4 text-yellow-300 group-hover:scale-125 transition-transform"
                    />
                  </motion.div>
                  <span className="group-hover:underline">{item.text}</span>
                  <motion.span
                    animate={{
                      opacity: [0.4, 1, 0.4],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="text-white/60"
                  >
                    •
                  </motion.span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
