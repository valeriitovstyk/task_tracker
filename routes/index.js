const Router = require('koa-router');
const userRouter = require('./user');

mainRouter.use('/user', userRouter);

module.exports = mainRouter.routes();