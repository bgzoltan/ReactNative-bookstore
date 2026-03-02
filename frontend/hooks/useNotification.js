import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useApi } from "./useApi";

// I had to configure my app in the Apple Developer portal, create an App ID with push notification capability, and generate a push notification certificate. In order to do that, I needed an Apple Developer account, which costs $99 per year.

export default function usePushNotification(notificationListener) {
  const { user } = useAuth();
  const { _id: userId } = user;
  const { request: savePushToken } = useApi("post", "push-token");

  // Request notification permission on app startup using expo-notifications
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

      //  It’s important to note that the token you get from Expo is specific to the Expo Go app and won’t work if you build a standalone app. For standalone apps, you need to configure push notifications separately for iOS and Android, and the token management will be different.
      Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowBanner: true,
          shouldPlaySound: true,
          shouldSetBadge: true,
        }),
      });
      const projectId =
        Constants?.expoConfig?.extra?.eas?.projectId ??
        Constants?.easConfig?.projectId;
      const token = (
        await Notifications.getExpoPushTokenAsync({
          projectId,
        })
      ).data;
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
    if (notificationListener)
      Notifications.addNotificationReceivedListener(notificationListener);
  }, []);
}
