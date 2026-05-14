import type { Metadata } from "next";
import { Cairo, Inter, Playfair_Display } from "next/font/google";
import { AuthBootstrap } from "@/components/auth/AuthBootstrap";
import { FloatingContactLauncher } from "@/components/contact/FloatingContactLauncher";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SitePreloader } from "@/components/shared/SitePreloader";
import { LanguageProvider } from "@/i18n/LanguageProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Elshbiny | مانيكانات وتجهيز محلات",
  description: "مانيكينات احترافية وتجهيزات عرض للتجار والمحلات.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className="dark" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${playfair.variable} ${cairo.variable} min-h-screen bg-background-obsidian font-body text-text-primary antialiased selection:bg-white selection:text-background-obsidian relative overflow-x-hidden`}
      >
        {/* Ambient Light Layers for Glassmorphism */}
        <div className="pointer-events-none fixed -left-[10%] top-[-10%] h-[500px] w-[500px] rounded-full bg-white/[0.03] blur-[120px] z-0" />
        <div className="pointer-events-none fixed -right-[10%] bottom-[-10%] h-[600px] w-[600px] rounded-full bg-white/[0.02] blur-[150px] z-0" />
        
        <div className="relative z-10 flex min-h-screen flex-col">
          <LanguageProvider>
            <SitePreloader />
            <AuthBootstrap />
            <div className="flex min-h-screen flex-col">
              <div className="flex-1">{children}</div>
              <SiteFooter />
            </div>
            <FloatingContactLauncher />
          </LanguageProvider>
        </div>
      </body>
    </html>
  );
}
