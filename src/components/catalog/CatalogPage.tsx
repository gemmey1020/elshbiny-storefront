"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, SearchX, SlidersHorizontal } from "lucide-react";
import { StealthNavbar } from "@/components/landing/StealthNavbar";
import { Button } from "@/components/ui/Button";
import { MannequinCard } from "@/components/ui/MannequinCard";
import { MannequinLoader } from "@/components/shared/MannequinLoader";
import { FilterSidebar, type CatalogFilters } from "@/components/catalog/FilterSidebar";
import { useLanguage } from "@/i18n/LanguageProvider";
import { categoryName, labelFromValue, pickLocalized } from "@/i18n/config";
import { uiCopy } from "@/i18n/copy";
import { type Category, type PaginatedApiResponse, type Product, listCategories, listProducts } from "@/lib/catalog";
import { useAuthStore } from "@/store/useAuthStore";

const PER_PAGE = 9;

function filtersFromSearch(params: URLSearchParams): CatalogFilters {
  return {
    category: params.get("category") ?? undefined,
    material: params.get("material") ?? undefined,
    gender: params.get("gender") ?? undefined,
    pose: params.get("pose") ?? undefined,
  };
}

function uniqueSpecs(products: Product[], key: string) {
  return Array.from(
    new Set(
      products
        .map((product) => product.technical_specs?.[key])
        .filter((value): value is string | number | boolean => value !== null && value !== undefined && value !== "")
        .map(String),
    ),
  ).sort((a, b) => a.localeCompare(b));
}

function CatalogQuickFilters({
  categories,
  facetOptions,
  filters,
  onFilterChange,
  onClear,
}: {
  categories: Category[];
  facetOptions: { material: string[]; gender: string[]; pose: string[] };
  filters: CatalogFilters;
  onFilterChange: (key: keyof CatalogFilters, value?: string) => void;
  onClear: () => void;
}) {
  const { locale } = useLanguage();
  const activeCount = Object.values(filters).filter(Boolean).length;
  const quickCategories = categories.slice(0, 6);
  const quickMaterials = facetOptions.material.slice(0, 5);

  return (
    <div className="mb-6 border-y border-border-metallic py-4">
      <div className="mb-3 flex items-center justify-between gap-4">
        <p className="text-xs font-semibold uppercase text-accent-platinum">{pickLocalized(locale, { en: "Quick filters", ar: "فلاتر سريعة" })}</p>
        {activeCount > 0 ? (
          <button type="button" onClick={onClear} className="text-xs font-semibold uppercase text-white hover:text-accent-platinum">
            {pickLocalized(locale, uiCopy.common.clearAll)}
          </button>
        ) : null}
      </div>
      <div className="flex gap-2 overflow-x-auto pb-2">
        {quickCategories.map((category) => (
          <button
            key={category.slug}
            type="button"
            onClick={() => onFilterChange("category", filters.category === category.slug ? undefined : category.slug)}
            className={`shrink-0 border px-4 py-2 text-xs font-semibold uppercase transition ${
              filters.category === category.slug ? "border-white bg-white text-background-obsidian" : "border-border-metallic bg-white/[0.03] text-white hover:border-white"
            }`}
          >
            {categoryName(category, locale)}
          </button>
        ))}
        {quickMaterials.map((material) => (
          <button
            key={material}
            type="button"
            onClick={() => onFilterChange("material", filters.material === material ? undefined : material)}
            className={`shrink-0 border px-4 py-2 text-xs font-semibold uppercase transition ${
              filters.material === material ? "border-white bg-white text-background-obsidian" : "border-border-metallic bg-white/[0.03] text-white hover:border-white"
            }`}
          >
            {labelFromValue(material, locale)}
          </button>
        ))}
      </div>
    </div>
  );
}

