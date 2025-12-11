import express from "express";
import { validateAuth } from "../schema/auth.js";
import bcrypt from "bcrypt";
import { Users } from "../schema/users.js";
export const router = express.Router();

router.post("/login", async (req, res, next) => {
  const credentials = req.body;
  const { error } = validateAuth(credentials);

  if (error) {
    //  * General error handler catch the error -> pass the error to the next middleware
    return next(error);
  } else {
    const { email, password } = credentials;
    const user = await Users.findOne({ email: email });
    let error = new Error("Invalid login data.");
    error.status = 401;

    if (!user) {
      return next(error);
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return next(error);
    }

    //  * Authentication is successful

    // * Generate token for the new user and send it back to the frontend with the user data without the password
    const token = user.generateToken();
    const userObject = user.toObject();
    // * Do not send password back to the frontend
    delete userObject.password;

    // Send token in the body
    res.status(200).json({
      token,
      user: userObject,
    });
  }
});
