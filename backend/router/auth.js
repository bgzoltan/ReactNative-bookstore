import express from "express";
import { validateAuth } from "../schema/auth.js";
export const router = express.Router();

router.post("/login", async (req, res) => {
  const auth = req.body;

  try {
    const { error } = validateAuth(auth);

    if (error || error == undefined) {
      const err = new Error(error.message);
      err.status = 400;
      throw err;
    } else {
      console.log("Error", error);
      res.status(200).send("Login is correct");
    }
  } catch (err) {
    console.log("Error: ", err);
    res.status(err.status ? err.status : 500).send(err.message);
  }
});
