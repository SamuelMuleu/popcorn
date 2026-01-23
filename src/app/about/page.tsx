"use client";

import { MdMovie, MdFavorite, MdComment, MdTrendingUp } from "react-icons/md";

export default function AboutPage() {
    return (
        <div className="min-h-screen text-white p-4 md:p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl md:text-4xl font-bold mb-6">Sobre o Popcorn 🍿</h1>

                <div className="space-y-8 text-gray-300">
                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-3">O que é o Popcorn?</h2>
                        <p className="text-lg">
                            O Popcorn é sua plataforma completa para descobrir, organizar e discutir filmes e séries.
                            Criada para cinéfilos e amantes de séries, oferecemos ferramentas para você nunca mais
                            perder o controle do que assistiu e do que ainda quer ver!
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">Recursos Principais</h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="bg-gray-800/50 p-4 rounded-lg">
                                <div className="flex items-center gap-2 mb-2">
                                    <MdMovie className="text-green-500 text-2xl" />
                                    <h3 className="text-xl font-semibold">Descoberta</h3>
                                </div>
                                <p>
                                    Explore milhares de filmes e séries com informações detalhadas, trailers,
                                    avaliações e onde assistir.
                                </p>
                            </div>

                            <div className="bg-gray-800/50 p-4 rounded-lg">
                                <div className="flex items-center gap-2 mb-2">
                                    <MdFavorite className="text-red-500 text-2xl" />
                                    <h3 className="text-xl font-semibold">Listas Personalizadas</h3>
                                </div>
                                <p>
                                    Crie suas listas de favoritos e acompanhe o que já assistiu.
                                    Marque episódios completos e veja seu progresso nas séries.
                                </p>
                            </div>

                            <div className="bg-gray-800/50 p-4 rounded-lg">
                                <div className="flex items-center gap-2 mb-2">
                                    <MdComment className="text-blue-500 text-2xl" />
                                    <h3 className="text-xl font-semibold">Comunidade</h3>
                                </div>
                                <p>
                                    Compartilhe suas opiniões! Comente sobre filmes, séries e episódios.
                                    Veja o que outros fãs estão dizendo.
                                </p>
                            </div>

                            <div className="bg-gray-800/50 p-4 rounded-lg">
                                <div className="flex items-center gap-2 mb-2">
                                    <MdTrendingUp className="text-yellow-500 text-2xl" />
                                    <h3 className="text-xl font-semibold">Tendências</h3>
                                </div>
                                <p>
                                    Fique por dentro do que está em alta. Descubra os lançamentos
                                    e os conteúdos mais populares do momento.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-3">Como Funciona?</h2>
                        <ol className="list-decimal list-inside space-y-2 ml-4">
                            <li>Faça login com sua conta Google</li>
                            <li>Pesquise filmes e séries que você gosta</li>
                            <li>Adicione aos favoritos e marque como assistido</li>
                            <li>Acompanhe episódios de séries</li>
                            <li>Deixe comentários e veja opiniões da comunidade</li>
                        </ol>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-3">Fonte dos Dados</h2>
                        <p>
                            Todas as informações sobre filmes e séries são fornecidas pela{" "}
                            <a
                                href="https://www.themoviedb.org/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-green-400 hover:text-green-300 underline"
                            >
                                The Movie Database (TMDB)
                            </a>
                            , uma das maiores bases de dados de entretenimento do mundo.
                        </p>
                        <p className="mt-2 text-sm text-gray-400">
                            Este produto utiliza a API do TMDB, mas não é endossado ou certificado pelo TMDB.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-3">Tecnologias</h2>
                        <p>O Popcorn é construído com tecnologias modernas:</p>
                        <ul className="list-disc list-inside mt-2 ml-4">
                            <li>Next.js 15 - Framework React</li>
                            <li>Firebase - Autenticação e banco de dados</li>
                            <li>Tailwind CSS - Estilização</li>
                            <li>TMDB API - Dados de filmes e séries</li>
                        </ul>
                    </section>

                    <section className="bg-green-900/20 p-6 rounded-lg border border-green-700/30">
                        <h2 className="text-2xl font-semibold text-white mb-3">Aviso Importante</h2>
                        <p className="text-yellow-300">
                            <strong>O Popcorn NÃO fornece links para assistir filmes ou séries.</strong> Somos apenas
                            uma plataforma de informação e organização. Não hospedamos conteúdo protegido por direitos
                            autorais e incentivamos o uso de serviços legais de streaming.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-3">Contato</h2>
                        <p>
                            Tem alguma dúvida, sugestão ou feedback? Entre em contato através da nossa{" "}
                            <a href="/contact" className="text-green-400 hover:text-green-300 underline">
                                página de contato
                            </a>.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
