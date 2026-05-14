import { apiFetch } from "@/lib/api";

export type FitOutOption = {
  label_en: string;
  label_ar?: string | null;
  value: string;
  description_en?: string | null;
  description_ar?: string | null;
};

export type FitOutQuestion = {
  id: number;
  step: number;
  question_en: string;
  question_ar?: string | null;
  options: FitOutOption[];
  is_active: boolean;
};

export async function listFitOutQuestions() {
  const response = await apiFetch<{ data: FitOutQuestion[] }>("/fit-out-engine");

  return response.data;
}
