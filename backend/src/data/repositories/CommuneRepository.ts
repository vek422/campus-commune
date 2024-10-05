import { Commune } from "@core/domain/entities/Commune";
import { CommuneModel } from "@data/models/Commune";
import { UserModel } from "@data/models/User";
import { HttpError } from "@utils/ErrorHandler/HttpError";


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
            const commune = await CommuneModel.findById(id).populate([{ path: "members", select: ["firstName", "lastName", "_id"] }, { path: "createdBy", select: ["firstName", "lastName", "_id"] }]);
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

}