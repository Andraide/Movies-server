const mongoose = require('mongoose');

const { Schema } = mongoose;
/*
Title
Year
Released
Genre
Director
Actors
Plot
Ratings
*/
/*const moviesSchema = new Schema({
    
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
exports.module = Movie
*/

const schema = new mongoose.Schema({ name: 'string', size: 'string' });
const Tank = mongoose.model('Tank', schema);
exports.module = Tank