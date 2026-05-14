import type { Metadata } from "next";
import { FaqIndexClient } from "@/components/faq/FaqIndexClient";

export const metadata: Metadata = {
  title: "FAQ | Elshbiny Mannequins & Store Setup",
  description: "Answers for retailers about mannequin orders, store setup, pricing, materials, delivery, custom work, and wholesale.",
};

export default function FaqPage() {
  return <FaqIndexClient />;
}
