const router = require('koa-joi-router');
const Joi = router.Joi;

const workModel = require('../model/homework');

const getOne = {
  validate: {
    params: {
      id: Joi.string(),
    },
  },
  handler: async (ctx) => {
    const { params: { id } } = ctx;
    ctx.logger.info('params[查询单个作业资料]:', id);
    let user;
    try {
      user = await workModel.find({ _id: id });
    } catch (error) {
      ctx.logger.error('错误!查询数据库错误![查询单个作业资料]:', error);
      ctx.throw(500, '查询数据库出错');
    }
    ctx.logger.info('查询数据库成功[查询单个作业资料]: ', user);
    ctx.status = 200;
    ctx.body = user;
  },
};

const getAll = {
  handler: async (ctx) => {
    let users;
    try {
      users = await workModel.find();
    } catch (error) {
      ctx.logger.error('错误!查询数据库错误![查询全部作业资料]: ', error);
      ctx.throw(500, '查询数据库出错');
    }
    ctx.logger.info('查询数据库成功[查询全部作业资料]: ', users);
    ctx.status = 200;
    ctx.body = users;
  },
};

module.exports = {
  getOne,
  getAll
};