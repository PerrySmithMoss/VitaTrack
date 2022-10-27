/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "brand-green": "#00CC99",
        "brand-green-hover": "#10A882",
      },
      screens: {
        'xxs': '350px',
        // => @media (min-width: 350px) { ... }

        'xs': '500px',
        // => @media (min-width: 500px) { ... }

        'smx': '585px',
        // => @media (min-width: 585px) { ... }

        'sm': '700px',
        // => @media (min-width: 700px) { ... }
  
        'md': '768px',
        // => @media (min-width: 768px) { ... }
  
        'lg': '1024px',
        // => @media (min-width: 1024px) { ... }
  
        'xl': '1280px',
        // => @media (min-width: 1280px) { ... }
  
        '2xl': '1536px',
        // => @media (min-width: 1536px) { ... }
      }
    },
  },
  plugins: [],
};
