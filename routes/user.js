
const Router = require('koa-router');
const UserController = require('../controllers/userController')
const koaBody = require('koa-body')

const userAPI = new Router({prefix: '/users'})
/*    .get('/', (ctx) => {
        ctx.status = 200
        ctx.body   = "this is user body"
    })*/
    .get('/', UserController.getUserList)
    .get('/:id', UserController.getUser)
    .get('/name/:name', UserController.getUserByName)
    .post('/', koaBody(), UserController.addUser)
    .delete('/:id', UserController.removeUser)
    .put('/:id', koaBody(), UserController.updateUser)

module.exports = userAPI;