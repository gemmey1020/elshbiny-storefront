import { apiFetch } from "@/lib/api";

export type QuoteHistoryItem = {
  hash_id: string;
  status: "pending" | "contacted" | "won" | "lost";
  customer_name?: string | null;
  customer_phone?: string | null;
  customer_email?: string | null;
  quote_url?: string;
  items?: Array<{
    quantity: number;
    product_name_snapshot: string;
    sku_snapshot?: string | null;
    unit_price_snapshot?: string | null;
  }>;
};

export async function listMyQuotes(token: string, perPage = 20) {
  const response = await apiFetch<{ data: QuoteHistoryItem[] }>(`/auth/my-quotes?per_page=${perPage}`, { token });

  return response.data;
}
