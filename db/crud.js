const { assert } = require("console");

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
        throw err
    }
}

async function find(model, query)
{
    let responseDB = await model.find(query)
    return responseDB
}

async function update(model, query, replace)
{
    try 
    {
        console.log("Title", query)
        console.log("Replace", replace)
        let filter = { Title: query }
        let updateObj = { Plot: replace }
        await model.findOneAndUpdate(filter, updateObj, { new: true }, (err, doc) => {
            if(err) console.log("Not updated")
            console.log("Updated")
        })
    }
    catch(err)
    {
        console.log("Error trying to updata DB", err)
        throw err
    }
    
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
    update,
    removeAll
}
