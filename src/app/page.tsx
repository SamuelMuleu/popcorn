"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useAuth } from "@/app/context/AuthContext";

import { motion } from "motion/react"
export default function Home() {
  const { user } = useAuth();

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="flex md:gap-2 gap-5 flex-col items-center justify-center"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Avatar className="w-60 h-60 border-4 md:mt-2 mt-7 border-gradientColorStops-custom-green">
          <AvatarImage src="/assets/popcorn.svg" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-4xl font-black p-3"
      >
        Procure por Filmes
        <span className="flex items-center justify-center">e Series</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        className="font-bold text-gradientColorStops-custom-green p-3"
      >
        Favorite Filmes e Series na sua lista para{" "}
        <span className="flex items-center justify-center">
          Assistir Depois!
        </span>
      </motion.p>

      {!user ? (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
        >
          <Link href="/signin">
            <Button
              aria-label="Ir para o perfil"
              className="bg-[#31373E] rounded-xl w-44 h-14 border-2 border-gradientColorStops-custom-green hover:bg-gray-800"
            >
              <p className="font-black text-xl">Entre</p>
            </Button>
          </Link>
        </motion.div>
      ) : null}
    </motion.section>
  );
}
