// app/layout.tsx
import { ReactNode } from "react";
import "./globals.css";
import Link from "next/link";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>My Website</title>
      </head>
      <body className="flex flex-col bg-gradient-to-r from-slate-800 to-gray-900 min-h-screen">
        <header className=" text-white p-4"></header>
        <main className="flex-1 p-4 ">{children}</main>
        <footer className=" text-white p-4 mt-auto">

          <Link href="/home" className="hover:underline">Home</Link>
          <Link href="/about" className="hover:underline">About</Link>
          <Link href="/contact" className="hover:underline">Contact</Link>
   
        </footer>
      </body>
    </html>
  );
};

export default Layout;
