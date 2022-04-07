import {Module} from "@nestjs/common";
import {AuthService} from "./service/auth.service";
import {UsersModule} from "../users/users.module";
import {PassportModule} from "@nestjs/passport";
import {JwtModule} from "@nestjs/jwt";
import {JWT} from "./constants";
import {LocalStrategy} from "./strategy/local.strategy";
import {JwtStrategy} from "./strategy/jwt.strategy";
import {AuthController} from "./auth.controller";


@Module({
    imports:
        [
            UsersModule,
            PassportModule,
            JwtModule.register({
                secret: JWT.secret,
                signOptions: {expiresIn: '1h'}
            })],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],

    exports: [AuthService]
})


export class AuthModule {
}