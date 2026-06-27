import React, { memo } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import { Text } from "react-native-paper";
import { ContentItem } from "../../models/content.types";
import useAppTheme from "../../hooks/useAppTheme";
import { Colors } from "../../theme/colors";
import { Fonts } from "../../theme/fonts";

type Props = {
  item: ContentItem;
  onPress: (item: ContentItem) => void;
  width?: number;
};

const blurhash = "L6PZfSi_.AyE_3t7t7R**0o#DgR4";

const ContentCard = ({ item, onPress, width = 130 }: Props) => {
  const { colors } = useAppTheme();
  const height = width * 1.5;

  return (
    <Pressable
      onPress={() => onPress(item)}
      style={({ pressed }) => [
        styles.container,
        { width, opacity: pressed ? 0.75 : 1 },
      ]}
    >
      <View style={[styles.posterWrap, { width, height }]}>
        <Image
          source={item.posterUrl}
          style={styles.poster}
          placeholder={blurhash}
          transition={250}
          contentFit="cover"
        />
        {item.isNew && (
          <View style={[styles.badge, { backgroundColor: colors.accent }]}>
            <Text style={styles.badgeText}>NEW</Text>
          </View>
        )}
      </View>
      <Text numberOfLines={1} style={[styles.title, { color: colors.text }]}>
        {item.title}
      </Text>
      <Text numberOfLines={1} style={[styles.meta, { color: colors.textMuted }]}>
        {item.releaseYear} • {item.genres[0]}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    marginRight: 4,
  },
  posterWrap: {
    borderRadius: 10,
    overflow: "hidden",
  },
  poster: {
    width: "100%",
    height: "100%",
  },
  badge: {
    position: "absolute",
    top: 8,
    left: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  badgeText: {
    color: Colors.white,
    fontSize: 10,
    fontFamily: Fonts.bold,
  },
  title: {
    fontSize: 13,
    fontFamily: Fonts.semiBold,
    marginTop: 6,
  },
  meta: {
    fontSize: 11,
    marginTop: 2,
  },
});

export default memo(ContentCard, (prev, next) => prev.item.id === next.item.id);
