import { ReactNode } from "react";
import "./globals.css";
import AuthProvider from "@/app/context/AuthContext";
import VideoBackground from "@/components/VideoBackground";
import BottomNav from "@/components/BottomNav";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Popcorn</title>
        <link rel="icon" href="/assets/popcorn.svg" />
      </head>

      <body className="flex flex-col min-h-screen relative text-white">
        {/* Vídeo de fundo otimizado */}
        <VideoBackground src="/assets/example.mp4" overlayOpacity={0.6} />

        <AuthProvider>
          <main className="flex-1 p-4 z-0 mb-24">
            {children}
          </main>

          {/* Navegação inferior */}
          <BottomNav />
        </AuthProvider>
      </body>
    </html>
  );
};

export default Layout;