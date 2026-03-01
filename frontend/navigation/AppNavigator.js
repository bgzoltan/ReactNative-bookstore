import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ListingEditScreen from "../UI/ListingEditScreen";
import AccountNavigator from "./AccountNavigator";
import { Icon } from "../components/Icon";
import colors from "../config/colors";
import FeedNavigator from "./FeedNavigator";
import usePushNotification from "../hooks/useNotification";

//    Tab navigation is a common pattern to switch between different screens or sections of the app. Each tab corresponds to a different screen or section of the app, such as the feed, listing edit screen, and account settings.
const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  // This custom hook is responsible for requesting notification permissions and handling incoming notifications.
  const notificationListener = (notification) => {
    console.log("Notification received:", notification);
  };
  usePushNotification(notificationListener);

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Feed"
        component={FeedNavigator}
        options={tabOption("house", 24, colors.icon.red, colors.bg.white)}
      />
      <Tab.Screen
        name="Edit"
        component={ListingEditScreen}
        options={tabOption(
          "circlePlus",
          32,
          colors.icon.white,
          colors.bg.primary,
        )}
      />
      <Tab.Screen
        name="Account"
        component={AccountNavigator}
        options={tabOption("user", 28, colors.icon.red, colors.bg.white)}
      />
    </Tab.Navigator>
  );
}

const tabOption = (iconName, size = 24, color, backgroundColor) => ({
  tabBarIcon: ({ focused }) => (
    <Icon
      name={iconName}
      size={size}
      color={focused ? color : colors.icon.darkGrey}
      backgroundColor={focused ? backgroundColor : colors.bg.white}
      style={{
        marginBottom: iconName == "circlePlus" ? 30 : 0,
      }}
    />
  ),
  headerShown: false,
  tabBarActiveTintColor: colors.icon.red,
  tabBarInactiveTintColor: colors.icon.darkGrey,
  tabBarLabelStyle: {
    fontWeight: "600",
  },
});
