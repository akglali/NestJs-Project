import {Injectable} from "@nestjs/common";
import {DatabaseService} from "../database/database.service";
const bcrypt = require('bcryptjs')

@Injectable()
export class login_signupService {
    constructor(private query: DatabaseService) {
    }


    signUp(username:string,password:string) {
        const hashedPassword = bcrypt.hashSync(password, 10);

        let randomToken = require('random-token');
        let token=randomToken(60);

        return this.query.executeQuery("insert into users( username, password, token) values($1,$2,$3) returning token", [username,hashedPassword,token]);

    }

    login(username:string){

        return this.query.executeQuery("select password,token from users where username=$1",[username])

    }

    checkPassword(pass:string,hash:string):boolean{
        let check= bcrypt.compareSync(pass, hash); // false or true
        console.log(check)
        return check
    }
}