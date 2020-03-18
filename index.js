const Koa =  require('koa');
const app = new Koa();
const mainRouter = require('./routes/index');

app.use(mainRouter);

app.listen(3000, () => console.log('Server running on https://localhost:3000'));
