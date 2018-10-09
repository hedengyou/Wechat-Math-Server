const router = require('koa-joi-router');
const hello = require('./hello');
const user = require('./user');
const auth = require('./auth');
const lesson = require('./lesson');
const video = require('./video');
const homework = require('./homework');

const authMiddleWare = require('../plugin/auth');

const publicRoute = router();
const mainRoute = router();
const authRoute =  router();

publicRoute.route([
  { method: 'GET', path: '/', handler: hello.getHello }, // 测试API
]);

mainRoute.prefix('/api'); // 这个路由组里的路由的路径都会自动加上前缀/api
mainRoute.use(authMiddleWare()); // 这个路由组里的路由在匹配前都会先进行验权
mainRoute.route([
  { method: 'GET', path: '/user/:id', ...user.getOne }, // 查询单个用户
  { method: 'GET', path: '/users', ...user.getAll }, // 查询所有用户
  { method: 'POST', path: '/user', ...user.create }, // 创建用户
  { method: 'PUT', path: '/user', ...user.update }, // 更新指定用户资料
  { method: 'DELETE', path: '/user/:id', ...user.remove }, // 删除某个用户
  { method: 'GET', path: '/lessons', ...lesson.getAll }, // 查询所有课程
  { method: 'POST', path: '/lesson', ...lesson.create }, // 创建课程
  { method: 'GET', path: '/lesson/:id', ...lesson.getOne }, // 查询单个课程
  { method: 'GET', path: '/lesson/name/:name', ...lesson.getOneByName }, // 根据name查询指定课程
  { method: 'POST', path: '/lesson/getQuestions', ...lesson.getQuestions }, // 查询指定课程下子章节的问题集
  { method: 'GET', path: '/video/:id', ...video.getOne }, // 查询指定id的视频url
  { method: 'GET', path: '/homework/:id', ...homework.getOne }, // 查询指定id的作业
  { method: 'GET', path: '/homeworks', ...homework.getAll }, // 查询所有作业
]);

authRoute.prefix('/api');
authRoute.route([
  { method: 'POST', path: '/login', ...auth.login } // 登录API
]);

module.exports = [ publicRoute, mainRoute, authRoute ];