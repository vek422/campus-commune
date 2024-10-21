import { Commune } from "@core/domain/entities/Commune";
import { ChannelModel } from "@data/models/channel";
import { CommuneModel } from "@data/models/Commune";
import { UserModel } from "@data/models/User";
import { HttpError } from "@utils/ErrorHandler/HttpError";
import mongoose from "mongoose";


export class CommuneRepository {
    async createCommune(commune: Commune): Promise<any> {
        try {
            const newCommune = new CommuneModel({
                name: commune.name,
                description: commune.description,
                profileUri: commune.profileUri,
                createdBy: commune.createdBy,
                members: [commune.createdBy]
            });
            const user = await UserModel.findByIdAndUpdate(commune.createdBy, { $push: { communes: newCommune._id } }, { new: true });
            await newCommune.save();
            return newCommune;
        } catch (err: any) {
            throw new Error("Error at CommuneRepository.createCommune: " + err.message);
        }
    }
    async getCommuneById(id: string): Promise<any> {
        try {
            const commune = await CommuneModel.findById(id).populate([{ path: "members", select: ["firstName", "lastName", "_id"] }, { path: "createdBy", select: ["firstName", "lastName", "_id"] }, { path: "channels", select: ["name", "_id"] }]);
            if (commune === null) throw new HttpError(404, "Commune Not Found")
            return commune;
        } catch (err: any) {
            throw new Error("Error at CommuneRepository.getCommuneById: " + err.message);
        }
    }
    async joinCommune(communeId: string, userId: string): Promise<any> {
        try {
            const user = await UserModel.findByIdAndUpdate(userId, { $addToSet: { communes: communeId } }, { new: true });
            if (user === null) throw new HttpError(404, "User not found");
            const commune = await CommuneModel
                .findByIdAndUpdate(communeId, { $addToSet: { members: userId } }, { new: true });
            if (commune === null) throw new HttpError(404, "Commune not found");
            return commune;
        } catch (err: any) {
            throw new Error("Error at CommuneRepository.joinCommune: " + err.message);
        }
    }

    getCommuneChannels = async (communedId: string) => {
        try {
            console.log(communedId);
            const isIdValid = mongoose.Types.ObjectId.isValid(communedId);
            if (!isIdValid) throw new HttpError(400, "Invalid Request Data")
            const commune = await CommuneModel.findById(communedId).populate("channels");

            if (!commune) throw new HttpError(404, "Invalid Commune")
            return commune?.channels;
        } catch (err: any) {
            if (err instanceof HttpError) throw err
            throw new Error("Error at CommuneRepository.getCommuneChannels : " + err.message)
        }
    }

    addChannel = async (communeId: string, channelName: string) => {
        try {
            const newChannel = new ChannelModel({ name: channelName });
            const savedChannel = await newChannel.save();
            const updatedCommune = await CommuneModel.findByIdAndUpdate(communeId, { $addToSet: { channels: savedChannel._id } })
            return savedChannel;
        } catch (err: any) {
            throw new Error("Error At CommuneRepository.addChannel : " + err.message)
        }
    }

    getCommuneChannel = async (communeId: string, channelId: string, pageNumber: number, limit: number) => {

        try {
            console.log(pageNumber, limit)
            const skip = (pageNumber - 1) * limit;
            const [channel, threadCount] = await Promise.all([ChannelModel.findById(channelId).populate({
                path: 'threads',
                populate: {
                    path: 'createdBy',
                },
                options: {
                    limit: limit,
                    skip: skip,
                    sort: { createdAt: -1 }
                }
            }),
            ChannelModel.aggregate([
                { $match: { _id: new mongoose.Types.ObjectId(channelId) } },
                { $project: { threadCount: { $size: '$threads' } } }
            ])
            ])
            const currentCount = channel?.threads?.length || 0;
            console.log("currCount : ", currentCount)
            const total = threadCount[0]?.threadCount || 0;
            console.log("total : ", total)
            console.log("skip : ", skip)
            const hasMore = skip + currentCount < total;
            return { channel, total, hasMore };
        } catch (err: any) {
            throw new Error("Something went wrong : " + err.message);
        }
    }

}