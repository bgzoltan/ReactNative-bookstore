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
});

// * Adding the generateToken function as a method to the User schema
userSchema.methods.generateToken = function () {
  // * Generate the json webtoken
  const secret = process.env.SECRET;
  const token = jwt.sign({ _id: this._id }, secret);
  return token;
};

const joiUserSchema = Joi.object({
  firstName: Joi.string().min(3).max(15).required(),
  lastName: Joi.string().min(3).max(15).required(),
  email: emailField,
  password: passwordField,
});

export const validateUser = (user) => {
  return joiUserSchema.validate(user);
};

export const User = mongoose.model("User", userSchema);
