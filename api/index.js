const router = require('koa-joi-router');
const hello = require('./hello');
const user = require('./user');
const auth = require('./auth');

const authMiddleWare = require('../plugin/auth');

const publicRoute = router();
const mainRoute = router();
const authRoute =  router();

publicRoute.route([
  { method: 'GET', path: '/', handler: hello.getHello },
]);

mainRoute.prefix('/api');
mainRoute.use(authMiddleWare());
mainRoute.route([
  { method: 'GET', path: '/user/:id', ...user.getOne },
  { method: 'GET', path: '/users', ...user.getAll },
  { method: 'POST', path: '/user', ...user.create },
  { method: 'PUT', path: '/user', ...user.update },
  { method: 'DELETE', path: '/user/:id', ...user.remove }
]);

authRoute.prefix('/api');
authRoute.route([
  { method: 'POST', path: '/login', ...auth.login },
]);

module.exports = [ publicRoute, mainRoute, authRoute ];