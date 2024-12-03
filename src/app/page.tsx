"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <section className="flex  md:gap-10 gap-5 flex-col items-center justify-center  ">
      <Avatar className="w-60 h-60 border-4 mt-7  border-gradientColorStops-custom-green ">
        <AvatarImage src="/assets/popcorn.svg" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <h1 className="text-4xl font-black p-3 ">
        Procure por Filmes
        <span className="flex items-center justify-center">e Series</span>
      </h1>

      <p className="font-bold text-gradientColorStops-custom-green">
        Favorite na sua lista para não perder!
      </p>
      <Link href="/profile">
        <Button
          aria-label="Ir para o perfil"
          className="bg-[#31373E] rounded-xl w-44 h-14 border-2 border-gradientColorStops-custom-green hover:bg-gray-800"
        >
          <p className="font-black text-xl">Entre</p>
        </Button>
      </Link>
    </section>
  );
}
