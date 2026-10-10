"use client";

import { useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { useFitOutStore } from "@/store/useFitOutStore";
import { useInquiryStore } from "@/store/useInquiryStore";
import { generateQuote } from "@/lib/quote";

const CHECKOUT_DELAY_MS = 4000;

function delay(ms: number) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

function appUrl() {
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL.replace(/\/$/, "");
  }

  return window.location.origin;
}

function whatsappNumber() {
  return process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";
}

function whatsappUrl(hashId: string) {
  const number = whatsappNumber();
  if (!number) throw new Error("WhatsApp contact is not configured.");

  const message = encodeURIComponent(
    [
      "Hello Elshbiny Team,",
      "I am requesting a quote for the specifications configured in my session.",
      "",
      `Reference Hash: ${hashId}`,
      `Secure Link: ${appUrl()}/quote/${hashId}`,
      "",
      "Awaiting your consultation.",
    ].join("\n"),
  );

  return `https://wa.me/${number}?text=${message}`;
}

export function useCheckoutPipeline() {
  const [isCompiling, setIsCompiling] = useState(false);
  const [hashData, setHashData] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const items = useInquiryStore((state) => state.items);
  const clearInquiry = useInquiryStore((state) => state.clearInquiry);
  const answers = useFitOutStore((state) => state.answers);
  const clearFitOut = useFitOutStore((state) => state.reset);
  const token = useAuthStore((state) => state.token);

  async function submitToOmega() {
    if (items.length === 0 || isCompiling) {
      return;
    }

    setIsCompiling(true);
    setError(null);

    try {
      const response = await generateQuote(
        {
          omega_trap: "",
          products: items.map((item) => ({
            product_id: item.id,
            quantity: item.quantity || 1,
          })),
          utm_source: "frontend",
          utm_medium: "whatsapp_pipeline",
          utm_campaign: Object.keys(answers).length > 0 ? "fit_out_configured" : "cart_only",
        },
        token,
      );

      const hashId = response.data.hash_id;
      setHashData(hashId);

      await delay(CHECKOUT_DELAY_MS);

      clearInquiry();
      clearFitOut();
      setIsCompiling(false);
      window.location.href = whatsappUrl(hashId);
    } catch (checkoutError) {
      setIsCompiling(false);
      setError(checkoutError instanceof Error ? checkoutError.message : "Unable to generate quote.");
    }
  }

  return {
    submitToOmega,
    isCompiling,
    hashData,
    error,
    primaryItem: items[0] ?? null,
  };
}
