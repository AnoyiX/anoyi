module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            a: {
              '&:hover': {
                color: theme('colors.blue.600'),
              }
            },
            code: {
              color: theme('colors.red.600'),
              backgroundColor: theme('colors.gray.100'),
              padding: '2px 4px',
              'border-radius': '2px',
              fontWeight: 500,
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
          }
        }
      })
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}