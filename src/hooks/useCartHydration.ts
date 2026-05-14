"use client";

import { useEffect, useMemo, useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { type InquiryItem, useInquiryStore } from "@/store/useInquiryStore";
import { type Product, syncProducts } from "@/lib/catalog";

export type HydratedInquiryItem = InquiryItem & {
  freshProduct?: Product;
  current_price?: string | null;
  is_available: boolean;
  price_status: "public" | "authenticated" | "hidden" | "missing";
};

export function useCartHydration() {
  const items = useInquiryStore((state) => state.items);
  const token = useAuthStore((state) => state.token);
  const [freshProducts, setFreshProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const productIds = useMemo(() => items.map((item) => item.id), [items]);

  useEffect(() => {
    let cancelled = false;

    async function hydrate() {
      if (productIds.length === 0) {
        setFreshProducts([]);
        setIsLoading(false);
        setError(null);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const products = await syncProducts(productIds, token);

        if (!cancelled) {
          setFreshProducts(products);
        }
      } catch {
        if (!cancelled) {
          setFreshProducts([]);
          setError("Unable to sync the cart with the latest backend product data.");
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    hydrate();

    return () => {
      cancelled = true;
    };
  }, [productIds, token]);

  const hydratedItems = useMemo<HydratedInquiryItem[]>(
    () =>
      items.map((item) => {
        const freshProduct = freshProducts.find((product) => product.id === item.id);

        return {
          ...item,
          freshProduct,
          current_price: freshProduct?.base_price ?? null,
          is_available: freshProduct?.is_active ?? false,
          price_status: freshProduct?.price_visibility ?? "missing",
        };
      }),
    [freshProducts, items],
  );

  return {
    hydratedItems,
    isLoading,
    error,
  };
}
