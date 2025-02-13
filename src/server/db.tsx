"use server";
import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error("MONGO_URI is not defined");
}

const connectDB = async () => {
  try {
    // Check if mongoose is initialized at all
    if (!mongoose?.connections?.[0]) {
      console.log("MongoDB: Initializing new connection");
      await mongoose.connect(MONGO_URI, { dbName: "prod" });
      return;
    }

    // Get the default connection
    const defaultConn = mongoose.connections[0];

    // If we can safely check readyState and we're connected, return early
    if (defaultConn.readyState === 1) {
      console.log("Already connected to MongoDB");
      return;
    }

    // If we reach here, we need a new connection
    await mongoose.connect(MONGO_URI, { dbName: "prod" });
    console.log("Connected to MongoDB: prod");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error; // Re-throw to handle it in the calling code
  }
};

export default connectDB;
