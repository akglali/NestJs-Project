import {Body, Controller, Post,Headers} from "@nestjs/common";
import {CommentService} from "./comment.service";
import {SendComment} from "./sendComment";

@Controller('comment')
export class CommentController{
    constructor(private comment:CommentService) {
    }

    @Post("/comment")
    async addComment(@Body() com:SendComment, @Headers('token') token){
        return await this.comment.commentFunc(token,com.postId,com.textField);
    }


}
