import React from "react";
import { Pressable, StyleSheet, View, ScrollView } from "react-native";
import { Text, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import useAppTheme from "../../hooks/useAppTheme";
import { GradientBackground } from "../../components/common/GradientBackground";
import { Fonts } from "../../theme/fonts";
import { Colors } from "../../theme/colors";

const SubscriptionScreen = () => {
  const { colors, isDark } = useAppTheme();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const planFeatures = [
    "Stream in Ultra HD & 4K quality",
    "Watch on 4 screens at the same time",
    "Download up to 100 titles offline",
    "Ad-free streaming experience",
    "Access to exclusive Hotstar Originals",
  ];

  return (
    <GradientBackground>
      <View style={[styles.headerRow, { paddingTop: Math.max(insets.top, 16) }]}>
        <Pressable style={styles.backBtn} onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={24} color={colors.text} />
        </Pressable>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Subscription Plan</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} bounces={true}>
        <View
          style={[
            styles.card,
            {
              backgroundColor: colors.cardBgTranslucent,
              borderColor: colors.cardBorderTranslucent,
            },
          ]}
        >
          <View style={styles.badgeRow}>
            <View style={[styles.activeBadge, { backgroundColor: colors.primary }]}>
              <Text style={styles.activeText}>ACTIVE</Text>
            </View>
            <Text style={[styles.planPrice, { color: colors.text }]}>Premium Plan</Text>
          </View>
          <Text style={[styles.priceTag, { color: colors.primary }]}>₹299 / Month</Text>
          <Text style={[styles.billingText, { color: colors.textMuted }]}>
            Next billing date: July 26, 2026
          </Text>
        </View>

        <Text style={[styles.sectionTitle, { color: colors.text }]}>What's Included</Text>

        <View style={styles.featuresList}>
          {planFeatures.map((feature, index) => (
            <View key={index} style={styles.featureRow}>
              <MaterialCommunityIcons name="check-circle" size={20} color={colors.primary} />
              <Text style={[styles.featureText, { color: colors.text }]}>{feature}</Text>
            </View>
          ))}
        </View>

        <Button
          mode="contained"
          onPress={() => {}}
          style={styles.actionBtn}
          labelStyle={styles.btnLabel}
        >
          Upgrade to Annual Plan
        </Button>
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
    paddingTop: 10,
    paddingBottom: 40,
  },
  card: {
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  badgeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  activeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  activeText: {
    fontSize: 10,
    fontFamily: Fonts.extraBold,
    color: Colors.white,
  },
  planPrice: {
    fontSize: 18,
    fontFamily: Fonts.bold,
  },
  priceTag: {
    fontSize: 28,
    fontFamily: Fonts.extraBold,
    marginTop: 12,
  },
  billingText: {
    fontSize: 13,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: Fonts.extraBold,
    marginTop: 28,
    marginBottom: 16,
  },
  featuresList: {
    gap: 14,
    marginBottom: 30,
  },
  featureRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  featureText: {
    fontSize: 14,
    flex: 1,
  },
  actionBtn: {
    borderRadius: 8,
    paddingVertical: 4,
  },
  btnLabel: {
    fontFamily: Fonts.bold,
    fontSize: 15,
  },
});

export default SubscriptionScreen;
