/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563EB',
          hover: '#1D4ED8',
          dark: '#1E3A8A',
        },
        success: '#10B981',
        danger: '#EF4444',
        warning: '#F59E0B',
        info: '#3B82F6',
        analytics: '#8B5CF6',
        background: '#F8FAFC',
        card: '#FFFFFF',
        sidebar: {
          DEFAULT: '#0F172A',
          text: '#CBD5F5',
        },
        border: '#E2E8F0',
        divider: '#F1F5F9',
        text: {
          primary: '#0F172A',
          secondary: '#64748B',
        }
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

