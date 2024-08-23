/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,tsx,ts,jsx,js}"],
  theme: {
    extend: {
      maxWidth: {
        1300: "1300px",
        800: "800px",
      },
      width: {
        600: "600px",
        500: "500px",
        250: "250px",
      },
      height: {
        450: "450px",
      },
      minWidth: {
        600: "600px",
      },
    },
  },
  plugins: [],
};
