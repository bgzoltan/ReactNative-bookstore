import mongoose from "mongoose";
import Joi from "joi";

export const listingSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: false },
    images: { type: [{ fileName: String }], default: [] },
    price: { type: Number, required: true },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    location: {
      latitude: { type: Number, required: true },
      longitude: { type: Number, required: true },
    },
  },
  { collection: "listings" }
);

const joiListingSchema = Joi.object({
  title: Joi.string().min(1).max(20).required(),
  author: Joi.string().min(1).max(20),
  images: Joi.array()
    .min(1)
    .max(5)
    .items(
      Joi.object({
        fileName: Joi.string().required(),
      })
    )
    .required(),
  price: Joi.number().min(1).required(),
  categoryId: Joi.string().required(),
  userId: Joi.string().required(),
  location: Joi.object({
    latitude: Joi.number().required(),
    longitude: Joi.number().required(),
  }).required(),
});

export const validateListing = (item) => {
  return joiListingSchema.validate(item);
};

export const Listings = mongoose.model("Listings", listingSchema);
