import type { Metadata } from "next";
import { Suspense } from "react";
import SearchClient from "@/components/SearchClient";

export const metadata: Metadata = {
  title: "Buscar filmes e séries",
  description: "Pesquise qualquer filme ou série pelo título em português ou original e veja onde assistir no Brasil.",
  alternates: { canonical: "/search" },
  // Resultados de busca não devem ser indexados (conteúdo repetido); os links continuam sendo seguidos.
  robots: { index: false, follow: true },
};

export default function SearchPage() {
  return (
    <Suspense fallback={<p className="text-center mt-10">Carregando busca...</p>}>
      <SearchClient />
    </Suspense>
  );
}
