import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import HomeNavigator from "./HomeNavigator";
import WatchlistNavigator from "./WatchlistNavigator";
import ProfileNavigator from "./ProfileNavigator";
import useAppTheme from "../hooks/useAppTheme";

const Tab = createBottomTabNavigator();

function getTabBarVisibility(route: any) {
  const routeName = getFocusedRouteNameFromRoute(route) ?? "HomeScreen";
  const hideOnScreens = ["Detail"];
  return hideOnScreens.includes(routeName);
}

const BottomTabs = () => {
  const { colors } = useAppTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.tabInactive,
        tabBarStyle: [
          styles.tabBar,
          {
            backgroundColor: colors.surface,
            borderTopColor: colors.border,
            display: getTabBarVisibility(route) ? "none" : "flex",
          },
        ],
        tabBarIcon: ({ color, size }) => {
          const iconName =
            route.name === "HomeTab"
              ? "home-variant"
              : route.name === "WatchlistTab"
              ? "bookmark"
              : "account-circle";
          return <MaterialCommunityIcons name={iconName as any} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="HomeTab" component={HomeNavigator} options={{ title: "Home" }} />
      <Tab.Screen
        name="WatchlistTab"
        component={WatchlistNavigator}
        options={{ title: "Watchlist" }}
      />
      <Tab.Screen name="ProfileTab" component={ProfileNavigator} options={{ title: "Profile" }} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    height: 64,
    paddingTop: 6,
    borderTopWidth: 1,
  },
});

export default BottomTabs;
