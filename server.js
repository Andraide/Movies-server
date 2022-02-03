const Koa = require('koa')
const router = require('./_controller/movies.controller')
const errorHandler = require('./helpers/error-handler')

const app = new Koa()

app.use(router.routes())
app.use(errorHandler);
app.use(router.allowedMethods())



app.on('error', (err, ctx) => {
    console.error('server error', err)
});

const port = process.env.NODE_ENV === true ? 3000 : 3000;
app.listen(port, function () {
    console.log('Server listening on port ' + port);
});

module.exports = app