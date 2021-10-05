import {Injectable} from "@nestjs/common";
import {DatabaseService} from "../database/database.service";


let animals = ["Duck", "Dog", "Elephant", "Aardvark", "Affenpinscher", "African Bush Elephant", "African Forest Elephant",
    "African Tree Toad", "Airedale Terrier", "Akita", "Alaskan Husky", "Albacore Tuna"]

let adjective = ["Elegant", "Exquisite", "Glorious", "Aardvark", "Junoesque", "Magnificent", "Resplendent",
    "Splendid", "Statuesque", "Blue-eyed", "Busy", "Brave"]

let colors = ["bg-blue-100", "bg-red-100", "bg-purple-100", "bg-gray-100", "bg-green-100", "bg-yellow-100", "bg-indigo-100",
    "bg-pink-100", "bg-blue-300", "bg-red-300", "bg-purple-300", "bg-gray-300", "bg-green-300", "bg-yellow-300", "bg-indigo-300", "bg-pink-300"]

@Injectable()
export class PostService {
    constructor(private query: DatabaseService) {
    }

    postFunc(texField: string, token: string) {
        let randomNickname = this.randomNickname()
        let randomColor = this.randomColor()
        let date = new Date(1478708162000);
        console.log(texField)
        return this.query.executeQuery("with pInfo as (insert into post_table (user_id, text_field, comment_count, posted_date, likes, dislikes) values ((select user_id from  users where  token=$1),$2,$3,$4,$3,$3)returning post_id,user_id) insert into post_user_nickname_table(post_id, user_id, nickname, color) values((SELECT pInfo.post_id from pInfo),(SELECT pInfo.user_id from pInfo),$5,$6)  returning post_id", [token, texField, 0, date, randomNickname, randomColor])
    }

    getAllPost(){
        return  this.query.executeQuery("select post_id,text_field,comment_count,posted_date,likes,dislikes from post_table")
    }

    getSinglePost(postId:string){
        return this.query.executeQuery("select post_id,text_field,comment_count,posted_date,likes,dislikes from post_table where post_id=$1",[postId]);
    }

    randomNickname(): string {
        const randomAnimalName = Math.floor(Math.random() * animals.length);
        const randomAdjective = Math.floor(Math.random() * adjective.length);

        return animals[randomAnimalName] + adjective[randomAdjective]
    }

    randomColor(): string {
        const randomColor = Math.floor(Math.random() * colors.length);
        return colors[randomColor]
    }

}