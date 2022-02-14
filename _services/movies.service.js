const https = require("https");
const fetch = require("node-fetch");
const mongoose = require('mongoose');
const urlVikings = "http://www.omdbapi.com/?apikey=a756dc65&"
const urlOmbdAPI = "http://www.omdbapi.com/?apikey=a756dc65&t="
const urlFullCastById = "https://imdb-api.com/en/API/FullCast/k_job2e7ku/"
const urlAxes = "https://imdb-api.com/en/API/SearchMovie/k_job2e7ku/axe";
const urlByTitle = "https://imdb-api.com/en/API/Title/k_job2e7ku/";
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
    let read = await crud.find(Movie, query)
    return read
}

async function removeAll()
{
    crud.removeAll(Movie)
}

module.exports = {
    getMovieByTitle,
    getMoviesByTitleNYear,
    getMoviesDB,
    removeAll
}