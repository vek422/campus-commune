import mongoose from "mongoose";


interface IChannel extends mongoose.Document {
    name: string;
    threads: mongoose.Schema.Types.ObjectId[];
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
});

const ChannelModel = mongoose.model<IChannel>("Channel", channelSchema);
export { ChannelModel };
