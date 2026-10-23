import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Termos de Uso",
  description: "Regras de uso do Popcorn: contas, comentários, conteúdo de terceiros e limitações de responsabilidade.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
    return (
        <div className="min-h-screen text-white p-4 md:p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-6">Termos de Uso</h1>

            <div className="space-y-6 text-gray-300">
                <section>
                    <h2 className="text-2xl font-semibold text-white mb-3">1. Aceitação dos Termos</h2>
                    <p>
                        Ao acessar e usar o Popcorn, você concorda em cumprir e estar vinculado a estes
                        Termos de Uso. Se você não concordar com qualquer parte destes termos, não deve
                        usar nosso serviço.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold text-white mb-3">2. Descrição do Serviço</h2>
                    <p>
                        O Popcorn é uma plataforma de descoberta e organização de filmes e séries que permite:
                    </p>
                    <ul className="list-disc list-inside mt-2 ml-4">
                        <li>Pesquisar informações sobre filmes e séries</li>
                        <li>Criar listas de favoritos e assistidos</li>
                        <li>Avaliar e comentar sobre conteúdos</li>
                        <li>Acompanhar seu progresso em séries</li>
                    </ul>
                    <p className="mt-2">
                        <strong>Importante:</strong> Não hospedamos, transmitimos ou fornecemos links para assistir
                        filmes ou séries. Somos apenas uma plataforma de informação e organização.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold text-white mb-3">3. Conta de Usuário</h2>
                    <p>Para usar nossos serviços, você deve:</p>
                    <ul className="list-disc list-inside mt-2 ml-4">
                        <li>Ter pelo menos 13 anos de idade</li>
                        <li>Fornecer informações precisas durante o registro</li>
                        <li>Manter a segurança de sua conta</li>
                        <li>Notificar-nos imediatamente sobre uso não autorizado</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold text-white mb-3">4. Uso Aceitável</h2>
                    <p>Você concorda em NÃO:</p>
                    <ul className="list-disc list-inside mt-2 ml-4">
                        <li>Usar o serviço para fins ilegais</li>
                        <li>Publicar conteúdo ofensivo, difamatório ou inadequado</li>
                        <li>Tentar acessar áreas restritas do sistema</li>
                        <li>Fazer engenharia reversa ou copiar nosso código</li>
                        <li>Criar múltiplas contas para manipular recursos</li>
                        <li>Usar bots ou automação sem autorização</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold text-white mb-3">5. Conteúdo do Usuário</h2>
                    <p>
                        Ao publicar comentários ou avaliações, você:
                    </p>
                    <ul className="list-disc list-inside mt-2 ml-4">
                        <li>Mantém todos os direitos sobre seu conteúdo</li>
                        <li>Nos concede licença para exibir esse conteúdo</li>
                        <li>Garante que possui direitos sobre o que publica</li>
                        <li>Concorda que podemos moderar ou remover conteúdo inadequado</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold text-white mb-3">6. Propriedade Intelectual</h2>
                    <p>
                        As informações sobre filmes e séries são fornecidas pela{" "}
                        <a
                            href="https://www.themoviedb.org/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-green-400 hover:text-green-300 underline"
                        >
                            TMDB API
                        </a>.
                        Todo o conteúdo, design e código do Popcorn são protegidos por direitos autorais.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold text-white mb-3">7. Isenção de Responsabilidade</h2>
                    <p>
                        O serviço é fornecido &quot;como está&quot;. Não garantimos:
                    </p>
                    <ul className="list-disc list-inside mt-2 ml-4">
                        <li>Disponibilidade ininterrupta do serviço</li>
                        <li>Ausência de erros ou bugs</li>
                        <li>Precisão absoluta das informações</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold text-white mb-3">8. Limitação de Responsabilidade</h2>
                    <p>
                        Não seremos responsáveis por danos indiretos, incidentais ou consequentes
                        resultantes do uso ou incapacidade de usar o serviço.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold text-white mb-3">9. Modificações</h2>
                    <p>
                        Reservamo-nos o direito de modificar ou descontinuar o serviço a qualquer momento.
                        Também podemos atualizar estes termos periodicamente.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold text-white mb-3">10. Lei Aplicável</h2>
                    <p>
                        Estes termos são regidos pelas leis brasileiras. Disputas serão resolvidas
                        nos tribunais competentes do Brasil.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold text-white mb-3">11. Contato</h2>
                    <p>
                        Para questões sobre estes termos, entre em contato através da nossa{" "}
                        <a href="/contact" className="text-green-400 hover:text-green-300 underline">
                            página de contato
                        </a>.
                    </p>
                </section>

                <p className="text-sm text-gray-400 mt-8">
                    Última atualização: 23/10/2026
                </p>
            </div>
        </div>
    );
}
