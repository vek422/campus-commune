interface ThreadProps {
    _id: string | unknown,
    title: string;
    content: string;
    imagesUri?: string[];
    likedBy?: string[] | object[];
    comments?: string[] | object[];
    videoUri?: string;
    createdBy: string | object;
    channelId?: string | object;
    createdAt?: Date;
    updatedAt?: Date;
}
export class Thread implements ThreadProps {
    public _id: string | unknown;
    public title: string;
    public content: string;
    public createdBy: string | object;
    public likedBy: string[] | object[];
    public comments: string[] | object[];
    public imagesUri?: string[];
    public videoUri?: string;
    public channelId?: string | object;
    public createdAt?: Date;
    public updatedAt?: Date;
    constructor(
        { title, content, imagesUri, likedBy, comments, createdBy, videoUri, channelId, createdAt, updatedAt, _id }: ThreadProps
    ) {
        this.title = title;
        this.content = content;
        this._id = _id;
        if (createdAt)
            this.createdAt = createdAt;
        if (updatedAt)
            this.updatedAt = updatedAt
        if (imagesUri)
            this.imagesUri = imagesUri;

        this.likedBy = likedBy || [];

        this.comments = comments || [];

        if (videoUri)
            this.videoUri = videoUri;
        this.createdBy = createdBy;

        if (channelId)
            this.channelId = channelId
    }
}