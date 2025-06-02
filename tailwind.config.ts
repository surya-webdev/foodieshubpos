import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        pop:["Poppins", "sans-serif"],
        robo:["Roboto", "sans-serif"],
      },
      colors: {
        primary: "var(--background)",
        sec:"var(--sec)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};
export default config;
