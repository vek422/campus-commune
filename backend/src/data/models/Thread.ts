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

}

const threadSchema = new mongoose.Schema({
  title: {
    type: String,
    // required: true,
  },
  content: {
    type: String,
    // required: true,
  },
  imagesUri: {
    type: [String],
    // required: true,
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
    // required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  channelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Channel",
  }
});

const ThreadModel = mongoose.model<IThread>("Thread", threadSchema);
export default ThreadModel;
