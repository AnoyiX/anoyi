module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            a: {
              'text-decoration': 'none',
              color: theme('colors.blue.500'),
              '&:hover': {
                color: theme('colors.blue.600'),
              }
            },
            code: {
              color: theme('colors.red.500'),
              backgroundColor: theme('colors.slate.100'),
              padding: '2px 4px',
              'border-radius': '4px',
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