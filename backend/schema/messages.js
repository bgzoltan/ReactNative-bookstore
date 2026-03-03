import mongoose from "mongoose";
import Joi from "joi";

const messageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

export const Message = mongoose.model("Message", messageSchema);

const joiMessageSchema = Joi.object({
  sender: Joi.string().required(),
  recipient: Joi.string().required(),
  content: Joi.string().required(),
});

export const validateMessage = (message) => {
  return joiMessageSchema.validate(message);
};