export function CatalogPage() {
  const { locale } = useLanguage();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const token = useAuthStore((state) => state.token);
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [facetProducts, setFacetProducts] = useState<Product[]>([]);
  const [meta, setMeta] = useState<PaginatedApiResponse<Product>["meta"]>();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const filters = useMemo(() => filtersFromSearch(searchParams), [searchParams]);

  const facetOptions = useMemo(
    () => ({
      material: uniqueSpecs(facetProducts, "material"),
      gender: uniqueSpecs(facetProducts, "gender"),
      pose: uniqueSpecs(facetProducts, "pose"),
    }),
    [facetProducts],
  );

  const pushFilters = useCallback(
    (nextFilters: CatalogFilters) => {
      const params = new URLSearchParams();

      Object.entries(nextFilters).forEach(([key, value]) => {
        if (value) {
          params.set(key, value);
        }
      });

      router.push(`${pathname}${params.toString() ? `?${params.toString()}` : ""}`, { scroll: false });
    },
    [pathname, router],
  );

  const handleFilterChange = useCallback(
    (key: keyof CatalogFilters, value?: string) => {
      pushFilters({ ...filters, [key]: value });
      setPage(1);
      setMobileFiltersOpen(false);
    },
    [filters, pushFilters],
  );

  const handleClear = useCallback(() => {
    pushFilters({});
    setPage(1);
    setMobileFiltersOpen(false);
  }, [pushFilters]);

  useEffect(() => {
    let cancelled = false;

    async function loadFoundation() {
      try {
        const [categoryData, facetData] = await Promise.all([
          listCategories(),
          listProducts({ per_page: 50 }, token),
        ]);

        if (!cancelled) {
          setCategories(categoryData);
          setFacetProducts(facetData.data);
        }
      } catch {
        if (!cancelled) {
          setApiError(pickLocalized(locale, {
            en: "The catalog is taking longer than expected. Check the showroom connection and try again.",
            ar: "الكتالوج أخد وقت أطول من الطبيعي. اتأكد إن السيرفر شغال وجرب تاني.",
          }));
        }
      }
    }

    loadFoundation();

    return () => {
      cancelled = true;
    };
  }, [locale, token]);

  useEffect(() => {
    let cancelled = false;

    async function loadProducts() {
      setLoading(true);
      setApiError(null);

      try {
        const response = await listProducts({ ...filters, page: 1, per_page: PER_PAGE }, token);

        if (!cancelled) {
          setProducts(response.data);
          setMeta(response.meta);
          setPage(1);
        }
      } catch {
        if (!cancelled) {
          setProducts([]);
          setMeta(undefined);
          setApiError(pickLocalized(locale, {
            en: "The product lineup could not load right now.",
            ar: "قائمة المنتجات مش قادرة تتحمل دلوقتي.",
          }));
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadProducts();

    return () => {
      cancelled = true;
    };
  }, [filters, locale, token]);

  async function loadMore() {
    const nextPage = page + 1;
    setLoadingMore(true);

    try {
      const response = await listProducts({ ...filters, page: nextPage, per_page: PER_PAGE }, token);
      setProducts((current) => [...current, ...response.data]);
      setMeta(response.meta);
      setPage(nextPage);
    } catch {
      setApiError(pickLocalized(locale, { en: "The next product group could not load.", ar: "مجموعة المنتجات اللي بعدها مش قادرة تتحمل." }));
    } finally {
      setLoadingMore(false);
    }
  }

  const hasMore = Boolean(meta?.last_page && page < meta.last_page);
  const resultCount = meta?.total ?? products.length;

  return (
    <main className="min-h-screen text-text-primary">
      <StealthNavbar />
      <section className="mx-auto max-w-[1440px] px-5 pb-24 pt-32 md:px-10">
        <div className="grid gap-8 border-b border-border-metallic pb-10 lg:grid-cols-[1fr_420px]">
          <div>
            <p className="text-xs font-semibold uppercase text-accent-platinum">{pickLocalized(locale, { en: "Studio Catalog", ar: "كتالوج الشبيني" })}</p>
            <h1 className="mt-4 max-w-4xl font-headline text-5xl text-white md:text-7xl">
              {pickLocalized(locale, {
                en: "Select retail bodies with production-grade clarity.",
                ar: "اختار المانيكان المناسب لمحلك بوضوح من غير لف.",
              })}
            </h1>
          </div>
          <div className="glass-panel h-fit rounded-md p-5 text-sm text-text-secondary">
            <p>
              {pickLocalized(locale, {
                en: "Browse by retail need first, then refine the material, pose, and display style when the lineup gets specific.",
                ar: "ابدأ من احتياج المحل، وبعدها فلتر بالخامة والوضعية وشكل العرض اللي يناسبك.",
              })}
            </p>
          </div>
        </div>

        <div className="mt-10 flex gap-8">
          <FilterSidebar
            categories={categories}
            filters={filters}
            facetOptions={facetOptions}
            resultCount={resultCount}
            mobileOpen={mobileFiltersOpen}
            onMobileClose={() => setMobileFiltersOpen(false)}
            onFilterChange={handleFilterChange}
            onClear={handleClear}
          />

          <section className="min-w-0 flex-1">
            <CatalogQuickFilters
              categories={categories}
              facetOptions={facetOptions}
              filters={filters}
              onFilterChange={handleFilterChange}
              onClear={handleClear}
            />

            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase text-text-secondary">{pickLocalized(locale, { en: "Showing", ar: "المعروض" })}</p>
                <p className="mt-1 text-2xl font-semibold text-white">
                  {loading ? pickLocalized(locale, uiCopy.common.loading) : `${resultCount} ${pickLocalized(locale, uiCopy.common.products)}`}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(true)}
                className="inline-flex h-11 items-center gap-2 border border-border-metallic px-4 text-sm font-semibold uppercase text-white md:hidden"
              >
                <SlidersHorizontal aria-hidden className="h-4 w-4" strokeWidth={1.8} />
                {pickLocalized(locale, uiCopy.common.filters)}
              </button>
            </div>

            {apiError ? (
              <div className="glass-panel rounded-md p-8">
                <SearchX aria-hidden className="h-8 w-8 text-accent-steel" strokeWidth={1.5} />
                <h2 className="mt-6 font-headline text-3xl text-white">{pickLocalized(locale, { en: "Catalog API waiting room", ar: "الكتالوج مستني الاتصال" })}</h2>
                <p className="mt-3 max-w-2xl text-text-secondary">{apiError}</p>
              </div>
            ) : null}

            {loading ? (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="glass-panel h-[520px] rounded-md">
                    <MannequinLoader className="h-full" label="Loading product line" labelAr="بنحمل المنتجات" compact />
                  </div>
                ))}
              </div>
            ) : null}

            {!loading && !apiError && products.length === 0 ? (
              <div className="glass-panel rounded-md p-8">
                <SearchX aria-hidden className="h-8 w-8 text-accent-steel" strokeWidth={1.5} />
                <h2 className="mt-6 font-headline text-3xl text-white">{pickLocalized(locale, { en: "No matching mannequins", ar: "مفيش مانيكانات مطابقة" })}</h2>
                <p className="mt-3 text-text-secondary">{pickLocalized(locale, { en: "Clear filters or widen the studio search.", ar: "امسح الفلاتر أو وسع اختيارات البحث." })}</p>
              </div>
            ) : null}

            {!loading && products.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                {products.map((product) => (
                  <MannequinCard key={product.id} product={product} />
                ))}
              </div>
            ) : null}

            {hasMore ? (
              <div className="mt-12 flex justify-center">
                <Button icon={ArrowRight} variant="glass" onClick={loadMore} disabled={loadingMore}>
                  {loadingMore ? pickLocalized(locale, { en: "Loading", ar: "جاري التحميل" }) : pickLocalized(locale, { en: "Load More", ar: "اعرض أكتر" })}
                </Button>
              </div>
            ) : null}
          </section>
        </div>
      </section>
    </main>
  );
}
