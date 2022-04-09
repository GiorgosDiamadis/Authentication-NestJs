import {Injectable} from "@nestjs/common";
import {UsersService} from "../../users/service/users.service";
import {JwtService} from "@nestjs/jwt";
import {LoginDto} from "../../users/dto/login-dto";
import {RegisterDto} from "../../users/dto/register-dto";

@Injectable()
export class AuthService {

    constructor(
        private userService: UsersService,
        private jwtService: JwtService
    ) {
    }


    async validateUser(loginData: LoginDto) {
        const user = await this.userService.findOne(loginData.username);
        if (user && user.password === loginData.password) {
            return this.login(user);
        }

        return null;
    }


    async login(user: any) {
        const payload = {username: user.username, sub: user._id}
        return {
            access_token: this.jwtService.sign(payload)
        };
    }

    async register(data: RegisterDto): Promise<any> {
        const user = await this.userService.create(data);
        if (user === null)
            return null;
        return this.login(user);
    }
}