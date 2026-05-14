"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { LogIn, PhoneCall } from "lucide-react";
import { BrandMark } from "@/components/layout/BrandMark";
import { useLanguage } from "@/i18n/LanguageProvider";
import { localeLabels, pickLocalized } from "@/i18n/config";
import { uiCopy } from "@/i18n/copy";

const navLinks = [
  { href: "/catalog", label: uiCopy.nav.catalog },
  { href: "/fit-out", label: uiCopy.nav.fitOut },
  { href: "/about", label: uiCopy.nav.about },
  { href: "/faq", label: uiCopy.nav.faq },
  { href: "/contact", label: uiCopy.nav.contact },
];

export function StealthNavbar() {
  const { locale, setLocale } = useLanguage();
  const { scrollY } = useScroll();
  const backgroundColor = useTransform(scrollY, [0, 120], ["rgba(15, 17, 26, 0)", "rgba(15, 17, 26, 0.82)"]);
  const backdropFilter = useTransform(scrollY, [0, 120], ["blur(0px)", "blur(40px)"]);
  const borderColor = useTransform(scrollY, [0, 120], ["rgba(255, 255, 255, 0.04)", "rgba(255, 255, 255, 0.12)"]);

  return (
    <motion.nav
      style={{ backgroundColor, backdropFilter, borderColor }}
      className="fixed left-0 top-0 z-50 w-full border-b"
    >
      <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-5 md:px-10">
        <BrandMark imageSize="sm" />
        <div className="hidden items-center gap-6 text-sm font-semibold uppercase text-text-secondary md:flex">
          {navLinks.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-accent-platinum">
              {pickLocalized(locale, item.label)}
            </Link>
          ))}
          <div className="inline-flex h-10 items-center border border-border-metallic bg-white/[0.03] text-xs text-white">
            {(["ar", "en"] as const).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setLocale(item)}
                aria-pressed={locale === item}
                className={`h-full px-3 font-semibold uppercase transition ${
                  locale === item ? "bg-white text-background-obsidian" : "text-text-secondary hover:text-white"
                }`}
              >
                {localeLabels[item].short}
              </button>
            ))}
          </div>
          <Link
            href="/login"
            className="inline-flex h-10 items-center gap-2 border border-white px-4 text-white transition hover:bg-white hover:text-background-obsidian"
          >
            <LogIn aria-hidden className="h-4 w-4" strokeWidth={1.8} />
            {pickLocalized(locale, uiCopy.nav.portal)}
          </Link>
        </div>
        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={() => setLocale(locale === "ar" ? "en" : "ar")}
            className="inline-flex h-10 items-center border border-border-metallic px-3 text-xs font-semibold uppercase text-white"
          >
            {locale === "ar" ? "EN" : "عربي"}
          </button>
          <Link
            href="/fit-out"
            className="inline-flex h-10 items-center border border-border-metallic px-4 text-sm font-semibold uppercase text-white"
          >
            {pickLocalized(locale, uiCopy.nav.fitOut)}
          </Link>
          <Link
            href="/contact"
            aria-label={pickLocalized(locale, uiCopy.nav.contact)}
            className="grid h-10 w-10 place-items-center border border-border-metallic text-white transition hover:border-white"
          >
            <PhoneCall aria-hidden className="h-4 w-4" strokeWidth={1.8} />
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}
