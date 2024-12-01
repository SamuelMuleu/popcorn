import { ReactNode } from "react";
import "./globals.css";
import Link from "next/link";
import { Button } from "@/components/ui/button";

import { FaUserNinja } from "react-icons/fa";
import { IoIosAlbums } from "react-icons/io";
import { PiMonitorPlayFill } from "react-icons/pi";
import { PiHouseFill } from "react-icons/pi";
import { FaPlus } from "react-icons/fa";
interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Popcorn</title>
      </head>
      <body className="flex flex-col bg-gradient-to-br from-gray-600 to-slate-800 min-h-screen">
        <header></header>
        <main className="flex-1 p-4">{children}</main>

        {/* Barra de navegação fixa */}
        <nav className="fixed bottom-0 left-0 right-0 bg-gray-800 p-4 flex justify-around items-center">
          <Link href="/" className="text-white flex flex-col items-center">
            <PiHouseFill size={30}className="hover:scale-125 hover:text-gradientColorStops-custom-green"/>
          </Link>
          <Link
            href="/movies"
            className="text-white flex flex-col items-center"
          >
            <PiMonitorPlayFill size={30}className="hover:scale-125 hover:text-gradientColorStops-custom-green"/>
          </Link>
          <Button className="text-white bg-gradient-to-r from-green-500 to-green-600 border border-green-400 rounded-full shadow-lg flex items-center justify-center -mt-7 mr-2 hover:from-green-400 hover:to-green-500 focus:ring-2 focus:ring-green-300 transition-all duration-300 transform hover:scale-110">
            <span className="hover:scale-125 hover:text-gradientColorStops-custom-green"><FaPlus /></span>
          </Button>
          <Link
            href="/library"
            className="text-white flex flex-col items-center"
          >
            <IoIosAlbums size={30} className="hover:scale-125 hover:text-gradientColorStops-custom-green"/>
          </Link>
          <Link
            href="/profile"
            className="text-white flex flex-col items-center"
          >
            <FaUserNinja size={30} className="hover:scale-125 hover:text-gradientColorStops-custom-green" />
          </Link>
        </nav>
      </body>
    </html>
  );
};

export default Layout;
