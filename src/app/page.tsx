import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Home() {
  return (
    <section className="flex  gap-10 flex-col items-center justify-center  ">
      <Avatar className="w-72 h-72 border-2 mt-5 border-gradientColorStops-custom-green ">
        <AvatarImage src="/assets/perfil.jpeg" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <h1 className="text-4xl font-black p-3 ">

        <span className="flex items-center justify-center">e Series</span>{" "}
      </h1>

      <p className="font-bold text-gradientColorStops-custom-green">
        Favorite na sua lista para não perder!
      </p>
    </section>
  );
}
