/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Custom color palette from Figma design
        gray: {
          50: '#FAFAFA',
          100: '#F4F4F6',
          200: '#E8E8EB',
          300: '#D4D4DA',
          400: '#A7A7B0',
          500: '#747480', // muted
          600: '#54545E',
          700: '#3D3E45', // primary
          800: '#2D2D35',
          900: '#19181C',
        },
        indigo: {
          100: '#DBE3FF',
          500: '#4534FF',
          600: '#3A11FF',
          700: '#2E04E8', // primary
        },
        blue: {
          100: '#DBE3FF',
          200: '#D5DDFB',
          600: '#4534FF',
          700: '#2E04E8', // Use the same as indigo-700 for consistency
        },
        green: {
          100: '#D1FAE5',
          200: '#A7F3D0',
          700: '#047857',
        },
        red: {
          700: '#BD2F1D',
        },
        yellow: {
          700: '#A17807',
        },
        emerald: {
          100: '#D1FAE5',
          200: '#A7F3D0',
          700: '#047857',
        },
        orange: {
          50: '#FFF7ED',
          200: '#FED7AA',
          700: '#C2410C',
        },
        base: {
          white: '#FFFFFF',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      fontSize: {
        'xs': ['10px', { lineHeight: '16px' }],
        'sm': ['12px', { lineHeight: '20px' }],
        'base': ['14px', { lineHeight: '24px' }],
        'lg': ['16px', { lineHeight: '24px' }],
        'xl': ['18px', { lineHeight: '28px' }],
        '2xl': ['20px', { lineHeight: '28px' }],
        '3xl': ['24px', { lineHeight: '32px' }],
      },
      fontWeight: {
        'normal': '400',
        'medium': '500',
        'semibold': '600',
        'bold': '700',
      },
    },
  },
  plugins: [],
}