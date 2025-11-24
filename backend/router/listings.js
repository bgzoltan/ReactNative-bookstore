import express from "express";
import { Listings, validateListing } from "../schema/listings.js";
export const router = express.Router();
import { multerUpload } from "../middleware/multerUpload.js";
import dotenv from "dotenv";
dotenv.config();

router.post("/listings", multerUpload.array("images", 5), async (req, res) => {
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
      if (error) {
        const err = new Error(error.message);
        err.status = 400;
        throw err;
      }
    }
    const newListing = new Listings(listing);
    const response = await newListing.save();
    if (!response) {
      const err = new Error("Error during create listing.");
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

router.get("/listings", async (req, res) => {
  try {
    const listings = await Listings.find();
    res.status(200).send(listings);
  } catch (err) {
    console.log("Error: ", err);
    res.status(err.status).send(err.message);
  }
});
