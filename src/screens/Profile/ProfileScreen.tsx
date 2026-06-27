import React from "react";
import { FlatList, Pressable, StyleSheet, View, Alert } from "react-native";
import { Image } from "expo-image";
import { Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import useAppTheme from "../../hooks/useAppTheme";
import { GradientBackground } from "../../components/common/GradientBackground";
import useThemeStore from "../../stores/useThemeStore";
import useUserStore from "../../stores/useUserStore";
import { Fonts } from "../../theme/fonts";

type MenuItem = {
  title: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  onPress?: () => void;
  danger?: boolean;
};

const ProfileScreen = () => {
  const { colors, isDark } = useAppTheme();
  const toggleTheme = useThemeStore((state) => state.toggleTheme);
  const user = useUserStore((state) => state.user);
  const watchlist = useUserStore((state) => state.watchlist);
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();

  const menuItems: MenuItem[] = [
    {
      title: "My Watchlist",
      icon: "bookmark-outline",
      onPress: () => navigation.navigate("WatchlistTab"),
    },
    {
      title: "Downloads",
      icon: "download-outline",
      onPress: () => navigation.navigate("Downloads"),
    },
    {
      title: "Notifications",
      icon: "bell-outline",
      onPress: () => navigation.navigate("Notifications"),
    },
    {
      title: "Subscription Plan",
      icon: "credit-card-outline",
      onPress: () => navigation.navigate("Subscription"),
    },
    {
      title: "Help & Support",
      icon: "help-circle-outline",
      onPress: () => navigation.navigate("Support"),
    },
    {
      title: "About StreamVerse",
      icon: "information-outline",
      onPress: () => navigation.navigate("About"),
    },
    {
      title: "Log Out",
      icon: "logout",
      danger: true,
      onPress: () =>
        Alert.alert("Log Out", "Are you sure you want to log out?", [
          { text: "Cancel", style: "cancel" },
          { text: "Log Out", style: "destructive", onPress: () => {} },
        ]),
    },
  ];

  const renderItem = ({ item }: { item: MenuItem }) => (
    <Pressable onPress={item.onPress} style={styles.row}>
      <View style={styles.rowLeft}>
        <MaterialCommunityIcons
          name={item.icon}
          size={22}
          color={item.danger ? colors.danger : colors.textMuted}
        />
        <Text style={[styles.rowLabel, { color: item.danger ? colors.danger : colors.text }]}>
          {item.title}
        </Text>
      </View>
      {!item.danger && (
        <MaterialCommunityIcons name="chevron-right" size={20} color={colors.textMuted} />
      )}
    </Pressable>
  );

  return (
    <GradientBackground style={styles.container}>
      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.title}
        scrollEnabled={true}
        bounces={true}
        alwaysBounceVertical={true}
        overScrollMode="always"
        ListHeaderComponent={
          <View>
            <View style={[styles.profileCard, { paddingTop: Math.max(insets.top, 24) }]}>
              <Image source={user.avatarUrl} style={styles.avatar} />
              <View style={styles.profileText}>
                <View style={styles.nameRow}>
                  <Text style={[styles.name, { color: colors.text }]}>{user.name}</Text>
                  <Pressable
                    onPress={toggleTheme}
                    style={[
                      styles.themeToggleBtn,
                      {
                        backgroundColor: colors.surfaceAlt,
                        borderColor: colors.border,
                      },
                    ]}
                  >
                    <MaterialCommunityIcons
                      name={isDark ? "weather-night" : "weather-sunny"}
                      size={20}
                      color={isDark ? colors.primary : "#FFB300"}
                    />
                  </Pressable>
                </View>
                <Text style={[styles.email, { color: colors.textMuted }]}>{user.email}</Text>
                <View style={[styles.planBadge, { backgroundColor: colors.primaryMuted }]}>
                  <Text style={[styles.planText, { color: colors.primary }]}>{user.plan}</Text>
                </View>
              </View>
            </View>

            <View style={styles.statsRow}>
              <Pressable
                style={[styles.statCard, { backgroundColor: colors.surfaceAlt }]}
                onPress={() => navigation.navigate("WatchlistTab")}
              >
                <Text style={[styles.statValue, { color: colors.text }]}>{watchlist.length}</Text>
                <Text style={[styles.statLabel, { color: colors.textMuted }]}>Watchlist</Text>
              </Pressable>
              <View style={[styles.statCard, { backgroundColor: colors.surfaceAlt }]}>
                <Text style={[styles.statValue, { color: colors.text }]}>12</Text>
                <Text style={[styles.statLabel, { color: colors.textMuted }]}>Watched</Text>
              </View>
              <View style={[styles.statCard, { backgroundColor: colors.surfaceAlt }]}>
                <Text style={[styles.statValue, { color: colors.text }]}>3</Text>
                <Text style={[styles.statLabel, { color: colors.textMuted }]}>Reviews</Text>
              </View>
            </View>
            <View style={{ height: 16 }} />
          </View>
        }
        renderItem={renderItem}
        ItemSeparatorComponent={() => (
          <View style={[styles.separator, { backgroundColor: colors.border }]} />
        )}
      />
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  profileText: {
    marginLeft: 14,
    flex: 1,
  },
  nameRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  themeToggleBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
  },
  name: {
    fontSize: 18,
    fontFamily: Fonts.bold,
  },
  email: {
    fontSize: 13,
    marginTop: -3,
  },
  planBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 10,
    marginTop: 6,
  },
  planText: {
    fontSize: 11,
    fontFamily: Fonts.bold,
  },
  statsRow: {
    flexDirection: "row",
    paddingHorizontal: 20,
    gap: 12,
    marginTop: 12,
  },
  statCard: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 14,
    borderRadius: 12,
  },
  statValue: {
    fontSize: 18,
    fontFamily: Fonts.extraBold,
  },
  statLabel: {
    fontSize: 11,
    marginTop: 2,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  rowLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  rowLabel: {
    fontSize: 15,
    fontFamily: Fonts.medium,
  },
  separator: {
    height: 1,
    marginLeft: 20,
  },
});

export default ProfileScreen;
