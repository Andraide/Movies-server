async function save(model, payload)
{
    const movie = new model(payload);
    movie.save(function (err) {
        if (err) return handleError(err);
        console.log("Movie Saved")
    });
}

module.exports = {
    save
}
