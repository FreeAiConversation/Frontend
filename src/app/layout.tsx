import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Toaster } from "sonner";
import { StructuredData } from "@/components/seo/StructuredData";
import { generateWebsiteSchema, generateOrganizationSchema } from "@/lib/seo";

const inter = Inter({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://freeaiconversion.com'),
  title: {
    default: "Free AI Conversion — Premium Tools",
    template: "%s — Free AI Conversion",
  },
  description: "Free AI-powered tools for PDF, images, code, writing & more. No login required. Unlimited usage. Convert anything, pay nothing.",
  keywords: [
    "free tools",
    "AI tools",
    "PDF tools",
    "image converter",
    "code formatter",
    "password generator",
    "free conversion",
    "online tools",
    "no signup",
    "unlimited usage",
  ],
  authors: [{ name: "Free AI Conversion" }],
  creator: "Free AI Conversion",
  publisher: "Free AI Conversion",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.ico', type: 'image/x-icon' },
    ],
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Free AI Conversion",
    title: "Free AI Conversion — Premium Tools",
    description: "Free AI-powered tools for PDF, images, code, writing & more. No login required. Unlimited usage.",
    images: [
      {
        url: "/banner/free-ai-conversion.webp",
        width: 1200,
        height: 630,
        alt: "Free AI Conversion",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free AI Conversion — Premium Tools",
    description: "Free AI-powered tools for PDF, images, code, writing & more. No login required. Unlimited usage.",
    images: ["/banner/free-ai-conversion.webp"],
    creator: "@freeaiconversion",
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
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <StructuredData 
          data={[
            generateWebsiteSchema(),
            generateOrganizationSchema(),
          ]} 
        />
      </head>
      <body className={inter.className}>
        <Header />
        {children}
        <Footer />
        <Toaster theme="dark" position="bottom-right" richColors />
      </body>
    </html>
  );
}
