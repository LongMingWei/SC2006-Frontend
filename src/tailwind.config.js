/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#FFFFFF',
        orange: '#FFA154',
        black : '#000000',
      },
      fontFamily:{
        pmedium: ["Poppins-Medium","sans-serif"],
        pmedium: ["Jua-Regular","sans-serif"]
      }
    },
  },
  plugins: [],
}

