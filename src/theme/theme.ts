import { createTheme } from "@mui/material/styles";
import { customColors } from "./colors";

declare module "@mui/material/styles" {
  interface Palette {
    custom: typeof customColors;
  }
  interface PaletteOptions {
    custom?: typeof customColors;
  }
}

export const theme = createTheme({
  palette: {
    ...createTheme().palette,
    primary: {
      main: customColors.skyBlue,
    },
    secondary: {
      main: customColors.deepForest,
    },
    error: {
      main: customColors.sunsetRed,
    },
    background: {
      default: "#fdfdfd",
    },
    text: {
      primary: customColors.mountainBlack,
      secondary: "#555",
    },
    custom: customColors, // свои цвета
  },
});
