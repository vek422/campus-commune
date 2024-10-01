import mongoose from "mongoose";

interface IComment extends mongoose.Document {
  content: string;
  image_uri: string;
  liked_by: mongoose.Schema.Types.ObjectId[];
  thread: mongoose.Schema.Types.ObjectId;
  video_uri: string;
}

const commentSchema = new mongoose.Schema({
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
  thread: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Thread",
  },
  video_uri: {
    type: String,
    required: true,
  },
});

const CommentModel = mongoose.model<IComment>("Comment", commentSchema);

export default { CommentModel };
