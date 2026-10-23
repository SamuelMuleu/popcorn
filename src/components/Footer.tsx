import Link from "next/link";

const linkClass = "text-gray-400 hover:text-green-400 transition-colors text-sm";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-950/70 border-t border-gray-800 mt-auto mb-20 md:mb-0">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <p className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <span className="text-2xl" aria-hidden="true">🍿</span> Popcorn
            </p>
            <p className="text-gray-400 text-sm">
              Guia independente para descobrir filmes e séries, saber onde assistir no Brasil e organizar o que
              você já viu.
            </p>
          </div>

          <nav aria-label="Explorar">
            <p className="text-white font-semibold mb-3">Explorar</p>
            <ul className="space-y-2">
              <li><Link href="/movies" className={linkClass}>Filmes e Séries</Link></li>
              <li><Link href="/generos" className={linkClass}>Gêneros</Link></li>
              <li><Link href="/artigos" className={linkClass}>Artigos e guias</Link></li>
              <li><Link href="/search" className={linkClass}>Buscar</Link></li>
            </ul>
          </nav>

          <nav aria-label="Institucional">
            <p className="text-white font-semibold mb-3">Institucional</p>
            <ul className="space-y-2">
              <li><Link href="/about" className={linkClass}>Sobre o Popcorn</Link></li>
              <li><Link href="/contact" className={linkClass}>Contato</Link></li>
              <li><Link href="/privacy" className={linkClass}>Política de Privacidade</Link></li>
              <li><Link href="/terms" className={linkClass}>Termos de Uso</Link></li>
            </ul>
          </nav>

          <div className="col-span-2 md:col-span-1">
            <p className="text-white font-semibold mb-3">Fontes dos dados</p>
            <p className="text-gray-400 text-xs mb-2">
              Dados de filmes e séries:{" "}
              <a href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer" className="underline hover:text-green-400">
                TMDB
              </a>
              . Este produto utiliza a API do TMDB, mas não é endossado ou certificado pelo TMDB.
            </p>
            <p className="text-gray-400 text-xs mb-2">
              Informações de onde assistir:{" "}
              <a href="https://www.justwatch.com/br" target="_blank" rel="noopener noreferrer" className="underline hover:text-green-400">
                JustWatch
              </a>
              .
            </p>
            <p className="text-gray-400 text-xs">Não hospedamos nem indicamos links para conteúdo protegido por direitos autorais.</p>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6">
          <p className="text-gray-500 text-sm">© {currentYear} Popcorn. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
