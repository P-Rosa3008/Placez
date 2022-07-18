import { createTheme } from "@material-ui/core";

const themeOptions = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#14213d",
      light: "#6b82b3",
      dark: "#0a111f",
    },
    secondary: {
      main: "#fda10d",
      light: "#f1c57e",
      dark: "#73501c",
    },
    text: {
      primary: "rgba(26,26,26,0.87)",
    },
  },
  typography: {
    h1: {
      fontFamily: "Montserrat",
      fontSize: 48,
      fontWeight: 500,
      lineHeight: 1.54,
      position: "static",
    },
    h2: {
      fontFamily: "Montserrat",
      fontSize: 36,
      lineHeight: 1.44,
    },
    h3: {
      fontFamily: "Montserrat",
      fontSize: 28,
      lineHeight: 1.34,
    },
    fontFamily: "Montserrat",
    fontSize: 16,
    fontWeightRegular: 300,
    fontWeightMedium: 500,
    h4: {
      fontSize: 20,
      lineHeight: 1.24,
    },
    body1: {
      fontSize: 17,
      lineHeight: 1.24,
    },
    body2: {
      fontSize: 16,
      fontWeight: 700,
      lineHeight: 1.24,
    },
    button: {
      fontSize: 14,
      fontWeight: 500,
      lineHeight: 1.18,
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          ".css-nnbavb": { width: 0 },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: "rgba(0, 0, 0, 0.54)",
          borderWidth: "1px",
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: { "&.Mui-expanded": { margin: "0px 0" } },
      },
    },
    MuiInput: {
      styleOverrides: {
        underline: {
          "&:before": { borderBottom: "1px solid rgba(0, 0, 0, 0.54)" },
        },
        root: { "&:after": { transition: "none" } },
      },
    },
    MuiSwitch: { styleOverrides: { track: { backgroundColor: "black" } } },
  },
});

export default themeOptions;
