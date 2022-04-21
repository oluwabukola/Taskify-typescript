module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      
        boxShadow: {
          'input': 'inset 0 0 5px rgba(0,0,0)',
          "focus": '0 0 10px 1000px rgba(0,0,0,0.5)',
          "single": '0 0 5px rgb(0,0,0)',
        }
     
  
    },
  },
  plugins: [],
}