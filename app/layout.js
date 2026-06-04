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
  title: "Johnnie Tse | Software Engineer",
  description: "Portfolio of Johnnie Tse, Computer Engineering student at Queen's University.",
  openGraph: {
    title: "Johnnie Tse | Software Engineer",
    description: "Portfolio of Johnnie Tse, Computer Engineering student at Queen's University.",
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
    icon: "/logo.svg",
    shortcut: "/logo.svg",
    apple: "/logo.svg",
  },
  twitter: {
    card: "summary_large_image",
    title: "Johnnie Tse | Software Engineer",
    description: "Portfolio of Johnnie Tse, Computer Engineering student at Queen's University.",
    images: ["https://johnnietse.vercel.app/og-image.png"],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
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
