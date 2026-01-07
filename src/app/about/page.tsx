"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { motion } from "framer-motion";

import { TestimonialCard } from "@/components/testimonial-card";
import { EnquiryForm } from "@/components/enquiry-form";
import Mentors from "@/components/mentors";
import { ChromaGrid } from "@/components/ui/chroma-grid";
import { AppleCardsCarousel } from "@/components/ui/apple-cards-carousel";

export default function AboutPage() {
  const [currentPage, setCurrentPage] = useState(0);
  const values = [
    {
      title: "Empowerment",
      description:
        "We uplift individuals to take control of their career journeys with clarity, confidence, and independence.",
      icon: "lucide:zap",
    },
    {
      title: "Integrity",
      description:
        "We operate with honesty, transparency, and trust, ensuring ethical practices in every interaction.",
      icon: "lucide:shield",
    },
    {
      title: "Growth Mindset",
      description:
        "We believe that learning never stops and encourage continuous personal and professional evolution.",
      icon: "lucide:trending-up",
    },
    {
      title: "Inclusivity",
      description:
        "We create an environment where every individual is respected, valued, and given equal opportunity—without barriers.",
      icon: "lucide:users",
    },
    {
      title: "Innovation",
      description:
        "We embrace new ideas, forward-thinking strategies, and transformative tools that drive meaningful career advancement.",
      icon: "lucide:lightbulb",
    },
    {
      title: "Impact",
      description:
        "We define success by the positive and lasting difference we create in people's lives and career paths.",
      icon: "lucide:target",
    },
  ];
  const testimonials = [
    {
      name: "Priya Sharma",
      role: "MBA Student, Harvard Business School",
      content:
        "Career HQ made my dream of studying at Harvard a reality. Their counselors provided personalized guidance throughout the application process, helping me secure a scholarship as well.",
      avatarId: "👩",
      rating: 5,
    },
    {
      name: "James Wilson",
      role: "Engineering Student, University of Toronto",
      content:
        "I was overwhelmed by the options until I found Career HQ. They simplified the process and helped me find the perfect engineering program that matched my career goals.",
      avatarId: "👨",
      rating: 5,
    },
    {
      name: "Mei Lin",
      role: "Computer Science Student, University of Melbourne",
      content:
        "The visa application process seemed daunting, but Career HQ&apos;s step-by-step guidance made it straightforward. I&apos;m now thriving in my program in Australia!",
      avatarId: "👩‍💻",
      rating: 4,
    },
    {
      name: "Sample Student",
      role: "CSE, SSN College of Engineering",
      content:
        "SSN's placement cell connected me with top recruiters; I landed a software role at a unicorn and my coding skills grew fast.",
      avatarId: "🧑‍💻",
      rating: 5,
    },
    {
      name: "Sample Student",
      role: "Civil Engineering, SRM Institute of Science & Technology",
      content:
        "SRM's placement coaching and mock interviews were game-changers — I cleared multiple rounds and joined a large MNC.",
      avatarId: "👨‍🔧",
      rating: 5,
    },
    {
      name: "Sample Student",
      role: "Health Sciences, Flinders University",
      content:
        "Flinders' internship pathways and hands-on training directly helped me secure a role in the healthcare sector.",
      avatarId: "👩‍⚕️",
      rating: 5,
    },
    {
      name: "Sample Student",
      role: "Mechanical Engineering, The University of Newcastle (Australia)",
      content:
        "Newcastle's research-driven learning gave me the technical depth to join an international engineering firm.",
      avatarId: "👨‍🔬",
      rating: 5,
    },
    {
      name: "Sample Student",
      role: "IT, EDU International (Adelaide)",
      content:
        "Practical training sessions and faculty mentorship helped me build strong skills and secure my placement.",
      avatarId: "🧑‍💼",
      rating: 5,
    },
    {
      name: "Sample Student",
      role: "Entrepreneurship, Jönköping University (Sweden)",
      content:
        "The startup-driven ecosystem at Jönköping helped me co-found a student-led venture during my course.",
      avatarId: "👨‍💼",
      rating: 5,
    },
  ];

  return (
    <>
      {/* Our Story Section */}
      <section className="pt-32 lg:pt-40 pb-10 bg-white">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About <span className="text-gradient-primary">Career HQ</span>
            </h1>
            <p className="text-xl text-foreground-600 mb-8">
              Welcome to Career Head Quarters — your trusted partner in
              education, placement, and global opportunities.
            </p>
          </div>
        </div>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-foreground-600 mb-4">
                Career HQ started with one goal—to help students dream bigger and
                go further. What began as a small counseling center has evolved
                into a global education and career platform, enabling access to
                world-class academic and professional opportunities.
              </p>
              <p className="text-foreground-600 mb-4">
                We have helped thousands of students pursue international
                education, explore global careers, and build futures without
                borders. Career HQ connects ambitious individuals with leading
                universities and meaningful career pathways worldwide.
              </p>
              <p className="text-foreground-600 mb-6">
                Career HQ is led by Gandhi and Benita, whose vision is rooted in
                real-world experience. Having navigated international education
                and global career transitions themselves, they recognized the
                need for reliable, transparent, and personalized guidance. Their
                leadership has shaped Career HQ into an organization built on
                trust, integrity, and long-term success—focused on empowering
                students and professionals to make confident, informed
                decisions.
              </p>
              <p className="text-foreground-600 mb-4">
                At Career HQ, we don’t just support admission / placement—we
                partner in building futures. Because talent has no boundaries,
                and neither should opportunities.
              </p>

              <div className="flex flex-wrap gap-4">
                <Button
                  color="primary"
                  endContent={<Icon icon="lucide:arrow-right" />}
                  as={Link}
                  href="/contact"
                >
                  Contact Us
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="relative z-10 rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="/images/about.jpeg"
                  alt="Career HQ Office"
                  width={400}
                  height={200}
                  className="w-full h-[420px] object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-secondary-100 rounded-full z-0"></div>
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-primary-100 rounded-full z-0"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Founder/Mentor Section */}
      <Mentors />

      {/* What We Do Section */}
      {false && (
        <section className="py-16 bg-default-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">What We Do</h2>
            <p className="text-foreground-500 max-w-2xl mx-auto">
              Comprehensive services to guide your education and career journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <Card className="border border-default-200 hover:shadow-xl transition-shadow">
              <CardBody className="p-8">
                <div className="w-14 h-14 rounded-full bg-primary-100 flex items-center justify-center mb-4">
                  <Icon icon="lucide:plane" className="text-primary text-2xl" />
                </div>
                <h3 className="text-2xl font-semibold mb-3">
                  Study Abroad Services
                </h3>
                <p className="text-foreground-600">
                  From course selection to visa assistance, we provide
                  end-to-end support that makes global education accessible,
                  smooth, and stress-free.
                </p>
              </CardBody>
            </Card>

            <Card className="border border-default-200 hover:shadow-xl transition-shadow">
              <CardBody className="p-8">
                <div className="w-14 h-14 rounded-full bg-secondary-100 flex items-center justify-center mb-4">
                  <Icon
                    icon="lucide:graduation-cap"
                    className="text-secondary text-2xl"
                  />
                </div>
                <h3 className="text-2xl font-semibold mb-3">
                  Admissions in Indian Universities
                </h3>
                <p className="text-foreground-600">
                  We help students secure seats in reputable Indian universities
                  through personalized counseling, documentation guidance, and
                  transparent processes.
                </p>
              </CardBody>
            </Card>

            <Card className="border border-default-200 hover:shadow-xl transition-shadow">
              <CardBody className="p-8">
                <div className="w-14 h-14 rounded-full bg-success-100 flex items-center justify-center mb-4">
                  <Icon
                    icon="lucide:briefcase"
                    className="text-success text-2xl"
                  />
                </div>
                <h3 className="text-2xl font-semibold mb-3">
                  Placement India
                </h3>
                <p className="text-foreground-600">
                  Our strong industry partnerships open the door to diverse job
                  opportunities for freshers and experienced professionals
                  across India.
                </p>
              </CardBody>
            </Card>

            <Card className="border border-default-200 hover:shadow-xl transition-shadow">
              <CardBody className="p-8">
                <div className="w-14 h-14 rounded-full bg-warning-100 flex items-center justify-center mb-4">
                  <Icon
                    icon="lucide:globe-2"
                    className="text-warning text-2xl"
                  />
                </div>
                <h3 className="text-2xl font-semibold mb-3">
                  Placement Abroad
                </h3>
                <p className="text-foreground-600">
                  We connect candidates to global employers, helping them build
                  successful international careers with ethical, verified, and
                  high-quality opportunities.
                </p>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>
      )}

      {/* Why Choose Career HQ Section */}
      {false && (
        <ChromaGrid className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent"
            >
              Why Choose Career HQ?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-foreground-600 max-w-3xl mx-auto text-lg"
            >
              Your trusted partner in shaping successful careers worldwide
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
            {[
              {
                icon: "lucide:user-check",
                title: "Personalized Guidance",
                description:
                  "Tailored support for every student and job-seeker to help you achieve your unique goals.",
                gradient: "from-blue-500 to-cyan-500",
                color: "text-blue-500",
              },
              {
                icon: "lucide:network",
                title: "Trusted Network",
                description:
                  "A reliable network of universities and employers across the globe.",
                gradient: "from-purple-500 to-pink-500",
                color: "text-purple-500",
              },
              {
                icon: "lucide:eye",
                title: "Transparent Processes",
                description:
                  "No hidden steps or false promises—just honest, clear guidance every step of the way.",
                gradient: "from-green-500 to-emerald-500",
                color: "text-green-500",
              },
              {
                icon: "lucide:award",
                title: "Expert Team",
                description:
                  "Years of industry experience backing every piece of advice and support we provide.",
                gradient: "from-orange-500 to-red-500",
                color: "text-orange-500",
              },
              {
                icon: "lucide:heart",
                title: "Student-First Values",
                description:
                  "Our commitment to putting students and careers first in everything we do.",
                gradient: "from-red-500 to-pink-500",
                color: "text-red-500",
              },
              {
                icon: "lucide:globe-2",
                title: "Global Reach",
                description:
                  "Connecting worldwide careers at one dot with opportunities across 12+ countries.",
                gradient: "from-indigo-500 to-blue-500",
                color: "text-indigo-500",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{
                  y: -12,
                  transition: { duration: 0.3, ease: "easeOut" },
                }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="group relative flex flex-col items-center text-center cursor-pointer p-6 rounded-3xl hover:bg-white/50 dark:hover:bg-gray-900/50 backdrop-blur-sm transition-all duration-300"
              >
                {/* Floating Icon with Glow Effect */}
                <motion.div
                  className="relative mb-6"
                  whileHover={{
                    scale: 1.15,
                    rotate: 360,
                    transition: { duration: 0.6, ease: "easeInOut" },
                  }}
                >
                  {/* Glow effect */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-full blur-2xl opacity-20 group-hover:opacity-60 transition-all duration-500 scale-150 group-hover:scale-[2]`}
                  />
                  {/* Icon container */}
                  <div
                    className={`relative w-20 h-20 rounded-full bg-gradient-to-br ${feature.gradient} flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-shadow duration-500`}
                  >
                    <Icon
                      icon={feature.icon}
                      className="w-10 h-10 text-white"
                    />
                  </div>

                  {/* Animated ring */}
                  <div
                    className={`absolute inset-0 rounded-full border-2 border-transparent group-hover:border-current ${feature.color} opacity-0 group-hover:opacity-100 group-hover:scale-125 transition-all duration-500`}
                  />
                </motion.div>

                {/* Content */}
                <motion.h3
                  className="text-2xl font-bold mb-4 transition-all duration-300 group-hover:scale-105"
                  whileHover={{ scale: 1.05 }}
                >
                  <span
                    className={`group-hover:bg-gradient-to-r group-hover:${feature.gradient} group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300`}
                  >
                    {feature.title}
                  </span>
                </motion.h3>
                <motion.p
                  className="text-gray-600 dark:text-gray-300 leading-relaxed max-w-sm group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors duration-300"
                  whileHover={{ scale: 1.02 }}
                >
                  {feature.description}
                </motion.p>

                {/* Decorative line */}
                <div className="mt-6 w-16 h-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent group-hover:w-32 group-hover:via-primary-500 transition-all duration-500" />

                {/* Background gradient on hover */}
                <div
                  className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 -z-10`}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </ChromaGrid>
      )}

      {/* Our Values Section */}
      {false && (
        <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent"
            >
              Our Core Values
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-foreground-600 max-w-3xl mx-auto text-lg"
            >
              The principles that guide our approach and define our culture
            </motion.p>
          </div>

          <AppleCardsCarousel cards={values} />
        </div>
      </section>
      )}

      {/* Global Exclusive Tie-up Section */}
      {/* <section className="py-8 sm:py-12 md:py-16 bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
       
        <svg
          className="absolute inset-0 w-full h-full opacity-10"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                className="text-primary-300"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        <div className="container mx-auto px-3 sm:px-4 md:px-6 relative z-10">
          <div className="text-center mb-6 sm:mb-8 md:mb-12">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3 px-2">
              Global Exclusive Tie-up With
            </h2>
            <p className="text-sm sm:text-base text-foreground-500 max-w-2xl mx-auto px-4">
              We have established exclusive partnerships with leading career
              providers across 24 countries worldwide
            </p>
          </div>

          <div className="relative max-w-7xl mx-auto">
           
            <svg
              className="hidden sm:block absolute inset-0 w-full h-full pointer-events-none"
              style={{ zIndex: 0 }}
            >
            
              {(() => {
                const positions = [
                  { x: "8%", y: "12%" },
                  { x: "25%", y: "12%" },
                  { x: "41%", y: "12%" },
                  { x: "58%", y: "12%" },
                  { x: "75%", y: "12%" },
                  { x: "92%", y: "12%" },
                  { x: "8%", y: "35%" },
                  { x: "25%", y: "35%" },
                  { x: "41%", y: "35%" },
                  { x: "58%", y: "35%" },
                  { x: "75%", y: "35%" },
                  { x: "92%", y: "35%" },
                  { x: "8%", y: "58%" },
                  { x: "25%", y: "58%" },
                  { x: "41%", y: "58%" },
                  { x: "58%", y: "58%" },
                  { x: "75%", y: "58%" },
                  { x: "92%", y: "58%" },
                  { x: "8%", y: "81%" },
                  { x: "25%", y: "81%" },
                  { x: "41%", y: "81%" },
                  { x: "58%", y: "81%" },
                  { x: "75%", y: "81%" },
                  { x: "92%", y: "81%" },
                ];

                const lines: Array<{
                  x1: string;
                  y1: string;
                  x2: string;
                  y2: string;
                }> = [];
        
                positions.forEach((pos1, i) => {
                  positions.forEach((pos2, j) => {
                    if (i < j) {
                      const distance = Math.sqrt(
                        Math.pow(parseFloat(pos1.x) - parseFloat(pos2.x), 2) +
                          Math.pow(parseFloat(pos1.y) - parseFloat(pos2.y), 2)
                      );
                    
                      if (distance < 50) {
                        lines.push({
                          x1: pos1.x,
                          y1: pos1.y,
                          x2: pos2.x,
                          y2: pos2.y,
                        });
                      }
                    }
                  });
                });

                return lines.map((line, i) => (
                  <motion.line
                    key={i}
                    x1={line.x1}
                    y1={line.y1}
                    x2={line.x2}
                    y2={line.y2}
                    stroke="url(#lineGradient)"
                    strokeWidth="1.5"
                    strokeDasharray="3 3"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 0.25 }}
                    transition={{ duration: 2, delay: i * 0.02 }}
                    viewport={{ once: true }}
                  />
                ));
              })()}

              {[...Array(8)].map((_, i) => (
                <motion.circle
                  key={`particle-${i}`}
                  r="2"
                  fill="#3b82f6"
                  initial={{ cx: "8%", cy: "12%" }}
                  animate={{
                    cx: ["8%", "92%", "92%", "8%", "8%"],
                    cy: ["12%", "12%", "81%", "81%", "12%"],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    delay: i * 1.25,
                    ease: "linear",
                  }}
                  opacity={0.6}
                />
              ))}

              <defs>
                <linearGradient
                  id="lineGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                  <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#ec4899" stopOpacity="0.3" />
                </linearGradient>
                <radialGradient id="glowGradient">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                </radialGradient>
              </defs>
            </svg>

            <div
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6 md:gap-8 relative"
              style={{ zIndex: 1 }}
            >
              {[
                { name: "Australia", code: "au" },
                { name: "New Zealand", code: "nz" },
                { name: "USA", code: "us" },
                { name: "Canada", code: "ca" },
                { name: "Poland", code: "pl" },
                { name: "Spain", code: "es" },
                { name: "Germany", code: "de" },
                { name: "France", code: "fr" },
                { name: "Denmark", code: "dk" },
                { name: "Austria", code: "at" },
                { name: "Netherlands", code: "nl" },
                { name: "Malta", code: "mt" },
                { name: "Lithuania", code: "lt" },
                { name: "Belgium", code: "be" },
                { name: "Finland", code: "fi" },
                { name: "Hungary", code: "hu" },
                { name: "Italy", code: "it" },
                { name: "Russia", code: "ru" },
                { name: "Singapore", code: "sg" },
                { name: "Georgia", code: "ge" },
                { name: "Sweden", code: "se" },
                { name: "United Kingdom", code: "gb" },
                { name: "Ireland", code: "ie" },
                { name: "India", code: "in" },
              ].map((country, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.02 }}
                  viewport={{ once: true }}
                  className="group flex flex-col items-center justify-center gap-2 sm:gap-3 cursor-pointer relative py-2"
                >
                 
                  <motion.div
                    className="hidden sm:block absolute w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full border-2 border-primary-300"
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.5, 0, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.1,
                    }}
                  />

                  <motion.div
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                    className="relative w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full overflow-hidden shadow-md sm:shadow-lg hover:shadow-xl sm:hover:shadow-2xl transition-shadow duration-300 ring-1 sm:ring-2 ring-white"
                  >
                    <Image
                      src={`https://flagcdn.com/w160/${country.code}.png`}
                      alt={`${country.name} flag`}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.div>
                  <h3 className="text-xs sm:text-sm font-medium text-gray-700 group-hover:text-primary transition-colors duration-300 text-center px-1 leading-tight">
                    {country.name}
                  </h3>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section> */}

      {/* Testimonials Section */}
      {/* <section className="py-16 bg-default-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">What Our Students Say</h2>
            <p className="text-foreground-500 max-w-2xl mx-auto">
              Hear from our students who have successfully achieved their career
              goals with our guidance.
            </p>
          </div>

         
          <div className="relative max-w-7xl mx-auto">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(-${currentPage * 100}%)`,
                }}
              >
                {Array.from({
                  length: Math.ceil(testimonials.length / 3),
                }).map((_, pageIndex) => (
                  <div
                    key={pageIndex}
                    className="min-w-full grid grid-cols-1 md:grid-cols-3 gap-6 px-2"
                  >
                    {testimonials
                      .slice(pageIndex * 3, pageIndex * 3 + 3)
                      .map((testimonial, index) => (
                        <div key={index}>
                          <TestimonialCard
                            name={testimonial.name}
                            role={testimonial.role}
                            content={testimonial.content}
                            avatarId={testimonial.avatarId}
                            rating={testimonial.rating}
                          />
                        </div>
                      ))}
                  </div>
                ))}
              </div>
            </div>

            
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: Math.ceil(testimonials.length / 3) }).map(
                (_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      currentPage === index
                        ? "bg-primary w-8"
                        : "bg-gray-300 hover:bg-gray-400"
                    }`}
                    aria-label={`Go to testimonial page ${index + 1}`}
                  />
                )
              )}
            </div>
          </div>
        </div>
      </section> */}

      <section className="py-16 bg-gradient-to-r from-primary-500 to-secondary-500 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">
               Get In Touch with DOT Agent
              </h2>
              <p className="text-white/90 mb-6">
                One destination, countless opportunities – where worldwide
                careers meet at one dot .
              </p>
              <div className="flex flex-wrap gap-4">
                <Button
                  as={Link}
                  href="/career-test"
                  color="default"
                  variant="solid"
                  size="lg"
                  startContent={<Icon icon="lucide:calendar" />}
                  className="font-medium bg-white text-primary"
                >
                  Register
                </Button>
                <Button
                  as={Link}
                  href="/study-abroad"
                  variant="bordered"
                  size="lg"
                  className="font-medium text-white border-white"
                >
                  Explore Programs
                </Button>
              </div>
            </div>
            <div className=" p-6 ">
              <EnquiryForm
                title="Get Expert Guidance"
                subtitle="Fill out this form and our experts will get back to you within 24 hours."
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
