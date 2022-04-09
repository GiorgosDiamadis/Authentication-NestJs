import {Body, Controller, HttpException, HttpStatus, Post, UsePipes} from "@nestjs/common";
import {AuthService} from "./service/auth.service";
import {LoginDto} from "../users/dto/login-dto";
import {RegisterDto} from "../users/dto/register-dto";
import {JoiValidator} from "../pipes/joi.validator";
import {registerSchemaValidator} from "../users/dto/register-schema.validator";
import {loginSchemaValidator} from "../users/dto/login-schema.validator";

@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }


    @Post('login')
    @UsePipes(new JoiValidator(loginSchemaValidator))
    async login(@Body() loginDto: LoginDto) {
        const user = await this.authService.validateUser(loginDto);
        if (user !== null)
            return this.authService.validateUser(loginDto);

        throw new HttpException({status: HttpStatus.UNAUTHORIZED, error: "Username or password is incorrect!"}, 401)
    }

    @Post("register")
    @UsePipes(new JoiValidator(registerSchemaValidator))
    async register(@Body() registerDto: RegisterDto) {
        const created = await this.authService.register(registerDto)
        if (created === null)
            throw new HttpException({status: HttpStatus.BAD_REQUEST, message: "Username already exists!"}, 401);
        return created
    }

}