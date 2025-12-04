import express from "express";
import { validateAuth } from "../schema/auth.js";
import bcrypt from "bcrypt";
import { Users } from "../schema/users.js";
export const router = express.Router();

export function mapJoiErrorsToFormik(joiError) {
  if (!joiError || !joiError.details) return {};
  // Reduce Joi details array into an object keyed by field name
  const formikErrors = joiError.details.reduce((acc, error) => {
    const fieldName = error.path[0];
    if (!acc[fieldName]) {
      acc[fieldName] = error.message;
    }
    return acc;
  }, {});

  return formikErrors;
}

router.post("/login", async (req, res) => {
  const credentials = req.body;

  try {
    const { error } = validateAuth(credentials);

    if (error) {
      //  *. Return the error as Formik expect on frontend, in structured format (fieldName:error)
      return res.status(400).json({
        errors: formikErrors(error),
      });
    } else {
      const { email, password } = auth;
      const user = await Users.findOne({ email: email });

      if (!user) {
        let error = new Error("Invalid user or password.");
        error.status = 401;
        throw error;
      }

      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        let error = new Error("Invalid user or password.");
        error.status = 401;
        throw error;
      }

      // * Generate token for the new user and send it back to the frontend with the user data without the password
      const token = user.generateToken();
      const userObject = user.toObject();
      delete userObject.password;
      return res.header("x-auth-token", token).status(200).send(userObject);
    }
  } catch (err) {
    console.log("Error: ", err);
    return res.status(err.status || 500).json({
      error: err.message || "Internal Server Error",
    });
  }
});
