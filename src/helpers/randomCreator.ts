import {Injectable} from "@nestjs/common";

let animals = ["Duck", "Dog", "Elephant", "Aardvark", "Affenpinscher", "African Bush Elephant", "African Forest Elephant",
    "African Tree Toad", "Airedale Terrier", "Akita", "Alaskan Husky", "Albacore Tuna"]

let adjective = ["Elegant", "Exquisite", "Glorious", "Aardvark", "Junoesque", "Magnificent", "Resplendent",
    "Splendid", "Statuesque", "Blue-eyed", "Busy", "Brave"]

let colors = ["bg-blue-100", "bg-red-100", "bg-purple-100", "bg-gray-100", "bg-green-100", "bg-yellow-100", "bg-indigo-100",
    "bg-pink-100", "bg-blue-300", "bg-red-300", "bg-purple-300", "bg-gray-300", "bg-green-300", "bg-yellow-300", "bg-indigo-300", "bg-pink-300"]

@Injectable()
export class RandomCreator{
    // Random Colors and nickname will be got from database later...
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