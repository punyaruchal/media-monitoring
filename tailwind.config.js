module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors:{
        heroBg: '#FEEBCF',
        primary: '#007663',
      },
      fontFamily: {
        poppins: ['Poppins'],
        SerifDisplay: ['DM Serif Display']
      },
      keyframes: {
        'fade-in-right': {
          '0%' :{
            opacity: '0',
            transform: 'translateX(-100px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)'
          },
        },
        'fade-in-down':{
          '0%' :{
            opacity: '0',
            transform: 'translateY(-50px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          },
        },
        'fade-in-up':{
          '0%' :{
            opacity: '0',
            transform: 'translateY(50px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          },
        },
        'scale-fade-in-down':{
          '0%' :{
            
            opacity: '0',
            transform: 'scale(0.98) translateY(-10px)'
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1) translateY(0)'
          },
        },
        'scale-fade-in-up':{
          '0%' :{
            opacity: '0',
            transform: 'scale(0.95) translateY(10px)'
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1) translateY(0)'
          },
        }
      },
      animation: {
        'fade-in-right': 'fade-in-right 1s ease-out forwards',
        'fade-in-down': 'fade-in-down 1s ease-out forwards',
        'fade-in-up': 'fade-in-up 1s ease-out forwards',
        'scale-fade-in-down': 'scale-fade-in-down 1s ease-out forwards',
        'scale-fade-in-up': 'scale-fade-in-up 1s ease-out forwards'
      },
    },
    screens: {
      '2xl': {'max': '1535px'},
      // => @media (max-width: 1535px) { ... }

      'xl': {'max': '1279px'},
      // => @media (max-width: 1279px) { ... }

      'lg': {'max': '1023px'},
      // => @media (max-width: 1023px) { ... }

      'md': {'max': '767px'},
      // => @media (max-width: 767px) { ... }

      'sm': {'max': '639px'},
      // => @media (max-width: 639px) { ... }
      'xsm': {'max': '560px'},
      
      '2xsm': {'max': '480px'},
    }
  },
  variants: {
    extend: { borderWidth: ['last'] },
  },
  plugins: [],
}
