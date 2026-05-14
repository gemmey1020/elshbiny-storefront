"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type InquiryItem = {
  id: number;
  slug?: string;
  name_en: string;
  name_ar?: string | null;
  sku?: string | null;
  quantity: number;
  base_price?: string | null;
  price_visibility?: "public" | "authenticated" | "hidden";
  image_tiny?: string | null;
};

type InquiryStore = {
  items: InquiryItem[];
  addItem: (product: Omit<InquiryItem, "quantity"> & { quantity?: number }) => void;
  removeItem: (id: number) => void;
  setQuantity: (id: number, quantity: number) => void;
  clearInquiry: () => void;
  totalItems: () => number;
};

export const useInquiryStore = create<InquiryStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product) =>
        set((state) => {
          const exists = state.items.some((item) => item.id === product.id);
          if (exists) {
            return state;
          }

          return {
            items: [
              ...state.items,
              {
                ...product,
                quantity: Math.max(1, product.quantity ?? 1),
              },
            ],
          };
        }),
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),
      setQuantity: (id, quantity) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item,
          ),
        })),
      clearInquiry: () => set({ items: [] }),
      totalItems: () => get().items.reduce((total, item) => total + item.quantity, 0),
    }),
    { name: "omega-inquiry-cache" },
  ),
);
