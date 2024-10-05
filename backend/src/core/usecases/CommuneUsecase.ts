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
        return await this.communeRepository.createCommune(commune);
    }

    async joinCommune(communeId: string, userId: string): Promise<any> {
        return await this.communeRepository.joinCommune(communeId, userId);
    }
    async getCommune(communeId: string): Promise<any> {
        return await this.communeRepository.getCommuneById(communeId);
    }
}