import {ArgumentMetadata, BadRequestException, Injectable, PipeTransform} from "@nestjs/common";
import {ObjectSchema} from "joi"


@Injectable()
export class JoiValidator implements PipeTransform {
    constructor(private schema: ObjectSchema) {
    }

    transform(value: any, metadata: ArgumentMetadata): any {
        const {error} = this.schema.validate(value, {abortEarly: false});
        if (error !== undefined) {
            throw new BadRequestException(error)
        }

        return value;
    }

}