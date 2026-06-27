import React from "react";
import { StyleSheet, ViewProps } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import useAppTheme from "../../hooks/useAppTheme";

export const GradientBackground = ({ children, style, ...props }: ViewProps) => {
  const { colors } = useAppTheme();

  return (
    <LinearGradient
      colors={colors.backgroundGradient}
      start={{ x: 0, y: 1 }}
      end={{ x: 1, y: 0 }}
      style={[styles.container, style]}
      {...props}
    >
      {children}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
