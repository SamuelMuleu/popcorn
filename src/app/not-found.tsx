import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-xl mx-auto py-20 text-center">
      <p className="text-6xl" aria-hidden="true">🍿</p>
      <h1 className="mt-4 text-3xl font-black">Página não encontrada</h1>
      <p className="mt-3 text-gray-300">
        Esse endereço não existe ou o título foi removido da base de dados. Que tal procurar outra coisa?
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Link href="/search" className="rounded-xl bg-green-700 px-5 py-2.5 font-bold hover:bg-green-600">Buscar</Link>
        <Link href="/movies" className="rounded-xl border border-white/20 px-5 py-2.5 hover:bg-white/5">Populares</Link>
        <Link href="/artigos" className="rounded-xl border border-white/20 px-5 py-2.5 hover:bg-white/5">Artigos</Link>
      </div>
    </div>
  );
}
