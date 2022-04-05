import {Body, Controller, Delete, Get, HttpStatus, Param, Post, Req, Res} from '@nestjs/common';
import {CreateBookDto} from "./dto/create-book.dto";
import {response} from "express";
import {BooksService} from "./service/books.service";
import {Book} from "./class/Book";

@Controller('books')
export class BooksController {

    constructor(private bookService: BooksService) {
    }

    @Get()
    async index(@Req() request, @Res() response): Promise<Book[]> {
        const {currentDate} = request.query;
        const books = await this.bookService.fetch(currentDate);

        return response.status(HttpStatus.OK).json(books)
    }

    @Get(":isbn")
    async getBook(@Param('isbn') isbn: string, @Res() response) {
        const book = await this.bookService.findOne(isbn);
        return response.status(HttpStatus.OK).json(book);
    }

    @Delete(":isbn")
    async deleteBook(@Param('isbn') isbn: string, @Res() response) {
        const res = await this.bookService.deleteOne(isbn);
        if (res) {
            return response.status(HttpStatus.FOUND).json(isbn);
        } else {
            return response.status(HttpStatus.NOT_FOUND).json(isbn);

        }
    }

    @Post("create")
    async create(@Body() createBookDto: CreateBookDto, @Res() response) {
        const res = await this.bookService.create(createBookDto);
        return response.status(HttpStatus.CREATED).json(res);
    }


}
