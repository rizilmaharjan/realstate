import mongoose from "mongoose";


export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("connection established successfully");
  } catch (error) {
    console.log(error);
  }
};
