"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, MessagesSquare, Phone } from "lucide-react";
import { contactConfig } from "@/config/contact";
import { MannequinGlyphFinal } from "@/components/shared/MannequinLoader";
import { useLanguage } from "@/i18n/LanguageProvider";
import { pickLocalized } from "@/i18n/config";
import { uiCopy } from "@/i18n/copy";

const actions = [
  { href: contactConfig.phoneHref, label: uiCopy.footer.call, icon: Phone },
  { href: contactConfig.whatsappHref, label: uiCopy.footer.whatsapp, icon: MessageCircle },
  { href: contactConfig.messengerHref, label: uiCopy.footer.messenger, icon: MessagesSquare },
];

export function FloatingContactLauncher() {
  const { locale } = useLanguage();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const quiet = pathname === "/login" || pathname === "/dashboard" || pathname === "/register";

  return (
    <div className={`fixed bottom-5 right-5 z-[90] ${quiet ? "opacity-70" : ""}`}>
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            className="mb-3 grid gap-2"
          >
            {actions.map((item) => {
              const Icon = item.icon;

              return (
                <a
                  key={item.href}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                  className="glass-panel inline-flex h-11 min-w-36 items-center justify-between gap-3 rounded-md px-4 text-xs font-semibold uppercase text-white transition hover:border-white hover:bg-white/10"
                >
                  <span>{pickLocalized(locale, item.label)}</span>
                  <Icon aria-hidden className="h-4 w-4" strokeWidth={1.8} />
                </a>
              );
            })}
          </motion.div>
        ) : null}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        aria-label={pickLocalized(locale, { en: "Open Elshbiny contact options", ar: "افتح اختيارات التواصل مع الشبيني" })}
        className="mannequin-contact-button grid h-16 w-16 place-items-center rounded-full border border-white/20 bg-background-obsidian/90 shadow-[0_0_28px_rgba(255,255,255,0.14)] backdrop-blur-[30px] transition hover:border-white"
      >
        <MannequinGlyphFinal compact />
      </button>
    </div>
  );
}
