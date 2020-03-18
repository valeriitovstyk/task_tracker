const Router = require('koa-router');
const koaBody = require('koa-body');
/*const MessageController = require('../controllers/MessageController');
const validate = require('../middleware/validate');*/

const router = new Router();
router
    .get('/', (ctx) => {
        ctx.status = 200
        ctx.body   = "Well this is the response body"
    })
    // .get('/', MessageController.getMessagesList)
/*    .get('/list/:page', MessageController.getByPage)
    .get('/single/:message_id', MessageController.getById)
    .post('/', koaBody(), validate, MessageController.addMessage);*/

module.exports = router.routes();