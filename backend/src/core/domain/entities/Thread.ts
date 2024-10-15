export class Thread {

    public title: string;
    public content: string;
    public createdBy: string | object;
    public likedBy: string[] | object[];
    public comments: string[] | object[];
    public imagesUri?: string[];
    public videoUri?: string;
    public channelId?: string | object;
    constructor(
        { title, content, imagesUri, likedBy, comments, createdBy, videoUri, channelId }: {
            title: string;
            content: string;
            imagesUri?: string[];
            likedBy?: string[] | object[];
            comments?: string[] | object[];
            videoUri?: string;
            createdBy: string | object;
            channelId?: string | object;
        }
    ) {
        this.title = title;
        this.content = content;

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