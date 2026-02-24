"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Icon } from "@iconify/react";
import {
  FooterBackgroundGradient,
  TextHoverEffect,
} from "@/components/ui/hover-footer";

interface AdminProfile {
  emails?: string[];
  phones?: string[];
  address?: string;
  socialLinks?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
    youtube?: string;
  };
}

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [adminProfile, setAdminProfile] = React.useState<AdminProfile>({});
  const [mounted, setMounted] = React.useState(false);

  const footerSections = [
    {
      title: "Company",
      links: [
        { name: "Home", path: "/" },
        { name: "About Us", path: "/about" },
        { name: "Careers", path: "/careers" },
        { name: "Blog", path: "/blog" },
        { name: "Media", path: "/media" },
        { name: "Partner with Us", path: "/partner-with-us" },
        { name: "Contact", path: "/contact" },
        { name: "Register", path: "/career-test" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", path: "/privacy-policy" },
        { name: "Terms & Conditions", path: "/terms-and-conditions" },
        { name: "Refund Policy", path: "/refund-policy" },
      ],
    },
  ];

  const fetchAdminProfile = async () => {
    try {
      const response = await fetch("/api/admin/profile/public");
      if (response.ok) {
        const data = await response.json();
        setAdminProfile(data);
      }
    } catch (error) {
      console.error("Error fetching admin profile for footer:", error);
    }
  };

  const socialLinks = React.useMemo(
    () => [
      {
        name: "Facebook",
        icon: "lucide:facebook",
        url: adminProfile.socialLinks?.facebook || "#",
        enabled: !!adminProfile.socialLinks?.facebook,
      },
      {
        name: "Twitter",
        icon: "lucide:twitter",
        url: adminProfile.socialLinks?.twitter || "#",
        enabled: !!adminProfile.socialLinks?.twitter,
      },
      {
        name: "Instagram",
        icon: "lucide:instagram",
        url: adminProfile.socialLinks?.instagram || "#",
        enabled: !!adminProfile.socialLinks?.instagram,
      },
      {
        name: "LinkedIn",
        icon: "lucide:linkedin",
        url: adminProfile.socialLinks?.linkedin || "#",
        enabled: !!adminProfile.socialLinks?.linkedin,
      },
      {
        name: "YouTube",
        icon: "lucide:youtube",
        url: adminProfile.socialLinks?.youtube || "#",
        enabled: !!adminProfile.socialLinks?.youtube,
      },
    ],
    [adminProfile.socialLinks]
  );

  React.useEffect(() => {
    setMounted(true);
    fetchAdminProfile();
  }, []);

  if (!mounted) {
    return (
      <footer className="bg-white relative h-fit overflow-hidden w-full">
        <div className="max-w-7xl mx-auto px-8 py-14 z-40 relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8 lg:gap-16 pb-12">
            {/* Brand section with Logo */}
            <div className="flex flex-col space-y-4">
              <Link href="/" className="inline-block">
                <Image
                  src="/images/career-hq-logo.png"
                  alt="Career HQ Logo"
                  width={200}
                  height={67}
                  className="h-16 w-auto object-contain"
                />
              </Link>
              <p className="text-sm leading-relaxed text-gray-700">
                Empowering students and professionals to achieve their
                international education and career goals through expert guidance
                and comprehensive resources.
              </p>
            </div>

            {/* Footer link sections */}
            {footerSections.map((section) => (
              <div key={section.title}>
                <h4 className="text-gray-900 text-lg font-semibold mb-6">
                  {section.title}
                </h4>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.name} className="relative">
                      <Link
                        href={link.path}
                        className="text-gray-700 hover:text-[#3ca2fa] transition-colors"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Contact section placeholder */}
            <div>
              <h4 className="text-gray-900 text-lg font-semibold mb-6">
                Contact Us
              </h4>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center text-sm space-y-4 md:space-y-0">
            <div className="flex space-x-6 text-gray-700 z-50 relative" />
            <p className="text-center md:text-left text-gray-700 z-50 relative">
              © {currentYear} Career HQ. Powered by{" "}
              <Link
                href="https://mntfuture.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-[#3ca2fa] hover:text-[#5cb4ff] transition-colors"
              >
                MnT
              </Link>
              . All rights reserved.
            </p>
          </div>

          <hr className="border-t border-gray-700 my-8" />
        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-white relative h-fit overflow-hidden w-full">
      <div className="max-w-7xl mx-auto px-8 py-14 z-50 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8 lg:gap-16 pb-12">
          {/* Brand section with Logo */}
          <div className="flex flex-col space-y-4">
            <Link href="/" className="inline-block">
              <Image
                src="/images/career-hq-logo.png"
                alt="Career HQ Logo"
                width={200}
                height={67}
                className="h-16 w-auto object-contain"
              />
            </Link>
            <p className="text-sm leading-relaxed text-gray-700">
              Empowering students and professionals to achieve their
              international education and career goals through expert guidance
              and comprehensive resources.
            </p>
          </div>

          {/* Footer link sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="text-gray-900 text-lg font-semibold mb-6">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name} className="relative">
                    <Link
                      href={link.path}
                      className="text-gray-700 hover:text-[#3ca2fa] transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact section */}
          <div>
            <h4 className="text-gray-900 text-lg font-semibold mb-6">
              Contact Us
            </h4>
            <ul className="space-y-4">
              {adminProfile.emails && adminProfile.emails.length > 0 && (
                <li className="flex items-start space-x-3">
                  <Icon
                    icon="lucide:mail"
                    className="w-5 h-5 text-[#3ca2fa] flex-shrink-0 mt-0.5"
                  />
                  <div className="flex flex-col gap-1">
                    {adminProfile.emails.map((email, index) => (
                      <a
                        key={index}
                        href={`mailto:${email}`}
                        className="text-gray-700 hover:text-[#3ca2fa] transition-colors text-sm break-all"
                      >
                        {email}
                      </a>
                    ))}
                  </div>
                </li>
              )}

              {adminProfile.phones && adminProfile.phones.length > 0 && (
                <li className="flex items-start space-x-3">
                  <Icon
                    icon="lucide:phone"
                    className="w-5 h-5 text-[#3ca2fa] flex-shrink-0 mt-0.5"
                  />
                  <div className="flex flex-col gap-1">
                    {adminProfile.phones.map((phone, index) => (
                      <a
                        key={index}
                        href={`tel:${phone}`}
                        className="text-gray-700 hover:text-[#3ca2fa] transition-colors text-sm"
                      >
                        {phone}
                      </a>
                    ))}
                  </div>
                </li>
              )}

              {adminProfile.address && (
                <li className="flex items-start space-x-3">
                  <Icon
                    icon="lucide:map-pin"
                    className="w-5 h-5 text-[#3ca2fa] flex-shrink-0 mt-0.5"
                  />
                  <span className="text-gray-700 text-sm">
                    {adminProfile.address}
                  </span>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center text-sm space-y-4 md:space-y-0">
          {/* Social icons */}
          <div className="flex space-x-6 text-gray-700 z-50 relative">
            {socialLinks
              .filter((social) => social.enabled)
              .map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="hover:text-[#3ca2fa] transition-colors"
                >
                  <Icon icon={social.icon} width={20} height={20} />
                </a>
              ))}
          </div>

          {/* Copyright */}
          <p className="text-center md:text-left text-gray-700 z-50 relative">
            © {currentYear} Career HQ. Powered by{" "}
            <Link
              href="https://mntfuture.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-[#3ca2fa] hover:text-[#5cb4ff] transition-colors"
            >
              MnT
            </Link>
            . All rights reserved.
          </p>
        </div>

        <hr className="border-t border-gray-700 my-8" />

        {/* Footer bottom */}
      </div>

      {/* Text hover effect - Full width */}
      {/* <div className="lg:flex hidden h-[35rem] -mt-64 -mb-44 w-full pointer-events-none">
        <TextHoverEffect text="CAREER HQ" className="w-full" />
      </div> */}

      <FooterBackgroundGradient />
    </footer>
  );
};
