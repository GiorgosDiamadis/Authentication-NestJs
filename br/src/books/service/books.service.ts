import {Inject, Injectable} from '@nestjs/common';
import {CreateBookDto} from "../dto/create-book.dto";
import {Book, BookDocument} from "../class/Book";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose"
import {faker} from "@faker-js/faker";

@Injectable()
export class BooksService {

    constructor(@InjectModel(Book.name) private bookModel: Model<BookDocument>) {
    }

    async fetch(currentDate: string): Promise<Book[]> {
        // await this.bookModel.deleteMany();
        // for (let i = 0; i < 10000; i++) {
        //     const b = new this.bookModel(
        //         {
        //             title: faker.lorem.words(3),
        //             author: faker.name.findName(),
        //             excerpt: faker.lorem.paragraphs(1),
        //             publishedDate: Date.now(),
        //             ISBN: faker.random.alphaNumeric(15),
        //             price: faker.commerce.price(0, 100),
        //             image: faker.image.abstract()
        //         }
        //     )
        //
        //     await b.save();
        // }
        var query = null;
        if (currentDate === null) {
            query = this.bookModel.find().sort({publishedDate: -1}).limit(10);
        } else {
            query = this.bookModel.find({publishedDate: {$lte: currentDate}}).sort({publishedDate: -1}).limit(10)
        }
        return await query.exec();
    }


    async create(book: CreateBookDto) {
        const createdBook = new this.bookModel(book);
        createdBook.set({publishedDate: Date.now().toString()})
        return await createdBook.save();
    }

    async findOne(isbn: string): Promise<Book> {
        return await this.bookModel.findOne({ISBN: isbn}).exec();
    }

    async deleteOne(isbn: string): Promise<boolean> {
        var res = await this.bookModel.findOneAndDelete({ISBN: {$eq: isbn}}).exec();
        return res._id;
    }

}
