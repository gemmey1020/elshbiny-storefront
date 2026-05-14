"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { type QuoteHistoryItem, listMyQuotes } from "@/lib/auth";
import { useAuthStore } from "@/store/useAuthStore";

function statusClass(status: QuoteHistoryItem["status"]) {
  if (status === "won") {
    return "border-accent-white text-accent-platinum";
  }

  if (status === "lost") {
    return "border-white/20 text-text-secondary";
  }

  if (status === "contacted") {
    return "border-accent-steel text-accent-steel";
  }

  return "border-white/30 text-white";
}

export function QuoteHistory() {
  const token = useAuthStore((state) => state.token);
  const [quotes, setQuotes] = useState<QuoteHistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
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
          setError("Unable to load quote history from /api/v1/auth/my-quotes.");
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
  }, [token]);

  return (
    <section>
      <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase text-accent-platinum">Quote History</p>
          <h2 className="mt-3 font-headline text-4xl text-white">Your architectural portfolio</h2>
        </div>
        <p className="max-w-sm text-sm text-text-secondary">Historical RFQs are synced from the verified bearer-token dashboard endpoint.</p>
      </div>

      <div className="glass-panel overflow-hidden rounded-md">
        <div className="hidden grid-cols-[1fr_160px_140px_80px] border-b border-border-metallic bg-white/[0.03] px-5 py-4 text-xs font-semibold uppercase text-accent-platinum md:grid">
          <span>Quote Hash</span>
          <span>Status</span>
          <span>Items</span>
          <span>Open</span>
        </div>

        {isLoading ? <p className="p-5 text-text-secondary">Loading quote history...</p> : null}
        {error ? <p className="p-5 text-text-secondary">{error}</p> : null}
        {!isLoading && !error && quotes.length === 0 ? (
          <p className="p-5 text-text-secondary">No historical quotes yet. Generate a quote from the inquiry workspace first.</p>
        ) : null}

        {quotes.map((quote) => (
          <article
            key={quote.hash_id}
            className="grid gap-4 border-b border-border-metallic px-5 py-5 last:border-b-0 md:grid-cols-[1fr_160px_140px_80px] md:items-center"
          >
            <div>
              <p className="font-mono text-lg text-white">{quote.hash_id}</p>
              {quote.customer_name ? <p className="mt-1 text-sm text-text-secondary">{quote.customer_name}</p> : null}
            </div>
            <span className={`w-fit border px-3 py-1 text-xs font-semibold uppercase ${statusClass(quote.status)}`}>{quote.status}</span>
            <span className="text-sm text-text-secondary">{quote.items?.length ?? 0} line items</span>
            <Link
              href={quote.quote_url ?? `/quote/${quote.hash_id}`}
              className="inline-flex h-10 w-10 items-center justify-center border border-border-metallic text-white hover:border-white"
            >
              <ExternalLink aria-hidden className="h-4 w-4" strokeWidth={1.8} />
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
