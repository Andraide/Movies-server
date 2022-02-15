const Joi = require('joi');

const yearSchema = Joi.object({
    year: Joi.number()
        .min(1800)
        .max(2050)
        .required(),
})
const pageSchema = Joi.object({
    page: Joi.number()
        .min(0)
        .max(10000)
        .required()
})
const updateMovieSchema = Joi.object({
    movie:  Joi.string()
        .required(),
    find:   Joi.string()
        .required(),
    replace: Joi.string()
        .required(),
})

module.exports = {
    yearSchema,
    pageSchema,
    updateMovieSchema
}