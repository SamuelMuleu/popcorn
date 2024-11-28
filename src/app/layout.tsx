// app/layout.tsx
import { ReactNode } from 'react';
import './globals.css';  
import Link from 'next/link';

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
      <body className="flex flex-col min-h-screen">
        <header className="bg-gray-800 text-white p-4">
          <nav>
            <ul className="flex space-x-4">
              <Link href="/" className="hover:underline">Home</Link>
              <li><a href="/movies" className="hover:underline">movies</a></li>
              <li><a href="/contact" className="hover:underline">Contact</a></li>
            </ul>
          </nav>
        </header>
        <main className="flex-1 p-4">
          {children} 
        </main>
        <footer className="bg-gray-800 text-white p-4 mt-auto">
          <p>&copy; 2024 My Website</p>
        </footer>
      </body>
    </html>
  );
}

export default Layout;
