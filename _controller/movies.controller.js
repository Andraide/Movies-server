const Router = require('koa-router')
const moviesService = require('../_services/movies.service')
const router = new Router()
const Joi = require('joi');
const mongoose = require('mongoose');

router.get('/', XD )
router.get('/check', checkDb)
router.get('/clean', clean)
router.get('/all', getAllMovies)
router.post('/update', updateMovie)


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

async function getAllMovies(ctx)
{
    try 
    {
        let movies = await moviesService.getMoviesDB({})
        if(movies.length < 5)
        {
            ctx.body = movies
        }
        //Case that page header is needed but is not valid
        else if("error" in pageSchema.validate({page : parseInt(ctx.get('Page'))}))
        {
            ctx.body = "Page header is missing, pages are from 0 to 10000"    
        }
        //Case that page header is valid
        else 
        {
            
            ctx.body = ctx.get('Page') > 0 ? movies.slice(ctx.get('Page') * 5 + 1,ctx.get('Page') * 5 + 6) : movies.slice(ctx.get('Page') * 5,ctx.get('Page') * 5 + 6)
        }
    }
    catch(err)
    {
        ctx.body = "There was an error" + " " + err
    }
}

async function checkDb(ctx, next)
{
    ctx.body = mongoose.STATES[mongoose.connection.readyState] ;
}

async function updateMovie(ctx) 
{
    const params = ctx.request.body
    try 
    {
        //Search movie by Title
        //console.log(updateMovieSchema.validate({movie : params.movie, find: params.find, replace: params.replace}))
       
            if("error" in updateMovieSchema.validate({movie : params.movie, find: params.find, replace: params.replace}))
            {
                //const params = ctx.request.body
                //const title = params.title
                //const movie = await moviesService.getMovieByTitle(title)
                ctx.body = "The post request has to be with the following form is needed: {movie: string, find: string, replace: string }"
            }
            //search movie by Title and Year
            else
            {
                //const params = ctx.request.query
                //const title = params.title
                //const year = ctx.get('Year')
                //const movie = await moviesService.getMoviesByTitleNYear(title, year)
                ctx.body = params
            }
        
    }
    catch (err) 
    {
        //ctx.status = err
        ctx.body = "There was an error" + " " + err
    }
}

async function XD(ctx, next){
    
    try 
    {
        //Search movie by Title
        if("error" in yearSchema.validate({year : parseInt(ctx.get('Year'))}))
        {
            const params = ctx.request.query
            const title = params.title
            const movie = await moviesService.getMovieByTitle(title)
            ctx.body = movie
        }
        //search movie by Title and Year
        else
        {
            const params = ctx.request.query
            const title = params.title
            const year = ctx.get('Year')
            const movie = await moviesService.getMoviesByTitleNYear(title, year)
            ctx.body = movie
        }
    }
    catch (err) 
    {
        ctx.status = err
        ctx.body = "There was an error" + " " + err
    }   
};

async function clean()
{
    moviesService.removeAll()
}

module.exports = router

