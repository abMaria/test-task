/** @type {import('tailwindcss').Config} */ // eslint-disable-next-line no-undef
module.exports = {
  content: ["index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    screens: {
      //
    },
    fontFamily: {
      sans: ["Raleway", "sans-serif"],
    },
    colors: {
      white: "#FFF",
      black: "#000",
      gray: "#57575F",
    },
    extend: {
      maxWidth: {
        content: "1400px",
      },
    },
  },
  plugins: [],
};
