import type { Metadata } from "next";

// Página pessoal/de login: fora do Google e sem anúncios.
export const metadata: Metadata = {
  title: "Conta",
  robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
