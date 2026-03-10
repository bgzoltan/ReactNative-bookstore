import mongoose from "mongoose";
import Joi from "joi";

const messageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  subject: { type: String, required: true }, // Book title
  relatedBookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Listings",
    required: true,
  },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

export const Message = mongoose.model("Message", messageSchema);

const joiMessageSchema = Joi.object({
  sender: Joi.string().hex().length(24).required(),
  recipient: Joi.string().hex().length(24).required(),
  subject: Joi.string().required(),
  relatedBookId: Joi.string().hex().length(24).required(),
  content: Joi.string().required(),
});

export const validateMessage = (message) => {
  return joiMessageSchema.validate(message);
};
