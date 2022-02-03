const https = require("https");
const fetch = require("node-fetch");
const urlVikings = "https://imdb-api.com/en/A/SearchMovie/k_job2e7ku/viking";
const urlFullCastById = "https://imdb-api.com/en/API/FullCast/k_job2e7ku/"
const urlAxes = "https://imdb-api.com/en/API/SearchMovie/k_job2e7ku/axe";
const urlByTitle = "https://imdb-api.com/en/API/Title/k_job2e7ku/";
const handleResponse = require('../helpers/handle-response')

async function getData(url) {
        try {
            let response = await fetch(url);
            await handleResponse(response)
            
            const json = await response.json();
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
                console.error("Got errpr", e.message);
            })
        })
    })
}


async function getVikings() {
    try 
    {
        const vikings = await getData(urlVikings)
        return vikings
    }
    catch (err)
    {
        //console.log("F=====>", err)
        throw err
    }    
}

module.exports = {
    getVikings
}