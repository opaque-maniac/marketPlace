/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,tsx,ts,jsx,js}"],
  theme: {
    extend: {
      maxWidth: {
        1300: "1300px",
        800: "800px",
        1770: "1770px",
      },
      width: {
          746: "746px",
        600: "600px",
        500: "500px",
        250: "250px",
        300: "300px",
        400: "400px",
        350: "350px",
        200: "200px",
        270: "270px",
        170: "170px",
        399: "399px",
        800: "800px",
      },
      height: {
        450: "450px",
        200: "200px",
        600: "600px",
        500: "500px",
        344: "370px",
        350: "350px",
        250: "250px",
        138: "138px",
        180: "180px",
          168: "168px"
      },
      minWidth: {
        600: "600px",
      },
      minHeight: {
        400: "400px",
      },
    },
  },
  plugins: [],
};
