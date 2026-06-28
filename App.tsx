import React from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  useFonts,
  Outfit_400Regular,
  Outfit_500Medium,
  Outfit_600SemiBold,
  Outfit_700Bold,
  Outfit_800ExtraBold,
} from "@expo-google-fonts/outfit";
import { View, ActivityIndicator } from "react-native";
import RootNavigator from "./src/navigation/RootNavigator";
import { paperDarkTheme, paperLightTheme } from "./src/theme/paperTheme";
import useThemeStore from "./src/stores/useThemeStore";

export default function App() {
  const [fontsLoaded] = useFonts({
    Outfit_400Regular,
    Outfit_500Medium,
    Outfit_600SemiBold,
    Outfit_700Bold,
    Outfit_800ExtraBold,
  });

  const mode = useThemeStore((state) => state.mode);
  const isDark = mode === "dark";

  const paperTheme = isDark ? paperDarkTheme : paperLightTheme;
  const navTheme = isDark ? DarkTheme : DefaultTheme;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <PaperProvider theme={paperTheme}>
          <NavigationContainer theme={navTheme}>
            <RootNavigator />
            <StatusBar style={isDark ? "light" : "dark"} />
          </NavigationContainer>
        </PaperProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
