
const Router = require('koa-router');

const userAPI = new Router({prefix: '/user'})
    .get('/', (ctx) => {
        ctx.status = 200
        ctx.body   = "this is user body"
    })

module.exports = userAPI;