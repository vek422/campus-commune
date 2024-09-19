import mongoose, { Document } from "mongoose";

interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
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
});

const UserModel = mongoose.model<IUser>("User", userSchema);
export { UserModel };
