import { apiFetch } from "@/lib/api";

export type ContactRequestPayload = {
  name: string;
  phone: string;
  email?: string;
  company?: string;
  message?: string;
  interest_type?: string;
  source_page?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
};

export async function storeContactRequest(payload: ContactRequestPayload) {
  return apiFetch<{ data: { id: number; status: string } }>("/contact-requests", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
