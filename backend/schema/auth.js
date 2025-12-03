import mongoose from "mongoose";
import Joi from "joi";

export const emailRegex = /^\S+@\S+\.\S+$/;
export const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/;

export const EmailType = {
  type: String,
  required: true,
  unique: true,
  lowercase: true,
  match: [emailRegex, "Please enter a valid email address"],
};

export const PasswordType = {
  type: String,
  required: true,
  minlength: 8,
  maxlength: 20,
};

export const authSchema = mongoose.Schema({
  email: EmailType,
  password: PasswordType,
});

export const emailField = Joi.string()
  .min(3)
  .max(25)
  .required()
  .lowercase()
  .pattern(emailRegex)
  .messages({
    "string.empty": "Email is required",
    "string.pattern.base": "Invalid email format",
  });

export const passwordField = Joi.string()
  .min(8)
  .max(20)
  .required()
  .pattern(passwordRegex)
  .messages({
    "string.empty": "Password is required",
    "string.min": "Password must be at least 8 characters",
    "string.pattern.base": "Invalid password",
  });

export const joiAuthSchema = Joi.object({
  email: emailField,
  password: passwordField,
});

export const validateAuth = (auth) => {
  return joiAuthSchema.validate(auth);
};

export const Auth = mongoose.model("Auth", authSchema);
