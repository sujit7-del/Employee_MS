/** @type {import('tailwindcss').Config} */
export default {

  darkMode: 'class', // use 'class' strategy for manual toggling

  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      fontFamily: {
        "pacific": ["Pacifico", "cursive"]
      }
    },
  },

  plugins: [],
  
}

