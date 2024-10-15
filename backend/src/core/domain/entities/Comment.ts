export class Comment {
    public content: string;
    public imagesUri?: string[] | object[];
    public likedBy: string[] | object[];
    public thread: string | object;
    public videosUri?: string[] | object[] | null;
    public createdBy: string | object | null;
    public id: string | unknown;
    public createdAt?: Date | null;
    constructor({ content, imagesUri, likedBy, thread, videosUri, createdBy, createdAt, _id }: { content: string, imagesUri?: string[] | object[], likedBy: string[] | object[], thread: string | object, videosUri?: string[] | object[] | undefined, createdBy?: string | object, _id: string | unknown, createdAt?: Date | null }) {
        this.content = content;
        this.likedBy = likedBy;
        this.thread = thread;
        this.id = _id || null;
        this.createdBy = createdBy || null;
        if (createdAt)
            this.createdAt = createdAt
        if (imagesUri)
            this.imagesUri = imagesUri;
        if (videosUri)
            this.videosUri = videosUri;


    }
}