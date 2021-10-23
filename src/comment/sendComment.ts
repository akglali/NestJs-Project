export interface SendComment {
    postId: string,
    textField: string,
}

export interface CommentInterface {
    commentId: string,
    PostId: string,
    textField: string,
    nickname: string,
    likes: number,
    dislikes: number,
    commentColor: string,
    commentDateCreated: string
}