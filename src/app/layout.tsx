import { ReactNode } from "react";
import "./globals.css";
import AuthProvider from "@/app/context/AuthContext";
import VideoBackground from "@/components/VideoBackground";
import BottomNav from "@/components/BottomNav";
import Footer from "@/components/Footer";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* SEO Meta Tags */}
        <title>Popcorn - Descubra e Organize Filmes e Séries</title>
        <meta name="description" content="Plataforma completa para descobrir, organizar e discutir filmes e séries. Crie listas de favoritos, acompanhe seu progresso em séries e compartilhe opiniões com a comunidade." />
        <meta name="keywords" content="filmes, séries, streaming, TMDB, avaliações, recomendações, favoritos, assistir, cinema, tv shows" />
        <meta name="author" content="Popcorn" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Popcorn - Descubra e Organize Filmes e Séries" />
        <meta property="og:description" content="Plataforma completa para descobrir, organizar e discutir filmes e séries." />
        <meta property="og:site_name" content="Popcorn" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Popcorn - Descubra e Organize Filmes e Séries" />
        <meta name="twitter:description" content="Plataforma completa para descobrir, organizar e discutir filmes e séries." />

        {/* Favicon */}
        <link rel="icon" href="/assets/popcorn.svg" />
      </head>

      <body className="flex flex-col min-h-screen relative text-white">
        {/* Vídeo de fundo otimizado */}
        <VideoBackground src="/assets/example.mp4" overlayOpacity={0.6} />

        <AuthProvider>
          <main className="flex-1 p-4 z-0 mb-24">
            {children}
          </main>

          {/* Footer */}
          <Footer />

          {/* Navegação inferior */}
          <BottomNav />
        </AuthProvider>
      </body>
    </html>
  );
};

export default Layout;