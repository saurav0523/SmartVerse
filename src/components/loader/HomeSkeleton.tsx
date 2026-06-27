import React from "react";
import { StyleSheet, View } from "react-native";
import Skeleton from "./Skeleton";

const CARD_WIDTH = 130;

const HomeSkeleton = () => {
  return (
    <View style={styles.container}>
      <Skeleton height={420} borderRadius={0} />

      <View style={styles.chipsRow}>
        {[1, 2, 3, 4].map((key) => (
          <Skeleton key={key} width={70} height={32} borderRadius={20} style={styles.chip} />
        ))}
      </View>

      {[1, 2, 3].map((rowKey) => (
        <View key={rowKey} style={styles.row}>
          <Skeleton width={160} height={20} style={styles.rowTitle} />
          <View style={styles.cardsRow}>
            {[1, 2, 3].map((cardKey) => (
              <Skeleton
                key={cardKey}
                width={CARD_WIDTH}
                height={190}
                borderRadius={10}
                style={styles.card}
              />
            ))}
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chipsRow: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingTop: 16,
    gap: 10,
  },
  chip: {},
  row: {
    paddingTop: 24,
  },
  rowTitle: {
    marginLeft: 16,
    marginBottom: 12,
  },
  cardsRow: {
    flexDirection: "row",
    paddingLeft: 16,
    gap: 12,
  },
  card: {},
});

export default HomeSkeleton;
