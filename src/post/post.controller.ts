import {Body, Controller, Get, Headers, HttpException, HttpStatus, Param, Post} from "@nestjs/common";
import {PostService} from "./post.service";
import {SendPost} from "./post.interface";

@Controller('post')

export class PostController {

    constructor(private postService: PostService) {
    }


    @Post('/createPost')
    async post(@Headers('Token') header, @Body() post: SendPost) {
        try {
            await this.postService.postFunc(post.textField, header).then(value => {
                    console.log(value[0].post_id);
                }
            );
        } catch (error) {
            throw new HttpException('Something Went wrong!!', HttpStatus.NOT_FOUND);
        }
        return "Post Is created";
    }

    @Get('/getAllPosts')
    async getAllPost() {
        try {
            return await this.postService.getAllPost();
        }catch (error){
            throw new  HttpException("We couldn't reach posts, please try again",HttpStatus.NOT_FOUND);
        }
    }
    @Get('/getSinglePost/:postId')
    async getSinglePost(@Param('postId') postId){
        try {
            return await this.postService.getSinglePost(postId);
        }catch (error){
            throw new  HttpException("There is no such a post or it is deleted.",HttpStatus.NOT_FOUND);
        }
    }


}
