"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MannequinSilhouette } from "@/components/shared/MannequinSilhouette";
import { useLanguage } from "@/i18n/LanguageProvider";
import { productName } from "@/i18n/config";
import type { InquiryItem } from "@/store/useInquiryStore";

const phrases = {
  en: ["Securing Hash", "Compiling Requirements", "Locking Quote Reference", "Routing WhatsApp Brief"],
  ar: ["بنأمن المرجع", "بنجهز الاحتياجات", "بنثبت رقم الطلب", "بنجهز رسالة التواصل"],
};

export function CheckoutLoader({ hashData, primaryItem }: { hashData: string | null; primaryItem: InquiryItem | null }) {
  const { locale } = useLanguage();
  const primaryName = primaryItem ? productName(primaryItem, locale) : "";

  return (
    <div className="fixed inset-0 z-[90] grid place-items-center bg-background-obsidian/95 px-5 text-center backdrop-blur-[40px]">
      <div className="max-w-lg">
        <div className="mx-auto mb-8 h-36 w-28 overflow-hidden border border-border-metallic bg-white/[0.03]">
          {primaryItem?.image_tiny ? (
            <Image src={primaryItem.image_tiny} alt={primaryName} width={160} height={210} unoptimized className="h-full w-full object-cover" />
          ) : (
            <MannequinSilhouette />
          )}
        </div>
        <p className="text-xs font-semibold uppercase text-accent-steel">{hashData ? `${locale === "ar" ? "مرجع" : "Reference"} ${hashData}` : locale === "ar" ? "تجهيز الطلب" : "Omega checkout"}</p>
        <h2 className="mt-4 font-headline text-5xl text-white">{locale === "ar" ? "بنجهز تسليم آمن للطلب" : "Preparing secure handoff"}</h2>
        <div className="mt-8 grid gap-3">
          {phrases[locale].map((phrase, index) => (
            <motion.div
              key={phrase}
              initial={{ opacity: 0.25 }}
              animate={{ opacity: [0.25, 1, 0.25] }}
              transition={{ duration: 1.4, repeat: Infinity, delay: index * 0.25 }}
              className="border border-border-metallic bg-white/[0.02] px-4 py-3 text-sm font-semibold uppercase text-text-primary"
            >
              {phrase}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
