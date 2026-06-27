import React, { useEffect, useState } from "react";
import { Dimensions, Share, StyleSheet, View, Linking, Alert } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Button, Text } from "react-native-paper";
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  interpolate,
  Extrapolation,
} from "react-native-reanimated";
import { useNavigation, useRoute } from "@react-navigation/native";
import DetailHeader from "../../components/header/DetailHeader";
import DetailSkeleton from "../../components/loader/DetailSkeleton";
import ErrorState from "../../components/common/ErrorState";
import ContentRow from "../../components/card/ContentRow";
import useAppTheme from "../../hooks/useAppTheme";
import { GradientBackground } from "../../components/common/GradientBackground";
import useUserStore from "../../stores/useUserStore";
import { Colors } from "../../theme/colors";
import { Fonts } from "../../theme/fonts";
import { getContentById, getRecommended } from "../../services/api/apiServices";
import { ContentItem } from "../../models/content.types";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const HERO_HEIGHT = SCREEN_HEIGHT * 0.55;

const DetailScreen = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { colors } = useAppTheme();
  const { id } = route.params;

  const [content, setContent] = useState<ContentItem | null>(null);
  const [recommended, setRecommended] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const watchlist = useUserStore((state) => state.watchlist);
  const addToWatchlist = useUserStore((state) => state.addToWatchlist);
  const removeFromWatchlist = useUserStore((state) => state.removeFromWatchlist);

  const downloads = useUserStore((state) => state.downloads);
  const addToDownloads = useUserStore((state) => state.addToDownloads);
  const removeFromDownloads = useUserStore((state) => state.removeFromDownloads);
  const [downloading, setDownloading] = useState(false);

  const handlePlay = async () => {
    if (!content) return;
    if (content.playLink) {
      try {
        const supported = await Linking.canOpenURL(content.playLink);
        if (supported) {
          await Linking.openURL(content.playLink);
        } else {
          const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(content.title + " trailer")}`;
          await Linking.openURL(searchUrl);
        }
      } catch (err) {
        console.error("Error opening play link:", err);
        Alert.alert("Error", "Could not launch the streaming service link.");
      }
    } else {
      const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(content.title + " trailer")}`;
      try {
        await Linking.openURL(searchUrl);
      } catch (err) {
        Alert.alert("Trailer not found", "Could not open search link.");
      }
    }
  };

  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  const headerStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [0, HERO_HEIGHT - 100],
      [0, 1],
      Extrapolation.CLAMP
    );
    return {
      backgroundColor: `rgba(${Colors.detailHeaderBgBase},${opacity})`,
    };
  });

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getContentById(id);
      setContent(data);
      const related = await getRecommended(data);
      setRecommended(related);
    } catch (e: any) {
      setError(e?.message || "Could not load this title");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [id]);

  const handleShare = () => {
    if (!content) return;
    Share.share({
      message: `Check out ${content.title} on StreamVerse`,
    });
  };

  const handleRecommendedPress = (item: ContentItem) => {
    navigation.push("Detail", { id: item.id });
  };

  const toggleWatchlist = () => {
    if (!content) return;
    const isAdded = watchlist.some((item) => item.id === content.id);
    if (isAdded) {
      removeFromWatchlist(content.id);
    } else {
      addToWatchlist(content);
    }
  };

  const isDownloaded = content ? downloads.some((item) => item.id === content.id) : false;

  const toggleDownload = () => {
    if (!content) return;
    if (isDownloaded) {
      removeFromDownloads(content.id);
    } else {
      setDownloading(true);
      setTimeout(() => {
        addToDownloads(content);
        setDownloading(false);
      }, 2000);
    }
  };

  if (loading) {
    return <DetailSkeleton />;
  }

  if (error || !content) {
    return <ErrorState message={error || undefined} onRetry={load} />;
  }

  const inWatchlist = watchlist.some((item) => item.id === content.id);

  return (
    <GradientBackground>
      <DetailHeader animatedStyle={headerStyle} onSharePress={handleShare} />
      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ height: HERO_HEIGHT }}>
          <Image
            source={content.bannerUrl || content.posterUrl}
            style={StyleSheet.absoluteFillObject}
            contentFit="cover"
            transition={250}
          />
          <LinearGradient
            colors={["transparent", colors.background]}
            style={styles.heroFade}
          />
        </View>

        <View style={styles.body}>
          <Text style={[styles.title, { color: colors.text }]}>{content.title}</Text>

          <View style={styles.metaRow}>
            <Text style={[styles.metaText, { color: colors.textMuted }]}>
              {content.releaseYear}
            </Text>
            <Text style={[styles.metaDot, { color: colors.textMuted }]}>•</Text>
            <Text style={[styles.metaText, { color: colors.textMuted }]}>
              {content.rating.toFixed(1)} ★
            </Text>
            <Text style={[styles.metaDot, { color: colors.textMuted }]}>•</Text>
            <Text style={[styles.metaText, { color: colors.textMuted }]}>
              {content.type === "Series"
                ? `${content.durationMins} Episodes`
                : `${content.durationMins} min`}
            </Text>
            <Text style={[styles.metaDot, { color: colors.textMuted }]}>•</Text>
            <Text style={[styles.metaText, { color: colors.textMuted }]}>{content.language}</Text>
          </View>

          <View style={styles.tagsRow}>
            {content.genres.map((genre) => (
              <View key={genre} style={[styles.tagChip, { backgroundColor: colors.primaryMuted }]}>
                <Text style={[styles.tagText, { color: colors.primary }]}>{genre}</Text>
              </View>
            ))}
          </View>

          <View style={styles.buttonsRow}>
            <Button mode="contained" icon="play" style={styles.flexButton} onPress={handlePlay}>
              Play
            </Button>
            <Button
              mode="outlined"
              icon={inWatchlist ? "check" : "plus"}
              style={styles.flexButton}
              onPress={toggleWatchlist}
            >
              {inWatchlist ? "Added" : "Watchlist"}
            </Button>
            <Button
              mode="outlined"
              icon={isDownloaded ? "check" : "download"}
              style={styles.flexButton}
              loading={downloading}
              onPress={toggleDownload}
              disabled={downloading}
            >
              {isDownloaded ? "Downloaded" : downloading ? "Downloading" : "Download"}
            </Button>
          </View>

          <Text style={[styles.synopsis, { color: colors.textMuted }]}>{content.description}</Text>

          <View style={styles.tagsWrap}>
            {content.tags.map((tag) => (
              <Text
                key={tag}
                style={[styles.subtleTag, { color: colors.textMuted, borderColor: colors.border }]}
              >
                #{tag}
              </Text>
            ))}
          </View>
        </View>

        {recommended.length > 0 && (
          <ContentRow
            row={{ id: "recommended", title: "You Might Also Like", items: recommended }}
            onItemPress={handleRecommendedPress}
          />
        )}

        <View style={{ height: 40 }} />
      </Animated.ScrollView>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  heroFade: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: "45%",
  },
  body: {
    paddingHorizontal: 20,
    marginTop: -30,
  },
  title: {
    fontSize: 24,
    fontFamily: Fonts.extraBold,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  metaText: {
    fontSize: 13,
  },
  metaDot: {
    fontSize: 13,
    marginHorizontal: 6,
  },
  tagsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 14,
  },
  tagChip: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 14,
  },
  tagText: {
    fontSize: 12,
    fontFamily: Fonts.semiBold,
  },
  buttonsRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 20,
  },
  flexButton: {
    flex: 1,
    borderRadius: 8,
  },
  synopsis: {
    fontSize: 14,
    lineHeight: 21,
    marginTop: 20,
  },
  tagsWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 16,
  },
  subtleTag: {
    fontSize: 12,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
});

export default DetailScreen;
