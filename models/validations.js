const Joi = require('@hapi/joi');
//validation using hapi/joi
const registerSchema = Joi.object({
    username: Joi.string().
        min(6).
        required(),
    email: Joi.string().
        required().
        email(),
    password: Joi.string().
        min(8).
        required()
})

const loginSchema = Joi.object({
    email: Joi.string().
        required().
        email(),
    password: Joi.string().
        min(8).
        required()
})

module.exports = {
    registerSchema,
    loginSchema
}