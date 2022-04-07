import {Controller, Get, UseGuards} from '@nestjs/common';
import {AppService} from './app.service';
import {AuthService} from "./auth/service/auth.service";
import {JwtAuthGuard} from "./auth/guards/jwt-auth.guard";


@Controller()
export class AppController {
    constructor(private readonly appService: AppService, private readonly authService: AuthService) {
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    index(): string {
        return this.appService.index();
    }

}
