// Configuração do Google AdSense.
// Tudo fica desligado enquanto NEXT_PUBLIC_ADSENSE_CLIENT não estiver definido,
// então o site funciona normalmente antes da conta ser aprovada.

export const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT || ""; // ex.: ca-pub-1234567890123456

export const ADSENSE_ENABLED = /^ca-pub-\d{10,}$/.test(ADSENSE_CLIENT);

// IDs dos blocos de anúncio criados no painel do AdSense (Anúncios > Por bloco de anúncios).
// Se um bloco específico não for definido, usa o NEXT_PUBLIC_ADSENSE_SLOT_DEFAULT.
const DEFAULT_SLOT = process.env.NEXT_PUBLIC_ADSENSE_SLOT_DEFAULT || "";

export const AD_SLOTS = {
  home: process.env.NEXT_PUBLIC_ADSENSE_SLOT_HOME || DEFAULT_SLOT,
  movies: process.env.NEXT_PUBLIC_ADSENSE_SLOT_MOVIES || DEFAULT_SLOT,
  details: process.env.NEXT_PUBLIC_ADSENSE_SLOT_DETAILS || DEFAULT_SLOT,
  search: process.env.NEXT_PUBLIC_ADSENSE_SLOT_SEARCH || DEFAULT_SLOT,
  article: process.env.NEXT_PUBLIC_ADSENSE_SLOT_ARTICLE || DEFAULT_SLOT,
  genre: process.env.NEXT_PUBLIC_ADSENSE_SLOT_GENRE || DEFAULT_SLOT,
};
