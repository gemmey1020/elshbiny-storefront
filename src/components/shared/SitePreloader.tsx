"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MannequinGlyph } from "@/components/shared/MannequinLoader";
import { useLanguage } from "@/i18n/LanguageProvider";
import { pickLocalized } from "@/i18n/config";

const STORAGE_KEY = "elshbiny-preloader-seen";

export function SitePreloader() {
  const { locale } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (window.sessionStorage.getItem(STORAGE_KEY) === "true") {
      setVisible(false);
      return;
    }

    setVisible(true);

    const timer = window.setTimeout(() => {
      window.sessionStorage.setItem(STORAGE_KEY, "true");
      setVisible(false);
    }, 1200);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28 }}
          className="fixed inset-0 z-[120] grid place-items-center bg-background-obsidian"
        >
          <div className="text-center">
            <div className="mannequin-loader-pulse">
              <MannequinGlyph />
            </div>
            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.28em] text-accent-platinum">
              {pickLocalized(locale, { en: "Preparing Elshbiny showroom", ar: "بنجهز معرض الشبيني" })}
            </p>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
