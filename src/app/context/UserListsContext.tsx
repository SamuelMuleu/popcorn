"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";

export type ListType = "movie" | "tv";
export interface ListItem {
  id: number;
  type: ListType;
}

interface UserListsValue {
  favorites: ListItem[];
  watched: ListItem[];
  ready: boolean;
  isFavorite: (id: number, type: ListType) => boolean;
  isWatched: (id: number, type: ListType) => boolean;
  toggleFavorite: (id: number, type: ListType) => Promise<void>;
  toggleWatched: (id: number, type: ListType) => Promise<void>;
}

const UserListsContext = createContext<UserListsValue | undefined>(undefined);

const same = (a: ListItem, id: number, type: ListType) => a.id === id && a.type === type;

/**
 * Fonte única dos favoritos e assistidos do usuário (Firestore em tempo real).
 * Todos os cards do site leem daqui, então marcar um título em uma página
 * atualiza o botão em todas as outras.
 */
export default function UserListsProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const router = useRouter();
  const [favorites, setFavorites] = useState<ListItem[]>([]);
  const [watched, setWatched] = useState<ListItem[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!user) {
      setFavorites([]);
      setWatched([]);
      setReady(false);
      return;
    }
    let loaded = 0;
    let cancelled = false;
    const unsubs: (() => void)[] = [];
    const done = () => {
      loaded += 1;
      if (loaded >= 2) setReady(true);
    };
    // Firestore carregado só para quem está logado (não pesa nas outras visitas)
    Promise.all([import("firebase/firestore"), import("@/lib/firestore")]).then(([{ doc, onSnapshot }, { db }]) => {
      if (cancelled) return;
      unsubs.push(onSnapshot(
      doc(db, "favorites", user.uid),
      (snap) => {
        setFavorites((snap.data()?.favorites as ListItem[]) || []);
        done();
      },
      (err) => {
        console.error("Erro ao ler favoritos:", err);
        done();
      }
    ));
      unsubs.push(onSnapshot(
      doc(db, "watched", user.uid),
      (snap) => {
        setWatched((snap.data()?.watched as ListItem[]) || []);
        done();
      },
      (err) => {
        console.error("Erro ao ler assistidos:", err);
        done();
      }
    ));
    });
    return () => {
      cancelled = true;
      unsubs.forEach((u) => u());
    };
  }, [user]);

  const toggle = useCallback(
    async (
      collection: "favorites" | "watched",
      list: ListItem[],
      setList: React.Dispatch<React.SetStateAction<ListItem[]>>,
      id: number,
      type: ListType
    ) => {
      if (!user) {
        router.push("/signin");
        return;
      }
      const has = list.some((x) => same(x, id, type));
      const previous = list;
      const next = has ? list.filter((x) => !same(x, id, type)) : [...list, { id, type }];
      setList(next); // resposta imediata no botão
      try {
        const [{ doc, setDoc, arrayUnion }, { db }] = await Promise.all([
          import("firebase/firestore"),
          import("@/lib/firestore"),
        ]);
        const ref = doc(db, collection, user.uid);
        // Remover regravando a lista evita falhas com itens antigos salvos com campos extras
        await setDoc(ref, { [collection]: has ? next : arrayUnion({ id, type }) }, { merge: true });
      } catch (err) {
        console.error(`Erro ao atualizar ${collection}:`, err);
        setList(previous);
      }
    },
    [user, router]
  );

  const value = useMemo<UserListsValue>(
    () => ({
      favorites,
      watched,
      ready,
      isFavorite: (id, type) => favorites.some((x) => same(x, id, type)),
      isWatched: (id, type) => watched.some((x) => same(x, id, type)),
      toggleFavorite: (id, type) => toggle("favorites", favorites, setFavorites, id, type),
      toggleWatched: (id, type) => toggle("watched", watched, setWatched, id, type),
    }),
    [favorites, watched, ready, toggle]
  );

  return <UserListsContext.Provider value={value}>{children}</UserListsContext.Provider>;
}

export function useUserLists() {
  const ctx = useContext(UserListsContext);
  if (!ctx) throw new Error("useUserLists deve ser usado dentro de UserListsProvider");
  return ctx;
}
