import express from "express";
import { validatePushToken, Users } from "../schema/users.js";
import sendPushNotification from "../utility/expoPushNotification.ts";

export const router = express.Router();

router.post("/push-token", async (req, res, next) => {
  try {
    if (!req.body) {
      let error = new Error("Missing data!");
      error.status = 400;
      throw error;
    }
    const { userId, pushToken } = req.body;

    // Validate the push token
    const { error } = validatePushToken({ expoPushToken: pushToken });

    if (error) {
      console.log("Push token validation failed:", error.details[0].message);
      const err = new Error(error.details[0].message);
      err.status = 400;
      throw err;
    }

    // Update the user with the pushToken
    const updatedUser = await Users.findByIdAndUpdate(
      userId,
      { expoPushToken: pushToken },
      { new: true }, // returns the updated user
    );

    sendPushNotification({
      targetDevices: [pushToken],
      message: {
        title: "Push Token Registered",
        body: "Your device has been registered for push notifications.",
        sound: "default",
        data: { userId },
      },
    });

    if (!updatedUser) {
      let error = new Error("Error during pushToken save!");
      error.status = 500;
      throw error;
    }

    res.status(200).json({
      pushToken: updatedUser.expoPushToken,
    });
  } catch (err) {
    next(err);
  }
});
