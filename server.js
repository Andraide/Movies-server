const Koa = require('koa')
const app = new Koa()
const bodyParser = require('koa-bodyparser');
const logger = require('koa-logger')
const router = require('./_controller/movies.controller')
const swagger = require("swagger2");
const { ui, validate } = require("swagger2-koa");
const swaggerDocument = swagger.loadDocumentSync("api.yaml");

const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/test')
    .catch(error => console.log("Error connecting to Db", error))

app.use(logger())
app.use(bodyParser())

app.on('error', (err, ctx) => {
    console.error("server error",err)
});

const port = 8080;
    app
    .use(ui(swaggerDocument, "/swagger"))
    .use(router.routes())
    .use(router.allowedMethods())
    .listen(port, function () {
    console.log('Server listening on port ' + port);
});

module.exports = app

/*
.use(ui(swaggerDocument, "/swagger"))
    .use(router.routes())
    .use(router.allowedMethods())
*/