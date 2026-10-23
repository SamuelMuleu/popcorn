"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaUserNinja, FaSearch } from "react-icons/fa";
import { MdFavorite } from "react-icons/md";
import { PiMonitorPlayFill, PiHouseFill } from "react-icons/pi";
import { motion } from "motion/react";

// Barra inferior estilo app — só no celular (no desktop a navegação fica no Header).
export default function BottomNav() {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;
  const iconClass = (active: boolean) =>
    `${active ? "text-gradientColorStops-custom-green" : "text-white"} hover:scale-125 hover:text-gradientColorStops-custom-green transition-transform`;

  return (
    <motion.nav
      aria-label="Navegação rápida"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="md:hidden fixed bottom-0 left-0 right-0 bg-black/40 backdrop-blur-md border-t border-white/10 p-4 flex justify-around items-center z-50"
    >
      <Link href="/" aria-label="Início" className={iconClass(isActive("/"))}>
        <PiHouseFill size={28} />
      </Link>

      <Link href="/movies" aria-label="Filmes e séries" className={iconClass(isActive("/movies"))}>
        <PiMonitorPlayFill size={28} />
      </Link>

      <Link
        href="/search"
        aria-label="Buscar"
        className="text-white bg-gradient-to-r from-green-500 to-green-600 border border-green-400 rounded-3xl shadow-lg flex items-center justify-center -mt-7 p-4 hover:from-green-400 hover:to-green-500 transition-all duration-300 hover:scale-110"
      >
        <FaSearch size={24} />
      </Link>

      <Link href="/favorites" aria-label="Favoritos" className={iconClass(isActive("/favorites"))}>
        <MdFavorite size={28} />
      </Link>

      <Link
        href="/signin"
        aria-label="Minha conta"
        className={iconClass(isActive("/signin") || isActive("/register"))}
      >
        <FaUserNinja size={28} />
      </Link>
    </motion.nav>
  );
}
