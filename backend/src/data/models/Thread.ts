import { channel } from "diagnostics_channel";
import mongoose from "mongoose";

interface IThread extends mongoose.Document {
  title: string;
  content: string;
  imagesUri: string[];
  likedBy: mongoose.Schema.Types.ObjectId[];
  comments: mongoose.Schema.Types.ObjectId[];
  videoUri: string;
  channelId: mongoose.Schema.Types.ObjectId;
  createdBy: mongoose.Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const threadSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  content: {
    type: String,
  },
  imagesUri: {
    type: [String],
  },
  likedBy: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
  },
  comments: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Comment",
  },
  videoUri: {
    type: String,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  channelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Channel",
  }

}, {
  timestamps: true
});

const ThreadModel = mongoose.model<IThread>("Thread", threadSchema);
export default ThreadModel;
