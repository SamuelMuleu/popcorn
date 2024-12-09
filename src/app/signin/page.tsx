"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import Image from "next/image";
import { useAuth } from "@/app/context/AuthContext";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { motion } from "motion/react";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();

  const togglePasswordVisibility = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    setShowPassword((prevState) => !prevState);
  };

  useEffect(() => {
    if (authLoading) return;
    if (user) {
      router.push("/authstate");
    }
  }, [user, authLoading, router]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("Usuário autenticado:", userCredential.user);

      if (userCredential.user) {
        setError(null);
        router.push("/authstate");
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "Erro desconhecido ao autenticar");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("Usuário logado com Google:", user);
      setMessage("Autenticado realizado com sucesso!");
      router.push("/authstate");
    } catch (error) {
      setError("Erro ao fazer login com Google: " + (error instanceof Error ? error.message : "Erro desconhecido"));
    }
  };

  return (
    <motion.div className="flex justify-center items-center min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}>
      <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
      className="p-12 -mt-32 w-96 mx-auto border border-gradientColorStops-custom-green bg-bgbutton rounded-xl shadow-md">
        <form onSubmit={handleSignIn}>
          <div className="mb-4">
            <label className="block text-white" htmlFor="email">
              E-mail:
            </label>
            <input
              type="email"
              required
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border bg-gray-600 border-gradientColorStops-custom-green rounded focus:outline-none focus:ring-1 focus:ring-green-500 placeholder-gray-500"
              placeholder="Digite seu e-mail"
            />
          </div>
          <div className="mb-4 relative">
            <label className="block text-white" htmlFor="password">
              Senha:
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              required
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-2 border bg-gray-600 border-gradientColorStops-custom-green rounded focus:outline-none focus:ring-1 focus:ring-green-500 placeholder-gray-500"
              placeholder="Digite sua senha"
            />
            <button
              className="absolute top-4 right-4"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FaRegEyeSlash className="mt-5" /> : <FaRegEye className="mt-5" />}
            </button>
          </div>
          <div className="flex flex-col items-center gap-3">
            {error && <p className="text-red-500">{error}</p>}
            {message && <p className="text-green-500">{message}</p>}
            <Button
              type="submit"
              className="bg-[#31373E] rounded-xl w-44 mt-2 border-2 border-gradientColorStops-custom-green hover:bg-gray-800"
            >
              {loading ? "Entrando..." : "Entrar"}
            </Button>
            <Button
              onClick={handleGoogleLogin}
              className="bg-white border mt-2 max-w-44 border-black text-black rounded-2xl hover:bg-black hover:text-white"
              aria-label="Login com Google"
            >
              <Image
                src="/google.svg"
                width={10}
                height={10}
                alt="google logo"
                className="w-10 h-10"
              />
              Login com Google
            </Button>
          </div>
          <Link
            href="/register"
            className="flex items-center justify-center hover:scale-110 font-black mt-4"
          >
            Criar Conta
          </Link>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default Signin;
