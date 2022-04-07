import {Module} from '@nestjs/common';
import {BooksModule} from "./books/books.module";
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {MongooseModule} from "@nestjs/mongoose";
import {UsersModule} from "./users/users.module";
import {AuthService} from "./auth/service/auth.service";
import {AuthModule} from "./auth/auth.module";

@Module({
    imports: [BooksModule, AuthModule, UsersModule, MongooseModule.forRoot("mongodb://root:root@database:27017/book-rental?authSource=admin")],
    controllers: [AppController],
    providers: [AppService],

})
export class AppModule {
}
