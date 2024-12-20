"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import { motion } from "motion/react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const tooglePassWordVisibility = (
    e: React.MouseEvent<HTMLButtonElement>
  ): void => {
    e.preventDefault();
    setShowPassword((prevState) => !prevState);
  };

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
      setMessage("Conta criada com Sucesso! Aguarde Redirecionamento");
      router.push("/authstate");
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError("Erro ao criar conta: Email em uso ");
      } else {
        setError("Erro desconhecido");
      }
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
      setMessage("Cadastro realizado com sucesso!");
      router.push("/authstate");
    } catch (error) {
      setError("Erro ao fazer login com Google: " + error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="p-8 -mt-32 w-96 mx-auto border border-gradientColorStops-custom-green bg-bgbutton  rounded-xl  shadow-md"
      >
        <form onSubmit={handleSignUp}>
          <div className="mb-4">
            <label className="block text-white " htmlFor="name">
              Nome:
            </label>
            <input
              type="text"
              required
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
              required
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
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-2  md:relative border bg-gray-600 border-gradientColorStops-custom-green rounded focus:outline-none focus:ring-1 focus:ring-green-500 placeholder-gray-500"
              placeholder="Digite sua senha"
            />
            <button
              className="md:absolute relative  left-64 bottom-7 md:-top-[2.8rem] md:left-[50rem]"
              onClick={tooglePassWordVisibility}
            >
              {showPassword ? (
                <FaRegEyeSlash className=" md:mt-0 lg:-ml-5 " />
              ) : (
                <FaRegEye className=" md:mt-0 lg:-ml-5" />
              )}
            </button>
          </div>
          <div className="flex justify-center items-center flex-col gap-2">
            {error && <p className="text-red-500">{error}</p>}
            {message && (
              <p className="flex items-center justify-center text-green-500">
                {message}
              </p>
            )}
            <Button
              type="submit"
              className="bg-[#31373E] rounded-xl w-44 mt-2 border-2 border-gradientColorStops-custom-green flex  hover:bg-gray-800"
            >
              <p className="font-black  text-lg"></p>
              {loading ? "Criando..." : "Cadastrar"}
            </Button>
            <Button
              onClick={handleGoogleLogin}
              className="bg-white border mt-2 max-w-48 px-20 border-black text-black  rounded-2xl hover:bg-black hover:text-white "
            >
              <Image
                src="/google.svg"
                width={10}
                height={10}
                alt="google logo"
                className="w-10 h-10 "
              />
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
      </motion.div>
    </div>
  );
};

export default Register;
