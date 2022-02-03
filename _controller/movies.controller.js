const Router = require('koa-router')
const moviesService = require('../_services/movies.service')
const router = new Router()

router.get('/', XD )

async function XD(ctx, next){
    try 
    {
        const vikings = await moviesService.getVikings()
        ctx.body = vikings
    }
    catch (err) 
    {
        ctx.status = err
        ctx.body = "There was an error" + " " + err
    }   
};

module.exports = router