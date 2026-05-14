import type { Metadata } from "next";
import { AboutPageClient } from "@/components/about/AboutPageClient";

export const metadata: Metadata = {
  title: "About Elshbiny | Mannequin Factory & Store Setup",
  description: "Learn about Elshbiny's mannequin manufacturing, store display experience, fair pricing, and retailer-focused setup path.",
};

export default function AboutPage() {
  return <AboutPageClient />;
}
