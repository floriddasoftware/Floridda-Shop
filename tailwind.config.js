/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',  
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1E3A8A',
        secondary: '#3B82F6', 
        accent: '#10B981',
        background: '#F9FAFB', 
        text: '#1F2937', 
      },
    },
  },
  plugins: [],
};