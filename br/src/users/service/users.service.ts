import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {User, UserDocument} from "../class/user";
import {Model} from "mongoose";
import {RegisterDto} from "../dto/register-dto";

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
    }


    async findOne(username: string): Promise<User> {
        return this.userModel.findOne({username: username});
    }

    async create(data: RegisterDto): Promise<any> {
        const newUser = new this.userModel({username: data.username, password: data.password, email: data.email})
        await newUser.save();
        return {...newUser, _id: newUser._id};
    }
}