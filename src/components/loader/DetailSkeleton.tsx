import React from "react";
import { StyleSheet, View } from "react-native";
import Skeleton from "./Skeleton";

const DetailSkeleton = () => {
  return (
    <View style={styles.container}>
      <Skeleton height={460} borderRadius={0} />
      <View style={styles.body}>
        <Skeleton width="70%" height={26} style={styles.gap} />
        <Skeleton width="40%" height={16} style={styles.gap} />
        <View style={styles.tagsRow}>
          <Skeleton width={60} height={24} borderRadius={14} />
          <Skeleton width={60} height={24} borderRadius={14} />
          <Skeleton width={60} height={24} borderRadius={14} />
        </View>
        <Skeleton height={14} style={styles.gap} />
        <Skeleton height={14} width="90%" style={styles.gap} />
        <Skeleton height={14} width="60%" style={styles.gap} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    padding: 16,
  },
  gap: {
    marginTop: 12,
  },
  tagsRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 14,
  },
});

export default DetailSkeleton;
