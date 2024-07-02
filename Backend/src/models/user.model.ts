import mongoose, { mongo } from "mongoose";

interface User {
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}


const userSchema = new mongoose.Schema<User>(
  {
    username: { type: String, required: true, trim: true, unique: true },
    email: { type: String, required: true, trim: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
