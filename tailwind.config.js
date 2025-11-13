module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,html,mdx}"],
  darkMode: "class",
  theme: {
    extend: {
       screens: {
        mdx: "1074px",
        'min-[500px]': '500px',
        xxs: "450px",
        mdplus: "950px",
        'max-380': { max: "380px" },
      },
      colors: {
        global: {
          background1: "var(--global-bg-1)",
          background2: "var(--global-bg-2)",
          background3: "var(--global-bg-3)",
          background4: "var(--global-bg-4)",
          background5: "var(--global-bg-5)",
          background6: "var(--global-bg-6)",
          background7: "var(--global-bg-7)",
          background8: "var(--global-bg-8)",
          background9: "var(--global-bg-9)",
          background10: "var(--global-bg-10)",
          background11: "var(--global-bg-11)",
          background12: "var(--global-bg-12)",
          background13: "var(--global-bg-13)",
          text1: "var(--global-text-1)",
          text2: "var(--global-text-2)",
          text3: "var(--global-text-3)",
          text4: "var(--global-text-4)",
          text5: "var(--global-text-5)",
          text6: "var(--global-text-6)"
        },
        header: {
          background1: "var(--header-bg-1)",
          text1: "var(--header-text-1)"
        },
        button: {
          background1: "var(--button-bg-1)"
        },
        footer: {
          background1: "var(--footer-bg-1)",
          background2: "var(--footer-bg-2)",
          background3: "var(--footer-bg-3)",
          text1: "var(--footer-text-1)",
          text2: "var(--footer-text-2)"
        }
      },
      fontFamily: {
        'host-grotesk': ['Host Grotesk', 'sans-serif'],
        'archivo': ['Archivo', 'sans-serif'],
        'noto-serif': ['Noto Serif', 'serif'],
        'inter': ['Inter', 'sans-serif'],
      }
    }
  },
  plugins: []
};