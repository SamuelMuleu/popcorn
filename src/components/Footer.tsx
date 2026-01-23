import Link from "next/link";
import { MdFavorite } from "react-icons/md";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-900/50 border-t border-gray-800 mt-auto">
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Brand */}
                    <div>
                        <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                            <span className="text-2xl">🍿</span> Popcorn
                        </h3>
                        <p className="text-gray-400 text-sm">
                            Sua plataforma completa para descobrir, organizar e discutir filmes e séries.
                        </p>
                    </div>

                    {/* Links Legais */}
                    <div>
                        <h4 className="text-white font-semibold mb-3">Legal</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="/privacy"
                                    className="text-gray-400 hover:text-green-400 transition-colors text-sm"
                                >
                                    Política de Privacidade
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/terms"
                                    className="text-gray-400 hover:text-green-400 transition-colors text-sm"
                                >
                                    Termos de Uso
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/about"
                                    className="text-gray-400 hover:text-green-400 transition-colors text-sm"
                                >
                                    Sobre Nós
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/contact"
                                    className="text-gray-400 hover:text-green-400 transition-colors text-sm"
                                >
                                    Contato
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Info */}
                    <div>
                        <h4 className="text-white font-semibold mb-3">Informações</h4>
                        <p className="text-gray-400 text-xs mb-2">
                            Este produto utiliza a API do TMDB, mas não é endossado ou certificado pelo TMDB.
                        </p>
                        <p className="text-gray-400 text-xs">
                            Não hospedamos conteúdo protegido por direitos autorais.
                        </p>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-500 text-sm">
                        © {currentYear} Popcorn. Todos os direitos reservados.
                    </p>
                    <p className="text-gray-500 text-sm flex items-center gap-1">
                        Feito com <MdFavorite className="text-red-500" /> para cinéfilos
                    </p>
                </div>
            </div>
        </footer>
    );
}
