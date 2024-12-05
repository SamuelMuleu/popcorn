"use client";

import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { FaUserNinja } from "react-icons/fa";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

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
      <div className="flex justify-center items-center min-h-screen">
        {" "}
     Carregando...
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="p-8 max-w-md mx-auto border border-gradientColorStops-custom-green bg-bgbutton rounded-xl shadow-md">
        {user ? (
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-white">
              Bem-vindo, {user.displayName || "Usuário"}
            </h2>
            {user.photoURL && (
              <Image
                src={user.photoURL}
                width={200}
                height={200}
                alt="Foto do usuário"
                className="w-24 h-24 rounded-full mx-auto mt-4"
              />
            )}
            {!user.photoURL && (
              <div className="flex  flex-col gap-2 items-center justify-center my-5  ">
                <FaUserNinja size={100} />
                <Button className="bg-[#31373E] rounded-xl w-28 h-10 mt-2 border-2 border-gradientColorStops-custom-green hover:bg-gray-800">
                  Alterar Foto
                </Button>
              </div>
            )}

            <div className="mt-4">
              <button
                onClick={handleLogout}
                className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
              >
                Sair
              </button>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default AuthState;
