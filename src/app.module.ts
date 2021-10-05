import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {Login_signupController} from "./login-signup/login_signup.controller";
import {login_signupService} from "./login-signup/login_signup.service";
import {ConfigModule} from "@nestjs/config";
import {DatabaseModule} from "./database/database.module";
import {PostController} from "./post/post.controller";
import {PostService} from "./post/post.service";

@Module({
  imports: [
      ConfigModule.forRoot({
          isGlobal:true,
          envFilePath:['../.env'],
      }),DatabaseModule
  ],
  controllers: [AppController,Login_signupController,PostController],
  providers: [AppService,login_signupService,PostService],
})
export class AppModule {}
