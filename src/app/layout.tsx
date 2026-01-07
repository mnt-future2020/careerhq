import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

import { HeroUIProvider } from "@heroui/system";
import { ToastProvider } from "@heroui/toast";
import { ConditionalLayout } from "@/components/conditional-layout";
import { ChatWidget } from "@/components/chat-widget";
import { UserRegistrationProvider } from "@/contexts/UserRegistrationContext";
import { FloatingContactButtons } from "@/components/floating-contact-buttons";
import { FloatingContact } from "@/components/floating-contact";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default:
      "Explore Endless Opportunities with Career HQ - Your One-Stop Career Solution",
    template: "%s | Career HQ",
  },
  description:
    "Find the perfect university and course for your international education journey. Explore programs in Australia, Canada, UK, USA, Germany, Ireland, France, and New Zealand.",
  keywords: [
    "study abroad",
    "international education",
    "universities",
    "courses",
    "student visa",
    "education consultancy",
    "overseas education",
  ],
  authors: [{ name: "Career HQ" }],
  creator: "Career HQ",
  publisher: "Career HQ",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://career-hq.com"),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/images/favicon.png", type: "image/png" },
      { url: "/images/favicon.png", sizes: "32x32", type: "image/png" },
      { url: "/images/favicon.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/images/favicon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: [{ url: "/favicon.ico" }],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://career-hq.com",
    title:
      "Explore Endless Opportunities with Career HQ - Your One-Stop Career Solution",
    description:
      "Find the perfect university and course for your international education journey",
    siteName: "Career HQ",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Explore Endless Opportunities with Career HQ - Your One-Stop Career Solution",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Explore Endless Opportunities with Career HQ - Your One-Stop Career Solution",
    description:
      "Find the perfect university and course for your international education journey",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={plusJakartaSans.variable}>
      <body className="font-sans antialiased">
        <HeroUIProvider>
          <UserRegistrationProvider>
            <AdminLayoutWrapper>{children}</AdminLayoutWrapper>
            <FloatingContact />
            <ToastProvider
              placement="top-right"
              maxVisibleToasts={5}
              toastProps={{
                timeout: 5000,
                classNames: {
                  base: "rounded-lg",
                },
              }}
            />
            {/* <ChatWidget /> */}
          </UserRegistrationProvider>
        </HeroUIProvider>
      </body>
    </html>
  );
}

function AdminLayoutWrapper({ children }: { children: React.ReactNode }) {
  return <ConditionalLayout>{children}</ConditionalLayout>;
}
