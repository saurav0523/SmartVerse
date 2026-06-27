import React from "react";
import { FlatList, Pressable, StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import { Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import EmptyState from "../../components/common/EmptyState";
import useAppTheme from "../../hooks/useAppTheme";
import { GradientBackground } from "../../components/common/GradientBackground";
import useUserStore from "../../stores/useUserStore";
import { ContentItem } from "../../models/content.types";
import { Colors } from "../../theme/colors";
import { Fonts } from "../../theme/fonts";

const WatchlistScreen = () => {
  const { colors, isDark } = useAppTheme();
  const navigation = useNavigation<any>();
  const items = useUserStore((state) => state.watchlist);
  const removeFromWatchlist = useUserStore((state) => state.removeFromWatchlist);
  const insets = useSafeAreaInsets();

  const handlePress = (item: ContentItem) => {
    navigation.navigate("Detail", { id: item.id });
  };

  const canGoBack = navigation.canGoBack();

  if (items.length === 0) {
    return (
      <GradientBackground>
        <View style={[styles.headerRow, { paddingTop: Math.max(insets.top, 16) }]}>
          {canGoBack && (
            <Pressable style={styles.backBtn} onPress={() => navigation.goBack()}>
              <MaterialCommunityIcons name="arrow-left" size={24} color={colors.text} />
            </Pressable>
          )}
          <Text style={[styles.headerTitle, { color: colors.text }, !canGoBack && { marginLeft: 0 }]}>
            My Watchlist
          </Text>
        </View>
        <EmptyState
          icon="bookmark-outline"
          title="Your watchlist is empty"
          subtitle="Tap the watchlist button on any title to save it here for later."
        />
      </GradientBackground>
    );
  }

  return (
    <GradientBackground>
      <View style={[styles.headerRow, { paddingTop: Math.max(insets.top, 16) }]}>
        {canGoBack && (
          <Pressable style={styles.backBtn} onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons name="arrow-left" size={24} color={colors.text} />
          </Pressable>
        )}
        <Text style={[styles.headerTitle, { color: colors.text }, !canGoBack && { marginLeft: 0 }]}>
          My Watchlist
        </Text>
      </View>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        style={styles.list}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <Pressable
            style={[
              styles.itemRow,
              {
                backgroundColor: colors.cardBgTranslucent,
                borderColor: colors.cardBorderTranslucent,
              },
            ]}
            onPress={() => handlePress(item)}
          >
            <Image
              source={item.bannerUrl || item.posterUrl}
              style={styles.thumbnail}
              contentFit="cover"
              transition={200}
            />
            <View style={styles.itemInfo}>
              <Text style={[styles.itemTitle, { color: colors.text }]} numberOfLines={1}>
                {item.title}
              </Text>
              <Text style={[styles.itemMeta, { color: colors.textMuted }]}>
                {item.releaseYear} • {item.rating.toFixed(1)} ★ • {item.type}
              </Text>
              <Text style={[styles.itemGenres, { color: colors.primary }]} numberOfLines={1}>
                {item.genres.slice(0, 2).join(", ")}
              </Text>
            </View>
            <Pressable
              style={styles.deleteBtn}
              onPress={() => removeFromWatchlist(item.id)}
            >
              <MaterialCommunityIcons name="bookmark-remove-outline" size={22} color={colors.danger} />
            </Pressable>
          </Pressable>
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
    paddingBottom: 30,
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 16,
    marginVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
  },
  thumbnail: {
    width: 100,
    height: 60,
    borderRadius: 6,
    backgroundColor: "rgba(255,255,255,0.05)",
  },
  itemInfo: {
    flex: 1,
    marginLeft: 14,
    justifyContent: "center",
  },
  itemTitle: {
    fontSize: 16,
    fontFamily: Fonts.bold,
  },
  itemMeta: {
    fontSize: 12,
    marginTop: 4,
  },
  itemGenres: {
    fontSize: 11,
    fontFamily: Fonts.semiBold,
    marginTop: 4,
  },
  deleteBtn: {
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  list: {
    backgroundColor: Colors.transparent,
  },
});

export default WatchlistScreen;
