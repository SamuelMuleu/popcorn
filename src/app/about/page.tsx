import type { Metadata } from "next";
import Link from "next/link";
import { MdMovie, MdFavorite, MdComment, MdMenuBook } from "react-icons/md";
import { SITE_OWNER } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sobre o Popcorn",
  description:
    "Conheça o Popcorn, guia independente de filmes e séries criado por Samuel Muleu: de onde vêm os dados, como os artigos são feitos e como o site é mantido.",
  alternates: { canonical: "/about" },
};

const card = "bg-gray-800/50 p-4 rounded-lg";

export default function AboutPage() {
  return (
    <div className="min-h-screen text-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">Sobre o Popcorn 🍿</h1>

        <div className="space-y-8 text-gray-300">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">O que é o Popcorn?</h2>
            <p className="text-lg">
              O Popcorn é um guia independente, feito no Brasil, para quem gosta de filmes e séries. A ideia nasceu de
              uma dúvida comum: <em>&quot;onde está passando aquele filme?&quot;</em>. Aqui você encontra sinopse,
              elenco, trailer, nota do público e os serviços de streaming em que cada título está disponível no Brasil —
              além de guias e listas que eu escrevo.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">O que você encontra aqui</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className={card}>
                <div className="flex items-center gap-2 mb-2">
                  <MdMovie className="text-green-500 text-2xl" aria-hidden="true" />
                  <h3 className="text-xl font-semibold">Informação sobre cada título</h3>
                </div>
                <p>Ficha técnica, elenco, trailer, classificação indicativa e onde assistir no Brasil.</p>
              </div>
              <div className={card}>
                <div className="flex items-center gap-2 mb-2">
                  <MdMenuBook className="text-yellow-500 text-2xl" aria-hidden="true" />
                  <h3 className="text-xl font-semibold">Guias e listas</h3>
                </div>
                <p>
                  <Link href="/artigos" className="text-green-400 underline">Artigos</Link> que ajudam a escolher o que
                  ver e a entender melhor o cinema, além de páginas de{" "}
                  <Link href="/generos" className="text-green-400 underline">gêneros</Link> com explicações próprias.
                </p>
              </div>
              <div className={card}>
                <div className="flex items-center gap-2 mb-2">
                  <MdFavorite className="text-red-500 text-2xl" aria-hidden="true" />
                  <h3 className="text-xl font-semibold">Suas listas</h3>
                </div>
                <p>Com login Google, salve favoritos, marque filmes assistidos e acompanhe episódios de séries.</p>
              </div>
              <div className={card}>
                <div className="flex items-center gap-2 mb-2">
                  <MdComment className="text-blue-500 text-2xl" aria-hidden="true" />
                  <h3 className="text-xl font-semibold">Comunidade</h3>
                </div>
                <p>Comente filmes, séries e episódios e veja a opinião de outras pessoas.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">Quem faz o Popcorn</h2>
            <p>
              Sou {SITE_OWNER}, desenvolvedor e apaixonado por cinema e séries. Criei o Popcorn como um projeto
              pessoal: programo o site e escrevo os artigos, listas e textos de gêneros. O Popcorn não tem vínculo com
              estúdios, distribuidoras ou serviços de streaming.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">Como os textos são feitos</h2>
            <ul className="list-disc list-inside space-y-2 ml-1">
              <li>Artigos, listas e descrições de gêneros são escritos e revisados por mim, com opinião própria.</li>
              <li>Informações factuais (datas, prêmios, elenco) são conferidas em fontes públicas antes da publicação.</li>
              <li>Listas são seleções pessoais: não recebo pagamento para incluir ou destacar títulos.</li>
              <li>
                Encontrou um erro? Avise pela <Link href="/contact" className="text-green-400 underline">página de contato</Link>{" "}
                e eu corrijo o texto, indicando a data da atualização.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">De onde vêm os dados</h2>
            <p>
              Informações sobre filmes e séries (sinopses, elenco, imagens e notas) são fornecidas pelo{" "}
              <a href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:text-green-300 underline">
                The Movie Database (TMDB)
              </a>
              , uma base colaborativa mantida por uma comunidade internacional. Os dados de onde assistir são fornecidos
              pelo{" "}
              <a href="https://www.justwatch.com/br" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:text-green-300 underline">
                JustWatch
              </a>
              .
            </p>
            <p className="mt-2 text-sm text-gray-400">
              Este produto utiliza a API do TMDB, mas não é endossado ou certificado pelo TMDB.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">Como o site se mantém</h2>
            <p>
              O Popcorn é gratuito. Para cobrir os custos de hospedagem e desenvolvimento, o site pode exibir anúncios
              do Google AdSense, sempre identificados como &quot;Publicidade&quot;. Os anúncios não influenciam o
              conteúdo editorial. Veja detalhes na{" "}
              <Link href="/privacy" className="text-green-400 underline">Política de Privacidade</Link>.
            </p>
          </section>

          <section className="bg-green-900/20 p-6 rounded-lg border border-green-700/30">
            <h2 className="text-2xl font-semibold text-white mb-3">Aviso importante</h2>
            <p className="text-yellow-300">
              <strong>O Popcorn NÃO fornece links para assistir filmes ou séries.</strong> Somos uma plataforma de
              informação e organização. Não hospedamos conteúdo protegido por direitos autorais e indicamos apenas
              serviços oficiais de streaming.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">Contato</h2>
            <p>
              Dúvidas, sugestões, correções ou parcerias: fale comigo pela{" "}
              <Link href="/contact" className="text-green-400 hover:text-green-300 underline">página de contato</Link>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
