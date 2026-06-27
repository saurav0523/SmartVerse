import React from "react";
import { Pressable, StyleSheet, View, ScrollView, Alert } from "react-native";
import { Text, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import useAppTheme from "../../hooks/useAppTheme";
import { GradientBackground } from "../../components/common/GradientBackground";
import { Fonts } from "../../theme/fonts";
import { Colors } from "../../theme/colors";

type FAQItem = {
  question: string;
  answer: string;
};

const faqs: FAQItem[] = [
  {
    question: "How do I download movies offline?",
    answer: "Open any movie or TV show detail page, and press the 'Download' button next to Watchlist. The movie will save to your downloads page.",
  },
  {
    question: "How do I upgrade my streaming plan?",
    answer: "Go to Profile -> Subscription Plan and tap 'Upgrade to Annual Plan' to get access to 4K content.",
  },
  {
    question: "How many devices can stream simultaneously?",
    answer: "You can watch on up to 4 devices simultaneously under the Premium Plan.",
  },
];

const SupportScreen = () => {
  const { colors, isDark } = useAppTheme();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const handleContact = () => {
    Alert.alert("Contact Support", "Our support email is: support@streamverse.com\nWe will reply within 24 hours.");
  };

  return (
    <GradientBackground>
      <View style={[styles.headerRow, { paddingTop: Math.max(insets.top, 16) }]}>
        <Pressable style={styles.backBtn} onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={24} color={colors.text} />
        </Pressable>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Help & Support</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} bounces={true}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Frequently Asked Questions</Text>

        <View style={styles.faqList}>
          {faqs.map((faq, index) => (
            <View
              key={index}
              style={[
                styles.faqCard,
                {
                  backgroundColor: colors.cardBgTranslucent,
                  borderColor: colors.cardBorderTranslucent,
                },
              ]}
            >
              <Text style={[styles.faqQuestion, { color: colors.text }]}>{faq.question}</Text>
              <Text style={[styles.faqAnswer, { color: colors.textMuted }]}>{faq.answer}</Text>
            </View>
          ))}
        </View>

        <View
          style={[
            styles.contactCard,
            {
              backgroundColor: colors.cardBgTranslucent,
              borderColor: colors.cardBorderTranslucent,
            },
          ]}
        >
          <MaterialCommunityIcons name="email-outline" size={32} color={colors.primary} />
          <Text style={[styles.contactTitle, { color: colors.text }]}>Still need help?</Text>
          <Text style={[styles.contactSub, { color: colors.textMuted }]}>
            Our team is available 24/7 to help resolve your questions.
          </Text>
          <Button mode="contained" onPress={handleContact} style={styles.contactBtn}>
            Email Support
          </Button>
        </View>
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
  sectionTitle: {
    fontSize: 16,
    fontFamily: Fonts.extraBold,
    marginBottom: 16,
  },
  faqList: {
    gap: 12,
    marginBottom: 28,
  },
  faqCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  faqQuestion: {
    fontSize: 14,
    fontFamily: Fonts.bold,
  },
  faqAnswer: {
    fontSize: 13,
    marginTop: 6,
    lineHeight: 18,
  },
  contactCard: {
    alignItems: "center",
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
  },
  contactTitle: {
    fontSize: 16,
    fontFamily: Fonts.bold,
    marginTop: 12,
  },
  contactSub: {
    fontSize: 13,
    textAlign: "center",
    marginTop: 6,
    marginBottom: 16,
    lineHeight: 18,
  },
  contactBtn: {
    borderRadius: 8,
    width: "100%",
  },
});

export default SupportScreen;
