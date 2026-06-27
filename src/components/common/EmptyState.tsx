import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import useAppTheme from "../../hooks/useAppTheme";
import { Fonts } from "../../theme/fonts";

type Props = {
  icon?: keyof typeof MaterialCommunityIcons.glyphMap;
  title: string;
  subtitle?: string;
};

const EmptyState = ({ icon = "movie-search-outline", title, subtitle }: Props) => {
  const { colors } = useAppTheme();

  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name={icon} size={52} color={colors.textMuted} />
      <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
      {subtitle ? (
        <Text style={[styles.subtitle, { color: colors.textMuted }]}>{subtitle}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
    paddingVertical: 60,
  },
  title: {
    fontSize: 16,
    fontFamily: Fonts.semiBold,
    marginTop: 12,
  },
  subtitle: {
    fontSize: 13,
    textAlign: "center",
    marginTop: 6,
    lineHeight: 19,
  },
});

export default EmptyState;
