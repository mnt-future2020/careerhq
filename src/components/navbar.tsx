"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { Icon } from "@iconify/react";
import { Button } from "@heroui/button";
import { useUserRegistration } from "@/hooks/useUserRegistration";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";
import { Avatar } from "@heroui/avatar";
import { LogoutModal } from "@/components/logout-modal";

export const MainNavbar: React.FC = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [showLogoutModal, setShowLogoutModal] = React.useState(false);
  const { isRegistered, userData, clearRegistration } = useUserRegistration();
  const [isAdmin, setIsAdmin] = React.useState(false);
  const [adminData, setAdminData] = React.useState<{
    email: string;
    name?: string;
  } | null>(null);

  const navLinks = [
    { name: "Home", link: "/" },
    { name: "About", link: "/about" },
    { name: "Careers", link: "/careers" },
    { name: "Contact", link: "/contact" },
    { name: "Blog", link: "/blog" },
  ];

  const verticals = [
    {
      name: "Study Abroad",
      link: "/study-abroad",
      icon: "lucide:plane-takeoff",
    },
    {
      name: "Study India",
      link: "/study-india",
      icon: "lucide:graduation-cap",
    },
    {
      name: "Placement India",
      link: "/placement-india",
      icon: "lucide:briefcase",
    },
    {
      name: "Placement Abroad",
      link: "/placement-abroad",
      icon: "lucide:plane",
    },
    // {
    //   name: "Internship India",
    //   link: "/internship-india",
    //   icon: "lucide:users",
    // },
    // {
    //   name: "Internship Abroad",
    //   link: "/internship-abroad",
    //   icon: "lucide:globe",
    // },
    { name: "MBBS India", link: "/mbbs-india", icon: "lucide:stethoscope" },
    { name: "MBBS Abroad", link: "/mbbs-abroad", icon: "lucide:heart-pulse" },
    // { name: "LMS", link: "/lms", icon: "lucide:book-open" },
    // {
    //   name: "Uni Projects",
    //   link: "/university-projects",
    //   icon: "lucide:flask-conical",
    // },
    // {
    //   name: "School Projects",
    //   link: "/school-projects",
    //   icon: "lucide:book-open",
    // },
    { name: "Loan Hub", link: "/loans", icon: "lucide:wallet" },
    { name: "Scholarship", link: "/scholarship", icon: "lucide:handshake" },
  ];

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Check admin session
  React.useEffect(() => {
    const checkAdminSession = async () => {
      try {
        const response = await fetch("/api/admin/auth/session", {
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          if (data.authenticated) {
            setIsAdmin(true);
            setAdminData(data.admin);
          }
        }
        // 401 is expected when not logged in as admin - don't log as error
      } catch (error) {
        // Only log actual network errors, not 401s
        if (error instanceof TypeError) {
          console.error("Network error checking admin session:", error);
        }
      }
    };

    checkAdminSession();
  }, []);

  const handleAdminLogout = async () => {
    try {
      await fetch("/api/admin/auth/logout", { method: "POST" });
      setIsAdmin(false);
      setAdminData(null);
      window.location.href = "/admin/login";
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="fixed inset-x-0 top-0 z-50 w-full">
      {/* Desktop Navigation */}
      <motion.nav
        className={cn(
          "hidden lg:block transition-all duration-300 bg-white",
          isScrolled && "shadow-md"
        )}
      >
        <div className="w-full px-6">
          <div className="max-w-[1600px] mx-auto">
            <div className="grid grid-cols-[auto_1fr] items-center gap-8 py-4">
              <Link href="/" className="flex items-center">
                <Image
                  src="/images/career-hq-logo.png"
                  alt="Career HQ Logo"
                  width={180}
                  height={60}
                  className="h-14 w-auto object-contain"
                  priority
                />
              </Link>

              <div className="flex items-center justify-end gap-6">
                {navLinks.map((link) => {
                  const isActive =
                    link.link === "/"
                      ? pathname === "/"
                      : pathname.startsWith(link.link);
                  return (
                    <Link
                      key={link.link}
                      href={link.link}
                      className={cn(
                        "text-base font-semibold transition-colors whitespace-nowrap",
                        isActive
                          ? "text-blue-600"
                          : "text-gray-700 hover:text-blue-600"
                      )}
                    >
                      {link.name}
                    </Link>
                  );
                })}
                {isAdmin && adminData ? (
                  <Dropdown placement="bottom-end">
                    <DropdownTrigger>
                      <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
                        <Avatar
                          name={adminData.name || "Admin"}
                          size="sm"
                          className="bg-danger text-white"
                          icon={
                            <Icon
                              icon="lucide:shield-check"
                              className="text-lg"
                            />
                          }
                        />
                        <div className="hidden md:block text-left">
                          <p className="text-sm font-semibold flex items-center gap-1">
                            {adminData.name || "Admin"}
                            <Icon
                              icon="lucide:shield-check"
                              className="text-xs text-danger"
                            />
                          </p>
                          <p className="text-xs text-gray-500">
                            {adminData.email}
                          </p>
                        </div>
                      </div>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Admin menu">
                      <DropdownItem
                        key="profile"
                        className="h-14 gap-2"
                        textValue="Admin Profile"
                      >
                        <p className="font-semibold flex items-center gap-1">
                          {adminData.name || "Admin"}
                          <Icon
                            icon="lucide:shield-check"
                            className="text-sm text-danger"
                          />
                        </p>
                        <p className="text-xs text-gray-500">
                          {adminData.email}
                        </p>
                      </DropdownItem>
                      <DropdownItem
                        key="admin-panel"
                        startContent={
                          <Icon
                            icon="lucide:layout-dashboard"
                            className="text-lg"
                          />
                        }
                        as={Link}
                        href="/admin"
                      >
                        Admin Panel
                      </DropdownItem>
                      <DropdownItem
                        key="logout"
                        color="danger"
                        startContent={
                          <Icon icon="lucide:log-out" className="text-lg" />
                        }
                        onPress={handleAdminLogout}
                      >
                        Logout
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                ) : isRegistered && userData ? (
                  <Dropdown placement="bottom-end">
                    <DropdownTrigger>
                      <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
                        <Avatar
                          name={userData.name}
                          size="sm"
                          className="bg-primary text-white"
                        />
                        <div className="hidden md:block text-left">
                          <p className="text-sm font-semibold">
                            {userData.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {userData.email}
                          </p>
                        </div>
                      </div>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="User menu">
                      <DropdownItem
                        key="profile"
                        className="h-14 gap-2"
                        textValue="User Profile"
                      >
                        <p className="font-semibold">{userData.name}</p>
                        <p className="text-xs text-gray-500">
                          {userData.email}
                        </p>
                      </DropdownItem>
                      <DropdownItem
                        key="logout"
                        color="danger"
                        startContent={
                          <Icon icon="lucide:log-out" className="text-lg" />
                        }
                        onPress={() => setShowLogoutModal(true)}
                      >
                        Logout
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                ) : (
                  <Button
                    as={Link}
                    href="/career-test"
                    color="primary"
                    size="lg"
                    className="font-semibold whitespace-nowrap"
                  >
                    Register
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Verticals Bar */}
          <div className="border-t border-gray-200 overflow-hidden">
            <div className="max-w-[1600px] mx-auto">
              <div className="flex items-center justify-center gap-3 py-2 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent hover:scrollbar-thumb-gray-400">
                {verticals.map((vertical) => {
                  const isActive = pathname.startsWith(vertical.link);
                  return (
                    <Link
                      key={vertical.link}
                      href={vertical.link}
                      className={cn(
                        "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap flex-shrink-0",
                        isActive
                          ? "bg-blue-600 text-white shadow-md"
                          : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                      )}
                    >
                      <Icon
                        icon={vertical.icon}
                        className="w-4 h-4 flex-shrink-0"
                      />
                      <span>{vertical.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Navigation */}
      <motion.nav
        className={cn(
          "lg:hidden transition-all duration-300",
          isScrolled ? "bg-white/95 backdrop-blur-md shadow-md" : "bg-white"
        )}
      >
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/images/career-hq-logo.png"
                alt="Career HQ Logo"
                width={150}
                height={50}
                className="h-12 w-auto object-contain"
                priority
              />
            </Link>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Slide-in Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            />

            {/* Slide-in Menu */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-white shadow-2xl z-50 lg:hidden overflow-y-auto"
            >
              {/* Menu Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <Image
                  src="/images/career-hq-logo.png"
                  alt="Career HQ Logo"
                  width={150}
                  height={50}
                  className="h-12 w-auto object-contain"
                />
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6 text-gray-700" />
                </button>
              </div>

              {/* Menu Content */}
              <div className="p-4">
                {/* Navigation Links */}
                <div className="mb-6">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                    Navigation
                  </h3>
                  <div className="flex flex-col gap-1">
                    {navLinks.map((link) => {
                      const isActive =
                        link.link === "/"
                          ? pathname === "/"
                          : pathname.startsWith(link.link);
                      return (
                        <Link
                          key={link.link}
                          href={link.link}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={cn(
                            "px-4 py-3 rounded-lg text-sm font-medium transition-all",
                            isActive
                              ? "bg-blue-600 text-white shadow-md"
                              : "text-gray-700 hover:bg-gray-100 active:bg-gray-200"
                          )}
                        >
                          {link.name}
                        </Link>
                      );
                    })}
                  </div>
                </div>

                {/* Verticals */}
                <div className="mb-6">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                    Opportunities
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {verticals.map((vertical) => {
                      const isActive = pathname.startsWith(vertical.link);
                      return (
                        <Link
                          key={vertical.link}
                          href={vertical.link}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={cn(
                            "flex flex-col items-center justify-center gap-2 p-3 rounded-lg transition-all min-h-[85px]",
                            isActive
                              ? "bg-blue-600 text-white shadow-md"
                              : "bg-gray-50 text-gray-700 hover:bg-gray-100 active:bg-gray-200"
                          )}
                        >
                          <Icon
                            icon={vertical.icon}
                            className="w-6 h-6 flex-shrink-0"
                          />
                          <span className="text-[10px] font-medium text-center leading-tight">
                            {vertical.name}
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </div>

                {/* CTA Button / User Info */}
                {isAdmin && adminData ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-4 bg-danger/10 rounded-lg border border-danger/20">
                      <Avatar
                        name={adminData.name || "Admin"}
                        size="md"
                        className="bg-danger text-white"
                        icon={
                          <Icon
                            icon="lucide:shield-check"
                            className="text-xl"
                          />
                        }
                      />
                      <div className="flex-1">
                        <p className="font-semibold text-sm flex items-center gap-1">
                          {adminData.name || "Admin"}
                          <Icon
                            icon="lucide:shield-check"
                            className="text-xs text-danger"
                          />
                        </p>
                        <p className="text-xs text-gray-500">
                          {adminData.email}
                        </p>
                      </div>
                    </div>
                    <Button
                      as={Link}
                      href="/admin"
                      color="primary"
                      variant="flat"
                      className="w-full"
                      startContent={
                        <Icon
                          icon="lucide:layout-dashboard"
                          className="text-lg"
                        />
                      }
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Admin Panel
                    </Button>
                    <Button
                      color="danger"
                      variant="flat"
                      className="w-full"
                      startContent={
                        <Icon icon="lucide:log-out" className="text-lg" />
                      }
                      onPress={() => {
                        handleAdminLogout();
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      Logout
                    </Button>
                  </div>
                ) : isRegistered && userData ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-4 bg-primary/10 rounded-lg">
                      <Avatar
                        name={userData.name}
                        size="md"
                        className="bg-primary text-white"
                      />
                      <div className="flex-1">
                        <p className="font-semibold text-sm">{userData.name}</p>
                        <p className="text-xs text-gray-500">
                          {userData.email}
                        </p>
                      </div>
                    </div>
                    <Button
                      color="danger"
                      variant="flat"
                      className="w-full"
                      startContent={
                        <Icon icon="lucide:log-out" className="text-lg" />
                      }
                      onPress={() => {
                        setShowLogoutModal(true);
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      Logout
                    </Button>
                  </div>
                ) : (
                  <Button
                    as={Link}
                    href="/career-test"
                    color="primary"
                    className="w-full font-medium"
                    size="lg"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Register
                  </Button>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Logout Confirmation Modal */}
      <LogoutModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={() => {
          clearRegistration();
          window.location.reload();
        }}
        userName={userData?.name}
      />
    </div>
  );
};
