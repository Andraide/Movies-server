const Koa = require('koa')
const app = new Koa()

const router = require('./_controller/movies.controller')
const errorHandler = require('./helpers/error-handler')

const mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost:27017/test');
mongoose.connect('mongodb://127.0.0.1:27017/test').
  catch(error => console.log("Error connecting to Db", error))
console.log(mongoose.connection.readyState);



app.use(router.routes())
app.use(errorHandler);
app.use(router.allowedMethods())



/*app.on('error', (err, ctx) => {
    console.error('server error', err)
});*/

const port = process.env.NODE_ENV === true ? 8080 : 8080;
app.listen(port, function () {
    console.log('Server listening on port ' + port);
});

module.exports = app