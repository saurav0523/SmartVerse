import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Animated from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "../../theme/colors";

type Props = {
  animatedStyle?: any;
  onSharePress?: () => void;
};


const DetailHeader = ({ animatedStyle, onSharePress }: Props) => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  return (
    <Animated.View
      style={[
        styles.container,
        { paddingTop: Math.max(insets.top, 12) },
        animatedStyle,
      ]}
    >
      <Pressable style={styles.iconButton} onPress={() => navigation.goBack()}>
        <MaterialCommunityIcons name="arrow-left" size={22} color={styles.icon.color} />
      </Pressable>
      {onSharePress && (
        <Pressable style={styles.iconButton} onPress={onSharePress}>
          <MaterialCommunityIcons name="share-variant" size={20} color={styles.icon.color} />
        </Pressable>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.overlayIconButton,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    color: Colors.white,
  },
});

export default DetailHeader;
