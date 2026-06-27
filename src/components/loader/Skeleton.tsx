import React, { useEffect } from "react";
import { StyleSheet, ViewStyle, StyleProp } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from "react-native-reanimated";
import useAppTheme from "../../hooks/useAppTheme";

type Props = {
  width?: number | string;
  height?: number;
  borderRadius?: number;
  style?: StyleProp<ViewStyle>;
};

const DEFAULTS = {
  width: "100%" as const,
  height: 16,
  borderRadius: 6,
};

const Skeleton = ({
  width = DEFAULTS.width,
  height = DEFAULTS.height,
  borderRadius = DEFAULTS.borderRadius,
  style,
}: Props) => {
  const { colors } = useAppTheme();
  const opacity = useSharedValue(0.4);

  useEffect(() => {
    opacity.value = withRepeat(
      withTiming(1, { duration: 700, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      style={[
        styles.skeleton,
        {
          backgroundColor: colors.skeleton,
          width: width as any,
          height,
          borderRadius,
        },
        animatedStyle,
        style,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  skeleton: {
    width: DEFAULTS.width,
    height: DEFAULTS.height,
    borderRadius: DEFAULTS.borderRadius,
  },
});

export default Skeleton;
