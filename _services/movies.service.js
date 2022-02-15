const fetch = require("node-fetch");
const mongoose = require('mongoose');
const urlOmbdAPI = "http://www.omdbapi.com/?apikey=a756dc65&t="
const handleResponse = require('../helpers/handle-response')
const crud = require('../db/crud')
const moviesSchema = require('../schemas/movies.schema')
const Movie = mongoose.model('Movies', moviesSchema);

async function getData(url, query) {
        try {
            let response = await fetch(url + query);
            await handleResponse(response)
            
            const json = await response.json();

            const { Title, Year, Released, Genre, Director, Actors, Plot, Ratings } = json
            
            crud.save(Movie, { Title, Year, Released, Genre, Director, Actors, Plot, Ratings })

            return { Title, Year, Released, Genre, Director, Actors, Plot, Ratings }
        } catch (err) {
            throw err
        }
}

async function getMovieByTitle(title) {
    try 
    {
        const movies = await getData(urlOmbdAPI, title) 
        return movies
    }
    catch (err)
    {
        throw err
    }    
}

async function getMoviesByTitleNYear(title, year) {
    try 
    {
        const movies= await getData(urlOmbdAPI + title, '&year=' + year)
        return movies
    }
    catch (err)
    {
        throw err
    }    
}

async function getMoviesDB(query)
{
    let movies = await crud.find(Movie, query)
    let movieFiltered = movies.map((movie) => {
        const { Title, Year, Released, Genre, Director, Actors, Plot, Ratings } = movie
        return { Title, Year, Released, Genre, Director, Actors, Plot, Ratings }
    })
    return movieFiltered
}

async function removeAll()
{
    crud.removeAll(Movie)
}

async function updateMovie(query)
{
    try 
    {
        let movieRecord = await crud.find(Movie, { Title: query.movie })
        if(movieRecord[0])
        {
            if("Plot" in movieRecord[0])
            {
                let wordArray = movieRecord[0].Plot.split(" ")
                for(let i=0; i< wordArray.length; i++)
                {
                    if(wordArray[i] == query.find)
                    {
                        movieRecord[0].Plot = movieRecord[0].Plot.replace(query.find, query.replace)    
                    }
                }
        
                await crud.update(Movie, query.movie, movieRecord[0].Plot)

                return movieRecord[0].Plot
            }
        }
        else
        {
            return "Nothing to update"
        }
    }
    catch(err) 
    {
        throw err
    }
}

module.exports = {
    getMovieByTitle,
    getMoviesByTitleNYear,
    getMoviesDB,
    updateMovie,
    removeAll
}