import express from "express";
import { validateAuth } from "../schema/auth.js";
import bcrypt from "bcrypt";
import { Users } from "../schema/users.js";
export const router = express.Router();

router.post("/login", async (req, res) => {
  const credentials = req.body;

  try {
    const { error } = validateAuth(credentials);

    if (error) {
      const err = new Error(
        error.message ? error.message : "Invalid login data."
      );
      err.status = 400;
      throw err;
    } else {
      const { email, password } = auth;
      const user = await Users.findOne({ email: email });

      if (!user) {
        let error = new Error("Invalid user data.");
        error.status = 401;
        throw error;
      }

      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        let error = new Error("Invalid user data.");
        error.status = 401;
        throw error;
      }

      // * Generate token for the new user and send it back to the frontend with the user data without the password
      const token = user.generateToken();
      const userObject = user.toObject();
      delete userObject.password;
      return res.header("x-auth-token", token).status(200).send(userObject);
    }
  } catch (err) {
    console.log("Error: ", err);
    res.status(err.status ? err.status : 500).send(err.message);
  }
});
