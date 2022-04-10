import {Module} from "@nestjs/common";
import {MongooseModule} from "@nestjs/mongoose";
import {User, UserSchema} from "./class/user";
import {UsersController} from "./users.controller";
import {UsersService} from "./service/users.service";
import * as bcrypt from "bcrypt";

@Module({
    imports: [MongooseModule.forFeatureAsync([{
        name: User.name,
        useFactory: async function () {
            const schema = UserSchema;
            schema.pre<User>('save', function (next) {
                const user = this;
                const salt = bcrypt.genSaltSync();
                user.password = bcrypt.hashSync(user.password + salt, 10);
                user.salt = salt;
                next();
            })

            return schema;

        }
    }])],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService]
})

export class UsersModule {
}