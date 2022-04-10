const Joi = require('joi')

export const registerSchemaValidator = Joi.object(
    {
        username: Joi.string().min(5).max(16).alphanum().required(),
        email: Joi.string().email().required(),
        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),

        confirmPassword: Joi.ref('password'),
    }
)