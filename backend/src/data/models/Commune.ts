import e from "express";
import mongoose from "mongoose";

interface ICommune extends mongoose.Document {
    name: string;
    description: string;
    profileUri: string;
    members: mongoose.Schema.Types.ObjectId[];
    channels: mongoose.Schema.Types.ObjectId[];
    createdBy: mongoose.Schema.Types.ObjectId;
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
    profileUri: {
        type: String,
        // required: true,
    },
    members: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User",
    },
    channels: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Channel",
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
});

const CommuneModel = mongoose.model<ICommune>("Commune", communeSchema);

export { CommuneModel };