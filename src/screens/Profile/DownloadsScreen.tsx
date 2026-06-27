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

const mockSize = (id: string): string => {
  const hash = id.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const sizeMb = (hash % 600) + 150; // Between 150MB and 750MB
  return sizeMb > 500 ? `${(sizeMb / 1000).toFixed(1)} GB` : `${sizeMb} MB`;
};

const DownloadsScreen = () => {
  const { colors, isDark } = useAppTheme();
  const navigation = useNavigation<any>();
  const items = useUserStore((state) => state.downloads);
  const removeFromDownloads = useUserStore((state) => state.removeFromDownloads);
  const insets = useSafeAreaInsets();

  const handlePress = (item: ContentItem) => {
    navigation.navigate("Detail", { id: item.id });
  };

  if (items.length === 0) {
    return (
      <GradientBackground>
        <View style={[styles.headerRow, { paddingTop: Math.max(insets.top, 16) }]}>
          <Pressable style={styles.backBtn} onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons name="arrow-left" size={24} color={colors.text} />
          </Pressable>
          <Text style={[styles.headerTitle, { color: colors.text }]}>Downloads</Text>
        </View>
        <EmptyState
          icon="download-outline"
          title="No downloads found"
          subtitle="Tap the download button on any title to save it offline."
        />
      </GradientBackground>
    );
  }

  return (
    <GradientBackground>
      <View style={[styles.headerRow, { paddingTop: Math.max(insets.top, 16) }]}>
        <Pressable style={styles.backBtn} onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={24} color={colors.text} />
        </Pressable>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Downloads</Text>
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
                {item.releaseYear} • {item.type} • {item.durationMins} {item.type === "Series" ? "Episodes" : "min"}
              </Text>
              <Text style={[styles.itemSize, { color: colors.primary }]}>
                {mockSize(item.id)}
              </Text>
            </View>
            <Pressable
              style={styles.deleteBtn}
              onPress={() => removeFromDownloads(item.id)}
            >
              <MaterialCommunityIcons name="trash-can-outline" size={22} color={colors.danger} />
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
  itemSize: {
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

export default DownloadsScreen;
