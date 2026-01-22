"use client";

import { useEffect, useState } from "react";
import { db, auth } from "@/lib/firebase";
import { getDoc, doc, setDoc, updateDoc, arrayRemove, arrayUnion } from "firebase/firestore";
import Image from "next/image";
import { useAuth } from "@/app/context/AuthContext";
import axios from "axios";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { motion } from "motion/react";
import Link from "next/link";
import ButtonFavorite from "@/components/ButtonFavorite";
import Tabs from "@/components/Tabs";
import ButtonWatched from "@/components/ButtonWatched";

interface Favorite {
  id: number;
  type: "movie" | "tv";
  poster_path: string;
  name?: string;
  title?: string;
}

interface Movie {
  id: number;
  title: string;
  backdrop_path: string;
  poster_path: string;
}

interface Serie {
  id: number;
  name: string;
  backdrop_path: string;
  poster_path: string;
}

const Library = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [tvShows, setTvShows] = useState<Favorite[]>([]);
  const [watchedMovies, setWatchedMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [movieDetails, setMovieDetails] = useState<Movie[]>([]);
  const [tvShowDetails, setTvShowDetails] = useState<Serie[]>([]);
  const [watchedMovieDetails, setWatchedMovieDetails] = useState<Movie[]>([]);
  const { user } = useAuth();
  const [watched, setWatched] = useState<{ id: number; type: string }[]>([]);
  const [watchingSeries, setWatchingSeries] = useState<{ seriesId: number; episodesWatched: number }[]>([]);
  const [watchingSeriesDetails, setWatchingSeriesDetails] = useState<Serie[]>([]);
  const [completedSeries, setCompletedSeries] = useState<Serie[]>([]);





  const saveWatched = async (id: number, type: "movie" | "tv") => {
    if (auth.currentUser) {
      const userId = auth.currentUser.uid;
      const userWatchedRef = doc(db, "watched", userId);

      try {
        const docSnap = await getDoc(userWatchedRef);
        const newWatched = { id, type };

        if (docSnap.exists()) {
          const currentWatched = docSnap.data()?.watched || [];

          const isWatched = currentWatched.some(
            (item: { id: number; type: string }) =>
              item.id === id && item.type === type
          );

          if (isWatched) {
            await updateDoc(userWatchedRef, {
              watched: arrayRemove(newWatched),
            });
            setWatched((prev) =>
              prev.filter(
                (item) => item.id !== id || item.type !== type
              )
            );
          } else {
            await updateDoc(userWatchedRef, {
              watched: arrayUnion(newWatched),
            });
            setWatched((prev) => [...prev, newWatched]);
          }
        } else {
          await setDoc(userWatchedRef, {
            watched: [newWatched],
          });
          setWatched([newWatched]);
        }
      } catch (err) {
        if (err instanceof Error) {
          setError("Erro ao salvar assistido: " + err.message);
        }
        console.error("Erro ao salvar assistido: ", err);
      }
    }
  };

  const isWatched = (id: number, type: string) => {
    return watched.some((item) => item.id === id && item.type === type);
  };

  useEffect(() => {
    if (user) {
      const fetchFavorites = async () => {
        setLoading(true);
        try {
          const docRef = doc(db, "favorites", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            const favorites = data?.favorites || [];

            const favoriteMovies = favorites.filter(
              (fav: Favorite) => fav.type === "movie"
            );
            const favoriteTvShows = favorites.filter(
              (fav: Favorite) => fav.type === "tv"
            );

            setMovies(favoriteMovies);
            setTvShows(favoriteTvShows);

            const movieIds = favoriteMovies.map((movie: Favorite) => movie.id);
            const tvShowIds = favoriteTvShows.map((tv: Favorite) => tv.id);

            const moviePromises = movieIds.map((id: number) =>
              axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
                params: {
                  api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
                },
              })
            );

            const tvShowPromises = tvShowIds.map((id: number) =>
              axios.get(`https://api.themoviedb.org/3/tv/${id}`, {
                params: {
                  api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
                },
              })
            );

            const movieResponses = await Promise.all(moviePromises);
            const tvShowResponses = await Promise.all(tvShowPromises);

            setMovieDetails(movieResponses.map((res) => res.data));
            setTvShowDetails(tvShowResponses.map((res) => res.data));
          } else {
            setError("Nenhum favorito encontrado.");
          }
        } catch (error: unknown) {
          if (error instanceof Error) {
            setError("Erro ao carregar os favoritos.");
          }
        } finally {
          setLoading(false);
        }
      };

      fetchFavorites();

      const fetchWatched = async () => {
        setLoading(true);
        try {
          const docRef = doc(db, "watched", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            const watched = data?.watched || [];

            const watchedMoviesList = watched.filter(
              (item: Favorite) => item.type === "movie"
            );
            const watchedTvShowsList = watched.filter(
              (item: Favorite) => item.type === "tv"
            );

            setWatchedMovies(watchedMoviesList);
            setWatchedTvShows(watchedTvShowsList);

            const movieIds = watchedMoviesList.map((movie: Favorite) => movie.id);
            const tvShowIds = watchedTvShowsList.map((tv: Favorite) => tv.id);

            const moviePromises = movieIds.map((id: number) =>
              axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
                params: {
                  api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
                },
              })
            );

            const tvShowPromises = tvShowIds.map((id: number) =>
              axios.get(`https://api.themoviedb.org/3/tv/${id}`, {
                params: {
                  api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
                },
              })
            );

            const movieResponses = await Promise.all(moviePromises);
            const tvShowResponses = await Promise.all(tvShowPromises);

            setWatchedMovieDetails(movieResponses.map((res) => res.data));
            setWatchedTvShowDetails(tvShowResponses.map((res) => res.data));
          }
        } catch (error: unknown) {
          if (error instanceof Error) {
            console.error("Erro ao carregar assistidos.", error);
          }
        } finally {
          setLoading(false);
        }
      };

      fetchWatched();

      // Buscar estado watched para sincronizar botões
      const fetchWatchedMovies = async () => {
        try {
          const watchedRef = doc(db, "watched", user.uid);
          const docSnap = await getDoc(watchedRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            setWatched(data.watched || []);
          }
        } catch (error) {
          console.error("Erro ao buscar filmes assistidos:", error);
        }
      };

      fetchWatchedMovies();

      const fetchWatchingSeries = async () => {
        try {
          const docRef = doc(db, "watchedEpisodes", user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const data = docSnap.data();
            const episodes = data?.episodes || [];

            if (episodes.length === 0) {
              setWatchingSeries([]);
              setWatchingSeriesDetails([]);
              setCompletedSeries([]);
              return;
            }

            // Agrupar episodios por série e contar
            const seriesMap = new Map<number, number>();
            episodes.forEach((ep: { seriesId: number; season: number; episode: number }) => {
              const count = seriesMap.get(ep.seriesId) || 0;
              seriesMap.set(ep.seriesId, count + 1);
            });

            // Converter para array
            const seriesArray = Array.from(seriesMap, ([seriesId, episodesWatched]) => ({
              seriesId,
              episodesWatched,
            }));

            if (seriesArray.length === 0) {
              setWatchingSeries([]);
              setWatchingSeriesDetails([]);
              setCompletedSeries([]);
              return;
            }

            // Buscar detalhes das séries
            const seriesPromises = seriesArray.map(({ seriesId }) =>
              axios.get(`https://api.themoviedb.org/3/tv/${seriesId}?language=pt-BR`, {
                params: {
                  api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
                },
              })
            );

            const seriesResponses = await Promise.all(seriesPromises);
            const seriesDetails = seriesResponses.map((res) => res.data);

            // Separar séries completas das em progresso
            const completed: Serie[] = [];
            const inProgress: { seriesId: number; episodesWatched: number }[] = [];
            const inProgressDetails: Serie[] = [];

            seriesArray.forEach((series, index) => {
              const serieData = seriesDetails[index];
              const totalEpisodes = serieData.number_of_episodes || 0;

              if (totalEpisodes > 0 && series.episodesWatched >= totalEpisodes) {
                // Série completa (100% assistida)
                completed.push(serieData);
              } else {
                // Série em progresso
                inProgress.push(series);
                inProgressDetails.push(serieData);
              }
            });

            setCompletedSeries(completed);
            setWatchingSeries(inProgress);
            setWatchingSeriesDetails(inProgressDetails);
          } else {
            setWatchingSeries([]);
            setWatchingSeriesDetails([]);
            setCompletedSeries([]);
          }
        } catch (error) {
          console.error("Erro ao carregar séries assistindo:", error);
          setWatchingSeries([]);
          setWatchingSeriesDetails([]);
          setCompletedSeries([]);
        }
      };

      fetchWatchingSeries();
    }
  }, [user]);


  const removeFavorite = async (id: number, type: "movie" | "tv") => {
    if (!user) return;

    try {
      const docRef = doc(db, "favorites", user.uid);

      await updateDoc(docRef, {
        favorites: arrayRemove({ id, type }),
      });
      if (type === "movie") {
        setMovies((prev) => prev.filter((fav) => fav.id !== id));
        setMovieDetails((prev) => prev.filter((movie) => movie.id !== id));
      } else if (type === "tv") {
        setTvShows((prev) => prev.filter((fav) => fav.id !== id));
        setTvShowDetails((prev) => prev.filter((tv) => tv.id !== id));
      }
    } catch (error) {
      console.error("Erro ao remover o favorito:", error);
    }
  };

  const removeWatched = async (id: number, type: "movie" | "tv") => {
    if (!user) return;

    try {
      const docRef = doc(db, "watched", user.uid);

      await updateDoc(docRef, {
        watched: arrayRemove({ id, type }),
      });
      if (type === "movie") {
        setWatchedMovies((prev) => prev.filter((item) => item.id !== id));
        setWatchedMovieDetails((prev) => prev.filter((movie) => movie.id !== id));
      } else if (type === "tv") {
        setWatchedTvShows((prev) => prev.filter((item) => item.id !== id));
        setWatchedTvShowDetails((prev) => prev.filter((tv) => tv.id !== id));
      }
    } catch (error) {
      console.error("Erro ao remover de assistidos:", error);
    }
  };

  if (!user) {

    return (

      <motion.div

        className="flex items-center font-bold text-gradientColorStops-custom-green justify-center min-h-screen"

        initial={{ opacity: 0 }}

        animate={{ opacity: 1 }}

        transition={{ duration: 0.5 }}

      >

        Faça login para Salvar Seus Favoritos

      </motion.div>

    );

  }



  if (loading)

    return (

      <motion.div

        className="flex items-center justify-center min-h-screen"

        initial={{ opacity: 0 }}

        animate={{ opacity: 1 }}

        transition={{ duration: 0.5 }}

      >

        Carregando favoritos...

      </motion.div>

    );



  if (error)

    return (

      <motion.div

        className="text-red-500"

        initial={{ opacity: 0 }}

        animate={{ opacity: 1 }}

        transition={{ duration: 0.5 }}

      >

        {error}

      </motion.div>

    );

  return (
    <div className="min-h-screen text-white p-7">
      <h1 className="text-3xl font-bold mb-6">Minha Biblioteca</h1>

      <Tabs
        defaultTab="favorites"
        tabs={[
          {
            id: "favorites",
            label: "Favoritos",
            content: (
              <>
                <h2 className="text-2xl font-semibold text-start opacity-25 mb-4">
                  Filmes Preferidos
                </h2>
                <Carousel className="w-full max-w-5xl mx-auto mb-10">
                  <CarouselContent>
                    {movies.length === 0 ? (
                      <div className="pl-4">Você não tem filmes favoritos ainda.</div>
                    ) : (
                      movieDetails.map((movie: Movie) => (
                        <CarouselItem
                          key={movie.id}
                          className="md:w-[200px] w-48 basis-1/2 md:basis-1/4 lg:basis-1/5 relative p-4"
                        >
                          <Link href={`/details/movie/${movie.id}`}>
                            <ButtonFavorite
                              id={movie.id}
                              type="movie"
                              onClick={removeFavorite}
                            />
                            <div className="sm:absolute top-[.5rem] left-[10px] lg:absolute md:absolute ">
                              <ButtonWatched
                                id={movie.id}
                                type="movie"
                                onClick={saveWatched}
                                isWatched={isWatched(movie.id, "movie")}
                              />
                            </div>
                            <motion.div className="overflow-hidden rounded-lg">
                              <Image
                                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                                alt={`Imagem de filme`}
                                width={200}
                                height={300}
                                className="w-full h-auto object-cover"
                              />
                            </motion.div>
                            <div className="mt-2 text-center">
                              <p className="font-semibold">{movie.title}</p>
                            </div>
                          </Link>
                        </CarouselItem>
                      ))
                    )}
                  </CarouselContent>
                  <CarouselPrevious className="ml-5 md:ml-56 -mt-10" />
                  <CarouselNext className="md:mr-56 mr-5 -mt-10" />
                </Carousel>

                <h2 className="text-2xl font-semibold mt-10 text-start opacity-25 mb-4">
                  Séries Preferidas
                </h2>
                <Carousel className="w-full max-w-5xl mx-auto">
                  <CarouselContent>
                    {tvShows.length === 0 ? (
                      <div className="pl-4">Você não tem séries favoritas ainda.</div>
                    ) : (
                      tvShowDetails.map((tv: Serie) => (
                        <CarouselItem
                          key={tv.id}
                          className="md:w-[200px] w-48 basis-1/2 md:basis-1/4 lg:basis-1/5 relative p-4"
                        >
                          <Link href={`/details/tv/${tv.id}`}>
                            <ButtonFavorite
                              id={tv.id}
                              type="tv"
                              onClick={removeFavorite}
                            />
                            <motion.div className="overflow-hidden rounded-lg">
                              <Image
                                src={`https://image.tmdb.org/t/p/w500/${tv.poster_path}`}
                                alt={`Imagem de série`}
                                width={200}
                                height={300}
                                className="w-full h-auto object-cover"
                              />
                            </motion.div>
                            <div className="mt-2 text-center">
                              <p className="font-semibold">{tv.name}</p>
                            </div>
                          </Link>
                        </CarouselItem>
                      ))
                    )}
                  </CarouselContent>
                  <CarouselPrevious className="ml-5 md:ml-56 -mt-10" />
                  <CarouselNext className="md:mr-56 mr-5 -mt-10" />
                </Carousel>
              </>
            ),
          },
          {
            id: "watched",
            label: "Assistidos",
            content: (
              <>
                <h2 className="text-2xl font-semibold text-start opacity-25 mb-4">
                  Filmes Assistidos
                </h2>
                <Carousel className="w-full max-w-5xl mx-auto mb-10">
                  <CarouselContent>
                    {watchedMovies.length === 0 ? (
                      <div className="pl-4">Você não marcou nenhum filme como assistido ainda.</div>
                    ) : (
                      watchedMovieDetails.map((movie: Movie) => (
                        <CarouselItem
                          key={movie.id}
                          className="md:w-[200px] w-48 basis-1/2 md:basis-1/4 lg:basis-1/5 relative p-4"
                        >
                          <Link href={`/details/movie/${movie.id}`}>
                            <ButtonWatched
                              id={movie.id}
                              type="movie"
                              onClick={removeWatched}
                              isWatched={true}
                            />
                            <motion.div className="overflow-hidden rounded-lg">
                              <Image
                                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                                alt={`Imagem de filme`}
                                width={200}
                                height={300}
                                className="w-full h-auto object-cover"
                              />
                            </motion.div>
                            <div className="mt-2 text-center">
                              <p className="font-semibold">{movie.title}</p>
                            </div>
                          </Link>
                        </CarouselItem>
                      ))
                    )}
                  </CarouselContent>
                  <CarouselPrevious className="ml-5 md:ml-56 -mt-10" />
                  <CarouselNext className="md:mr-56 mr-5 -mt-10" />
                </Carousel>

                {/* Séries Completamente Assistidas */}
                {completedSeries.length > 0 && (
                  <>
                    <h2 className="text-2xl font-semibold mt-10 text-start opacity-25 mb-4">
                      Séries Completas
                    </h2>
                    <Carousel className="w-full max-w-5xl mx-auto">
                      <CarouselContent>
                        {completedSeries.map((series: Serie) => (
                          <CarouselItem
                            key={series.id}
                            className="md:w-[200px] w-48 basis-1/2 md:basis-1/4 lg:basis-1/5 relative p-4"
                          >
                            <Link href={`/details/tv/${series.id}`}>
                              <motion.div className="overflow-hidden  rounded-lg relative">
                                <div className="absolute top-2 right-2 z-10 bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                                  ✓ Completa
                                </div>
                                <Image
                                  src={`https://image.tmdb.org/t/p/w500/${series.poster_path}`}
                                  alt={`Imagem de série`}
                                  width={200}
                                  height={300}
                                  className="w-full h-auto object-cover"
                                />
                              </motion.div>
                              <div className="mt-2 text-center">
                                <p className="font-semibold">{series.name}</p>
                                <p className="text-xs text-green-400 mt-1">100% assistida</p>
                              </div>
                            </Link>
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      <CarouselPrevious className="ml-5 md:ml-56 -mt-10" />
                      <CarouselNext className="md:mr-56 mr-5 -mt-10" />
                    </Carousel>
                  </>
                )}
              </>
            ),
          },
          {
            id: "assistindo",
            label: "Assistindo",
            content: (
              <>
                <h2 className="text-2xl font-semibold text-start opacity-25 mb-4">
                  Séries em Progresso
                </h2>
                <Carousel className="w-full max-w-5xl mx-auto">
                  <CarouselContent>
                    {watchingSeries.length === 0 ? (
                      <div className="pl-4">Você não começou a assistir nenhuma série ainda.</div>
                    ) : (
                      watchingSeriesDetails.map((series: Serie, index) => {
                        const watchingInfo = watchingSeries.find(
                          (ws) => ws.seriesId === series.id
                        );
                        const episodesWatched = watchingInfo?.episodesWatched || 0;

                        return (
                          <CarouselItem
                            key={series.id}
                            className="md:w-[200px] w-48 basis-1/2 md:basis-1/4 lg:basis-1/5 relative p-4"
                          >
                            <Link href={`/details/tv/${series.id}`}>
                              <motion.div className="overflow-hidden rounded-lg relative">
                                {/* Badge de episódios assistidos */}
                                <div className="absolute top-2 right-2 z-10 bg-green-700 text-white px-2 py-1 rounded-full text-xs font-bold">
                                  {episodesWatched} eps
                                </div>

                                <Image
                                  src={`https://image.tmdb.org/t/p/w500/${series.poster_path}`}
                                  alt={`Imagem de série`}
                                  width={200}
                                  height={300}
                                  className="w-full h-auto object-cover"
                                />
                              </motion.div>
                              <div className="mt-2 text-center">
                                <p className="font-semibold">{series.name}</p>
                                <p className="text-xs text-green-400 mt-1">
                                  {episodesWatched} episódio{episodesWatched > 1 ? "s" : ""} assistido{episodesWatched > 1 ? "s" : ""}
                                </p>
                              </div>
                            </Link>
                          </CarouselItem>
                        );
                      })
                    )}
                  </CarouselContent>
                  <CarouselPrevious className="ml-5 md:ml-56 -mt-10" />
                  <CarouselNext className="md:mr-56 mr-5 -mt-10" />
                </Carousel>
              </>
            ),
          },
        ]}
      />
    </div>
  );
};

export default Library;