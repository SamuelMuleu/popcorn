import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description: "Saiba quais dados o Popcorn coleta, como usamos cookies e publicidade (Google AdSense) e quais são seus direitos pela LGPD.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
    return (
        <div className="min-h-screen text-white p-4 md:p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-6">Política de Privacidade</h1>

            <div className="space-y-6 text-gray-300">
                <section>
                    <h2 className="text-2xl font-semibold text-white mb-3">1. Informações que Coletamos</h2>
                    <p>
                        O Popcorn coleta informações quando você se registra usando sua conta Google, incluindo:
                    </p>
                    <ul className="list-disc list-inside mt-2 ml-4">
                        <li>Nome completo</li>
                        <li>Endereço de e-mail</li>
                        <li>Foto de perfil</li>
                        <li>Preferências de filmes e séries</li>
                        <li>Histórico de visualização e favoritos</li>
                    </ul>
                    <p className="mt-2">
                        Se você usar o formulário de contato, recebemos o nome, o e-mail e a mensagem enviados, apenas
                        para responder ao seu contato. Visitantes que não fazem login podem navegar pelo site sem fornecer
                        dados pessoais.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold text-white mb-3">2. Como Usamos Suas Informações</h2>
                    <p>Utilizamos suas informações para:</p>
                    <ul className="list-disc list-inside mt-2 ml-4">
                        <li>Personalizar sua experiência no site</li>
                        <li>Salvar suas preferências e listas</li>
                        <li>Melhorar nossos serviços</li>
                        <li>Enviar notificações relevantes (se habilitado)</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold text-white mb-3">3. Cookies e Tecnologias Similares</h2>
                    <p>
                        Utilizamos cookies e tecnologias similares para melhorar sua experiência. Isso inclui:
                    </p>
                    <ul className="list-disc list-inside mt-2 ml-4">
                        <li>Cookies de autenticação (Firebase)</li>
                        <li>Cookies de preferências do usuário</li>
                        <li>Google AdSense (cookies de publicidade)</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold text-white mb-3">Publicidade (Google AdSense)</h2>
                    <p>
                        Este site exibe anúncios fornecidos pelo Google AdSense. Fornecedores terceiros,
                        incluindo o Google, usam cookies para veicular anúncios com base em visitas
                        anteriores do usuário a este e a outros sites.
                    </p>
                    <p className="mt-2">
                        O uso de cookies de publicidade permite que o Google e seus parceiros exibam
                        anúncios com base nas suas visitas a este e/ou a outros sites na Internet.
                        Você pode desativar a publicidade personalizada nas{" "}
                        <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:text-green-300 underline">
                            Configurações de anúncios do Google
                        </a>{" "}
                        ou em{" "}
                        <a href="https://www.aboutads.info/choices" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:text-green-300 underline">
                            www.aboutads.info
                        </a>.
                    </p>
                    <p className="mt-2">
                        Saiba mais em{" "}
                        <a href="https://policies.google.com/technologies/ads?hl=pt-BR" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:text-green-300 underline">
                            Como o Google usa cookies em publicidade
                        </a>.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold text-white mb-3">4. Compartilhamento de Dados</h2>
                    <p>
                        Não vendemos suas informações pessoais. Compartilhamos dados apenas com:
                    </p>
                    <ul className="list-disc list-inside mt-2 ml-4">
                        <li><strong>Google Firebase:</strong> Para autenticação e armazenamento</li>
                        <li><strong>TMDB API:</strong> Para obter informações sobre filmes e séries</li>
                        <li><strong>Google AdSense:</strong> Para exibição de anúncios personalizados</li>
                        <li><strong>Netlify:</strong> Hospedagem do site e recebimento das mensagens do formulário de contato</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold text-white mb-3">5. Seus Direitos (LGPD/GDPR)</h2>
                    <p>Você tem direito a:</p>
                    <ul className="list-disc list-inside mt-2 ml-4">
                        <li>Acessar seus dados pessoais</li>
                        <li>Corrigir dados incorretos</li>
                        <li>Solicitar exclusão de sua conta</li>
                        <li>Retirar consentimento a qualquer momento</li>
                        <li>Portabilidade dos seus dados</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold text-white mb-3">6. Segurança</h2>
                    <p>
                        Implementamos medidas de segurança para proteger suas informações, incluindo
                        criptografia SSL e armazenamento seguro no Firebase.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold text-white mb-3">7. Alterações nesta Política</h2>
                    <p>
                        Podemos atualizar esta política periodicamente. Recomendamos que você revise
                        esta página regularmente para se manter informado.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold text-white mb-3">8. Contato</h2>
                    <p>
                        Para questões sobre privacidade, entre em contato através da nossa{" "}
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
