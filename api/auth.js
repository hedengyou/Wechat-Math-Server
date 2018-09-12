const Boom = require('boom');
const router = require('koa-joi-router');
const jwt = require('jsonwebtoken');

const Joi = router.Joi;

const userModel = require('../model/user');
const loginAuth = require('../util/jwc');

function getToken(username, role) {
  return (0, jwt.sign)({ username: username, role: role }, 'Wechat-math-server', { expiresIn: '2h' });
}

const login = {
  validate: {
    body: {
      roleId: Joi.string(),
      password: Joi.string()
    },
    type: 'json',
  },
  handler: async (ctx) => {
    const { roleId, password } = ctx.request.body;
    ctx.logger.info('学号[用户登录]', roleId);
    // 先查询该用户以前是否登录过
    let record;
    ctx.logger.info('正在查询用户数据库[用户登录]', roleId);
    try {
      record = await userModel.findOne({ roleId });
    } catch (error) {
      ctx.logger.error('错误！查询用户数据库失败！[用户登录]', error);
      ctx.body = Boom.badRequest('用户登录失败，查询数据库错误');
    }
    let name = '';
    ctx.logger.info('正在进行教务处登录[用户登录]', roleId);
    try {
      name = await loginAuth(roleId, password, record ? record.name : null);
    } catch (error) {
      ctx.logger.error('错误!教务处登录失败！[用户登录]', error);
      ctx.body = Boom.badRequest('教务处登录失败，查询失败');
    }
    if (!name) {
      ctx.logger.error('教务处登录失败！[用户登录]', roleId);
      ctx.body = Boom.badRequest('教务处登录失败，查询姓名为空');
    }
    ctx.logger.info('教务处登录成功！[用户登录]', roleId, name);
    if (!record) {
      // 没有登录记录，保存一下用户信息
      const modelInstance = userModel({
        name, roleId, role: 'student'
      });
      ctx.logger.info('正在进行写入数据库[创建用户]', roleId, name);
      try {
        await modelInstance.save();
      } catch (error) {
        ctx.logger.error('错误!写入数据库错误![创建用户]:', error);
        ctx.body = Boom.badRequest('用户登录失败，创建用户错误');
      }
    }
    ctx.logger.info('即将创建Token！[用户登录]', name);
    const token = getToken(name, 'student');
    ctx.logger.info('Token创建成功！[用户登录]', token);
    ctx.status = 200;
    ctx.body = token;
  },
};

module.exports = {
  login
};