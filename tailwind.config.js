module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        black: {
          100: "#cfd0d3",
          200: "#9ea1a6",
          300: "#6e737a",
          400: "#3d444d",
          500: "#0d1521",
          600: "#0a111a",
          700: "#080d14",
          800: "#05080d",
          900: "#030407",
        },
        white: {
          100: "#fdfeff",
          200: "#fbfcff",
          300: "#f9fbfe",
          400: "#f7f9fe",
          500: "#f5f8fe",
          600: "#c4c6cb",
          700: "#939598",
          800: "#626366",
          900: "#313233",
        },
        primary: {
          100: "#d0eae5",
          200: "#a0d5cb",
          300: "#71bfb1",
          400: "#41aa97",
          500: "#12957d",
          600: "#0e7764",
          700: "#0b594b",
          800: "#073c32",
          900: "#041e19",
        },
        secondary: {
          100: "#eae5f5",
          200: "#d5cceb",
          300: "#c1b2e0",
          400: "#ac99d6",
          500: "#977fcc",
          600: "#7966a3",
          700: "#5b4c7a",
          800: "#3c3352",
          900: "#1e1929",
        },
      },
    },
  },
  plugins: [],
};
