import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#00d2ff",
        secondary: "#3a7bd5",
        brand: {
          dark: "#0f172a",
          glass: "rgba(255, 255, 255, 0.05)",
        }
      },
      backgroundImage: {
        "gradient-brand": "linear-gradient(135deg, #00d2ff 0%, #3a7bd5 100%)",
        "gradient-surface": "radial-gradient(circle at top left, #1a1a2e, #16213e, #0f3460)",
      },
      backdropBlur: {
        xs: "2px",
      }
    },
  },
  plugins: [],
};
export default config;
