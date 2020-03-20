
const Router = require('koa-router');

const userAPI = new Router({prefix: '/task'})
    .get('/', (ctx) => {
        ctx.status = 200
        ctx.body   = "this is task body"
    })

module.exports = userAPI;