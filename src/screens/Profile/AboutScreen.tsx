import React from "react";
import { Pressable, StyleSheet, View, ScrollView } from "react-native";
import { Text } from "react-native-paper";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import useAppTheme from "../../hooks/useAppTheme";
import { GradientBackground } from "../../components/common/GradientBackground";
import { Fonts } from "../../theme/fonts";
import { Colors } from "../../theme/colors";

const AboutScreen = () => {
  const { colors, isDark } = useAppTheme();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  return (
    <GradientBackground>
      <View style={[styles.headerRow, { paddingTop: Math.max(insets.top, 16) }]}>
        <Pressable style={styles.backBtn} onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={24} color={colors.text} />
        </Pressable>
        <Text style={[styles.headerTitle, { color: colors.text }]}>About App</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} bounces={true}>
        <View style={styles.logoSection}>
          <Image
            source={require("../../../assets/logo.png")}
            style={styles.logoImage}
            contentFit="contain"
          />
          <Text style={[styles.appName, { color: colors.text }]}>StreamVerse</Text>
          <Text style={[styles.appVersion, { color: colors.textMuted }]}>Version 1.0.0</Text>
        </View>

        <Text style={[styles.description, { color: colors.text }]}>
          StreamVerse is a premium movie and series catalog application inspired by the Disney+ Hotstar UI experience. Querying RapidAPI's Streaming Availability API, it aggregates and lists movies, series, offline downloads, watchlist bookmarks, and dynamic categorized lists.
        </Text>

        <View style={[styles.infoBlock, { borderColor: colors.cardBorderTranslucent }]}>
          <View style={styles.infoRow}>
            <Text style={[styles.label, { color: colors.textMuted }]}>Developer</Text>
            <Text style={[styles.value, { color: colors.text }]}>Saurav Gupta</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={[styles.label, { color: colors.textMuted }]}>Framework</Text>
            <Text style={[styles.value, { color: colors.text }]}>React Native & Expo</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={[styles.label, { color: colors.textMuted }]}>API Provider</Text>
            <Text style={[styles.value, { color: colors.text }]}>RapidAPI</Text>
          </View>
        </View>

        <Text style={[styles.footerText, { color: colors.textMuted }]}>
          © 2026 StreamVerse Inc. All rights reserved.
        </Text>
      </ScrollView>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  backBtn: {
    padding: 6,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: Fonts.extraBold,
    marginLeft: 12,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  logoSection: {
    alignItems: "center",
    marginBottom: 28,
  },
  logoImage: {
    width: 90,
    height: 90,
    borderRadius: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
  },
  appName: {
    fontSize: 22,
    fontFamily: Fonts.extraBold,
    marginTop: 14,
  },
  appVersion: {
    fontSize: 13,
    marginTop: 4,
  },
  description: {
    fontSize: 14,
    lineHeight: 22,
    textAlign: "center",
    marginBottom: 28,
  },
  infoBlock: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingVertical: 12,
    gap: 12,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    fontSize: 13,
  },
  value: {
    fontSize: 14,
    fontFamily: Fonts.bold,
  },
  footerText: {
    fontSize: 12,
    textAlign: "center",
    marginTop: 40,
  },
});

export default AboutScreen;
