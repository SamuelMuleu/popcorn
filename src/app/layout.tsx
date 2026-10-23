import { ReactNode } from "react";
import { preload } from "react-dom";
import type { Metadata, Viewport } from "next";
import "./globals.css";
import AuthProvider from "@/app/context/AuthContext";
import UserListsProvider from "@/app/context/UserListsContext";
import VideoBackground from "@/components/VideoBackground";
import BottomNav from "@/components/BottomNav";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { ADSENSE_CLIENT, ADSENSE_ENABLED } from "@/lib/adsense";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Popcorn — Filmes e séries: onde assistir, sinopses e guias",
    template: "%s | Popcorn",
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: SITE_NAME,
    title: "Popcorn — Filmes e séries: onde assistir, sinopses e guias",
    description: SITE_DESCRIPTION,
    url: SITE_URL,
  },
  twitter: { card: "summary_large_image" },
  icons: { icon: "/assets/popcorn.svg" },
  robots: { index: true, follow: true },
  ...(ADSENSE_ENABLED ? { other: { "google-adsense-account": ADSENSE_CLIENT } } : {}),
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0b1215",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  preload("/assets/background-poster.jpg", { as: "image", fetchPriority: "high" });
  return (
    <html lang="pt-BR">
      <head>
        {/* Google AdSense (só carrega com NEXT_PUBLIC_ADSENSE_CLIENT definido) */}
        {ADSENSE_ENABLED && (
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
            crossOrigin="anonymous"
          />
        )}
      </head>

      <body className="flex flex-col min-h-screen relative text-white">
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: SITE_NAME,
            url: SITE_URL,
            inLanguage: "pt-BR",
            potentialAction: {
              "@type": "SearchAction",
              target: `${SITE_URL}/search?q={search_term_string}`,
              "query-input": "required name=search_term_string",
            },
          }}
        />
        <VideoBackground
          src="/assets/background-720.mp4"
          poster="/assets/background-poster.jpg"
          overlayOpacity={0.6}
        />

        <AuthProvider>
          <UserListsProvider>
            <Header />
            <main className="flex-1 p-4 z-0">{children}</main>
            <Footer />
            <BottomNav />
          </UserListsProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
