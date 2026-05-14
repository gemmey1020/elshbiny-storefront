"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ClipboardList, MessageCircle, MessagesSquare, Phone, Send, Store } from "lucide-react";
import { BrandMark } from "@/components/layout/BrandMark";
import { StealthNavbar } from "@/components/landing/StealthNavbar";
import { MannequinGlyph } from "@/components/shared/MannequinLoader";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { contactConfig } from "@/config/contact";
import { contactPage } from "@/data/contact";
import { useLanguage } from "@/i18n/LanguageProvider";
import { pickLocalized } from "@/i18n/config";
import { uiCopy } from "@/i18n/copy";

const actionLinks = [
  { href: contactConfig.phoneHref, label: uiCopy.footer.call, icon: Phone },
  { href: contactConfig.whatsappHref, label: uiCopy.footer.whatsapp, icon: MessageCircle },
  { href: contactConfig.messengerHref, label: uiCopy.footer.messenger, icon: MessagesSquare },
];

type ContactFormState = {
  name: string;
  phone: string;
  requestType: string;
  storeType: string;
  message: string;
};

const initialForm: ContactFormState = {
  name: "",
  phone: "",
  requestType: "",
  storeType: "",
  message: "",
};

function withWhatsAppMessage(message: string) {
  const separator = contactConfig.whatsappHref.includes("?") ? "&" : "?";
  return `${contactConfig.whatsappHref}${separator}text=${encodeURIComponent(message)}`;
}

