import React, { useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Text, Button } from "react-native-paper";
import { ContentItem } from "../../models/content.types";
import { Colors } from "../../theme/colors";
import { Fonts } from "../../theme/fonts";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const BANNER_HEIGHT = 480;

type Props = {
  banners: ContentItem[];
  onPress: (item: ContentItem) => void;
};

const HeroBanner = ({ banners, onPress }: Props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const listRef = useRef<FlatList<ContentItem>>(null);

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / SCREEN_WIDTH);
    if (index !== activeIndex) setActiveIndex(index);
  };

  if (banners.length === 0) return null;

  return (
    <View style={styles.container}>
      <FlatList<ContentItem>
        ref={listRef}
        data={banners}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable style={styles.slide} onPress={() => onPress(item)}>
            <Image
              source={item.bannerUrl || item.posterUrl}
              style={styles.image}
              contentFit="cover"
              transition={300}
            />
            <LinearGradient
              colors={[Colors.transparent, Colors.overlayGradientEnd]}
              style={styles.gradient}
            />
            <View style={styles.content}>
              <View style={styles.tagsRow}>
                {item.genres.slice(0, 2).map((genre) => (
                  <View key={genre} style={styles.tagChip}>
                    <Text style={styles.tagText}>{genre}</Text>
                  </View>
                ))}
              </View>
              <Text style={styles.heroTitle} numberOfLines={2}>
                {item.title}
              </Text>
              <Text style={styles.heroMeta}>
                {item.releaseYear} · {item.rating.toFixed(1)} ★ ·{" "}
                {item.type === "Series" ? `${item.durationMins} Episodes` : `${item.durationMins} min`}
              </Text>
              <Button
                mode="contained"
                icon="play"
                onPress={() => onPress(item)}
                style={styles.playButton}
                contentStyle={styles.playButtonContent}
              >
                Watch Now
              </Button>
            </View>
          </Pressable>
        )}
      />
      <View style={styles.dotsRow}>
        {banners.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              index === activeIndex && styles.dotActive,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: BANNER_HEIGHT,
  },
  slide: {
    width: SCREEN_WIDTH,
    height: BANNER_HEIGHT,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: "65%",
  },
  content: {
    position: "absolute",
    left: 20,
    right: 20,
    bottom: 28,
  },
  tagsRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 10,
  },
  tagChip: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: Colors.whiteOpacity18,
  },
  tagText: {
    color: Colors.white,
    fontSize: 11,
    fontFamily: Fonts.semiBold,
  },
  heroTitle: {
    color: Colors.white,
    fontSize: 28,
    fontFamily: Fonts.extraBold,
    lineHeight: 32,
  },
  heroMeta: {
    color: Colors.whiteOpacity80,
    fontSize: 13,
    marginTop: 6,
  },
  playButton: {
    marginTop: 16,
    alignSelf: "flex-start",
    borderRadius: 8,
  },
  playButtonContent: {
    paddingHorizontal: 6,
  },
  dotsRow: {
    position: "absolute",
    bottom: 8,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.whiteOpacity40,
  },
  dotActive: {
    backgroundColor: Colors.white,
    width: 18,
  },
});

export default HeroBanner;
