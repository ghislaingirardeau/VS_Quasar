/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  // Tailwind purge par défaut les classes non présentes en dur dans ton code, donc si j'ajoute des classes dynamiquement, il faut les ajouter ici
  // je dis donc à Tailwind que ces classes seront utilisées dynamiquement dans mon code
  safelist: [
    'bg-red-200',
    'bg-blue-200',
    'bg-green-200',
    'bg-yellow-200',
    'bg-purple-200',
    'bg-pink-200',
    'bg-indigo-200',
    'bg-slate-200',
    'bg-orange-200',
    'bg-teal-200',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
