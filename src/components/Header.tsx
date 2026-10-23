"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";

const LINKS = [
  { href: "/", label: "Início" },
  { href: "/movies", label: "Filmes e Séries" },
  { href: "/generos", label: "Gêneros" },
  { href: "/artigos", label: "Artigos" },
  { href: "/search", label: "Buscar" },
];

export default function Header() {
  const pathname = usePathname();
  const { user } = useAuth();

  const active = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-40 bg-black/40 backdrop-blur-md border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center gap-4">
        <Link href="/" className="flex items-center gap-2 font-black text-lg shrink-0">
          <span aria-hidden="true">🍿</span> Popcorn
        </Link>

        <nav
          aria-label="Navegação principal"
          className="flex-1 overflow-x-auto scrollbar-none [mask-image:linear-gradient(to_right,black_80%,transparent)] md:[mask-image:none]"
        >
          <ul className="flex items-center gap-1 text-sm whitespace-nowrap">
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={active(l.href) ? "page" : undefined}
                  className={`px-3 py-2 rounded-md transition-colors ${
                    active(l.href) ? "text-green-400 bg-white/5" : "text-gray-200 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <Link
          href={user ? "/favorites" : "/signin"}
          className="hidden md:inline-flex shrink-0 text-sm px-3 py-1.5 rounded-md border border-green-500/60 text-green-300 hover:bg-green-500/10"
        >
          {user ? "Minhas listas" : "Entrar"}
        </Link>
      </div>
    </header>
  );
}
