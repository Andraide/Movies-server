const Router = require('koa-router')
const moviesService = require('../_services/movies.service')
const router = new Router()
const Joi = require('joi');
const mongoose = require('mongoose');

router.get('/', XD )
router.get('/check', checkDb)

const schema = Joi.object({
    year: Joi.number()
        .min(1800)
        .max(2050)
        .required(),

})

async function checkDb(ctx, next)
{
    ctx.body = mongoose.STATES[mongoose.connection.readyState] ;
}

async function XD(ctx, next){
    try 
    {
        console.log("Header", ctx.get('Year'), schema.validate(ctx.get('Year')) )
        const params = ctx.request.query
        const title = params.title
        const vikings = await moviesService.getVikings(title)
        ctx.body = vikings
    }
    catch (err) 
    {
        //ctx.status = err
        ctx.body = "There was an error" + " " + err
    }   
};

module.exports = router

