import type { Metadata } from "next";
import { QuotePrintPage } from "@/components/quote/QuotePrintPage";

type PageProps = {
  params: {
    hash: string;
  };
};

export function generateMetadata({ params }: PageProps): Metadata {
  return {
    title: `Quote ${params.hash} | عرض سعر ${params.hash} | Elshbiny`,
    description: "Print-friendly Elshbiny quote request page.",
  };
}

export default function Page({ params }: PageProps) {
  return <QuotePrintPage hashId={params.hash} />;
}
