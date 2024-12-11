import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        inter: 'var(--font-inter)'
      },
      colors: {
        foreground: "var(--foreground)",
        txt: "282C35", // colors-primaryText
        btn: "#0382F7",
        'btn-hover': "#0667D9",
        line: "#e2e8f0", // gray-300
        error: "#DD2C53",
      },
    },
  },
  plugins: [],
} satisfies Config;
