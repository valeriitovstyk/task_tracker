const Router = require('koa-router');
const koaBody = require('koa-body');
const taskController = require('../controllers/taskController');

const userAPI = new Router({prefix: '/tasks'})
    .get('/', taskController.getTaskList)
    .get('/:id', taskController.getTask)
    .get('/user/:id', taskController.userTaskList)
    .post('/', koaBody(), taskController.addTask)
    .put('/:id', koaBody(), taskController.editTask)
    .patch('/:id', koaBody(), taskController.changeTaskStatus)
    .delete('/:id', taskController.removeTask);

module.exports = userAPI;