import {Injectable} from '@nestjs/common';
import {CreateBookDto} from "../dto/create-book.dto";
import {Book, BookDocument} from "../class/Book";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose"
import {EditBookDto} from "../dto/edit-book.dto";

@Injectable()
export class BooksService {

    constructor(@InjectModel(Book.name) private bookModel: Model<BookDocument>) {
    }

    async fetch(currentDate: string): Promise<Book[]> {
        var query = null;
        if (currentDate === undefined) {
            query = this.bookModel.find().sort({publishedDate: -1}).limit(10);
        } else {
            query = this.bookModel.find({publishedDate: {$lte: currentDate}}).sort({publishedDate: -1}).limit(10)
        }
        return query;
    }


    async create(book: CreateBookDto) {
        const createdBook = new this.bookModel(book);
        createdBook.set({publishedDate: Date.now().toString()})
        try {
            return await createdBook.save();
        } catch (e) {
            return -1;
        }
    }

    async findOne(isbn: string): Promise<Book> {
        return await this.bookModel.findOne({ISBN: isbn}).exec();
    }

    async deleteOne(isbn: string): Promise<boolean> {
        var res = await this.bookModel.findOneAndDelete({ISBN: {$eq: isbn}}).exec();

        return res !== null;
    }

    async update(book: EditBookDto): Promise<Book> {

        return this.bookModel.findOneAndUpdate({ISBN: book.ISBN}, {$set: book});
    }
}
