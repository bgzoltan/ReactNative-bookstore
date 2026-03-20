import express from "express";
import { Listings, validateListing } from "../schema/listings.js";
export const router = express.Router();
import { multerUpload } from "../middleware/multerUpload.js";
import dotenv from "dotenv";
import authMiddleware from "../middleware/authMiddleware.js";
dotenv.config();

router.post(
  "/listings",
  authMiddleware,
  multerUpload.array("images", 5),
  async (req, res, next) => {
    const newImages = req.files.map((file) => ({
      id: file.filename,
      uri: `${process.env.API_URL}/${file.path}`,
      fileName: file.originalname,
    }));

    const listing = {
      ...req.body,
      images: newImages,
      location: JSON.parse(req.body.location),
    };

    try {
      const { error } = validateListing(listing);
      if (error) {
        const err = new Error(error.message);
        err.status = 400;
        throw err;
      }
      const newListing = new Listings(listing);
      const response = await newListing.save();
      res.status(201).send(response);
    } catch (err) {
      console.log("API error during add listing: ", err);
      next(err);
    }
  },
);

// Get all uploaded books from MongoDB
router.get("/listings", authMiddleware, async (req, res) => {
  let listings;

  try {
    const { category } = req.query;

    if (!category) {
      listings = await Listings.find();
    } else {
      listings = await Listings.find({ category });
    }

    res.status(200).send(listings);
  } catch (err) {
    console.log("API error during get listings: ", err);
    next(err);
  }
});

// Get the users's uploaded books from MongoDB
router.get("/me/listings", authMiddleware, async (req, res) => {
  try {
    const listings = await Listings.find({ userId: req.user._id });
    res.status(200).json(listings);
  } catch (err) {
    console.log("API error during get listings: ", err);
    next(err);
  }
});
