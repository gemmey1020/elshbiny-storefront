import { ProductDetailsPage } from "@/components/product/ProductDetailsPage";

type PageProps = {
  params: {
    slug: string;
  };
};

export default function Page({ params }: PageProps) {
  return <ProductDetailsPage slug={params.slug} />;
}
