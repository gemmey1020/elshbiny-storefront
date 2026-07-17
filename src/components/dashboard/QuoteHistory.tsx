"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ExternalLink, MessageCircle, Printer, XCircle } from "lucide-react";
import { contactConfig } from "@/config/contact";
import { pickLocalized } from "@/i18n/config";
import { useLanguage } from "@/i18n/LanguageProvider";
import { type QuoteHistoryItem, cancelQuote, listMyQuotes } from "@/lib/auth";
import { useAuthStore } from "@/store/useAuthStore";

function statusClass(status: QuoteHistoryItem["status"]) {
  if (status === "won") {
    return "border-accent-white text-accent-platinum";
  }

  if (status === "lost") {
    return "border-white/20 text-text-secondary";
  }

  if (status === "cancelled") {
    return "border-white/10 text-text-muted";
  }

  if (status === "contacted") {
    return "border-accent-steel text-accent-steel";
  }

  return "border-white/30 text-white";
}

export function QuoteHistory() {
  const { locale } = useLanguage();
  const token = useAuthStore((state) => state.token);
  const [quotes, setQuotes] = useState<QuoteHistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [cancellingHash, setCancellingHash] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadQuotes() {
      if (!token) {
        setQuotes([]);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const data = await listMyQuotes(token);

        if (!cancelled) {
          setQuotes(data);
        }
      } catch {
        if (!cancelled) {
          setError(pickLocalized(locale, { en: "Unable to load quote history.", ar: "مش قادرين نحمّل سجل عروض السعر." }));
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    loadQuotes();

    return () => {
      cancelled = true;
    };
  }, [locale, token]);

  async function handleCancel(hashId: string) {
    if (!token) {
      return;
    }

    setCancellingHash(hashId);
    setError(null);

    try {
      const cancelledQuote = await cancelQuote(token, hashId);
      setQuotes((current) => current.map((quote) => (quote.hash_id === hashId ? cancelledQuote : quote)));
    } catch {
      setError(pickLocalized(locale, { en: "Unable to cancel this quote. Only pending quotes can be cancelled.", ar: "مش قادرين نلغي العرض ده. الإلغاء متاح للطلبات المعلقة فقط." }));
    } finally {
      setCancellingHash(null);
    }
  }

  function whatsAppHref(quote: QuoteHistoryItem) {
    const message = quote.whatsapp_payload?.message ?? `Quote request: ${quote.quote_url ?? `/quote/${quote.hash_id}`}`;
    const separator = contactConfig.whatsappHref.includes("?") ? "&" : "?";

    return `${contactConfig.whatsappHref}${separator}text=${encodeURIComponent(message)}`;
  }

  function statusLabel(status: QuoteHistoryItem["status"]) {
    const labels: Record<QuoteHistoryItem["status"], { en: string; ar: string }> = {
      pending: { en: "Pending", ar: "قيد المراجعة" },
      contacted: { en: "Contacted", ar: "تم التواصل" },
      won: { en: "Won", ar: "تم الاتفاق" },
      lost: { en: "Lost", ar: "لم يكتمل" },
      cancelled: { en: "Cancelled", ar: "ملغي" },
    };

    return pickLocalized(locale, labels[status]);
  }

  function formatDate(value?: string | null) {
    if (!value) {
      return "-";
    }

    return new Intl.DateTimeFormat(locale === "ar" ? "ar-EG" : "en-US", {
      dateStyle: "medium",
    }).format(new Date(value));
  }

  function formatTotal(value?: string | null) {
    if (!value) {
      return pickLocalized(locale, { en: "By follow-up", ar: "حسب المتابعة" });
    }

    return `${Number(value).toLocaleString(locale === "ar" ? "ar-EG" : "en-US")} EGP`;
  }

  function itemCount(quote: QuoteHistoryItem) {
    return quote.items_count ?? quote.items?.reduce((total, item) => total + item.quantity, 0) ?? 0;
  }

  function actionButtons(quote: QuoteHistoryItem) {
    const quoteHref = quote.quote_url ?? `/quote/${quote.hash_id}`;

    return (
      <div className="flex flex-wrap gap-2">
        <Link
          href={quoteHref}
          className="inline-flex h-10 w-10 items-center justify-center border border-border-metallic text-white hover:border-white"
          title={pickLocalized(locale, { en: "Open quote", ar: "افتح عرض السعر" })}
        >
          <ExternalLink aria-hidden className="h-4 w-4" strokeWidth={1.8} />
        </Link>
        <Link
          href={quoteHref}
          className="inline-flex h-10 w-10 items-center justify-center border border-border-metallic text-white hover:border-white"
          title={pickLocalized(locale, { en: "Print quote", ar: "اطبع عرض السعر" })}
        >
          <Printer aria-hidden className="h-4 w-4" strokeWidth={1.8} />
        </Link>
        <a
          href={whatsAppHref(quote)}
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-10 w-10 items-center justify-center border border-border-metallic text-white hover:border-white"
          title={pickLocalized(locale, { en: "Send on WhatsApp", ar: "افتح واتساب" })}
        >
          <MessageCircle aria-hidden className="h-4 w-4" strokeWidth={1.8} />
        </a>
        {quote.status === "pending" ? (
          <button
            type="button"
            onClick={() => handleCancel(quote.hash_id)}
            disabled={cancellingHash === quote.hash_id}
            className="inline-flex h-10 w-10 items-center justify-center border border-border-metallic text-white hover:border-white disabled:opacity-60"
            title={pickLocalized(locale, { en: "Cancel quote", ar: "إلغاء الطلب" })}
          >
            <XCircle aria-hidden className="h-4 w-4" strokeWidth={1.8} />
          </button>
        ) : null}
      </div>
    );
  }

  return (
    <section>
      <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase text-accent-platinum">
            {pickLocalized(locale, { en: "Quote History", ar: "سجل عروض السعر" })}
          </p>
          <h2 className="mt-3 font-headline text-4xl text-white">
            {pickLocalized(locale, { en: "Your saved requests", ar: "طلباتك المحفوظة" })}
          </h2>
        </div>
        <p className="max-w-sm text-sm text-text-secondary">
          {pickLocalized(locale, {
            en: "Open, print, or follow up on every request connected to your buyer profile.",
            ar: "افتح أو اطبع أو تابع أي طلب مربوط بحسابك كمشتري.",
          })}
        </p>
      </div>

      <div className="glass-panel overflow-hidden rounded-md">
        <div className="hidden grid-cols-[1fr_140px_120px_130px_220px] border-b border-border-metallic bg-white/[0.03] px-5 py-4 text-xs font-semibold uppercase text-accent-platinum md:grid">
          <span>{pickLocalized(locale, { en: "Quote", ar: "العرض" })}</span>
          <span>{pickLocalized(locale, { en: "Status", ar: "الحالة" })}</span>
          <span>{pickLocalized(locale, { en: "Items", ar: "المنتجات" })}</span>
          <span>{pickLocalized(locale, { en: "Total", ar: "الإجمالي" })}</span>
          <span>{pickLocalized(locale, { en: "Actions", ar: "الأدوات" })}</span>
        </div>

        {isLoading ? <p className="p-5 text-text-secondary">{pickLocalized(locale, { en: "Loading quote history...", ar: "جاري تحميل سجل العروض..." })}</p> : null}
        {error ? <p className="p-5 text-text-secondary">{error}</p> : null}
        {!isLoading && !error && quotes.length === 0 ? (
          <p className="p-5 text-text-secondary">
            {pickLocalized(locale, { en: "No historical quotes yet. Start a request from the catalog first.", ar: "لسه مفيش عروض محفوظة. ابدأ طلب جديد من الكتالوج." })}
          </p>
        ) : null}

        {quotes.map((quote) => (
          <article
            key={quote.hash_id}
            className="grid gap-4 border-b border-border-metallic px-5 py-5 last:border-b-0 md:grid-cols-[1fr_140px_120px_130px_220px] md:items-center"
          >
            <div>
              <p className="font-mono text-lg text-white">{quote.hash_id}</p>
              {quote.customer_name ? <p className="mt-1 text-sm text-text-secondary">{quote.customer_name}</p> : null}
              <p className="mt-1 text-xs text-text-secondary">{formatDate(quote.created_at)}</p>
            </div>
            <span className={`w-fit border px-3 py-1 text-xs font-semibold uppercase ${statusClass(quote.status)}`}>{statusLabel(quote.status)}</span>
            <span className="text-sm text-text-secondary">{itemCount(quote)} {pickLocalized(locale, { en: "items", ar: "منتج" })}</span>
            <span className="text-sm font-semibold text-white">{formatTotal(quote.total_snapshot)}</span>
            {actionButtons(quote)}
          </article>
        ))}
      </div>
    </section>
  );
}
