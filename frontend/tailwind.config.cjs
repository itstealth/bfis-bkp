/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      screens: {
        xl: "1290px",
        lg: "1024px",
        md: "768px",
        sm: "640px",
      },
      padding: "5px",
    },
    extend: {
      spacing: {
        15: "60px",
        25: "100px",
        2.5: "10px",
        4.5: "18px",
        7.5: "30px",
        12.5: "50px",
      },
      backgroundImage: {
        "testimonial-banner": "url('assets/images/testimonial/bg-img.png')",
        "newsletter-banner": "url('assets/images/newsletter/bg-img.png')",
      },
      boxShadow: {
        sm: "0px 0px 10px 0px rgba(0, 0, 0, 0.2)",
        "3xl": "0px 4.8px 24.4px -6px rgba(19, 16, 34, 0.10)",
        "4xl": "0px 4.4px 20px -1px rgba(19, 16, 34, 0.05)",
      },
      fontFamily: {
        playfair: ['"Playfair Display"', "serif"],
        poppins: ['"Poppins"', "sans-serif"],
        montserrat: ['"Montserrat"', "sans-serif"],
      },
      colors: {
        nblue: "#053a86",
        dblue: "#003366",
        lblue: "#194775",
        dteal: "#004d40",
        vgreen: "#43a047",
        hgreen: "#388e3c",
        mgray: "#4e4e4e",
        newBlue: "#0a1b2f",
        newRed: "#a42f37",
        schoolgrey: "#313131",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        warm: {
          DEFAULT: "var(--warm)",
          foreground: "var(--warm-foreground)",
        },
        green: {
          DEFAULT: "var(--green)",
          foreground: "var(--green-foreground)",
        },
        cream: {
          DEFAULT: "#f5f5dc",
          foreground: "var(--cream-foreground)",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "left-right": {
          "50%": { transform: "translateX(14px)" },
        },
        "left-right-2": {
          "50%": { transform: "translateX(-40px)" },
        },
        "up-down": {
          "50%": { transform: "translateY(-10px)" },
        },
        skw: {
          "50%": { transform: "skewX(5deg)" },
        },
        "expend-width-height": {
          "100%": {
            width: "56%",
            height: "56%",
          },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(calc(-100% - var(--gap)))" },
        },
        "marquee-vertical": {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(calc(-100% - var(--gap)))" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "left-right": "left-right 2s linear infinite",
        "left-right-2": "left-right-2 4s linear infinite",
        "up-down": "up-down 2s linear infinite",
        skw: "skw 2s linear infinite",
        "expend-width-height": "expend-width-height 2s linear infinite",
        marquee: "marquee var(--duration) infinite linear",
        "marquee-vertical": "marquee-vertical var(--duration) linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
