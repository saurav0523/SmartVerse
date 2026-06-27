import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "../screens/Profile/ProfileScreen";
import DownloadsScreen from "../screens/Profile/DownloadsScreen";
import NotificationsScreen from "../screens/Profile/NotificationsScreen";
import SubscriptionScreen from "../screens/Profile/SubscriptionScreen";
import SupportScreen from "../screens/Profile/SupportScreen";
import AboutScreen from "../screens/Profile/AboutScreen";

const Stack = createNativeStackNavigator();

const ProfileNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="Downloads" component={DownloadsScreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
      <Stack.Screen name="Subscription" component={SubscriptionScreen} />
      <Stack.Screen name="Support" component={SupportScreen} />
      <Stack.Screen name="About" component={AboutScreen} />
    </Stack.Navigator>
  );
};

export default ProfileNavigator;
