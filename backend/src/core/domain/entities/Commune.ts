import mongoose from "mongoose";

export class Commune {
    public name: string;
    public description: string;
    public profileUri?: string;
    public members?: string[] | object[];
    public createdBy: string | object;
    public channels?: string[] | object[];
    constructor(
        { name, description, profileUri, members, channels, createdBy }: {
            name: string;
            description: string;
            profileUri?: string;
            members?: string[] | object[];
            channels?: string[] | object[];
            createdBy: string | object;
        }
    ) {
        this.name = name;
        this.description = description;
        this.createdBy = createdBy;
        if (profileUri)
            this.profileUri = profileUri;
        if (channels)
            this.channels = channels;
        if (members)
            this.members = members;
    }
}