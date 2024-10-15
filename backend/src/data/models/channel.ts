import mongoose from "mongoose";


interface IChannel extends mongoose.Document {
    name: string;
    threads: mongoose.Schema.Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date;
}

const channelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    threads: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Thread",
    },
}, {
    timestamps: true
});

const ChannelModel = mongoose.model<IChannel>("Channel", channelSchema);
export { ChannelModel };
