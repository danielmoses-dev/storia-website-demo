import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-outfit)", "system-ui", "sans-serif"],
      },
      colors: {
        mango: {
          light: "#FFE082",
          DEFAULT: "#FFB74D",
          dark: "#FFA726",
          deep: "#FB8C00",
        },
        chocolate: {
          light: "#A1887F",
          DEFAULT: "#8D6E63",
          dark: "#5D4037",
          deep: "#3E2723",
        },
        pomegranate: {
          light: "#EF5350",
          DEFAULT: "#E57373",
          dark: "#C62828",
          deep: "#B71C1C",
        },
      },
      backgroundImage: {
        "radial-glow": "radial-gradient(circle at center, var(--tw-gradient-stops))",
      },
      animation: {
        "spin-slow": "spin 20s linear infinite",
        "pulse-subtle": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
