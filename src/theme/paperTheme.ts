import { configureFonts, MD3DarkTheme, MD3LightTheme } from "react-native-paper";
import { Colors } from "./colors";
import { Fonts } from "./fonts";

const fontConfig = {
  default: {
    fontFamily: Fonts.regular,
  },
  displayLarge: { fontFamily: Fonts.bold },
  displayMedium: { fontFamily: Fonts.bold },
  displaySmall: { fontFamily: Fonts.bold },
  headlineLarge: { fontFamily: Fonts.bold },
  headlineMedium: { fontFamily: Fonts.semiBold },
  headlineSmall: { fontFamily: Fonts.semiBold },
  titleLarge: { fontFamily: Fonts.semiBold },
  titleMedium: { fontFamily: Fonts.medium },
  titleSmall: { fontFamily: Fonts.medium },
  labelLarge: { fontFamily: Fonts.medium },
  labelMedium: { fontFamily: Fonts.regular },
  labelSmall: { fontFamily: Fonts.regular },
  bodyLarge: { fontFamily: Fonts.regular },
  bodyMedium: { fontFamily: Fonts.regular },
  bodySmall: { fontFamily: Fonts.regular },
};

const customFonts = configureFonts({ config: fontConfig });

export const paperLightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: Colors.light.primary,
    background: Colors.light.background,
    surface: Colors.light.surface,
    surfaceVariant: Colors.light.surfaceAlt,
    onSurface: Colors.light.text,
    outline: Colors.light.border,
    error: Colors.light.danger,
  },
  fonts: customFonts,
};

export const paperDarkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: Colors.dark.primary,
    background: Colors.dark.background,
    surface: Colors.dark.surface,
    surfaceVariant: Colors.dark.surfaceAlt,
    onSurface: Colors.dark.text,
    outline: Colors.dark.border,
    error: Colors.dark.danger,
  },
  fonts: customFonts,
};