export function ContactPageClient() {
  const { locale } = useLanguage();
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [form, setForm] = useState<ContactFormState>(initialForm);
  const [error, setError] = useState("");

  useEffect(() => {
    const root = rootRef.current;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!root || reducedMotion) {
      return;
    }

    const context = gsap.context(() => {
      gsap.fromTo(
        ".contact-reveal",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.72, ease: "power3.out", stagger: 0.08 },
      );
      gsap.to(".contact-visual-float", {
        y: -10,
        duration: 2.7,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    }, root);

    return () => context.revert();
  }, []);

  const selectedRequest = useMemo(
    () => contactPage.requestTypes.find((item) => item.value === form.requestType),
    [form.requestType],
  );

  function updateField(field: keyof ContactFormState, value: string) {
    setError("");
    setForm((current) => ({ ...current, [field]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!form.name.trim() || !form.phone.trim() || !form.requestType.trim()) {
      setError(pickLocalized(locale, contactPage.validation.required));
      return;
    }

    const requestLabel = selectedRequest ? pickLocalized(locale, selectedRequest.label) : form.requestType;
    const lines =
      locale === "ar"
        ? [
            "طلب تواصل من موقع الشبيني",
            `الاسم: ${form.name.trim()}`,
            `الموبايل: ${form.phone.trim()}`,
            `نوع الطلب: ${requestLabel}`,
            `نوع المحل: ${form.storeType.trim() || "غير محدد"}`,
            `الرسالة: ${form.message.trim() || "محتاج أعرف أنسب تجهيز لمحلي."}`,
          ]
        : [
            "Contact request from Elshbiny website",
            `Name: ${form.name.trim()}`,
            `Mobile: ${form.phone.trim()}`,
            `Request type: ${requestLabel}`,
            `Store type: ${form.storeType.trim() || "Not specified"}`,
            `Message: ${form.message.trim() || "I need guidance for my store setup."}`,
          ];

    window.open(withWhatsAppMessage(lines.join("\n")), "_blank", "noopener,noreferrer");
  }

  return (
    <main ref={rootRef} className="min-h-screen text-text-primary">
      <StealthNavbar />

      <section className="mx-auto grid max-w-[1440px] gap-10 px-5 pb-20 pt-32 md:px-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div className="contact-reveal">
          <p className="text-xs font-semibold uppercase text-accent-platinum">{pickLocalized(locale, contactPage.eyebrow)}</p>
          <h1 className="mt-5 max-w-3xl font-headline text-5xl leading-tight text-white md:text-7xl">
            {pickLocalized(locale, contactPage.title)}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-text-secondary">{pickLocalized(locale, contactPage.body)}</p>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {actionLinks.map((item) => {
              const Icon = item.icon;

              return (
                <a
                  key={item.href}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                  className="contact-reveal glass-panel flex min-h-28 flex-col justify-between rounded-md p-4 transition hover:border-white hover:bg-white/10"
                >
                  <Icon aria-hidden className="h-5 w-5 text-accent-platinum" strokeWidth={1.8} />
                  <span className="mt-7 text-sm font-semibold uppercase text-white">{pickLocalized(locale, item.label)}</span>
                </a>
              );
            })}
          </div>

          <div className="contact-reveal mt-8 grid gap-3 border-y border-border-metallic py-5 sm:grid-cols-3">
            {contactPage.proofPoints.map((point) => (
              <div key={point.label.en}>
                <p className="text-2xl font-semibold text-white">{pickLocalized(locale, point.value)}</p>
                <p className="mt-1 text-xs font-semibold uppercase text-text-secondary">{pickLocalized(locale, point.label)}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="contact-reveal grid gap-5">
          <GlassCard className="relative overflow-hidden p-6 md:p-8">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/40" />
            <div className="grid gap-6 lg:grid-cols-[0.8fr_1fr]">
              <div className="contact-visual-float flex min-h-72 flex-col justify-between border border-border-metallic bg-black/20 p-5">
                <BrandMark imageSize="lg" />
                <div className="grid place-items-center py-8">
                  <div className="mannequin-loader-pulse scale-125">
                    <MannequinGlyph />
                  </div>
                </div>
                <p className="text-sm leading-6 text-text-secondary">
                  {pickLocalized(locale, {
                    en: "A clear first message helps the team understand whether you need pieces, a full store setup, or wholesale supply.",
                    ar: "أول رسالة واضحة بتساعد الفريق يعرف هل محتاج قطع، تجهيز محل كامل، أو توريد جملة.",
                  })}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="grid gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase text-accent-platinum">{pickLocalized(locale, contactPage.formTitle)}</p>
                  <p className="mt-2 text-sm leading-6 text-text-secondary">{pickLocalized(locale, contactPage.formBody)}</p>
                </div>

                <label className="grid gap-2 text-xs font-semibold uppercase text-text-secondary">
                  {pickLocalized(locale, contactPage.labels.name)}
                  <input
                    value={form.name}
                    onChange={(event) => updateField("name", event.target.value)}
                    placeholder={pickLocalized(locale, contactPage.placeholders.name)}
                    className="h-12 border border-border-metallic bg-white/[0.03] px-4 text-sm font-medium text-white outline-none transition placeholder:text-text-muted focus:border-white"
                  />
                </label>

                <label className="grid gap-2 text-xs font-semibold uppercase text-text-secondary">
                  {pickLocalized(locale, contactPage.labels.phone)}
                  <input
                    value={form.phone}
                    onChange={(event) => updateField("phone", event.target.value)}
                    placeholder={pickLocalized(locale, contactPage.placeholders.phone)}
                    className="rtl-ltr h-12 border border-border-metallic bg-white/[0.03] px-4 text-sm font-medium text-white outline-none transition placeholder:text-text-muted focus:border-white"
                  />
                </label>

                <label className="grid gap-2 text-xs font-semibold uppercase text-text-secondary">
                  {pickLocalized(locale, contactPage.labels.requestType)}
                  <select
                    value={form.requestType}
                    onChange={(event) => updateField("requestType", event.target.value)}
                    className="h-12 border border-border-metallic bg-background-obsidian px-4 text-sm font-medium text-white outline-none transition focus:border-white"
                  >
                    <option value="">{pickLocalized(locale, { en: "Choose request type", ar: "اختار نوع الطلب" })}</option>
                    {contactPage.requestTypes.map((item) => (
                      <option key={item.value} value={item.value}>
                        {pickLocalized(locale, item.label)}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="grid gap-2 text-xs font-semibold uppercase text-text-secondary">
                  {pickLocalized(locale, contactPage.labels.storeType)}
                  <input
                    value={form.storeType}
                    onChange={(event) => updateField("storeType", event.target.value)}
                    placeholder={pickLocalized(locale, contactPage.placeholders.storeType)}
                    className="h-12 border border-border-metallic bg-white/[0.03] px-4 text-sm font-medium text-white outline-none transition placeholder:text-text-muted focus:border-white"
                  />
                </label>

                <label className="grid gap-2 text-xs font-semibold uppercase text-text-secondary">
                  {pickLocalized(locale, contactPage.labels.message)}
                  <textarea
                    value={form.message}
                    onChange={(event) => updateField("message", event.target.value)}
                    placeholder={pickLocalized(locale, contactPage.placeholders.message)}
                    className="min-h-28 resize-none border border-border-metallic bg-white/[0.03] px-4 py-3 text-sm font-medium leading-6 text-white outline-none transition placeholder:text-text-muted focus:border-white"
                  />
                </label>

                {error ? <p className="border border-white/20 bg-white/[0.03] px-4 py-3 text-sm text-white">{error}</p> : null}

                <Button type="submit" icon={Send} className="platinum-pulse w-full">
                  {pickLocalized(locale, contactPage.submit)}
                </Button>
                <p className="text-xs leading-5 text-text-secondary">{pickLocalized(locale, contactPage.successHint)}</p>
              </form>
            </div>
          </GlassCard>

          <div className="contact-reveal grid gap-3 sm:grid-cols-2">
            <GlassCard className="p-5">
              <Store aria-hidden className="h-5 w-5 text-accent-platinum" strokeWidth={1.8} />
              <p className="mt-5 font-semibold text-white">{pickLocalized(locale, { en: "Store setup first", ar: "تجهيز المحل أولًا" })}</p>
              <p className="mt-2 text-sm leading-6 text-text-secondary">
                {pickLocalized(locale, {
                  en: "The page points retailers to the fastest conversation path before buying.",
                  ar: "الصفحة بتوصل التاجر لأسرع طريق للكلام قبل الشراء.",
                })}
              </p>
            </GlassCard>
            <GlassCard className="p-5">
              <ClipboardList aria-hidden className="h-5 w-5 text-accent-platinum" strokeWidth={1.8} />
              <p className="mt-5 font-semibold text-white">{pickLocalized(locale, { en: "Ready message", ar: "رسالة جاهزة" })}</p>
              <p className="mt-2 text-sm leading-6 text-text-secondary">
                {pickLocalized(locale, {
                  en: "The WhatsApp message carries the useful details without needing backend storage.",
                  ar: "رسالة الواتساب بتاخد التفاصيل المهمة من غير ما نحتاج تخزين باك إند دلوقتي.",
                })}
              </p>
            </GlassCard>
          </div>
        </div>
      </section>
    </main>
  );
}
