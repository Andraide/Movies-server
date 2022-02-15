const Router = require('koa-router')
const moviesService = require('../_services/movies.service')
const router = new Router()
const joi = require('../schemas/joi.schemas')
const mongoose = require('mongoose');

router.get('/', getMovies)
router.get('/all', getAllMovies)
router.put('/update', updateMovie)
router.get('/clean', clean)
router.get('/check', checkDbStatus)

async function getMovies(ctx, next){
    
    try 
    {
        //Search movie by Title
        if("error" in joi.yearSchema.validate({year : parseInt(ctx.get('Year'))}))
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
        ctx.body = "There was an error" + " " + err
    }   
};


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
        else if("error" in joi.pageSchema.validate({page : parseInt(ctx.get('Page'))}))
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

async function updateMovie(ctx) 
{
    const params = ctx.request.body
    try 
    {
        
        if("error" in joi.updateMovieSchema.validate({movie : params.movie, find: params.find, replace: params.replace}))
        {
            ctx.body = "The post request has to be with the following form is needed: {movie: string, find: string, replace: string }"
        }
        //search movie by Title and Year
        else
        {
            const plot = await moviesService.updateMovie(params)
            ctx.body = plot
        }
        
    }
    catch (err) 
    {
        ctx.body = "There was an error" + " " + err
    }
}

async function clean()
{
    moviesService.removeAll()
}

async function checkDbStatus(ctx, next)
{
    ctx.body = mongoose.STATES[mongoose.connection.readyState] ;
}

module.exports = router

