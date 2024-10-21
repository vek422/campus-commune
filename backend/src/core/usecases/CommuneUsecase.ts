import { Commune } from "@core/domain/entities/Commune";
import { CommuneRepository } from "@data/repositories/CommuneRepository";

export class CommuneUsecase {
    private communeRepository: CommuneRepository;
    constructor() {
        this.communeRepository = new CommuneRepository();
        this.createCommune = this.createCommune.bind(this);
        this.joinCommune = this.joinCommune.bind(this);
        this.getCommune = this.getCommune.bind(this);
    }

    async createCommune(commune: Commune): Promise<any> {
        let savedCommune = await this.communeRepository.createCommune(commune);
        //add default channel general to the the commune
        let savedChannel = await this.addChannel(savedCommune._id, "General");
        savedCommune = await savedCommune.toObject();
        savedCommune.channels.push(savedChannel);
        return new Commune(savedCommune);
    }

    async joinCommune(communeId: string, userId: string): Promise<any> {
        return await this.communeRepository.joinCommune(communeId, userId);
    }
    async getCommune(communeId: string): Promise<any> {
        return await this.communeRepository.getCommuneById(communeId);
    }
    getCommuneChannels = async (communeId: string) => {
        return await this.communeRepository.getCommuneChannels(communeId);
    }
    addChannel = async (communeId: string, channelName: string) => {
        return await this.communeRepository.addChannel(communeId, channelName);
    }
    getChannelInfo = async (communeId: string, channelId: string, pageNumber: number, limit: number) => {
        const { channel, total, hasMore } = await this.communeRepository.getCommuneChannel(communeId, channelId, pageNumber, limit);
        return { channel, total, hasMore };
    }
}