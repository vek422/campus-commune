export class Thread {

    public title: string;
    public content: string;
    public createdBy: string | object;
    public imageUri: string;
    public likedBy: string[] | object[];
    public comments: string[] | object[];
    public videoUri: string;
    constructor(
        { title, content, imageUri, likedBy, comments, createdBy, videoUri }: {
            title: string;
            content: string;
            imageUri?: string;
            likedBy?: string[] | object[];
            comments?: string[] | object[];
            videoUri?: string;
            createdBy: string | object;
        }
    ) {
        this.title = title;
        this.content = content;

        this.imageUri = imageUri || "";

        this.likedBy = likedBy || [];

        this.comments = comments || [];

        this.videoUri = videoUri || "";
        this.createdBy = createdBy;
    }
}