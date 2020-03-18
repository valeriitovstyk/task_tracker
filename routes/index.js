const Router = require('koa-router');
const userRouter = require('./user');

const mainRouter = new Router({});

mainRouter.use('/user', userRouter);

module.exports = mainRouter.routes();