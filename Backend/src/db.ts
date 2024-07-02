import mongoose from "mongoose";

export const conectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost/testdb");
    console.log('>> DB connected');
  } catch (error) {
    console.log(error);
  }
};
