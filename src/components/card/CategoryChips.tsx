import React from "react";
import { FlatList, Pressable, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { CategoryChip } from "../../models/content.types";
import useAppTheme from "../../hooks/useAppTheme";
import { Colors } from "../../theme/colors";
import { Fonts } from "../../theme/fonts";

type Props = {
  chips: CategoryChip[];
  selectedId: string;
  onSelect: (id: string) => void;
};

const CategoryChips = ({ chips, selectedId, onSelect }: Props) => {
  const { colors } = useAppTheme();

  return (
    <FlatList
      data={chips}
      horizontal
      keyExtractor={(item) => item.id}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.listContent}
      renderItem={({ item }) => {
        const active = item.id === selectedId;
        return (
          <Pressable
            onPress={() => onSelect(item.id)}
            style={[
              styles.chip,
              { backgroundColor: colors.surfaceAlt },
              active && { backgroundColor: colors.primary },
            ]}
          >
            <Text style={[styles.label, { color: colors.textMuted }, active && styles.labelActive]}>
              {item.label}
            </Text>
          </Pressable>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  listContent: {
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
  },
  label: {
    fontSize: 13,
    fontFamily: Fonts.semiBold,
  },
  labelActive: {
    color: Colors.white,
  },
});

export default CategoryChips;
