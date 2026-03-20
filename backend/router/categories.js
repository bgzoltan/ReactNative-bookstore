import express from "express";
import { Categories, validateCategory } from "../schema/categories.js";
import authMiddleware from "../middleware/authMiddleware.js";
export const router = express.Router();

//  Adding a new category to the MongoDB
router.post("/categories", authMiddleware, async (req, res, next) => {
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
    res.status(201).send(response);
  } catch (err) {
    console.log("API error during adding a new category", err);
    next(err);
  }
});

router.get("/categories", authMiddleware, async (req, res, next) => {
  try {
    const categories = await Categories.find().sort({ name: 1 });
    res.status(200).send(categories);
  } catch (err) {
    console.log("API error during get categories", err);
    next(err);
  }
});
