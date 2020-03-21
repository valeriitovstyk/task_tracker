
const Router = require('koa-router');
const taskController = require('../controllers/taskController');

const userAPI = new Router({prefix: '/tasks'})
    .get('/', (ctx) => {
        ctx.status = 200
        ctx.body   = "this is tasks list"
    })
    .get('/test', taskController.getTaskList)

module.exports = userAPI;