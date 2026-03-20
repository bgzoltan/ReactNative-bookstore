import express from "express";
import { validatePushToken, Users } from "../schema/users.js";
import sendPushNotification from "../utility/expoPushNotification.ts";
import authMiddleware from "../middleware/authMiddleware.js";
export const router = express.Router();

router.post("/push-token", authMiddleware, async (req, res, next) => {
  try {
    if (!req.body) {
      let error = new Error("API error during post push token - missing data");
      error.status = 400;
      throw error;
    }
    const { userId, pushToken } = req.body;

    // Validate the push token
    const { error } = validatePushToken({ expoPushToken: pushToken });

    if (error) {
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

    // Send notification to user
    sendPushNotification({
      targetDevices: [pushToken],
      message: {
        title: "Push Token Registered",
        body: "Your device has been registered for push notifications.",
        sound: "default",
        data: { userId },
      },
    });

    // Return the pushToken value to frontend
    res.status(200).json({
      pushToken: updatedUser.expoPushToken,
    });
  } catch (err) {
    console.log("API error during post push token: ", err);
    next(err);
  }
});
