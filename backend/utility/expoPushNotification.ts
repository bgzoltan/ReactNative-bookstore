import { Expo } from "expo-server-sdk";

interface NotificationMessageI {
  targetDevices: string[];
  message: {
    title: string;
    body: string;
    sound?: "default";
    data?: {};
    richContent?: {};
    ttl?: number; // 1 hour
  };
}
export default async function sendPushNotification(
  notification: NotificationMessageI,
) {
  // Create a new Expo SDK client
  // optionally provide an access token if you have enabled push security
  const expo = new Expo();

  const targetPushTokens: string[] = notification.targetDevices;

  // Create the messages that you want to send to clients
  const messages = targetPushTokens.map((pushToken) => {
    // Each push token looks like "ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]"
    // Check that all push tokens have valid Expo push token format
    if (!Expo.isExpoPushToken(pushToken)) {
      throw new Error(`Push token ${pushToken} is not a valid Expo push token`);
    }
    return {
      to: pushToken,
      ...notification.message,
    };
  });

  // The Expo push notification service accepts batches of notifications so
  // that you don't need to send 1000 requests to send 1000 notifications. We
  // recommend you batch your notifications to reduce the number of requests
  // and to compress them (notifications with similar content will get
  // compressed).
  const chunks = expo.chunkPushNotifications(messages);
  let tickets = [];
  // Send the chunks to the Expo push notification service. There are
  // different strategies you could use. A simple one is to send one chunk at a
  // time, which nicely spreads the load out over time:
  for (const chunk of chunks) {
    try {
      const ticketChunk = await expo.sendPushNotificationsAsync(chunk);
      console.log("result of sending push messages to Expo:", ticketChunk);
      tickets.push(...ticketChunk);
      // NOTE: If a ticket contains an error code in ticket.details.error, you
      // must handle it appropriately. The error codes are listed in the Expo
      // documentation:
      // https://docs.expo.io/push-notifications/sending-notifications/#individual-errors
    } catch (error) {
      console.error(error);
    }
  }
}
