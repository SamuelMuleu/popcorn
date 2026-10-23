// Dados gerais do site. Troque NEXT_PUBLIC_SITE_URL quando tiver o domínio próprio.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://popcornview.netlify.app").replace(/\/$/, "");
export const SITE_NAME = "Popcorn";
export const SITE_DESCRIPTION =
  "Descubra filmes e séries, veja onde assistir no Brasil, sinopses, elenco e trailers, leia guias e listas, e organize o que você já assistiu.";

// Opcionais: aparecem nas páginas Sobre e Contato quando definidos.
export const SITE_OWNER = process.env.NEXT_PUBLIC_SITE_OWNER || "Samuel Muleu";
export const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "";

export const absoluteUrl = (path = "/") => `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
