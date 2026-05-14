import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "text-primary": "#ffffff",
        "text-secondary": "#94a3b8",
        "background-obsidian": "#0f111a",
        "surface-glass": "rgba(255, 255, 255, 0.03)",
        "surface-glass-deep": "rgba(15, 17, 26, 0.4)",
        "border-metallic": "rgba(255, 255, 255, 0.1)",
        primary: "#ffffff",
        "accent-white": "#ffffff",
        "accent-platinum": "#e2e8f0",
        "accent-steel": "#94a3b8",
      },
      fontFamily: {
        headline: ["var(--font-playfair)", "serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      spacing: {
        "container-max": "1440px",
        "margin-desktop": "80px",
      },
    },
  },
  plugins: [],
};
export default config;
