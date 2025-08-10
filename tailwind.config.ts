import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bgbutton:"#31373E",
        background: "var(--background)",
        gradientColorStops: {
          'custom-green': '#52B788',
          'custom-black': '#FFFFFF',
        },
      },
    },
  },
  plugins: [
      require('tailwind-scrollbar'),
  ],
} satisfies Config;
