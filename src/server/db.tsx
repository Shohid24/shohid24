import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error("MONGO_URI is not defined");
}

const connectDB = async () => {
  try {
    if (mongoose.connection.readyState === 1) {
      console.log("Already connected to MongoDB");
      return;
    }
    await mongoose.connect(MONGO_URI, { dbName: "prod" });
    console.log("Connected to MongoDB: prod");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

export default connectDB;
