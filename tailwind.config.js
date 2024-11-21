/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [

    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite/**/*.js"
  
  ],
  theme: {
    extend: {
      backdropBlur: {
        xs: '120px',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 300ms ease-in-out',
        fadeOut: 'fadeOut 300ms ease-in-out',
      },
      backgroundImage: {
        "get-started-img": "url('./assets/ic_ellipse.png')",
        "footer-texture": "url('/img/footer-texture.png')",
        "bg-phone": "url('./assets/images/hero_endframe__cvklg0xk3w6e_large 2.png')",
        "bg-plane": "url('./assets/images/bgImage.png')",
        "bg-clouds": "url('./assets/images/bgImage 2.png')",
      },
      colors: {
        transparent: "transparent",
        current: "currentColor",
        customGray: "#999FAE",
        customPurple: "#A36EBA",
        custome273150: "#273150",
        customBg: "#FDFFEF ",
        F5F5F5:"#F5F5F5",
        green00FF66: "#00FF66",
        DB4444:"#DB4444"

      },
      fontSize: {
        custom_h1: [
          "76px",
          {
            fontFamily: '"Poppins", sans-serif',
            fontStyle: "bold",
            fontWeight: "700",
            // lineHeight: "110%",
            // letterSpacing: "-3.5px",
          },
        ],
        custom_h2: [
          "62px",
          {
            fontFamily: '"Poppins", sans-serif',
            fontWeight: "700",
            fontStyle: "bold",
            lineHeight: "110%",
            letterSpacing: "0px",
          },
        ],
        custom_h3: [
          "52px",
          {
            fontFamily: '"Poppins", sans-serif',
            fontSize: "52px",
            fontWeight: "700",
            fontStyle: "bold",
            // lineHeight: "115%",
            // letterSpacing: "-2px",
          },
        ],
        custom_h4: [
          "42px",
          {
            fontFamily: '"Poppins", sans-serif',
            fontWeight: "700",
            fontStyle: "bold",
            // lineHeight: "120%",
            // letterSpacing: "-2px",
          },
        ],
        custom_h5: [
          "32px",
          {
            fontFamily: '"Poppins", sans-serif',
            fontWeight: "700",
            fontStyle: "bold",
            // lineHeight: "40px",
            // letterSpacing: "-1px",
          },
        ],
        custom_h6: [
          "24px",
          {
            fontFamily: '"Poppins", sans-serif',
            fontSize: "24px",
            fontWeight: "700",
            fontStyle: "bold",
            // lineHeight: "130%",
            // letterSpacing: "-0.8px",
          },
        ],
        custom_h6r: [
          "24px",
          {
            fontFamily: '"Poppins", sans-serif',
            fontSize: "24px",
            fontWeight: "400",
            // lineHeight: "130%",
            // letterSpacing: "-0.8px",
          },
        ],
        body_copy1: [
          "20px",
          {
            fontFamily: '"Poppins", sans-serif',
            fontWeight: "400",
            // lineHeight: "150%",
            // letterSpacing: "-0.5px",
          },
        ],
        body_copy1_b: [
          "20px",
          {
            fontFamily: '"Poppins", sans-serif',
            fontWeight: "700",
            fontStyle: "bold",
            // lineHeight: "150%",
            // letterSpacing: "-0.5px",
          },
        ],
        body_copy2: [
          "18px",
          {
            fontFamily: '"Poppins", sans-serif',
            fontWeight: "400",
            // lineHeight: "140%",
            // letterSpacing: "-0.5px",
          },
        ],
        body_copy2_black: [
          "18px",
          {
            fontFamily: '"Poppins", sans-serif',
            fontWeight: "900",
            fontStyle: "bold",
            // lineHeight: "140%",
            // letterSpacing: "-0.5px",
          },
        ],
        small1: [
          "16px",
          {
            fontFamily: '"Poppins", sans-serif',
            fontWeight: "400",
            // lineHeight: "145%",
            // letterSpacing: "-0.3px",
          },
        ],
        small1_bold: [
          "16px",
          {
            fontFamily: '"Poppins", sans-serif',
            fontWeight: "700",
            fontStyle: "bold",
            // lineHeight: "145%",
            // letterSpacing: "-0.3px",
          },
        ],
        small2: [
          "14px",
          {
            fontFamily: '"Poppins", sans-serif',
            fontWeight: "400",
            // lineHeight: "145%",
            // letterSpacing: "-0.2px",
          },
        ],
        small2_b: [
          "14px",
          {
            fontFamily: '"Poppins", sans-serif',
            fontWeight: "700",
            fontStyle: "bold",
            // lineHeight: "145%",
            // letterSpacing: "-0.2px",
          },
        ],
        small3: [
          "12px",
          {
            fontFamily: '"Poppins", sans-serif',
            fontWeight: "400",
            // lineHeight: "130%",
            // letterSpacing: "-0.2px",
          },
        ],
        small3_b: [
          "12px",
          {
            fontFamily: '"Poppins", sans-serif',
            fontWeight: "700",
            fontStyle: "bold",
            // lineHeight: "130%",
            // letterSpacing: "-0.2px",
          },
        ],
        small4: [
          "10px",
          {
            fontFamily: '"Poppins", sans-serif',
            fontWeight: "400",
            // lineHeight: "130%",
            // letterSpacing: "-0.2px",
          },
        ],
        small4_b: [
          "10px",
          {
            fontFamily: '"Poppins", sans-serif',
            fontWeight: "700",
            fontStyle: "bold",
            // lineHeight: "130%",
            // letterSpacing: "-0.2px",
          },
        ],
        caption: [
          "16px",
          {
            fontFamily: '"Poppins", sans-serif',
            fontWeight: "700",
            fontStyle: "bold",
            // lineHeight: "150%",
            // letterSpacing: "1.5px",
          },
        ],
        caption2: [
          "14px",
          {
            fontFamily: '"Poppins", sans-serif',
            fontWeight: "700",
            fontStyle: "bold",
            // lineHeight: "140%",
            // letterSpacing: "1.5px",
          },
        ],
      },
      fontFamily: {
        Sanchez: ["Sanchez", 'serif'],
        body: ['"Poppins", sans-serif'],
        // sans: ['"Noto Sans Arabic"', "sans-serif"],
        arial: ["arial", "sans-serif"],
        verdana: ["verdana", "sans-serif"],
        inter: ["inter", "sans-serif"],
        lato: ["lato", "sans-serif"],
        open_sans: ["open_sans", "sans-serif"],
        montserrat: ["montserrat", "sans-serif"],
        karla: ["karla", "sans-serif"],
        inconsolata: ["inconsolata", "sans-serif"],
      },
    },

  },
  plugins: [
    require('tailwind-scrollbar-hide'),
    require('flowbite/plugin')
  ],
};
