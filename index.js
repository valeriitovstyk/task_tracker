console.log('test')
const Koa = require('koa');
const app = new Koa();
const router = require('./routes');

app
    .use(router.routes());

app.listen(process.env.PORT || 3000, () => console.log('Server is running..keep going :) '));