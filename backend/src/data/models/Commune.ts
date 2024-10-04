import e from "express";
import mongoose from "mongoose";

interface ICommune extends mongoose.Document {
    name: string;
    description: string;
    profile_uri: string;
    members: mongoose.Schema.Types.ObjectId[];
    threads: mongoose.Schema.Types.ObjectId[];
}

const communeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        // required: true,
    },
    profile_uri: {
        type: String,
        // required: true,
    },
    members: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User",
    },
    threads: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Thread",
    },
});

const CommuneModel = mongoose.model<ICommune>("Commune", communeSchema);

export { CommuneModel };