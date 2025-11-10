/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3b82f6', // blue-500
        secondary: '#4b5563', // gray-600
        accent: {
          upvote: '#10b981', // green-500
          downvote: '#ef4444', // red-500
        },
        background: '#f9fafb', // gray-50
      },
    },
  },
  plugins: [],
};
