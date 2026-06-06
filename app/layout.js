import Navigation from "@/components/Navigation";
import AOSSetup from "@/components/AOSSetup";
import ParticleBackground from "@/components/ParticleBackground";
import ScrollPhysics from "@/components/ScrollPhysics";
import BlackHoleCursor from "@/components/BlackHoleCursor";
import PerformanceHUD from "@/components/PerformanceHUD";
import IronManHUD from "@/components/IronManHUD";
import MobileSystemsTray from "@/components/MobileSystemsTray";
import { PerformanceProvider } from "@/components/PerformanceManager";
import "./globals.css";
import "aos/dist/aos.css";

export const metadata = {
  title: "Johnnie Tse",
  description: "Scaling High-Performance Distributed Compute.",
  openGraph: {
    title: "Johnnie Tse",
    description: "Scaling High-Performance Distributed Compute.",
    url: "https://johnnietse.vercel.app",
    siteName: "Johnnie Tse Portfolio",
    images: [
      {
        url: "https://johnnietse.vercel.app/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/logo.svg", type: "image/svg+xml" }
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  twitter: {
    card: "summary_large_image",
    title: "Johnnie Tse",
    description: "Scaling High-Performance Distributed Compute.",
    images: ["https://johnnietse.vercel.app/og-image.png"],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0F172A",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body suppressHydrationWarning>
        <PerformanceProvider>
          <AOSSetup />
          <Navigation />
          <ParticleBackground />
          <ScrollPhysics />
          <BlackHoleCursor />
          <PerformanceHUD />
          <IronManHUD />
          <MobileSystemsTray />
          {children}
        </PerformanceProvider>
      </body>
    </html>
  );
}
