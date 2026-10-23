"use client";

import Link from "next/link";
import { useAuth } from "@/app/context/AuthContext";

export default function LoginCta() {
  const { user, loading } = useAuth();
  if (loading) return null;
  return user ? (
    <Link prefetch={false} href="/favorites" className="inline-flex rounded-xl border-2 border-green-500 px-6 py-3 font-bold hover:bg-green-500/10">
      Ver minhas listas
    </Link>
  ) : (
    <Link prefetch={false} href="/signin" className="inline-flex rounded-xl border-2 border-green-500 px-6 py-3 font-bold hover:bg-green-500/10">
      Entrar e criar minhas listas
    </Link>
  );
}
