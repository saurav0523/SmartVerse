import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WatchlistScreen from "../screens/Profile/WatchlistScreen";
import DetailScreen from "../screens/Detail/DetailScreen";

const Stack = createNativeStackNavigator();

const WatchlistNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }} >
      <Stack.Screen name="WatchlistScreen" component={WatchlistScreen} />
      <Stack.Screen name="Detail" component={DetailScreen} />
    </Stack.Navigator>
  );
};

export default WatchlistNavigator;
