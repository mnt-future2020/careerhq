"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export function FloatingContact() {
  const [isExpanded, setIsExpanded] = useState(false);

  // Contact details
  const phoneNumber = "91";
  const emailAddress = "info@career-hq.com";
  const whatsappLink = `https://wa.me/${phoneNumber}`;
  const callLink = `tel:+${phoneNumber}`;
  const emailLink = `mailto:${emailAddress}`;

  const contactOptions = [
    {
      id: "email",
      icon: "ic:baseline-email",
      color: "bg-purple-500 hover:bg-purple-600",
      link: emailLink,
      label: "Email us",
      delay: 0.1,
    },
    {
      id: "call",
      icon: "ic:baseline-phone",
      color: "bg-blue-500 hover:bg-blue-600",
      link: callLink,
      label: "Call us",
      delay: 0.2,
    },
    {
      id: "whatsapp",
      icon: "logos:whatsapp-icon",
      color: "bg-green-500 hover:bg-green-600",
      link: whatsappLink,
      label: "WhatsApp",
      delay: 0.3,
      external: true,
    },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-3">
      {/* Contact Options */}
      <AnimatePresence>
        {isExpanded && (
          <div className="flex flex-col gap-3">
            {contactOptions.map((option) => (
              <motion.div
                key={option.id}
                initial={{ opacity: 0, scale: 0, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0, y: 20 }}
                transition={{ duration: 0.2, delay: option.delay }}
                className="relative"
              >
                {/* Wave Animation Rings */}
                <div className="relative w-14 h-14">
                  <div className={`absolute inset-0 rounded-full ${option.color.split(' ')[0]}/20 animate-ping`} />
                  <div className={`absolute inset-0 scale-125 rounded-full ${option.color.split(' ')[0]}/10 animate-pulse`} />
                  
                  {/* Contact Button */}
                  <Link
                    href={option.link}
                    target={option.external ? "_blank" : undefined}
                    rel={option.external ? "noopener noreferrer" : undefined}
                    className={`absolute inset-0 flex items-center justify-center ${option.color} rounded-full shadow-lg transition-colors group`}
                  >
                    <Icon 
                      icon={option.icon} 
                      className={`w-7 h-7 ${option.id === 'whatsapp' ? '' : 'text-white'} transform group-hover:scale-110 transition-transform`} 
                    />
                    
                    {/* Tooltip */}
                    <span className="absolute right-full mr-3 px-2 py-1 bg-black/75 text-white text-sm rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                      {option.label}
                    </span>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Main Toggle Button */}
      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        className="relative w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-full shadow-lg flex items-center justify-center transition-all group"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Contact options"
      >
        {/* Wave Animation Rings for main button */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-500/20 to-emerald-500/20 animate-ping" />
        <div className="absolute inset-0 scale-125 rounded-full bg-gradient-to-r from-green-500/10 to-emerald-500/10 animate-pulse" />
        
        <motion.div
          animate={{ rotate: isExpanded ? 0 : 0 }}
          transition={{ duration: 0.2 }}
          className="relative z-10"
        >
          <Icon
            icon={isExpanded ? "ic:baseline-close" : "ic:baseline-contact-support"}
            className="w-8 h-8"
          />
        </motion.div>

        {/* Tooltip for main button */}
        <span className="absolute right-full mr-3 px-2 py-1 bg-black/75 text-white text-sm rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
          {isExpanded ? "Close" : "Contact us"}
        </span>
      </motion.button>
    </div>
  );
}