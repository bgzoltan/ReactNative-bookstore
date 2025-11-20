import express from "express";
import { Categories, validateCategories } from "../schema/categories.js";
export const router = express.Router();

router.post("/categories", async (req, res) => {
  const category = req.body;

  try {
    const { error } = validateCategories(category);
    if (error) {
      if (error) {
        const err = new Error(error.message);
        err.status = 400;
        throw err;
      }
    }
    const newCategory = new Categories(category);
    const response = await newCategory.save();
    if (!response) {
      const err = new Error("Error during create category.");
      err.status = 400;
      throw err;
    } else {
      res.status(201).send(response);
    }
  } catch (err) {
    console.log("Error: ", err);
    res.status(err.status ? err.status : 500).send(err.message);
  }
});
