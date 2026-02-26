import mongoose from "mongoose";
import Joi from "joi";
import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";
import { EmailType, PasswordType, emailField, passwordField } from "./auth.js";

// * to use .env need to install dotenv package
configDotenv();

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true, maxlength: 15, minlength: 3 },
  lastName: { type: String, required: true, maxlength: 15, minlength: 3 },
  email: EmailType,
  password: PasswordType,
  expoPushToken: {
    type: String,
    default: null,
    index: true, // useful for push queries
  },
});

// * Adding the generateToken function as a method to the User schema
userSchema.methods.generateToken = function () {
  // * Generate the json webtoken
  const secret = process.env.SECRET;
  const token = jwt.sign({ _id: this._id }, secret, { expiresIn: "1h" });
  return token;
};

const joiUserSchema = Joi.object({
  firstName: Joi.string().min(3).max(15).required(),
  lastName: Joi.string().min(3).max(15).required(),
  email: emailField,
  password: passwordField,
});

// Inorder to validate the push token, we can create a separate Joi schema for it. The push token should follow the format "ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]", where "xxxxxxxxxxxxxxxxxxxxxx" is a string of alphanumeric characters. We can use a regular expression to validate this format.
const pushTokenSchema = Joi.object({
  expoPushToken: Joi.string(),
});

export const validateUser = (user) => {
  return joiUserSchema.validate(user);
};

export const validatePushToken = (pushToken) => {
  return pushTokenSchema.validate(pushToken);
};

export const Users = mongoose.model("Users", userSchema);
