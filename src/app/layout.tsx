"use client";

import { ReactNode } from "react";
import "./globals.css";
import Link from "next/link";

import { Button } from "@/components/ui/button";

import { FaUserNinja } from "react-icons/fa";
import { MdFavorite } from "react-icons/md";
import { PiMonitorPlayFill } from "react-icons/pi";
import { PiHouseFill } from "react-icons/pi";
import { FaSearch } from "react-icons/fa";
import { usePathname } from "next/navigation";
import AuthProvider from "@/app/context/AuthContext";
import { motion } from "motion/react";
interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Popcorn</title>
        <link rel="icon" href="/assets/popcorn.svg" />
      </head>
      <body className="flex flex-col bg-gradient-to-br from-gray-600 to-slate-800 min-h-screen">
        
      <AuthProvider>

        <main className="flex-1 p-4">{children}</main>


        <motion.nav
        
        initial={{ scale: 0.8, opacity: 0, y: 100 }} // Inicial com a escala reduzida e posição acima
        animate={{ scale: 1, opacity: 1, y: 0 }} // Animação que faz a escala retornar e sobe para a posição inicial
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed bottom-0 left-0 right-0 bg-gray-800 p-4  flex justify-around items-center">
          <Link href="/" className="text-white flex flex-col items-center">
            <PiHouseFill
              size={30}
              className={`${
                isActive('/') ? "text-gradientColorStops-custom-green" : "text-white"
              } hover:scale-125 hover:text-gradientColorStops-custom-green active:text-gradientColorStops-custom-green`}
            />
          </Link>
          <Link
            href="/movies"
            className="text-white flex flex-col items-center"
          >
            <PiMonitorPlayFill
              size={30}
              className={`${
                isActive('/movies') ? "text-gradientColorStops-custom-green" : "text-white"
              } hover:scale-125 hover:text-gradientColorStops-custom-green active:text-gradientColorStops-custom-green`}
            />
          </Link>
          <Link href={"/search"}>
          <Button className="text-white bg-gradient-to-r from-green-500 to-green-600 border border-green-400 rounded-3xl w-10 shadow-lg flex items-center justify-center -mt-7 p-6 hover:from-green-400 hover:to-green-500 focus:ring-2 focus:ring-green-300 transition-all duration-300 transform hover:scale-110">
            <span className="hover:scale-125 hover:text-gradientColorStops-custom-green">
              <FaSearch size={30} />
            </span>
          </Button>
          </Link>
          <Link
            href="/favorites"
            className={`${
              isActive("/favorites")
                ? "text-gradientColorStops-custom-green"
                : "text-white"
            } hover:scale-125 hover:text-gradientColorStops-custom-green active:text-gradientColorStops-custom-green`}
          >
            <MdFavorite
              size={30}
              className="hover:scale-125 hover:text-gradientColorStops-custom-green active:text-gradientColorStops-custom-green"
            />
          </Link>
          <Link
            href="/signin"
            className={`${
              isActive("/signin") || isActive("/register")
                ? "text-gradientColorStops-custom-green"
                : "text-white"
            } hover:scale-125 hover:text-gradientColorStops-custom-green active:text-gradientColorStops-custom-green`}
          >
            <FaUserNinja
              size={30}
              className="hover:scale-125 hover:text-gradientColorStops-custom-green"
            />
          </Link>
        </motion.nav>
        </AuthProvider>
      </body>
    </html>
  );
};

export default Layout;
