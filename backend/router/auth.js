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

    if (!user) {
      let error = new Error("Invalid user.");
      error.status = 401;
      return next(error);
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      let error = new Error("Invalid password."); // * Later on change to the same message not to inform hackers
      error.status = 401;
      return next(error);
    }

    //  * Authentication is successful
    // * Generate token for the new user and send it back to the frontend with the user data without the password
    const token = user.generateToken();
    const userObject = user.toObject();
    // * Do not send password back to the frontend
    delete userObject.password;
    return res.header("x-auth-token", token).status(200).send(userObject);
  }
});
