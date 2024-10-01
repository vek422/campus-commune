import { profile } from "console";
import mongoose, { Document } from "mongoose";

interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  profile_url: string;
  comments: mongoose.Schema.Types.ObjectId[];
  threads: mongoose.Schema.Types.ObjectId[];
  friends: mongoose.Schema.Types.ObjectId[];
  communes: mongoose.Schema.Types.ObjectId[];
}

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  profile_url: {
    type: String
  },
  password: {
    type: String,
    required: true,
  },
  threads: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Thread",
  },
  friends: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
  },
  communes: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Commune",
  },
  comments: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Comment",
  }
});

const UserModel = mongoose.model<IUser>("User", userSchema);
export { UserModel };
