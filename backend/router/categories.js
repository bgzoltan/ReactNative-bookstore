import express from "express";
import { Categories, validateCategory } from "../schema/categories.js";
export const router = express.Router();

router.post("/categories", async (req, res) => {
  const category = req.body;

  try {
    const { error } = validateCategory(category);
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

router.get("/categories", async (req, res) => {
  try {
    const categories = await Categories.find().sort({ name: 1 });
    res.status(200).send(categories);
  } catch (err) {
    console.log("Error: ", err);
    res.status(500).send("Internal Server Error");
  }
});
