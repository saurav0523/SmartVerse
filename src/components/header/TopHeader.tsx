import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import { Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useAppTheme from "../../hooks/useAppTheme";
import useUserStore from "../../stores/useUserStore";
import { Fonts } from "../../theme/fonts";

const TopHeader = () => {
  const { colors } = useAppTheme();
  const navigation = useNavigation<any>();
  const user = useUserStore((state) => state.user);
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: Math.max(insets.top, 16) }]}>
      <View>
        <Text style={[styles.greeting, { color: colors.textMuted }]}>Welcome back</Text>
        <Text style={[styles.brand, { color: colors.text }]}>StreamVerse</Text>
      </View>
      <Pressable onPress={() => navigation.navigate("ProfileTab")}>
        <Image source={user.avatarUrl} style={styles.avatar} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 4,
  },
  greeting: {
    fontSize: 12,
  },
  brand: {
    fontSize: 20,
    fontFamily: Fonts.extraBold,
    marginTop: 2,
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
  },
});

export default TopHeader;
