"use client";

import { useState } from "react";
import { MdSend, MdEmail, MdPerson, MdMessage } from "react-icons/md";

const inputClass =
  "w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-white";

// Envia para o Netlify Forms (o formulário "contato" é declarado em public/__forms.html).
// As mensagens aparecem no painel da Netlify em Forms e podem ser encaminhadas por e-mail.
export default function ContactForm() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const body = new URLSearchParams({
        "form-name": "contato",
        "bot-field": (e.currentTarget.elements.namedItem("bot-field") as HTMLInputElement)?.value || "",
        ...formData,
      });
      const res = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      console.error("Erro ao enviar contato:", err);
      setStatus("error");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <>
      {status === "success" && (
        <div role="status" className="bg-green-900/30 border border-green-700 p-4 rounded-lg">
          <p className="text-green-300">Mensagem enviada! Respondo pelo e-mail informado, normalmente em até 3 dias úteis.</p>
        </div>
      )}
      {status === "error" && (
        <div role="alert" className="bg-red-900/30 border border-red-700 p-4 rounded-lg">
          <p className="text-red-300">Não foi possível enviar agora. Tente novamente em alguns minutos.</p>
        </div>
      )}

      <form name="contato" onSubmit={handleSubmit} className="space-y-4">
        {/* Campo-armadilha contra spam: pessoas não veem, robôs preenchem */}
        <p className="hidden">
          <label>Não preencha: <input name="bot-field" tabIndex={-1} autoComplete="off" /></label>
        </p>
        <div>
          <label htmlFor="name" className="text-sm font-semibold mb-2 flex items-center gap-2">
            <MdPerson className="text-green-500" aria-hidden="true" /> Nome
          </label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className={inputClass} placeholder="Seu nome" />
        </div>
        <div>
          <label htmlFor="email" className="text-sm font-semibold mb-2 flex items-center gap-2">
            <MdEmail className="text-green-500" aria-hidden="true" /> E-mail
          </label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className={inputClass} placeholder="seuemail@exemplo.com" />
        </div>
        <div>
          <label htmlFor="subject" className="text-sm font-semibold mb-2 flex items-center gap-2">
            <MdMessage className="text-green-500" aria-hidden="true" /> Assunto
          </label>
          <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} required className={inputClass} placeholder="Dúvida, sugestão, correção..." />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-semibold mb-2">Mensagem</label>
          <textarea id="message" name="message" value={formData.message} onChange={handleChange} required rows={6} className={`${inputClass} resize-none`} placeholder="Escreva sua mensagem" />
        </div>
        <button
          type="submit"
          disabled={status === "sending"}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === "sending" ? "Enviando..." : (<><MdSend aria-hidden="true" /> Enviar mensagem</>)}
        </button>
      </form>
    </>
  );
}
