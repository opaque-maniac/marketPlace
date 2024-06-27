/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,html}"],
  theme: {
    extend: {
      width: {
        800: "800px",
        400: "400px",
        350: "350px",
        500: "500px",
      },
      height: {
        400: "400px",
      },
    },
  },
  plugins: [],
};
