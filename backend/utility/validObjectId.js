import mongoose from "mongoose";

export default function isValidObjectId(objectId) {
  if (!mongoose.Types.ObjectId.isValid(objectId)) {
    console.log("Invalid ObjectId format:", objectId);
    return false;
  }
  return true;
}
