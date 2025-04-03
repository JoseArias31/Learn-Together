/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        'custom-gradient': 'linear-gradient(to right,rgb(3, 11, 26),rgb(18, 33, 49))',  
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        kodchasan: ['Kodchasan', 'sans-serif'],
        sans: ['Poppins', 'sans-serif'],
      },
      animation: {
        'constant-glow': 'constant-glow 1.5s ease-in-out infinite', // Nombre de la animación
      },
      keyframes: {
        'constant-glow': {
          '0%': { boxShadow: '0 0px 10px rgba(255, 255, 0, 0.5)' }, // Destello suave
          '50%': { boxShadow: '0 0 10px rgba(255, 255, 0, 1)' },   // Destello más fuerte
          '100%': { boxShadow: '0 0 10px rgba(255, 255, 0, 0.5)' }, // Regresa al estado inicial
        },
      },
    },
  },
  plugins: [],
};
