import {Injectable} from "@nestjs/common";
import {DatabaseService} from "../database/database.service";
import {RandomCreator} from "../helpers/randomCreator";

@Injectable()
export class CommentService {
    constructor(private query: DatabaseService, private random: RandomCreator) {
    }

    async commentFunc(token: string, postId: string, textContent: string) {
        let checkNickname = await this.query.executeQuery("select exists(select 1 from post_user_nickname_table where user_id=(select user_id from users where token=$1) and post_id=$2)", [token,postId])
        let date = new Date(1635012087668);
        let commentId
        if (checkNickname[0].exists) {
                await this.query.executeQuery("insert into comment_table(post_id,user_id,text_content,likes,dislikes,comment_date_created) values($1,(select user_id from users where token=$2),$3,$4,$4,$5) returning comment_id",
                [postId, token, textContent, 0, date]).then(value =>{
                    commentId=value[0].comment_id
                })
            let gor =await this.query.executeQuery("select comment_id,comment_table.post_id,text_content, post_user_nickname_table.nickname, likes, dislikes, post_user_nickname_table.color,comment_date_created from comment_table left join post_user_nickname_table on comment_table.user_id= post_user_nickname_table.user_id where comment_table.comment_id=$1",    [commentId]);
            console.log(gor);
            return gor

        } else {
            let randomNickname = this.random.randomNickname();
            let randomColor = this.random.randomColor();
            await this.query.executeQuery("insert into comment_table(post_id,user_id,text_content,likes,dislikes,comment_date_created) values($1,(select user_id from users where token=$2),$3,$4,$4,$5) returning comment_id",
                [postId, token, textContent, 0, date]).then(value =>{
                    commentId=value[0].comment_id;
            })
            await this.query.executeQuery("insert into post_user_nickname_table(post_id, user_id, nickname, color) VALUES ($1,(select user_id from users where token=$2),$3,$4)",
                [postId,token,randomNickname,randomColor])
            let gor=await this.query.executeQuery("select comment_id,comment_table.post_id,text_content, post_user_nickname_table.nickname, likes, dislikes, post_user_nickname_table.color,comment_date_created from comment_table left join post_user_nickname_table on comment_table.user_id = post_user_nickname_table.user_id where comment_table.comment_id=$1", [commentId]);
            console.log(gor)
            return gor

        }

    }
}