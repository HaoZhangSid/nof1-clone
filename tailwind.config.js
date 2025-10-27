/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
      "./app/**/*.{ts,tsx}",
      "./components/**/*.{ts,tsx}",
      "./lib/**/*.{ts,tsx}",
      "./node_modules/@shadcn/ui/dist/**/*.{js,ts,jsx,tsx}", // 如有别名，保持可扫描
    ],
    theme: {
      extend: {
        colors: {
          border: "hsl(var(--border))",
          background: "hsl(var(--background))",
          foreground: "hsl(var(--foreground))",
        },
      },
    },
    plugins: [require("tailwindcss-animate")],
  }
  