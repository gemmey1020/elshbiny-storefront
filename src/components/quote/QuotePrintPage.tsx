"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Printer } from "lucide-react";
import { pickLocalized } from "@/i18n/config";
import { useLanguage } from "@/i18n/LanguageProvider";
import { type QuoteHistoryItem, getQuote } from "@/lib/auth";

type QuotePrintPageProps = {
  hashId: string;
};

export function QuotePrintPage({ hashId }: QuotePrintPageProps) {
  const { locale } = useLanguage();
  const [quote, setQuote] = useState<QuoteHistoryItem | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadQuote() {
      try {
        const data = await getQuote(hashId);

        if (!cancelled) {
          setQuote(data);
        }
      } catch {
        if (!cancelled) {
          setError(pickLocalized(locale, { en: "Quote was not found.", ar: "عرض السعر غير موجود." }));
        }
      }
    }

    loadQuote();

    return () => {
      cancelled = true;
    };
  }, [hashId, locale]);

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

  return (
    <main className="min-h-screen bg-white px-5 py-8 text-neutral-950 print:px-0 print:py-0">
      <section className="mx-auto max-w-4xl border border-neutral-200 bg-white p-8 print:border-0">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3 print:hidden">
          <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm font-semibold uppercase">
            <ArrowLeft aria-hidden className="h-4 w-4" />
            {pickLocalized(locale, { en: "Dashboard", ar: "البروفايل" })}
          </Link>
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex h-11 items-center gap-2 border border-neutral-950 px-4 text-sm font-semibold uppercase"
          >
            <Printer aria-hidden className="h-4 w-4" />
            {pickLocalized(locale, { en: "Print", ar: "طباعة" })}
          </button>
        </div>

        {error ? <p className="text-sm font-semibold">{error}</p> : null}
        {!quote && !error ? <p className="text-sm font-semibold">{pickLocalized(locale, { en: "Loading quote...", ar: "جاري تحميل عرض السعر..." })}</p> : null}

        {quote ? (
          <div>
            <div className="flex flex-wrap justify-between gap-6 border-b border-neutral-300 pb-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
                  {pickLocalized(locale, { en: "Elshbiny Quote", ar: "عرض سعر الشبيني" })}
                </p>
                <h1 className="mt-2 text-4xl font-bold">#{quote.hash_id}</h1>
              </div>
              <div className="text-right">
                <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
                  {pickLocalized(locale, { en: "Status", ar: "الحالة" })}
                </p>
                <p className="mt-2 text-lg font-semibold uppercase">{statusLabel(quote.status)}</p>
              </div>
            </div>

            <div className="grid gap-3 border-b border-neutral-300 py-6 text-sm md:grid-cols-3">
              <div>
                <p className="font-semibold">{pickLocalized(locale, { en: "Customer", ar: "العميل" })}</p>
                <p>{quote.customer_name ?? "-"}</p>
              </div>
              <div>
                <p className="font-semibold">{pickLocalized(locale, { en: "Phone", ar: "الموبايل" })}</p>
                <p>{quote.customer_phone ?? "-"}</p>
              </div>
              <div>
                <p className="font-semibold">{pickLocalized(locale, { en: "Email", ar: "الإيميل" })}</p>
                <p>{quote.customer_email ?? "-"}</p>
              </div>
            </div>

            <table className="mt-6 w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-neutral-300 text-left">
                  <th className="py-3 pr-4">{pickLocalized(locale, { en: "Item", ar: "المنتج" })}</th>
                  <th className="py-3 pr-4">{pickLocalized(locale, { en: "SKU", ar: "الكود" })}</th>
                  <th className="py-3 text-right">{pickLocalized(locale, { en: "Qty", ar: "الكمية" })}</th>
                </tr>
              </thead>
              <tbody>
                {(quote.items ?? []).map((item, index) => (
                  <tr key={`${item.sku_snapshot ?? index}-${index}`} className="border-b border-neutral-100">
                    <td className="py-3 pr-4">{item.product_name_snapshot}</td>
                    <td className="py-3 pr-4">{item.sku_snapshot ?? "-"}</td>
                    <td className="py-3 text-right">{item.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <p className="mt-8 text-xs leading-5 text-neutral-500">
              {pickLocalized(locale, {
                en: "Prices are intentionally handled through authenticated buyer access and direct team follow-up.",
                ar: "الأسعار بتتراجع من خلال حساب المشتري والمتابعة المباشرة مع فريق الشبيني.",
              })}
            </p>
          </div>
        ) : null}
      </section>
    </main>
  );
}
