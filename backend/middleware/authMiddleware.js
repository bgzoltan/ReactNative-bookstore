import jwt from "jsonwebtoken";

export default function authMiddleware(req, res, next) {
  //  Extract the token from the Authorization header / the same as req.headers.authorization but cleaner
  const authHeader = req.get("Authorization");

  if (!authHeader) {
    return res.status(401).json({ message: "Access denied" });
  }

  if (!authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Invalid auth format" });
  }

  //  The token is expected to be in the format "Bearer <token>"
  const token = authHeader.split(" ")[1];

  // Verify the token
  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.log("Authentication error:", err);
    err.status = 401;
    return next(err);
  }
}
