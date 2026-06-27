import React from "react";
import { FlatList, Pressable, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import useAppTheme from "../../hooks/useAppTheme";
import { GradientBackground } from "../../components/common/GradientBackground";
import { Fonts } from "../../theme/fonts";
import { Colors } from "../../theme/colors";

type NotificationItem = {
  id: string;
  title: string;
  message: string;
  date: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
};

const mockNotifications: NotificationItem[] = [
  {
    id: "1",
    title: "New Release",
    message: "Marvel's Echo is now streaming. Watch all episodes now!",
    date: "Today",
    icon: "movie-play-outline",
  },
  {
    id: "2",
    title: "Subscription Active",
    message: "Your Premium Plan has been renewed successfully. Next billing: July 26, 2026.",
    date: "Yesterday",
    icon: "credit-card-check-outline",
  },
  {
    id: "3",
    title: "Trending in India",
    message: "Percy Jackson and the Olympians is now trending at #1. Add to your watchlist!",
    date: "3 days ago",
    icon: "trending-up",
  },
];

const NotificationsScreen = () => {
  const { colors, isDark } = useAppTheme();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  return (
    <GradientBackground>
      <View style={[styles.headerRow, { paddingTop: Math.max(insets.top, 16) }]}>
        <Pressable style={styles.backBtn} onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={24} color={colors.text} />
        </Pressable>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Notifications</Text>
      </View>

      <FlatList
        data={mockNotifications}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View
            style={[
              styles.card,
              {
                backgroundColor: colors.cardBgTranslucent,
                borderColor: colors.cardBorderTranslucent,
              },
            ]}
          >
            <View style={[styles.iconContainer, { backgroundColor: colors.primaryMuted }]}>
              <MaterialCommunityIcons name={item.icon} size={22} color={colors.primary} />
            </View>
            <View style={styles.info}>
              <View style={styles.titleRow}>
                <Text style={[styles.title, { color: colors.text }]} numberOfLines={1}>
                  {item.title}
                </Text>
                <Text style={[styles.date, { color: colors.textMuted }]}>{item.date}</Text>
              </View>
              <Text style={[styles.message, { color: colors.textMuted }]}>{item.message}</Text>
            </View>
          </View>
        )}
      />
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
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 30,
  },
  card: {
    flexDirection: "row",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
    alignItems: "center",
  },
  iconContainer: {
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: "center",
    alignItems: "center",
  },
  info: {
    flex: 1,
    marginLeft: 14,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 15,
    fontFamily: Fonts.bold,
  },
  date: {
    fontSize: 11,
  },
  message: {
    fontSize: 13,
    marginTop: 4,
    lineHeight: 18,
  },
});

export default NotificationsScreen;
