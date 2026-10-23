"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaUserNinja, FaSearch } from "react-icons/fa";
import { MdFavorite } from "react-icons/md";
import { PiMonitorPlayFill, PiHouseFill } from "react-icons/pi";

// Barra inferior estilo app — só no celular (no desktop a navegação fica no Header).
export default function BottomNav() {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;
  const iconClass = (active: boolean) =>
    `inline-flex h-11 w-11 items-center justify-center rounded-full ${active ? "text-gradientColorStops-custom-green" : "text-white"} hover:text-gradientColorStops-custom-green focus-visible:outline focus-visible:outline-2 focus-visible:outline-green-400`;

  return (
    <nav
      aria-label="Navegação rápida"
      className="md:hidden fixed bottom-0 left-0 right-0 bg-black/40 backdrop-blur-md border-t border-white/10 p-4 flex justify-around items-center z-50"
    >
      <Link prefetch={false} href="/" aria-label="Início" className={iconClass(isActive("/"))}>
        <PiHouseFill size={28} />
      </Link>

      <Link prefetch={false} href="/movies" aria-label="Filmes e séries" className={iconClass(isActive("/movies"))}>
        <PiMonitorPlayFill size={28} />
      </Link>

      <Link
        prefetch={false}
        href="/search"
        aria-label="Buscar"
        className="text-white bg-gradient-to-r from-green-600 to-green-700 border border-green-500 rounded-3xl shadow-lg flex items-center justify-center -mt-7 p-4 hover:from-green-500 hover:to-green-600 transition-all duration-300 hover:scale-110"
      >
        <FaSearch size={24} />
      </Link>

      <Link prefetch={false} href="/favorites" aria-label="Favoritos" className={iconClass(isActive("/favorites"))}>
        <MdFavorite size={28} />
      </Link>

      <Link
        prefetch={false}
        href="/signin"
        aria-label="Minha conta"
        className={iconClass(isActive("/signin") || isActive("/register"))}
      >
        <FaUserNinja size={28} />
      </Link>
    </nav>
  );
}
