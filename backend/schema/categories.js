import mongoose from "mongoose";
import Joi from "joi";

const categorySchema = mongoose.Schema(
  {
    content: { type: String, required: true },
    icon: {
      name: { type: String, required: true },
      color: { type: String, required: true },
      backgroundColor: { type: String, required: true },
    },
  },
  { collection: "categories" }
);

const joiCategorySchema = Joi.object({
  content: Joi.string().min(1).max(20).required(),
  icon: Joi.object({
    name: Joi.string().required(),
    color: Joi.string().required(),
    backgroundColor: Joi.string().required(),
  }).required(),
});

export const validateCategory = (category) => {
  return joiCategorySchema.validate(category);
};

export const Categories = mongoose.model("Categories", categorySchema);
