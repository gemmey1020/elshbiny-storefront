import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FaqDetailClient } from "@/components/faq/FaqDetailClient";
import { getFaqBySlug, listFaqs } from "@/data/faqs";

type PageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return listFaqs().map((faq) => ({ slug: faq.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const faq = getFaqBySlug(params.slug);

  if (!faq) {
    return {
      title: "FAQ Not Found | Elshbiny",
    };
  }

  return {
    title: faq.seo_title_en,
    description: faq.seo_description_en,
  };
}

export default function FaqDetailPage({ params }: PageProps) {
  const faq = getFaqBySlug(params.slug);

  if (!faq) {
    notFound();
  }

  const relatedFaqs = listFaqs()
    .filter((item) => item.category === faq.category && item.slug !== faq.slug)
    .slice(0, 3);

  return <FaqDetailClient faq={faq} relatedFaqs={relatedFaqs} />;
}
