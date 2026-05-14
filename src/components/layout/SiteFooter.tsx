"use client";

import Link from "next/link";
import { MessageCircle, MessagesSquare, Phone } from "lucide-react";
import { BrandMark } from "@/components/layout/BrandMark";
import { contactConfig, siteLinks } from "@/config/contact";
import { useLanguage } from "@/i18n/LanguageProvider";
import { pickLocalized } from "@/i18n/config";
import { uiCopy } from "@/i18n/copy";

const actionLinks = [
  { href: contactConfig.phoneHref, label: uiCopy.footer.call, icon: Phone },
  { href: contactConfig.whatsappHref, label: uiCopy.footer.whatsapp, icon: MessageCircle },
  { href: contactConfig.messengerHref, label: uiCopy.footer.messenger, icon: MessagesSquare },
];

export function SiteFooter() {
  const { locale } = useLanguage();

  return (
    <footer className="border-t border-border-metallic bg-black/20 px-5 py-10 md:px-10">
      <div className="mx-auto grid max-w-[1440px] gap-10 lg:grid-cols-[1fr_0.8fr_0.9fr]">
        <div>
          <BrandMark imageSize="lg" />
          <p className="mt-4 max-w-lg text-sm leading-6 text-text-secondary">{pickLocalized(locale, uiCopy.footer.line)}</p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase text-accent-platinum">{pickLocalized(locale, uiCopy.footer.siteMap)}</p>
          <div className="mt-4 grid grid-cols-2 gap-3 text-sm font-semibold uppercase text-text-secondary">
            {siteLinks.map((link) => (
              <Link key={link.href} href={link.href} className="transition hover:text-white">
                {pickLocalized(locale, link.label)}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase text-accent-platinum">{pickLocalized(locale, uiCopy.footer.sales)}</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            {actionLinks.map((item) => {
              const Icon = item.icon;

              return (
                <a
                  key={item.href}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                  className="inline-flex h-11 items-center justify-center gap-2 border border-border-metallic bg-white/[0.03] px-3 text-xs font-semibold uppercase text-white transition hover:border-white hover:bg-white/10"
                >
                  <Icon aria-hidden className="h-4 w-4" strokeWidth={1.8} />
                  {pickLocalized(locale, item.label)}
                </a>
              );
            })}
          </div>
          <p className="mt-4 text-xs text-text-secondary">{contactConfig.phoneDisplay}</p>
        </div>
      </div>
    </footer>
  );
}
