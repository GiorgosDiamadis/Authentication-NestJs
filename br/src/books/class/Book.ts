import {CreateBookDto} from "../dto/create-book.dto";
import {randomUUID} from "crypto";
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Document} from 'mongoose';

export type BookDocument = Book & Document;

@Schema()
export class Book {


    @Prop({isRequired: true})
    private readonly title: string;

    @Prop({isRequired: true})
    private readonly author: string;

    @Prop({isRequired: true})
    private readonly excerpt: string;

    @Prop({isRequired: true})
    private publishedDate: string;

    @Prop({isRequired: true,})
    private readonly ISBN: string;

    @Prop({isRequired: true})
    private readonly price: number;

    @Prop({isRequired: true})
    private readonly image: string;


}

export const BookSchema = SchemaFactory.createForClass(Book);
