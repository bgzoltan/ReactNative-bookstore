import mongoose from "mongoose";
import Joi from "joi";

const categorySchema = mongoose.Schema(
  {
    id: { type: mongoose.types.ObjectId, required: true },
    content: { type: String, required: true },
    icon: { type: String, required: true },
    backgroundColor: { type: String, required: true },
  },
  { collection: "categories" }
);

const joiCategorySchema = Joi.object({
  content: Joi.string().required(),
  icon: Joi.string().required(),
  backgroundColor: Joi.string().required(),
});

export const validateCategory = (category) => {
  return joiCategorySchema.validate(category);
};

export const Category = mongoose.model("Category", categorySchema);
