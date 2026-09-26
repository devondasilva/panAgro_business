import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        panagro: {
          dark: '#1A2F15',
          green: '#8DC63F',
          light: '#F8FAF5',
        }
      },

      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
},
  plugins: [],
};
export default config;