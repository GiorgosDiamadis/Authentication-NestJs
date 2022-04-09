import {required} from "joi";

const Joi = require('joi')

export const loginSchemaValidator = Joi.object(
    {
        username: Joi.string().min(5).max(16).alphanum().required(),
        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    }
)