const https = require("https");
const fetch = require("node-fetch");
const mongoose = require('mongoose');
const urlVikings = "http://www.omdbapi.com/?apikey=a756dc65&"
const urlOmbdAPI = "http://www.omdbapi.com/?apikey=a756dc65&t="
const urlFullCastById = "https://imdb-api.com/en/API/FullCast/k_job2e7ku/"
const urlAxes = "https://imdb-api.com/en/API/SearchMovie/k_job2e7ku/axe";
const urlByTitle = "https://imdb-api.com/en/API/Title/k_job2e7ku/";
const handleResponse = require('../helpers/handle-response')
const { Schema } = mongoose;

const moviesSchema = new Schema({
    
        Title: String,
        Year: String,
        Rated: String,
        Released: String,
        Genre: String,
        Director: String,
        Actors: String,
        Plot: String,
        Ratings: [
            {
                Source: String,
                Value: String
            }
        ]
});
const Movie = mongoose.model('Movies', moviesSchema);

async function getData(url, title) {
        try {
            let response = await fetch(url + title);
            await handleResponse(response)
            
            const json = await response.json();

            const { Title, Year, Released, Genre, Director, Actors, Plot, Ratings } = response
            
            const movie = new Movie({ Title, Year, Released, Genre, Director, Actors, Plot, Ratings });
            movie.save(function (err) {
                if (err) return handleError(err);
                console.log("Movie Saved")
            });
            return json
        } catch (err) {
            throw err
        }
}

async function getPromises(url ,ids)
{
    return ids.map(( x, i, v ) => {
        return new Promise(( resolve, reject ) => {
            https.get(url + x, (res) => {
                let rawData = '';
                res.on( 'data', (chunk) => { rawData += chunk });
                res.on( 'end', () => {
                    try {
                        const parsedData = JSON.parse(rawData);
                        resolve(parsedData);
                    } catch (e) {
                        console.error(e.message);
                        reject(e.message);
                    }
                })
            }).on('error', (e) => {
                console.error("Got error", e.message);
            })
        })
    })
}


async function getVikings(title) {
    try 
    {
        const vikings = await getData(urlOmbdAPI, title)
        return vikings
    }
    catch (err)
    {
        throw err
    }    
}

module.exports = {
    getVikings
}