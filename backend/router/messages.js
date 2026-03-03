import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware.js";

export const router = Router();

router.get("/messages", authMiddleware, (req, res, next) => {
  const { user } = req;
  res.json({ message: "Hello from the messages route!", user });
});
