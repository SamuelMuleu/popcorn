"use client";

import { useEffect, useState } from "react";
import { db, auth } from "@/lib/firebase";
import { getDoc, doc } from "firebase/firestore";
import Image from "next/image";
import axios from "axios";
import { useAuth } from "@/app/context/AuthContext";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface Favorite {
  id: number;
  media_type: "movie" | "tv";
  poster_path: string;
  name?: string;
  title?: string;
}

const Library = () => {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchFavorites = async () => {
      if (auth.currentUser) {
        const userId = auth.currentUser.uid;
        const favoritesRef = doc(db, "favorites", userId);

        try {
          const docSnap = await getDoc(favoritesRef);
          if (docSnap.exists()) {
            const userFavorites: Favorite[] = docSnap.data().favorites || [];

            const fetchedFavorites = await Promise.all(
              userFavorites.map(async (favorite) => {
                const response = await axios.get(
                  `https://api.themoviedb.org/3/${favorite.media_type}/${favorite.id}`,
                  {
                    params: {
                      api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
                      language: "pt-BR",
                    },
                  }
                );
                return { ...response.data, media_type: favorite.media_type };
              })
            );

            setFavorites(fetchedFavorites);
          } else {
            setFavorites([]);
          }
        } catch (err) {
          setError("Erro ao carregar favoritos. Tente novamente.");
          console.error(err);
        }
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  if (!user) {
    return (
      <div className="flex items-center font-bold text-gradientColorStops-custom-green justify-center min-h-screen">
        Faça login para Salvar Seus Favoritos
      </div>
    );
  }
  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        Carregando favoritos...
      </div>
    );
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="min-h-screen text-white p-4">
      <h1 className="text-2xl font-semibold mb-6 text-start opacity-25">
        Meus Favoritos
      </h1>

      <Carousel className="flex gap-4">
        <CarouselContent className="flex gap-5">
          {favorites.length === 0 ? (
            <div>Você não tem favoritos ainda.</div>
          ) : (
            favorites.map((favorite) => (
              <CarouselItem
                key={favorite.id}
                className="w-[200px] basis-1/1 p-4 rounded-lg bg-gray-800"
              >
                <Image
                  src={`https://image.tmdb.org/t/p/w500/${favorite.poster_path}`}
                  alt={`Imagem de ${
                    favorite.media_type === "movie" ? "filme" : "série"
                  }`}
                  width={200}
                  height={300}
                  className="w-full h-auto object-cover"
                />
                <div className="mt-2 text-center">
                  <p className="font-semibold">
                    {favorite.title || favorite.name}
                  </p>
                </div>
              </CarouselItem>
            ))
          )}
        </CarouselContent>
        <CarouselPrevious className="ml-5 md:ml-2 -mt-10" />
        <CarouselNext className="md:-mr-1 mr-5 -mt-10" />
      </Carousel>
    </div>
  );
};

export default Library;
