/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        pacifico: ["Pacifico", "cursive"],
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        spring: "#64F58D",
        violet: "#0C0A3E",
      },
    },
  },
  plugins: [],
};
