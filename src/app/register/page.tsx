"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";

import { createUserWithEmailAndPassword ,GoogleAuthProvider,signInWithPopup, updateProfile} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      if (user && name) {
        await updateProfile(user, { displayName: name }); 
      }
      
      console.log("Usuário criado:", userCredential.user);
      setMessage("Conta criada com Sucesso");
      router.push("/authstate")
    } catch (error) {
      setError("Erro ao criar conta: " + error);
    } finally {
      setLoading(false);
      setError(null)
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("Usuário logado com Google:", user);
      setMessage('Cadastro realizado com sucesso!');
      router.push("/authstate")
    } catch (error) {
      setError("Erro ao fazer login com Google: " + error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="p-8 -mt-32 max-w-md mx-auto border border-gradientColorStops-custom-green bg-bgbutton  rounded-xl  shadow-md">
        <form onSubmit={handleSignUp}>
          <div className="mb-4">
            <label className="block text-white " htmlFor="name">
              Nome:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border bg-gray-600 border-gradientColorStops-custom-green rounded focus:outline-none focus:ring-1 focus:ring-green-500 placeholder-gray-500"
              placeholder="Digite seu nome"
            />
          </div>

          <div className="mb-4">
            <label className="block text-white " htmlFor="email">
              E-mail:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border bg-gray-600 border-gradientColorStops-custom-green rounded focus:outline-none focus:ring-1 focus:ring-green-500 placeholder-gray-500"
              placeholder="Digite seu e-mail"
            />
          </div>

          <div className="mb-4">
            <label className="block text-white " htmlFor="password">
              Senha:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border bg-gray-600 border-gradientColorStops-custom-green rounded focus:outline-none focus:ring-1 focus:ring-green-500 placeholder-gray-500"
              placeholder="Digite sua senha"
            />
          </div>
          <div className="flex justify-center items-center flex-col gap-2">
            {error && <p className="text-red-500">{error}</p>}
            {message && <p className="text-green-500">{message}</p>}
            <Button
              type="submit"
              className="bg-[#31373E] rounded-xl w-44 h-12 border-2 border-gradientColorStops-custom-green hover:bg-gray-800"
            >
              <p className="font-black text-lg"></p>
              {loading ? "Criando..." : "Cadastrar"}
            </Button>
            <Button
              onClick={handleGoogleLogin}
              className="bg-[#db4437] text-white w-44 h-12 rounded-xl hover:bg-[#c1351d]"
            >
              Cadastrar com Google
            </Button>
          </div>
          <Link
            href="/signin"
            className="flex items-center justify-center mt-4 hover:scale-110 font-black"
          >
            Fazer login
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Register;
