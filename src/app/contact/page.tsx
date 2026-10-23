import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import { CONTACT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contato",
  description: "Fale com o Popcorn: dúvidas, sugestões, correções de informações ou parcerias.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen text-white p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">Entre em contato</h1>

        <div className="space-y-6">
          <p className="text-gray-300 text-lg">
            Tem alguma dúvida, sugestão ou encontrou uma informação errada? Envie uma mensagem — eu leio todas e
            respondo pelo e-mail informado.
          </p>

          <ContactForm />

          <div className="mt-8 p-6 bg-gray-800/50 rounded-lg space-y-2 text-gray-300">
            <h2 className="text-xl font-semibold text-white">Outras informações</h2>
            {CONTACT_EMAIL && (
              <p>
                E-mail direto:{" "}
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-green-400 hover:text-green-300 underline">
                  {CONTACT_EMAIL}
                </a>
              </p>
            )}
            <p>
              <strong className="text-white">Correções:</strong> informe o link da página e o que está errado. Dados de
              filmes vêm do TMDB; quando o erro for na base deles, também explico como corrigir lá.
            </p>
            <p>
              <strong className="text-white">Privacidade:</strong> para pedir a exclusão da sua conta e dos seus dados,
              use o assunto &quot;Exclusão de dados&quot;.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
