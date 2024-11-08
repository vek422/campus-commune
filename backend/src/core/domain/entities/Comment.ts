interface CommentInterface {
    content: string;
    imagesUri?: string[] | object[];
    likedBy: string[] | object[];
    thread: string | object;
    videosUri?: string[] | object[] | undefined;
    createdBy?: string | object;
    _id: string | unknown;
    createdAt?: Date | null
    replies?: string[] | object[] | null;
}

export class Comment {
    public content: string;
    public imagesUri?: string[] | object[];
    public likedBy: string[] | object[];
    public thread: string | object;
    public videosUri?: string[] | object[] | null;
    public createdBy: string | object | null;
    public _id: string | unknown;
    public createdAt?: Date | null;
    public replies?: string[] | object[] | null;
    constructor({ content, imagesUri, likedBy, thread, videosUri, createdBy, createdAt, _id, replies = [] }: CommentInterface) {
        this.content = content;
        this.likedBy = likedBy;
        this.thread = thread;
        this._id = _id || null;
        this.createdBy = createdBy || null;
        this.replies = replies;
        if (createdAt)
            this.createdAt = createdAt
        if (imagesUri)
            this.imagesUri = imagesUri;
        if (videosUri)
            this.videosUri = videosUri;
    }
}