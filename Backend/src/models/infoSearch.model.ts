import mongoose, { mongo } from "mongoose";

interface User {
  id: string;
  location:string,
  createdAt: Date;
  user:{}
}


const infoSearch = new mongoose.Schema<User>(
  {
    location: { type: String, required: true, trim: true},
    user:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'User',
      required:true
    }
  },
  { timestamps: true }
);

export default mongoose.model("InfoRestaurant", infoSearch);
