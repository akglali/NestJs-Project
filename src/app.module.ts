import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {Login_signupController} from "./login-signup/login_signup.controller";
import {login_signupService} from "./login-signup/login_signup.service";
import {ConfigModule} from "@nestjs/config";
import {DatabaseModule} from "./database/database.module";
import {PostController} from "./post/post.controller";
import {PostService} from "./post/post.service";
import {CommentController} from "./comment/comment.controller";
import {CommentService} from "./comment/comment.service";
import {RandomCreator} from "./helpers/randomCreator";

@Module({
  imports: [
      ConfigModule.forRoot({
          isGlobal:true,
          envFilePath:['../.env'],
      }),DatabaseModule
  ],
  controllers: [AppController,Login_signupController,PostController,CommentController],
  providers: [AppService,login_signupService,PostService,CommentService,RandomCreator],
})
export class AppModule {}
