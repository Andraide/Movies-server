const { assert } = require("console");
const { func } = require("joi");

async function save(model, payload)
{
    const movie = new model(payload);
    try 
    {
        await movie.save()
    }
    catch(err)
    {
        console.log("Not saved", err)
    }
}

async function find(model, query)
{
    let responseDB = await model.find(query)
    return responseDB
}



async function removeAll(model)
{
    model.remove().then(function (model)
    {
        console.log("Model removed")
    }).catch(function (err)
    {
        assert.ok(err)
    })
}

module.exports = {
    save,
    find,
    removeAll
}
