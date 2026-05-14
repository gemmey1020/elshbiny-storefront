import { Suspense } from "react";
import { CatalogPage } from "@/components/catalog/CatalogPage";

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background-obsidian" />}>
      <CatalogPage />
    </Suspense>
  );
}
