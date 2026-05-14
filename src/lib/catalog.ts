import { apiFetch } from "@/lib/api";

export type PriceVisibility = "public" | "authenticated" | "hidden";

export type Category = {
  id: number;
  name_en: string;
  name_ar?: string | null;
  slug: string;
  description_en?: string | null;
  description_ar?: string | null;
  products_count?: number;
};

export type ProductMedia = {
  tiny_float_url?: string | null;
  catalog_url?: string | null;
  zoom_url?: string | null;
};

export type ProductSpecs = Record<string, string | number | boolean | null | undefined>;

export type Product = {
  id: number;
  name_en: string;
  name_ar?: string | null;
  slug: string;
  sku?: string | null;
  base_price?: string | null;
  price_visibility: PriceVisibility;
  technical_specs?: ProductSpecs | null;
  is_active?: boolean;
  category?: Category | string | null;
  media?: ProductMedia | null;
  cross_sell?: Product[];
};

export type PaginatedApiResponse<T> = {
  data: T[];
  links?: Record<string, string | null>;
  meta?: {
    current_page?: number;
    last_page?: number;
    per_page?: number;
    total?: number;
    from?: number | null;
    to?: number | null;
  };
};

export type ProductListFilters = {
  category?: string;
  material?: string;
  gender?: string;
  pose?: string;
  page?: number;
  per_page?: number;
};

type SingleApiResponse<T> = {
  data: T;
};

function cleanFilters(filters: ProductListFilters) {
  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && String(value).trim() !== "") {
      params.set(key, String(value));
    }
  });

  return params.toString();
}

export async function listCategories() {
  const response = await apiFetch<{ data: Category[] }>("/categories");

  return response.data;
}

export async function listProducts(filters: ProductListFilters = {}) {
  const query = cleanFilters(filters);

  return apiFetch<PaginatedApiResponse<Product>>(`/products${query ? `?${query}` : ""}`);
}

export async function getProduct(slug: string) {
  const response = await apiFetch<SingleApiResponse<Product>>(`/products/${slug}`);

  return response.data;
}

export async function syncProducts(ids: number[], token?: string | null) {
  if (ids.length === 0) {
    return [];
  }

  const uniqueIds = Array.from(new Set(ids)).join(",");
  const response = await apiFetch<{ data: Product[] }>(`/products/sync?ids=${uniqueIds}`, { token });

  return response.data;
}

export function mediaImage(product: Product, preferred: keyof ProductMedia = "catalog_url") {
  return (
    product.media?.[preferred] ??
    product.media?.catalog_url ??
    product.media?.tiny_float_url ??
    product.media?.zoom_url ??
    null
  );
}

export function categoryLabel(category: Product["category"]) {
  if (!category) {
    return "Studio Object";
  }

  if (typeof category === "string") {
    return category;
  }

  return category.name_en;
}

export function formatSpecLabel(key: string) {
  return key.replace(/_/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export function visibleSpecEntries(specs?: ProductSpecs | null) {
  return Object.entries(specs ?? {}).filter(([, value]) => value !== null && value !== undefined && value !== "");
}
