import {Body, Controller,  HttpException, HttpStatus, Post} from "@nestjs/common";
import {login_signupService} from "./login_signup.service";
import {Signup_loginInterface} from "./signup_login.interface";

@Controller('')
export class Login_signupController {
    constructor(private loginService: login_signupService) {
    }


    @Post("/signup")
    async signup(@Body() signup: Signup_loginInterface) {
        let token: string;

        try {
            await this.loginService.signUp(signup.username, signup.password).then(value => {
                token=value[0].token;
            })
        } catch (err) {
            throw new HttpException('User is Already Exists!!', HttpStatus.NOT_FOUND);
        }
        return token;

    }

    @Post('/login')
    async login(@Body() login: Signup_loginInterface) {
        let check: boolean;
        let token;
        try {
            await this.loginService.login(login.username).then(value => {
                token = value[0].token
                check = this.loginService.checkPassword(login.password, value[0].password)
            })
        } catch (error) {
            throw new HttpException('There is no such a user.', HttpStatus.NOT_FOUND);
        }
        if (check) {
            return token
        } else {
            return "Check your password or username!!"
        }
    }

}