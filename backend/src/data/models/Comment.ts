import mongoose from "mongoose";

interface IComment extends mongoose.Document {
  content: string;
  imagesUri: string[];
  likedBy: mongoose.Schema.Types.ObjectId[];
  thread: mongoose.Schema.Types.ObjectId;
  videosUri: string[];
  createdBy: mongoose.Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  replies: mongoose.Schema.Types.ObjectId[];
  parent: mongoose.Schema.Types.ObjectId[];
}

const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  imagesUri: {
    type: [String],
    required: true,
  },
  likedBy: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
  },
  thread: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Thread",
  },
  videosUri: {
    type: [String],
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  replies: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Comment"
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment"
  }
}, {
  timestamps: true
});

const CommentModel = mongoose.model<IComment>("Comment", commentSchema);

export { CommentModel };
