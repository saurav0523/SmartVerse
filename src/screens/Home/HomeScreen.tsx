import React, { useCallback, useEffect, useState } from "react";
import {
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  View,
} from "react-native";
import { Image } from "expo-image";
import { ActivityIndicator, Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import TopHeader from "../../components/header/TopHeader";
import HeroBanner from "../../components/card/HeroBanner";
import CategoryChips from "../../components/card/CategoryChips";
import ContentRow from "../../components/card/ContentRow";
import HomeSkeleton from "../../components/loader/HomeSkeleton";
import ErrorState from "../../components/common/ErrorState";
import EmptyState from "../../components/common/EmptyState";
import { getCategories, getHomeFeed, getMoreForYou } from "../../services/api/apiServices";
import { CategoryChip, ContentItem, ContentRow as ContentRowType } from "../../models/content.types";
import useAppTheme from "../../hooks/useAppTheme";
import { GradientBackground } from "../../components/common/GradientBackground";
import { Colors } from "../../theme/colors";
import { Fonts } from "../../theme/fonts";

const HomeScreen = () => {
  const navigation = useNavigation<any>();
  const { colors } = useAppTheme();

  const [banners, setBanners] = useState<ContentItem[]>([]);
  const [rows, setRows] = useState<ContentRowType[]>([]);
  const [chips, setChips] = useState<CategoryChip[]>([]);
  const [selectedChipId, setSelectedChipId] = useState("c1");

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);


  const [moreItems, setMoreItems] = useState<ContentItem[]>([]);
  const [page, setPage] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);

  const loadHome = async () => {
    try {
      setError(null);
      const [feed, categories] = await Promise.all([getHomeFeed(), getCategories()]);
      setBanners(feed.banners);
      setRows(feed.rows);
      setChips(categories);
    } catch (e: any) {
      setError(e?.message || "Failed to load home feed");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const loadMore = async (pageToLoad: number, replace = false) => {
    if (loadingMore) return;
    setLoadingMore(true);
    try {
      const data = await getMoreForYou(pageToLoad);
      setMoreItems((prev) => (replace ? data : [...prev, ...data]));
    } catch (e) {
 
      console.log("loadMore error", e);
    } finally {
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    loadHome();
    loadMore(0, true);
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setPage(0);
    setMoreItems([]);
    loadHome();
    loadMore(0, true);
  }, []);

  const handleEndReached = () => {
    if (loadingMore) return;
    const nextPage = page + 1;
    setPage(nextPage);
    loadMore(nextPage);
  };

  const handleItemPress = (item: ContentItem) => {
    navigation.navigate("Detail", { id: item.id });
  };

  const matchesCategory = useCallback((item: ContentItem, categoryId: string) => {
    if (categoryId === "c1") return true;
    const category = chips.find((c) => c.id === categoryId);
    if (!category) return false;
    
    const categoryLabelLower = category.label.toLowerCase().trim();
    return item.genres.some((genre) => {
      const genreLower = genre.toLowerCase().trim();
      if (categoryLabelLower === "science fiction") {
        return genreLower === "science fiction" || genreLower === "sci-fi";
      }
      return genreLower === categoryLabelLower;
    });
  }, [chips]);

  const visibleChips = React.useMemo(() => {
    const hasCategoryData = (categoryId: string) => {
      if (categoryId === "c1") return true;
      
      const category = chips.find((c) => c.id === categoryId);
      if (!category) return false;
      const categoryLabelLower = category.label.toLowerCase().trim();

      const matchFunc = (item: ContentItem) =>
        item.genres.some((genre) => {
          const genreLower = genre.toLowerCase().trim();
          if (categoryLabelLower === "science fiction") {
            return genreLower === "science fiction" || genreLower === "sci-fi";
          }
          return genreLower === categoryLabelLower;
        });

      return (
        banners.some(matchFunc) ||
        rows.some((row) => row.items.some(matchFunc)) ||
        moreItems.some(matchFunc)
      );
    };

    return chips.filter((chip) => hasCategoryData(chip.id));
  }, [chips, banners, rows, moreItems]);

  useEffect(() => {
    if (visibleChips.length > 0 && !visibleChips.some((c) => c.id === selectedChipId)) {
      setSelectedChipId("c1");
    }
  }, [visibleChips, selectedChipId]);

  const filteredRows =
    selectedChipId === "c1"
      ? rows
      : rows
          .map((row) => ({
            ...row,
            items: row.items.filter((item) => matchesCategory(item, selectedChipId)),
          }))
          .filter((row) => row.items.length > 0);

  const filteredMoreItems =
    selectedChipId === "c1"
      ? moreItems
      : moreItems.filter((item) => matchesCategory(item, selectedChipId));

  if (loading) {
    return <HomeSkeleton />;
  }

  if (error) {
    return <ErrorState message={error} onRetry={loadHome} />;
  }

  return (
    <GradientBackground>
      <FlatList
        data={filteredMoreItems}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        numColumns={3}
        style={styles.list}
        contentContainerStyle={styles.gridContent}
        columnWrapperStyle={styles.gridRow}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.primary} />
        }
        onEndReachedThreshold={0.4}
        onEndReached={handleEndReached}
        renderItem={({ item }) => (
          <View style={styles.gridCell}>
            <PosterTile item={item} onPress={handleItemPress} />
          </View>
        )}
        ListHeaderComponent={
          <View>
            <TopHeader />
            <HeroBanner banners={banners} onPress={handleItemPress} />
            <CategoryChips chips={visibleChips} selectedId={selectedChipId} onSelect={setSelectedChipId} />

            {filteredRows.length === 0 ? (
              <EmptyState
                title="Nothing here yet"
                subtitle="Try a different category, or check back later for new titles."
              />
            ) : (
              filteredRows.map((row) => (
                <ContentRow key={row.id} row={row} onItemPress={handleItemPress} />
              ))
            )}

            <Text style={[styles.moreTitle, { color: colors.text }]}>More For You</Text>
          </View>
        }
        ListFooterComponent={
          loadingMore ? (
            <ActivityIndicator style={styles.footerLoader} color={colors.primary} />
          ) : null
        }
        showsVerticalScrollIndicator={false}
      />
    </GradientBackground>
  );
};

const PosterTile = ({ item, onPress }: { item: ContentItem; onPress: (i: ContentItem) => void }) => {
  return (
    <Pressable onPress={() => onPress(item)} style={styles.tile}>
      <Image source={item.posterUrl} style={styles.tileImage} contentFit="cover" transition={200} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  gridContent: {
    paddingBottom: 40,
  },
  gridRow: {
    paddingHorizontal: 12,
    gap: 8,
  },
  gridCell: {
    flex: 1 / 3,
    marginBottom: 8,
  },
  tile: {
    flex: 1,
    aspectRatio: 2 / 3,
    borderRadius: 8,
    overflow: "hidden",
  },
  tileImage: {
    width: "100%",
    height: "100%",
  },
  moreTitle: {
    fontSize: 17,
    fontFamily: Fonts.bold,
    marginLeft: 16,
    marginTop: 26,
    marginBottom: 12,
  },
  footerLoader: {
    marginVertical: 20,
  },
  list: {
    backgroundColor: Colors.transparent,
  },
});

export default HomeScreen;
