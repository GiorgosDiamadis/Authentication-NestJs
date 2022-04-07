import {Module} from "@nestjs/common";
import {BooksController} from "./books.controller"
import {BooksService} from "./service/books.service";
import {MongooseModule} from "@nestjs/mongoose";
import {Book, BookSchema} from "./class/book";

@Module({
    imports: [MongooseModule.forFeature([{name: Book.name, schema: BookSchema}])],
    controllers: [BooksController],
    providers: [BooksService],
})

export class BooksModule {
}