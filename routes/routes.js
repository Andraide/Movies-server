const Router = require('koa-router')

const router = new Router()

router.get('/', XD )

async function XD(ctx, next){
    moviesService.getVikings()
        .then(vikings => ctx.body(vikings))
        .catch(err => next(err));
};

// accept POST request on the homepage
router.post('/', async ctx => {
  ctx.body = 'Got a POST request'
})

// accept PUT request at /user
router.put('/user', async ctx => {
  ctx.body = 'Got a PUT request at /user'
})

// accept DELETE request at /user
router.delete('/user', async ctx => {
  ctx.body = 'Got a DELETE request at /user'
})

// Render a template
/*router.get("/make", async ctx => {
  await ctx.render("streams/make", { ... });
})
*/
module.exports = router