import express from "express";
import { Listings, validateListing } from "../schema/listings.js";
export const router = express.Router();

router.post("/listings", async (req, res) => {
  const listing = req.body;

  try {
    const { error } = validateListing(listing);
    console.log("ERROR ---------------", error);
    if (error) {
      if (error) {
        const err = new Error(error.message);
        err.status = 400;
        throw err;
      }
    }
    const newListing = new Listings(listing);
    const response = await newListing.save();
    console.log("Listing---------------", response);
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
