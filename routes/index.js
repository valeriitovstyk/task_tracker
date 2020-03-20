const userAPI = require('./user');
const taskAPI = require('./task');

const Router = require('koa-router');
const router = new Router()
    .use(userAPI.routes())
    .use(taskAPI.routes());

module.exports = router;