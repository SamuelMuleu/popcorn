"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { ADSENSE_CLIENT, ADSENSE_ENABLED } from "@/lib/adsense";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

interface AdSlotProps {
  slot: string;
  className?: string;
}

/**
 * Bloco de anúncio responsivo do AdSense.
 * Não renderiza nada se o AdSense não estiver configurado ou se o slot estiver vazio.
 */
const AdSlot = ({ slot, className = "" }: AdSlotProps) => {
  const ref = useRef<HTMLModElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const el = ref.current;
    if (!el || !ADSENSE_ENABLED || !slot) return;
    // Evita pedir o mesmo anúncio duas vezes (React StrictMode / re-render)
    if (el.getAttribute("data-adsbygoogle-status")) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error("AdSense:", err);
    }
  }, [slot, pathname]);

  if (!ADSENSE_ENABLED || !slot) return null;

  return (
    <div
      className={`w-full max-w-5xl mx-auto my-8 text-center ${className}`}
      aria-label="Publicidade"
    >
      <span className="block text-[10px] uppercase tracking-wider text-gray-400 mb-1">
        Publicidade
      </span>
      <ins
        key={pathname}
        ref={ref}
        className="adsbygoogle block"
        style={{ display: "block" }}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
};

export default AdSlot;
