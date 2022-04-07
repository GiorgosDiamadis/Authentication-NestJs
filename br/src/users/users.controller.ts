import {Controller} from "@nestjs/common";
import {UsersService} from "./service/users.service";

@Controller("user")
export class UsersController{

    constructor(private userService:UsersService) {
    }
}