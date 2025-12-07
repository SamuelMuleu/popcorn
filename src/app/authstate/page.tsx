"use client";

import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { FaUserNinja } from "react-icons/fa";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";

const AuthState = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);

      router.push("/signin");
    } catch (error) {
      console.error("Erro ao fazer logout", error);
    }
  };

  if (loading) {
    return (
      <motion.div
        className="flex justify-center items-center min-h-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Carregando...
      </motion.div>
    );
  }

  return (
    <motion.div
      className="flex justify-center items-center min-h-screen"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="p-8 max-w-md mx-auto border  border-gradientColorStops-custom-green  rounded-xl shadow-md">
        {user ? (
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-white">
                 
              Bem-vindo, {user.displayName || "Usuário"}
            </h2>
      
            {user.photoURL ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Image
                  src={user.photoURL}
                  width={200}
                  height={200}
                  alt="Foto do usuário"
                  className="w-24 h-24 rounded-full mx-auto mt-4"
                />
              </motion.div>
            ) : (
              <div className="flex flex-col gap-2 items-center justify-center my-5">
                <FaUserNinja size={100} />
              </div>
            )}

            <div className="mt-4">
              <motion.button
                onClick={handleLogout}
                className="w-20rem bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                Sair
              </motion.button>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </motion.div>
  );
};

export default AuthState;
