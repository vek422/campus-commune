import e from "express";
import mongoose from "mongoose";

interface ICommune extends mongoose.Document {
    name: string;
    description: string;
    profileUri: string;
    members: mongoose.Schema.Types.ObjectId[];
    channels: mongoose.Schema.Types.ObjectId[];
    createdBy: mongoose.Schema.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const communeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    profileUri: {
        type: String,
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
}, {
    timestamps: true
});

const CommuneModel = mongoose.model<ICommune>("Commune", communeSchema);

export { CommuneModel };