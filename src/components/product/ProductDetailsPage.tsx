"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ClipboardList, LockKeyhole, Plus, ShieldCheck } from "lucide-react";
import { StealthNavbar } from "@/components/landing/StealthNavbar";
import { Button } from "@/components/ui/Button";
import { CrossSellGallery } from "@/components/product/CrossSellGallery";
import { ZoomImage } from "@/components/product/ZoomImage";
import { useLanguage } from "@/i18n/LanguageProvider";
import { categoryName, formatSpecLabel, priceCopy, productName } from "@/i18n/config";
import { useInquiryStore } from "@/store/useInquiryStore";
import { type Product, getProduct, mediaImage, visibleSpecEntries } from "@/lib/catalog";

type ProductDetailsPageProps = {
  slug: string;
};

function thumbnailSources(product: Product) {
  return Array.from(
    new Set(
      [product.media?.catalog_url, product.media?.tiny_float_url, product.media?.zoom_url].filter(
        (value): value is string => Boolean(value),
      ),
    ),
  );
}

export function ProductDetailsPage({ slug }: ProductDetailsPageProps) {
  const { locale } = useLanguage();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState<string | null>(null);
  const [added, setAdded] = useState(false);
  const addItem = useInquiryStore((state) => state.addItem);

  useEffect(() => {
    let cancelled = false;

    async function loadProduct() {
      setLoading(true);
      setApiError(null);

      try {
        const data = await getProduct(slug);

        if (!cancelled) {
          setProduct(data);
          setSelectedImage(mediaImage(data, "catalog_url"));
        }
      } catch {
        if (!cancelled) {
          setProduct(null);
          setApiError(locale === "ar" ? "تفاصيل المنتج مش قادرة تتحمل من السيرفر." : "Product details could not load from /api/v1/products/{slug}.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadProduct();

    return () => {
      cancelled = true;
    };
  }, [slug, locale]);

  const thumbnails = useMemo(() => (product ? thumbnailSources(product) : []), [product]);
  const specEntries = useMemo(() => visibleSpecEntries(product?.technical_specs), [product]);
  const isGated = Boolean(product && !product.base_price && product.price_visibility === "authenticated");
  const isHidden = Boolean(product && !product.base_price && product.price_visibility === "hidden");
  const visibleName = product ? productName(product, locale) : "";

  function handleAddToInquiry() {
    if (!product) {
      return;
    }

    addItem({
      id: product.id,
      slug: product.slug,
      name_en: product.name_en,
      name_ar: product.name_ar,
      sku: product.sku,
      base_price: product.base_price,
      price_visibility: product.price_visibility,
      image_tiny: product.media?.tiny_float_url ?? product.media?.catalog_url ?? null,
    });
    setAdded(true);
  }

  return (
    <main className="min-h-screen text-text-primary">
      <StealthNavbar />
      <section className="mx-auto max-w-[1440px] px-5 pb-24 pt-32 md:px-10">
        <Link href="/catalog" className="inline-flex items-center gap-2 text-sm font-semibold uppercase text-text-secondary hover:text-white">
          <ArrowLeft aria-hidden className="h-4 w-4" strokeWidth={1.8} />
          {locale === "ar" ? "ارجع للكتالوج" : "Back to catalog"}
        </Link>

        {loading ? (
          <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,0.94fr)_minmax(360px,0.7fr)]">
            <div className="glass-panel aspect-[3/4] animate-pulse rounded-md bg-white/[0.02]" />
            <div className="glass-panel h-[540px] animate-pulse rounded-md bg-white/[0.02]" />
          </div>
        ) : null}

        {apiError ? (
          <div className="glass-panel mt-10 rounded-md p-8">
            <h1 className="font-headline text-4xl text-white">{locale === "ar" ? "المعرض مستني الاتصال" : "Showroom API waiting room"}</h1>
            <p className="mt-3 text-text-secondary">{apiError}</p>
          </div>
        ) : null}

        {!loading && product ? (
          <>
            <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,0.94fr)_minmax(360px,0.7fr)]">
              <div className="space-y-4">
                <ZoomImage catalogUrl={selectedImage ?? mediaImage(product, "catalog_url")} zoomUrl={product.media?.zoom_url} alt={visibleName} />
                {thumbnails.length > 1 ? (
                  <div className="grid grid-cols-3 gap-3">
                    {thumbnails.map((source) => {
                      const active = selectedImage === source;

                      return (
                        <button
                          key={source}
                          type="button"
                          onClick={() => setSelectedImage(source)}
                          className={`relative aspect-[4/3] overflow-hidden border transition ${
                            active ? "border-accent-white" : "border-border-metallic hover:border-white"
                          }`}
                        >
                          <Image src={source} alt={visibleName} fill unoptimized sizes="160px" className="object-cover" />
                        </button>
                      );
                    })}
                  </div>
                ) : null}
              </div>

              <aside className="glass-panel h-fit rounded-md p-6 md:p-8">
                <p className="text-xs font-semibold uppercase text-accent-platinum">{categoryName(product.category, locale)}</p>
                <h1 className="mt-4 font-headline text-5xl text-white md:text-6xl">{visibleName}</h1>
                {locale === "en" && product.name_ar ? <p className="mt-3 text-lg text-text-secondary">{product.name_ar}</p> : null}

                <div className="mt-6 grid grid-cols-2 gap-3 border-y border-border-metallic py-5">
                  <div>
                    <p className="text-xs uppercase text-text-secondary">SKU</p>
                    <p className="rtl-ltr mt-1 text-sm font-semibold text-white">{product.sku ?? (locale === "ar" ? "قيد التجهيز" : "Pending")}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase text-text-secondary">{locale === "ar" ? "السعر" : "Pricing"}</p>
                    <p className="mt-1 text-sm font-semibold text-white">
                      {priceCopy(locale, product.price_visibility, product.base_price)}
                    </p>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  {isGated ? (
                    <Button href="/login" icon={LockKeyhole} className="w-full">
                      {locale === "ar" ? "سجل دخولك علشان تشوف السعر" : "Login to View Price"}
                    </Button>
                  ) : (
                    <>
                      <Button icon={isHidden ? ClipboardList : Plus} className="w-full" onClick={handleAddToInquiry}>
                        {added
                          ? locale === "ar" ? "اتضاف للاستفسار" : "Added to Inquiry"
                          : isHidden
                            ? locale === "ar" ? "اطلب عرض سعر خاص" : "Request Private Quote"
                            : locale === "ar" ? "ضيف للاستفسار" : "Add to Inquiry"}
                      </Button>
                      {added ? (
                        <Button href="/inquiry" icon={ClipboardList} variant="glass" className="w-full">
                          {locale === "ar" ? "راجع الاستفسار" : "Review Inquiry"}
                        </Button>
                      ) : null}
                    </>
                  )}
                  <div className="flex items-start gap-3 border border-border-metallic bg-white/[0.02] p-4 text-sm text-text-secondary">
                    <ShieldCheck aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-accent-steel" strokeWidth={1.8} />
                    {locale === "ar"
                      ? "طلب عرض السعر بيبعت رقم المنتج ولقطة من بياناته علشان فريق الشبيني يراجع الطلب بوضوح."
                      : "Quote requests carry product id and a snapshot through the backend quote engine in the next pipeline wave."}
                  </div>
                </div>
              </aside>
            </div>

            <section className="mt-14 grid gap-6 lg:grid-cols-[0.7fr_1fr]">
              <div>
                <p className="text-xs font-semibold uppercase text-accent-platinum">{locale === "ar" ? "المواصفات" : "Spec Matrix"}</p>
                <h2 className="mt-3 font-headline text-4xl text-white">{locale === "ar" ? "مراجعة التفاصيل الفنية" : "Technical inspection"}</h2>
              </div>
              <div className="glass-panel rounded-md">
                {specEntries.length > 0 ? (
                  <dl className="divide-y divide-border-metallic">
                    {specEntries.map(([key, value]) => (
                      <div key={key} className="grid gap-2 p-4 md:grid-cols-[220px_1fr]">
                        <dt className="text-xs font-semibold uppercase text-text-secondary">{formatSpecLabel(key, locale)}</dt>
                        <dd className="text-sm text-white">{String(value)}</dd>
                      </div>
                    ))}
                  </dl>
                ) : (
                  <p className="p-5 text-sm text-text-secondary">
                    {locale === "ar" ? "المواصفات الفنية لسه مش متاحة للقطعة دي." : "Technical specs are not available for this item yet."}
                  </p>
                )}
              </div>
            </section>

            <CrossSellGallery products={product.cross_sell} />
          </>
        ) : null}
      </section>
    </main>
  );
}
