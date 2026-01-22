"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { FaUserNinja, FaSearch } from "react-icons/fa";
import { MdFavorite } from "react-icons/md";
import { PiMonitorPlayFill, PiHouseFill } from "react-icons/pi";
import { motion } from "motion/react";

export default function BottomNav() {
    const pathname = usePathname();
    const isActive = (path: string) => pathname === path;

    return (
        <motion.nav
            initial={{ scale: 0.8, opacity: 0, y: 100 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="fixed bottom-0 left-0 right-0 bg-black/20 backdrop-blur-md border-t border-white/10 p-4 flex justify-around items-center z-50"
        >
            <Link href="/" className="text-white flex flex-col items-center">
                <PiHouseFill
                    size={30}
                    className={`${isActive('/') ? "text-gradientColorStops-custom-green" : "text-white"
                        } hover:scale-125 hover:text-gradientColorStops-custom-green active:text-gradientColorStops-custom-green transition-transform`}
                />
            </Link>

            <Link href="/movies" className="text-white flex flex-col items-center">
                <PiMonitorPlayFill
                    size={30}
                    className={`${isActive('/movies') ? "text-gradientColorStops-custom-green" : "text-white"
                        } hover:scale-125 hover:text-gradientColorStops-custom-green active:text-gradientColorStops-custom-green transition-transform`}
                />
            </Link>

            <Link href="/search">
                <Button className="text-white bg-gradient-to-r from-green-500 to-green-600 border border-green-400 rounded-3xl w-10 shadow-lg flex items-center justify-center -mt-7 p-6 hover:from-green-400 hover:to-green-500 focus:ring-2 focus:ring-green-300 transition-all duration-300 transform hover:scale-110">
                    <span className="hover:scale-125 hover:text-gradientColorStops-custom-green">
                        <FaSearch size={30} />
                    </span>
                </Button>
            </Link>

            <Link
                href="/favorites"
                className={`${isActive("/favorites")
                        ? "text-gradientColorStops-custom-green"
                        : "text-white"
                    } hover:scale-125 hover:text-gradientColorStops-custom-green active:text-gradientColorStops-custom-green transition-transform`}
            >
                <MdFavorite size={30} />
            </Link>

            <Link
                href="/signin"
                className={`${isActive("/signin") || isActive("/register")
                        ? "text-gradientColorStops-custom-green"
                        : "text-white"
                    } hover:scale-125 hover:text-gradientColorStops-custom-green active:text-gradientColorStops-custom-green transition-transform`}
            >
                <FaUserNinja size={30} />
            </Link>
        </motion.nav>
    );
}
