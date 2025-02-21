module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        myCustomTheme: {
          primary: '#1E40AF', // Example primary color
          secondary: '#9333EA', // Example secondary color
          accent: '#F59E0B',
          neutral: '#3D4451',
          'base-100': '#FFFFFF', // Background color
        },
      },
    ],
  },
  
};
