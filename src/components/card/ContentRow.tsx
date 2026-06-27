import React, { useCallback } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import ContentCard from "./ContentCard";
import { ContentItem, ContentRow as ContentRowType } from "../../models/content.types";
import useAppTheme from "../../hooks/useAppTheme";
import { Fonts } from "../../theme/fonts";

type Props = {
  row: ContentRowType;
  onItemPress: (item: ContentItem) => void;
};

const CARD_WIDTH = 130;

const ContentRow = ({ row, onItemPress }: Props) => {
  const { colors } = useAppTheme();

  const renderItem = useCallback(
    ({ item }: { item: ContentItem }) => (
      <ContentCard item={item} onPress={onItemPress} width={CARD_WIDTH} />
    ),
    [onItemPress]
  );

  const keyExtractor = useCallback((item: ContentItem) => item.id, []);

  const getItemLayout = useCallback(
    (_: any, index: number) => ({
      length: CARD_WIDTH + 12,
      offset: (CARD_WIDTH + 12) * index,
      index,
    }),
    []
  );

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: colors.text }]}>{row.title}</Text>
      <FlatList
        data={row.items}
        horizontal
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        getItemLayout={getItemLayout}
        initialNumToRender={4}
        maxToRenderPerBatch={6}
        windowSize={5}
        removeClippedSubviews
        ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 22,
  },
  title: {
    fontSize: 17,
    fontFamily: Fonts.bold,
    marginLeft: 16,
    marginBottom: 12,
  },
  listContent: {
    paddingHorizontal: 16,
  },
});

export default ContentRow;
