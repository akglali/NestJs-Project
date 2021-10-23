import {Injectable} from "@nestjs/common";
import {DatabaseService} from "../database/database.service";
import {RandomCreator} from "../helpers/randomCreator";


@Injectable()
export class PostService {
    constructor(private query: DatabaseService,private random:RandomCreator) {
    }

    postFunc(texField: string, token: string) {
        let randomNickname = this.random.randomNickname()
        let randomColor = this.random.randomColor()
        let date = new Date(1478708162000);
        return this.query.executeQuery("with pInfo as (insert into post_table (user_id, text_field, comment_count, posted_date, likes, dislikes) values ((select user_id from  users where  token=$1),$2,$3,$4,$3,$3)returning post_id,user_id) insert into post_user_nickname_table(post_id, user_id, nickname, color) values((SELECT pInfo.post_id from pInfo),(SELECT pInfo.user_id from pInfo),$5,$6)  returning post_id", [token, texField, 0, date, randomNickname, randomColor])
    }

    getAllPost() {
        return this.query.executeQuery("select post_id,text_field,comment_count,posted_date,likes,dislikes from post_table")
    }

    getSinglePost(postId: string) {
        return this.query.executeQuery("select post_id,text_field,comment_count,posted_date,likes,dislikes from post_table where post_id=$1", [postId]);
    }


}