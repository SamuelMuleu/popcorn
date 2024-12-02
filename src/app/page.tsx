import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Home() {
  return (
    <section className="flex  md:gap-10 gap-5 flex-col items-center justify-center  ">
      <Avatar className="w-60 h-60 border-2 mt-7 border-gradientColorStops-custom-green ">
        <AvatarImage src="/assets/perfil.jpeg" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <h1 className="text-4xl font-black p-3 ">
        Procure por Filmes
        <span className="flex items-center justify-center">e Series</span>
      </h1>

      <p className="font-bold text-gradientColorStops-custom-green">
        Favorite na sua lista para não perder!
      </p>
    </section>
  );
}
