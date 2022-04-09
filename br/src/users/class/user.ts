import {Document} from "mongoose";
import * as mongoose from "mongoose";
import {Prop, raw, Schema, SchemaFactory} from "@nestjs/mongoose";

export type UserDocument = User & Document;

@Schema()
export class User {

    @Prop(
        raw({
            type: String,
            required: true,
        })
    )
    username: string;

    @Prop(raw({
        type: String,
        required: true,
        unique: true,
    }))
    email: string;

    @Prop({isRequired: true})
    password: string;


}

export const UserSchema = SchemaFactory.createForClass(User);

//
// export const UserSchema = new mongoose.Schema({
//     name: {type:String,unique:[true,"Username already ecists"]},
//     age: Number,
//     breed: String,
// });

// export const UserSchema = new mongoose.Schema({
//     username: {
//         type: String,
//         unique: [true, "Username already exists!"],
//         validate:{
//             validator: (v)=>{
//                 return this.model('User').findOne({username:v}).then(user=>!user)
//             }
//         }
//     },
//     email: {type: String, unique: [true, "Email already exists!"]},
//     password: String,
// });
