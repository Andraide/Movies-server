const mongoose = require('mongoose');

const { Schema } = mongoose;


const moviesSchema = new Schema({
    
        Title: { type: String, unique: true },
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

module.exports = moviesSchema
