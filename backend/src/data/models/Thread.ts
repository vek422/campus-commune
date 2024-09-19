import mongoose from "mongoose";

interface IThread extends mongoose.Document {
  title: string;
  content: string;
  image_uri: string;
  liked_by: mongoose.Schema.Types.ObjectId[];
  comments: mongoose.Schema.Types.ObjectId[];
  video_uri: string;
}

const threadSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  image_uri: {
    type: String,
    required: true,
  },
  liked_by: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
  },
  comments: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Comment",
  },
  video_uri: {
    type: String,
    required: true,
  },
});

const ThreadModel = mongoose.model<IThread>("Thread", threadSchema);
export default ThreadModel;
