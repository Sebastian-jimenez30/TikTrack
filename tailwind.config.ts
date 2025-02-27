import type { Config } from "tailwindcss";

export default {
  theme: {
    extend: {
      colors: {
        lightPurple: "#AE85FF",
        darkPurple: "#6A1FFF",
        purple: "#8C52FF",
        white: "#FFFFFF",
        black: "#111111",
        darkGray: "#2A2A2A",
      },
    },
  },
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./src/**/*.{js,ts,jsx,tsx,mdx}"],
  plugins: [],
} satisfies Config;
