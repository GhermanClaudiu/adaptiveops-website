import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0B1F3B",
        accent: "#2F80ED",
        secondary: "#10B981",
        dark: "#111827",
        mid: "#6B7280",
        light: "#F3F4F6",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      keyframes: {
        "hero-gradient": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        "drift-slow": {
          "0%, 100%": { transform: "translate(0, 0)" },
          "50%": { transform: "translate(40px, 25px)" },
        },
        "drift-slow-reverse": {
          "0%, 100%": { transform: "translate(0, 0)" },
          "50%": { transform: "translate(-35px, -20px)" },
        },
      },
      animation: {
        "hero-gradient": "hero-gradient 8s ease-in-out infinite",
        "drift-slow": "drift-slow 20s ease-in-out infinite",
        "drift-slow-reverse": "drift-slow-reverse 25s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
