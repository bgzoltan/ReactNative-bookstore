import React, { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ListingEditScreen from "../UI/ListingEditScreen";
import AccountNavigator from "./AccountNavigator";
import { Icon } from "../components/Icon";
import colors from "../config/colors";
import FeedNavigator from "./FeedNavigator";
import * as Notifications from "expo-notifications";
import { useAuth } from "../context/AuthContext";
import { useApi } from "../hooks/useApi";

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  const { user } = useAuth();
  const { _id: userId } = user;
  const { request: savePushToken } = useApi("post", "push-token");

  // Request notification permission on app startup using expo-notifications

  // I had to install  in order to build and run the Expo app as a real native iOS app. It’s the bridge between JavaScript/Expo and Xcode/iOS
  // But to run this I had to install cocoapods first, which is an IOS library manager as npm
  //  I had to do several steps in Xcode to build my app and install it on my physical device. The main issue was to get the right signing team and provisioning profile.
  // After that, I could build and run the app on my iPhone, but for push notifications to work, I also had to configure my app in the Apple Developer portal, create an App ID with push notification capability, and generate a push notification certificate. In order to do that, I needed an Apple Developer account, which costs $99 per year.

  async function requestNotificationsPermission() {
    try {
      const { status } = await Notifications.getPermissionsAsync();
      let finalStatus = status;

      if (status !== "granted") {
        const { status: askStatus } =
          await Notifications.requestPermissionsAsync();
        finalStatus = askStatus;
      }

      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }

      // Get the token
      // The token is used to send push notifications to this specific device. You can use it with services like Firebase Cloud Messaging (FCM) or your own backend to send notifications.
      // I had to install 'npx expo install expo-constants'  then  run 'eas project:init' to get a projectId for the token, which is required for push notifications to work in Expo Go. The projectId is a unique identifier for your Expo project, and it’s used to route push notifications to the correct app instance on the device.
      // I had to install 'npm install -g eas-cli' to use the eas command line tool, which is required for building and managing Expo projects, especially when using features like push notifications that require a projectId.
      const token = (await Notifications.getExpoPushTokenAsync()).data;
      // This token can then be sent to your backend server, which can use it to send push notifications to this device through Expo’s push notification service.
      if (user) {
        const response = await savePushToken({
          userId,
          pushToken: token,
        });
        if (!response) {
          const error = new Error("Failed to save push token.");
          error.status = 500;
          throw error;
        } else {
          console.log("Push token saved successfully.", response);
        }
      }
    } catch (error) {
      console.error("Error requesting notifications permission:", error);
    }
  }

  useEffect(() => {
    requestNotificationsPermission();
  }, []);

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
