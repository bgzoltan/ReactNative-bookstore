import mongoose from "mongoose";
import dotenv from "dotenv";
import http from "http";
import express from "express";

import { router as listingRouter } from "./router/listings.js";

const app = express();

dotenv.config();
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 3000;

async function isPortFree(port) {
  return new Promise((resolve) => {
    const server = http.createServer();

    server.once("error", (err) => {
      resolve(err.code !== "EADDRINUSE");
    });

    server.once("listening", () => {
      server.close();
      resolve(true);
    });

    server.listen(port);
  });
}

const startServer = async () => {
  try {
    if (await isPortFree(PORT)) {
      app.listen(PORT, () =>
        console.log(`🟢 ✔️  BookStore server is running on port ${PORT}`)
      );

      await mongoose.connect(MONGO_URI);
      console.log("🟢 🔛 BookStore server is connected to Mongo database.");
    } else {
      const error = new Error(
        `🔴 Port ${PORT} is already in use. Failed to start server.`
      );
      error.status = 500;
      throw error;
    }
  } catch (err) {
    console.error(
      err.message
        ? err.message
        : `🔴 Something went wrong. Failed to start server: ${err.message}`
    );
    process.exit(1);
  }
};

startServer();

app.use("/assets", express.static("public/assets"));

app.get("/", (req, res) => {
  res.status(200).send("BookStore API is here.");
});

app.use(express.json());
app.use("/api", listingRouter);
