import { apiFetch } from "@/lib/api";

type QuoteProductPayload = {
  product_id: number;
  quantity: number;
};

export type QuoteGeneratePayload = {
  omega_trap: "";
  products: QuoteProductPayload[];
  customer_name?: string;
  customer_phone?: string;
  customer_email?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
};

export type QuoteGenerateResponse = {
  data: {
    hash_id: string;
    status: string;
    quote_url?: string;
    whatsapp_payload?: {
      message?: string;
    };
  };
  meta?: {
    message?: string;
  };
};

export function generateQuote(payload: QuoteGeneratePayload, token?: string | null) {
  return apiFetch<QuoteGenerateResponse>("/quote/generate", {
    method: "POST",
    token,
    body: JSON.stringify(payload),
  });
}
