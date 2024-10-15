interface CommuneProps {
    name: string;
    description: string;
    profileUri?: string;
    members?: string[] | object[];
    channels?: string[] | object[];
    createdBy: string | object;
    _id?: string;
    id?: string;
    createdAt?: Date;
    updatedAt?: Date;
}
export class Commune implements CommuneProps {
    public name: string;
    public _id: string | undefined;
    public description: string;
    public profileUri?: string;
    public members?: string[] | object[];
    public createdBy: string | object;
    public channels?: string[] | object[];
    public createdAt?: Date;
    public updatedAt?: Date;
    constructor(
        { name, description, profileUri, members, channels, createdBy, _id, createdAt, updatedAt }: CommuneProps
    ) {
        this.name = name;
        this.description = description;
        this.createdBy = createdBy;
        if (createdAt) this.createdAt = createdAt;
        if (updatedAt) this.updatedAt = updatedAt;
        this._id = _id;
        if (profileUri)
            this.profileUri = profileUri;
        if (channels)
            this.channels = channels;
        if (members)
            this.members = members;
    }
}