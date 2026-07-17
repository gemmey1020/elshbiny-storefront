"use client";

import { FormEvent, useEffect, useState } from "react";
import { ArrowUpRight, MessageCircle, Save } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { pickLocalized } from "@/i18n/config";
import { useLanguage } from "@/i18n/LanguageProvider";
import { useAuthStore } from "@/store/useAuthStore";

export function ProfilePanel() {
  const { locale } = useLanguage();
  const user = useAuthStore((state) => state.user);
  const updateProfile = useAuthStore((state) => state.updateProfile);
  const [phone, setPhone] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [address, setAddress] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    setPhone(user?.phone ?? "");
    setCompanyName(user?.company_name ?? "");
    setAddress(user?.address ?? "");
  }, [user]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSaving(true);
    setMessage(null);

    try {
      await updateProfile({
        phone: phone.trim() || null,
        company_name: companyName.trim() || null,
        address: address.trim() || null,
      });
      setMessage(pickLocalized(locale, { en: "Profile saved.", ar: "تم حفظ بياناتك." }));
    } catch {
      setMessage(pickLocalized(locale, { en: "Unable to save profile right now.", ar: "مش قادرين نحفظ البيانات دلوقتي." }));
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <section>
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase text-accent-platinum">Profile</p>
        <h2 className="mt-3 font-headline text-4xl text-white">
          {pickLocalized(locale, { en: "Simple buyer details", ar: "بيانات مشتري بسيطة" })}
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-text-secondary">
          {pickLocalized(locale, {
            en: "Company name is optional. Leave it empty if you are buying as an individual or prefer to ask without a company identity.",
            ar: "اسم الشركة اختياري. سيبه فاضي لو بتشتري كشخص أو حابب تسأل من غير هوية شركة.",
          })}
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Button href="/catalog" icon={ArrowUpRight}>
            {pickLocalized(locale, { en: "New request", ar: "طلب جديد" })}
          </Button>
          <Button href="/contact" icon={MessageCircle} variant="glass">
            {pickLocalized(locale, { en: "General consultation", ar: "استشارة عامة" })}
          </Button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="glass-panel grid max-w-2xl gap-5 rounded-md p-5">
        <label className="grid gap-2 text-xs font-semibold uppercase text-text-secondary">
          {pickLocalized(locale, { en: "Phone", ar: "رقم الموبايل" })}
          <input
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            className="h-12 border border-border-metallic bg-white/[0.03] px-4 text-sm font-medium text-white outline-none focus:border-white"
            placeholder="+20..."
          />
        </label>

        <label className="grid gap-2 text-xs font-semibold uppercase text-text-secondary">
          {pickLocalized(locale, { en: "Company name", ar: "اسم الشركة" })}
          <input
            value={companyName}
            onChange={(event) => setCompanyName(event.target.value)}
            className="h-12 border border-border-metallic bg-white/[0.03] px-4 text-sm font-medium text-white outline-none focus:border-white"
            placeholder={pickLocalized(locale, { en: "Optional", ar: "اختياري" })}
          />
        </label>

        <label className="grid gap-2 text-xs font-semibold uppercase text-text-secondary">
          {pickLocalized(locale, { en: "Address", ar: "العنوان" })}
          <textarea
            value={address}
            onChange={(event) => setAddress(event.target.value)}
            className="min-h-28 resize-none border border-border-metallic bg-white/[0.03] px-4 py-3 text-sm font-medium leading-6 text-white outline-none focus:border-white"
            placeholder={pickLocalized(locale, { en: "Optional delivery or company address", ar: "عنوان اختياري للتوصيل أو الشركة" })}
          />
        </label>

        {message ? <p className="border border-white/20 px-4 py-3 text-sm text-white">{message}</p> : null}

        <button
          type="submit"
          disabled={isSaving}
          className="inline-flex h-12 w-fit items-center justify-center gap-3 border border-accent-platinum px-5 text-sm font-semibold uppercase text-white hover:bg-white/10 disabled:opacity-60"
        >
          <Save aria-hidden className="h-4 w-4" strokeWidth={1.8} />
          {isSaving
            ? pickLocalized(locale, { en: "Saving", ar: "جاري الحفظ" })
            : pickLocalized(locale, { en: "Save profile", ar: "حفظ البيانات" })}
        </button>
      </form>
    </section>
  );
}
