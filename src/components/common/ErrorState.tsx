import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import useAppTheme from "../../hooks/useAppTheme";
import { Fonts } from "../../theme/fonts";

type Props = {
  message?: string;
  onRetry?: () => void;
};

const ErrorState = ({ message, onRetry }: Props) => {
  const { colors } = useAppTheme();

  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name="wifi-off" size={48} color={colors.textMuted} />
      <Text style={[styles.title, { color: colors.text }]}>Something went wrong</Text>
      <Text style={[styles.subtitle, { color: colors.textMuted }]}>
        {message || "We couldn't load this right now. Check your connection and try again."}
      </Text>
      {onRetry && (
        <Button mode="contained" onPress={onRetry} style={styles.button}>
          Try Again
        </Button>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
    paddingVertical: 60,
  },
  title: {
    fontSize: 17,
    fontFamily: Fonts.semiBold,
    marginTop: 14,
  },
  subtitle: {
    fontSize: 13,
    textAlign: "center",
    marginTop: 6,
    lineHeight: 19,
  },
  button: {
    marginTop: 20,
    borderRadius: 8,
  },
});

export default ErrorState;
