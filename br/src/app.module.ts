import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {BooksController} from './books/books.controller';
import {BooksService} from './books/service/books.service';
import {MongooseModule} from "@nestjs/mongoose";
import {Book, BookSchema} from "./books/class/Book";

@Module({
    imports: [MongooseModule.forRoot("mongodb://root:root@db:27017/book-rental?authSource=admin"),
        MongooseModule.forFeature([{name: Book.name, schema: BookSchema}])],
    controllers: [AppController, BooksController],
    providers: [AppService, BooksService],
})
export class AppModule {
}
