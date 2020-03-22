const Router = require('koa-router');
const UserController = require('../controllers/userController');
const koaBody = require('koa-body');

const userAPI = new Router({prefix: '/users'})
    .get('/', UserController.getUserList)
    .get('/:id', UserController.getUser)
    .get('/name/:name', UserController.getUserByName)
    .post('/', koaBody(), UserController.addUser)
    .delete('/:id', UserController.removeUser)
    .put('/:id', koaBody(), UserController.updateUser);

module.exports = userAPI;