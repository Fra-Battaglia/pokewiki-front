/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  
  safelist: [
    'from-(--type-grass)',
    'from-(--type-poison)',
    'from-(--type-fire)',
    'from-(--type-flying)',
    'from-(--type-water)',
    'from-(--type-bug)',
    'from-(--type-normal)',
    'from-(--type-electric)',
    'from-(--type-ground)',
    'from-(--type-fairy)',
    'from-(--type-fighting)',
    'from-(--type-psychic)',
    'from-(--type-rock)',
    'from-(--type-ghost)',
    'from-(--type-ice)',
    'from-(--type-dragon)',
    'from-(--type-dark)',
    'from-(--type-steel)',
    
    'to-(--type-grass)',
    'to-(--type-poison)',
    'to-(--type-fire)',
    'to-(--type-flying)',
    'to-(--type-water)',
    'to-(--type-bug)',
    'to-(--type-normal)',
    'to-(--type-electric)',
    'to-(--type-ground)',
    'to-(--type-fairy)',
    'to-(--type-fighting)',
    'to-(--type-psychic)',
    'to-(--type-rock)',
    'to-(--type-ghost)',
    'to-(--type-ice)',
    'to-(--type-dragon)',
    'to-(--type-dark)',
    'to-(--type-steel)',
  ]
}

