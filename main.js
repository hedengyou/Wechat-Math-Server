const koa = require('koa');

const logger = require('./plugin/logger');
const routes = require('./api');
const mongoose = require('./plugin/mongoose');
const mongoConfig = require('./config/mongo');

const app = new koa();

app.use(logger());
app.use(mongoose(mongoConfig));

routes.map(route => app.use(route.middleware()));

app.listen(4000);
