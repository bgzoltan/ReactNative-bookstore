import express from "express";
import { validateUser, User } from "../schema/user.js";

export const router = express.Router();

router.post("/user", async (req, res) => {
  try {
    if (!req.body) {
      let error = new Error("Missing data!");
      error.status = 400;
      throw error;
    }
    const user = req.body;
    const { error } = validateUser(user);

    if (error) {
      const err = new Error(error.details[0].message);
      err.status = 400;
      throw err;
    }

    const newUser = new User(user);
    const response = await newUser.save();
    if (!response) {
      let error = new Error("Error during saving data into database!");
      error.status = 500;
      throw error;
    }
    res.status(201).send(response);
  } catch (err) {
    res
      .status(err.status ? err.status : 500)
      .send(err.message ? err.message : "Error during user registration.");
  }
});
