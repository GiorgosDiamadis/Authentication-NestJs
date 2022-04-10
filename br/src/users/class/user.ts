import {Document} from "mongoose";
import {Prop, raw, Schema, SchemaFactory} from "@nestjs/mongoose";

export type UserDocument = User & Document;

@Schema()
export class User {

    @Prop(
        raw({
            type: String,
        })
    )
    username: string;

    @Prop(raw({
        type: String,
        unique: true,
    }))
    email: string;

    @Prop()
    password: string;

    @Prop()
    salt: string;


}

export const UserSchema = SchemaFactory.createForClass(User);