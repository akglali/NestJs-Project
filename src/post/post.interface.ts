export interface SendPost {
    textField: string
}

export interface PostInterface {
    PostId: string,
    VirtualName: string,
    TextContent: string,
    CommentCount: number,
    DateCreated: string,
    Likes: number,
    Dislikes: number,
    Color: string
}
