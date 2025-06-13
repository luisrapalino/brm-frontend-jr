import "vuetify/styles";
import { createVuetify } from "vuetify";
import { aliases, mdi } from "vuetify/iconsets/mdi";
import "@mdi/font/css/materialdesignicons.css";

export const vuetify = createVuetify({
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: { mdi },
  },
  theme: {
    defaultTheme: "lightTheme",
    themes: {
      lightTheme: {
        dark: false,
        colors: {
          primary: "#43A047", // verde
          secondary: "#66BB6A",
          background: "#F8F9FA",
          surface: "#FFFFFF",
          onPrimary: "#FFFFFF",
          onSecondary: "#FFFFFF",
        },
      },
      darkTheme: {
        dark: true,
        colors: {
          primary: "#66BB6A",
          background: "#121212",
          surface: "#1E1E1E",
          onPrimary: "#000000",
        },
      },
    },
  },
});
