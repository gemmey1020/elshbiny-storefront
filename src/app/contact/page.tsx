import type { Metadata } from "next";
import { ContactPageClient } from "@/components/contact/ContactPageClient";

export const metadata: Metadata = {
  title: "Contact Elshbiny | اتصل بنا",
  description: "Contact Elshbiny for mannequins, store setup, wholesale orders, and custom display work.",
};

export default function ContactPage() {
  return <ContactPageClient />;
}
