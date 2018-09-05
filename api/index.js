const router = require('koa-joi-router');
const hello = require('./hello');
const user = require('./user');

const publicRoute = router();
const userRoute = router();

publicRoute.route([
  { method: 'GET', path: '/', handler: hello.getHello },
]);

userRoute.prefix('/api');
userRoute.route([
  { method: 'GET', path: '/user/:id', ...user.getOne },
  { method: 'GET', path: '/users', ...user.getAll },
  { method: 'POST', path: '/user', ...user.create },
  { method: 'PUT', path: '/user', ...user.update },
  { method: 'DELETE', path: '/user/:id', ...user.remove }
]);

module.exports = [ publicRoute, userRoute ];