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
        "drift-slow": {
          "0%, 100%": { transform: "translate(0, 0)" },
          "50%": { transform: "translate(30px, 20px)" },
        },
        "drift-slow-reverse": {
          "0%, 100%": { transform: "translate(0, 0)" },
          "50%": { transform: "translate(-25px, -15px)" },
        },
        "drift-diagonal": {
          "0%, 100%": { transform: "translate(-50%, -50%) scale(1)" },
          "50%": { transform: "translate(-50%, -50%) scale(1.15)" },
        },
      },
      animation: {
        "drift-slow": "drift-slow 20s ease-in-out infinite",
        "drift-slow-reverse": "drift-slow-reverse 25s ease-in-out infinite",
        "drift-diagonal": "drift-diagonal 18s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
