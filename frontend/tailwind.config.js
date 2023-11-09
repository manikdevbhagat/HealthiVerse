/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryColor: "#9333EA",
        yellowColor: "#FEB60D", 
        purpleColor: "#9771FF",
        irisBlueColor: "#01B5C5",
        greenColor: '#20ba3c',
        headingColor: "#181A1E",
        textColor: "#27292e",
      },

      boxShadow: {
        panelShadow: "rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;",
      },
    },
  },
  plugins: [],
}

