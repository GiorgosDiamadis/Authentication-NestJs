import {Module} from "@nestjs/common";
import {MongooseModule} from "@nestjs/mongoose";
import {User, UserSchema} from "./class/user";
import {UsersController} from "./users.controller";
import {UsersService} from "./service/users.service";

@Module({
    imports: [MongooseModule.forFeature([{name: User.name, schema: UserSchema}])],
    controllers: [UsersController],
    providers: [UsersService],
    exports:[UsersService]
})

export class UsersModule {
}