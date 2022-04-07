import {
    Body,
    Controller,
    Get,
    HttpException,
    HttpStatus,
    Post,
    Request,
    UseFilters,
    UseGuards,
    UsePipes
} from "@nestjs/common";
import {AuthService} from "./service/auth.service";
import {LoginDto} from "../users/dto/login-dto";
import {RegisterDto} from "../users/dto/register-dto";
import {JoiValidator} from "../pipes/joi.validator";
import {registerSchemaValidator} from "../users/dto/register-schema.validator";
import {loginSchemaValidator} from "../users/dto/login-schema.validator";
import {HttpExceptionFilter} from "../exceptions/http-exception.filter";

@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }


    @Post('login')
    @UseFilters(new HttpExceptionFilter())
    @UsePipes(new JoiValidator(loginSchemaValidator))
    async login(@Body() loginDto: LoginDto) {
        const user = await this.authService.validateUser(loginDto);
        if (user !== null)
            return this.authService.validateUser(loginDto);

        throw new HttpException({status: HttpStatus.UNAUTHORIZED, error: "Username or password is incorrect!"}, 401)
    }

    // TODO: Handle all possible register failures
    // TODO: Handle global exceptions

    @Post("register")
    @UseFilters(new HttpExceptionFilter())
    @UsePipes(new JoiValidator(registerSchemaValidator))
    async register(@Body() registerDto: RegisterDto) {
        return this.authService.register(registerDto)
    }

}