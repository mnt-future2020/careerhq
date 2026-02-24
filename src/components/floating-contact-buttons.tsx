"use client";

import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";

export function FloatingContactButtons() {
  const [isExpanded, setIsExpanded] = useState(false);

  const whatsappNumber = "918608225646"; // Actual WhatsApp number
  const phoneNumber = "+919342476925"; // Actual call number

  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/${whatsappNumber}`, "_blank");
  };

  const handleCallClick = () => {
    window.location.href = `tel:${phoneNumber}`;
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {isExpanded && (
          <>
            <motion.button
              initial={{ opacity: 0, scale: 0, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0, y: 20 }}
              transition={{ duration: 0.2 }}
              onClick={handleCallClick}
              className="flex items-center gap-3 bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-full shadow-lg transition-all group"
              aria-label="Call us"
            >
              <span className="text-sm font-medium hidden group-hover:inline">
                Call Us
              </span>
              <div className="w-12 h-12 flex items-center justify-center bg-white/20 rounded-full">
                <Icon icon="lucide:phone" className="text-2xl" />
              </div>
            </motion.button>

            <motion.button
              initial={{ opacity: 0, scale: 0, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0, y: 20 }}
              transition={{ duration: 0.2, delay: 0.05 }}
              onClick={handleWhatsAppClick}
              className="flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-full shadow-lg transition-all group"
              aria-label="WhatsApp us"
            >
              <span className="text-sm font-medium hidden group-hover:inline">
                WhatsApp
              </span>
              <div className="w-12 h-12 flex items-center justify-center bg-white/20 rounded-full">
                <Icon icon="lucide:message-circle" className="text-2xl" />
              </div>
            </motion.button>
          </>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-14 h-14 bg-primary hover:bg-primary/90 text-white rounded-full shadow-lg flex items-center justify-center transition-all"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Contact options"
      >
        <motion.div
          animate={{ rotate: isExpanded ? 45 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <Icon
            icon={isExpanded ? "lucide:x" : "lucide:message-square"}
            className="text-2xl"
          />
        </motion.div>
      </motion.button>
    </div>
  );
}
