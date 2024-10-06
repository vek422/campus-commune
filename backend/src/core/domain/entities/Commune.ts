import mongoose from "mongoose";

export class Commune {
    public name: string;
    public id: string | undefined;
    public description: string;
    public profileUri?: string;
    public members?: string[] | object[];
    public createdBy: string | object;
    public channels?: string[] | object[];
    constructor(
        { name, description, profileUri, members, channels, createdBy, _id, id }: {
            name: string;
            description: string;
            profileUri?: string;
            members?: string[] | object[];
            channels?: string[] | object[];
            createdBy: string | object;
            _id?: string;
            id?: string;
        }
    ) {
        this.name = name;
        this.description = description;
        this.createdBy = createdBy;
        this.id = id || _id;
        if (profileUri)
            this.profileUri = profileUri;
        if (channels)
            this.channels = channels;
        if (members)
            this.members = members;
    }
}