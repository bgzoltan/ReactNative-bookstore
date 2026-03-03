import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { Message } from "../schema/messages.js";
import { validateMessage } from "../schema/messages.js";

export const router = Router();

router.get("/messages", authMiddleware, async (req, res, next) => {
  const { user } = req;
  res.json({ message: "Hello from the messages route!", user });
});

router.post("/messages", authMiddleware, async (req, res, next) => {
  const { user } = req;
  const { _id: userId } = user;
  const { recipientId, content } = req.body;

  const { error } = validateMessage({
    sender: userId,
    recipient: recipientId,
    content,
  });

  if (error) {
    console.error("Message validation error:", error.details[0].message);
    return res.status(400).json({ error: error.details[0].message });
  }

  // Create a new message document and save it to the database
  const newMessage = new Message({
    sender: userId,
    recipient: recipientId,
    content,
    timestamp: new Date(),
  });

  const response = await newMessage.save();
  if (!response) {
    let error = new Error("Error during saving message into database!");
    error.status = 500;
    throw error;
  }
  res.status(201).json({
    message: {
      sender: userId,
      recipient: recipientId,
      content,
    },
  });
});
