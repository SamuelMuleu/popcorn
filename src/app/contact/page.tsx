"use client";

import { useState } from "react";
import { MdSend, MdEmail, MdPerson, MdMessage } from "react-icons/md";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });
    const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("sending");

        // Simula envio (você pode integrar com um serviço de email depois)
        setTimeout(() => {
            setStatus("success");
            setFormData({ name: "", email: "", subject: "", message: "" });
            setTimeout(() => setStatus("idle"), 3000);
        }, 1500);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="min-h-screen text-white p-4 md:p-8">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-3xl md:text-4xl font-bold mb-6">Entre em Contato</h1>

                <div className="space-y-6">
                    <p className="text-gray-300 text-lg">
                        Tem alguma dúvida, sugestão ou problema? Envie-nos uma mensagem e responderemos o mais rápido possível!
                    </p>

                    {status === "success" && (
                        <div className="bg-green-900/30 border border-green-700 p-4 rounded-lg">
                            <p className="text-green-300">✅ Mensagem enviada com sucesso! Entraremos em contato em breve.</p>
                        </div>
                    )}

                    {status === "error" && (
                        <div className="bg-red-900/30 border border-red-700 p-4 rounded-lg">
                            <p className="text-red-300">❌ Erro ao enviar mensagem. Tente novamente mais tarde.</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-semibold mb-2 flex items-center gap-2">
                                <MdPerson className="text-green-500" />
                                Nome
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-white"
                                placeholder="Seu nome completo"
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-semibold mb-2 flex items-center gap-2">
                                <MdEmail className="text-green-500" />
                                E-mail
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-white"
                                placeholder="seuemail@exemplo.com"
                            />
                        </div>

                        <div>
                            <label htmlFor="subject" className="block text-sm font-semibold mb-2 flex items-center gap-2">
                                <MdMessage className="text-green-500" />
                                Assunto
                            </label>
                            <input
                                type="text"
                                id="subject"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                required
                                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-white"
                                placeholder="Sobre o que você quer falar?"
                            />
                        </div>

                        <div>
                            <label htmlFor="message" className="block text-sm font-semibold mb-2">
                                Mensagem
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows={6}
                                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-white resize-none"
                                placeholder="Digite sua mensagem aqui..."
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={status === "sending"}
                            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {status === "sending" ? (
                                <>Enviando...</>
                            ) : (
                                <>
                                    <MdSend />
                                    Enviar Mensagem
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 p-6 bg-gray-800/50 rounded-lg">
                        <h2 className="text-xl font-semibold mb-3">Outras Formas de Contato</h2>
                        <p className="text-gray-300 mb-2">
                            📧 Email direto:{" "}
                            <a href="mailto:contato@popcorn.com" className="text-green-400 hover:text-green-300 underline">
                                contato@popcorn.com
                            </a>
                        </p>

                    </div>
                </div>
            </div>
        </div>
    );
}
