/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      montserrat: ["Montserrat"],
      poppins: ["Poppins"],
      roboto: ["Roboto Slab"],
    },
    extend: {
      backgroundImage: {
        "main-bg": "url('../public/images/Login_Desktop_BG.png')",
        "navbar-bg": "url('../public/images/Navbar_BG.png')",
        "ID-bg": "url('https://imgur.com/gallery/OPrMgdn')",
        "template-bg":
          "url('https://upload.wikimedia.org/wikipedia/commons/8/8e/Barangay.svg')",
      },
      colors: {
        "main-red": "#DC715C",
        "main-dark-blue": "#0D0F33",
        "main-light-blue": "#0D89C7",
        "main-white": "#fff",
        "main-off-white": "#E5E4E2",
        "main-low-opacity": "rgba(14, 15, 34, 0.71)",
        "light-violet": "#FBFAFF",
        "light-gray": "#F3F3F3",
        "dark-blue": "#0D0F33",
      },
    },
  },
  plugins: [],
};
