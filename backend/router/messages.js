import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { Message } from "../schema/messages.js";
import { validateMessage } from "../schema/messages.js";

export const router = Router();

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

router.get("/sent-messages", authMiddleware, async (req, res, next) => {
  try {
    const messages = await Message.find({ sender: req.user._id })
      .populate("recipient", "firstName lastName")
      .select("sender content");
    res.status(200).json(messages);
  } catch (err) {
    next(err);
  }
});

router.get("/received-messages", authMiddleware, async (req, res, next) => {
  try {
    const messages = await Message.find({ recipient: req.user._id })
      .populate("sender", "firstName lastName")
      .select("recipient content");
    res.status(200).json(messages);
  } catch (err) {
    next(err);
  }
});
