import express from "express";
import { validateUser, Users } from "../schema/users.js";
import bcrypt from "bcrypt";

export const router = express.Router();

router.post("/users", async (req, res, next) => {
  try {
    if (!req.body) {
      let error = new Error("Missing data!");
      error.status = 400;
      throw error;
    }
    const user = req.body;
    // Validate the user data
    const { error } = validateUser(user);

    if (error) {
      const err = new Error(error.details[0].message);
      err.status = 400;
      throw err;
    }

    const { email } = user;
    // Check if user with given email already exists
    const isAlreadyExist = await Users.find({ email: email });
    if (isAlreadyExist.length > 0) {
      let error = new Error("User with given email already exists!");
      error.status = 400;
      throw error;
    }

    // Hashing the password of the new user
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const userWithHashedPassword = { ...user, password: hashedPassword };

    // Saving of the new user in the database
    const newUser = new Users(userWithHashedPassword);
    const response = await newUser.save();
    if (!response) {
      let error = new Error("Error during saving data into database!");
      error.status = 500;
      throw error;
    }

    // Generate token for the new user and send it back to the frontend with the user data without the password
    const token = newUser.generateToken();
    res.status(201).json({
      token,
      user: {
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
      },
    });
  } catch (err) {
    next(err);
  }
});

router.get("/users", async (req, res, next) => {
  const { id } = req.query;
  try {
    const user = await Users.findById(id);
    if (!user) {
      const error = new Error("User not found.");
      error.status = 404;
      throw error;
    }
    return res.status(200).send({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });
  } catch (err) {
    next(err);
  }
});
