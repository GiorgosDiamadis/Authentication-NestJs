import {Body, Controller, Delete, Get, HttpStatus, Param, Post, Req, Res} from '@nestjs/common';
import {CreateBookDto} from "./dto/create-book.dto";
import {BooksService} from "./service/books.service";
import {Book} from "./class/Book";
import {EditBookDto} from "./dto/edit-book.dto";

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
        var status;
        if (book === null)
            status = HttpStatus.NOT_FOUND;
        else
            status = HttpStatus.FOUND;
        return response.status(status).json(book);
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
        if (res === -1) {
            return response.status(HttpStatus.BAD_REQUEST).json(res)
        }
        return response.status(HttpStatus.CREATED).json(res);
    }


    @Post("edit/:isbn")
    async editBook(@Body() editBookDto: EditBookDto, @Res() response,@Req() req) {
        const res = await this.bookService.update(editBookDto);
        return response.status(200).json(res);
    }

}
